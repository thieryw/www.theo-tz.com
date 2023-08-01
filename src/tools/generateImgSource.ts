export function generateThumbnailImgSources(
	webpFilesSrc: string,
	jpegFilesSrc: string
) {

	return [
		{
			"srcSet": webpFilesSrc,
			"type": "image/webp"
		},
		{
			"srcSet": jpegFilesSrc,
			"type": "image/jpeg"
		}
	]
};


export function generateLightboxImgSources(
	webpLargeSrc: string,
	webpMediumSrc: string,
	jpegLargeSrc: string,
	jpegMediumSrc: string
) {

	return [
		{
			"media": "(min-width: 1921px)",
			"srcSet": webpLargeSrc,
			"type": "image/webp"
		},
		{
			"media": "(max-width: 1920px)",
			"srcSet": webpMediumSrc,
			"type": "image/webp"
		},
		{
			"media": "(min-width: 1921px)",
			"srcSet": jpegLargeSrc,
			"type": "image/jpeg"
		},
		{
			"media": "(max-width: 1920px)",
			"srcSet": jpegMediumSrc,
			"type": "image/jpeg"
		}
	]
};