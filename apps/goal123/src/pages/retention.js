import React from "react";
import { useTranslation } from "react-i18next";
import Layout from "../components/common/layout";
import RetentionContent from "../components/retention";

const RetentionPage = () => {
	const { t } = useTranslation();

	return (
		<Layout title={t("Label_Retention")} mainClass="retention">
			<RetentionContent />
		</Layout>
	);
};

export default RetentionPage;
