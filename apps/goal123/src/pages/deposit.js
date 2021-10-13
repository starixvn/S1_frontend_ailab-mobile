import React, { useState, useContext } from "react";
import TabPage from "../components/common/tabPage";
import path from "../path";
import BankSlip from "../components/deposit/bankSlip";
import {
	bankSlipPopBoxContext,
	i18nContext
} from "../components/common/context";
import Deposit from "../components/deposit/deposit";
import Layout from "../components/common/layout";

const defTabs = {
	default: {
		to: `/${path.deposit.root}`,
		displayKey: "lbl_Deposit",
		excludeMath: path.depositHistory.root
	},
	History: {
		to: `/${path.depositHistory.root}`,
		displayKey: "lbl_DepositHistory"
	}
};

const IndexPage = () => {
	const { i18n } = useContext(i18nContext);
	const [bankSlipPopBox, setbankSlipPopBox] = useState({
		isOpen: false,
		depositTime: null,
		picFileName: "",
		refId: "",
		receipt: null
	});

	return (
		<Layout title={i18n.lbl_Deposit} mainClass="main depositmain">
			<bankSlipPopBoxContext.Provider
				value={{ bankSlipPopBox, setbankSlipPopBox }}>
				<TabPage defTabs={defTabs}>
					<Deposit />
				</TabPage>
				<BankSlip />
			</bankSlipPopBoxContext.Provider>
		</Layout>
	);
};

export default IndexPage;
