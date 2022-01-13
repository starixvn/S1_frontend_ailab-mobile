import React, { useEffect, useState } from "react";
import api from "../../../service/api";
import { LOGOUT } from "../../../service/auth";
import { getUrlParameter } from "../../common/common";
import path from "../../../path";

const useVerifyEmail = ({ langId, i18n, setPopBox, setUserInfo }) => {
	const [tokenPassed, setTokenPassed] = useState(false);

	useEffect(() => {
		const key = getUrlParameter("key");
		const code = getUrlParameter("code");

		const RedirectToHome = popBoxMsg => {
			LOGOUT(() => {
				setUserInfo(prevState => ({
					isLogin: false,
					langId: prevState.langId
				}));

				const closePopBox = () => {
					window.location.replace(
						`${window.location.origin}/${langId}`
					);
					setPopBox({ isOpen: false });
				};

				if (popBoxMsg) {
					setPopBox({
						isOpen: true,
						title: i18n.lbl_ImportantNote,
						content: popBoxMsg,
						hideCloseBtn: true,
						hasBtn: true,
						btnBar: (
							<div className="btn-group">
								<button className="blue" onClick={closePopBox}>
									OK
								</button>
							</div>
						)
					});
				} else {
					setPopBox({ isOpen: false });
				}
			});
		};

		if (key && code) {
			api.accountStrict.VerifyEmail({ langId, key, code }).then(
				res => {
					const { errorCode, message } = res.data;
					if (errorCode === 0) {
						setTokenPassed(true);

						api.accountStrict.GetCustProfile().then(
							res_custInfo => {
								if (res_custInfo.data.errorCode === 0) {
									const { data } = res_custInfo.data;
									setUserInfo(prevState => ({
										...prevState,
										...data
									}));

									const closePopBox = () => {
										window.location.replace(
											`${window.location.origin}/${langId}/${path.profile.root}`
										);
										setPopBox({ isOpen: false });
									};

									setPopBox({
										isOpen: true,
										title: i18n.lbl_ImportantNote,
										content: i18n.lbl_EmailVerifiedMsg,
										hideCloseBtn: true,
										hasBtn: true,
										btnBar: (
											<div className="btn-group">
												<button
													className="blue"
													onClick={closePopBox}>
													OK
												</button>
											</div>
										)
									});
								} else {
									setPopBox({
										isOpen: true,
										content: `[${res_custInfo.data.errorCode}] ${res_custInfo.data.message}`
									});
								}
							},
							() => {
								setPopBox({
									isOpen: true,
									content: i18n.msg_ApiServerError
								});
							}
						);
					} else if (errorCode === 1 || errorCode === 403) {
						RedirectToHome();
					} else if (errorCode === 1000) {
						RedirectToHome(i18n.msg_OTP_Invalid);
					} else {
						RedirectToHome(`[${errorCode}] ${message}`);
					}
				},
				() => {
					setPopBox({
						isOpen: true,
						content: i18n.msg_ApiServerError
					});
				}
			);
		} else {
			setTokenPassed(true);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { tokenPassed };
};

export default useVerifyEmail;
