import { lobbyCategoryEnum, products } from "@ailab-mobile/common";
import moment from "moment/moment";
import path from "../path";
import { siteInfo } from "../config";

export const defMenuType = {
	entPage: "entPage",
	Link: "Link",
	useGoToGame: "useGoToGame"
};

export const isShowEventIcon = (iconStartTime, iconEndTime) => {
	if (!moment(iconStartTime).isValid() || !moment(iconEndTime).isValid())
		return null;

	return moment().isBetween(iconStartTime, iconEndTime);
};

export const defMenuObj = Object.freeze({
	[lobbyCategoryEnum.SPORTS]: {
		defDisplayKey: "lbl_Sports",
		category: "sports",
		lobbyCategoryId: lobbyCategoryEnum.SPORTS,
		subMenus: [
			{
				...products.CryptoSports,
				menuType: defMenuType.entPage
			},
			{
				...products.Soccer,
				menuType: defMenuType.entPage
			},
			{
				...products.SBOBET,
				menuType: defMenuType.entPage
			},
			{
				...products.BtiSport,
				menuType: defMenuType.entPage
			},
			{
				...products.IMSports,
				menuType: defMenuType.entPage
			},
			{
				...products.VirtualSports,
				menuType: defMenuType.entPage
			}
		]
	},
	[lobbyCategoryEnum.GAMES]: {
		defDisplayKey: "lbl_Games",
		category: "game",
		lobbyCategoryId: lobbyCategoryEnum.GAMES,
		subMenus: [
			{
				menuType: defMenuType.entPage,
				...products.KingMaker
			},
			{
				menuType: defMenuType.entPage,
				...products.Vgaming
			},
			{
				menuType: defMenuType.entPage,
				...products.V8Poker
			},
			{
				menuType: defMenuType.entPage,
				...products.TableGame
			},
			{
				menuType: defMenuType.entPage,
				...products.Aviator
			},
			{
				menuType: defMenuType.entPage,
				...products.Mines
			},
			{
				menuType: defMenuType.entPage,
				...products.Goal
			},
			{
				menuType: defMenuType.entPage,
				...products.Dice
			},
			{
				menuType: defMenuType.entPage,
				...products.Spaceman
			},
			{
				menuType: defMenuType.entPage,
				...products.Crash
			},
			{
				menuType: defMenuType.entPage,
				...products.GoRush
			},
			{
				menuType: defMenuType.entPage,
				...products["93Connect"]
			}
		]
	},
	[lobbyCategoryEnum.ESPORTS]: {
		defDisplayKey: "lbl_eSports",
		category: "eSports",
		lobbyCategoryId: lobbyCategoryEnum.ESPORTS,
		subMenus: [
			{
				menuType: defMenuType.entPage,
				...products.ESportALL
			},
			{
				menuType: defMenuType.entPage,
				...products.IMESports
			},
			{
				menuType: defMenuType.entPage,
				...products.TFGaming
			}
		]
	},
	// * 目前沒有 Slot 個別遊戲入口(除了 Slot 頁面) 所以打不打開都沒有關係
	[lobbyCategoryEnum.SLOTS]: {
		defDisplayKey: "lbl_Slots",
		lobbyCategoryId: lobbyCategoryEnum.SLOTS,
		category: "slot",
		subMenus: [
			{
				menuType: defMenuType.entPage,
				...products.PragmaticPlaySlot
			},
			{
				menuType: defMenuType.entPage,
				...products.Spadegaming
			},
			{
				menuType: defMenuType.entPage,
				...products.AdvantPlay
			},
			{
				menuType: defMenuType.entPage,
				...products.ES
			},
			{
				menuType: defMenuType.entPage,
				...products.Nextspin
			},
			{
				menuType: defMenuType.entPage,
				...products.PGSoft
			},
			{
				menuType: defMenuType.entPage,
				...products.FaChai
			},
			{
				menuType: defMenuType.entPage,
				...products.MicrogamingSlot
			},
			{
				menuType: defMenuType.entPage,
				...products.JILI
			},
			{
				menuType: defMenuType.entPage,
				...products.SPRIBE
			},
			{
				menuType: defMenuType.entPage,
				...products.RedTiger
			},
			{
				menuType: defMenuType.entPage,
				...products.NetEnt
			},
			{
				menuType: defMenuType.entPage,
				...products.CQ9
			},
			{
				menuType: defMenuType.entPage,
				...products.PlaynGO
			},
			{
				menuType: defMenuType.entPage,
				...products.GamePlay
			},
			{
				menuType: defMenuType.entPage,
				...products.YGGDrassil
			},
			{
				menuType: defMenuType.entPage,
				...products.Habanero
			},
			{
				menuType: defMenuType.entPage,
				...products.SimplePlay
			},
			{
				menuType: defMenuType.entPage,
				...products.SkywindSlot
			},
			{
				menuType: defMenuType.entPage,
				...products.NewPlayTechSlot
			},
			{
				menuType: defMenuType.entPage,
				...products.BNG
			},
			{
				menuType: defMenuType.entPage,
				...products.NoLimitCity
			},
			{
				menuType: defMenuType.entPage,
				...products.AmigoGaming
			}
		]
	},
	[lobbyCategoryEnum.CASINO]: {
		defDisplayKey: "lbl_LiveCasino",
		lobbyCategoryId: lobbyCategoryEnum.CASINO,
		category: "liveCasino",
		subMenus: [
			{
				menuType: defMenuType.entPage,
				...products.PragmaticPlayCasino
			},
			{
				menuType: defMenuType.entPage,
				...products.BigGaming
			},
			{
				menuType: defMenuType.entPage,
				...products.YeebetCasino
			},
			{
				menuType: defMenuType.entPage,
				...products.SkywindCasino
			},
			{
				menuType: defMenuType.entPage,
				...products.MicrogamingCasino
			},
			{
				menuType: defMenuType.entPage,
				...products.EvolutionGaming
			},
			{
				menuType: defMenuType.entPage,
				...products.NewPlayTechCasino
			},
			{
				menuType: defMenuType.entPage,
				...products.n2LIVE
			},
			{
				menuType: defMenuType.entPage,
				...products["789SeDie"]
			},
			{
				menuType: defMenuType.entPage,
				...products.WMCasino
			},
			{
				menuType: defMenuType.entPage,
				...products.DreamGaming
			},
			{
				menuType: defMenuType.entPage,
				...products.Allbet
			},
			{
				menuType: defMenuType.entPage,
				...products.AsiaGaming
			},
			{
				menuType: defMenuType.entPage,
				...products.SAGaming
			},
			{
				menuType: defMenuType.entPage,
				...products.AESexy
			},
			{
				menuType: defMenuType.entPage,
				...products.WE
			},
			{
				menuType: defMenuType.entPage,
				...products.WonCasino
			}
		]
	},
	[lobbyCategoryEnum.FISHING]: {
		defDisplayKey: "lbl_Fishing",
		category: "fishing",
		lobbyCategoryId: lobbyCategoryEnum.FISHING,
		subMenus: [
			{
				menuType: defMenuType.entPage,
				...products.FishingGod
			},
			{
				menuType: defMenuType.entPage,
				...products.FishingWar
			},
			{
				menuType: defMenuType.entPage,
				...products.ZombieParty
			},
			{
				menuType: defMenuType.entPage,
				...products.AlienHunter
			},
			{
				menuType: defMenuType.entPage,
				...products.Paradise
			},
			{
				menuType: defMenuType.entPage,
				...products.OneshotFishing
			}
		]
	},
	[lobbyCategoryEnum.LOTTERY]: {
		defDisplayKey: "lbl_Lottery",
		lobbyCategoryId: lobbyCategoryEnum.LOTTERY,
		category: "lottery",
		subMenus: [
			{
				...products.TraditionalLottery,
				menuType: defMenuType.entPage
			},
			{
				...products.VNLottery,
				menuType: defMenuType.entPage
			},
			{
				...products.TCG,
				menuType: defMenuType.entPage
			},
			{
				...products.Keno,
				menuType: defMenuType.entPage
			},
			{
				...products.Lottery,
				menuType: defMenuType.entPage
			}
		]
	},
	[lobbyCategoryEnum.Cockfighting]: {
		defDisplayKey: "CockFighting",
		lobbyCategoryId: lobbyCategoryEnum.Cockfighting,
		category: "cockFighting",
		subMenus: [
			{
				...products.WCC_Cockfighting,
				menuType: defMenuType.entPage
			}
		]
	}
});

