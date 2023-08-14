import { makeStyles, breakpointsValues } from "theme";
import { Text } from "theme";
import { memo } from "react";

type GalleryNavBarProps = {
	className?: string;
	links: {
		label: string;
		href: string;
		onClick?: () => void;
	}[]
	activeTabLabel: string;
}

export const GalleryNavBar = memo((props: GalleryNavBarProps) => {
	const { links, className, activeTabLabel } = props;
	const { classes, cx } = useStyles();



	return <div className={cx(classes.root, className)}>
		<div className={classes.linkWrapper}>
			{
				links.map(({ label, ...rest }) => <Link
					{...rest}
					label={label}
					key={label}
					isActive={label === activeTabLabel}
					className={classes.link}

				/>)
			}

		</div>

	</div>
})

const useStyles = makeStyles()(theme => {
	return ({
		"root": {
			"display": "flex",
			"justifyContent": "center",
		},
		"linkWrapper": {
			"display": "flex",
			"flexDirection": theme.windowInnerWidth < breakpointsValues.md ? "column" : undefined,
			...theme.spacing.rightLeft("margin", `-${theme.spacing(2)}px`),
			"width": theme.windowInnerWidth < breakpointsValues.md ? "100%" : undefined

		},
		"link": {
			...theme.spacing.rightLeft("margin", `${theme.spacing(2)}px`)

		}

	});
});


const { Link } = (() => {
	type LinkProps = GalleryNavBarProps["links"][number] & {
		isActive: boolean;
		className?: string;
	};


	const Link = memo((props: LinkProps) => {
		const { label, isActive, className, ...rest } = props;
		const { classes, cx } = useStyles({ isActive });
		return <a
			{...rest}
			className={cx(classes.root, className)}
		>
			<div className={classes.tab}>
				<Text className={classes.text} typo="navigation label">{label}</Text>
			</div>

		</a>
	});

	const useStyles = makeStyles<{ isActive: boolean; }>()((theme, { isActive }) => {
		return ({
			"root": {
				"textDecoration": "none",
			},
			"tab": {
				"padding": theme.spacing({
					"rightLeft": `${theme.spacing(3)}px`,
					"topBottom": `${theme.spacing(2)}px`
				}),
				"transition": "backgroundColor 400ms",
				"backgroundColor": isActive ? theme.colors.palette.light.greyVariant2 : undefined
			},
			"text": {
				"color": isActive ? theme.colors.palette.dark.greyVariant1 : theme.colors.palette.dark.greyVariant2,
				"transition": "color 600ms",
				":hover": {
					"color": theme.colors.palette.dark.greyVariant1,
				},
				"textAlign": "center"

			}
		});
	});
	return { Link }

})()