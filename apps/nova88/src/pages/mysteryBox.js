import React from "react";
import { Redirect } from "@reach/router";
import MysteryBox from "../components/mysteryBox/mysterBox";
import { isEventPeriod } from "../components/common/common";

export const eventTime = {
	mysteryBox: { startDate: "2021/02/23 00:00:00" }
};

const IndexPage = () => {
	return isEventPeriod(eventTime.mysteryBox) ? (
		<MysteryBox />
	) : (
		<Redirect to="/" noThrow />
	);
};

export default IndexPage;
