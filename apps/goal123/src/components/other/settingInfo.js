import React, { useContext, useRef, useEffect, useState } from "react";
import { Redirect } from "@reach/router";
import PropTypes from "prop-types";
import {
	i18nContext,
	userInfoContext,
	navContext,
	popBoxContext
} from "../common/context";
import { LOGOUT } from "../../service/auth";
import { api_SetLanguage } from "../../service/api/account";
import ThemeMode from "../member/profile.themeMode";
import path from "../../path";
import { siteInfo } from "../../config";
import DefLangs from "../../datas/defLangs";
import useShieldCheck from "../hook/useShieldCheck";

const languageList = () => {
	const _siteInfo = siteInfo();
	return _siteInfo.siteLangList.map(l => DefLangs[l]);
};

export default () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);
	const { setPopBox } = useContext(popBoxContext);
	const [userLanguage, setUserLanguage] = useState("en");
	const [redirectPath, setRedirectPath] = useState(null);
	const isMountedRef = useRef(null);
	const { deleteShieldData } = useShieldCheck();

	const _languageList = languageList();
	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (isMountedRef.current && redirectPath !== null) {
			setRedirectPath(`/${path.setting.root}`);
		}
	}, [redirectPath]);

	useEffect(() => {
		if (userInfo.langId && isMountedRef.current) {
			setUserLanguage(prevState => {
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
	};

	const handleLogout = () => {
		LOGOUT(() => {
			setUserInfo(prevState => ({
				isLogin: false,
				langId: prevState.langId
			}));
			setNav(() => null);
			setRedirectPath("/");
			deleteShieldData();
		});
	};

	const arr = _languageList.map(item => {
		return (
			<Item
				key={`lang-${item.value}`}
				value={item.value}
				displayText={item.displayText}
				img={item.img}
				userLanguage={userLanguage}
				selectLanguage={selectLanguage}
			/>
		);
	});

	return redirectPath !== null ? (
		<Redirect to={redirectPath} noThrow />
	) : (
		<>
			<ThemeMode />
			<div className="Country">
				<i className="icon icon-sphere">{i18n.lbl_Languages}</i>
				<div>{arr}</div>
			</div>
			{userInfo.isLogin ? (
				<div className="btn-group">
					<button className="orange" onClick={handleLogout}>
						{i18n.lbl_Logout}
					</button>
				</div>
			) : null}
		</>
	);
};

const Item = props => {
	return (
		<div
			className={`${props.userLanguage === props.value ? "open" : ""}`}
			onClick={props.selectLanguage.bind(null, props.value)}>
			<img src={props.img} alt="" />
			<span className="text">{props.displayText}</span>
		</div>
	);
};

Item.propTypes = {
	userLanguage: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	selectLanguage: PropTypes.func.isRequired,
	img: PropTypes.string.isRequired,
	displayText: PropTypes.string.isRequired
};
