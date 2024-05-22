import moment from "moment";
import { products } from "@ailab-mobile/common";
import path from "../../path";

export const HOT_GAME_LIST = [
	{
		displayKey: "lbl_Sports",
		category: "sports",
		...products.Soccer,
		hasDesktopLink: true
	},
	{
		displayKey: "lbl_Jackpot",
		category: "jackpot",
		href: `${path.casino.root}?page=jackpot`
	},
	{
		displayKey: "lbl_LiveCasino",
		category: "livecasino",
		href: path.liveCasino.root
	},
	{ displayKey: "lbl_Vgaming", category: "vgaming", ...products.Vgaming },
	{
		displayKey: "lbl_SEDIE",
		category: "sedie",
		...products["789SeDie"],
		icon: "tag-live"
	},
	{ displayKey: "lbl_Keno", category: "keno", ...products.Keno },
	{ displayKey: "lbl_Fishing", category: "fishing", href: path.fishing.root },
	{ displayKey: "lbl_QuickGames", category: "qgames", href: path.games.root },
	{
		displayKey: "lbl_Lottery",
		category: "lottery",
		...products.TraditionalLottery,
		icon: "tag-live"
	}
];

export const defPromoStatus = {
	running: 1,
	Canceled: 2,
	Expiry: 3,
	Fulfill: 4,
	TransferOut: 5
};

export const defPromotionType = {
	firstDeposit: 1,
	reDeposit: 2,
	freeBet: 3,
	walletBonus: 5,
	rebate: 6,
	cashback: 7,
	static: 8,
	missionBonus: 11
};

export const isExpiry = ({
	periodTo,
	custExpiryTime,
	isLogin,
	isJoin,
	promotionType
}) => {
	return isLogin &&
		isJoin &&
		promotionType !== defPromotionType.rebate &&
		promotionType !== defPromotionType.cashback
		? moment(custExpiryTime).isBefore(new moment())
		: moment(moment.unix(periodTo)).isBefore(new moment());
};

export const rankMap = {
	1: "1st",
	2: "2nd",
	3: "3rd"
};

export const defProductType = {
	Sports: 1,
	Slots: 2,
	LiveCasino: 3,
	Fishing: 4,
	CockFighting: 5,
	Lottery: 6,
	VirtualSports: 7,
	Poker: 8
};
