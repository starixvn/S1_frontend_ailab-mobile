import { useState, useEffect, useContext, useRef } from "react";
import { api_events_GetLeaderboardList } from "apps/goal123/src/service/api/events";
import { userInfoContext } from "../../common/context";

// api used in this file : api/Events/GetLeaderboardList

const useTopWinnerList = () => {
	const [winnerList, setWinnerList] = useState([]);
	const { userInfo } = useContext(userInfoContext);
	const isMountedRef = useRef(false);

	useEffect(() => {
		isMountedRef.current = true;

		const getTopWinners = async () => {
			const payload = {
				lBCategoryId: 0,
				TopNum: 10,
				BeforeDays: 0,
				EventCode: "202104"
			};

			try {
				const res = await api_events_GetLeaderboardList(payload);
				if (isMountedRef.current && res.data.errorCode === 0) {
					setWinnerList(res.data.data);
				}
			} catch (error) {
				if (isMountedRef.current) {
					console.error(error);
				}
			}
		};

		getTopWinners();

		return () => {
			isMountedRef.current = false;
		};
	}, [userInfo]);

	return winnerList;
};

export default useTopWinnerList;
