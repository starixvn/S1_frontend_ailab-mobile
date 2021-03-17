import React, { useContext } from "react";
import Kiss918 from "../components/918kiss/918kiss";
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
			<Header title="918 Kiss" hideLogo={true} link="/" />
			<main className="installGuide">
				<Kiss918 />
			</main>
		</>
	) : null;
};

export default IndexPage;
