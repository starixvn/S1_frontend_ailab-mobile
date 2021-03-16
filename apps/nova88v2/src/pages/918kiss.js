import React, { useContext } from "react";
import Kiss918 from "../components/918kiss/918kiss";
import { userInfoContext } from "../components/common/context";
import useBeforeLoginCheck from "../components/hook/useBeforeLoginCheck";
import Layout from "../components/common/layout";
import TabPage from "../components/common/tabPage";

const IndexPage = () => {
	const { userInfo } = useContext(userInfoContext);
	const { canSee } = useBeforeLoginCheck({
		isLogin: userInfo.isLogin,
		langId: userInfo.langId
	});

	const headerTitle = { displayText: "918Kiss", link: "/" };
	const header = <TabPage title={headerTitle} />;

	return canSee ? (
		<Layout header={header} mainClass="installGuide">
			<Kiss918 />
		</Layout>
	) : null;
};

export default IndexPage;
