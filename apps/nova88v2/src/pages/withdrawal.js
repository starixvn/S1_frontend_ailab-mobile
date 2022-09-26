import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "@reach/router";
import { userInfoContext, eWalletContext } from "../components/common/context";
import Layout from "../components/common/layout";
import TabPage, { getMainClass } from "../components/common/tabPage";
import WithdrawalEWallet from "../components/withdrawal/withdrawal.EWallet";
import CryptoWithdrawal from "../components/withdrawal/withdrawal.crypto";
import Withdrawal from "../components/withdrawal/withdrawal";
import {
	withdrawal,
	withdrawalWithEWallet,
	withdrawalWithoutBankInfo
} from "../datas/defTabs";
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
	const { isShowEWallet } = useContext(eWalletContext);

	let defTabs = withdrawal;
	if (userInfo.currencyId === defCurrenyId.IDR) {
		defTabs = withdrawalWithEWallet;
	} else if (!allowBankInfoCurrency.includes(userInfo.currencyId)) {
		defTabs = withdrawalWithoutBankInfo;
	}
	const header = <TabPage defTabs={defTabs} />;

	useEffect(() => {
		if (!allowBankInfoCurrency.includes(userInfo.currencyId)) {
			navigate(`/${userInfo.langId}/${path.cryptoWithdrawal.root}`);
		}
	}, []);

	const judgeShowPage = () => {
		if (props.isCrypto) {
			return <CryptoWithdrawal />;
		}
		return props.isEWallet && isShowEWallet ? (
			<WithdrawalEWallet />
		) : (
			<Withdrawal />
		);
	};

	return (
		<Layout
			header={header}
			mainClass={getMainClass({ defTabs, location: props })}>
			{judgeShowPage()}
		</Layout>
	);
};
IndexPage.defaultProps = {
	isCrypto: false,
	isEWallet: false
};

IndexPage.propTypes = {
	isCrypto: PropTypes.bool,
	isEWallet: PropTypes.bool
};

export default IndexPage;
