import React from "react";
import PropTypes from "prop-types";
import { sportsImgUrl } from "../../../config";

const PredictItem = ({
	countryId,
	rank,
	imageName,
	countryName,
	percentage
}) => {
	return (
		<div className={`country ${rank === 1 ? "one" : ""}`} key={countryId}>
			<div>{rank}</div>
			<div className="country-flag">
				<div>
					<img
						src={`${sportsImgUrl}/Country%20Team/${imageName}`}
						alt=""
					/>
					<div>{countryName}</div>
				</div>
				<div>{Math.round(percentage)}%</div>
			</div>
		</div>
	);
};
PredictItem.propTypes = {
	countryId: PropTypes.number.isRequired,
	rank: PropTypes.number.isRequired,
	imageName: PropTypes.string.isRequired,
	countryName: PropTypes.string.isRequired,
	percentage: PropTypes.number.isRequired
};
export default PredictItem;
