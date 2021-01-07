import React from "react";
import TabPage from "../components/common/tabPage";
import path from "../path";

const defTabs = {
	default: {
		to: `/${path.statement.root}`,
		displayKey: "lbl_Statement"
	},
	FinancialLog: {
		to: `/${path.financialLog.root}`,
		displayKey: "lbl_FinancialLog"
	}
};

const IndexPage = props => {
	return <TabPage defTabs={defTabs}>{props.children}</TabPage>;
};

export default IndexPage;
