import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useMatch, useNavigate, useLocation } from "@reach/router";
import { Link } from "@Router";
import { i18nContext, userInfoContext } from "Context";
import useBeforeLoginCheck from "../hook/useBeforeLoginCheck";

const isMatch = ({ location, tabInfo, langId }) => {
	return location.path
		? location.path === `/:langId/${tabInfo.to}` ||
				location.path === tabInfo.to
		: location.pathname === `/${langId}/${tabInfo.to}` ||
				location.pathname === tabInfo.to;
};

export const getMainClass = ({ defTabs, location }) => {
	let mainClass = "";
	Object.keys(defTabs).some(key => {
		const tabInfo = defTabs[key];
		let result = false;
		if (tabInfo.subTabs) {
			result = Object.keys(tabInfo.subTabs).some(subKey => {
				const subTabInfo = tabInfo.subTabs[subKey];
				if (isMatch({ location, tabInfo: subTabInfo })) {
					mainClass = subTabInfo.mainClass;
					return true;
				}
				return false;
			});
		} else if (isMatch({ location, tabInfo })) {
			mainClass = tabInfo.mainClass;
			result = true;
		}
		return result;
	});

	return mainClass;
};

const IndexPage = ({ defTabs, beforeLogin, filter, breadCrumb, tabHint }) => {
	const location = useLocation();
	const navigate = useNavigate();
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { canSee } = useBeforeLoginCheck({
		isLogin: userInfo.isLogin,
		beforeLogin,
		langId: userInfo.langId
	});

	if (userInfo.isLogin === null) return null;
	if (!canSee) {
		return navigate(`/${userInfo.langId}`);
	}

	let currentTab = null;
	const mainTab = [];
	let subItems = [];
	Object.keys(defTabs).forEach(key => {
		const tabInfo = defTabs[key];
		let isMatchSub = false;
		if (tabInfo.subTabs) {
			subItems = Object.keys(tabInfo.subTabs).map(subKey => {
				const subTabInfo = tabInfo.subTabs[subKey];
				isMatchSub = isMatch({
					location,
					tabInfo: subTabInfo,
					langId: userInfo.langId
				});
				return (
					<TabItem
						key={`subtab-btn-${subKey}`}
						i18n={i18n}
						tabItem={subTabInfo}
					/>
				);
			});
		}

		if (isMatch({ location, tabInfo, langId: userInfo.langId })) {
			currentTab = tabInfo;
		}

		mainTab.push(
			<TabItem
				key={`tab-btn-${key}`}
				i18n={i18n}
				tabItem={tabInfo}
				match={isMatchSub}
				tabHint={tabHint}
			/>
		);
	});

	return (
		<header className="header">
			<div className="headerTag">{mainTab}</div>
			{subItems?.length > 0 &&
			(currentTab === null || currentTab?.subTabs) ? (
				<div className="tag">{subItems}</div>
			) : null}
			{filter || null}
			{breadCrumb || null}
		</header>
	);
};

IndexPage.defaultProps = {
	defTabs: {},
	beforeLogin: false,
	filter: null,
	tabHint: "",
	breadCrumb: null
};

IndexPage.propTypes = {
	defTabs: PropTypes.objectOf(PropTypes.object),
	beforeLogin: PropTypes.bool,
	filter: PropTypes.node,
	tabHint: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	breadCrumb: PropTypes.node
};

const TabItem = ({ i18n = {}, tabItem = {}, match = false, tabHint = "" }) => {
	const matchTo = useMatch(`/:langId/${tabItem.to}/*`) !== null;
	const matchExclude = useMatch(`/:langId/${tabItem.excludeMath}/*`) !== null;
	const _isMatch =
		match || (matchTo && (!tabItem.excludeMath || !matchExclude));

	return (
		<Link to={tabItem.to} className={_isMatch ? "active" : ""}>
			{i18n[tabItem.displayKey]}
			{tabHint && tabItem.tabHint ? (
				<i className="quantity">{tabHint}</i>
			) : null}
		</Link>
	);
};

export default IndexPage;
