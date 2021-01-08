import React, { useState } from "react";
import PropTypes from "prop-types";
import { bankSlipPopBoxContext } from "Context";
import TabPage from "../components/common/tabPage";
import path from "../path";
import BankSlip from "../components/deposit/bankSlip";

const defTabs = {
	default: {
		to: `/${path.deposit.root}`,
		displayKey: "lbl_Deposit",
		excludeMath: path.deposit.sub.history.root
	},
	History: {
		to: path.deposit.sub.history.root,
		displayKey: "lbl_DepositHistory"
	}
};

const IndexPage = props => {
	const [bankSlipPopBox, setbankSlipPopBox] = useState({
		isOpen: false
	});

	return (
		<bankSlipPopBoxContext.Provider
			value={{ bankSlipPopBox, setbankSlipPopBox }}>
			<TabPage defTabs={defTabs}>{props.children}</TabPage>
			<BankSlip />
		</bankSlipPopBoxContext.Provider>
	);
};

IndexPage.propTypes = {
	children: PropTypes.node.isRequired
};

export default IndexPage;
