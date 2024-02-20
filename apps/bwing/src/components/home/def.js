// export const methodList = {};
import moment from "moment";
import path from "../../path";
import { defGameInfo } from "../../datas/productList";
import { bannerImgUrl } from "../../config";
import { defIconType } from "../../datas/defMenu";
import { isEventPeriod } from "../common/common";
import { eventTime } from "../common/eventTime";

export const HOT_GAME_LIST = [
	{
		displayKey: "lbl_Sports",
		category: "sports",
		...defGameInfo.Sports,
		hasDesktopLink: false
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
	{ displayKey: "lbl_Vgaming", category: "vgaming", ...defGameInfo.sabaClub },
	{
		displayKey: "lbl_SEDIE",
		category: "sedie",
		...defGameInfo.LIVEcasinoOne789,
		icon: "tag-live"
	},
	{ displayKey: "lbl_Keno", category: "keno", ...defGameInfo.Keno },
	{ displayKey: "lbl_Fishing", category: "fishing", href: path.fishing.root },
	{ displayKey: "lbl_QuickGames", category: "qgames", href: path.games.root },
	{
		displayKey: "lbl_Lottery",
		category: "lottery",
		...defGameInfo.One789_lottery,
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

export const SPORT_LIST = {
	en: [
		{
			displayText: "SBOBET",
			img: `${bannerImgUrl}/h5/img/4.0/sbobet.png`,
			...defGameInfo.sportSbo,
			eventIcon: [
				{
					icon: defIconType.new,
					inPeriod: isEventPeriod(eventTime.sportSbo)
				}
			],
			hasDesktopLink: true
		},
		// {
		// 	displayKey: "lbl_CryptoSports",
		// 	img: `${bannerImgUrl}/h5/img/4.0/cryptosports.png`,
		// 	...defGameInfo.CryptoSports
		// },
		{
			displayKey: "lbl_SabaSport",
			img: `${bannerImgUrl}/h5/img/4.0/sabasport.png`,
			...defGameInfo.Sports,
			hasDesktopLink: true
		},
		{
			displayKey: "lbl_BTISport",
			img: `${bannerImgUrl}/h5/img/4.0/btisport.png`,
			...defGameInfo.BTISport,
			hasDesktopLink: true
		},
		{
			displayKey: "lbl_VirtualSports",
			img: `${bannerImgUrl}/h5/img/4.0/virtualsport.png`,
			...defGameInfo.VirtualSports,
			eventIcon: [
				{
					icon: defIconType.new,
					inPeriod: isEventPeriod(eventTime.sports_virtualSports)
				}
			]
		},
		{
			displayText: "IM Sports",
			img: `${bannerImgUrl}/h5/img/4.0/inplaymatrix.png`,
			...defGameInfo.eSports_IM,
			hasDesktopLink: true,
			eventIcon: [
				{
					icon: defIconType.new,
					inPeriod: isEventPeriod(eventTime.IM)
				}
			]
		}
	],
	vn: [
		{
			displayText: "SBOBET",
			img: `${bannerImgUrl}/h5/img/4.0/sbobet-vn.png`,
			...defGameInfo.sportSbo,
			eventIcon: [
				{
					icon: defIconType.new,
					inPeriod: isEventPeriod(eventTime.sportSbo)
				}
			],
			hasDesktopLink: true
		},
		// {
		// 	displayKey: "lbl_CryptoSports",
		// 	img: `${bannerImgUrl}/h5/img/4.0/cryptosports-vn.png`,
		// 	...defGameInfo.CryptoSports
		// },
		{
			displayKey: "lbl_SabaSport",
			img: `${bannerImgUrl}/h5/img/4.0/sabasport-vn.png`,
			...defGameInfo.Sports,
			hasDesktopLink: true
		},
		{
			displayKey: "lbl_BTISport",
			img: `${bannerImgUrl}/h5/img/4.0/btisport-vn.png`,
			...defGameInfo.BTISport,
			hasDesktopLink: true
		},
		{
			displayKey: "lbl_VirtualSports",
			img: `${bannerImgUrl}/h5/img/4.0/virtualsport-vn.png`,
			...defGameInfo.VirtualSports,
			eventIcon: [
				{
					icon: defIconType.new,
					inPeriod: isEventPeriod(eventTime.sports_virtualSports)
				}
			]
		},
		{
			displayText: "IM Sports",
			img: `${bannerImgUrl}/h5/img/4.0/inplaymatrix-vn.png`,
			...defGameInfo.eSports_IM,
			hasDesktopLink: true,
			eventIcon: [
				{
					icon: defIconType.new,
					inPeriod: isEventPeriod(eventTime.IM)
				}
			]
		}
	]
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

export const defPlatform = [
	{ name: "saba", img: `${bannerImgUrl}/h5/img/partner/saba.png` },
	{ name: "tfg", img: `${bannerImgUrl}/h5/img/partner/tfg.png` },
	{ name: "sbo", img: `${bannerImgUrl}/h5/img/partner/sbobet.png` },
	{ name: "ab", img: `${bannerImgUrl}/h5/img/partner/ab.png` },
	{ name: "yl", img: `${bannerImgUrl}/h5/img/partner/yl.png` },
	{ name: "ag", img: `${bannerImgUrl}/h5/img/partner/ag.png` },
	{ name: "gp", img: `${bannerImgUrl}/h5/img/partner/pg.png` },
	{ name: "dg", img: `${bannerImgUrl}/h5/img/partner/dreamgaming.png` },
	{ name: "sa", img: `${bannerImgUrl}/h5/img/partner/sa.png` },
	{ name: "yg", img: `${bannerImgUrl}/h5/img/partner/yg.png` },
	{ name: "pp", img: `${bannerImgUrl}/h5/img/partner/pp.png` },
	{ name: "bg", img: `${bannerImgUrl}/h5/img/partner/bg.png` },
	{ name: "yb", img: `${bannerImgUrl}/h5/img/partner/yb.png` },
	{ name: "sg", img: `${bannerImgUrl}/h5/img/partner/sg.png` },
	{ name: "pg", img: `${bannerImgUrl}/h5/img/partner/pg.png` },
	{ name: "ae", img: `${bannerImgUrl}/h5/img/partner/ae.png` },
	{ name: "wm", img: `${bannerImgUrl}/h5/img/partner/wm.png` },
	{ name: "cq9", img: `${bannerImgUrl}/h5/img/partner/cq9.png` },
	{ name: "one789", img: `${bannerImgUrl}/h5/img/partner/one789.png` },
	// { name: "icg", img: `${bannerImgUrl}/h5/img/partner/icg.png` },
	{ name: "v8", img: `${bannerImgUrl}/h5/img/partner/v8.png` },
	{ name: "n2live", img: `${bannerImgUrl}/h5/img/partner/n2live.png` },
	{ name: "playtech", img: `${bannerImgUrl}/h5/img/partner/pt.png` },
	{ name: "kingmaker", img: `${bannerImgUrl}/h5/img/partner/kingmaker.png` },
	{ name: "bti", img: `${bannerImgUrl}/h5/img/partner/bti.png` },
	{ name: "jili", img: `${bannerImgUrl}/h5/img/partner/jili.png` },
	{ name: "mg", img: `${bannerImgUrl}/h5/img/partner/mg.png` },
	{ name: "ne", img: `${bannerImgUrl}/h5/img/partner/ne.png` },
	{ name: "evo", img: `${bannerImgUrl}/h5/img/partner/evo.png` },
	{ name: "redtiger", img: `${bannerImgUrl}/h5/img/partner/red.png` },
	{ name: "ap", img: `${bannerImgUrl}/h5/img/partner/ap.png` },
	{ name: "ho", img: `${bannerImgUrl}/h5/img/partner/ho.png` },
	{
		name: "simpleplay",
		img: `${bannerImgUrl}/h5/img/partner/simpleplay.png`
	},
	{ name: "sk", img: `${bannerImgUrl}/h5/img/partner/sk.png` },
	{ name: "nextspin", img: `${bannerImgUrl}/h5/img/partner/nextspin.png` },
	{ name: "im-sports", img: `${bannerImgUrl}/h5/img/partner/im-sports.png` },
	{
		name: "im-esports",
		img: `${bannerImgUrl}/h5/img/partner/im-esports.png`
	},
	{ name: "spribe", img: `${bannerImgUrl}/h5/img/partner/spribe.png` }
];
