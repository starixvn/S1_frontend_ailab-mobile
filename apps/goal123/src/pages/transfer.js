import React, { useContext } from "react";
import TabPage from "../components/common/tabPage";
import path from "../path";
import Layout from "../components/common/layout";
import { i18nContext } from "../components/common/context";

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
	const { i18n } = useContext(i18nContext);

	return (
		<Layout title={i18n.lbl_Transfer}>
			<TabPage defTabs={defTabs}>{props.children}</TabPage>
		</Layout>
	);
};

export default IndexPage;
