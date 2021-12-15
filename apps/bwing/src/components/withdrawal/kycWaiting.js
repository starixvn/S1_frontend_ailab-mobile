import React, { useContext, useEffect, useState, useRef } from "react";
import { Redirect } from "@reach/router";
import { i18nContext, userInfoContext } from "../common/context";
import { api_KycCheck } from "../../service/api/payment";
import { api_GetCustBankInfo } from "../../service/api/account";
import path from "../../path";
import Loading from "../common/loading";
import kycProgressingImg from "../../styles/img/gear.png";

export default () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const [redirectPath, setRedirectPath] = useState(null);
	const isMountedRef = useRef(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (isMountedRef.current && redirectPath !== null) {
			setRedirectPath(null);
		}
	}, [redirectPath]);

	useEffect(() => {
		if (isMountedRef.current && userInfo.isLogin === false) {
			setRedirectPath("/");
		}
	}, [userInfo.isLogin, setRedirectPath]);

	useEffect(() => {
		if (userInfo.isLogin) {
			const CheckBankInfo = async () => {
				const result = await api_GetCustBankInfo().then(res => {
					let hasBankInfo = false;
					if (res.data.errorCode === 0) {
						if (
							res.data.data?.bankInfoDetail?.length ||
							res.data.data?.uSDTDetail?.length
						) {
							hasBankInfo = true;
						} else if (isMountedRef.current) {
							setRedirectPath(`/${path.withdrawal.root}`);
						}
					}

					return hasBankInfo;
				});

				return result;
			};

			CheckBankInfo().then(hasBankInfo => {
				if (hasBankInfo) {
					api_KycCheck().then(
						res => {
							if (isMountedRef.current) {
								if (res.data.errorCode === 1) {
									setRedirectPath(`/${path.kyc.root}`);
								} else if (res.data.errorCode !== 2) {
									setRedirectPath(`/${path.withdrawal.root}`);
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
	}, [userInfo.isLogin]);

	return redirectPath !== null ? (
		<Redirect to={redirectPath} noThrow />
	) : loading ? (
		<Loading />
	) : (
		<div className="subModuleList">
			<div className="subModule">
				<div className="subModuleBody column">
					<span className="title text-org">{i18n.lbl_WaitKYC}</span>
					<div className="txt-lightgray">{i18n.lbl_WaitKYCHint}</div>
					<img src={kycProgressingImg} className="gear" />
				</div>
			</div>
		</div>
	);
};
