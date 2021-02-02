import { useEffect, useState } from "react";
import {
	api_events_GetLeaderboardListV2,
	api_events_GetCustRankV2
} from "../../service/api/events";
import { defBtns, defDayBtns } from "./def";

const SetUpdTime = () => {
	const now = new Date();
	const minutes = now.getMinutes() > 30 ? 30 : 0;

	return new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate(),
		now.getHours(),
		minutes,
		0
	);
};

const getTopNum = isLastEvent => {
	const topNum = 20;
	const lastTimeTopNum = 16;
	return isLastEvent ? lastTimeTopNum : topNum;
};

const handleEventCode = isLastEvent => {
	const defEventCode = {
		current: "202101",
		prev: "xmas2020"
	};

	return isLastEvent ? defEventCode.prev : defEventCode.current;
};

export const useGetRanking = ({
	isOpen,
	selected,
	BeforeDays = 0,
	isLogin,
	userName,
	setLoading,
	isLastEvent = false
}) => {
	const [datas, setDatas] = useState([]);
	const [lastUpdTime, setLastUpdTime] = useState(SetUpdTime());

	useEffect(() => {
		if (isOpen && isLogin) {
			const EventCode = handleEventCode(isLastEvent);
			const lBCategoryId = defBtns[selected]?.lBCategoryId;
			const beforeDays = isNaN(BeforeDays)
				? Number(defDayBtns.Yesterday.value)
				: Number(BeforeDays);

			const GetRankingDatas = async () => {
				setLoading(true);
				try {
					const TopNum = getTopNum(isLastEvent);
					const res = await api_events_GetLeaderboardListV2({
						lBCategoryId,
						TopNum,
						BeforeDays: beforeDays,
						EventCode
					});

					if (res.data.errorCode === 0) {
						const rankDatas = res.data.data;
						if (rankDatas?.length > 0) {
							const custRankRes = await api_events_GetCustRankV2({
								LBCategoryId: lBCategoryId,
								BeforeDays: beforeDays,
								EventCode
							});

							if (custRankRes.data.errorCode === 0) {
								const {
									custRank,
									point
								} = custRankRes.data.data;

								setDatas(() => {
									const rank =
										custRank > 999 || custRank === 0
											? "999+"
											: custRank;

									let result = [];
									if (custRank <= TopNum && custRank !== 0) {
										rankDatas[custRank - 1] = {
											...rankDatas[custRank - 1],
											rank
										};
										result = rankDatas;
									} else {
										result = [
											...rankDatas,
											{
												userName,
												wTurnover: point,
												rank
											}
										];
									}

									return result;
								});
							}
						} else {
							setDatas([]);
						}
					}
					setLoading(false);
					setLastUpdTime(SetUpdTime());
				} catch (error) {
					setLoading(false);
				}
			};

			GetRankingDatas();
		}
	}, [
		isOpen,
		selected,
		setDatas,
		BeforeDays,
		isLogin,
		userName,
		setLoading,
		isLastEvent
	]);

	return { datas, lastUpdTime };
};

export const useHandleSelect = ({
	defaultSelect,
	handleLogin,
	isLogin = false
}) => {
	const [selected, setSelected] = useState(defaultSelect);

	useEffect(() => {
		if (isLogin === false) {
			setSelected(defaultSelect);
		}
	}, [defaultSelect, isLogin]);

	const handleSelect = (value, _isLogin, beforeLogin) => {
		if (_isLogin || beforeLogin || !handleLogin) {
			setSelected(value);
		} else {
			handleLogin();
		}
	};

	return { selected, handleSelect };
};

export const useHandleSelectDay = () => {
	const [selectedDay, setSelectedDay] = useState(defDayBtns.Yesterday.value);

	const handleSelectDay = (idx, colName, item) => {
		setSelectedDay(item.value);
	};

	return { selectedDay, handleSelectDay };
};
