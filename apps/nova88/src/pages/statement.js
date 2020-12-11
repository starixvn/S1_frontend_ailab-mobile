import React from "react";
import TabPage from "../components/common/tabPage";
import path from "../path";

const defTabs = {
	default: {
		to: `/${path.statement.root}`,
		displayKey: "lbl_Statement",
		excludeMath: path.statement.sub.financialLog.root
	},
	FinancialLog: {
		to: path.statement.sub.financialLog.root,
		displayKey: "lbl_financialLog"
	}
};

const IndexPage = props => {
	return <TabPage defTabs={defTabs}>{props.children}</TabPage>;
};

export default IndexPage;
