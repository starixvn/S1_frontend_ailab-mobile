import React, { useEffect, useContext, useState, useRef } from "react";
import { siteInfo } from "apps/goal123/src/config";
import { useTranslation } from "react-i18next";
import { api_SetLanguage } from "apps/goal123/src/service/api/account";
import defLangs from "apps/goal123/src/datas/defLangs";
import { isInApp, setAppLanguage } from "@ailab-mobile/common";
import { setCookie } from "../../common/common";
import { userInfoContext } from "../../common/context";

const MenuSwitchLang = () => {
	const [userLanguage, setUserLanguage] = useState("vn");
	const { t } = useTranslation();
	const isMountedRef = useRef(null);
	const { userInfo, setUserInfo } = useContext(userInfoContext);

	const languageList = () => {
		const _siteInfo = siteInfo();
		return _siteInfo.siteLangList.map(l => defLangs[l]);
	};

	const _languageList = languageList();

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (userInfo.langId && isMountedRef.current) {
			setUserLanguage(() => {
				return _languageList.find(l => l.value === userInfo.langId) ===
					undefined
					? "en"
					: userInfo.langId;
			});
		}
	}, [userInfo.langId, _languageList]);

	const selectLanguage = language => {
		if (userLanguage !== language) {
			const langId = language;
			setUserLanguage(language);

			if (userInfo.isLogin) {
				api_SetLanguage(langId).then(
					res => {
						if (isMountedRef.current) {
							if (res.data.errorCode === 0) {
								setUserInfo(prevState => ({
									...prevState,
									langId
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
						if (isMountedRef.current) {
							setPopBox({
								isOpen: true,
								content: i18n.msg_ApiServerError
							});
						}
					}
				);
			} else {
				setUserInfo(prevState => ({
					...prevState,
					langId
				}));
			}
		}
		setCookie(siteInfo(language).langCookie, language);
		if (isInApp) setAppLanguage(language);
	};

	return (
		<div className="menu-lang">
			<div className="country-list">
				<a
					className={
						userInfo.langId === "en" ? "flag en active" : "flag en"
					}
					onClick={selectLanguage.bind(this, "en")}>
					{t("Label_Menu_En")}
				</a>
				<a
					className={
						userInfo.langId === "vn" ? "flag vn active" : "flag vn"
					}
					onClick={selectLanguage.bind(this, "vn")}>
					{t("Label_Menu_Vn")}
				</a>
			</div>
		</div>
	);
};

export default MenuSwitchLang;
