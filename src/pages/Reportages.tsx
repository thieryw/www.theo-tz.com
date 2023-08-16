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
import { CardLink } from "../components/CardLink";
import { makeStyles, Text, breakpointsValues } from "../theme";
import { declareComponentKeys, useTranslation } from "../i18n";
import { routes } from "../router";

export function Reportages() {
	const { classes } = useStyles();
	const { t } = useTranslation({ Reportages })
	return <div className={classes.root}>
		<Text className={classes.pageTitle} typo="page heading">{t("pageTitle")}</Text>
		<Carousel
			slides={[
				{
					"image": {
						"src": brameWebp,
						"sources": [
							{
								"srcSet": brameWebp,
								"type": "image/webp"
							},
							{
								"srcSet": brameJpg,
								"type": "image/jpeg"
							}
						]
					},
					"extraContent": <CardLink
						className={classes.card}
						classes={{
							"title": classes.cardTitle,
							"paragraph": classes.cardParagraph,
							"linkLabel": classes.cardLinkLabel,
							"titleWrapper": classes.cardTitleWrapper
						}}
						title={t("brameCerfTitle")}
						paragraph={t("brameCerfParagraph")}
						link={{
							...routes.brameCerf().link,
							"label": t("linkLabel")
						}}
					/>
				},
				{
					"image": {
						"src": dolphinWebp,
						"sources": [
							{
								"srcSet": dolphinWebp,
								"type": "image/webp"
							},
							{
								"srcSet": dolphinJpg,
								"type": "image/jpeg"
							}
						]
					},
					"extraContent": <CardLink
						className={classes.card}
						classes={{
							"title": classes.cardTitle,
							"paragraph": classes.cardParagraph,
							"linkLabel": classes.cardLinkLabel,
							"titleWrapper": classes.cardTitleWrapper
						}}
						title={t("dolphinTitle")}
						paragraph={t("dolphinParagraph")}
						link={{
							"label": t("linkLabel"),
							...routes.dolphin().link
						}}
					/>
				},
				{
					"image": {
						"src": papetierWebp,
						"sources": [
							{
								"srcSet": papetierWebp,
								"type": "image/webp"
							},
							{
								"srcSet": papetierJpg,
								"type": "image/jpeg"
							}
						]
					},
					"extraContent": <CardLink
						className={classes.card}
						classes={{
							"title": classes.cardTitle,
							"paragraph": classes.cardParagraph,
							"linkLabel": classes.cardLinkLabel,
							"titleWrapper": classes.cardTitleWrapper
						}}
						title={t("papetierTitle")}
						paragraph={t("pandemicParagraph")}
						link={{
							"label": t("linkLabel"),
							...routes.papetier().link
						}}
					/>
				},
				{
					"image": {
						"src": wolfWebp,
						"sources": [
							{
								"srcSet": wolfWebp,
								"type": "image/webp"
							},
							{
								"srcSet": wolfJpg,
								"type": "image/jpeg"
							}
						]
					},
					"extraContent": <CardLink
						className={classes.card}
						classes={{
							"title": classes.cardTitle,
							"paragraph": classes.cardParagraph,
							"linkLabel": classes.cardLinkLabel,
							"titleWrapper": classes.cardTitleWrapper
						}}
						title={t("loupDordogneTitle")}
						paragraph={t("loupDordogneParagraph")}
						link={{
							"label": t("linkLabel"),
							...routes.wolf().link
						}}
					/>
				},
				{
					"image": {
						"src": pandemicWebp,
						"sources": [
							{
								"srcSet": pandemicWebp,
								"type": "image/webp"
							},
							{
								"srcSet": pandemicJpg,
								"type": "image/jpeg"
							}
						]
					},
					"extraContent": <CardLink
						className={classes.card}
						classes={{
							"title": classes.cardTitle,
							"paragraph": classes.cardParagraph,
							"linkLabel": classes.cardLinkLabel,
							"titleWrapper": classes.cardTitleWrapper
						}}
						title={t("pandemicTitle")}
						paragraph={t("pandemicParagraph")}
						link={{
							"label": t("linkLabel"),
							...routes.pandemic().link
						}}
					/>
				},
				{
					"image": {
						"src": climateWebp,
						"sources": [
							{
								"srcSet": climateWebp,
								"type": "image/webp"
							},
							{
								"srcSet": climateJpg,
								"type": "image/jpeg"
							}
						]
					},
					"extraContent": <CardLink
						className={classes.card}
						classes={{
							"title": classes.cardTitle,
							"paragraph": classes.cardParagraph,
							"linkLabel": classes.cardLinkLabel,
							"titleWrapper": classes.cardTitleWrapper
						}}
						title={t("climateMarchTitle")}
						paragraph={t("climateMarchParagraph")}
						link={{
							"label": t("linkLabel"),
							...routes.climat().link
							
						}}
					/>
				},


			]}
		/>

	</div>
}


const useStyles = makeStyles()(theme => {
	const isSmallScreen = theme.windowInnerWidth < breakpointsValues.md;
	return ({
		"root": {
			"width": "100vw",
			...theme.spacing.topBottom("padding", `${theme.spacing(8)}px`),
			"position": "relative",
			"overflow": "hidden"
		},
		"pageTitle": {
			"position": "relative",
			"top": isSmallScreen ? undefined : 340,
			"left": (() => {
				if (theme.windowInnerWidth < breakpointsValues["lg+"] && theme.windowInnerWidth >= breakpointsValues.lg) {
					return "15%";
				}
				if (theme.windowInnerWidth < breakpointsValues.lg && theme.windowInnerWidth >= breakpointsValues.md) {
					return "10%";
				}
				if (isSmallScreen) {
					return undefined;
				}
				return "20%";
			})(),
			"textAlign": isSmallScreen ? "center" : undefined,
			"marginTop": isSmallScreen ? theme.spacing(8) : undefined,
			"marginBottom": isSmallScreen ? theme.spacing(9) : undefined

		},
		"card": {
			"maxWidth": "100%",
			"background": "none",
			"padding": 0,
			"marginTop": theme.spacing(4),
			"height": 300,
			"justifyContent": "space-between",
			"border": "solid red px"
		},
		"cardTitleWrapper": {
			"marginBottom": theme.spacing(4)


		},
		"cardTitle": {
			"color": theme.colors.palette.dark.greyVariant1
		},
		"cardParagraph": {

			"color": theme.colors.palette.dark.greyVariant3,
		},
		"cardLinkLabel": {
			"color": theme.colors.palette.dark.greyVariant1
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