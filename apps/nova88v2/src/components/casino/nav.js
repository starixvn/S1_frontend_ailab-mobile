import React, { useContext } from "react";
import { i18nContext } from "Context";
import PropTypes from "prop-types";
import defNav from "./defNav";

const Nav = props => {
	const { selNav, SelectNav } = props;
	const { i18n } = useContext(i18nContext);
	const rows = Object.keys(defNav).map(k => {
		const _nav = defNav[k];
		return (
			<button
				key={`casino-nav-${k}`}
				className={selNav === k ? "active" : ""}
				onClick={SelectNav.bind(this, k)}>
				{i18n[_nav.displayKey]}
			</button>
		);
	});

	return <div className="inputBox filterBtn">{rows}</div>;
};

Nav.propTypes = {
	selNav: PropTypes.string.isRequired,
	SelectNav: PropTypes.func.isRequired
};

export default Nav;
