import React, { useContext } from "react";
import { Link } from "../route/link";
import OneGame from "../components/oneGame/oneGame";
import { userInfoContext, i18nContext } from "../components/common/context";
import useBeforeLoginCheck from "../components/hook/useBeforeLoginCheck";
import Header from "../components/header/header";

const IndexPage = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { canSee } = useBeforeLoginCheck({
		isLogin: userInfo.isLogin,
		langId: userInfo.langId
	});
	const link = (
		<Link to="/">
			<i className="icon icon icon-icon32px_1" />
			{i18n.lbl_Back}
		</Link>
	);

	return canSee ? (
		<>
			<Header title="One Game" hideLogo={true} link={link} />
			<main className="installGuide">
				<OneGame />
			</main>
		</>
	) : null;
};

export default IndexPage;
