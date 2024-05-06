import { useState, useEffect } from "react";
import { api_events_GetLeaderboardList } from "apps/goal123/src/service/api/events";
import { leaderboardId } from "../../../datas/leaderboardId";

// api used in this file : api/Events/GetLeaderboardList

const useTopWinnerList = () => {
	const [winnerList, setWinnerList] = useState([]);
	const [sportTopWinner, setSportTopWinner] = useState([]);
	const [slotTopWinner, setSlotTopWinner] = useState([]);
	const [liveCasinoTopWinner, setLiveCasinoTopWinner] = useState([]);

	useEffect(() => {
		const payload = {
			TopNum: 10,
			BeforeDays: 0,
			lBCategoryId: 0
		};

		// 因為目前lBCategoryId一次只能傳一個 所以要分開呼叫四次
		// 其中參數1,2,3只會拿resData內的第一筆資料取第一名做渲染

		const getTopWinners = async () => {
			const responses = await Promise.all([
				api_events_GetLeaderboardList({
					...payload,
					lBCategoryId: leaderboardId.Top10
				}),
				api_events_GetLeaderboardList({
					...payload,
					lBCategoryId: leaderboardId.Sports
				}),
				api_events_GetLeaderboardList({
					...payload,
					lBCategoryId: leaderboardId.Slots
				}),
				api_events_GetLeaderboardList({
					...payload,
					lBCategoryId: leaderboardId.LiveCasino
				})
			]);

			responses.forEach((res, index) => {
				if (res.data.errorCode === 0) {
					switch (index) {
						case 0:
							setWinnerList(res.data.data);
							break;
						case 1:
							setSportTopWinner(res.data.data);
							break;
						case 2:
							setSlotTopWinner(res.data.data);
							break;
						case 3:
							setLiveCasinoTopWinner(res.data.data);
							break;
						default:
							break;
					}
				}
			});
		};

		getTopWinners();
	}, []);

	return { winnerList, sportTopWinner, slotTopWinner, liveCasinoTopWinner };
};

export default useTopWinnerList;
