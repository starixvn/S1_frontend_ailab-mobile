import React from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "@reach/router";
import { isDateRange } from "@ailab-mobile/common";
import { eventTime } from "../components/common/eventTime";
import Layout from "../components/common/layout";
import DragonEgg from "../components/dragonEgg";

const IndexPage = () => {
	const { t } = useTranslation();

	return isDateRange(eventTime.dragonEgg) ? (
		<Layout title={t("lbl_DragonEgg_Title")} mainClass="dragonegg-event">
			<DragonEgg />
		</Layout>
	) : (
		<Redirect to="/" noThrow />
	);
};

export default IndexPage;
