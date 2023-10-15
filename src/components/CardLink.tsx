import type { Link } from "../tools/link";
import { makeStyles, Text } from "../theme";
import { LinkButton } from "./LinkButton";

export type CardLinkProps = {
	className?: string;
	classes?: Partial<ReturnType<typeof useStyles>["classes"]>
	title?: string;
	paragraph?: string;
	link?: {
		label: string;
	} & Link;
	cardNumber?: string;
	onLinkFocus?: (e: React.FocusEvent<HTMLAnchorElement>)=> void;

};

export function CardLink(props: CardLinkProps) {
	const { cardNumber, className, link, paragraph, title, onLinkFocus } = props;
	const { classes, cx } = useStyles(undefined, { props });

	return <div className={cx(classes.root, className)}>
		<div className={classes.titleWrapper}>
			{
				cardNumber !== undefined &&
				<Text className={classes.cardNumber} typo="body 1">{cardNumber}</Text>
			}
			{
				title !== undefined &&
				<a className={classes.titleLink} {...link}>
					<Text className={classes.title} typo="my h3">{title}</Text>
				</a>
			}
		</div>
		{
			paragraph !== undefined &&
			<Text className={classes.paragraph} typo="body 1">{paragraph}</Text>
		}

		{
			link !== undefined &&
			<LinkButton 
				classes={{
					"label": classes.linkLabel
				}}
				label={link.label}
				link={link}
				onFocus={onLinkFocus}
			/>

		}


	</div>
};

const useStyles = makeStyles()(theme => {
	const color = theme.colors.palette.light.greyVariant1;
	return ({
		"root": {
			"background": theme.colors.palette.customGradientColor,
			"display": "flex",
			"flexDirection": "column",
			"maxWidth": 340,
			//temp
			"padding": theme.spacing({
				"rightLeft": `${theme.spacing(6)}px`,
				"topBottom": `${theme.spacing(7)}px`
			})
		},
		"titleWrapper": {
			"position": "relative",
			"marginBottom": theme.spacing(5)
		},
		"title": {
			color,
			"textTransform": "uppercase",
			"position": "relative",
			"zIndex": 2
		},
		"titleLink": {
			"textDecoration": "none"

		},
		"cardNumber": {
			"position": "absolute",
			"bottom": 0,
			"right": -theme.spacing(2),
			"fontSize": "7rem",
			"lineHeight": "5rem",
			"fontFamily": "'Cormorant Garamond', serif",
			"fontStyle": "italic",
			"color": theme.colors.palette.dark.greyVariant2,
			"opacity": "0.8",
			"zIndex": 1,
			"fontWeight": "500"
		},
		"paragraph": {
			color,
			"marginBottom": theme.spacing(5)
		},
		"linkLabel": {
			color
		}
	})
})