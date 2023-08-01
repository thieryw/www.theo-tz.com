import { routes, groups } from "router";
import { BackgroundFade } from "../components/BackgroundFade";
import backgroundImg from "assets/img/home/14-.jpg";
import { makeStyles, Text } from "theme";
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
			<BackgroundFade fadeDirection={"to bottom"} isImageCovered={true} imageUrl={backgroundImg} />
			<Text className={classes.title} typo="my title">NATURALISM</Text>

		</div>
		<div className={classes.pageContent}>
			<GalleryNavBar
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
}

const useStyles = makeStyles()(() => {
	return ({
		"root": {

		},
		"banner": {
			"height": "100vh",
			"display": "flex",
			"alignItems": "center",
			"justifyContent": "center",
			"position": "relative"
		},
		"title": {
			"zIndex": 4000,
		},
		"pageContent": {
		}

	})
});

export const { i18n } = declareComponentKeys<
	"pageName" |
	"franceTab" |
	"antillesTab" |
	"canadaTab" |
	"mauriceTab"
>()({ Naturalism });