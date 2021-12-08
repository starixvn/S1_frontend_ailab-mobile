import React from "react";
import { Redirect } from "@reach/router";
import LuckyWheel from "../components/luckyWheel/luckyWheel";
import { isEventPeriod } from "../components/common/common";
import { eventTime } from "../components/common/eventTime";

const IndexPage = () => {
	return isEventPeriod(eventTime.luckyWheel) ? (
		<LuckyWheel />
	) : (
		<Redirect to="/" noThrow />
	);
};

export default IndexPage;
