import { createI18nApi, declareComponentKeys } from "i18nifty";
export { declareComponentKeys };

export const languages = ["fr"] as const;

export const fallbackLanguage = "fr";

export type Language = typeof languages[number];

export type LocalizedString = Parameters<typeof resolveLocalizedString>[0];

export const { 
	useTranslation, 
	resolveLocalizedString, 
	useLang, 
	$lang,
	useResolveLocalizedString,
	getTranslation 
} = createI18nApi<
	typeof import ("App").i18n |
	typeof import ("pages/Naturalism").i18n |
	typeof import ("pages/Biography").i18n |
	typeof import ("pages/Home").i18n |
	typeof import ("pages/Reportages").i18n |
	typeof import ("pages/Portraits").i18n |
	typeof import ("pages/Events").i18n |
	typeof import ("pages/Urbain").i18n |
	typeof import ("pages/BrameCerf").i18n |
	typeof import ("pages/Dolphin").i18n |
	typeof import ("pages/Papetier").i18n |
	typeof import ("pages/WolfDordogne").i18n |
	typeof import ("pages/Pandemic").i18n |
	typeof import ("pages/ClimateMarch").i18n
>()(
	{ languages, fallbackLanguage },
	{
		"fr": {
			"App": {
				"home": "ACCUEIL",
				"journalism": "REPORTAGES",
				"naturalism": "NATURALISME",
				"events": "EVENEMENTS",
				"portraits": "PORTRAITS",
				"urban": "URBAIN",
				"legal": "Mentions legales",
				"copyRight": "Copyright © 2021 Théo Tzélépoglou. Tous droits réservés",
				"author": "AUTEUR",
				"design": "Conçu et développé par StarkerDesign."
			},
			"Naturalism": {
				"pageName": "NATURALISME",
				"franceTab": "FRANCE",
				"antillesTab": "ANTILLES",
				"canadaTab": "OUEST CANADIEN",
				"mauriceTab": "REUNION & ILE MAURICE",
				"text": "a vie sauvage est surprenante tant par sa diversité que par les incroyables similitudes qu’elle partage avec l’Homme. Lors de mes premières observations naturalistes, j’étais fasciné par ce monde merveilleux me paraissant difficilement accessible. Avec le temps et multipliant les heures en pleine nature tout autour du monde, j’ai appris à observer, sentir et appréhender la complexité du monde animal et végétal. Cette biodiversité m’a appris que nous sommes semblables à travers nos émotions et nos comportements, mais par-dessus tout, elle m’a appris à percevoir une partie de moi-même dans chaque regard sauvage croisant mon chemin. Je suis persuadé que le progrès technologique et notre cantonnement citadin ronge le lien, la connexion à ce grand tout dont nous faisons partie. C’est pourtant paradoxalement grâce aux dernières technologies que je peux retranscrire au mieux mon regard sur la nature. J’y vois le signe que nous avons entre nos mains le pouvoir de choisir quoi faire du fruit de l’intelligence humaine : La laisser divaguer dans le superflu, ou la mettre au service d’une quête d’unité avec le vivant. À travers ces photographies, je souhaite vous proposer un regard simple et artistique sur la vie qui nous entoure.",
				"textFirstLetter": "L"

			},
			"Biography": {
				"title": "AUTEUR",
				"introText": `J'ai toujours été émerveillé par la nature, 
une des seules choses sur terre qui me parait vraie, 
universelle et sans artifices. 
Nous vivons dans un monde ultra-connecté où contempler et vivre l'instant 
présent est devenue un privilège. 
C'est pourtant, à mon sens, la base même de la vie. 
S'imprégner du vivant, randonner en pleine nature est pour moi une 
formidable bouteille d’oxygène, un réenracinement profond à la vie.
				`,
				"bioText": `Durant mes études d’ingénierie écologique, j’ai commencé à réaliser un rêve : photographier la faune sauvage. Ce fut une véritable révélation et depuis ce jour je tente d’immortaliser des scènes qui m’ont fait vivre des instants magiques. À travers mon travail, je souhaite vous partager cette passion qui me rappelle que nous faisons partie de ce tout, de cet environnement naturel à qui nous devons respect et modestie.

Je suis davantage à la recherche de rencontre qu’un chasseur d’images. La photo est une motivation supplémentaire afin de me lever avant l’aurore, marcher des kilomètres avec de forts dénivelés et attendre des heures. Ces moments hors du temps ainsi que mon émerveillement pour le vivant constituent le véritable message que je cherche à transmettre à travers mes clichés.
La passion pour l’image et l’art m’ont naturellement poussé vers de nouvelles perspectives. Ainsi, portraits, évènements et reportages sont venus compléter mon approche photographique.

Par la suite, mon attrait pour sensibiliser et transmettre m’a conduit au métier de journaliste, avec une affinité pour les sujets liant écologie et société.
				`,
				"linkToArticlesTitle": "Retrouvez Mes",
				"linkToArticlesTitleItalic": "Articles Journalistiques",
				"linkToArticlesLabel": "PAR ICI",
				"distinctionsTitle": "Distinctions",
				"exhibitionTitle": "Exposition",
				"pressTitle": "Presse",

			},
			"Home": {
				"name": "Théo,",
				"expertise1": "journaliste",
				"expertise2": "écologue",
				"and": "&",
				"artisticOccupation": "Photographe",
				"articleLinkLabel": "REPORTAGE",
				"authorLinkLabel": "AUTEUR",
				"exploreButton": "EXPLORER",
				"naturTitle": "Naturalisme",
				"naturParagraph": "la vie sauvage est surprenante tant par sa diversité que par les incroyables similitudes qu’elle partage avec l’Homme. Lors de mes premières observations naturalistes, j’étais fasciné par ce monde merveilleux me paraissant difficilement accessible.",
				"articleTitle": "Reportages",
				"articleParagraph": "Textes et photos parus dans la presse. Vous souhaitez promouvoir votre activité, immortaliser un évènement ou avoir des illustrations pour votre site internet ? Je saurai capturer l’authenticité de l’instant.",
				"eventTitle": "Evenements",
				"eventParagraph": "Je peux couvrir des festivals de danse et de musique, ou tout autre évènement en lien avec l'art ou l'écologie.",
				"urbanTitle": "Urbain",
				"urbanParagraph": "En numérique ou avec mon argentique, retrouvez quelques clichés de mes pérégrinations urbaines.",
				"portraitTitle": "Portraits",
				"portraitParagraph": "En studio ou en extérieur, je vous propose de saisir des instants de vie qui vous ressemblent. Seul, en couple ou en groupe, je m’adapterai à vos envies."
			},
			"Reportages": {
				"brameCerfTitle": "Le brame du cerf dans les Cévennes",
				"brameCerfParagraph": "Chaque année, le rut du cerf accompagne l’arrivée de l’automne. La nuit, des cris gutturaux résonnent alors dans la forêt pendant un mois.",
				"dolphinTitle": "Surveillance en mer du milieu",
				"dolphinParagraph": "Textes et photos parues dans le numéro 277 de la revue la Salamandre.",
				"papetierTitle": "L'atelier papetier",
				"papetierParagraph": "Formé au Japon à la technique du papier washi, un couple de l’Hérault fabrique à la main un papier sans aucun produit chimique. Un savoir-faire minutieux, qui est une réelle alternative à l’industrie papetière peu écologique.",
				"loupDordogneTitle": "Le retour du loup en Dordogne",
				"loupDordogneParagraph": "Des propriétaires de troupeaux et des scientifiques ont créé un réseau d’acteurs et un plan d’action pour prévenir les actes de prédation sur leur bétail et assurer une cohabitation apaisée.",
				"pandemicTitle": "24 heures dans la vie d'une étudiante en pandémie",
				"pandemicParagraph": "Nolwenn, 19 ans est étudiante en première année de licence d’Études culturelles à l’université de Lille.",
				"climateMarchTitle": "Marche pour le climat",
				"climateMarchParagraph": "",
				"linkLabel": "EN SAVOIR PLUS",
				"pageTitle": "REPORTAGES"
			},
			"Portraits": {
				"annaJonatanTab": "Anna & Jonatan",
				"confluenceTab": "Quatuor Confluence",
				"duoKantoTab": "Duo Kanto",
				"etienneTab": "Etienne",
				"melodieTab": "Mélodie",
				"pageName": "PORTRAITS"
			},
			"Events": {
				"airstepTab": "Airsteps classic routines",
				"anduzeTab": "Anduze jazz camp",
				"lindyHopTab": "Lindy Hop summer camp",
				"montpellierJazzTab": "Montpellier jazz week 1",
				"pageName": "EVENEMENTS",
				"anduzeTab2": "Anduze jazz camp 2"
			},
			"Urbain": {
				"pageName": "URBAIN"
			},
			"BrameCerf": {
				"pageName": "LE BRAME DU CERF",
				"text": `haque année, le rut du cerf accompagne l’arrivée de l’automne. La nuit, des cris gutturaux résonnent alors dans la forêt pendant un mois. Accompagné d’un agent, Reporterre s’est promené à pas ouatés dans le Parc national des Cévennes pour écouter les mâles bramer. Une période sensible pour les animaux, qui nécessite la discrétion des humains. Texte et photos à retrouver sur le site de [Reporterre](https://reporterre.net/Le-brame-du-cerf-un-rendez-vous-avec-le-sauvage)`,
				"textFirstLetter": "C"
			},
			"Dolphin": {
				"pageName": "SURVEILLANCE EN MER DU MILIEU",
				"textFirstLetter": "T",
				"text": "extes et photos parues dans le numéro 277 de la revue la Salamandre."
			},
			"Papetier": {
				"text": `ormé au Japon à la technique du papier washi, un couple de l’Hérault fabrique à la main un papier sans aucun produit chimique. Un savoir-faire minutieux, qui est une réelle alternative à l’industrie papetière peu écologique. Texte et photos pour [Reporterre](https://reporterre.net/A-la-main-et-sans-produit-chimique-ils-fabriquent-du-papier-ecologique?fbclid=IwAR0p3EGc3J8dOcC-k-AST2WLMS0EqCUG14p_Nj9CJTp3fF_XXyZwyNuUtNI#nb1)`,
				"textFirstLetter": "F",
				"pageName": "À LA MAIN ET SANS PRODUIT CHIMIQUE, ILS FABRIQUENT DU PAPIER ÉCOLOGIQUE"
			},
			"WolfDordogne": {
				"pageName": "LE RETOUR DU LOUP EN DORDOGNE",
				"text": `es propriétaires de troupeaux et des scientifiques ont créé un réseau d’acteurs et un plan d’action pour prévenir les actes de prédation sur leur bétail et assurer une cohabitation apaisée. Texte et photos à retrouver sur le site de [Politis](https://www.politis.fr/articles/2022/10/en-dordogne-les-eleveurs-anticipent-le-retour-du-loup-44869/)`,
				"textFirstLetter": "D"
			},
			"Pandemic": {
				"pageName": "UNE ETUDIANTE EN PANDEMIE",
				"text": `olwenn, 19 ans est étudiante en première année de licence d’Études culturelles à l’université de Lille. A cause de la crise sanitaire, elle a suivi la majorité de ses cours en distanciel, une situation qui brouille les frontières entre les moments consacrés aux études et les activités récréatives. Immersion dans son quotidien de 15m². Texte et photos à retrouver sur le site de [l’ESJ-Lille](https://esj-lille.fr/actualite/article/science-infuse-le-mag--de-la-28e-promotion-journalistes-scientifiques-est-en-ligne-)`,
				"textFirstLetter": "N"
			},
			"ClimateMarch": {
				"pageName": "MARCHE POUR LE CLIMAT"

			}

		},
	}
);