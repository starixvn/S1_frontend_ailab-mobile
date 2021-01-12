import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Redirect, Link, useMatch } from "@reach/router";
import { i18nContext, userInfoContext } from "Context";
import useBeforeLoginCheck from "../hook/useBeforeLoginCheck";

const IndexPage = ({ defTabs, children, beforeLogin }) => {
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
	const items = Object.keys(defTabs).map(key => (
		<TabItem key={`tab-btn-${key}`} i18n={i18n} tabItem={defTabs[key]} />
	));

	return (
		<>
			<div className="tag">{items}</div>
			{children}
		</>
	);
};

IndexPage.defaultProps = {
	defTabs: [],
	beforeLogin: false
};

IndexPage.propTypes = {
	defTabs: PropTypes.objectOf(PropTypes.object),
	children: PropTypes.node.isRequired,
	beforeLogin: PropTypes.bool
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

export default IndexPage;
