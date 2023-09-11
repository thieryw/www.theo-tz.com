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

		(()=>{
			if (!Element.prototype.animate) {
				trackRef.current.style.transition = 'transform 1.2s cubic-bezier(0.25, 0.1, 0.25, 1)';
				trackRef.current.style.transform = `translate(${nextPercentage}%)`;
				return;
			}
			trackRef.current.animate({
				"transform": `translate(${nextPercentage}%)`
			}, {
				"duration": 1200,
				"fill": "forwards"
			});
		})()

		if(!Element.prototype.animate){
			return;
		}

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
					slides.map(({ image: { src, alt, sources }, extraContent }, index) => <div style={{
						"marginLeft": index === 0 ? undefined : theme.spacing(5)
					}} key={src} className={classes.slide}>
						<div className={classes.pictureWrapper}>
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

						</div>
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
			"position": "relative",
			"left": "50%",
			"userSelect": "none",
			"width": imageWidth * numberOfSlides + (() => {
				if (numberOfSlides === 1) {
					return 0;
				}
				if (numberOfSlides === 2) {
					return gap;
				}
				return (numberOfSlides - 1) * gap
			})()
		},
		"slide": {
			"position": "relative",
			"width": imageWidth,
			"overflow": "hidden",
			"display": "flex",
			"flexDirection": "column"

		},
		"pictureWrapper": {

		},
		"image": {
			"width": imageWidth,
			"height": 380,
			"objectFit": "cover",
			"objectPosition": (()=>{
				if(!Element.prototype.animate){
					return "center";
				}

				return "100% center"
			})(),
		}
	})
})