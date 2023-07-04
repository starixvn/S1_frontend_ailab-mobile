import React, { useEffect, useState } from "react";

const GoTopBtn = () => {
	const scrollEvent = React.useRef(null);
	const [visible, setVisible] = useState();

	const goTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	useEffect(() => {
		const handleScroll = () => {
			const scrollHeight = window.screen.height + window.scrollY;
			const screenHeight = window.screen.height;

			setVisible(scrollHeight > screenHeight);
		};

		const bindScrollEvent = () => {
			if (!scrollEvent.current) {
				window.addEventListener("scroll", handleScroll);
				scrollEvent.current = true;
			}
		};

		bindScrollEvent();

		return () => {
			if (scrollEvent.current) {
				window.removeEventListener("scroll", handleScroll);
				scrollEvent.current = false;
			}
		};
	}, []);

	if (!visible) return null;

	return (
		<button id="goTop" onClick={goTop}>
			<i className="icon icon-arrow-up2" />
		</button>
	);
};

export default GoTopBtn;
