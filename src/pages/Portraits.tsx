import { routes, groups } from "router";
import { BackgroundFade } from "../components/BackgroundFade";
import backgroundImg from "assets/img/gallery/Portraits/Melodie/9-/medium_9-.jpg";
import { makeStyles, Text, breakpointsValues } from "theme";
import { GalleryNavBar } from "components/GalleryNavBar";
import type { Route } from "type-route";
import { files as jpegFiles } from "../generatedImgExports";
import { files as webpFiles } from "../generatedWebpExports";
import { useTranslation, declareComponentKeys } from "i18n";
import { Gallery } from "components/Gallery";

const jpg = {
	"annaJonatan": jpegFiles.directories["Portraits"].directories["Anna-Jonatan"].directories,
	"confluence":  jpegFiles.directories["Portraits"].directories["Quatuor-confluence"].directories,
	"duoKanto":    jpegFiles.directories["Portraits"].directories["Duo-Kanto"].directories,
	"etienne":     jpegFiles.directories["Portraits"].directories["Etienne"].directories,
	"melodie":     jpegFiles.directories["Portraits"].directories["Melodie"].directories,
};

const webp = {
	"annaJonatan": webpFiles.directories["Portraits"].directories["Anna-Jonatan"].directories,
	"confluence":  webpFiles.directories["Portraits"].directories["Quatuor-confluence"].directories,
	"duoKanto":    webpFiles.directories["Portraits"].directories["Duo-Kanto"].directories,
	"etienne":     webpFiles.directories["Portraits"].directories["Etienne"].directories,
	"melodie":     webpFiles.directories["Portraits"].directories["Melodie"].directories,
};

export type PortraitsProps = {
	route: Route<typeof groups.portraits>
};

export function Portraits(props: PortraitsProps) {
	const { route } = props;

	const { classes } = useStyles();
	const { t } = useTranslation({ Portraits })

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
							case "annaJonatan": return t("annaJonatanTab");
							case "confluence": return t("confluenceTab");
							case "duoKanto": return t("duoKantoTab");
							case "etienne": return t("etienneTab")
							default: return t("melodieTab");
						}
					})()}
					links={[
						{
							"label": t("melodieTab"),
							...routes.melodie().link
						},
						{
							"label": t("annaJonatanTab"),
							...routes.annaJonatan().link
						},
						{
							"label": t("confluenceTab"),
							...routes.confluence().link
						},
						{
							"label": t("duoKantoTab"),
							...routes.duoKanto().link
						},
						{
							"label": t("etienneTab"),
							...routes.etienne().link
						},
					]}
				/>
				<div className={classes.galleryWrapper}>
					{
						(route.name === "melodie" || route.name === "portraits") && <Gallery
							webp={webp.melodie}
							jpg={jpg.melodie}
						/>
					}
					{
						route.name === "annaJonatan" && <Gallery
							webp={webp.annaJonatan}
							jpg={jpg.annaJonatan}
						/>
					}
					{
						route.name === "confluence" && <Gallery
							webp={webp.confluence}
							jpg={jpg.confluence}
						/>
					}
					{ 
					route.name === "duoKanto" && <Gallery
						webp={webp.duoKanto}
						jpg={jpg.duoKanto}

					/>
					}
					{
						route.name === "etienne" && <Gallery
							webp={webp.etienne}
							jpg={jpg.etienne}

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
	"annaJonatanTab" |
	"confluenceTab" |
	"duoKantoTab" |
	"etienneTab" |
	"melodieTab"
>()({ Portraits });