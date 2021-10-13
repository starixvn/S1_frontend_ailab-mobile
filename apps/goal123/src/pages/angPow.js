import React, { useContext } from "react";
import { Redirect } from "@reach/router";
import AngPow from "../components/angPow/angPow";
import { isEventPeriod } from "../components/common/common";
import Layout from "../components/common/layout";
import { i18nContext } from "../components/common/context";

export const eventTime = {
	angPow: { startDate: "2021/02/11 00:00:00", endDate: "2021/02/26 23:59:59" }
};

const IndexPage = () => {
	const { i18n } = useContext(i18nContext);

	return isEventPeriod(eventTime.angPow) ? (
		<Layout title={i18n.lbl_NewYearAngPow} mainClass="main event">
			<AngPow />
		</Layout>
	) : (
		<Redirect to="/" noThrow />
	);
};

export default IndexPage;
