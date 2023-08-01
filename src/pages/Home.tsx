import { useTranslation, declareComponentKeys } from "i18n";
import { makeStyles, Text } from "theme";
import { LinkButton } from "components/LinkButton";
import { CardLink } from "components/CardLink";

export function Home() {
	const { t } = useTranslation({ Home });
	const { classes } = useStyles();
	return <div className={classes.root}>
		<div className={classes.titleWrapper}>
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
						"href": ""
					}}
				/>
				<LinkButton
					label={t("articleLinkLabel")}
					link={{
						"href": ""
					}}
				/>

			</div>

		</div>
		<CardLink 
			title={t("naturTitle")}
			paragraph={t("naturParagraph")}
			link={{
				"label": t("exploreButton"),
				"href": ""
			}}
			cardNumber="01"
		/>

	</div>
}


const useStyles = makeStyles()(theme => {
	const titleWordSpacing = "0.5rem"

	return ({
		"root": {
			"paddingTop": theme.spacing(11),
			...theme.spacing.rightLeft("padding", `${theme.spacing(8)}px`)

		},
		"titleWrapper": {
		},
		"title": {
			"display": "grid",
			"gridTemplateColumns": "1fr",
			"gap": theme.spacing(2)

		},
		"upper": {
			"display": "flex"

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
	"naturParagraph" 

>()({ Home });