import React, { useState } from "react";
import Layout from "../components/common/layout";
import { bankSlipPopBoxContext } from "../components/common/context";
import TabPage, { getMainClass } from "../components/common/tabPage";
import Content from "../components/deposit/deposit.history";
import { deposit as depositTabs } from "../datas/defTabs";
import Filter from "../components/common/historyFilter";
import useGetHistory from "../components/hook/useGetHistory";
import api from "../service/api";
import BankSlip from "../components/deposit/bankSlip";

const IndexPage = props => {
	const defTabs = depositTabs;
	const [bankSlipPopBox, setbankSlipPopBox] = useState({
		isOpen: false
	});
	const {
		history,
		setHistory,
		pageInfo,
		setPageInfo,
		filterData,
		clickSubmit,
		submitFilter
	} = useGetHistory({
		api: api.payment.GetDepositInfoHistory
	});

	const header = (
		<TabPage
			defTabs={defTabs}
			filter={<Filter submitHandler={submitFilter} />}
		/>
	);

	return (
		<bankSlipPopBoxContext.Provider
			value={{ bankSlipPopBox, setbankSlipPopBox }}>
			<Layout
				header={header}
				mainClass={getMainClass({ defTabs, location: props })}>
				<Content
					history={history}
					setHistory={setHistory}
					pageInfo={pageInfo}
					setPageInfo={setPageInfo}
					filterData={filterData}
					clickSubmit={clickSubmit}
				/>
			</Layout>
			<BankSlip />
		</bankSlipPopBoxContext.Provider>
	);
};

export default IndexPage;
