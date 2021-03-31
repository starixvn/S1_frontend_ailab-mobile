import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import TandC from "../../service/t_and_c";
import api from "../../service/api";
import { Link } from "../../route/link";
import path from "../../path";
import { defPopBoxType } from "../common/popbox";

const ReferralPanel = ({ i18n, userInfo, setPopBox }) => {
	const [referralBonus, setReferralBonus] = useState(null);
	const [referralCode, setReferralCode] = useState("");
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (userInfo.isLogin === true && isMountedRef.current) {
			api.account.GetReferralSetting().then(res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						if (res.data.data.length > 0)
							setReferralBonus(res.data.data[0].bonusAmount);
					} else {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: `[${res.data.errorCode}]${res.data.message}`
						});
					}
				}
			});

			api.account.GetReferralCode().then(res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						if (res.data.data.length > 0)
							setReferralCode(res.data.data);
					} else {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: `[${res.data.errorCode}]${res.data.message}`
						});
					}
				}
			});
		}
	}, [userInfo.isLogin, i18n, setPopBox]);

	const shareReferral = () => {
		setPopBox({
			isOpen: true,
			className: "referralShare ",
			popBoxType: defPopBoxType.Referral,
			title: i18n.lbl_ReferFriends,
			referralCode
		});
	};

	return (
		<>
			<div className="moduleTitle icon icon-friend">
				{i18n.lbl_friendReferral}
			</div>
			<div className="friendReferral">
				<div>
					<div className="title">
						{`${i18n.lbl_Free} ${
							i18n[`Currency_${userInfo.currencyId}`]
						} `}
						{referralBonus}
					</div>
					<div>{i18n.lbl_Referral_intro}</div>
					<a
						href={TandC(userInfo.langId).Referral}
						target="_blank"
						rel="noreferrer">
						{i18n.lbl_TermsConditions}
					</a>
					<br />
					<Link to={path.referral.root}>{i18n.lbl_To_Referral}</Link>
				</div>
				<div>
					<div>{referralCode}</div>
					<div className="btn-group" onClick={shareReferral}>
						<button className="title">{i18n.lbl_Share}</button>
					</div>
				</div>
			</div>
		</>
	);
};

ReferralPanel.propTypes = {
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	setPopBox: PropTypes.func.isRequired
};

export default ReferralPanel;
