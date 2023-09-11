import { routes, groups } from "router";
import { BackgroundFade } from "../components/BackgroundFade";
import backgroundImg from "assets/img/gallery/Naturalisme/France/1/medium_1.jpg";
import { makeStyles, Text, breakpointsValues } from "theme";
import { GalleryNavBar } from "components/GalleryNavBar";
import type { Route } from "type-route";
import { files as jpegFiles } from "../generatedImgExports";
import { files as webpFiles } from "../generatedWebpExports";
import { useTranslation, declareComponentKeys } from "i18n";
import { Gallery } from "components/Gallery";

const jpg = {
	"france": jpegFiles.directories["Naturalisme"].directories["France"].directories,
	"antilles": jpegFiles.directories["Naturalisme"].directories["Antilles"].directories,
	"westCanada": jpegFiles.directories["Naturalisme"].directories["Ouest-canadien"].directories,
	"reunionMaurice": jpegFiles.directories["Naturalisme"].directories["Reunion-Maurice"].directories,
};

const webp = {
	"france": webpFiles.directories["Naturalisme"].directories["France"].directories,
	"antilles": webpFiles.directories["Naturalisme"].directories["Antilles"].directories,
	"westCanada": webpFiles.directories["Naturalisme"].directories["Ouest-canadien"].directories,
	"reunionMaurice": webpFiles.directories["Naturalisme"].directories["Reunion-Maurice"].directories,
};

export type NaturalismProps = {
	route: Route<typeof groups.naturalism>
};

export function Naturalism(props: NaturalismProps) {
	const { route } = props;

	const { classes } = useStyles();
	const { t } = useTranslation({ Naturalism })

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
					<Text typo="body 1">
						{t("text")}
					</Text>
				</div>
				<div className={classes.lineSeparator}></div>
				<GalleryNavBar
					className={classes.navBar}
					activeTabLabel={(() => {
						switch (route.name) {
							case "antilles": return t("antillesTab");
							case "westCanada": return t("canadaTab");
							case "reunionMaurice": return t("mauriceTab");
							default: return t("franceTab");
						}
					})()}
					links={[
						{
							"label": t("franceTab"),
							...routes.france().link
						},
						{
							"label": t("antillesTab"),
							...routes.antilles().link
						},
						{
							"label": t("canadaTab"),
							...routes.westCanada().link
						},
						{
							"label": t("mauriceTab"),
							...routes.reunionMaurice().link
						},
					]}
				/>
				<div className={classes.galleryWrapper}>
					{
						(route.name === "france" || route.name === "naturalism") && <Gallery
							webp={webp.france}
							jpg={jpg.france}
						/>
					}
					{
						route.name === "antilles" && <Gallery
							webp={webp.antilles}
							jpg={jpg.antilles}
						/>
					}
					{
						route.name === "westCanada" && <Gallery
							webp={webp.westCanada}
							jpg={jpg.westCanada}
						/>
					}
					{
						route.name === "reunionMaurice" && <Gallery
							webp={webp.reunionMaurice}
							jpg={jpg.reunionMaurice}

						/>
					}

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
		"textWrapper": {
			...(() => {
				const value = theme.windowInnerWidth >= breakpointsValues.sm ? theme.spacing(7) : theme.spacing(5)
				return {
					"paddingTop": value,
					...theme.spacing.rightLeft("padding", `${value}px`)

				}
			})(),
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
		"navBar": {
			"marginBottom": theme.spacing(2),
			"width": "100%"
		},
		"galleryWrapper": {
			"minHeight": "100vh"
		}

	})
});

export const { i18n } = declareComponentKeys<
	"pageName" |
	"franceTab" |
	"antillesTab" |
	"canadaTab" |
	"mauriceTab" |
	"text" |
	"textFirstLetter"
>()({ Naturalism });