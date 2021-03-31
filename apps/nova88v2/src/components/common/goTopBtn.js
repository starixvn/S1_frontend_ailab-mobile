import React from "react";

const goTopBtn = () => {
	const goTop = () => {
		document
			.querySelector(".main")
			.scrollTo({ top: 0, behavior: "smooth" });
	};
	return (
		<button id="goTop" onClick={goTop}>
			<i className="icon icon-arrow-up2" />
		</button>
	);
};

export default goTopBtn;
