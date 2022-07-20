import React, { useContext } from "react";
import PropTypes from "prop-types";
import { referralPopBox, i18nContext } from "../common/context";

export default () => {
	const { i18n } = useContext(i18nContext);
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
					{i18n.lbl_Details}
					<div className="icon icon-close" onClick={closePopBox} />
				</div>
				{referralBox.content}
			</div>
		</div>
	);
};

export const ReferralPopBox = ({ data, i18n }) => (
	<div className="promotions">
		<div className="promodule">
			<img src={data.referralContent.bannerUrl} alt="banner" />
			<div className="protitle">{data.referralContent?.title}</div>
			<div className="text">{data.referralContent?.description}</div>
			<div className="info promotionInfo">
				<ul>
					<li>
						<span>{i18n.lbl_ReferralReward}</span>
						<span>{data.referralReward}</span>
					</li>
					<li>
						<span>{i18n.lbl_FriendsInvitationLimit}</span>
						<span>{data.invitationLimit}</span>
					</li>
					<li>
						<span>{i18n.lbl_DepositRequirement}</span>
						<span>{data.agentDeposit}</span>
					</li>
					<li>
						<span>{i18n.lbl_ValidBetRequirement}</span>
						<span>{data.agentValidBet}</span>
					</li>
				</ul>
			</div>
			<div className="info promotionInfo">
				<ul>
					<li>
						<span>{i18n.lbl_ReferredFreeCredit}</span>
						<span>{data.memberReward}</span>
					</li>
					<li>
						<span>{i18n.lbl_DepositRequirement}</span>
						<span>{data.deposit}</span>
					</li>
					<li>
						<span>{i18n.lbl_ValidBetRequirement}t</span>
						<span>{data.vaildBet}</span>
					</li>
					<li>
						<span>{i18n.lbl_TermPeriodWithin}</span>
						<span>
							{data.periodDays} {i18n.lbl_Days}
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
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};
