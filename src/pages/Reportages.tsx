import { useRef } from "react";
import { Carousel } from "components/Carousel";
import brameJpg from "../assets/img/ReportagePresentation/brame.jpg";
import brameWebp from "../assets/webp/ReportagePresentation/brame.webp";
import dolphinJpg from "../assets/img/ReportagePresentation/dolphin.jpg";
import dolphinWebp from "../assets/webp/ReportagePresentation/dolphin.webp";
import papetierJpg from "../assets/img/ReportagePresentation/papetier.jpg";
import papetierWebp from "../assets/webp/ReportagePresentation/papetier.webp";
import wolfJpg from "../assets/img/ReportagePresentation/loup.jpg";
import wolfWebp from "../assets/webp/ReportagePresentation/loup.webp";
import pandemicJpg from "../assets/img/ReportagePresentation/pandemie.jpg";
import pandemicWebp from "../assets/webp/ReportagePresentation/pandemie.webp";
import climateJpg from "../assets/img/ReportagePresentation/climat.jpg";
import climateWebp from "../assets/webp/ReportagePresentation/climat.webp";
import type { Link } from "../tools/link";
import { makeStyles, Text } from "../theme";
import { declareComponentKeys, useTranslation } from "../i18n";
import { routes } from "../router";

export function Reportages() {
	const { classes } = useStyles();
	const { t } = useTranslation({ Reportages })
	const carouselDataRef = useRef<{
		webp: string;
		jpeg: string;
		title: string;
		paragraph: string;
		link: Link;
	}[]>([
		{
			"webp": brameWebp,
			"jpeg": brameJpg,
			"title": t("brameCerfTitle"),
			"paragraph": t("brameCerfParagraph"),
			"link": { ...routes.brameCerf().link }
		},
		{
			"webp": dolphinWebp,
			"jpeg": dolphinJpg,
			"title": t("dolphinTitle"),
			"paragraph": t("dolphinParagraph"),
			"link": { ...routes.dolphin().link }
		},
		{
			"webp": papetierWebp,
			"jpeg": papetierJpg,
			"title": t("papetierTitle"),
			"paragraph": t("papetierParagraph"),
			"link": { ...routes.papetier().link }
		},
		{
			"webp": wolfWebp,
			"jpeg": wolfJpg,
			"title": t("loupDordogneTitle"),
			"paragraph": t("loupDordogneParagraph"),
			"link": { ...routes.wolf().link }
		},
		{
			"webp": pandemicWebp,
			"jpeg": pandemicJpg,
			"title": t("pandemicTitle"),
			"paragraph": t("pandemicParagraph"),
			"link": { ...routes.pandemic().link }
		},
		{
			"webp": climateWebp,
			"jpeg": climateJpg,
			"title": t("climateMarchTitle"),
			"paragraph": t("climateMarchParagraph"),
			"link": { ...routes.climat().link }
		},
	])
	return <div className={classes.root}>
		<Text className={classes.pageTitle} typo="page heading">{t("pageTitle")}</Text>
		<Carousel
			className={classes.carousel}
			startingPercentage={20}
			slides={
				carouselDataRef.current.map(({jpeg, link, paragraph, title, webp }) => ({
					"image": {
						"src": webp,
						"sources": [
							{
								"srcSet": webp,
								"type": "image/webp"
							},
							{
								"srcSet": jpeg,
								"type": "image/jpeg"
							}
						]
					},
					title,
					paragraph,
					"link":{
						...link,
						"label": t("linkLabel")
					}
				}))
			}
		/>

	</div>
}


const useStyles = makeStyles()(theme => {
	return ({
		"root": {
			"width": "100vw",
			...theme.spacing.topBottom("padding", `${theme.spacing(8)}px`),
			"position": "relative",
			"overflow": "hidden"
		},
		"pageTitle": {
			"position": "relative",
			"textAlign": "center",
			"marginTop": theme.spacing(8),
			"marginBottom": theme.spacing(9)

		},
		"carousel": {
			"marginBottom": theme.spacing(9)
		}
	})
})

export const { i18n } = declareComponentKeys<
	"linkLabel" |
	"brameCerfTitle" |
	"brameCerfParagraph" |
	"dolphinTitle" |
	"dolphinParagraph" |
	"papetierTitle" |
	"papetierParagraph" |
	"loupDordogneTitle" |
	"loupDordogneParagraph" |
	"pandemicTitle" |
	"pandemicParagraph" |
	"climateMarchTitle" |
	"climateMarchParagraph" |
	"pageTitle"


>()({ Reportages });