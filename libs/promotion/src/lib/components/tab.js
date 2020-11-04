import React from "react";
import { defTabs } from "../common/def";

export default ({ i18n, tab, onClickTab }) => {
	let rows = Object.values(defTabs).map(t => {
		return (
			<a
				key={`promo-tab-${t.key}`}
				onClick={onClickTab.bind(this, t.key)}
				className={tab === t.key ? "open" : ""}>
				{i18n[t.displayKey]}
			</a>
		);
	});
	return <div className="tag">{rows}</div>;
};
