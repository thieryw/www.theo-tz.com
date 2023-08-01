import { memo, useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { makeStyles } from "../theme";
import { Text } from "../theme";
import { breakpointsValues } from "onyxia-ui/lib/breakpoints"
import UnfoldIcon from '@mui/icons-material/FormatLineSpacing';
import { useDomRect } from "powerhooks/useDomRect";
import { useConstCallback } from "powerhooks";
import { useClickAway } from "powerhooks";
import { Evt } from "evt";
import { getScrollableParent } from "powerhooks/getScrollableParent";

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
	}[],
	className?: string;
	classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
	position?: "sticky" | "fixed";
	behavior?: "smart";
	scrollToTop?: boolean;
}





export const Header = memo((props: HeaderProps) => {
	const { links, title, className, logoLinks, position, behavior, scrollToTop } = props;

	const [isMenuUnfolded, setIsMenuUnfolded] = useState(false);
	const [isMenuVisible, setIsMenuVisible] = useState(true);



	const { domRect: {
		height: headerHeight
	}, ref: headerRef } = useDomRect();

	const {
		domRect: {
			height: linksHeight
		},
		ref: linksRef


	} = useDomRect();

	const { classes, cx } = useStyles({
		headerHeight,
		isMenuUnfolded,
		linksHeight,
		isMenuVisible,
		position,
		behavior,
		"hasTitle": title !== undefined
	}, { props });

	const { ref } = useClickAway({
		"onClickAway": () => {
			if (!isMenuUnfolded) {
				return;
			}
			setIsMenuUnfolded(false);
		}
	})


	const toggleMenu = useConstCallback(() => {
		setIsMenuUnfolded(!isMenuUnfolded)
	});

	useEffect(() => {
		if (behavior === undefined || headerHeight === 0) {
			return;
		}

		const scrollableParent = getScrollableParent({
			"doReturnElementIfScrollable": true,
			"element": ref.current
		});
		if (scrollableParent === null) {
			return;
		}
		const ctx = Evt.newCtx();
		let previousScrollTop = 0;
		let relativeScrollTop = 0;
		Evt.from(ctx, scrollableParent, "scroll").attach(() => {
			if (scrollableParent.scrollTop > previousScrollTop) {
				if (relativeScrollTop > headerHeight) {
					setIsMenuVisible(false);
				} else {
					relativeScrollTop = relativeScrollTop + scrollableParent.scrollTop - previousScrollTop;
				}
			}
			if (scrollableParent.scrollTop < previousScrollTop) {
				setIsMenuVisible(true);
				relativeScrollTop = 0;
			}
			previousScrollTop = scrollableParent.scrollTop;
		})

	}, [headerHeight, ref, behavior])

	return <header className={cx(classes.root, className)} ref={headerRef} >
		<div ref={ref} className={classes.headerInner}>
			<div className={classes.title}>{title}</div>

			<div className={classes.linkAndLogoLinkWrapper}>
				<Links
					className={classes.links}
					links={links}
					classes={{
						"link": classes.link,
						"linkWrapper": classes.linkWrapper,
						"linkUnderline": classes.linkUnderline
					}}
					scrollToTop={scrollToTop ?? false}
				/>
				{
					logoLinks !== undefined &&
					<div className={classes.logoLinks}>
						{
							logoLinks.map(({ logo, ...rest }) => <a key={rest.href} className={classes.logoLink} {...rest}>{logo}</a>)
						}
					</div>
				}

				<div className={classes.unfoldIcon} onClick={toggleMenu}>
					<UnfoldIcon />
				</div>
			</div>

			<div className={classes.smallDeviceLinksWrapper}>
				<div className={classes.smallDeviceLinksInnerWrapper} ref={linksRef}>
					<Links
						scrollToTop={scrollToTop ?? false}
						links={links}
						className={classes.smallDeviceLinks}
						classes={{
							"link": classes.smallDeviceLink,
							"linkWrapper": classes.smallDeviceLinkWrapper,
							"linkUnderline": classes.smallDeviceLinkUnderline
						}}
					/>

				</div>
			</div>

		</div>

	</header>
})

