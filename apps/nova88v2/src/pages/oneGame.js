import React, { useContext } from "react";
import { Link } from "../route/link";
import OneGame from "../components/oneGame/oneGame";
import { userInfoContext } from "../components/common/context";
import useBeforeLoginCheck from "../components/hook/useBeforeLoginCheck";
import Header from "../components/header/header";
import Layout from "../components/common/layout";

const IndexPage = () => {
	const { userInfo } = useContext(userInfoContext);
	const { canSee } = useBeforeLoginCheck({
		isLogin: userInfo.isLogin,
		langId: userInfo.langId
	});
	const link = (
		<Link to="/">
			<i className="icon icon-keyboard_arrow_left" />
		</Link>
	);
	const header = <Header title="One Game" hideLogo={true} link={link} />;

	return canSee ? (
		<Layout header={header} mainClass="installGuide">
			<OneGame />
		</Layout>
	) : null;
};

export default IndexPage;
