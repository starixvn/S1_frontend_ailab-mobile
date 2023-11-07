import React from "react";
import PropTypes from "prop-types";
import { defPromotionNav } from "@ailab-mobile/promotion";

const NavBar = ({ i18n = {}, filterType, onClickFilter, isLogin, navBar }) => {
	const rows =
		navBar ??
		defPromotionNav
			.filter(n => !n.afterLogin || (n.afterLogin && isLogin))
			.map(n => {
				return (
					<div
						key={`promo-nav-${n.value}`}
						className={`lobby-scrollbar-item ${
							filterType === n.value ? "active" : ""
						}`}
						onClick={onClickFilter.bind(this, n.value)}>
						{i18n?.[n.displayKey]?.toUpperCase()}
					</div>
				);
			});
	return <div className="lobby-scrollbar">{rows}</div>;
};

NavBar.defaultProps = {
	i18n: null,
	filterType: null,
	onClickFilter: () => null,
	isLogin: null,
	navBar: null
};

NavBar.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string),
	filterType: PropTypes.string,
	onClickFilter: PropTypes.func,
	isLogin: PropTypes.bool,
	navBar: PropTypes.arrayOf(PropTypes.any)
};

export default NavBar;
