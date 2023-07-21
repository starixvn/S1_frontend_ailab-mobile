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
		to: path.withdrawal.sub.history.root,
		displayKey: "lbl_WithdrawalHistory"
	},
	eWallet: {
		to: path.withdrawal.sub.eWalletWithdrawal.root,
		displayKey: "lbl_EWalletWithdrawal"
	},
	Crypto: {
		to: path.withdrawal.sub.cryptoWithdrawal.root,
		displayKey: "lbl_CryptoWithdrawal"
	}
};

const IndexPage = props => {
	const { i18n } = useContext(i18nContext);
	return (
		<Layout title={i18n.lbl_Withdrawal}>
			<TabPage defTabs={defTabs} multipleExclude={true} showScroll={true}>
				{props.children}
			</TabPage>
		</Layout>
	);
};

export default IndexPage;
