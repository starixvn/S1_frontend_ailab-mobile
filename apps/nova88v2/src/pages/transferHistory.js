import React from "react";
import Layout from "../components/common/layout";
import TabPage, { getMainClass } from "../components/common/tabPage";
import Content from "../components/transfer/transfer.history";
import { transfer as transferTabs } from "../datas/defTabs";
import Filter from "../components/common/historyFilter";
import useGetHistory from "../components/hook/useGetHistory";
import api from "../service/api";

const IndexPage = props => {
	const defTabs = transferTabs;
	const {
		history,
		setHistory,
		pageInfo,
		setPageInfo,
		filterData,
		clickSubmit,
		submitFilter
	} = useGetHistory({
		api: api.tp.GetTransferHistory
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
			/>
		</Layout>
	);
};

export default IndexPage;
