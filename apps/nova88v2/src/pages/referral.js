import React from "react";
import Layout from "../components/common/layout";
import TabPage, { getMainClass } from "../components/common/tabPage";
import { referral as referralTabs } from "../datas/defTabs";
import Referral from "../components/referral/referral";
import ReferralWrapper from "../components/referral/referral.wrapper";

const IndexPage = props => {
	const defTabs = referralTabs;
	const header = <TabPage defTabs={defTabs} />;

	return (
		<ReferralWrapper>
			<Layout
				header={header}
				mainClass={getMainClass({ defTabs, location: props })}>
				<Referral />
			</Layout>
		</ReferralWrapper>
	);
};

export default IndexPage;
