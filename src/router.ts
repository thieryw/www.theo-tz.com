import {createRouter, defineRoute, createGroup} from "type-route";
import { makeThisModuleAnExecutableRouteLister } from "github-pages-plugin-for-type-route";
import type { RouterOpts } from "type-route";

const opts: RouterOpts = {
	"scrollToTop": false
}

/**
 * Examples:
 * '/wwww.theo-tz.com' when "homepage": "https://xxx.yy/www.theo-tz.com" in package.json
 * '' when "homepage": "https://xxx.yy" in package.json or no homepage at all.  
 **/
const publicUrl = process.env["PUBLIC_URL"];

const naturalism = defineRoute(publicUrl + "/naturalisme");
const events = defineRoute(publicUrl + "/evenements");
const portraits = defineRoute(publicUrl + "/portraits");
const reportage = defineRoute(publicUrl + "/reportage");

export const routeDefs = {
	"home": defineRoute(publicUrl || "/"),
	"legal": defineRoute(publicUrl + "/mentions-legal"),
	"auteur": defineRoute(publicUrl + "/auteur"),
	naturalism,
	"france": naturalism.extend("/france"),
	"antilles": naturalism.extend("/antilles"),
	"westCanada": naturalism.extend("/ouest-canadien"),
	"reunionMaurice": naturalism.extend("/reunion-Maurice"),
	events,
	"anduzeJazz": events.extend("/anduze-Jazz-Camp"),
	"anduzeJazz2": events.extend("/anduze-Jazz-Camp2"),
	"montpellierJazz": events.extend("/montpellier-Jazz-Week"),
	"lindyHop": events.extend("/lindy-Hop-Summercamp"),
	"airstep": events.extend("/airsteps-classic-routines"),
	portraits,
	"confluence": portraits.extend("/quatuor-confluence"),
	"etienne": portraits.extend("/etienne"),
	"melodie": portraits.extend("/melodie"),
	"annaJonatan": portraits.extend("/anna-jonatan"),
	"duoKanto": portraits.extend("/duo-kanto"),
	reportage,
	"brameCerf": reportage.extend("/le-brame-du-cerf-dans-les-Cevennes"),
	"dolphin": reportage.extend("/le-grand-dauphin-en-mediterranee"),
	"papetier": reportage.extend("/atelier-papetier"),
	"wolf": reportage.extend("/le-retour-du-loup-en-dordogne"),
	"pandemic": reportage.extend("/5-24h-dans-la-vie-d_une-etudiante-en-pandemie"),
	"climat": reportage.extend("/marche-pour-le-climat"),
	"urban": defineRoute(publicUrl + "/urbain")
};


makeThisModuleAnExecutableRouteLister(routeDefs);

export const { RouteProvider, routes, useRoute } = createRouter(opts,
	routeDefs
);

export const groups = {
	"naturalism": createGroup([routes.naturalism, routes.france, routes.antilles, routes.westCanada, routes.reunionMaurice]),
	"events": createGroup([routes.events, routes.anduzeJazz, routes.montpellierJazz, routes.lindyHop, routes.airstep, routes.anduzeJazz2]),
	"portraits": createGroup([routes.portraits, routes.confluence, routes.etienne, routes.melodie, routes.annaJonatan, routes.duoKanto]),
	"reportage": createGroup([routes.reportage, routes.brameCerf, routes.dolphin, routes.papetier, routes.wolf, routes.pandemic, routes.climat]),
	"rest": createGroup([routes.home, routes.legal, routes.auteur, routes.urban])
};