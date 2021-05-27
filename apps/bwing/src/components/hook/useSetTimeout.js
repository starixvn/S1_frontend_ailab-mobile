import { useEffect, useRef } from "react";

export default () => {
	const id = useRef();

	useEffect(() => {
		id.current = null;
	}, []);

	const throttle = (callback, delay) => {
		function tick() {
			id.current = null;
		}

		if (delay === 0) {
			callback();
		} else if (!id.current) {
			callback();
			id.current = setTimeout(tick, delay);
		}
	};

	return { throttle };
};
