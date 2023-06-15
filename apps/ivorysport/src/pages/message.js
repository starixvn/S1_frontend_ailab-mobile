import React, { useContext } from "react";
import { msgCountContext } from "../components/common/context";
import Layout from "../components/common/layout";
import TabPage, { getMainClass } from "../components/common/tabPage";
import Content from "../components/message/personalMsg";
import { account_msg } from "../datas/defTabs";

const IndexPage = props => {
	const { msgCount } = useContext(msgCountContext);
	const defTabs = account_msg;
	const header = <TabPage defTabs={defTabs} tabHint={msgCount} />;

	return (
		<Layout
			header={header}
			mainClass={getMainClass({
				defTabs,
				location: props
			})}>
			<Content />
		</Layout>
	);
};

export default IndexPage;
