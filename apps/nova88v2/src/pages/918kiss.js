import React, { useContext } from "react";
import Kiss918 from "../components/918kiss/918kiss";
import { userInfoContext, i18nContext } from "../components/common/context";
import useBeforeLoginCheck from "../components/hook/useBeforeLoginCheck";
import Header from "../components/header/header";

const IndexPage = () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { canSee } = useBeforeLoginCheck({
		isLogin: userInfo.isLogin,
		langId: userInfo.langId
	});
	const link = (
		<a href="/">
			<i className="icon icon icon-icon32px_1" />
			{i18n.lbl_Back}
		</a>
	);

	return canSee ? (
		<>
			<Header title="918 Kiss" hideLogo={true} link={link} />
			<main className="installGuide">
				<Kiss918 />
			</main>
		</>
	) : null;
};

export default IndexPage;
