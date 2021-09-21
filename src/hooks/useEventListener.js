import { useEffect, useRef } from 'react';

function useEventListener(eventName, handler, options = {}, element = window) {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (isSupported) {
      const eventListener = (event) => savedHandler.current(event);

      element.addEventListener(eventName, eventListener, options);

      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    }
  }, [eventName, element]);
}

export default useEventListener;
