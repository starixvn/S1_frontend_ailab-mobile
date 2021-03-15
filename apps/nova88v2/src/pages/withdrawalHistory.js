import React from "react";
import Layout from "../components/common/layout";
import TabPage, { getMainClass } from "../components/common/tabPage";
import Content from "../components/withdrawal/withdrawal.history";
import { withdrawal as withdrawalTabs } from "../datas/defTabs";
import Filter from "../components/common/historyFilter";
import useGetHistory from "../components/hook/useGetHistory";
import api from "../service/api";

const IndexPage = props => {
	const defTabs = withdrawalTabs;
	const {
		history,
		setHistory,
		pageInfo,
		setPageInfo,
		filterData,
		clickSubmit,
		submitFilter
	} = useGetHistory({
		api: api.payment.GetWithdrawalInfoHistory
	});

	const header = (
		<TabPage
			defTabs={defTabs}
			filter={<Filter submitHandler={submitFilter} />}
		/>
	);

	return (
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
				submitFilter={submitFilter}
			/>
		</Layout>
	);
};

export default IndexPage;
