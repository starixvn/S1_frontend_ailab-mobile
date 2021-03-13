import React, { useContext, useEffect, useState, useRef } from "react";
import { i18nContext, userInfoContext } from "Context";
import { useNavigate } from "@reach/router";
import path from "Path";
import Loading from "../common/loading";
import api from "../../service/api";

export default () => {
	const navigate = useNavigate();
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const isMountedRef = useRef(null);
	const [loading, setLoading] = useState(true);

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
						res => {
							if (isMountedRef.current) {
								setLoading(false);
							}
						}
					);
				}
			});
		}
	}, [userInfo.isLogin, userInfo.langId, navigate]);

	return loading ? (
		<Loading />
	) : (
		<>
			<div className="step">
				<div className="stepLine">
					<div className="stepBar100" />
				</div>
				<div className="circle">
					<div>
						<div className="icon icon-checkmark" />
					</div>
				</div>
				<div className="circle">
					<div>
						<div className="icon icon-checkmark" />
					</div>
				</div>
			</div>
			<div className="icon icon-like" />
			<span className="text-center">{i18n.lbl_WaitKYCHint}</span>
		</>
	);
};
