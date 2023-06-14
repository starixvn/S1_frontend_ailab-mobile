import React, { useState } from "react";
import Layout from "../components/common/layout";
import { bankSlipPopBoxContext } from "../components/common/context";
import TabPage, { getMainClass } from "../components/common/tabPage";
import Content from "../components/deposit/deposit";
import BankSlip from "../components/deposit/bankSlip";
import { deposit as depositTabs } from "../datas/defTabs";

const IndexPage = props => {
	const defTabs = depositTabs;
	const header = <TabPage defTabs={defTabs} />;
	const [bankSlipPopBox, setbankSlipPopBox] = useState({
		isOpen: false
	});

	return (
		<bankSlipPopBoxContext.Provider
			value={{ bankSlipPopBox, setbankSlipPopBox }}>
			<Layout
				header={header}
				mainClass={`${getMainClass({
					defTabs,
					location: props
				})} deposit`}>
				<Content />
			</Layout>
			<BankSlip />
		</bankSlipPopBoxContext.Provider>
	);
};

export default IndexPage;
