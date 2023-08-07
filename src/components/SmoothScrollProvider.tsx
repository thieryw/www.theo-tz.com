import { useEffect, createContext, useState, useRef } from "react";
import type { ReactNode } from "react";
import { getScrollableParent } from "powerhooks/getScrollableParent"
import { useDomRect } from "powerhooks/useDomRect";
import { makeStyles } from "theme";
import { isTouchDevice } from "../tools/isTouchDevice";

type GlobalStateContextType = {
	globalState: GlobalStateType;
	setGlobalState: React.Dispatch<React.SetStateAction<GlobalStateType>>;
};

export type GlobalStateType = {
	isScrollable: boolean;
}
export const ScrollContext = createContext<GlobalStateContextType | undefined>(undefined);


export type SmoothScrollProviderProps = {
	children?: ReactNode;
	className?: string;
	classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
};



export function SmoothScrollProvider(props: SmoothScrollProviderProps) {
	const { children } = props;
	const {
		domRect: { height }, ref: contentWrapperRef
	} = useDomRect();
	const rootRef = useRef<HTMLDivElement>(null);
	const [globalState, setGlobalState] = useState<GlobalStateType>({ "isScrollable": true });
	const [scrollTopWhenNotIsScrollable, setCurrentScrollTop] = useState<number | undefined>(0);

	useEffect(() => {
		if(isTouchDevice()){
			return;
		}

		const scrollableParent = getScrollableParent({
			"doReturnElementIfScrollable": true,
			"element": contentWrapperRef.current
		});

		(() => {
			if (!rootRef.current || height === 0) {
				return;
			}

			if (!globalState.isScrollable) {
				setCurrentScrollTop(scrollableParent.scrollTop);
				rootRef.current.style.height = "100vh";
				return;
			}
			setCurrentScrollTop(undefined);

			rootRef.current.style.height = `${height}px`;

			scrollableParent.scrollTo({
				"top": scrollTopWhenNotIsScrollable,
			});
		})()

		if (!globalState.isScrollable) {
			return;
		}

		const handleScroll = () => {
			contentWrapperRef.current.style.top = `-${scrollableParent.scrollTop}px`;
		};

		scrollableParent.addEventListener("scroll", handleScroll)

		return () => {
			scrollableParent.removeEventListener("scroll", handleScroll)
		}


		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [contentWrapperRef, height, globalState])

	const { classes } = useStyles({ height, "isScrollable": globalState.isScrollable, "isTouchDevice": isTouchDevice() }, { props });

	return <ScrollContext.Provider value={{ globalState, setGlobalState }} >
		<div ref={rootRef} className={classes.root}>
			<div ref={contentWrapperRef} className={classes.contentWrapper}>
				{
					children
				}

			</div>

		</div>
	</ScrollContext.Provider>

}


const useStyles = makeStyles<{ height: number; isScrollable: boolean; isTouchDevice: boolean; }>()((...[, { height, isScrollable, isTouchDevice }]) => {
	return ({
		"root": {
			...(isTouchDevice ? {} : {
				height,
				"overflow": isScrollable ? undefined : "hidden"
			}),

		},
		"contentWrapper": {
			...(isTouchDevice ? {} : {
				"position": "fixed",
				"transition": "top 500ms",
				"transitionTimingFunction": "cubic-bezier(.15,.67,.15,.97)"
			})
		}
	})
});