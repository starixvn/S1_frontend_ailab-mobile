import React from "react";
import PropTypes from "prop-types";
import TabPage from "../components/common/tabPage";
import path from "../path";

const defTabs = {
	default: {
		to: `/${path.transfer.root}`,
		displayKey: "lbl_Transfer",
		excludeMath: path.transfer.sub.history.root
	},
	History: {
		to: path.transfer.sub.history.root,
		displayKey: "lbl_TransferHistory"
	}
};

const IndexPage = props => {
	return <TabPage defTabs={defTabs}>{props.children}</TabPage>;
};

IndexPage.propTypes = {
	children: PropTypes.node.isRequired
};

export default IndexPage;
