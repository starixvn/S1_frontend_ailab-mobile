import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
	loadingContext,
	popBoxContext,
	referralPopBox,
	userInfoContext
} from "../common/context";
import { bannerImgUrl } from "../../config";
import { ReferralPopBox } from "./referral.popbox";
import {
	api_account_GetReferralCode,
	api_account_GetReferralSettingDetail,
	api_account_GetReferralSummary
} from "../../service/api/account";
import ReferralInfo from "./referral.info";
import ReferralStatus from "./ReferralStatus";

export const Referral = () => {
	const { t } = useTranslation();
	const isMountedRef = useRef(null);
	const [referralCode, setReferralCode] = useState("");
	const {
		userInfo: { langId }
	} = useContext(userInfoContext);
	const { loading, setLoading } = useContext(loadingContext);
	const { setReferralBox } = useContext(referralPopBox);
	const [referralSum, setReferralSum] = useState({});
	const { setPopBox } = useContext(popBoxContext);

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

		const closePopBox = () => {
			setReferralBox({ isOpen: false });
		};

		if (errorCode === 0) {
			setReferralBox({
				isOpen: true,
				content: (
					<ReferralPopBox
						data={data}
						closePopBox={closePopBox}
						t={t}
					/>
				)
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
					src={`${bannerImgUrl}/h5/img/referral/referral-top-bg-${langId}.png`}
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
export default Referral;
