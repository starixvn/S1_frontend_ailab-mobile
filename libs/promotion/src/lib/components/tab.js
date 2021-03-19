import React, { useState } from "react";
import { defTabs } from "../common/def";

export const useHandleTab = ({ defaultValue = defTabs.Processing.key }) => {
	const [tab, setTab] = useState(defaultValue);

	const onClickTab = tabKey => {
		setTab(tabKey);
	};

	return { tab, onClickTab };
};

export default ({ i18n, tab, onClickTab }) => {
	const rows = Object.values(defTabs).map(t => (
		<TabBtn
			key={`promo-tab-${t.key}`}
			isOpen={tab === t.key}
			onClickTab={onClickTab.bind(this, t.key)}
			displayText={i18n[t.displayKey]}
		/>
	));
	return <div className="tag">{rows}</div>;
};

export const TabBtn = ({ onClickTab, isOpen, displayText }) => (
	<a onClick={onClickTab} className={isOpen ? "open" : ""}>
		{displayText}
	</a>
);
