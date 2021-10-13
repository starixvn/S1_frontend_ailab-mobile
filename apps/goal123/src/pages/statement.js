import React, { useContext } from "react";
import TabPage from "../components/common/tabPage";
import path from "../path";
import Layout from "../components/common/layout";
import { i18nContext } from "../components/common/context";

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
	const { i18n } = useContext(i18nContext);

	return (
		<Layout title={i18n.lbl_Statement} mainClass="main statementPage">
			<TabPage defTabs={defTabs}>{props.children}</TabPage>
		</Layout>
	);
};

export default IndexPage;
