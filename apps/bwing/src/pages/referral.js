import React from "react";
import PropTypes from "prop-types";
import TabPage from "../components/common/tabPage";
import path from "../path";
import ReferralWrapper from "../components/referral/referral.wrapper";

const defTabs = {
	default: {
		to: `/${path.referral.root}`,
		displayKey: "lbl_Referral",
		excludeMath: path.referral.sub.history.root
	},
	History: {
		to: path.referral.sub.history.root,
		displayKey: "lbl_ReferralHistory"
	}
};

const IndexPage = props => {
	return (
		<ReferralWrapper>
			<TabPage defTabs={defTabs}>{props.children}</TabPage>
		</ReferralWrapper>
	);
};

IndexPage.propTypes = {
	children: PropTypes.node.isRequired
};

export default IndexPage;
