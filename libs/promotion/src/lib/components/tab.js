import React from "react";
import { defTabs } from "../common/def";

export default ({ i18n, tab, onClickTab }) => {
	let rows = Object.values(defTabs).map(t => {
		return (
			<TabBtn
				key={`promo-tab-${t.key}`}
				isOpen={tab === t.key}
				onClickTab={onClickTab.bind(this, t.key)}
				displayText={i18n[t.displayKey]}
			/>
		);
	});
	return <div className="tag">{rows}</div>;
};

export const TabBtn = ({ onClickTab, isOpen, displayText }) => (
	<a onClick={onClickTab} className={isOpen ? "open" : ""}>
		{displayText}
	</a>
);
