import { routes, groups } from "router";
import { BackgroundFade } from "../components/BackgroundFade";
import backgroundImg from "assets/img/gallery/Evenements/Montpellier-Jazz-Week-1/TTZ_2836/medium_TTZ_2836.jpg";
import { makeStyles, Text, breakpointsValues } from "theme";
import { GalleryNavBar } from "components/GalleryNavBar";
import type { Route } from "type-route";
import { files as jpegFiles } from "../generatedImgExports";
import { files as webpFiles } from "../generatedWebpExports";
import { useTranslation, declareComponentKeys } from "i18n";
import { Gallery } from "components/Gallery";

const jpg = {
	"airstep": jpegFiles.directories["Evenements"].directories["Airsteps-classic-routines"].directories,
	"anduze": jpegFiles.directories["Evenements"].directories["Anduze-Jazz-Camp"].directories,
	"lindyHop": jpegFiles.directories["Evenements"].directories["Lindy-Hop-Summercamp"].directories,
	"montpellierJazz": jpegFiles.directories["Evenements"].directories["Montpellier-Jazz-Week-1"].directories,
	"anduze2": jpegFiles.directories["Evenements"].directories["anduze-Jazz-Camp2"].directories,
};

const webp = {
	"airstep": webpFiles.directories["Evenements"].directories["Airsteps-classic-routines"].directories,
	"anduze": webpFiles.directories["Evenements"].directories["Anduze-Jazz-Camp"].directories,
	"lindyHop": webpFiles.directories["Evenements"].directories["Lindy-Hop-Summercamp"].directories,
	"montpellierJazz": webpFiles.directories["Evenements"].directories["Montpellier-Jazz-Week-1"].directories,
	"anduze2": webpFiles.directories["Evenements"].directories["anduze-Jazz-Camp2"].directories,
};

export type EventsProps = {
	route: Route<typeof groups.events>
};

export function Events(props: EventsProps) {
	const { route } = props;

	const { classes } = useStyles();
	const { t } = useTranslation({ Events })

	return <div className={classes.root}>
		<div className={classes.banner}>
			<BackgroundFade className={classes.background} fadeDirection={"to bottom"} isImageCovered={true} imageUrl={backgroundImg} />
			<Text className={classes.title} typo="my title">{t("pageName")}</Text>

		</div>
		<div className={classes.pageContentWrapper}>
			<div className={classes.pageContent}>
				<GalleryNavBar
					className={classes.navBar}
					activeTabLabel={(() => {
						switch (route.name) {
							case "airstep": return t("airstepTab");
							case "anduzeJazz": return t("anduzeTab");
							case "anduzeJazz2": return t("anduzeTab2");
							case "lindyHop": return t("lindyHopTab");
							default: return t("montpellierJazzTab");
						}
					})()}
					links={[
						{
							"label": t("montpellierJazzTab"),
							...routes.montpellierJazz().link
						},
						{
							"label": t("airstepTab"),
							...routes.airstep().link
						},
						{
							"label": t("anduzeTab"),
							...routes.anduzeJazz().link
						},
						{
							"label": t("anduzeTab2"),
							...routes.anduzeJazz2().link
						},
						{
							"label": t("lindyHopTab"),
							...routes.lindyHop().link
						}
					]}
				/>
				<div className={classes.galleryWrapper}>
					{
						(route.name === "montpellierJazz" || route.name === "events") && <Gallery
							webp={webp.montpellierJazz}
							jpg={jpg.montpellierJazz}
						/>
					}
					{
						route.name === "airstep" && <Gallery
							webp={webp.airstep}
							jpg={jpg.airstep}
						/>
					}
					{
						route.name === "anduzeJazz" && <Gallery
							webp={webp.anduze}
							jpg={jpg.anduze}
						/>
					}
					{
						route.name === "anduzeJazz2" && <Gallery
							webp={webp.anduze2}
							jpg={jpg.anduze2}
						/>
					}
					{
						route.name === "lindyHop" && <Gallery
							webp={webp.lindyHop}
							jpg={jpg.lindyHop}

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
			"minHeight": theme.windowInnerWidth < breakpointsValues.sm ? 750 : 800,
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
			"marginBottom": theme.spacing(9)

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
	"airstepTab" |
	"anduzeTab" |
	"anduzeTab2" |
	"lindyHopTab" |
	"montpellierJazzTab"
>()({ Events });