import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { referralPopBox } from "../common/context";

export default () => {
	const { t } = useTranslation();
	const { referralBox, setReferralBox } = useContext(referralPopBox);

	const { isOpen: openReferralBox } = referralBox;

	const closePopBox = () => {
		setReferralBox({ isOpen: false });
	};

	return (
		<div
			id="popup"
			className={`promoinfo${openReferralBox ? " active" : ""}`}>
			<div className="pop">
				<div className="popTit">
					{t("lbl_Details")}
					<div className="icon icon-close" onClick={closePopBox} />
				</div>
				{referralBox.content}
			</div>
		</div>
	);
};

export const ReferralPopBox = ({ data, t }) => (
	<div className="promotions">
		<div className="promodule">
			<img src={data.referralContent?.bannerUrl} alt="banner" />
			<div className="protitle">{data.referralContent?.title}</div>
			<div className="text">{data.referralContent?.description}</div>
			<div className="info promotionInfo">
				<ul>
					<li>
						<span>{t("lbl_ReferralReward")}</span>
						<span>{data.referralReward}</span>
					</li>
					<li>
						<span>{t("lbl_FriendsInvitationLimit")}</span>
						<span>{data.invitationLimit}</span>
					</li>
					<li>
						<span>{t("lbl_DepositRequirement")}</span>
						<span>{data.agentDeposit}</span>
					</li>
					<li>
						<span>{t("lbl_ValidBetRequirement")}</span>
						<span>{data.agentValidBet}</span>
					</li>
				</ul>
			</div>
			<div className="info promotionInfo">
				<ul>
					<li>
						<span>{t("lbl_ReferredFreeCredit")}</span>
						<span>{data.memberReward}</span>
					</li>
					<li>
						<span>{t("lbl_DepositRequirement")}</span>
						<span>{data.deposit}</span>
					</li>
					<li>
						<span>{t("lbl_ValidBetRequirement")}</span>
						<span>{data.vaildBet}</span>
					</li>
					<li>
						<span>{t("lbl_TermPeriodWithin")}</span>
						<span>
							{data.periodDays} {t("lbl_Days")}
						</span>
					</li>
				</ul>
			</div>
			<div
				className="text"
				dangerouslySetInnerHTML={{
					__html: `<pre>${data.referralContent?.detail}</pre>`
				}}
			/>
		</div>
	</div>
);

ReferralPopBox.propTypes = {
	data: PropTypes.objectOf(PropTypes.any).isRequired,
	t: PropTypes.func.isRequired
};
