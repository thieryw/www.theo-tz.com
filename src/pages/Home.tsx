import { memo, useRef } from "react";
import { useTranslation, declareComponentKeys } from "i18n";
import { makeStyles, Text, breakpointsValues } from "theme";
import { LinkButton } from "components/LinkButton";
import { CardLink } from "components/CardLink";
import { SexyColumnLayout } from "components/SexyColumnLayout";
import { routes } from "../router";
import { files as jpgFiles } from "../generatedHomeImgExports";
import { files as webpFiles } from "../generatedHomeWebpExports";

const imageFolders = [
	{
		"webp": webpFiles.directories.naturalism.files,
		"jpg": jpgFiles.directories.naturalism.files
	},
	{
		"webp": webpFiles.directories.reportages.files,
		"jpg": jpgFiles.directories.reportages.files
	},
	{
		"webp": webpFiles.directories.events.files,
		"jpg": jpgFiles.directories.events.files
	},
	{
		"webp": webpFiles.directories.portraits.files,
		"jpg": jpgFiles.directories.portraits.files
	},
	{
		"webp": webpFiles.directories.urban.files,
		"jpg": jpgFiles.directories.urban.files
	},
]


export function Home() {
	const { t } = useTranslation({ Home });
	const { classes } = useStyles();

	const cardLinksRef = useRef([
		{
			"title": t("naturTitle"),
			"paragraph": t("naturParagraph"),
			"link": routes.naturalism().link
		},
		{
			"title": t("articleTitle"),
			"paragraph": t("articleParagraph"),
			"link": routes.reportage().link
		},
		{
			"title": t("eventTitle"),
			"paragraph": t("eventParagraph"),
			"link": routes.events().link
		},
		{
			"title": t("portraitTitle"),
			"paragraph": t("portraitParagraph"),
			"link": routes.portraits().link
		},
		{
			"title": t("urbanTitle"),
			"paragraph": t("urbanParagraph"),
			"link": routes.urban().link
		},
	])

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
			{
				imageFolders.map((folder, index) => {
					return <SexyColumnLayout
						key={index}
						className={index > 0 ? classes.sexyColumnLayoutRest : undefined}
						columns={[
							{
								"nodes": [
									<Image
										webpSrc={folder.webp[1].url}
										jpgSrc={folder.jpg[1].url}
									/>

								],
								"className": classes.columnOne
							},
							{
								"nodes": [
									<Image
										webpSrc={folder.webp[2].url}
										jpgSrc={folder.jpg[2].url}
									/>,
									<CardLink
										title={cardLinksRef.current[index].title}
										paragraph={cardLinksRef.current[index].paragraph}
										link={{
											"label": t("exploreButton"),
											...cardLinksRef.current[index].link
										}}
										cardNumber="01"
									/>,
									<Image
										webpSrc={folder.webp[3].url}
										jpgSrc={folder.jpg[3].url}
									/>,
								]
							},
							{
								"nodes": [
									<Image
										webpSrc={folder.webp[4].url}
										jpgSrc={folder.jpg[4].url}
									/>,
									<Image
										webpSrc={folder.webp[5].url}
										jpgSrc={folder.jpg[5].url}
									/>,

								],
								"className": classes.columnThree
							}
						]}
					/>
				})
			}
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
			"marginTop": theme.windowInnerWidth >= 819 ? -theme.spacing(12) : theme.spacing(8),

		},
		"sexyColumnLayoutRest": {
			"alignSelf": "center",
			...theme.spacing.topBottom("margin", `${theme.spacing(4)}px`)

		},
		"titleInner": {
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

const { Image } = (() => {

	type ImageProps = {
		jpgSrc: string;
		webpSrc: string;
		alt?: string;

	};

	const Image = memo((props: ImageProps) => {
		const { jpgSrc, webpSrc, alt } = props;
		const { classes } = useStyles();
		return <picture>
			<source
				srcSet={webpSrc}
				type="image/webp"
			/>
			<source
				srcSet={jpgSrc}
				type="image/jpeg"
			/>

			<img className={classes.root} src={webpSrc} alt={alt ?? "gallery presentation"} />



		</picture>
	})

	const useStyles = makeStyles()(() => {
		return ({
			"root": {
				"width": "100%",
				"minHeight": "100%"

			}
		})
	})

	return { Image }

})()


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
	"articleParagraph" |
	"eventTitle" |
	"eventParagraph" |
	"urbanTitle" |
	"urbanParagraph" |
	"portraitTitle" |
	"portraitParagraph"

>()({ Home });