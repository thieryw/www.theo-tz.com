import { memo } from "react";
import { makeStyles } from "../theme";


export type BackgroundFadeProps = {
	className?: string;
	imageUrl?: string;
	isImageCovered?: boolean;
	fadeDirection?: "to left" | "to right" | "to bottom" | "to top";
	classes?: {
		imageBackground?: string;
		imageCover?: string;
	}
};



export const BackgroundFade = memo((props: BackgroundFadeProps) => {
	const { imageUrl, isImageCovered, className, classes: classesProp, fadeDirection } = props;
	const {classes, cx} = useStyles({
		"backgroundImageUrl": imageUrl,
		"fadeDirection": fadeDirection ?? "to left"
	});
	return <div className={cx(classes.root, className)}>
		{
			imageUrl !== undefined &&
			<div className={cx(classes.background, classes.imageBackground, classesProp?.imageBackground)}></div>
		}
		{
			isImageCovered !== undefined && isImageCovered &&
			<div className={cx(classes.background, classes.backgroundCover, classesProp?.imageCover)}></div>
		}

	</div>
});


const useStyles = makeStyles<{ 
	backgroundImageUrl: string | undefined; 
	fadeDirection: NonNullable<Required<BackgroundFadeProps["fadeDirection"]>>;
}>()(
	(theme, {backgroundImageUrl, fadeDirection}) => ({
		"root": {
			"width": "100%",
			"height": "100%",
			"position": "absolute",
			"top": 0,
		},
		"background": {
			"width": "100%",
			"height": "100%",
		},

		"imageBackground": {
			"backgroundImage": `url("${backgroundImageUrl}")`,
			"backgroundRepeat": "no-repeat",
			"backgroundSize": "cover",
			"backgroundPositionX": "center",
			"zIndex": -1,
		},
		"backgroundCover": {
			"position": "absolute",
			"top": "0",
			"left": "0",
			"background": theme.colors.palette.transparentBackground({"direction": fadeDirection}),
			"zIndex": 0



		}

	})
)