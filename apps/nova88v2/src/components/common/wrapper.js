import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useMatch, navigate } from "@reach/router";
import * as ct from "./context";
import { IS_LOGGED_IN } from "../../service/auth";
import { GET_LANG_ID, isVaildLang } from "../../service/language";
import themeList from "../../datas/theme";
import useInterval from "../hook/useInterval";
import { getUrlParameter, setCookie, deleteCookie } from "./common";
import i18nConfig from "../../i18n/config";
import api from "../../service/api";

export const Wrapper = ({ children }) => {
	const [i18n, seti18n] = useState(i18nConfig());
	const [loading, setLoading] = useState(false);
	const [root, setRoot] = useState(false);
	const match = useMatch("/:langId/*");
	const urlLangId = isVaildLang(match?.langId) ? match.langId : null;
	const [userInfo, setUserInfo] = useState({
		isLogin: null,
		langId: urlLangId ?? GET_LANG_ID(),
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

	const isMountedRef = useRef(null);
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
	}, []);

	useEffect(() => {
		IS_LOGGED_IN().then(isLogin => {
			if (isLogin !== userInfo.isLogin && isMountedRef.current) {
				setUserInfo(prevState => ({
					...prevState,
					isLogin
				}));
			}
		});
	}, [userInfo.isLogin]);

	const OnlineCheckCallBack = (errorCode, errMsg) => {
		if (errorCode !== 0 && isMountedRef.current) {
			if (!userInfo.loginFromResetPwd) {
				setPopBox({
					isOpen: true,
					title: i18n.lbl_ImportantNote,
					content: errMsg ?? i18n.msg_ForceLogedoutHint
				});
			}

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
		userInfo.isLogin ? 10000 : null
	);

	useEffect(() => {
		if (userInfo.isLogin) {
			if (!userInfo.regTime) {
				api.accountStrict.GetCustProfile().then(res_custInfo => {
					if (
						res_custInfo.data.errorCode === 0 &&
						isMountedRef.current
					) {
						const { data } = res_custInfo.data;
						setUserInfo(prevState => ({
							...prevState,
							...data
						}));
					}
				});
			}

			api.account.GetMsgCount().then(res => {
				if (res.data.errorCode === 0 && isMountedRef.current) {
					setMsgCount(res.data.data);
				}
			});

			if (userInfo.userName) {
				api.account.GetBalnace().then(res => {
					if (res.data.errorCode === 0 && isMountedRef.current) {
						setWalletInfo(prevState => ({
							...prevState,
							main: res.data.data
						}));
					}
				});
			}

			if (urlLangId !== userInfo.langId) {
				if (match?.["*"]) {
					navigate(`/${userInfo.langId}/${match["*"]}`);
				} else {
					navigate(`/${userInfo.langId}`);
				}
			}
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
		seti18n(i18nConfig(userInfo.langId));
	}, [userInfo.langId]);

	return (
		<ct.userInfoContext.Provider value={{ userInfo, setUserInfo }}>
				<ct.i18nContext.Provider value={{ i18n, seti18n }}>
					<ct.walletInfoContext.Provider
						value={{ walletInfo, setWalletInfo }}>
						<ct.themeContext.Provider value={{ theme, setTheme }}>
							<ct.popBoxContext.Provider
								value={{ popBox, setPopBox }}>
								<ct.navContext.Provider value={{ nav, setNav }}>
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
					</ct.walletInfoContext.Provider>
				</ct.i18nContext.Provider>
		</ct.userInfoContext.Provider>
	);
};

Wrapper.propTypes = {
	children: PropTypes.node.isRequired
};
