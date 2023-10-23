import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { useMatch, useLocation, useNavigate } from "@reach/router";
import * as ct from "./context";
import { IS_LOGGED_IN } from "../../service/auth";
import { GET_LANG_ID, isVaildLang } from "../../service/language";
import themeList from "../../datas/theme";
import useInterval from "../hook/useInterval";
import {
	getUrlParameter,
	setCookie,
	deleteCookie,
	readCookie,
	langMappingCurr,
	defCurrenyId,
	memberType
} from "./common";

import i18nConfig from "../../i18n/config";
import api from "../../service/api";
import { siteInfo } from "../../config";
import path, { defSpecialPath } from "../../path";
import { defType } from "../hook/useHandleLineLogin";
import SEO from "../seo/seo";

const isSpecialPath = () => {
	return (
		defSpecialPath[
			`${window.location.pathname?.substring(1)}`?.toLowerCase()
		] !== undefined
	);
};

export const getDefaultCurrencyId = () => {
	const defaultPathLang = () => {
		const urlLang =
			typeof document === `undefined`
				? ""
				: window.location.pathname.split("/")?.[1];
		const cookieLang = readCookie(siteInfo()?.langCookie);
		const _defaultLang = GET_LANG_ID();

		let result = _defaultLang;
		if (isVaildLang(urlLang)) {
			result = urlLang;
		} else if (isVaildLang(cookieLang)) {
			result = cookieLang;
		}
		return result;
	};

	let result = siteInfo()?.siteDefaultCurrencyId;

	const langId = defaultPathLang();
	if (langId !== "en" && langId !== "cs") {
		result = defCurrenyId[langMappingCurr[langId]];
	}

	const cookieCurrencyId = readCookie(siteInfo()?.currencyCookie);
	if (cookieCurrencyId) {
		result = Number(cookieCurrencyId);
	}
	return result;
};