export const defSubMenus = langId => [
	{
		icon: "icon-promo-blue",
		path: path.promotion.root,
		displayKey: "lbl_Promotion"
	},
	{
		icon: "icon-star-outline-blue",
		path: path.vip.root,
		displayKey: "lbl_VIP"
	},
	{
		icon: "icon-download-blue",
		path: path.appDownload.root,
		displayKey: "lbl_APP"
	},
	{
		icon: "icon-soccer-blue",
		path: path.sports.root,
		displayKey: "lbl_Sports"
	},
	{
		icon: "icon-livecasino-blue",
		path: path.liveCasino.root,
		displayKey: "lbl_LiveCasino"
	},
	{
		icon: "icon-lottery-blue",
		path: path.lottery.root,
		displayKey: "lbl_Lottery"
	},
	{
		icon: "icon-fishing-blue",
		path: path.fishing.root,
		displayKey: "lbl_Fishing"
	},
	{
		icon: "icon-slots-blue",
		path: path.casino.root,
		displayKey: "lbl_Slots"
	},
	{
		icon: "icon-games-blue",
		path: path.games.root,
		displayKey: "lbl_Games"
	},
	{
		icon: "icon-esports-blue",
		path: path.eSports.root,
		displayKey: "lbl_eSports"
	},
	{
		icon: "icon-aff-blue",
		href: siteInfo(langId).affiliateLink,
		displayKey: "lbl_Affiliates"
	},
	{
		icon: "icon-other-blue",
		path: path.other.root,
		displayKey: "lbl_Other"
	},
	{
		icon: "icon-cockfighting-blue",
		path: path.cockFighting.root,
		displayKey: "lbl_CockFighting"
	},
	{
		icon: "icon-leaderboard-blue",
		path: path.leaderBoard.root,
		displayKey: "lbl_LeaderBoard"
	},
	{
		icon: "icon-survey-blue",
		path: path.survey.root,
		displayKey: "lbl_Survey"
	}
];
