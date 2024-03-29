import React from "react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Navigation } from "swiper";
import "swiper/swiper-bundle.min.css";
import PredictItem from "./predictItem";

const PredictList = ({ ticketSummary }) => {
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
					<SwiperSlide>
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

PredictList.propTypes = {
	ticketSummary: PropTypes.objectOf(PropTypes.any).isRequired
};

export default PredictList;
