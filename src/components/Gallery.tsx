import { ArtGallery } from "react-art-gallery";
import { generateLightboxImgSources, generateThumbnailImgSources } from "tools/generateImgSource";
import { breakpointsValues } from "theme";

type File = Record<string, {
	files: {
		large: {
			url: string;
			name: string;
		};
		medium: {
			url: string;
			name: string;
		};
		miniature: {
			url: string;
			name: string;
		};
	};
}>
export type GalleryProps = {
	jpg: File;
	webp: File;
}


export function Gallery(props: GalleryProps) {
	const { jpg, webp } = props;

	return <ArtGallery
		images={Object.values(webp).map((value, index) => {
			return {
				"thumbNail": {
					"src": value.files.miniature.url,
					"sources": generateThumbnailImgSources(value.files.miniature.url, Object.values(jpg)[index].files.miniature.url),
					"alt": value.files.miniature.name
				},
				"lightBox": {
					"src": value.files.large.url,
					"sources": generateLightboxImgSources(
						value.files.large.url,
						value.files.medium.url,
						Object.values(jpg)[index].files.large.url,
						Object.values(jpg)[index].files.medium.url,
					)
				}
			}
		})}
		thumbNailAlinement="vertical"
		hideImageNames={true}
		columnCountForVerticalAlinement={4}
		breakpointsForColumns={{
			"xl": breakpointsValues["xl"],
			"lg+": breakpointsValues["lg+"],
			"md": breakpointsValues["md"],
			"sm": breakpointsValues.sm
		}}


	/>

}