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
			className={`promospop${openReferralBox ? " active" : ""}`}>
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
		<div className="proInfomodule">
			{data?.referralContent?.bannerUrl && (
				<img src={data.referralContent.bannerUrl} alt="banner" />
			)}

			<div className="protitle">{data?.referralContent?.title}</div>
			<div className="text">{data?.referralContent?.description}</div>
			<div className="rolloverList">
				<div>
					<div>{i18n.lbl_ReferralReward}</div>
					<div>{data.referralReward}</div>
				</div>
				<div>
					<div>{i18n.lbl_FriendsInvitationLimit}</div>
					<div>{data.invitationLimit}</div>
				</div>
				<div>
					<div>{i18n.lbl_DepositRequirement}</div>
					<div>{data.agentDeposit}</div>
				</div>
				<div>
					<div>{i18n.lbl_ValidBetRequirement}</div>
					<div>{data.agentValidBet}</div>
				</div>
			</div>
			<div className="rolloverList">
				<div>
					<div>{i18n.lbl_ReferredFreeCredit}</div>
					<div>{data.memberReward}</div>
				</div>
				<div>
					<div>{i18n.lbl_DepositRequirement}</div>
					<div>{data.deposit}</div>
				</div>
				<div>
					<div>{i18n.lbl_ValidBetRequirement}</div>
					<div>{data.vaildBet}</div>
				</div>
				<div>
					<div>{i18n.lbl_TermPeriodWithin}</div>
					<div>
						{data.periodDays} {i18n.lbl_Days}
					</div>
				</div>
				{data?.referralContent?.detail && (
					<div
						className="text"
						dangerouslySetInnerHTML={{
							__html: `<pre>${data?.referralContent?.detail}</pre>`
						}}
					/>
				)}
			</div>
		</div>
	</div>
);

ReferralPopBox.propTypes = {
	data: PropTypes.objectOf(PropTypes.any).isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};
