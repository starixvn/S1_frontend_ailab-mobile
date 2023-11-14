import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import Logo from "../img/logo";
import { i18nContext, userInfoContext } from "../common/context";
import { defSubMenus } from "../../datas/defMenu";
import ShortcutBar from "./shortcutBar";
import { api_SetLanguage } from "../../service/api/account";
import { setCookie } from "../common/common";
import { siteInfo, bannerImgUrl } from "../../config";

const Content = ({ handleSideMenuPanel, isOpenSideMenu }) => {
	const { i18n } = useContext(i18nContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);

	const { langId } = userInfo;

	const closeNavPanel = () => {
		handleSideMenuPanel(false);
	};

	const setLanguage = async () => {
		const newLangId = langId === "en" ? "vn" : "en";

		if (newLangId !== userInfo.langId) {
			if (userInfo.isLogin) {
				try {
					await api_SetLanguage(newLangId);
				} catch (error) {}
			}

			setUserInfo(prev => ({ ...prev, langId: newLangId }));
		}

		setCookie(siteInfo(newLangId).langCookie, newLangId);
	};

	return (
		<div className={`menu${isOpenSideMenu ? " active" : ""}`}>
			<div>
				<div className="menu-top">
					<button className="icon-arrow" onClick={closeNavPanel} />
					<a href="/">
						<Logo className="logo" />
					</a>
					<div className="currencybtn" onClick={setLanguage}>
						<div className="currencybtn-content">
							<img
								src={`${bannerImgUrl}/h5/img/4.0/${langId}.jpg`}
								alt={langId}
							/>
						</div>
					</div>
				</div>

				{userInfo.isLogin && (
					<ShortcutBar
						closeSubMenu={() => handleSideMenuPanel(false)}
					/>
				)}

				<SubMenuList
					i18n={i18n}
					langId={userInfo.langId}
					closeNavPanel={closeNavPanel}
				/>
			</div>
		</div>
	);
};

Content.propTypes = {
	isOpenSideMenu: PropTypes.bool.isRequired,
	handleSideMenuPanel: PropTypes.func.isRequired
};

export default Content;

const SubMenuList = ({ i18n, langId, closeNavPanel }) => {
	const rows = defSubMenus(langId).map(({ icon, href, path, displayKey }) => {
		if (href) {
			return (
				<a className="menu-list-item" href={href} key={displayKey}>
					<i className={icon} />
					<span>{i18n[displayKey]}</span>
				</a>
			);
		}

		return (
			<Link
				to={path}
				key={displayKey}
				className="menu-list-item"
				onClick={closeNavPanel}>
				<i className={icon} />
				<span>{i18n[displayKey]}</span>
			</Link>
		);
	});

	return <div className="menu-list">{rows}</div>;
};

SubMenuList.propTypes = {
	langId: PropTypes.string.isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	closeNavPanel: PropTypes.func.isRequired
};
