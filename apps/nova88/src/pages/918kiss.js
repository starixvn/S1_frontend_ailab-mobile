import React, { useContext } from "react";
import { Redirect } from "@reach/router";
import Kiss918 from "../components/918kiss/918kiss";
import { userInfoContext } from "../components/common/context";
import useBeforeLoginCheck from "../components/hook/useBeforeLoginCheck";

const IndexPage = () => {
	const { userInfo } = useContext(userInfoContext);
	const { redirectPath } = useBeforeLoginCheck({ isLogin: userInfo.isLogin });

	return redirectPath !== null ? <Redirect to="/" noThrow /> : <Kiss918 />;
};

export default IndexPage;
