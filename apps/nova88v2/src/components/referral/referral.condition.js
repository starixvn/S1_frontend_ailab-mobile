import React, { useEffect, useState, useRef, useContext } from "react";
import PropTypes from "prop-types";
import { referralPopBox } from "../common/context";
import api from "../../service/api";
import { number_format } from "../common/common";
import { ReferralPopBox } from "./referral.popbox";

const ConditionPanel = ({ userInfo, i18n, _isConvert, setPopBox }) => {
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
			api.account.GetReferralSetting().then(
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
		const res = await api.account.GetReferralSettingDetail();
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
						{i18n.lbl_Bonus}
						<span>
							{` ${
								i18n[`Currency_${userInfo.currencyId}`]
							} ${number_format(
								referralData.bonusAmount,
								_isConvert
							)}`}
						</span>
					</div>
					<div>
						{i18n.lbl_ValidBet}
						<span>
							{` ${
								i18n[`Currency_${userInfo.currencyId}`]
							} ${number_format(
								referralData.vaildBet,
								_isConvert
							)}`}
						</span>
					</div>
					<div>
						{i18n.lbl_Deposit}
						<span>
							{` ${
								i18n[`Currency_${userInfo.currencyId}`]
							} ${number_format(
								referralData.deposit,
								_isConvert
							)}`}
						</span>
					</div>
					<div>
						{i18n.lbl_ValidPeriod}
						<span>{` ${referralData.periodDays} ${i18n.lbl_Days}`}</span>
					</div>
					<button onClick={getReferralDetail}>
						{i18n.lbl_MoreDetails}
					</button>
				</div>
			</div>
		</div>
	) : null;
};

ConditionPanel.defaultProps = {
	_isConvert: null
};

ConditionPanel.propTypes = {
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	_isConvert: PropTypes.bool,
	setPopBox: PropTypes.func.isRequired
};

export default ConditionPanel;
