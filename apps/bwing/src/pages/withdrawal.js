import React, { useContext } from "react";
import TabPage from "../components/common/tabPage";
import path from "../path";
import { eWalletContext } from "../components/common/context";

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
	CryptoWithdrawal: {
		to: path.withdrawal.sub.cryptoWithdrawal.root,
		displayKey: "lbl_CryptoWithdrawal"
	}
};

const IndexPage = props => {
	const { isShowEWallet } = useContext(eWalletContext);
	const filteredDefTabs = () => {
		if (!isShowEWallet) {
			const { eWallet, ...restTabs } = defTabs;
			return restTabs;
		}

		return defTabs;
	};
	return (
		<TabPage
			defTabs={filteredDefTabs()}
			multipleExclude={true}
			showScroll={true}>
			{props.children}
		</TabPage>
	);
};

export default IndexPage;
