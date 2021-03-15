import React from "react";
import Layout from "../components/common/layout";
import TabPage, { getMainClass } from "../components/common/tabPage";
import ReferralHistory from "../components/referral/referral.history";
import { referral as referralTabs } from "../datas/defTabs";
import Filter from "../components/common/historyFilter";
import useGetHistory from "../components/hook/useGetHistory";
import api from "../service/api";

const IndexPage = props => {
	const defTabs = referralTabs;
	const {
		history,
		setHistory,
		pageInfo,
		setPageInfo,
		filterData,
		clickSubmit,
		submitFilter
	} = useGetHistory({
		api: api.account.GetRefFriendList
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
			<ReferralHistory
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
