import React, { useContext } from "react";
import TabPage from "../components/common/tabPage";
import path from "../path";
import Layout from "../components/common/layout";
import { i18nContext } from "../components/common/context";

const defTabs = {
	default: {
		to: `/${path.member.root}`,
		displayKey: "lbl_Profile",
		excludeMath: path.member.sub.bankInfo.root
	},
	referral: {
		to: `/${path.referral.root}`,
		displayKey: "lbl_Referral"
	},
	bankInfo: {
		to: path.member.sub.bankInfo.root,
		displayKey: "lbl_BankInfo"
	}
};

const IndexPage = props => {
	const { i18n } = useContext(i18nContext);
	return (
		<Layout title={i18n.lbl_MyAccount}>
			<TabPage defTabs={defTabs}>{props.children}</TabPage>
		</Layout>
	);
};

export default IndexPage;
