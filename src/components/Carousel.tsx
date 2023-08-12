import { useRef, useMemo } from 'react';
import { useConstCallback } from "powerhooks";
import { makeStyles, breakpointsValues } from "../theme";
import { Source } from "../tools/source";
import type { ReactNode } from "react";


export type CarouselProps = {
	className?: string;
	classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
	slides: {
		image: {
			src: string;
			alt?: string;
			sources?: Source[]
		},
		extraContent?: ReactNode;
	}[];
};

export const Carousel = (props: CarouselProps) => {
	const { slides, className } = props;
	const trackRef = useRef<HTMLDivElement>(null);

	const { classes, cx, theme } = useStyles({
		"numberOfSlides": slides.length
	}, { props });

	/*const nextPercentageFactor = useRef<number>((()=>{
		if(theme.windowInnerWidth < breakpointsValues.md && theme.windowInnerWidth >= breakpointsValues.sm){
			return 2;
		}

		if(theme.windowInnerWidth < breakpointsValues.sm){
			return 4;
		};

		return 1;
	})());*/
	const nextPercentageFactor = useMemo(()=>{
		if(theme.windowInnerWidth < breakpointsValues.md && theme.windowInnerWidth >= breakpointsValues.sm){
			return 2;
		}

		if(theme.windowInnerWidth < breakpointsValues.sm){
			return 4;
		};

		return 1;

	},[theme.windowInnerWidth])


	const handleOnDown = useConstCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
		if (trackRef.current) {
			const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
			trackRef.current.dataset.mouseDownAt = `${clientX}`;
		}
	});

	const handleOnUp = useConstCallback(() => {
		if (trackRef.current) {
			trackRef.current.dataset.mouseDownAt = "0";
			trackRef.current.dataset.prevPercentage = trackRef.current.dataset.percentage || "0";
		}
	});

	const handleOnMove = useConstCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
		if (!trackRef.current || trackRef.current.dataset.mouseDownAt === "0" || trackRef.current.dataset.mouseDownAt === undefined) {
			return;
		}

		const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
		const mouseDelta = parseFloat(trackRef.current.dataset.mouseDownAt) - clientX;
		const maxDelta = theme.windowInnerWidth / 2;

		const percentage = (mouseDelta / maxDelta) * -100;
		const prevPercentage = parseFloat(trackRef.current.dataset.prevPercentage || "0");
		const nextPercentageUnconstrained = prevPercentage + percentage / nextPercentageFactor;
		const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

		trackRef.current.dataset.percentage = `${nextPercentage}`;

		trackRef.current.animate({
			"transform": `translate(${nextPercentage}%)`
		}, {
			"duration": 1200,
			"fill": "forwards"
		})

		const imageElements = Array.from(trackRef.current.getElementsByClassName(classes.image));


		for (const image of imageElements) {
			(image as HTMLImageElement).animate({
				"objectPosition": `${100 + nextPercentage}% center`
			}, {
				"duration": 1200,
				"fill": "forwards"
			})
		}
	});

	return (
		<div
			className={cx(classes.root, className)}
			onMouseDown={handleOnDown}
			onMouseUp={handleOnUp}
			onMouseMove={handleOnMove}
			onTouchStart={handleOnDown}
			onTouchEnd={handleOnUp}
			onTouchMove={handleOnMove}
			onTouchCancel={handleOnUp}
			onMouseLeave={handleOnUp}
		>
			<div
				className={classes.track}
				ref={trackRef}
			>
				{
					slides.map(({ image: { src, alt, sources }, extraContent }) => <div key={src} className={classes.slide}>
						<picture>
							{
								sources !== undefined &&
								sources.map((source, index) => <source key={index} {...source} />)
							}
							<img
								className={classes.image}
								src={src}
								draggable={false}
								alt={alt ?? "carousel picture"}
							/>
						</picture>
						{
							extraContent !== undefined &&
							 	extraContent
						}
					</div>)
				}
			</div>

		</div>
	);
};


const useStyles = makeStyles<{ numberOfSlides: number }>()((theme, { numberOfSlides }) => {
	const imageWidth = 340;
	const gap = theme.spacing(5)
	return ({
		"root": {
			"width": "100vw",
			"position": "relative",
			"overflow": "hidden"

		},
		"track": {
			"display": "flex",
			"gap": gap,
			"position": "relative",
			"left": "50%",
			"userSelect": "none",
			"width": imageWidth * numberOfSlides + (()=>{
				if(numberOfSlides === 1){
					return 0;
				}
				if(numberOfSlides === 2){
					return gap;
				}
				return (numberOfSlides - 1) * gap
			})()
		},
		"slide": {

		},
		"image": {
			"width": imageWidth,
			"height": 380,
			"objectFit": "cover",
			"objectPosition": "100% center",
			"transition": "objectPosition 800ms"

		}
	})
})