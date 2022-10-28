import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "@reach/router";
import { userInfoContext } from "../components/common/context";
import BankInfo from "../components/profile/bankInfo";
import Layout from "../components/common/layout";
import {
	myWallet,
	myWalletWithEWallet,
	myWalletWithoutBankInfo
} from "../datas/defTabs";
import TabPage, { getMainClass } from "../components/common/tabPage";
import CryptoWallet from "../components/cryptoWallet/cryptoWallet";
import path from "../path";
import { defCurrenyId } from "../components/common/common";

const allowBankInfoCurrency = [
	defCurrenyId.MYR,
	defCurrenyId.THB,
	defCurrenyId.IDR,
	defCurrenyId.INR
];

const IndexPage = props => {
	const navigate = useNavigate();
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

	useEffect(() => {
		if (!allowBankInfoCurrency.includes(userInfo.currencyId)) {
			navigate(`/${userInfo.langId}/${path.cryptoWallet.root}`);
		}
	}, []);

	const header = <TabPage defTabs={defTabs} />;
	const { prevPage } = props?.location?.state;

	return (
		<Layout
			header={header}
			mainClass={getMainClass({
				defTabs,
				location: props
			})}>
			{!allowBankInfoCurrency.includes(userInfo.currencyId) ? (
				<CryptoWallet />
			) : (
				<BankInfo prevPage={prevPage} />
			)}
		</Layout>
	);
};
IndexPage.defaultProps = {
	location: {}
};

IndexPage.propTypes = {
	location: PropTypes.objectOf(PropTypes.any)
};

export default IndexPage;
