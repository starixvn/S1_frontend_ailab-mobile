import React from "react";
import { Redirect } from "@reach/router";
import { isDateRange } from "@ailab-mobile/common";
import { eventTime } from "../components/common/eventTime";
import DragonEgg from "../components/dragonEgg";

const IndexPage = () => {
	return isDateRange(eventTime.dragonEgg) ? (
		<DragonEgg />
	) : (
		<Redirect to="/" noThrow />
	);
};

export default IndexPage;
