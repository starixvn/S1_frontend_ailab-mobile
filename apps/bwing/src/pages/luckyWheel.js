import React from "react";
import { Redirect } from "@reach/router";
import { isDateRange } from "@ailab-mobile/common";
import LuckyWheel from "../components/luckyWheel/luckyWheel";
import { eventTime } from "../components/common/eventTime";

const IndexPage = () => {
	return isDateRange(eventTime.luckyWheel) ? (
		<LuckyWheel />
	) : (
		<Redirect to="/" noThrow />
	);
};

export default IndexPage;
