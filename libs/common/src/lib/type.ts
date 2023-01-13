import { Moment } from "moment";

export interface IEventPeriod {
	startDate?: string | Moment;
	endDate?: string | Moment;
}
