export interface IMissionData {
	missionDate: string;
	missionName: string;
	missionNo: number;
	goalAmount: number;
	progressAmount: number;
	eggCount: number;
	isCompleted: boolean;
}

export interface ICheckPromotionMissionData {
	newYearMission2024: IMissionData[];
	eggTicket: number;
}

export interface IGetCustBlessingsStickerData {
	isClaimedBigPrize: boolean;
	stickers: number;
}

export interface IGetCustDrawPrizeListData {
	amount: number;
	prizeId: number;
	drawTime: string;
	eventDate: string;
	prizeName: string;
}

export interface IDrawPrizeData {
	jackpot: number;
	prizeId: number;
	prizeName: null | string;
	ticketCount: number;
	drawPrizeType: number;
}
