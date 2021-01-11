import { useEffect, useRef } from "react";

export default (callback, delay) => {
	const savedCallback = useRef();

	useEffect(() => {
		savedCallback.current = callback;
	});

	useEffect(() => {
		let mounted = true;
		function tick() {
			savedCallback.current();
		}
		if (delay !== null) {
			const id = setInterval(tick, delay);
			return () => clearInterval(id);
		}

		return () => {
			mounted = false;
		};
	}, [delay]);
};
