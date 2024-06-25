import React from "react";
import Leaderboard from "../components/leaderboard";
import { LeaderboardProvider } from "../components/leaderboard/leaderboardContext/Leaderboard-context";

export default () => {
	return (
		<LeaderboardProvider>
			<Leaderboard />
		</LeaderboardProvider>
	);
};
