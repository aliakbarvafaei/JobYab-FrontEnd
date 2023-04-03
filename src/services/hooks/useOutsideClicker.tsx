import React, {useEffect} from "react";

export const useOnClickOutside = (
  ref: React.RefObject<HTMLDivElement> | null,
  handler: (event: MouseEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if ((ref && !ref.current) || (ref && ref.current?.contains(event.target as Node))) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    //   document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      // document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};
