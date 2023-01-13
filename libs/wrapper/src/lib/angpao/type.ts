import { IAxiosResponse } from "@ailab-mobile/service";

export enum DrawPrizeEventIdEnum {
	LuckyWheelNova88 = 9,
	LuckyWheelGoal123,
	LuckyWheelBwing,
	AngpaoNova88,
	AngpaoGoal123,
	AngpaoBwing
}

export enum DrawPrizeJackpotEnum {
	Normal = 0, // * 一般獎項
	Jackpot // * 大獎
}

export type EventIdType = {
	eventId: number;
};

export interface ICheckDrawPrizeArgs {
	eventId: number;
}

export interface DrawPrizeData {
	jackpot: DrawPrizeJackpotEnum;
	prizeId: number;
	prizeName: null | string;
	ticketCount: number;
}

export type CheckDrawPrizeResponse = IAxiosResponse<DrawPrizeData>;

export interface IDrawPrizeArgs {
	eventId: number;
}

export interface IGetDrawPrizeRecordListArgs {
	eventId: number;
}

/**
 * * eventDate: 事件發生日
 * * prizeId: 獎項ID
 * * prizeName: 獎項名稱
 * * amount: 中獎金額
 * * drawTime: 中獎時間 (UTC+0)
 */
export interface IDrawPrizeRecordData {
	eventDate: null | string;
	prizeId: number;
	prizeName: string;
	amount: number;
	drawTime: string;
}
