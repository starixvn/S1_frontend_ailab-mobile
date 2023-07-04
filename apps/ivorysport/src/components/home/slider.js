import React from "react";
import ReactIdSwiper from "react-id-swiper";

export default () => {
	const arr = [
		<div>
			<img
				src="https://banner.ivorysport.com/h5/img/slide01.jpg"
				className="banner"
				alt="banner"
			/>
		</div>
	];
	return <ReactIdSwiper>{arr}</ReactIdSwiper>;
};
