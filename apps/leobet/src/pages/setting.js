import React, { useContext } from "react";
import Header from "../components/header/header";
import Layout from "../components/common/layout";
import Content from "../components/setting/setting";
import { i18nContext } from "../components/common/context";

const IndexPage = () => {
	const { i18n } = useContext(i18nContext);
	return (
		<Layout
			header={<Header title={i18n.lbl_More} hideLogo={true} />}
			mainClass="more">
			<Content />
		</Layout>
	);
};

export default IndexPage;
