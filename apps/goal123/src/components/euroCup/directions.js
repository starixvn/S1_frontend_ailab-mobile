import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import classNames from "classnames";
import { DIRECTIONS_TYPE } from "./def";
import { bannerImgUrl } from "../../config";

const Directions = ({ directionsType, setDirectionsType }) => {
	const { t } = useTranslation();
	return (
		<>
			<div className="bottom-tap">
				<a
					className={classNames({
						active:
							directionsType ===
							DIRECTIONS_TYPE.TERMS_AND_CONDITIONS
					})}
					onClick={() =>
						setDirectionsType(DIRECTIONS_TYPE.TERMS_AND_CONDITIONS)
					}>
					{t("lbl_CupEvent_T&C")}
				</a>
				<a
					className={classNames({
						active: directionsType === DIRECTIONS_TYPE.MATCHES
					})}
					onClick={() => setDirectionsType(DIRECTIONS_TYPE.MATCHES)}>
					{t("lbl_CupEvent_Matches")}
				</a>
			</div>
			<div
				className={classNames({
					terms:
						directionsType === DIRECTIONS_TYPE.TERMS_AND_CONDITIONS,
					matches: directionsType === DIRECTIONS_TYPE.MATCHES
				})}>
				{directionsType === DIRECTIONS_TYPE.TERMS_AND_CONDITIONS && (
					<>
						<div className="terms-title">
							<img
								src={`${bannerImgUrl}/h5/img/event/eurocup/title-item.png`}
								alt="title-item"
							/>
							{directionsType ===
								DIRECTIONS_TYPE.TERMS_AND_CONDITIONS && (
								<span>{t("lbl_TermsConditions")}</span>
							)}
							{directionsType === DIRECTIONS_TYPE.MATCHES && (
								<span>{t("lbl_CupEvent_Matches_Title")}</span>
							)}
						</div>
						<ul className="info">
							<li>{t("lbl_CupEvent_Terms_And_Conditions_1")}</li>
							<li>{t("lbl_CupEvent_Terms_And_Conditions_2")}</li>
							<li>{t("lbl_CupEvent_Terms_And_Conditions_3")}</li>
							<li>{t("lbl_CupEvent_Terms_And_Conditions_4")}</li>
							<li>{t("lbl_CupEvent_Terms_And_Conditions_5")}</li>
							<li>{t("lbl_CupEvent_Terms_And_Conditions_6")}</li>
							<li>{t("lbl_CupEvent_Terms_And_Conditions_7")}</li>
							<li>{t("lbl_CupEvent_Terms_And_Conditions_8")}</li>
							<li>{t("lbl_CupEvent_Terms_And_Conditions_9")}</li>
							<li>{t("lbl_CupEvent_Terms_And_Conditions_10")}</li>
							<li>{t("lbl_CupEvent_Terms_And_Conditions_11")}</li>
							<li>{t("lbl_CupEvent_Terms_And_Conditions_12")}</li>
						</ul>
					</>
				)}
				{directionsType === DIRECTIONS_TYPE.MATCHES && (
					<>
						<div className="matches-title">
							<img
								src={`${bannerImgUrl}/h5/img/event/eurocup/title-item.png`}
								alt="title-item"
							/>
							<span>{t("lbl_CupEvent_Matches_Title")}</span>
						</div>
						<div className="matches-sheet">
							<div className="matches-sheet-item">
								<div>{t("lbl_Bonus")}</div>
								<div>{t("lbl_CupEvent_BetType")}</div>
								<div>{t("lbl_CupEvent_MinPayout")}</div>
								<div>{t("lbl_CupEvent_MaxBonus")}</div>
								<div>{t("lbl_CupEvent_Product")}</div>
								<div>{t("lbl_CupEvent_Rollover")}</div>
							</div>
							<div className="matches-sheet-item">
								<div>{t("lbl_CupEvent_Matches_Sheet1")}</div>
								<div>{t("lbl_CupEvent_Matches_Sheet2")}</div>
								<div>{t("lbl_CupEvent_Matches_Sheet3")}</div>
								<div>{t("lbl_CupEvent_Matches_Sheet4")}</div>
								<div>{t("lbl_CupEvent_Matches_Sheet5")}</div>
								<div>{t("lbl_CupEvent_Matches_Sheet6")}</div>
							</div>
						</div>
						<div className="matches-info">
							<div className="subtitle">
								<div>{t("lbl_CupEvent_Matches_Subtitle1")}</div>
								<div>{t("lbl_CupEvent_Matches_Subtitle2")}</div>
							</div>
							<div>{t("lbl_CupEvent_Matches_desc1")}</div>
							<div>{t("lbl_CupEvent_Matches_desc2")} 3%</div>
							<div>{t("lbl_CupEvent_Matches_desc3")} 5%</div>
							<div>{t("lbl_CupEvent_Matches_desc4")} 8%</div>
						</div>
					</>
				)}
			</div>
		</>
	);
};

Directions.propTypes = {
	directionsType: PropTypes.number.isRequired,
	setDirectionsType: PropTypes.func.isRequired
};

export default Directions;
