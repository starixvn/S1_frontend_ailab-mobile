import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { number_format } from "../common/common";
import { api_account_GetReferralSummary } from "../../service/api/account";

const Summary = ({ userInfo, i18n, setPopBox }) => {
	const isMountedRef = useRef(null);
	const [summary, setSummary] = useState({});

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (userInfo.isLogin === true && isMountedRef.current) {
			api_account_GetReferralSummary().then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							setSummary(res.data.data);
						} else {
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
								content: `[${res.data.errorCode}]${res.data.message}`
							});
						}
					}
				},
				() => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: i18n.msg_ApiServerError
						});
					}
				}
			);
		}
	}, [userInfo.isLogin, i18n, setPopBox]);

	return (
		<>
			<div className="title">{i18n.lbl_ReferralStatus}</div>
			<div className="achievement">
				<div className="achievement">
					{i18n.lbl_InvitationAccepted}
					<span>{summary.conditionCount}</span>
				</div>
				<div className="achievement">
					{i18n.lbl_MissionCompleted}
					<span>{summary.amountCount}</span>
				</div>
				<div className="achievement">
					{i18n.lbl_NoOfAchievements}
					<span>{summary.referralCount}</span>
				</div>
				<div className="achievement">
					{i18n.lbl_RewardAmount}
					<span>
						{i18n[`Currency_${userInfo.currencyId}`]}{" "}
						{number_format(summary.amountSum, true)}
					</span>
				</div>
			</div>
		</>
	);
};

Summary.propTypes = {
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	setPopBox: PropTypes.func.isRequired
};

export default Summary;
