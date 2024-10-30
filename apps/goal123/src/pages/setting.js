import React, { useContext } from "react";
import { Redirect } from "@reach/router";
import Layout from "../components/common/layout";
import Setting from "../components/setting/index";
import { i18nContext, userInfoContext } from "../components/common/context";

const IndexPage = () => {
	// ====== hook ======
	const { i18n } = useContext(i18nContext);
	const {
		userInfo: { isLogin }
	} = useContext(userInfoContext);

	// 僅有登入可以查看設定頁面，未登入，導回首頁
	if (isLogin === false) {
		return <Redirect to="/" noThrow />;
	}

	return (
		<Layout title={i18n.lbl_Setting} mainClass="setting main">
			<Setting />
		</Layout>
	);
};

export default IndexPage;
