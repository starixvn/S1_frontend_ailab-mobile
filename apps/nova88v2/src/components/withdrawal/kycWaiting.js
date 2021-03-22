import React, { useContext, useEffect, useRef } from "react";
import { i18nContext, userInfoContext, loadingContext } from "Context";
import { useNavigate } from "@reach/router";
import path from "Path";
import api from "../../service/api";
import Layout from "../common/layout";
import Header from "../header/header";

export default () => {
	const navigate = useNavigate();
	const { i18n } = useContext(i18nContext);

	const { userInfo } = useContext(userInfoContext);
	const { setLoading } = useContext(loadingContext);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (isMountedRef.current && userInfo.isLogin === false) {
			navigate(`/${userInfo.langId}`);
		}
	}, [userInfo.isLogin, userInfo.langId, navigate]);

	useEffect(() => {
		if (userInfo.isLogin) {
			const CheckBankInfo = async () => {
				const result = await api.account.GetCustBankInfo().then(res => {
					let hasBankInfo = false;
					if (res.data.errorCode === 0) {
						if (res.data.data?.bankInfoDetail) {
							hasBankInfo = true;
						} else if (isMountedRef.current) {
							navigate(
								`/${userInfo.langId}/${path.withdrawal.root}`
							);
						}
					}
					return hasBankInfo;
				});
				return result;
			};

			CheckBankInfo().then(hasBankInfo => {
				if (hasBankInfo) {
					api.payment.KycCheck().then(
						res => {
							if (isMountedRef.current) {
								if (res.data.errorCode === 1) {
									navigate(
										`/${userInfo.langId}/${path.kyc.root}`
									);
								} else if (res.data.errorCode !== 2) {
									navigate(
										`/${userInfo.langId}/${path.withdrawal.root}`
									);
								}
								setLoading(false);
							}
						},
						() => {
							if (isMountedRef.current) {
								setLoading(false);
							}
						}
					);
				}
			});
		}
	}, [userInfo.isLogin, userInfo.langId, navigate]);

	return (
		<>
			<Header title={i18n.lbl_WaitKYC} hideLogo={true} />
			<Layout mainClass="main kyc">
				<div className="icon icon-jump" />
				<div className="text-center">{i18n.lbl_WaitKYC}</div>
				<div className="text-center">{i18n.lbl_WaitKYCHint}</div>
			</Layout>
		</>
	);
};
