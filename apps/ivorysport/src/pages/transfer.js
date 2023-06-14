import React from "react";
import Layout from "../components/common/layout";
import TabPage, { getMainClass } from "../components/common/tabPage";
import Content from "../components/transfer/transfer";
import { transfer as transferTabs } from "../datas/defTabs";

const IndexPage = props => {
	const defTabs = transferTabs;
	const header = <TabPage defTabs={defTabs} />;

	return (
		<Layout
			header={header}
			mainClass={getMainClass({ defTabs, location: props })}>
			<Content />
		</Layout>
	);
};

export default IndexPage;
