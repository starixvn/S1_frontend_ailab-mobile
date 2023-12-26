import React from "react";
import { Redirect } from "@reach/router";
import { eventTime } from "../components/common/eventTime";
import { isEventPeriod } from "../components/common/common";
import DragonEgg from "../components/dragonEgg";

const IndexPage = () => {
	return isEventPeriod(eventTime.dragonEgg) ? (
		<DragonEgg />
	) : (
		<Redirect to="/" noThrow />
	);
};

export default IndexPage;
