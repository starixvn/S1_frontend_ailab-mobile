import React, { useContext } from "react";
import Layout from "../components/common/layout";
import TabPage, { getMainClass } from "../components/common/tabPage";
import { myWallet, myWalletWithEWallet } from "../datas/defTabs";
import EWallet from "../components/eWallet/eWallet";
import { userInfoContext } from "../components/common/context";
import allowedCurrencyList from "../datas/allowedCurrencyList";

const IndexPage = props => {
	const { userInfo } = useContext(userInfoContext);

	let defTabs = myWallet;
	if (allowedCurrencyList.eWallet.includes(userInfo.currencyId)) {
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
