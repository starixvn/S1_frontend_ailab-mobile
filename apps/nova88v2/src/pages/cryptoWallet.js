import React, { useContext } from "react";
import Layout from "../components/common/layout";
import CryptoWallet from "../components/cryptoWallet/cryptoWallet";
import TabPage, { getMainClass } from "../components/common/tabPage";
import { myWallet, myWalletPart } from "../datas/defTabs";
import { userInfoContext } from "../components/common/context";
import { defCurrenyId } from "../components/common/common";

const IndexPage = props => {
	const { userInfo } = useContext(userInfoContext);
	const defTabs =
		userInfo.currencyId === defCurrenyId.IDR ? myWallet : myWalletPart;
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
