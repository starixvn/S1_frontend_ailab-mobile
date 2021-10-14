import React, { useContext } from "react";
import PropTypes from "prop-types";
import defNav from "./defNav";
import { i18nContext } from "../common/context";

const Nav = props => {
	const { i18n } = useContext(i18nContext);

	const rows = Object.keys(defNav).map(k => {
		const _nav = defNav[k];
		return (
			<button
				data-testid={`nav_${_nav.key}`}
				key={`casino-nav-${k}`}
				className={props.selNav === k ? "open" : ""}
				onClick={props.SelectNav.bind(this, k)}>
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
