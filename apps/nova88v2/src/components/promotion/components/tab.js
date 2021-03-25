import React, { useState, useContext } from "react";
import { userInfoContext } from "Context";
import { useNavigate } from "@reach/router";
import path from "../../../path";
import { defTabs } from "../common/def";

export const useHandleTab = ({ defaultValue = defTabs.Processing.key }) => {
	const [tab, setTab] = useState(defaultValue);
	const { userInfo } = useContext(userInfoContext);
	const navigate = useNavigate();
	const onClickTab = tabKey => {
		setTab(prev => {
			if (prev !== tabKey) {
				navigate(`/${userInfo.langId}/${path.promotion.root}`, {
					state: { tab: tabKey }
				});
			}
			return tabKey;
		});
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
	return rows;
};

export const TabBtn = ({ onClickTab, isOpen, displayText }) => (
	<button onClick={onClickTab} className={isOpen ? "active" : ""}>
		{displayText}
	</button>
);
