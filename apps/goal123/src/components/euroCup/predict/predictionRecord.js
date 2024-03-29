import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { bannerImgUrl, sportsImgUrl } from "../../../config";

const PredictionRecord = ({ usedTickets, onOpen }) => {
	const { t } = useTranslation();
	return (
		<div className="record">
			<div className="record-wrapper">
				<div className="record-title">
					{t("lbl_CupEvent_PredictionRecord")}
				</div>
				<div className="record-content">
					{usedTickets
						.slice(0, 3)
						.map(({ count, countryId, countryName, imageName }) => (
							<div className="record-item" key={countryId}>
								<div className="record-item-ticket">
									<img
										className="euro-logo"
										src={`${bannerImgUrl}/h5/img/event/eurocup/euro-logo.png`}
										alt=""
									/>
									<div className="flag">
										<img
											src={`${sportsImgUrl}/Country%20Team/${imageName}`}
											alt=""
										/>
										<span>{countryName}</span>
									</div>
									<div className="number">
										<span>
											{t("lbl_CupEvent_NumberOfTickets")}
										</span>
										<span>{count}</span>
									</div>
								</div>
							</div>
						))}
				</div>
				<div
					className={`more-btn ${
						usedTickets.length > 3 ? "active" : ""
					}`}
					onClick={onOpen}>
					{t("lbl_More")}
				</div>
			</div>
		</div>
	);
};

PredictionRecord.propTypes = {
	usedTickets: PropTypes.arrayOf(PropTypes.any).isRequired,
	onOpen: PropTypes.func.isRequired
};

export default PredictionRecord;
