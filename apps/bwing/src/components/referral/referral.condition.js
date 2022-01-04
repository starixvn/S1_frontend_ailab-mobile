import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { api_account_GetReferralSetting } from "../../service/api/account";
import { number_format } from "../common/common";
import TandC from "../../service/t_and_c";

const Conditios = ({ userInfo, i18n, setPopBox }) => {
	const isMountedRef = useRef(null);
	const [referralData, setReferralData] = useState({
		bonusAmount: 0,
		vaildBet: 0,
		deposit: 0,
		periodDays: 0
	});

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (userInfo.isLogin === true && isMountedRef.current) {
			api_account_GetReferralSetting().then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							if (res.data.data.length > 0)
								setReferralData(res.data.data[0]);
						} else {
							setPopBox({
								isOpen: true,
								content: `[${res.data.errorCode}] ${res.data.message}`
							});
						}
					}
				},
				() => {
					setPopBox({
						isOpen: true,
						content: i18n.msg_ApiServerError
					});
				}
			);
		}
	}, [userInfo.isLogin, i18n, setPopBox]);

	return (
		<div className="refShare">
			<div className="title">{i18n.lbl_Share_with_friend}</div>
			<div className="refBox">
				<div>
					<div>
						{i18n.lbl_ValidPeriod}
						<span>{` ${referralData.periodDays} ${i18n.lbl_Days}`}</span>
					</div>
					<div>
						{i18n.lbl_Bonus}
						<span>
							{` ${
								i18n[`Currency_${userInfo.currencyId}`]
							} ${number_format(referralData.bonusAmount, true)}`}
						</span>
					</div>
					<div>
						{i18n.lbl_ValidBet}
						<span>
							{` ${
								i18n[`Currency_${userInfo.currencyId}`]
							} ${number_format(referralData.vaildBet, true)}`}
						</span>
					</div>
					<div>
						{i18n.lbl_Deposit}
						<span>
							{` ${
								i18n[`Currency_${userInfo.currencyId}`]
							} ${number_format(referralData.deposit, true)}`}
						</span>
					</div>
					<a
						href={TandC(userInfo.langId).Referral}
						target="_blank"
						rel="noreferrer">
						{i18n.lbl_MoreDetails}
					</a>
				</div>
			</div>
		</div>
	);
};

Conditios.propTypes = {
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	setPopBox: PropTypes.func.isRequired
};

export default Conditios;
