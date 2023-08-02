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
	"france": naturalism.extend(publicUrl + "/france"),
	"antilles": naturalism.extend(publicUrl + "/antilles"),
	"westCanada": naturalism.extend(publicUrl + "/ouest-canadien"),
	"reunionMaurice": naturalism.extend(publicUrl + "/reunion-Maurice"),
	events,
	"anduzeJazz": events.extend(publicUrl + "/anduze-Jazz-Camp"),
	"montpellierJazz": events.extend(publicUrl + "/montpellier-Jazz-Week"),
	"lindyHop": events.extend(publicUrl + "/lindy-Hop-Summercamp"),
	"airstep": events.extend(publicUrl + "/airsteps-classic-routines"),
	portraits,
	"confluence": portraits.extend(publicUrl + "/quatuor-confluence"),
	"etienne": portraits.extend(publicUrl + "/etienne"),
	"melodie": portraits.extend(publicUrl + "/melodie"),
	"annaJonatan": portraits.extend(publicUrl + "/anna-jonatan"),
	"duoKanto": portraits.extend(publicUrl + "/duo-kanto"),
	reportage,
	"brameCerf": reportage.extend(publicUrl + "/le-brame-du-cerf-dans-les-Cevennes"),
	"dolphin": reportage.extend(publicUrl + "/le-grand-dauphin-en-mediterranee"),
	"papetier": reportage.extend(publicUrl + "/atelier-papetier"),
	"wolf": reportage.extend(publicUrl + "/le-retour-du-loup-en-dordogne"),
	"pandemic": reportage.extend(publicUrl + "/5-24h-dans-la-vie-d_une-etudiante-en-pandemie"),
	"climat": reportage.extend(publicUrl + "/marche-pour-le-climat"),
	"urban": defineRoute(publicUrl + "/urbain")
};


makeThisModuleAnExecutableRouteLister(routeDefs);

export const { RouteProvider, routes, useRoute } = createRouter(opts,
	routeDefs
);

export const groups = {
	"naturalism": createGroup([routes.naturalism, routes.france, routes.antilles, routes.westCanada, routes.reunionMaurice]),
	"events": createGroup([routes.events, routes.anduzeJazz, routes.montpellierJazz, routes.lindyHop, routes.airstep]),
	"portraits": createGroup([routes.portraits, routes.confluence, routes.etienne, routes.melodie, routes.annaJonatan, routes.duoKanto]),
	"reportage": createGroup([routes.reportage, routes.brameCerf, routes.dolphin, routes.papetier, routes.wolf, routes.pandemic, routes.climat]),
	"rest": createGroup([routes.home, routes.legal, routes.auteur, routes.urban])
};