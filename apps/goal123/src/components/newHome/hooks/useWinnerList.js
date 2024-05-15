import { useState, useEffect } from "react";
import { api_events_GetLeaderboardList } from "apps/goal123/src/service/api/events";
import { leaderboardId } from "../../../datas/leaderboardId";

// api used in this file : api/Events/GetLeaderboardList

const useTopWinnerList = () => {
	const [winnerList, setWinnerList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchTopWinners = async () => {
			setIsLoading(true);
			try {
				const response = await api_events_GetLeaderboardList({
					lBCategoryId: leaderboardId.Top10,
					TopNum: 10,
					BeforeDays: 0
				});
				setWinnerList(response.data.data);
			} catch (err) {
				setError(err);
			}
			setIsLoading(false);
		};
		fetchTopWinners();
	}, []);

	return { winnerList, isLoading, error };
};

export default useTopWinnerList;
