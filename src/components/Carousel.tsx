import { useRef, useMemo, useEffect } from 'react';
import { useConstCallback } from "powerhooks";
import { makeStyles, breakpointsValues } from "../theme";
import { Source } from "../tools/source";
import type { ReactNode } from "react";
import type { Link } from "../tools/link";
import { CardLink } from "./CardLink";
import { useCallbackFactory } from "powerhooks/useCallbackFactory";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


export type CarouselProps = {
	className?: string;
	classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
	startingPercentage?: number;
	slides: {
		image: {
			src: string;
			alt?: string;
			sources?: Source[]
		},
		title?: string;
		paragraph?: string;
		link?: {
			label: string;
		} & Link;
		extraContent?: ReactNode;
	}[];
};

export const Carousel = (props: CarouselProps) => {
	const { slides, className, startingPercentage = 0 } = props;
	const trackRef = useRef<HTMLDivElement>(null);
	const carouselRef = useRef<HTMLDivElement>(null);
	const percentageBarRef = useRef<HTMLDivElement>(null);

	const { classes, cx, theme } = useStyles({
		"numberOfSlides": slides.length
	}, { props });


	const animate = useConstCallback((nextPercentage: number)=>{
		if(!trackRef.current || !percentageBarRef.current){
			return;
		};

		percentageBarRef.current.style.width = `${2 * -nextPercentage}px`
		trackRef.current.style.transform = `translate(${nextPercentage}%)`;

		const imageElements = Array.from(trackRef.current.getElementsByClassName(classes.image));

		for (const image of imageElements) {
			(image as HTMLImageElement).style.objectPosition = `${100 + nextPercentage}% center`;
		}
	});

	useEffect(()=>{
		if(!trackRef.current){
			return;
		}
		trackRef.current.dataset.percentage = `-${startingPercentage}`;
		animate(-startingPercentage);

	}, [animate, startingPercentage])

	const navigateFactory = useCallbackFactory((
		[direction]: ["back" | "forwards"]
	) => {
		if(!trackRef.current){
			return;
		}
		const percentage = parseFloat(trackRef.current.dataset.percentage ?? "0");
		if(direction === "back" && (percentage === 0 || percentage === undefined)){
			return;
		}
		if(direction === "forwards" && percentage <= -100){
			return;
		}


		const getNextPercentage = () => {
			switch(direction){
				case "back": return (()=>{
					if(percentage + 100 / 3 > 0){
						return 0;
					}
					return percentage + 100 / 3;
				})()
				case "forwards": return (()=>{
					if(percentage - 100 / 3 < -100){
						return - 100;
					}
					return percentage - 100 / 3;
				})();
			};
		};
		const nextPercentage = getNextPercentage();

		trackRef.current.dataset.percentage = nextPercentage.toString();
		trackRef.current.dataset.prevPercentage = nextPercentage.toString();

		animate(nextPercentage);

	})

	const nextPercentageFactor = useMemo(() => {
		if (theme.windowInnerWidth < breakpointsValues.md && theme.windowInnerWidth >= breakpointsValues.sm) {
			return 2;
		}

		if (theme.windowInnerWidth < breakpointsValues.sm) {
			return 4;
		};

		return 1;

	}, [theme.windowInnerWidth])


	const handleOnDown = useConstCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
		if (!trackRef.current) {
			return;
		}
		const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
		trackRef.current.dataset.mouseDownAt = `${clientX}`;
	});

	const handleOnUp = useConstCallback(() => {
		if (!trackRef.current) {
			return;
		}
		trackRef.current.dataset.mouseDownAt = "0";
		trackRef.current.dataset.prevPercentage = trackRef.current.dataset.percentage || "0";
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
		animate(nextPercentage);

	});

	const handleFocus = useConstCallback(() => {
		if (!carouselRef.current) {
			return;
		}
		carouselRef.current.scrollLeft = 0;
	});


	return (
		<div className={cx(classes.root, className)}>
			<div
				ref={carouselRef}
				className={classes.carousel}
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
						slides.map(({ image: { src, alt, sources }, title, link, paragraph, extraContent }, index) => <div style={{
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
								(title !== undefined || paragraph !== undefined || link !== undefined) &&
								<CardLink
									title={title}
									paragraph={paragraph}
									link={link}
									className={classes.card}
									classes={{
										"title": classes.cardTitle,
										"paragraph": classes.cardParagraph,
										"linkLabel": classes.cardLinkLabel,
										"titleWrapper": classes.cardTitleWrapper
									}}
									onLinkFocus={handleFocus}
								/>

							}
							{
								extraContent !== undefined &&
								extraContent
							}
						</div>)
					}
				</div>

			</div>

			<div className={classes.navigationTools}>
				<div className={classes.arrows}>
					<ArrowBackIcon className={cx(classes.arrow, classes.back)} onClick={navigateFactory("back")} />
					<ArrowForwardIcon className={cx(classes.arrow, classes.forwards)} onClick={navigateFactory("forwards")} />
				</div>
				<div className={classes.percentageBar}>
					<div ref={percentageBarRef} className={classes.percentageBarInner}></div>

				</div>

			</div>
		</div>
	);
};


