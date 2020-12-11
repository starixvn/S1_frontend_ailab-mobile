import { useEffect, useState } from "react";
import api from "../../service/api";
import { defBtns } from "./def";

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
	BeforeDays = 1,
	isLogin
}) => {
	const [datas, setDatas] = useState([]);
	const [lastUpdTime, setLastUpdTime] = useState(SetUpdTime());

	useEffect(() => {
		if (isOpen && isLogin) {
			const lBCategoryId = defBtns[selected]?.lBCategoryId;
			api.events
				.GetLeaderboardList({
					lBCategoryId,
					TopNum: 10,
					BeforeDays: isNaN(BeforeDays) ? 1 : Number(BeforeDays)
				})
				.then(res => {
					if (res.data.errorCode === 0) {
						setDatas(res.data.data);
						setLastUpdTime(SetUpdTime());
					}
				});
		}
	}, [isOpen, selected, setDatas, BeforeDays, isLogin]);

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
	const [selectedDay, setSelectedDay] = useState("1");

	const handleSelectDay = value => {
		setSelectedDay(value);
	};

	return { selectedDay, handleSelectDay };
};
