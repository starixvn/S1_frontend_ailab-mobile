import React, { useState, useEffect } from "react";
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

export default ({
	i18n = {},
	filterType = {},
	onClickFilter = () => null,
	tab,
	isLogin,
	navBar = defPromotionNav,
	Class,
	children
}) => {
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
	return <div className={Class}>{children || rows}</div>;
};
