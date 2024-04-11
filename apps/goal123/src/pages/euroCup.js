import React from "react";
import Layout from "../components/common/layout";
import EuroCup from "../components/euroCup/euroCup";

const IndexPage = () => {
	return (
		<Layout mainClass="euro" noHeader>
			<EuroCup />
		</Layout>
	);
};

export default IndexPage;