const useStyles = makeStyles<{ numberOfSlides: number }>()((theme, { numberOfSlides }) => {
	const imageWidth = 340;
	const gap = theme.spacing(5)
	return ({
		"root": {},
		"carousel": {
			"width": "100vw",
			"position": "relative",
			"overflow": "hidden"
		},
		"navigationTools": {
			"display": "flex",
			"justifyContent": "center",
			"alignItems": "center",
			"marginTop": theme.spacing(9),
			...(theme.windowInnerWidth < breakpointsValues.md ? {
				"display": "none"

			}: {})
		},
		"arrows": {
			"display": "flex",
			"alignItems": "center",
			"marginRight": theme.spacing(3),
			"transform": "scale(1.2)",
			"& svg": {
				"fill": theme.colors.palette.dark.greyVariant2
			}

		},
		"arrow": {
			"cursor": "pointer",
			"transition": "transform 400ms",
			":hover": {
				"transform": "scale(1.1)"
			}
		},
		"back": {
			"marginRight": theme.spacing(2),
		},
		"forwards": {
			"marginLeft": theme.spacing(2),

		},
		"percentageBar": {
			"width": 200,
			"height": 2,
			"backgroundColor": theme.colors.palette.light.greyVariant1,
			"position": "relative",
			"marginLeft": theme.spacing(3)
		},
		"percentageBarInner": {
			"width": 0,
			"height": "100%",
			"backgroundColor": theme.colors.palette.dark.greyVariant2,
			"transition": "width 1s cubic-bezier(0.25, 0.1, 0.25, 1)"
		},
		"track": {
			"display": "flex",
			"position": "relative",
			"left": "50%",
			"transition": "transform 1s cubic-bezier(0.25, 0.1, 0.25, 1)",
			"userSelect": "none",
			"cursor": "grab",
			":active": {
				"cursor": "grabbing"

			},
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
		"card": {
			"maxWidth": "none",
			"width": "100%",
			"background": "none",
			"padding": 0,
			"marginTop": theme.spacing(4),
			"justifyContent": "space-between",
			"flexGrow": 1
		},
		"cardTitleWrapper": {
			"marginBottom": theme.spacing(4)


		},
		"cardTitle": {
			"color": theme.colors.palette.dark.greyVariant1
		},
		"cardParagraph": {

			"color": theme.colors.palette.dark.greyVariant3,
		},
		"cardLinkLabel": {
			"color": theme.colors.palette.dark.greyVariant1
		},
		"image": {
			"width": imageWidth,
			"height": 380,
			"objectFit": "cover",
			"transition": "object-position 1s cubic-bezier(0.25, 0.1, 0.25, 1)",
			"objectPosition": (() => {
				if (!Element.prototype.animate) {
					return "center";
				}

				return "100% center"
			})(),
		}
	})
})