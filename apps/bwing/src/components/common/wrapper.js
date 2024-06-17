import React, { useState, useEffect, useRef } from "react";
import { node } from "prop-types";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { navigate } from "@reach/router";
import * as ct from "./context";
import { api_GetCustProfile } from "../../service/api/accountStrict";
import {
	api_GetBalnace,
	api_onlineCheck,
	api_GetMsgCount
} from "../../service/api/account";
import {
	api_payment_GetWithdrawalLimit,
	api_payment_GetWithdrawalBlockSetting
} from "../../service/api/payment";
import { IS_LOGGED_IN } from "../../service/auth";
import themeList from "../../datas/theme";
import useInterval from "../hook/useInterval";
import { getUrlParameter, setCookie, deleteCookie, readCookie } from "./common";
import i18nConfig from "../../i18n/config";
import path, { defSpecialPath } from "../../path";
import { GET_LANG_ID } from "../../service/language";
import { siteInfo } from "../../config";
import DefLangs from "../../datas/defLangs";

const isSpecialPath = () => {
	return (
		defSpecialPath[
			`${window.location.pathname?.substring(1)}`?.toLowerCase()
		] !== undefined
	);
};

export const Wrapper = ({ children }) => {
	const [i18n, seti18n] = useState(i18nConfig());
	const { i18n: translationI18n } = useTranslation();
	const [loading, setLoading] = useState(false);
	const [root, setRoot] = useState(false);

	const [userInfo, setUserInfo] = useState({
		isLogin: null,
		langId: readCookie(siteInfo()?.langCookie) || "vn",
		userName: i18n.lbl_Guest
	});
	const [popBox, setPopBox] = useState({
		isOpen: false,
		title: "",
		content: "",
		hasBtn: false,
		btnBar: null
	});
	const [nav, setNav] = useState(null);
	const [walletInfo, setWalletInfo] = useState({
		main: null
	});
	const [msgCount, setMsgCount] = useState(0);
	const [theme, setTheme] = useState(themeList.default);
	const [isShowEWallet, setIsShowEWallet] = useState(false);
	const isMountedRef = useRef(null);
	const [withdrawalSettingTypeList, setWithdrawalSettingTypeList] = useState(
		[]
	);

	const GetBalance = () => {
		if (!userInfo.isLogin) return;

		api_GetBalnace().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						setWalletInfo(prevState => ({
							...prevState,
							main: res.data.data
						}));
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
	};

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		const AffId = getUrlParameter("AffId");
		const RefId = getUrlParameter("RefId");
		const Aff = getUrlParameter("Aff");
		const AffCode = getUrlParameter("AffCode");

		if (AffId) {
			setCookie("AffId", AffId, 7);
			deleteCookie("RefId");
			deleteCookie("Aff");
			deleteCookie("AffCode");
		} else if (RefId) {
			setCookie("RefId", RefId, 7);
			deleteCookie("AffId");
			deleteCookie("Aff");
			deleteCookie("AffCode");
		} else if (Aff) {
			setCookie("Aff", Aff, 7);
			deleteCookie("AffId");
			deleteCookie("RefId");
			deleteCookie("AffCode");
		} else if (AffCode) {
			setCookie("AffCode", AffCode, 7);
			deleteCookie("AffId");
			deleteCookie("RefId");
			deleteCookie("Aff");
		}
		// 當 join referral link 含語系帶入url時倒轉至join頁面
		const { pathname, search } = window.location;
		const langArray = Object.values(DefLangs);
		if (
			langArray.some(({ value: langId }) =>
				pathname.includes(`/${langId}/${path.join.root}`)
			)
		) {
			navigate(`/${path.join.root}${search}`);
			window.location.reload();
		}
	}, []);

	useEffect(() => {
		if (!isSpecialPath()) {
			IS_LOGGED_IN().then(isLogin => {
				if (isMountedRef.current) {
					setUserInfo(prevState => ({
						...prevState,
						isLogin
					}));
				}
			});
		}
	}, []);

	const OnlineCheckCallBack = (errorCode, errMsg) => {
		const clickClose = () => {
			setPopBox({ isOpen: false });
		};
		if (errorCode !== 0 && isMountedRef.current) {
			setUserInfo(prevState => ({
				isLogin: false,
				langId: prevState.langId
			}));
			setPopBox({
				isOpen: true,
				title: i18n.lbl_ImportantNote,
				content: errMsg ?? i18n.msg_ForceLogedoutHint,
				hasBtn: true,
				btnBar: (
					<div className="btn-group">
						<button className="blue" onClick={clickClose}>
							OK
						</button>
					</div>
				)
			});
		}
	};

	useInterval(
		() => {
			api_onlineCheck().then(
				res => {
					const result = res.data;
					if (
						result.errorCode !== null &&
						result.errorCode !== 0 &&
						isMountedRef.current
					) {
						OnlineCheckCallBack(result.errorCode, result.message);
					}
				},
				error => {
					if (
						error.response !== null &&
						error.response.status === 401 &&
						isMountedRef.current
					) {
						OnlineCheckCallBack(error.response.status);
					}
				}
			);
		},
		userInfo.isLogin && !isSpecialPath() ? 30000 : null
	);

	useEffect(() => {
		if (userInfo.isLogin) {
			if (!userInfo.regTime) {
				api_GetCustProfile().then(
					res_custInfo => {
						if (isMountedRef.current) {
							if (res_custInfo.data.errorCode === 0) {
								const { data } = res_custInfo.data;
								setUserInfo(prevState => ({
									...prevState,
									...data
								}));
							} else {
								setPopBox({
									isOpen: true,
									content: `[${res_custInfo.data.errorCode}] ${res_custInfo.data.message}`
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

			api_GetMsgCount().then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							setMsgCount(res.data.data);
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

			if (userInfo.userName) {
				GetBalance();
			}

			api_payment_GetWithdrawalLimit().then(
				res => {
					if (res.data.errorCode === 0 && isMountedRef.current) {
						setIsShowEWallet(Boolean(res.data.data.eWalletStatus));
					} else if (res.data.errorCode !== 0) {
						setPopBox({
							isOpen: true,
							content: `[${res.data.errorCode}] ${res.data.message}`
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

			api_payment_GetWithdrawalBlockSetting().then(
				res => {
					if (res.data.errorCode === 0 && isMountedRef.current) {
						setWithdrawalSettingTypeList(res.data.data);
					} else if (res.data.errorCode !== 0) {
						setPopBox({
							isOpen: true,
							content: `[${res.data.errorCode}] ${res.data.message}`
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
		} else if (isMountedRef.current) {
			setMsgCount(0);
		}
	}, [userInfo.isLogin, userInfo.regTime, userInfo.userName, i18n]);

	useEffect(() => {
		const { siteLangList } = siteInfo();
		let lang = GET_LANG_ID(userInfo?.langId);
		if (!siteLangList.includes(lang)) {
			lang = defaultLang;
		}

		seti18n(i18nConfig(lang));
		translationI18n.changeLanguage(lang);
		i18next.changeLanguage(lang);
	}, [userInfo.langId]);

	return (
		<ct.userInfoContext.Provider value={{ userInfo, setUserInfo }}>
			<ct.i18nContext.Provider value={{ i18n, seti18n }}>
				<ct.walletInfoContext.Provider
					value={{ walletInfo, setWalletInfo }}>
					<ct.withdrawalBlockSettingContext.Provider
						value={{ withdrawalSettingTypeList }}>
						<ct.eWalletContext.Provider
							value={{ isShowEWallet, setIsShowEWallet }}>
							<ct.themeContext.Provider
								value={{ theme, setTheme }}>
								<ct.popBoxContext.Provider
									value={{ popBox, setPopBox }}>
									<ct.navContext.Provider
										value={{ nav, setNav }}>
										<ct.msgCountContext.Provider
											value={{ msgCount, setMsgCount }}>
											<ct.loadingContext.Provider
												value={{ loading, setLoading }}>
												<ct.rootContext.Provider
													value={{ root, setRoot }}>
													{children}
												</ct.rootContext.Provider>
											</ct.loadingContext.Provider>
										</ct.msgCountContext.Provider>
									</ct.navContext.Provider>
								</ct.popBoxContext.Provider>
							</ct.themeContext.Provider>
						</ct.eWalletContext.Provider>
					</ct.withdrawalBlockSettingContext.Provider>
				</ct.walletInfoContext.Provider>
			</ct.i18nContext.Provider>
		</ct.userInfoContext.Provider>
	);
};

Wrapper.defaultProps = {
	children: null
};

Wrapper.propTypes = {
	children: node
};
