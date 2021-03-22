import React from "react";
import BankInfo from "../components/profile/bankInfo";
import Layout from "../components/common/layout";
import { wallet_bankInfo as bankInfoTabs } from "../datas/defTabs";
import TabPage, { getMainClass } from "../components/common/tabPage";

const IndexPage = props => {
	const defTabs = bankInfoTabs;
	const header = <TabPage defTabs={defTabs} />;
	return (
		<Layout
			header={header}
			mainClass={getMainClass({ defTabs, location: props })}>
			<BankInfo />
		</Layout>
	);
};

export default IndexPage;
