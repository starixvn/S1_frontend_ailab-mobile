import React, { useContext } from "react";
import Layout from "../components/common/layout";
import { i18nContext } from "../components/common/context";
import Survey from "../components/survey";

const Page = () => {
	const { i18n } = useContext(i18nContext);
	return (
		<Layout title={i18n.lbl_Survey} mainClass="survey">
			<Survey />
		</Layout>
	);
};

export default Page;
