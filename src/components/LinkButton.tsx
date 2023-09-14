import { makeStyles } from "theme";
import type { Link } from "../tools/link";
import { Text } from "../theme";
import { memo, useContext } from "react"
import { useConstCallback } from "powerhooks/useConstCallback";
import { ScrollContext } from "./SmoothScrollProvider";

export type LinkButtonProps = {
	link: Link;
	label: string;
	className?: string;
	classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
	onFocus?: (e: React.FocusEvent<HTMLAnchorElement>) => void;
};

export const LinkButton = memo((props: LinkButtonProps) => {
	const { link, className, label, onFocus } = props;
	const { classes, cx } = useStyles(undefined, { props });
	const context = useContext(ScrollContext);

	const scrollToTop = useConstCallback(() => {
		context?.scrollToTop();
	});
	const handleFocus = useConstCallback((e: React.FocusEvent<HTMLAnchorElement>) => {

		if(onFocus === undefined){
			return;
		};
		onFocus(e);

	});

	return (
		<div className={cx(classes.root, className)}>
			<div className={classes.decorativeLine}></div>
			<div onClick={scrollToTop} className={classes.linkWrapper}>
				<a onFocus={handleFocus} className={classes.link} {...link}><Text className={classes.label} typo="navigation label">{label}</Text></a>
			</div>
		</div>
	);
})

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

	},
	"linkWrapper": {
	}
}));