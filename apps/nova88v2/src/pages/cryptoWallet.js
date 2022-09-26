import React, { useContext } from "react";
import { userInfoContext } from "../components/common/context";
import Layout from "../components/common/layout";
import CryptoWallet from "../components/cryptoWallet/cryptoWallet";
import TabPage, { getMainClass } from "../components/common/tabPage";
import { myWallet, myWalletIDR, myWalletUSD } from "../datas/defTabs";

import { defCurrenyId } from "../components/common/common";

const IndexPage = props => {
	const { userInfo } = useContext(userInfoContext);

	let defTabs = myWallet;
	if (userInfo.currencyId === defCurrenyId.IDR) {
		defTabs = myWalletIDR;
	} else if (userInfo.currencyId === defCurrenyId.USD) {
		defTabs = myWalletUSD;
	}
	const header = <TabPage defTabs={defTabs} />;

	return (
		<Layout
			header={header}
			mainClass={getMainClass({ defTabs, location: props })}>
			<CryptoWallet />
		</Layout>
	);
};

export default IndexPage;
