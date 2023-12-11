import moment, { HTML5_FMT } from "moment";
import { IEventPeriod } from "../type";

const { DATETIME_LOCAL } = HTML5_FMT;
/**
 *
 * @returns 驗證當前日期是否進入指定範圍
 */
export const isDateRange = ({ startDate, endDate }: IEventPeriod) => {
	const today = moment().format(DATETIME_LOCAL);

	if (startDate && !endDate)
		return moment(today).isSameOrAfter(startDate, "second");

	if (!startDate && endDate)
		return moment(today).isSameOrBefore(endDate, "second");

	// * 防呆，如果結束時間大於開始時間
	if (moment(startDate).isAfter(endDate)) return false;

	if (startDate && endDate)
		return (
			moment(today).isSame(startDate, "second") ||
			moment(today).isSame(endDate, "second") ||
			moment(today).isBetween(startDate, endDate, "second")
		);

	return false;
};
