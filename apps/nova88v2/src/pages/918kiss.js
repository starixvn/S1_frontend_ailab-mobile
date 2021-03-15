import React, { useContext } from "react";
import Kiss918 from "../components/918kiss/918kiss";
import { userInfoContext } from "../components/common/context";
import useBeforeLoginCheck from "../components/hook/useBeforeLoginCheck";

const IndexPage = () => {
	const { userInfo } = useContext(userInfoContext);
	const { canSee } = useBeforeLoginCheck({
		isLogin: userInfo.isLogin,
		langId: userInfo.langId
	});

	return canSee ? <Kiss918 /> : null;
};

export default IndexPage;
