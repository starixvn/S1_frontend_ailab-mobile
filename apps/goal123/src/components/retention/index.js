import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@reach/router";
import { bannerImgUrl } from "../../config";
import { userInfoContext } from "../common/context";
import { api_promotion_SetClaimPromotion } from "../../service/api/promotion";
import path from "../../path";
import useRetentionPromotion from "./hooks/useRetentionPromotion";
import useRetentionPopup from "./hooks/useRetentionPopup";
import { number_format } from "../common/common";

const ERROR_CODES = {
	SUCCESS: 0,
	UNVERIFIED: -1003
};

const RetentionContent = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const {
		userInfo: { currencyId, langId, isLogin }
	} = useContext(userInfoContext);

	const { retentionBonusCode, promotionDetail } = useRetentionPromotion();

	const {
		openSuccessPopup,
		openVerificationPopup,
		openErrorPopup
	} = useRetentionPopup();

	const handleWheel = () => {
		navigate(`/${path.luckyWheel.root}`);
	};

	const {
		isJoin = false,
		canJoin = false,
		custTurnOver = 0,
		custRollOver = 0,
		maxAmount = 0,
		details = ""
	} = promotionDetail ?? {};

	const percentage =
		custTurnOver >= custRollOver
			? 100
			: ((custTurnOver / custRollOver) * 100).toFixed(2);

	const handleJoinPromotion = async () => {
		try {
			// destructuring the response object and giving default values
			const {
				data: { errorCode = null, message = "" } = {}
			} = await api_promotion_SetClaimPromotion({
				langId,
				BonusCode: retentionBonusCode,
				LockedAmount: maxAmount
			});

			// use object literal to replace if-else statement to enhance readability and flexibility
			const errorCodeActions = {
				[ERROR_CODES.SUCCESS]: openSuccessPopup,
				[ERROR_CODES.UNVERIFIED]: openVerificationPopup,
				others: () => openErrorPopup(message, errorCode)
			};
			// call the function based on the errorCode
			(errorCodeActions[errorCode] || errorCodeActions.others)();
		} catch (error) {
			console.error("Error claiming promotion:", error);
		}
	};

	if (!isLogin && !retentionBonusCode) {
		navigate(`/${langId}`);
		return null; // Prevent rendering any content
	}

	return (
		<>
			<div className="eventpage-tap" style={{ zIndex: "3" }}>
				<button onClick={handleWheel}>
					{t("Label_Retention_LuckyWheel")}
				</button>
				<button className="active">
					{t("Label_Retention_SurpriseReward")}
				</button>
			</div>

			<div className="retention-wrapper">
				<div className="top">
					<img
						className="top-item"
						src={`${bannerImgUrl}/h5/img/event/retention/title.png`}
						alt="banner-retention"
					/>
					{promotionDetail && canJoin && (
						<button
							className="top-btn"
							onClick={handleJoinPromotion}>
							{t("lbl_ClaimNow")}
						</button>
					)}
				</div>
				<div className="retention-title">
					{t("Label_Retention_Title")}
					<div>{t("Label_Retention_Content")}</div>
				</div>
				{isJoin && (
					<div className="turnover-progress">
						<div className="turnover-title">
							{t("Label_Retention_TurnoverTitle")}
						</div>
						<div className="turnover-item">
							<div>
								<div className="number">
									{t(`Currency_${currencyId}`)}
									{number_format(custTurnOver)}
									<div>
										/ {t("lbl_Req")}
										{number_format(custRollOver)}
									</div>
								</div>
								<div className="progress">
									<div
										className="progress-bar"
										style={{ width: `${percentage}%` }}
									/>
								</div>
								<div className="percent">{percentage}%</div>
							</div>
						</div>
					</div>
				)}
				<div className="bonus-list">
					<div className="title">
						<div>{t("Label_Retention_BonusTitle")}</div>
						<div />
					</div>
					{!details && <div />}
					{details && (
						<div
							style={{ width: "100%" }}
							dangerouslySetInnerHTML={{
								__html: `<pre>${details}</pre>`
							}}
						/>
					)}
				</div>
			</div>
		</>
	);
};

export default RetentionContent;
