import React, { useContext } from "react";
import PropTypes from "prop-types";
import { userInfoContext, eWalletContext } from "../components/common/context";
import Layout from "../components/common/layout";
import TabPage, { getMainClass } from "../components/common/tabPage";
import WithdrawalEWallet from "../components/withdrawal/withdrawal.EWallet";
import CryptoWithdrawal from "../components/withdrawal/withdrawal.crypto";
import Withdrawal from "../components/withdrawal/withdrawal";
import { withdrawal, withdrawalPart } from "../datas/defTabs";

import { defCurrenyId } from "../components/common/common";

const IndexPage = props => {
	const { userInfo } = useContext(userInfoContext);
	const { isShowEWallet } = useContext(eWalletContext);
	const defTabs =
		userInfo.currencyId === defCurrenyId.IDR ? withdrawal : withdrawalPart;
	const header = <TabPage defTabs={defTabs} />;
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
