import { useEffect, createContext, useState, useRef } from "react";
import type { ReactNode } from "react";
import { getScrollableParent } from "powerhooks/getScrollableParent"
import { useDomRect } from "powerhooks/useDomRect";
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
};



export function SmoothScrollProvider(props: SmoothScrollProviderProps) {
	const { children } = props;
	const {
		domRect: { height }, ref: contentWrapperRef
	} = useDomRect();
	const rootRef = useRef<HTMLDivElement>(null);
	const [globalState, setGlobalState] = useState<GlobalStateType>({ "isScrollable": true });
	const scrollTopWhenNotIsScrollableRef = useRef<number | undefined>(undefined);
	const [isScrollingToTop, setIsScrollingToTop] = useState(false)
	const transitionRef = useRef({
		"transition": "top 500ms",
		"timingFunction": "cubic-bezier(.15,.67,.15,.97)"
	});


	const scrollToTop = useConstCallback(() => {
		setIsScrollingToTop(true);
	});

	useEffect(function handleNavPrevNextEvent(){

    window.addEventListener('popstate', scrollToTop);

    return () => {
      window.removeEventListener('popstate', scrollToTop);
    };
  }, [scrollToTop]);

	useEffect(function setInitialStyle(){
		if(isTouchDevice()){
			return;
		}
		const contentWrapperStyle = contentWrapperRef.current.style;

		contentWrapperStyle.position = "fixed";
		contentWrapperStyle.transition = transitionRef.current.transition;
		contentWrapperStyle.transitionTimingFunction = transitionRef.current.timingFunction;

	},[contentWrapperRef])
	useEffect(function setHeight(){
		if(!rootRef.current){
			return;
		}
		rootRef.current.style.height = `${height}px`;

	},[height])

	useEffect(function handleScrollToTop(){
		if(!isScrollingToTop || !rootRef.current){
			return;
		};
		contentWrapperRef.current.style.transition = "none";
		contentWrapperRef.current.style.transitionTimingFunction = "none";
		const scrollableParent = getScrollableParent({
			"doReturnElementIfScrollable": true,
			"element": contentWrapperRef.current
		});
		if(rootRef.current.style.height === "100vh"){
			rootRef.current.style.height = `${height}px`;
		}

		contentWrapperRef.current.style.top = "0px";
		scrollableParent.scrollTo({
			"top": 0
		});
		scrollTopWhenNotIsScrollableRef.current = 0;

		setIsScrollingToTop(false);

	},[isScrollingToTop, contentWrapperRef, height]);

	useEffect(function resetTransitionsAfterScrollTop(){
		if(isScrollingToTop){
			return;
		}
		contentWrapperRef.current.style.transition = transitionRef.current.transition;
		contentWrapperRef.current.style.transitionTimingFunction = transitionRef.current.timingFunction;

	},[isScrollingToTop, contentWrapperRef])

	useEffect(function handleToggleIsScrollable(){
		if(isScrollingToTop){
			return;
		}
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
			if(isTouchDevice()){
				rootRef.current.style.overflow = "hidden";
			};
			return;
		}
		if(isTouchDevice()){
			rootRef.current.style.overflow = "visible";
		};
		rootRef.current.style.height = `${height}px`;
		scrollableParent.scrollTo({
			"top": scrollTopWhenNotIsScrollableRef.current
		});
		scrollTopWhenNotIsScrollableRef.current = undefined;

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [contentWrapperRef, globalState.isScrollable, isScrollingToTop])


	useEffect(function handleScrollEvent() {
		if (isTouchDevice() || !globalState.isScrollable) {
			return;
		}
		const scrollableParent = getScrollableParent({
			"doReturnElementIfScrollable": true,
			"element": contentWrapperRef.current
		});

		const handleScroll = () => {
			contentWrapperRef.current.style.top = `-${scrollableParent.scrollTop}px`;
		};

		scrollableParent.addEventListener("scroll", handleScroll)

		return () => {
			scrollableParent.removeEventListener("scroll", handleScroll)
		}
	}, [contentWrapperRef, globalState.isScrollable])

	return <ScrollContext.Provider value={{ globalState, setGlobalState, scrollToTop }} >
		<div ref={rootRef}>
			<div ref={contentWrapperRef}>
				{
					children
				}
			</div>
		</div>
	</ScrollContext.Provider>

}
