import moment from "moment";

export const generateYearMonthList = () => {
	const start = moment("2024-01-01");
	const end = moment();
	const monthsDifference = end.diff(start, "months");
	const monthArray = Array.from(
		{ length: monthsDifference + 1 },
		(_, i) => i
	);
	return monthArray.map(offset => {
		const date = start.clone().add(offset, "months");
		return { year: date.year(), month: date.month() + 1 }; // month() 是 0-11，所以要加 1
	});
};

export const getFormattedUpdateTime = () => {
	const now = moment();
	const startOfHour = moment().startOf("hour");
	const threshold = startOfHour.add(30, "minutes");
	const displayTime = now.isAfter(threshold) ? threshold : startOfHour;

	return displayTime.format("YYYY/MM/DD HH:mm:ss");
};

export const LEADER_BOARD_RANK_NUM = {
	current: 50,
	monthly: 30
};

export const LEADER_BOARD_EVENT_CODE = {
	current: "2021051",
	monthly: "2021052"
};
