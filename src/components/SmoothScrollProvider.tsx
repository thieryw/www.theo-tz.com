import { useEffect } from "react";
import type { ReactNode } from "react";
import { getScrollableParent } from "powerhooks/getScrollableParent"
import { useDomRect } from "powerhooks/useDomRect";
import { Evt } from "evt";
import { makeStyles } from "theme";


export type SmoothScrollProviderProps = {
	children?: ReactNode;
	className?: string;
	classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
};



export function SmoothScrollProvider(props: SmoothScrollProviderProps) {
	const { children } = props;
	const {
		domRect: { height }, ref
	} = useDomRect();

	useEffect(() => {

		const scrollableParent = getScrollableParent({
			"doReturnElementIfScrollable": true,
			"element": ref.current
		});

		const ctx = Evt.newCtx();

		Evt.from(ctx, scrollableParent, "scroll").attach(() => {
			ref.current.style.top = `-${scrollableParent.scrollTop}px`;
		});


	}, [ref, height])

	const { classes } = useStyles({ height }, { props });

	return <div className={classes.root}>
		<div ref={ref} className={classes.contentWrapper}>
			{
				children
			}

		</div>

	</div>

}


const useStyles = makeStyles<{ height: number }>()((...[, { height }]) => {
	return ({
		"root": {
			height
		},
		"contentWrapper": {
			"position": "fixed",
			"transition": "top 500ms",
			"transitionTimingFunction": "cubic-bezier(.15,.67,.15,.97)"
		}
	})
});