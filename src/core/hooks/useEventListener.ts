import { useEffect, useRef, RefObject } from "react";

export const useEventListener = <T extends HTMLElement = HTMLDivElement>(
	eventName: string,
	handler: (event: Event | CustomEvent<unknown>) => void,
	element?: RefObject<T>
): void => {
	const savedHandler = useRef<(event: Event) => void>();
	
	useEffect(() => {
		const targetElement: T | Document = element?.current || document;
		
		if (!(targetElement && targetElement.addEventListener)) {
			return;
		}
		
		if (savedHandler.current !== handler) {
			savedHandler.current = handler;
		}
		
		const eventListener = (event: Event) => {
			if (!!savedHandler.current) {
				savedHandler.current(event);
			}
		}
		
		targetElement.addEventListener(eventName, eventListener);
		
		return () => {
			targetElement.removeEventListener(eventName, eventListener);
		};
	}, [eventName, handler, element])
}