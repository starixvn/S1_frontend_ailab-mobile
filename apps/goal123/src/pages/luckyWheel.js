import React, { useContext } from "react";
import { Redirect } from "@reach/router";
import LuckyWheel from "../components/luckyWheel/luckyWheel";
import { isEventPeriod } from "../components/common/common";
import { eventTime } from "../components/common/eventTime";
import Layout from "../components/common/layout";
import { i18nContext } from "../components/common/context";

const IndexPage = () => {
	const { i18n } = useContext(i18nContext);
	return isEventPeriod(eventTime.luckyWheel) ? (
		<Layout title={i18n.lbl_LuckyWheel} mainClass="main wheelEvent">
			<LuckyWheel />
		</Layout>
	) : (
		<Redirect to="/" noThrow />
	);
};

export default IndexPage;
