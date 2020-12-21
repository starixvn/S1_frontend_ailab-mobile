import { defPromotionNav, defTabs } from "../common/def";
import React, { useState } from "react";
import { defFilterType } from "../common/def";

export const useHandleNav = () => {
	const [filterType, setFilterType] = useState(defFilterType.all);

	const onClickFilter = value => {
		setFilterType(value);
	};

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
