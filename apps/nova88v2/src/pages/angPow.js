import React, { useContext } from "react";
import { useNavigate } from "@reach/router";
import { userInfoContext } from "../components/common/context";
import AngPow from "../components/angPow/angPow";
import { isEventPeriod } from "../components/common/common";

export const eventTime = {
	angPow: { startDate: "2021/02/11 00:00:00", endDate: "2021/02/26 23:59:59" }
};

const IndexPage = () => {
	const navigate = useNavigate();
	const { userInfo } = useContext(userInfoContext);

	if (!isEventPeriod(eventTime.angPow)) navigate(`/${userInfo.langId}`);

	return <AngPow />;
};

export default IndexPage;
