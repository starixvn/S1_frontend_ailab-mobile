import React, { useContext } from "react";
import { Redirect } from "@reach/router";
import OneGame from "../components/oneGame/oneGame";
import { userInfoContext } from "../components/common/context";
import useBeforeLoginCheck from "../components/hook/useBeforeLoginCheck";

const IndexPage = () => {
	const { userInfo } = useContext(userInfoContext);
	const { redirectPath } = useBeforeLoginCheck({ isLogin: userInfo.isLogin });

	return redirectPath !== null ? <Redirect to="/" noThrow /> : <OneGame />;
};

export default IndexPage;
