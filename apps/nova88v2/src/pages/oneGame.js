import React, { useContext } from "react";
import OneGame from "../components/oneGame/oneGame";
import { userInfoContext } from "../components/common/context";
import useBeforeLoginCheck from "../components/hook/useBeforeLoginCheck";

const IndexPage = () => {
	const { userInfo } = useContext(userInfoContext);
	const { canSee } = useBeforeLoginCheck({
		isLogin: userInfo.isLogin,
		langId: userInfo.langId
	});

	return canSee ? <OneGame /> : null;
};

export default IndexPage;
