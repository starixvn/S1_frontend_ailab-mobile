import React, { useContext } from "react";
import TabPage from "../components/common/tabPage";
import path from "../path";
import FinancialLog from "../components/statement/financialLog";
import Layout from "../components/common/layout";
import { i18nContext } from "../components/common/context";

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
	const { i18n } = useContext(i18nContext);

	return (
		<Layout title={i18n.lbl_FinancialLog}>
			<TabPage defTabs={defTabs}>
				<FinancialLog />
			</TabPage>
		</Layout>
	);
};

export default IndexPage;
