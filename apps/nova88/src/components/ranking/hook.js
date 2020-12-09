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

export const useGetRanking = ({ isOpen, selected, BeforeDays = 1 }) => {
	const [datas, setDatas] = useState([]);
	const [lastUpdTime, setLastUpdTime] = useState(SetUpdTime());

	useEffect(() => {
		if (isOpen) {
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
	}, [isOpen, selected, setDatas, BeforeDays]);

	return { datas, lastUpdTime };
};

export const useHandleSelect = ({ defaultSelect }) => {
	const [selected, setSelected] = useState(defaultSelect);

	const handleSelect = e => {
		setSelected(e.target.value);
	};

	return { selected, handleSelect };
};

export const useHandleSelectDay = () => {
	const [selectedDay, setSelectedDay] = useState("1");

	const handleSelectDay = e => {
		setSelectedDay(e.target.value);
	};

	return { selectedDay, handleSelectDay };
};
