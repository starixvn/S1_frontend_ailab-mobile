import React, { useContext } from "react";
import { Redirect } from "@reach/router";
import Setting from "../components/setting/index";
import { userInfoContext } from "../components/common/context";

const IndexPage = () => {
	// ====== hook ======
	const {
		userInfo: { isLogin }
	} = useContext(userInfoContext);

	// 僅有登入可以查看設定頁面，未登入，導回首頁
	if (isLogin === false) {
		return <Redirect to="/" noThrow />;
	}

	return <Setting />;
};

export default IndexPage;
