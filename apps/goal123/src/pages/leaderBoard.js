import React from "react";
import Layout from "../components/common/layout";
import LeaderBoard from "../components/leaderBoard/index";

const IndexPage = () => {
	return (
		<Layout title="LeaderBoard" mainClass="leaderboard">
			<LeaderBoard />
		</Layout>
	);
};

export default IndexPage;
