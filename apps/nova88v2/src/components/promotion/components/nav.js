import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { defPromotionNav, defTabs, defFilterType } from "../common/def";

export const useHandleNav = ({
	defaultValue = defFilterType.all,
	isLogin,
	tab,
	navBar = defPromotionNav
}) => {
	const [filterType, setFilterType] = useState(defaultValue);

	const onClickFilter = value => {
		setFilterType(value);
	};

	useEffect(() => {
		if (tab === defTabs.Expired.key) {
			setFilterType(defFilterType.all);
		}
	}, [tab]);

	useEffect(() => {
		const afterLogin = navBar.find(n => n.value === filterType)?.afterLogin;
		if (afterLogin && !isLogin) {
			setFilterType(defFilterType.all);
		}
	}, [filterType, isLogin, navBar]);

	return { filterType, onClickFilter };
};

const Nav = ({
	i18n,
	filterType,
	onClickFilter,
	isLogin,
	navBar,
	Class,
	children
}) => {
	const wrapperDiv = useRef(null);
	const rows = navBar
		.filter(n => !n.afterLogin || (n.afterLogin && isLogin))
		.map(n => {
			return (
				<button
					key={`promo-nav-${n.value}`}
					className={filterType === n.value ? "active" : ""}
					onClick={onClickFilter.bind(this, n.value)}>
					{i18n?.[n.displayKey]}
				</button>
			);
		});

	const clickToScroll = () => {
		wrapperDiv.current.scrollTo({
			left: wrapperDiv.current.scrollLeft + 80,
			behavior: "smooth"
		});
	};

	return (
		<div ref={wrapperDiv} className={Class}>
			{children || rows}
			<i
				className="icon icon-keyboard_arrow_right"
				onClick={clickToScroll}
			/>
		</div>
	);
};

Nav.defaultProps = {
	i18n: {},
	filterType: 0,
	onClickFilter: () => null,
	isLogin: false,
	navBar: defPromotionNav,
	Class: "",
	children: null
};

Nav.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.any),
	filterType: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	onClickFilter: PropTypes.func,
	isLogin: PropTypes.bool,
	navBar: PropTypes.arrayOf(PropTypes.any),
	Class: PropTypes.string,
	children: PropTypes.node
};

export default Nav;