export const Wrapper = ({ children }) => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const [i18n, seti18n] = useState(i18nConfig());
	const { i18n: translationI18n } = useTranslation();
	const [loading, setLoading] = useState(false);
	const [root, setRoot] = useState(false);
	const [tpGameTypeSettingList, setTpGameTypeSettingList] = useState(null);
	const match = useMatch("/:langId/*");

	const urlLangId = isVaildLang(match?.langId) ? match.langId : null;
	const [userInfo, setUserInfo] = useState({
		isLogin: null,
		langId: urlLangId ?? GET_LANG_ID(),
		currencyId: getDefaultCurrencyId(),
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

	const [isShowEWallet, setIsShowEWallet] = useState(false);

	const [popUp, setPopUp] = useState({
		popupMessage: "",
		id: "",
		pageNumber: ""
	});

	const [msgCount, setMsgCount] = useState(0);
	const [theme, setTheme] = useState(themeList.default);

	const [withdrawalSettingTypeList, setWithdrawalSettingTypeList] = useState(
		[]
	);

	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	// * 如果帳號是直播主，只允許進入 首頁 及 slots 頁面
	useEffect(() => {
		if (userInfo.memberType) {
			const LiveStreamingMemberType = 3;
			const isHome =
				pathname === `/${userInfo.langId}` || pathname === "/";

			if (
				userInfo.memberType === LiveStreamingMemberType &&
				!isHome &&
				!pathname.includes(path.casino.root) &&
				!pathname.includes(path.setting.root)
			) {
				navigate(`/${userInfo.langId}`);
			}
		}
	}, [pathname, userInfo.memberType]);

	useEffect(() => {
		const code = getUrlParameter("code");
		const state = getUrlParameter("state");
		const error = getUrlParameter("error");
		const description = getUrlParameter("description");
		const errormessage = getUrlParameter("errormessage");

		let url;
		let platform;
		let userAgent;
		let screen;
		let di = "";
		if (typeof window !== "undefined") {
			url = window.location.origin;
			platform = navigator.platform;
			userAgent = navigator.userAgent;
			screen = `${window.screen.width}:${window.screen.height}:${window.screen.colorDepth}`;
			di = document.getElementById("__di")?.value;
		}

		if (code || state || error) {
			api.lineLogin
				.LineCallback({
					langId: userInfo.langId,
					lineLoginResponse: {
						code,
						state,
						error,
						description,
						errormessage
					},
					loginData: {
						isPersistent: true,
						url,
						platform,
						userAgent,
						screen,
						di
					}
				})
				.then(res => {
					const { errorCode, message, data } = res.data;

					if (errorCode === 0) {
						window.location.reload();
						const _langId = userInfo.langId === "th" ? "th" : "en";
						if (data.type === defType.register) {
							localStorage.setItem(
								"lineUser",
								JSON.stringify(data.userId)
							);
							window.location.href = `/${_langId}/${path.join.root}`;
						} else if (data.type === defType.login) {
							window.location.href = `/${_langId}`;
						} else if (data.type === defType.binding) {
							window.location.href = `/${_langId}/${path.profile.root}`;
						}
					} else {
						setPopBox({
							isOpen: true,
							content: `[${errorCode}] ${message}`
						});
					}
				});
		}
	}, []);

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
	}, []);

	useEffect(() => {
		if (!isSpecialPath()) {
			IS_LOGGED_IN().then(isLogin => {
				if (isLogin !== userInfo.isLogin && isMountedRef.current) {
					setUserInfo(prevState => ({
						...prevState,
						isLogin
					}));
				}
			});
		}
	}, [userInfo.isLogin]);

	const OnlineCheckCallBack = (errorCode, errMsg) => {
		if (errorCode !== 0 && isMountedRef.current) {
			setPopBox({
				isOpen: true,
				content: errMsg ?? i18n.msg_ForceLogedoutHint
			});
			setUserInfo(prevState => ({
				isLogin: false,
				langId: prevState.langId
			}));
		}
	};

	useInterval(
		() => {
			api.account.onlineCheck().then(
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
		userInfo.isLogin && !isSpecialPath() ? 10000 : null
	);

	useEffect(() => {
		if (userInfo.isLogin) {
			if (!userInfo.regTime) {
				api.accountStrict.GetCustProfile().then(
					res_custInfo => {
						if (
							res_custInfo.data.errorCode === 0 &&
							isMountedRef.current
						) {
							const { data } = res_custInfo.data;
							setUserInfo(prevState => ({
								...prevState,
								...data
							}));

							if (data.memberType === memberType.liveHost)
								api.account.GetCustTpGameTypeSetting().then(
									res => {
										setTpGameTypeSettingList(res.data.data);
									},
									() => {
										if (isMountedRef.current) {
											setPopBox({
												isOpen: true,
												content: i18n.msg_ApiServerError
											});
										}
									}
								);
						} else if (res_custInfo.data.errorCode !== 0) {
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
			}

			if (
				userInfo.memberType &&
				userInfo.memberType === memberType.liveHost
			) {
				api.account.GetCustTpGameTypeSetting().then(
					res => {
						setTpGameTypeSettingList(res.data.data);
					},
					() => {
						if (isMountedRef.current) {
							setPopBox({
								isOpen: true,
								content: i18n.msg_ApiServerError
							});
						}
					}
				);
			}

			api.account.GetMsgCount().then(
				res => {
					if (res.data.errorCode === 0 && isMountedRef.current) {
						setMsgCount(res.data.data);
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

			if (userInfo.userName) {
				api.account.GetBalnace().then(
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
			}

			api.payment.GetWithdrawalLimit().then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							setIsShowEWallet(res.data.data.eWalletStatus);
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

			api.payment.GetWithdrawalBlockSetting().then(
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

			// if (match?.["*"]) {
			// 	navigate(`/${userInfo.langId}/${match["*"]}`);
			// } else {
			// 	navigate(`/${userInfo.langId}`);
			// }
		} else if (isMountedRef.current) {
			setMsgCount(0);
		}
	}, [
		userInfo.isLogin,
		userInfo.regTime,
		userInfo.userName,
		i18n,
		userInfo.langId
	]);

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

	// * 設定路徑中的語系
	useEffect(() => {
		const { siteLangList } = siteInfo();
		const langFromUrl = pathname?.split("/")[1];
		if (!siteLangList.includes(langFromUrl)) {
			navigate(`/${i18next.language}${pathname}`);
		}
	}, [pathname]);

	return (
		<ct.popUpMsgContext.Provider value={{ setPopUp, popUp }}>
			<ct.userInfoContext.Provider value={{ userInfo, setUserInfo }}>
				<ct.i18nContext.Provider value={{ i18n, seti18n }}>
					<ct.productTpGameTypeSettingListContext.Provider
						value={{ tpGameTypeSettingList }}>
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
													value={{
														msgCount,
														setMsgCount
													}}>
													<ct.loadingContext.Provider
														value={{
															loading,
															setLoading
														}}>
														<ct.rootContext.Provider
															value={{
																root,
																setRoot
															}}>
															<SEO />

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
					</ct.productTpGameTypeSettingListContext.Provider>
				</ct.i18nContext.Provider>
			</ct.userInfoContext.Provider>
		</ct.popUpMsgContext.Provider>
	);
};

Wrapper.propTypes = {
	children: PropTypes.node.isRequired
};
