import { useEffect, createContext, useState, useRef } from "react";
import type { ReactNode } from "react";
import { getScrollableParent } from "powerhooks/getScrollableParent"
import { useDomRect } from "powerhooks/useDomRect";
import { makeStyles } from "theme";
import { isTouchDevice } from "../tools/isTouchDevice";
import { useConstCallback } from "powerhooks/useConstCallback";

type GlobalStateContextType = {
	globalState: GlobalStateType;
	setGlobalState: React.Dispatch<React.SetStateAction<GlobalStateType>>;
	scrollToTop: () => void;
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
	const scrollTopWhenNotIsScrollableRef = useRef<number | undefined>(undefined);
	const isScrollingToTopRef = useRef<boolean>(false);


	const scrollToTop = useConstCallback(() => {
		isScrollingToTopRef.current = true;
	});


	useEffect(function handleScrollEvent(){
		if (isTouchDevice()) {
			return;
		}

		(function handleToggleIsScrollable() {
			if (!rootRef.current || height === 0) {
				return;
			}

			const scrollableParent = getScrollableParent({
				"doReturnElementIfScrollable": true,
				"element": contentWrapperRef.current
			});


			if (!globalState.isScrollable) {
				scrollTopWhenNotIsScrollableRef.current = scrollableParent.scrollTop;
				rootRef.current.style.height = "100vh";
				return;
			}


			rootRef.current.style.height = `${height}px`;

			scrollableParent.scrollTo({
				"top": (() => {
					if (isScrollingToTopRef.current) {
						isScrollingToTopRef.current = false;
						contentWrapperRef.current.style.top = "0px";
						return 0;
					}
					return scrollTopWhenNotIsScrollableRef.current;
				})()
			});
			scrollTopWhenNotIsScrollableRef.current = undefined;

		}())

		const scrollableParent = getScrollableParent({
			"doReturnElementIfScrollable": true,
			"element": contentWrapperRef.current
		});


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


	}, [contentWrapperRef, height, globalState.isScrollable])

	const { classes } = useStyles({
		height,
		"isScrollable": globalState.isScrollable,
		"isTouchDevice": isTouchDevice(),
		"isScrollingToTop": isScrollingToTopRef.current,

	}, { props });

	return <ScrollContext.Provider value={{ globalState, setGlobalState, scrollToTop }} >
		<div ref={rootRef} className={classes.root}>
			<div ref={contentWrapperRef} className={classes.contentWrapper}>
				{
					children
				}

			</div>

		</div>
	</ScrollContext.Provider>

}


const useStyles = makeStyles<{
	height: number;
	isScrollable: boolean;
	isTouchDevice: boolean;
	isScrollingToTop: boolean;
}>()((...[, { height, isScrollable, isTouchDevice, isScrollingToTop }]) => {
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
				"transition": isScrollingToTop ? "none" : "top 500ms",
				"transitionTimingFunction": isScrollingToTop ? "none" : "cubic-bezier(.15,.67,.15,.97)"
			})
		}
	})
});