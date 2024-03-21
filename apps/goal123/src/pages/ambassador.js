import React, { useContext } from "react";
import SponsorContent from "../components/ambassador/index";
import { i18nContext } from "../components/common/context";

import Layout from "../components/common/layout";

const PageContent = () => {
	return <SponsorContent />;
};

const IndexPage = () => {
	const { i18n } = useContext(i18nContext);

	return (
		<Layout title={i18n.lbl_Ambassador} mainClass="ambassador">
			<PageContent />
		</Layout>
	);
};

export default IndexPage;
