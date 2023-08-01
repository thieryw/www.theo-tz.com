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
	typeof import ("pages/Home").i18n
>()(
	{ languages, fallbackLanguage },
	{
		"fr": {
			"App": {
				"home": "ACCEUIL",
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
				"pageName": "NATURALISM",
				"franceTab": "FRANCE",
				"antillesTab": "ANTILLES",
				"canadaTab": "OUEST CANADIEN",
				"mauriceTab": "REUNION & ILE MAURICE"

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
				"naturParagraph": "la vie sauvage est surprenante tant par sa diversité que par les incroyables similitudes qu’elle partage avec l’Homme. Lors de mes premières observations naturalistes, j’étais fasciné par ce monde merveilleux me paraissant difficilement accessible."
			}
		},
	}
);