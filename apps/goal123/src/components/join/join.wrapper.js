import React, { useContext } from "react";
import { GReCaptchaProviders } from "@ailab-mobile/common";
import { userInfoContext } from "../common/context";
import Join from "./join.refactor";

const JoinWrapper = () => {
	const { userInfo } = useContext(userInfoContext);

	return (
		<GReCaptchaProviders langId={userInfo?.langId}>
			<Join />
			<div id="g-reCaptcha" />
		</GReCaptchaProviders>
	);
};

export default JoinWrapper;
