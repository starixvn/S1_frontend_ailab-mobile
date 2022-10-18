import React, { useContext } from "react";
import Layout from "../components/common/layout";
import TabPage, { getMainClass } from "../components/common/tabPage";
import { myWallet, myWalletWithEWallet } from "../datas/defTabs";
import EWallet from "../components/eWallet/eWallet";
import { userInfoContext } from "../components/common/context";
import { defCurrenyId } from "../components/common/common";

const IndexPage = props => {
	const { userInfo } = useContext(userInfoContext);

	let defTabs = myWallet;
	if (
		userInfo.currencyId === defCurrenyId.IDR ||
		userInfo.currencyId === defCurrenyId.MYR
	) {
		defTabs = myWalletWithEWallet;
	}

	const header = <TabPage defTabs={defTabs} />;

	return (
		<Layout
			header={header}
			mainClass={getMainClass({ defTabs, location: props })}>
			<EWallet />
		</Layout>
	);
};

export default IndexPage;
