import moment from "moment";

export const defStatement = {
	pageSize: 10
};

export const getDateRange = ({ startDate, endDate }) => {
	let displayKey = "";

	const today = moment().format("YYYY-MM-DD");
	const thisWeekStart = moment().startOf("week").format("YYYY-MM-DD");
	const lastWeekStart = moment()
		.subtract(1, "weeks")
		.startOf("week")
		.format("YYYY-MM-DD");
	const lastWeekEnd = moment()
		.subtract(1, "weeks")
		.endOf("week")
		.format("YYYY-MM-DD");

	if (startDate === endDate) {
		displayKey = startDate === today ? "lbl_Today" : "lbl_YesterDay";
	} else if (
		moment(startDate).isBetween(thisWeekStart, today, undefined, "[]") &&
		moment(endDate).isBetween(thisWeekStart, today, undefined, "[]")
	) {
		displayKey = "lbl_ThisWeek";
	} else if (
		moment(startDate).isBetween(
			lastWeekStart,
			lastWeekEnd,
			undefined,
			"[]"
		) &&
		moment(endDate).isBetween(lastWeekStart, lastWeekEnd, undefined, "[]")
	) {
		displayKey = "lbl_LastWeek";
	} else {
		displayKey = "lbl_Other";
	}

	return displayKey;
};

export const getSkipLink = ({ dateRange }) => {
	return dateRange === "lbl_Today" || dateRange === "lbl_YesterDay"
		? ["date"]
		: [];
};
