import { defPromotionNav, defTabs } from "../common/def";
import React from "react";

export default ({ i18n = {}, filterType, onClickFilter, tab }) => {
	let rows =
		tab === defTabs.Expired.key
			? null
			: defPromotionNav.map(n => {
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
