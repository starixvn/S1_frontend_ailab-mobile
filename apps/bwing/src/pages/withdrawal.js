import React from "react";
import TabPage from "../components/common/tabPage";
import path from "../path";

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
	CryptoWithdrawal: {
		to: path.withdrawal.sub.cryptoWithdrawal.root,
		displayKey: "lbl_CryptoWithdrawal"
	}
};

const IndexPage = props => {
	return (
		<TabPage defTabs={defTabs} multipleExclude={true} showScroll={true}>
			{props.children}
		</TabPage>
	);
};

export default IndexPage;
