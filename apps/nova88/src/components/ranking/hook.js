import { useEffect, useState } from "react";
import api from "../../service/api";
import { defBtns, defDayBtns } from "./def";

const SetUpdTime = () => {
	const now = new Date();
	const minutes = now.getMinutes() > 30 ? 30 : 0;

	return new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDay(),
		now.getHours(),
		minutes,
		0
	);
};

export const useGetRanking = ({
	isOpen,
	selected,
	BeforeDays = defDayBtns.Yesterday,
	isLogin,
	userName
}) => {
	const [datas, setDatas] = useState([]);
	const [lastUpdTime, setLastUpdTime] = useState(SetUpdTime());

	useEffect(() => {
		if (isOpen && isLogin) {
			const lBCategoryId = defBtns[selected]?.lBCategoryId;
			const beforeDays = isNaN(BeforeDays)
				? Number(defDayBtns.Yesterday)
				: Number(BeforeDays);
			api.events
				.GetLeaderboardList({
					lBCategoryId,
					TopNum: 10,
					BeforeDays: beforeDays
				})
				.then(res => {
					if (res.data.errorCode === 0) {
						setDatas(res.data.data);
						setLastUpdTime(SetUpdTime());
					}
				});

			api.events
				.GetCustRank({
					LBCategoryId: lBCategoryId,
					BeforeDays: beforeDays
				})
				.then(res => {
					if (res.data.errorCode === 0) {
						const { custRank, point } = res.data.data;
						if (custRank > 10) {
							setDatas(prev => [
								...prev,
								{
									userName,
									wTurnover: point,
									rank: custRank > 999 ? "999+" : custRank
								}
							]);
						}
					}
				});
		}
	}, [isOpen, selected, setDatas, BeforeDays, isLogin, userName]);

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

	const handleSelect = (value, isLogin, beforeLogin) => {
		if (isLogin || beforeLogin || !handleLogin) {
			setSelected(value);
		} else {
			handleLogin();
		}
	};

	return { selected, handleSelect };
};

export const useHandleSelectDay = () => {
	const [selectedDay, setSelectedDay] = useState(defDayBtns.Yesterday.value);

	const handleSelectDay = value => {
		setSelectedDay(value);
	};

	return { selectedDay, handleSelectDay };
};
