import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Redirect, Link, useMatch, useLocation } from "@reach/router";
import { i18nContext, userInfoContext } from "./context";
import useBeforeLoginCheck from "../hook/useBeforeLoginCheck";

const IndexPage = ({
	defTabs,
	children,
	beforeLogin,
	multipleExclude,
	showScroll
}) => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { redirectPath } = useBeforeLoginCheck({
		isLogin: userInfo.isLogin,
		beforeLogin
	});

	if (userInfo.isLogin === null) return null;
	if (redirectPath !== null) {
		return <Redirect to="/" noThrow />;
	}
	const items = multipleExclude
		? Object.keys(defTabs).map(key => (
				<SimpleTab
					key={`tab-btn-${key}`}
					i18n={i18n}
					tabItem={defTabs[key]}
				/>
		  ))
		: Object.keys(defTabs).map(key => (
				<TabItem
					key={`tab-btn-${key}`}
					i18n={i18n}
					tabItem={defTabs[key]}
				/>
		  ));

	return (
		<>
			<div className={`tag${showScroll ? " scroll" : ""}`}>{items}</div>
			{children}
		</>
	);
};

IndexPage.defaultProps = {
	defTabs: [],
	beforeLogin: false,
	multipleExclude: false,
	showScroll: false
};

IndexPage.propTypes = {
	defTabs: PropTypes.objectOf(PropTypes.object),
	children: PropTypes.node.isRequired,
	beforeLogin: PropTypes.bool,
	multipleExclude: PropTypes.bool,
	showScroll: PropTypes.bool
};

const TabItem = ({ i18n = {}, tabItem = {} }) => {
	const matchTo = useMatch(`${tabItem.to}/*`) !== null;
	const matchExclude = useMatch(`${tabItem.excludeMath}/*`) !== null;
	const match = matchTo && (!tabItem.excludeMath || !matchExclude);

	return (
		<Link to={tabItem.to} className={match ? "open" : ""}>
			{i18n[tabItem.displayKey]}
		</Link>
	);
};

const SimpleTab = ({ i18n, tabItem }) => {
	const location = useLocation();
	const curPath = location.pathname.split("/");
	const re = /[a-zA-Z]/g;
	const match = curPath[curPath.length - 1] === tabItem.to.match(re).join("");

	return (
		<Link to={tabItem.to} className={match ? "open" : ""}>
			{i18n[tabItem.displayKey]}
		</Link>
	);
};

SimpleTab.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	tabItem: PropTypes.objectOf(PropTypes.string).isRequired
};

SimpleTab.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	tabItem: PropTypes.objectOf(PropTypes.string).isRequired
};

export default IndexPage;
