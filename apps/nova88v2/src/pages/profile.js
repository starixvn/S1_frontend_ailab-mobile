import React from "react";
import TabPage, { getMainClass } from "../components/common/tabPage";
import Profile from "../components/profile/profile";
import Layout from "../components/common/layout";
import { account_msg } from "../datas/defTabs";

const IndexPage = props => {
	const defTabs = account_msg;
	const header = <TabPage defTabs={defTabs} />;

	return (
		<Layout
			header={header}
			mainClass={getMainClass({
				defTabs,
				location: props
			})}>
			<Profile />
		</Layout>
	);
};

export default IndexPage;
