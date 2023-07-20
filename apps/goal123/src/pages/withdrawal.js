import React, { useContext } from "react";
import TabPage from "../components/common/tabPage";
import path from "../path";
import Layout from "../components/common/layout";
import { i18nContext } from "../components/common/context";

const defTabs = {
	default: {
		to: `/${path.withdrawal.root}`,
		displayKey: "lbl_Withdrawal",
		excludeMath: path.withdrawal.sub.history.root
	},
	History: {
		to: `/${path.withdrawal.root}/${path.withdrawal.sub.history.root}`,
		displayKey: "lbl_WithdrawalHistory"
	},
	eWallet: {
		to: `/${path.eWalletWithdrawal.root}`,
		displayKey: "lbl_EWalletWithdrawal"
	},
	Crypto: {
		to: `/${path.cryptoWithdrawal.root}`,
		displayKey: "lbl_CryptoWithdrawal"
	}
};

const IndexPage = props => {
	const { i18n } = useContext(i18nContext);
	return (
		<Layout title={i18n.lbl_Withdrawal}>
			<TabPage defTabs={defTabs} showScroll={true}>
				{props.children}
			</TabPage>
		</Layout>
	);
};

export default IndexPage;
