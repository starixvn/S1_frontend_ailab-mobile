import React from "react";
import TabPage from "../components/common/tabPage";
import path from "../path";
import FinancialLog from "../components/statement/financialLog";

const defTabs = {
	defaultStatement: {
		to: `/${path.statement.root}`,
		displayKey: "lbl_Statement"
	},
	default: {
		to: `/${path.financialLog.root}`,
		displayKey: "lbl_FinancialLog"
	}
};

const IndexPage = () => {
	return (
		<TabPage defTabs={defTabs}>
			<FinancialLog />
		</TabPage>
	);
};

export default IndexPage;
