import { BackgroundFade } from "../components/BackgroundFade";
import backgroundImg from "assets/img/gallery/Reportages/Marche-pour-le-climat/TTZ_6463/medium_TTZ_6463.jpg";
import { makeStyles, Text, breakpointsValues } from "theme";
import { files as jpegFiles } from "../generatedImgExports";
import { files as webpFiles } from "../generatedWebpExports";
import { useTranslation, declareComponentKeys } from "i18n";
import { Gallery } from "components/Gallery";

const jpg = jpegFiles.directories.Reportages.directories["Marche-pour-le-climat"].directories
const webp = webpFiles.directories.Reportages.directories["Marche-pour-le-climat"].directories



export function ClimateMarch() {

	const { classes } = useStyles();
	const { t } = useTranslation({ ClimateMarch })

	return <div className={classes.root}>
		<div className={classes.banner}>
			<BackgroundFade className={classes.background} fadeDirection={"to bottom"} isImageCovered={true} imageUrl={backgroundImg} />
			<Text className={classes.title} typo="my title">{t("pageName")}</Text>
		</div>
		<div className={classes.pageContentWrapper}>
			<div className={classes.pageContent}>
				<div className={classes.galleryWrapper}>
						<Gallery
							webp={webp}
							jpg={jpg}
						/>
				</div>

			</div>

		</div>

	</div>
}

const useStyles = makeStyles()(theme => {
	return ({
		"root": {

		},
		"banner": {
			"height": "100vh",
			"maxHeight": 1080,
			"minHeight": theme.windowInnerWidth < breakpointsValues.sm ? 750 : 1080,
			"display": "flex",
			"alignItems": "center",
			"justifyContent": "center",
			"position": "relative"
		},
		"title": {
			"zIndex": 4,
			"maxWidth": 400 + 2 * theme.spacing(5),
			"textAlign": "center",
			...theme.spacing.rightLeft("padding", `${theme.spacing(5)}px`)
		},
		"pageContent": {
			"width": theme.windowInnerWidth < breakpointsValues.md ? undefined : "70%",
			"display": "flex",
			"flexDirection": "column",
			"alignItems": "center",
			"boxShadow": theme.shadows[2],
			"padding": theme.spacing(2),
			"backgroundColor": theme.colors.useCases.surfaces.background
		},
		"pageContentWrapper": {
			"display": "flex",
			"justifyContent": "center",
			"marginTop": -theme.spacing(13),
			"position": "relative",

		},
		"background": {
			"filter": "grayscale(100%)"
		},
		"galleryWrapper": {
			"minHeight": "100vh"
		}

	})
});

export const { i18n } = declareComponentKeys<
	"pageName" 
>()({ ClimateMarch });