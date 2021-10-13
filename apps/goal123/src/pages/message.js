import React, { useContext } from "react";
import TabPage from "../components/common/tabPage";
import path from "../path";
import Layout from "../components/common/layout";
import { i18nContext } from "../components/common/context";

const defTabs = {
	default: {
		to: `/${path.message.root}`,
		displayKey: "lbl_PersonalMsg"
	},
	announcement: {
		to: `/${path.announcement.root}`,
		displayKey: "lbl_Announcement"
	}
};

const IndexPage = props => {
	const { i18n } = useContext(i18nContext);
	return (
		<Layout title={i18n.lbl_Message} mainClass="main Message">
			<TabPage defTabs={defTabs}>{props.children}</TabPage>
		</Layout>
	);
};

export default IndexPage;
