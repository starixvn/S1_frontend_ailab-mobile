import React from "react";
import PropTypes from "prop-types";
import TabPage from "../components/common/tabPage";
import path from "../path";

const defTabs = {
	default: {
		to: `/${path.statement.root}`,
		displayKey: "lbl_Statement"
	},
	FinancialLog: {
		to: `/${path.financialLog.root}`,
		displayKey: "lbl_financialLog"
	}
};

const IndexPage = props => {
	return <TabPage defTabs={defTabs}>{props.children}</TabPage>;
};

IndexPage.propTypes = {
	children: PropTypes.node.isRequired
};

export default IndexPage;
