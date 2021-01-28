import React from "react";
import { Redirect } from "@reach/router";
import AngPow from "../components/angPow/angPow";
import { isEventPeriod } from "../components/common/common";

export const eventTime = {
	angPow: { startDate: "2021/02/11 00:00:00", endDate: "2021/02/26 23:59:59" }
};

const IndexPage = () => {
	return isEventPeriod(eventTime.angPow) ? (
		<AngPow />
	) : (
		<Redirect to="/" noThrow />
	);
};

export default IndexPage;
