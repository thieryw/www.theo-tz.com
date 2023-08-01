import { makeStyles } from "theme";
import type { Link } from "../tools/link";
import { Text } from "../theme";

export type LinkButtonProps = {
	link: Link;
	label: string;
	className?: string;
	classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
};

export function LinkButton(props: LinkButtonProps) {
	const { link, className, label } = props;



	const { classes, cx } = useStyles(undefined, {props});

	return (
		<div className={cx(classes.root, className)}>
			<div className={classes.decorativeLine}></div>
			<a className={classes.link} {...link}><Text className={classes.label} typo="navigation label">{label}</Text></a>
		</div>
	);
}

const useStyles = makeStyles<void, "label">()((theme, _params, classes) => ({
	"root": {
		"display": "flex",
		"alignItems": "center"
	},
	"decorativeLine": {
		"width": theme.spacing(4),
		"height": 1,
		"border": `solid ${theme.colors.palette.dark.greyVariant4} 1px`,
		"marginRight": theme.spacing(3)
	},
	"label": {
		"fontSize": "1rem",
		"fontWeight": "500",
		"letterSpacing": "0.3rem",
		"transition": "transform 300ms",
	},
	"link": {
		"textDecoration": "none",
		[`&:hover .${classes.label}`]: {
			"transform": `translateX(${theme.spacing(2)}px)`
		}

	}
}));