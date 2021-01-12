import React from "react";
import PropTypes from "prop-types";
import TabPage from "../components/common/tabPage";
import path from "../path";

const defTabs = {
	default: {
		to: `/${path.member.root}`,
		displayKey: "lbl_Profile",
		excludeMath: path.member.sub.bankInfo.root
	},
	referral: {
		to: `/${path.referral.root}`,
		displayKey: "lbl_Referral"
	},
	bankInfo: {
		to: path.member.sub.bankInfo.root,
		displayKey: "lbl_BankInfo"
	}
};

const IndexPage = props => {
	return <TabPage defTabs={defTabs}>{props.children}</TabPage>;
};

IndexPage.propTypes = {
	children: PropTypes.node.isRequired
};

export default IndexPage;
