import { useState, memo, useRef, useContext } from 'react';
import type { ReactNode } from "react";
import { makeStyles, Text, breakpointsValues } from "../theme";
import { useConstCallback } from "powerhooks/useConstCallback";
import { ScrollContext } from "./SmoothScrollProvider";
import { Logo } from "./Logo";

export type HeaderProps = {
	links: {
		label: string;
		href: string;
		onClick?: () => void;
	}[];
	title?: ReactNode;
	logoLinks?: {
		logo: ReactNode;
		href: string;
		onClick?: () => void;
		linkText?: string;
	}[],
	className?: string;
	classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
}

export function Header(props: HeaderProps) {
	const { links, className, logoLinks, title } = props;
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const context = useContext(ScrollContext);


	const { classes, cx, theme } = useStyles({ isOpen }, { props });

	const toggleMenu = useConstCallback(() => {
		setIsOpen(!isOpen);
		if (context === undefined) {
			return;
		}

		context.setGlobalState({ "isScrollable": !isOpen ? false : true})
	})


	const handleMenuItemClick = useConstCallback(() => {

		setIsOpen(false);
		context?.setGlobalState({ "isScrollable": true});
		context?.scrollToTop();
	})


	return (
		<div ref={ref} className={cx(classes.root, className)}>
			<div className={classes.buttonAndTitleWrapper}>
				<button
					className={classes.button}
					aria-haspopup="true"
					aria-expanded={isOpen}
					aria-label="drop down menu button"
					onClick={toggleMenu}
				>
					<div className={cx(classes.hamburgerLine1, classes.hamburgerLine)}></div>
					<div className={cx(classes.hamburgerLine2, classes.hamburgerLine)}></div>
					<div className={classes.hamburgerLine3}></div>
				</button>

			</div>
			<div className={classes.menu} role="menu">
				{
					title !== undefined && theme.windowInnerWidth < breakpointsValues.md &&
					<div className={classes.titleWrapper}>
						{title}
					</div>
				}
				<div className={classes.linksWrapper}>
					{
						links.map(({ href, label, onClick }) => <div
							onClick={handleMenuItemClick}
							key={label}
							className={classes.linkWrapper}
						><Link
								href={href}
								onClick={onClick}
								label={label}
							/></div>)
					}

				</div>
				<div className={classes.titleAndContactWrapper}>
					{
						title !== undefined && theme.windowInnerWidth >= breakpointsValues.md &&
						<div className={classes.titleWrapper}>
							{title}
						</div>
					}

					{
						logoLinks !== undefined &&
						<div className={classes.logoLinks}>
							{
								logoLinks.map(({ logo, linkText, ...rest}) => <a
									key={rest.href}
									className={classes.logoLink} 
									{...rest}
									aria-label={linkText}
								>{typeof logo === "string" ?
									<Logo width={30} logoUrl={logo} /> :
									logo
									}
								</a>)
							}
						</div>
					}


				</div>

			</div>

		</div>
	);
};


