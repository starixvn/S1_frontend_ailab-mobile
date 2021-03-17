import React, { useContext } from "react";
import OneGame from "../components/oneGame/oneGame";
import { userInfoContext } from "../components/common/context";
import useBeforeLoginCheck from "../components/hook/useBeforeLoginCheck";
import Header from "../components/header/header";

const IndexPage = () => {
	const { userInfo } = useContext(userInfoContext);
	const { canSee } = useBeforeLoginCheck({
		isLogin: userInfo.isLogin,
		langId: userInfo.langId
	});

	return canSee ? (
		<>
			<Header title="One Game" hideLogo={true} link="/" />
			<main className="installGuide">
				<OneGame />
			</main>
		</>
	) : null;
};

export default IndexPage;
