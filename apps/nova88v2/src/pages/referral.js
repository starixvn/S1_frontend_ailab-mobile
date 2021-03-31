import React from "react";
import Layout from "../components/common/layout";
import TabPage, { getMainClass } from "../components/common/tabPage";
import { referral as referralTabs } from "../datas/defTabs";
import Referral from "../components/referral/referFriends";

const IndexPage = props => {
	const defTabs = referralTabs;
	const header = <TabPage defTabs={defTabs} />;

	return (
		<Layout
			header={header}
			mainClass={getMainClass({ defTabs, location: props })}>
			<Referral />
		</Layout>
	);
};

export default IndexPage;
