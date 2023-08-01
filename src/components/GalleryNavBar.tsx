import { makeStyles } from "theme";
import { Text } from "theme";

type GalleryNavBarProps = {
	className?: string;
	links: {
		label: string;
		href: string;
		onClick?: () => void;
	}[]
	activeTabLabel: string;
}

export function GalleryNavBar(props: GalleryNavBarProps) {
	const { links, className, activeTabLabel } = props;
	const { classes, cx } = useStyles();



	return <div className={cx(classes.root, className)}>
		{
			links.map(({ label, href, onClick }) => <a
				className={classes.link}
				key={label}
				onClick={onClick}
				href={href}
				style={{
					"backgroundColor": activeTabLabel === label ? "gray" : undefined
				}}
			>
				<div className={classes.tab}>
					<Text typo="navigation label">{label}</Text>
				</div>
			</a>)
		}

	</div>
}

const useStyles = makeStyles()(theme => {
	return ({
		"root": {
			"display": "flex",
			"justifyContent": "center"
		},
		"tab": {
			"padding": theme.spacing({
				"rightLeft": `${theme.spacing(3)}px`,
				"topBottom": `${theme.spacing(2)}px`
			})
		},
		"link": {
			"textDecoration": "none",
		}

	});
});