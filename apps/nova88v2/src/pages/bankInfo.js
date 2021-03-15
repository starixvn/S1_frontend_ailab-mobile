import React from "react";
import BankInfo from "../components/profile/bankInfo";
import Layout from "../components/common/layout";
import path from "../path";
import TabPage from "../components/common/tabPage";

const defTabs = {
	myWallet: {
		to: `${path.wallet.root}`,
		displayKey: "lbl_MyWallet"
	},
	bankInfo: {
		to: path.bankInfo.root,
		displayKey: "lbl_BankInfo"
	}
};

const IndexPage = () => {
	const header = <TabPage defTabs={defTabs} />;
	return (
		<Layout header={header}>
			<BankInfo />
		</Layout>
	);
};

export default IndexPage;
