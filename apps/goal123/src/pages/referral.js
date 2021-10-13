import React, { useContext } from "react";
import PropTypes from "prop-types";
import TabPage from "../components/common/tabPage";
import path from "../path";
import Layout from "../components/common/layout";
import { i18nContext } from "../components/common/context";

const defTabs = {
	default: {
		to: `/${path.referral.root}`,
		displayKey: "lbl_ReferFriends",
		excludeMath: path.referral.sub.history.root
	},
	History: {
		to: path.referral.sub.history.root,
		displayKey: "lbl_ReferralHistory"
	}
};

const IndexPage = props => {
	const { i18n } = useContext(i18nContext);

	return (
		<Layout title={i18n.lbl_friendReferral}>
			<TabPage defTabs={defTabs}>{props.children}</TabPage>
		</Layout>
	);
};

IndexPage.propTypes = {
	children: PropTypes.node.isRequired
};

export default IndexPage;
