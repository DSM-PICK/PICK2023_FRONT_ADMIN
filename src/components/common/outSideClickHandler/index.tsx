import { BaseSyntheticEvent, ReactNode, useEffect, useRef } from "react";

interface Props {
  children: ReactNode;
  onOutSideClick: () => void;
}

function OutSideClickHandler({ children, onOutSideClick }: Props) {
  const handleOutsideClick = () => {
    onOutSideClick();
  };

  const useOutsideClick = (callback: () => void) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
      const handleClick = (event: BaseSyntheticEvent | MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      };
      document.addEventListener("click", handleClick);
      return () => {
        document.removeEventListener("click", handleClick);
      };
    }, [callback, ref]);
    return ref;
  };
  const ref = useOutsideClick(handleOutsideClick);
  return <div ref={ref}>{children}</div>;
}

export default OutSideClickHandler;
