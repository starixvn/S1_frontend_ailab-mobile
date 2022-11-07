import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { defPromotionNav, defFilterType } from "../common/def";

export const useHandleNav = ({
	defaultValue,
	isLogin,
	navBar = defPromotionNav
}) => {
	const [filterType, setFilterType] = useState(
		defaultValue ?? defFilterType.all
	);

	const onClickFilter = value => {
		setFilterType(value);
	};

	useEffect(() => {
		const afterLogin = navBar.find(n => n.value === filterType)?.afterLogin;
		if (afterLogin && !isLogin) {
			setFilterType(defFilterType.all);
		}
	}, [filterType, isLogin, navBar]);

	return { filterType, onClickFilter };
};

const NavBar = ({ i18n = {}, filterType, onClickFilter, isLogin, navBar }) => {
	const rows =
		navBar ??
		defPromotionNav
			.filter(n => !n.afterLogin || (n.afterLogin && isLogin))
			.map(n => {
				return (
					<button
						key={`promo-nav-${n.value}`}
						className={filterType === n.value ? "open" : ""}
						onClick={onClickFilter.bind(this, n.value)}>
						{i18n?.[n.displayKey]?.toUpperCase()}
					</button>
				);
			});
	return <div className="inputBox filterBtn">{rows}</div>;
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
