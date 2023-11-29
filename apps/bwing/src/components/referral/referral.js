import React, { useEffect, useState, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import {
	api_account_GetReferralCode,
	api_account_GetReferralSettingDetail,
	api_account_GetReferralSummary
} from "../../service/api/account";
import { bannerImgUrl } from "../../config";
import {
	loadingContext,
	referralPopBox,
	userInfoContext
} from "../common/context";
import { ReferralPopBox } from "./referral.popbox";
import ReferralStatus from "./referralStatus";
import ReferralInfo from "./referral.info";

const Referral = ({ userInfo, i18n, setPopBox }) => {
	const { t } = useTranslation();
	const isMountedRef = useRef(null);
	const [referralCode, setReferralCode] = useState("");
	const {
		userInfo: { langId }
	} = useContext(userInfoContext);
	const { loading, setLoading } = useContext(loadingContext);
	const { setReferralBox } = useContext(referralPopBox);
	const [referralSum, setReferralSum] = useState({});

	const getReferralCode = async () => {
		setLoading(true);
		await api_account_GetReferralCode().then(
			res => {
				const { errorCode, data, message } = res.data;
				setLoading(false);

				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						setReferralCode(data);
					} else {
						setPopBox({
							isOpen: true,
							content: `[${errorCode}] ${message}`
						});
					}
				}
			},
			() => {
				setLoading(false);
				if (isMountedRef.current) {
					setPopBox({
						isOpen: true,
						content: t("msg_ApiServerError")
					});
				}
			}
		);
	};

	const getReferralSummary = async () => {
		setLoading(true);
		await api_account_GetReferralSummary().then(
			res => {
				const { errorCode, data, message } = res.data;
				setLoading(false);

				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						setReferralSum(data);
					} else {
						setPopBox({
							isOpen: true,
							content: `[${errorCode}] ${message}`
						});
					}
				}
			},
			() => {
				setLoading(false);
				if (isMountedRef.current) {
					setPopBox({
						isOpen: true,
						content: t("msg_ApiServerError")
					});
				}
			}
		);
	};

	const getReferralDetail = async () => {
		const res = await api_account_GetReferralSettingDetail();
		const { errorCode, data, message } = res.data;

		if (errorCode === 0) {
			setReferralBox({
				isOpen: true,
				content: <ReferralPopBox data={data} t={t} />
			});
		} else {
			setPopBox({
				isOpen: true,
				content: `[${errorCode}] ${message}`
			});
		}
	};

	const onCopy = async column_id => {
		const copyInput = document.getElementById(column_id);
		copyInput.select();
		document.execCommand("copy");
	};

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		getReferralCode();
		getReferralSummary();
	}, []);

	return (
		!loading && (
			<>
				<img
					className="refer-banner"
					src={`${bannerImgUrl}/h5/img/4.0/referral/referral-bg-${langId}.png`}
					alt=""
				/>
				<button className="refer-moreinfo" onClick={getReferralDetail}>
					{t("lbl_More_Info")}
				</button>
				<div className="refer">
					<ReferralInfo referralCode={referralCode} onCopy={onCopy} />
					<ReferralStatus referralSum={referralSum} />
				</div>
			</>
		)
	);
};

Referral.propTypes = {
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	setPopBox: PropTypes.func.isRequired
};

export default Referral;
