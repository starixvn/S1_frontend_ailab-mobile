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
import allowedCurrencyList from "../datas/allowedCurrencyList";

const IndexPage = props => {
	const navigate = useNavigate();
	const { userInfo } = useContext(userInfoContext);

	let defTabs = myWallet;
	if (allowedCurrencyList.eWallet.includes(userInfo.currencyId)) {
		defTabs = myWalletWithEWallet;
	} else if (!allowedCurrencyList.bankCard.includes(userInfo.currencyId)) {
		defTabs = myWalletWithoutBankInfo;
	}

	useEffect(() => {
		if (!allowedCurrencyList.bankCard.includes(userInfo.currencyId)) {
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
			{!allowedCurrencyList.bankCard.includes(userInfo.currencyId) ? (
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
