import React, { useContext } from "react";
import { userInfoContext } from "../components/common/context";
import Layout from "../components/common/layout";
import CryptoWallet from "../components/cryptoWallet/cryptoWallet";
import TabPage, { getMainClass } from "../components/common/tabPage";
import {
	myWallet,
	myWalletWithEWallet,
	myWalletWithoutBankInfo
} from "../datas/defTabs";
import { defCurrenyId } from "../components/common/common";

const allowBankInfoCurrency = [
	defCurrenyId.MYR,
	defCurrenyId.THB,
	defCurrenyId.IDR,
	defCurrenyId.INR
];

const IndexPage = props => {
	const { userInfo } = useContext(userInfoContext);

	let defTabs = myWallet;
	if (
		userInfo.currencyId === defCurrenyId.IDR ||
		userInfo.currencyId === defCurrenyId.MYR
	) {
		defTabs = myWalletWithEWallet;
	} else if (!allowBankInfoCurrency.includes(userInfo.currencyId)) {
		defTabs = myWalletWithoutBankInfo;
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
