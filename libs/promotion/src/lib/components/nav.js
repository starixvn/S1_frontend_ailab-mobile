import { defPromotionNav, defTabs, defFilterType } from "../common/def";
import React, { useState, useEffect } from "react";

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
	filterType,
	onClickFilter,
	tab,
	isLogin,
	navBar = defPromotionNav
}) => {
	let rows =
		tab === defTabs.Expired.key
			? null
			: navBar
					.filter(n => !n.afterLogin || (n.afterLogin && isLogin))
					.map(n => {
						return (
							<button
								key={`promo-nav-${n.value}`}
								className={filterType === n.value ? "open" : ""}
								onClick={onClickFilter.bind(this, n.value)}>
								{i18n?.[n.displayKey]}
							</button>
						);
					});
	return <div className="inputBox filterBtn">{rows}</div>;
};
