import { useEffect, useState, useContext } from "react";
import moment from "moment";
import api from "../../service/api";
import { defDayBtns, defBtnsOfCategory } from "./def";
import { popBoxContext, i18nContext } from "../common/context";

const SetUpdTime = () => {
	const now = moment();
	const startOfHour = moment().startOf("hour");

	let _displaytime = startOfHour;
	if (now.subtract(30, "minute") > startOfHour) {
		_displaytime = startOfHour.add(30, "minute");
	}

	return _displaytime;
};

const handleEventCode = ({ isMonth = false }) => {
	const defEventCode = {
		current: "2021051",
		month: "2021052",
		prev: "xmas2020"
	};

	return isMonth ? defEventCode.month : defEventCode.current;
};

export const useGetRankWithStatus = ({
	isOpen,
	selected,
	BeforeDays = 0,
	isLogin,
	userName,
	setLoading,
	customTopNum = 0
}) => {
	const { setPopBox } = useContext(popBoxContext);
	const { i18n } = useContext(i18nContext);
	const [datas, setDatas] = useState([]);
	const [lastUpdTime, setLastUpdTime] = useState(SetUpdTime());

	useEffect(() => {
		if (isOpen && isLogin) {
			const EventCode = handleEventCode({ selected });
			const lBCategoryId = defBtnsOfCategory[selected]?.lBCategoryId || 0;
			const beforeDays = isNaN(BeforeDays)
				? Number(defDayBtns.Yesterday.value)
				: Number(BeforeDays);
			const GetRankingDatas = async () => {
				setLoading(true);

				try {
					const TopNum = customTopNum;
					const res = await api.events.GetLeaderboardListV3({
						lBCategoryId,
						TopNum,
						BeforeDays: beforeDays,
						EventCode
					});

					if (res.data.errorCode === 0) {
						const rankDatas = res.data.data;
						if (rankDatas?.length > 0) {
							const custRankRes = await api.events.GetCustRankV2({
								LBCategoryId: lBCategoryId,
								BeforeDays: beforeDays,
								EventCode
							});

							if (custRankRes.data.errorCode === 0) {
								const {
									custRank,
									point,
									status
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
											rank,
											status
										};
										result = rankDatas;
									} else {
										result = [
											...rankDatas,
											{
												userName,
												wTurnover: point,
												rank,
												status
											}
										];
									}

									return result;
								});
							} else {
								setPopBox({
									isOpen: true,
									content: `[${custRankRes.data.errorCode}] ${custRankRes.data.message}`
								});
							}
						} else {
							setDatas([]);
						}
					} else {
						setPopBox({
							isOpen: true,
							content: `[${res.data.errorCode}] ${res.data.message}`
						});
					}
					setLoading(false);
					setLastUpdTime(SetUpdTime());
				} catch (error) {
					setPopBox({
						isOpen: true,
						content: i18n.msg_ApiServerError
					});
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
		customTopNum
	]);

	return { datas, lastUpdTime };
};

export const useGetMonthRank = ({
	isOpen,
	SelectDays,
	isLogin,
	userName,
	setLoading,
	customTopNum = 0,
	isMonth
}) => {
	const [datas, setDatas] = useState([]);
	const [lastUpdTime, setLastUpdTime] = useState(SetUpdTime());

	useEffect(() => {
		if (isOpen && isLogin) {
			const EventCode = handleEventCode({ isMonth });
			const GetRankingDatas = async () => {
				setLoading(true);
				try {
					const TopNum = customTopNum;
					const res = await api.events.GetLeaderboardListMonth({
						lBCategoryId: 0,
						TopNum,
						SelectDays,
						EventCode
					});
					if (res.data.errorCode === 0) {
						const rankDatas = res.data.data;
						if (rankDatas?.length > 0) {
							const custRankRes = await api.events.GetCustRankMonth(
								{
									LBCategoryId: 0,
									SelectDays,
									EventCode
								}
							);
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
		SelectDays,
		isOpen,
		setDatas,
		isLogin,
		userName,
		setLoading,
		customTopNum
	]);

	return { monthDatas: datas, lastUpdTime };
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
	const [selectedDay, setSelectedDay] = useState(defDayBtns.Today.value);

	const handleSelectDay = value => {
		setSelectedDay(value);
	};

	return { selectedDay, handleSelectDay };
};

export const useHandleSelectMonth = ({ initVal }) => {
	const [selectedMonth, setSelectedMonth] = useState(initVal);
	const handleSelectMonth = ({ selectedVal, selectedIdx }) => {
		setSelectedMonth({ selectedVal, selectedIdx });
	};

	return { selectedMonth, handleSelectMonth };
};