const useStyles = makeStyles<{ isOpen: boolean }>()((theme, { isOpen }) => {
	const toggleButtonWidthAndHeight = 40
	return ({
		"root": {

			"zIndex": 4000,
			"position": "fixed",
			"top": 0,
			"height": isOpen ? "100vh" : undefined,
			"width": "100vw"
		},
		"buttonAndTitleWrapper": {
		},
		"linksWrapper": {
			"display": "flex",
			"flexDirection": "column",
			"alignItems": "flex-start",
			...theme.spacing.topBottom("margin", `${theme.spacing(7)}px`)
		},
		"linkWrapper": {
			...theme.spacing.topBottom("margin", `${theme.spacing(2)}px`)

		},

		"logoLinks": {
			"display": "flex",
			"marginTop": theme.windowInnerWidth < breakpointsValues.md ? undefined : theme.spacing(6),
		},
		"logoLink": {
			...theme.spacing.rightLeft("margin", `${theme.spacing(4)}px`),
			"transition": "transform 300ms",
			":hover": {
				"transform": "scale(1.2)",
			}
		},
		"titleWrapper": {
			"marginBottom": theme.windowInnerWidth < breakpointsValues.md ? undefined : theme.spacing(6),


		},
		"titleAndContactWrapper": {
			"display": "flex",
			"flexDirection": "column",
			"alignItems": "center",
		},
		"button": {
			"position": "absolute",
			"height": toggleButtonWidthAndHeight,
			"width": toggleButtonWidthAndHeight,
			"zIndex": 4001,
			"background": "none",
			"border": "none",
			"cursor": "pointer",
			"top": theme.spacing(6),
			"right": theme.spacing(7),
			"padding": 0
		},
		"menu": {
			"position": "absolute",
			"overflowY": "auto",
			"overflowX": "hidden",
			"width": "100%",
			"height": "100vh",
			"top": 0,
			"left": 0,
			"background": theme.colors.palette.customGradientColor,
			"display": "flex",
			"alignItems": "center",
			//"justifyContent": theme.windowInnerWidth < breakpointsValues.md ? "center" : "space-between",
			"justifyContent": "space-between",
			"transition": "opacity 500ms",
			"opacity": isOpen ? 1 : 0,
			"pointerEvents": isOpen ? undefined : "none",
			...(theme.windowInnerWidth < breakpointsValues.md ? {
				"flexDirection": "column",
				...theme.spacing.topBottom("padding", `${theme.spacing(8)}px`)
			} : {
				...theme.spacing.rightLeft("padding", `${theme.spacing(10)}px`),
			})
		},
		"hamburgerLine": {
			"transition": "transform 300ms, top 300ms, left 300ms",
			"position": "absolute",
			"left": isOpen ? "50%" : undefined,
			"width": toggleButtonWidthAndHeight,
			"height": 2,
			"backgroundColor": theme.colors.palette[isOpen ? "light" : "dark"].greyVariant1
		},
		"hamburgerLine1": {
			"top": isOpen ? "50%" : 14,

			"transform": isOpen ? "translate(-50%, -50%) rotate(45deg)" : undefined,
			//"marginBottom": 15
		},
		"hamburgerLine2": {
			"top": isOpen ? "50%" : 22,
			"transform": isOpen ? "translate(-50%, -50%) rotate(-45deg)" : undefined,
		},
		"hamburgerLine3": {
			"height": 2,
			"backgroundColor": theme.colors.palette[isOpen ? "light" : "dark"].greyVariant1,
			"position": "absolute",
			"width": toggleButtonWidthAndHeight / 2,
			"top": 30,
			"opacity": isOpen ? 0 : 1

		}

	})
})


const { Link } = (() => {

	type LinkProps = HeaderProps["links"][number] & {
		className?: string;
		classes?: {
			link?: string;
			underline?: string;
		}
	};



	const Link = memo((props: LinkProps) => {
		const { href, label, onClick, className, classes: classesProp } = props;
		const { classes, cx } = useStyles()
		const ref = useRef<HTMLDivElement>(null);



		return <div
			className={cx(classes.root, className)}
			ref={ref}
			role="menuitem"
		>
			<a
				href={href}
				onClick={onClick}
				className={classes.link}
			>
				<Text
					typo="navigation label"
					className={cx(classes.text, classesProp?.link)}
				>
					{label}
				</Text>

			</a>
			<div className={cx(classes.underline, classesProp?.underline)}></div>
		</div>

	})

	const useStyles = makeStyles<void, "underline">()(

		(theme, _params, classes) => {

			return {
				"root": {
					"display": "flex",
					"flexDirection": "column",
					"position": "relative",
					"cursor": "none",
					[`&:hover .${classes.underline}`]: {
						"width": "105%",
					},
				},
				"link": {
					"textDecoration": "none",

				},
				"underline": {
					"width": 0,
					"position": "relative",
					"top": theme.spacing(1),
					"left": theme.spacing(2),
					"height": 1,
					"backgroundColor": theme.colors.palette.light.greyVariant2,
					"transition": "width 200ms",
					...(theme.windowInnerWidth < breakpointsValues.md ? {
						"alignSelf": "flex-start"

					} : {})
				},
				"text": {
					...theme.spacing.rightLeft("padding", `${theme.spacing(2)}px`),
					...theme.typography.variants["navigation label"].style,
					"color": theme.colors.palette.light.greyVariant2,
					...(() => {
						const value = theme.windowInnerWidth >= breakpointsValues.md ? "2.3rem" : "1.5rem";
						return {
							"fontSize": value,
							"lineHeight": value,

						}
					})()
				}
			}
		}
	)

	return { Link }

})();