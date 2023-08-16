import { BackgroundFade } from "../components/BackgroundFade";
import backgroundImg from "assets/img/gallery/Reportages/Le-brame-du-cerf-dans-les-Cevennes/9/medium_9.jpg";
import { makeStyles, Text, breakpointsValues } from "theme";
import { files as jpegFiles } from "../generatedImgExports";
import { files as webpFiles } from "../generatedWebpExports";
import { useTranslation, declareComponentKeys } from "i18n";
import { Gallery } from "components/Gallery";
import MarkDown from "react-markdown";

const jpg = jpegFiles.directories.Reportages.directories["Le-brame-du-cerf-dans-les-Cevennes"].directories
const webp = webpFiles.directories.Reportages.directories["Le-brame-du-cerf-dans-les-Cevennes"].directories



export function BrameCerf() {

	const { classes } = useStyles();
	const { t } = useTranslation({ BrameCerf })

	return <div className={classes.root}>
		<div className={classes.banner}>
			<BackgroundFade className={classes.background} fadeDirection={"to bottom"} isImageCovered={true} imageUrl={backgroundImg} />
			<Text className={classes.title} typo="my title">{t("pageName")}</Text>
		</div>
		<div className={classes.pageContentWrapper}>
			<div className={classes.pageContent}>
				<div className={classes.textWrapper}>
					<Text className={classes.capitalLetter} typo="body 1">
						{t("textFirstLetter")}
					</Text>
					<MarkDown className={classes.text}>{t("text")}</MarkDown>
				</div>
				<div className={classes.lineSeparator}></div>
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
			"display": "flex",
			"alignItems": "center",
			"justifyContent": "center",
			"position": "relative"
		},
		"textWrapper": {
			...(() => {
				const value = theme.windowInnerWidth >= breakpointsValues.sm ? theme.spacing(7) : theme.spacing(5)
				return {
					"paddingTop": value,
					...theme.spacing.rightLeft("padding", `${value}px`)

				}
			})(),
		},
		"text": {
			...theme.typography.variants["body 1"].style,
			"& > p": {
				"marginBlockStart": 0,
				"marginBlockEnd": 0,
				"& > a": {
					"textDecoration": "none",
					"color": theme.colors.palette.blueInfo.main,
					"transition": "color 500ms",
					":hover": {
						"color": theme.colors.palette.dark.greyVariant2
					}
				}
			}
		},
		"lineSeparator": {
			"width": theme.spacing(10),
			"height": 1,
			"backgroundColor": theme.colors.palette.dark.greyVariant3,
			...theme.spacing.topBottom("margin", `${theme.spacing(7)}px`)
		},
		"capitalLetter": {
			"color": theme.colors.palette.dark.greyVariant1,
			"fontSize": "5rem",
			"float": "left",
			"marginRight": 15,
			"marginBottom": theme.windowInnerWidth < breakpointsValues.xl ? 10 : 15,
			"paddingTop": theme.spacing(4),
			"position": "relative",
			"top": theme.windowInnerWidth < breakpointsValues.xl ? 5 : undefined

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
	"pageName" |
	"text" |
	"textFirstLetter"
>()({ BrameCerf });