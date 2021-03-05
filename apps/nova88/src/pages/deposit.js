import React, { useState } from "react";
import PropTypes from "prop-types";
import { bankSlipPopBoxContext } from "Context";
import TabPage from "../components/common/tabPage";
import path from "../path";
import BankSlip from "../components/deposit/bankSlip";
import Deposit from "../components/deposit/deposit.all";

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
			<TabPage defTabs={defTabs}>{props.children ?? <Deposit />}</TabPage>
			<BankSlip />
		</bankSlipPopBoxContext.Provider>
	);
};

IndexPage.propTypes = {
	children: PropTypes.node.isRequired
};

export default IndexPage;
