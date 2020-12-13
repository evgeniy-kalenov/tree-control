import { useEffect, useRef } from "react";

export default function useEventListener(eventName, handler, options?: boolean | AddEventListenerOptions, element: any = window): void {
    const savedHandler = useRef(null);

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const isSupported = element && element.addEventListener;
        if (!isSupported) return;

        const eventListener = event => savedHandler.current(event);

        element.addEventListener(eventName, eventListener, options);

        return () => {
            element.removeEventListener(eventName, eventListener);
        };
    },[eventName, element]);
}