import { memo } from "react";
import type { ReactNode } from "react";
import { makeStyles } from "../theme";

export type SexyColumnLayoutProps = {
	className?: string;
	columns: {
		nodes: ReactNode[];
		className?: string;
	}[];
}

export const SexyColumnLayout = memo((props: SexyColumnLayoutProps) => {

	const { columns, className } = props;
	const { classes, theme, cx } = useStyles();

	const getFlexGap = (
		direction: "column" | "row",
	) => {
		const value = theme.spacing(4);
		if (direction === "column") {
			return {
				"marginTop": value,
				"marginBottom": value
			}
		}
		return {
			"marginLeft": value,
			"marginRight": value
		}

	}

	return <div className={cx(classes.root, className)}>
		{
			columns.map(({ nodes, className }, index) => <div
				style={{
					...getFlexGap("row")
				}}
				className={cx(classes.column, className)}
				key={index}
			>
				{
					nodes.map((node, index) => <div
						key={index}
						className={classes.nodeWrapper}
						style={{
							...getFlexGap("column")
						}}
					>
						{node}
					</div>)
				}


			</div>)
		}
	</div>
});

const useStyles = makeStyles()(theme => {

	return {
		"root": {
			"display": "flex",
			"margin": -theme.spacing(4)
		},
		"column": {
			"position": "relative",
			"display": "flex",
			"flexDirection": "column",
			"justifyContent": "center",
			"maxWidth": 340,
		},
		"nodeWrapper": {

		}

	}

})

