import React from "react";
import TabPage from "../components/common/tabPage";
import path from "../path";

const defTabs = {
	default: {
		to: `/${path.referral.root}`,
		displayKey: "lbl_ReferFriends",
		excludeMath: path.referral.sub.history.root
	}
	// History: {
	// 	to: path.referral.sub.history.root,
	// 	displayKey: "lbl_ReferralHistory"
	// }
};

const IndexPage = props => {
	return <TabPage defTabs={defTabs}>{props.children}</TabPage>;
};

export default IndexPage;
