import React from "react";
import Header from "../components/header/header";
import Layout from "../components/common/layout";
import Content from "../components/setting/setting";

const IndexPage = () => {
	return (
		<Layout
			header={<Header title="More" hideLogo={true} />}
			mainClass="more">
			<Content />
		</Layout>
	);
};

export default IndexPage;
