import classNames from "classnames";
import React, { useContext } from "react";
import { userInfoContext } from "Context";
import Layout from "../components/common/layout";
import Content from "../components/setting/setting";

const IndexPage = () => {
	const { userInfo } = useContext(userInfoContext);
	const { isLogin } = userInfo;

	return (
		<Layout mainClass={classNames("menu", { after: isLogin })} noHeader>
			<Content />
		</Layout>
	);
};

export default IndexPage;
