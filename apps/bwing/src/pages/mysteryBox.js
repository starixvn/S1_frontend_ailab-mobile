import React from "react";
import { Redirect } from "@reach/router";
import MysteryBox from "../components/mysteryBox/mysterBox";
import { isEventPeriod } from "../components/common/common";
import { eventTime } from "../components/common/eventTime";

const IndexPage = () => {
	return isEventPeriod(eventTime.mysteryBox) ? (
		<MysteryBox />
	) : (
		<Redirect to="/" noThrow />
	);
};

export default IndexPage;
