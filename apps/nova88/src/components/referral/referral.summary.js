import React, { useEffect, useState, useRef } from "react";
import { number_format } from "../common/common";
import api from "../../service/api";

export default ({ isLogin, i18n, setPopBox, _isConvert }) => {
	const isMountedRef = useRef(null);
	const [summary, setSummary] = useState({});

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	useEffect(() => {
		if (isLogin === true && isMountedRef.current) {
			api.account.GetReferralSummary().then(
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
	}, [isLogin, i18n, setPopBox]);

	return (
		<>
			<div className="achievement">
				{i18n.lbl_Achievement}
				<span>
					{summary.amountCount}/{summary.referralCount}
				</span>
			</div>
			<div className="achievement">
				{i18n.lbl_Referral_rewards}
				<span>{number_format(summary.amountSum, _isConvert)}</span>
			</div>
		</>
	);
};
