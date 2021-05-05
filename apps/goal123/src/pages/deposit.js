import React, { useState } from "react";
import TabPage from "../components/common/tabPage";
import path from "../path";
import BankSlip from "../components/deposit/bankSlip";
import { bankSlipPopBoxContext } from "../components/common/context";
import Deposit from "../components/deposit/deposit";

const defTabs = {
	default: {
		to: `/${path.deposit.root}`,
		displayKey: "lbl_Deposit",
		excludeMath: path.depositHistory.root
	},
	History: {
		to: path.depositHistory.root,
		displayKey: "lbl_DepositHistory"
	}
};

const IndexPage = props => {
	const [bankSlipPopBox, setbankSlipPopBox] = useState({
		isOpen: false,
		depositTime: null,
		picFileName: "",
		refId: "",
		receipt: null
	});

	return (
		<bankSlipPopBoxContext.Provider
			value={{ bankSlipPopBox, setbankSlipPopBox }}>
			{props.children ? (
				<TabPage defTabs={defTabs}>{props.children}</TabPage>
			) : (
				<>
					<Deposit />
					<BankSlip />
				</>
			)}
		</bankSlipPopBoxContext.Provider>
	);
};

export default IndexPage;
