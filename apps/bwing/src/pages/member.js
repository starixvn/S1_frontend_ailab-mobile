import React from "react";
import TabPage from "../components/common/tabPage";
import path from "../path";

const defTabs = {
	default: {
		to: `/${path.member.root}`,
		displayKey: "lbl_Profile",
		excludeMath: path.member.sub.bankInfo.root
	},
	referral: {
		to: `/${path.referral.root}`,
		displayKey: "lbl_Referral"
	},
	bankInfo: {
		to: path.member.sub.bankInfo.root,
		displayKey: "lbl_BankInfo"
	},
	cryptoWallet: {
		to: path.member.sub.cryptoWallet.root,
		displayKey: "lbl_CryptoWallet"
	}
};

const IndexPage = props => {
	return (
		<TabPage defTabs={defTabs} showScroll={true} multipleExclude={true}>
			{props.children}
		</TabPage>
	);
};

export default IndexPage;
