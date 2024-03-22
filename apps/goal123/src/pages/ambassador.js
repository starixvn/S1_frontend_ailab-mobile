import React, { useContext } from "react";
import AmbassadorContent from "../components/ambassador/index";
import { i18nContext } from "../components/common/context";

import Layout from "../components/common/layout";

const Ambassador = () => {
	const { i18n } = useContext(i18nContext);

	return (
		<Layout title={i18n.lbl_Ambassador} mainClass="ambassador">
			<AmbassadorContent />
		</Layout>
	);
};

export default Ambassador;
