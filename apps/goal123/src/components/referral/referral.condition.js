import React, { useEffect, useState, useRef, useContext } from "react";
import PropTypes from "prop-types";
import {
	api_account_GetReferralSetting,
	api_account_GetReferralSettingDetail
} from "../../service/api/account";
import { referralPopBox } from "../common/context";
import { number_format } from "../common/common";
import { ReferralPopBox } from "./referral.popbox";

const Conditios = ({ userInfo, i18n, setPopBox }) => {
	const isMountedRef = useRef(null);
	const { setReferralBox } = useContext(referralPopBox);
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

	const getReferralDetail = async () => {
		const res = await api_account_GetReferralSettingDetail();
		const { errorCode, data, message } = res.data;

		if (errorCode === 0) {
			setReferralBox({
				isOpen: true,
				content: <ReferralPopBox data={data} i18n={i18n} />
			});
		} else {
			setPopBox({
				isOpen: true,
				content: `[${errorCode}] ${message}`
			});
		}
	};

	return referralData?.status ? (
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
					<button onClick={getReferralDetail}>
						{i18n.lbl_MoreDetails}
					</button>
				</div>
			</div>
		</div>
	) : null;
};

Conditios.propTypes = {
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	setPopBox: PropTypes.func.isRequired
};

export default Conditios;