const useStyles = makeStyles<{
	headerHeight: number;
	isMenuUnfolded: boolean;
	linksHeight: number;
	isMenuVisible: boolean;
	position: "sticky" | "fixed" | undefined;
	behavior: "smart" | undefined;
	hasTitle: boolean;
}>()(
	(theme, { headerHeight, isMenuUnfolded, linksHeight, isMenuVisible, position, behavior, hasTitle }) => ({
		"root": {
			...theme.spacing.topBottom("padding", `${theme.spacing(3)}px`),
			position,
			"zIndex": 2,
			...(behavior === "smart" ? {
				"top": !isMenuVisible ? -(headerHeight + 50) : 0,
				"transition": "top 300ms",
			} : {
				"top": 0
			}),
			"background": "rgba(0,0,0,80%)",
			"width": "100%"
		},
		"headerInner": {
			...theme.spacing.rightLeft("padding", `${theme.spacing(3)}px`),
			"display": "flex",
			"position": "relative",
			"alignItems": "center",
			"justifyContent": hasTitle ? "space-between" : "center"
		},
		"unfoldIcon": {
			"display": "none",
			"pointerEvents": "none",
			"color": theme.colors.palette.light.greyVariant2,
			...(theme.windowInnerWidth < breakpointsValues.md ? {
				"display": "block",
				"pointerEvents": "unset"
			} : {}),
			"marginLeft": theme.spacing(6)

		},
		"smallDeviceLinksWrapper": {
			"position": "absolute",
			"background": "rgba(0,0,0,80%)",
			"top": headerHeight - theme.spacing(3),
			"left": -theme.spacing(2),
			"width": "100vw",
			"opacity": 0,
			"height": 0,
			"overflow": "hidden",
			"pointerEvents": "none",
			"display": "flex",
			"flexDirection": "column",
			"alignItems": "flex-start",
			"justifyContent": "center",
			"transition": "height 300ms, border-top-color 300ms",
			...theme.spacing.rightLeft("padding", `${theme.spacing(3)}px`),
			...(theme.windowInnerWidth < breakpointsValues.md ? {
				"borderTop": isMenuUnfolded ? `solid 1px ${theme.colors.useCases.typography.textSecondary}` : undefined,
				"height": isMenuUnfolded && isMenuVisible ? linksHeight : 0,
				"opacity": 0.94,
				"pointerEvents": "unset"
			} : {})
		},

		"smallDeviceLinksInnerWrapper": {
			...theme.spacing.topBottom("padding", `${theme.spacing(6)}px`)
		},

		"smallDeviceLinks": {
			"flexDirection": "column",
			"display": "flex",
			...(theme.windowInnerWidth < breakpointsValues.md ? {
				"opacity": 1,
				"pointerEvents": "unset"
			} : {})
		},
		"logoLinks": {
			"marginLeft": theme.spacing(5)
		},
		"linkAndLogoLinkWrapper": {
			"display": "flex",
			"alignItems": "center"


		},
		"links": {},
		"logoLink": {
			...theme.spacing.rightLeft("margin", `${theme.spacing(2)}px`)
		},
		"title": {},
		"link": {},
		"linkWrapper": {},
		"linkUnderline": {},
		"smallDeviceLink": {},
		"smallDeviceLinkWrapper": {},
		"smallDeviceLinkUnderline": {},

	})
)

const { Links } = (() => {

	type LinksProps = {
		links: HeaderProps["links"];
		className?: string;
		classes?: {
			linkWrapper?: string;
			link?: string;
			linkUnderline?: string;
		};
		scrollToTop: boolean;
	}

	const useStyles = makeStyles()(
		theme => ({
			"links": {
				"display": "flex",
				"justifyContent": "center",
				"flex": 1,
				"flexWrap": "wrap",
				...(theme.windowInnerWidth < breakpointsValues.md ? {
					"display": "none",
					"pointerEvents": "none"

				} : {})
			},
			"linkWrapper": {
				"display": "flex",

			}
		})
	)


	const Links = memo((props: LinksProps) => {

		const { links, className, classes: classesProp, scrollToTop } = props;

		const { classes, cx } = useStyles();

		return <div className={cx(classes.links, className)}>{
			links.map(({ href, label, onClick }) => <div key={label} className={classes.linkWrapper}><Link
				href={href}
				label={label}
				onClick={onClick}
				classes={{
					"link": classesProp?.link,
					"underline": classesProp?.linkUnderline
				}}
				className={classesProp?.linkWrapper}
				scrollToTop={scrollToTop}
			/></div>)

		}</div>


	})

	return { Links };
})();


const { Link } = (() => {

	type LinkProps = HeaderProps["links"][number] & {
		className?: string;
		scrollToTop: boolean;
		classes?: {
			link?: string;
			underline?: string;
		}
	};



	const Link = memo((props: LinkProps) => {
		const { href, label, onClick, className, classes: classesProp, scrollToTop } = props;
		const { classes, cx } = useStyles()
		const ref = useRef<HTMLDivElement>(null);



		return <div
			className={cx(classes.root, className)}
			ref={ref}
		>
			<a
				href={href}
				onClick={scrollToTop ? undefined : onClick}
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
					...theme.spacing.topBottom("margin", `${theme.spacing(3)}px`),
					"cursor": "none",
					...theme.spacing.rightLeft("margin", `${theme.spacing(4)}px`),
					[`&:hover .${classes.underline}`]: {
						"width": "110%",
						...(theme.windowInnerWidth < breakpointsValues.md ? {
							"width": "50%",
						} : {})
					},
					...(theme.windowInnerWidth < breakpointsValues.md ? {
						...theme.spacing.topBottom("margin", `${theme.spacing(3)}px`)
					} : {

					})
				},
				"link": {
					"textDecoration": "none"

				},
				"underline": {
					"width": 0,
					"position": "relative",
					"left": theme.windowInnerWidth >= breakpointsValues.md ? "-5%" : "5%",
					"top": theme.spacing(1),
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
					"color": theme.colors.palette.light.greyVariant2
				}
			}
		}
	)

	return { Link }

})();