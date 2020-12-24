import { defPromotionNav, defTabs } from "../common/def";
import React, { useState, useEffect } from "react";
import { defFilterType } from "../common/def";

export const useHandleNav = ({ defaultValue = defFilterType.all, isLogin }) => {
	const [filterType, setFilterType] = useState(defaultValue);

	const onClickFilter = value => {
		setFilterType(value);
	};

	useEffect(() => {
		const afterLogin = defPromotionNav.find(n => n.value === filterType)
			?.afterLogin;
		if (afterLogin && !isLogin) {
			setFilterType(defFilterType.all);
		}
	}, [filterType, isLogin]);

	return { filterType, onClickFilter };
};

export default ({ i18n = {}, filterType, onClickFilter, tab, isLogin }) => {
	let rows =
		tab === defTabs.Expired.key
			? null
			: defPromotionNav
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
