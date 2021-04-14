import React from "react";
import Layout from "../components/common/layout";
import CryptoWallet from "../components/cryptoWallet/cryptoWallet";
import TabPage, { getMainClass } from "../components/common/tabPage";
import { wallet_cryptoWallet as defCryptoWalletTabs } from "../datas/defTabs";

const IndexPage = props => {
	const defTabs = defCryptoWalletTabs;
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
