import React, { useContext } from "react";
import { Redirect } from "@reach/router";
import MysteryBox from "../components/mysteryBox/mysterBox";
import { isEventPeriod } from "../components/common/common";
import { eventTime } from "../components/common/eventTime";
import Layout from "../components/common/layout";
import { i18nContext } from "../components/common/context";

const IndexPage = () => {
	const { i18n } = useContext(i18nContext);
	return isEventPeriod(eventTime.mysteryBox) ? (
		<Layout
			title={i18n.lbl_MysteryBox_EventTitle}
			mainClass="main event goldbox">
			<MysteryBox />
		</Layout>
	) : (
		<Redirect to="/" noThrow />
	);
};

export default IndexPage;
