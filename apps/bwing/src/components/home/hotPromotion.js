import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import Swiper from "react-id-swiper";
import PropTypes from "prop-types";
import moment from "moment/moment";
import { api_promotion_GetPromotionDetail } from "../../service/api/promotion";
import { popBoxContext, userInfoContext } from "../common/context";
import { number_format } from "../common/common";
import { defPromoStatus, isExpiry } from "./def";

const HotPromotion = ({ promotionList }) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);

	const getRemainTime = ({ promotionInfo, isLogin }) => {
		const _expiryTime = moment.unix(
			promotionInfo.isJoin &&
				promotionInfo.status === defPromoStatus.running &&
				promotionInfo.custExpiryTime
				? moment(promotionInfo.custExpiryTime).unix()
				: promotionInfo.periodTo
		);

		const diffDays = Math.ceil(
			moment.duration(_expiryTime.diff(moment())).asDays() - 1
		);

		const expiryTime = moment.duration(_expiryTime.diff(new Date()));

		let isActive = false;
		const periodFromTime = moment.unix(promotionInfo.periodFrom);
		if (periodFromTime.diff(Date.now()) <= 0) {
			isActive = true;
		}

		const isExpiryDate = isExpiry({
			...promotionInfo,
			isLogin
		});

		let displayText = "";
		if (!isActive) {
			displayText = `0 ${t("lbl_Days")} 0 ${t("lbl_Hours")}`;
		} else if (isExpiryDate) {
			displayText = "-";
		} else {
			displayText = `${diffDays} ${t(
				"lbl_Days"
			)} ${expiryTime.hours()} ${t("lbl_Hours")}`;
		}

		return displayText;
	};

	const handlePromotionClick = async bonusCode => {
		const res = await api_promotion_GetPromotionDetail({
			langId: userInfo.langId,
			BonusCode: bonusCode
		});
		if (res.data.errorCode === 0 && res.data.data) {
			const {
				banner,
				title,
				bonusCode: newBonusCode,
				description,
				requiredAmount,
				bonus,
				maxBonus,
				rollOver,
				cashBackDetails,
				fullFillType,
				winOver
			} = res.data.data;
			setPopBox({
				isOpen: true,
				custContent: (
					<div id="popup" className="promoinfo active">
						<div className="pop">
							<div className="popTit">
								{t("lbl_Promotion")}
								<div
									className="icon icon-close"
									onClick={() => setPopBox({ isOpen: false })}
								/>
							</div>
							<div className="promotion-pop">
								<div className="promotion-banner">
									<img src={banner} alt={title} />
								</div>
								<div className="promotion-title">
									{newBonusCode}
									<span>{description}</span>
								</div>
								<div className="btn-group">
									<button className="btn-primary">
										{t("lbl_PromoJoinNow")}
									</button>
								</div>
								<div className="promotion-info">
									<div className="promotion-info-item">
										<div>
											{t("lbl_Vip_Minimum_Deposit_Count")}
										</div>
										<div>
											{t(
												`Currency_${userInfo.currencyId}`
											)}{" "}
											{number_format(requiredAmount, {
												isConvertRequired: false,
												digits: 0,
												formatRequired: false
											})}
										</div>
									</div>
									<div className="promotion-info-item">
										<div>{t("lbl_Bonus")}</div>
										<div>
											{number_format(bonus, {
												isConvertRequired: false,
												digits: 0,
												formatRequired: false
											})}
										</div>
									</div>
									<div className="promotion-info-item">
										<div>{t("lbl_MaxBonus")}</div>
										<div>
											{t(
												`Currency_${userInfo.currencyId}`
											)}{" "}
											{number_format(maxBonus, {
												isConvertRequired: false,
												digits: 0,
												formatRequired: false
											})}
										</div>
									</div>
									<div className="promotion-info-item">
										<div>
											{fullFillType === 2
												? t("lbl_WinOver")
												: t("lbl_RollOver")}
										</div>
										<div>
											{fullFillType === 2
												? winOver
												: rollOver}
											x
										</div>
									</div>
									<div className="promotion-info-item">
										<div>{t("lbl_RemainingTime")}</div>
										<div>
											{getRemainTime({
												promotionInfo: res.data.data,
												isLogin: userInfo.isLogin
											})}
										</div>
									</div>
								</div>

								<div className="cashBack">
									<div className="title">
										{t("lbl_Cashback")}
									</div>
									<table>
										<tbody>
											<tr>
												<td>&nbsp;</td>
												<td>{t("lbl_LossAmount")}</td>
												<td>{t("lbl_Percentage")}</td>
												<td>{t("lbl_BonusAmount")}</td>
											</tr>
											{/*
											{cashBackDetails.cashBackDetail.map(
												() => (
													<tr>
														<td>AG</td>
														<td>89</td>
														<td>0.8%</td>
														<td>0.5</td>
													</tr>
												)
											)}
											*/}
											<tr>
												<td colSpan="2">
													<span>Toal Amount：</span>
												</td>
												<td colSpan="2">
													{
														cashBackDetails?.totalLossAmount
													}
												</td>
											</tr>
											<tr>
												<td colSpan="2">
													<span> Bonus Amount：</span>
												</td>
												<td colSpan="2">
													{
														cashBackDetails?.totalBonus
													}
												</td>
											</tr>
											<tr>
												<td colSpan="2">
													<span> Amount：</span>
												</td>
												<td colSpan="2">
													{
														cashBackDetails?.minLossAmount
													}
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				)
			});
		}
	};

	return (
		<>
			<div className="home-title">
				<i className="icon-promo" />
				{t("lbl_HotPromotions")}
			</div>
			<div className="home-promo mb-2">
				<Swiper>
					{promotionList.map(
						({
							banner,
							title,
							bonusCode,
							displayFrom,
							displayTo
						}) => {
							const timezone = moment().format("Z");
							const isDisplay =
								moment
									.unix(displayFrom)
									.subtract(timezone)
									.diff(moment()) <= 0 &&
								moment
									.unix(displayTo)
									.subtract(timezone)
									.diff(moment()) >= 0;

							return (
								<a
									key={`${bonusCode}_${title}`}
									onClick={() =>
										handlePromotionClick(bonusCode)
									}>
									<img src={banner} alt={title} />
								</a>
							);
						}
					)}
				</Swiper>
			</div>
		</>
	);
};

HotPromotion.defaultProps = {
	promotionList: []
};

HotPromotion.propTypes = {
	promotionList: PropTypes.arrayOf(PropTypes.any)
};

export default HotPromotion;
