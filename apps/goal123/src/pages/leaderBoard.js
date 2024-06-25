import React, { useContext } from "react";
import Layout from "../components/common/layout";
import LeaderBoard from "../components/leaderBoard/index";
import { i18nContext } from "../components/common/context";

const IndexPage = () => {
	const { i18n } = useContext(i18nContext);

	return (
		<Layout title={i18n.lbl_LeaderBoard} mainClass="leaderboard">
			<LeaderBoard />
		</Layout>
	);
};

export default IndexPage;
