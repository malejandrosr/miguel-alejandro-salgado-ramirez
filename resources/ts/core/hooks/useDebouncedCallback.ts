import { useEffect, useRef } from "react";

const useDebouncedCallback = <A extends any[]>(callback: (...args: A) => void, delay: number) => {
	const argsRef = useRef<A>();
	const timeout = useRef<ReturnType<typeof setTimeout>>();

	const cleanUp = () => {
		if (timeout.current) {
			clearTimeout(timeout.current);
		}
	};

	useEffect(() => cleanUp, []);

	const debouncedCallback = (...args: A) => {
		argsRef.current = args;

		cleanUp();

		timeout.current = setTimeout(() => {
			if (argsRef.current) {
				callback(...argsRef.current);
			}
		}, delay);
	};

	return debouncedCallback;
};

export default useDebouncedCallback;
