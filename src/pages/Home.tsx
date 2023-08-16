import { useTranslation, declareComponentKeys } from "i18n";
import { makeStyles, Text, breakpointsValues } from "theme";
import { LinkButton } from "components/LinkButton";
import { CardLink } from "components/CardLink";
import mokImage from "assets/img/gallery/Naturalisme/Antilles/1_12/miniature_1_12.jpg";
import mokImage2 from "assets/img/gallery/Reportages/Le-brame-du-cerf-dans-les-Cévennes/23/miniature_23.jpg";
import { SexyColumnLayout } from "components/SexyColumnLayout";
import { routes } from "../router";
import { ScrollContext } from "components/SmoothScrollProvider"
import { useContext } from "react";

export function Home() {
	const { t } = useTranslation({ Home });
	const { classes, cx } = useStyles();
	const context = useContext(ScrollContext);
	return <div className={classes.root}>
		<div className={classes.titleWrapper}>
			<div className={classes.titleInner}>
				<div className={classes.title}>
					<div className={classes.upper}>
						<Text className={classes.name} typo="page heading">{t("name")}</Text>
						<Text className={classes.journalist} typo="page heading">{t("expertise1")}</Text>
					</div>
					<Text className={classes.ecologist} typo="page heading">{t("expertise2")}</Text>
					<div className={classes.lower}>
						<Text className={classes.and} typo="page heading">{t("and")}</Text>

						<Text className={classes.photographer} typo="page heading">{t("artisticOccupation")}</Text>
					</div>

				</div>
				<div className={classes.linkWrapper}>
					<LinkButton
						className={classes.authorLink}
						label={t("authorLinkLabel")}
						link={{
							...routes.auteur().link
						}}
					/>
					<LinkButton
						label={t("articleLinkLabel")}
						link={{
							...routes.reportage().link
						}}
					/>

				</div>

			</div>

		</div>
		<div className={classes.galleryPresentation}>
			<SexyColumnLayout
				columns={[
					{
						"nodes": [
							<img className={classes.presentationImage} src={mokImage} alt="naturalism presentation" />,

						],
						"className": classes.columnOne
					},
					{
						"nodes": [
							<img className={classes.presentationImage} src={mokImage} alt="naturalism presentation" />,
							<CardLink
								title={t("naturTitle")}
								paragraph={t("naturParagraph")}
								link={{
									"label": t("exploreButton"),
									...routes.naturalism().link
								}}
								cardNumber="01"
							/>,
							<img className={classes.presentationImage} src={mokImage} alt="naturalism presentation" />
						]
					},
					{
						"nodes": [
							<img className={classes.presentationImage} src={mokImage} alt="naturalism presentation" />,
							<img className={classes.presentationImage} src={mokImage} alt="naturalism presentation" />

						],
						"className": classes.columnThree
					}
				]}
			/>
			<SexyColumnLayout
				className={cx(classes.sexyColumnLayout, classes.sexyColumnLayoutRest)}
				columns={[
					{
						"nodes": [
							<img className={classes.presentationImage} src={mokImage2} alt="reportage presentation" />,

						],
						"className": classes.columnOne
					},
					{
						"nodes": [
							<img className={classes.presentationImage} src={mokImage2} alt="reportage presentation" />,
							<CardLink
								title={t("articleTitle")}
								paragraph={t("articleParagraph")}
								link={{
									"label": t("exploreButton"),
									...routes.reportage().link
								}}
								cardNumber="02"
							/>,
							<img className={classes.presentationImage} src={mokImage2} alt="reportage presentation" />
						]
					},
					{
						"nodes": [
							<img className={classes.presentationImage} src={mokImage2} alt="reportage presentation" />,
							<img className={classes.presentationImage} src={mokImage2} alt="reportage presentation" />

						],
						"className": classes.columnThree
					}
				]}
			/>
		</div>
		<div onClick={() => {
			context?.scrollToTop();
		}}>
			<a {...routes.home().link}>mlkjmlkjmlkj</a>

		</div>

	</div>
}


const useStyles = makeStyles()(theme => {
	const titleWordSpacing = "0.5rem"

	const paddingRightLeft = (() => {
		if (theme.windowInnerWidth >= breakpointsValues["lg+"]) {
			return 8;
		};
		if (theme.windowInnerWidth >= breakpointsValues.lg && theme.windowInnerWidth < breakpointsValues["lg+"]) {
			return 5;
		};
		if (theme.windowInnerWidth >= breakpointsValues.md && theme.windowInnerWidth < breakpointsValues.lg) {
			return 8;
		}
		return 4;
	})();


	return ({
		"galleryPresentation": {
			"display": "flex",
			"flexDirection": "column",
			"alignItems": theme.windowInnerWidth >= breakpointsValues["lg+"] || theme.windowInnerWidth < breakpointsValues.sm ? "center" : "flex-end",
			"position": "relative",
			"marginTop": theme.windowInnerWidth >= 819 ? -theme.spacing(14) : theme.spacing(8),

		},
		"sexyColumnLayout": {
			...theme.spacing.topBottom("margin", `${theme.spacing(4)}px`)

		},
		"sexyColumnLayoutRest": {
			"alignSelf": "center"

		},
		"titleInner": {
		},
		"presentationImage": {
			"width": "100%",
			"minHeight": "100%"

		},
		"columnThree": {
			...(theme.windowInnerWidth < breakpointsValues.lg ? {
				"display": "none"
			} : {})
		},
		"columnOne": {
			...(theme.windowInnerWidth < breakpointsValues.sm ? {
				"display": "none"
			} : {})

		},
		"root": {
			"paddingTop": theme.spacing(11),
			...theme.spacing.rightLeft("padding", `${theme.spacing(paddingRightLeft)}px`),
		},
		"titleWrapper": {
			"zIndex": 300,
			"position": "relative",
			"display": "flex",
			"justifyContent": theme.windowInnerWidth >= breakpointsValues.sm ? undefined : "center"
		},
		"title": {
			"display": "grid",
			"gridTemplateColumns": "1fr",
			"gap": theme.spacing(2),

		},
		"upper": {
			"display": "flex",
			"flexWrap": "wrap"

		},
		"lower": {
			"display": "flex"

		},
		"and": {
			"marginRight": titleWordSpacing

		},
		"name": {
			"marginRight": titleWordSpacing,
			"fontStyle": "italic"
		},
		"journalist": {
			"textTransform": "uppercase"
		},
		"ecologist": {
			"textTransform": "uppercase"
		},
		"photographer": {
			"fontStyle": "italic"
		},
		"linkWrapper": {
			"display": "flex",
			"marginTop": theme.spacing(6)
		},
		"authorLink": {
			"marginRight": theme.spacing(7)

		}
	})
})


export const { i18n } = declareComponentKeys<
	"name" |
	"expertise1" |
	"expertise2" |
	"artisticOccupation" |
	"authorLinkLabel" |
	"articleLinkLabel" |
	"and" |
	"exploreButton" |
	"naturTitle" |
	"naturParagraph" |
	"articleTitle" |
	"articleParagraph"

>()({ Home });