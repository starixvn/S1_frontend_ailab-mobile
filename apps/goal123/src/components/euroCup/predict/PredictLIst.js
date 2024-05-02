import React from "react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Navigation } from "swiper";
import "swiper/swiper-bundle.min.css";
import PredictItem from "./PredictItem";

const PredictLIst = ({ ticketSummary }) => {
	const params = {
		spaceBetween: 10,
		slidersPerView: 1
	};

	return (
		<div className="prediction-swiper">
			<Swiper
				{...params}
				navigation={true}
				modules={[Navigation]}
				className="prediction-swiper-container">
				{[0, 4].map(start => (
					<SwiperSlide key={start}>
						<div className="prediction-swiper-item" key={start}>
							{ticketSummary
								.slice(start, start + 4)
								.map((item, childIndex) => (
									<PredictItem
										rank={start + childIndex + 1}
										key={item.countryId}
										{...item}
									/>
								))}
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

PredictLIst.propTypes = {
	ticketSummary: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default PredictLIst;
