import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Redirect, Link, useMatch } from "@reach/router";
import { i18nContext, userInfoContext } from "./context";

const IndexPage = ({ defTabs, children, beforeLogin }) => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const [redirectPath, setRedirectPath] = useState(null);

	useEffect(() => {
		let mounted = true;
		if (mounted && redirectPath !== null) {
			setRedirectPath(null);
		}

		return () => {
			mounted = false;
		};
	}, [redirectPath, setRedirectPath]);

	useEffect(() => {
		let mounted = true;
		if (mounted && userInfo.isLogin === false && !beforeLogin) {
			setRedirectPath("/");
		}

		return () => {
			mounted = false;
		};
	}, [userInfo.isLogin, setRedirectPath, beforeLogin]);

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
	defTabs: {},
	beforeLogin: false
};

IndexPage.propTypes = {
	defTabs: PropTypes.objectOf(PropTypes.string),
	children: PropTypes.node.isRequired,
	beforeLogin: PropTypes.bool
};

const TabItem = ({ i18n, tabItem }) => {
	const matchTo = useMatch(`${tabItem.to}/*`) !== null;
	const matchExclude = useMatch(`${tabItem.excludeMath}/*`) !== null;
	const match = matchTo && (!tabItem.excludeMath || !matchExclude);

	return (
		<Link to={tabItem.to} className={match ? "open" : ""}>
			{i18n[tabItem.displayKey]}
		</Link>
	);
};

TabItem.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	tabItem: PropTypes.objectOf(PropTypes.string).isRequired
};

export default IndexPage;
