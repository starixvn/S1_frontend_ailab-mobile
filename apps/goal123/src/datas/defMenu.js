import moment from "moment";
import { products, lobbyCategoryEnum } from "@ailab-mobile/common";
import path from "../path";
import { bannerImgUrl } from "../config";

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

// * menu 遊戲 預設展開 subMenu
export const defCol = {
	hotGame: "hotGame",
	sports: "sports",
	esports: "esports",
	livecasino: "livecasino",
	slots: "slots",
	games: "games",
	fishing: "fishing",
	lottery: "lottery",
	cockFighting: "cockFighting"
};

// * defMenuObj 禁止做任何 mutability 的行為以免改到原定義檔
export const defMenuList = Object.freeze([
	{
		lobbyCategoryId: lobbyCategoryEnum.SPORTS,
		defDisplayKey: "lbl_Sports",
		category: "sports",
		mainMenuImage: `${bannerImgUrl}/h5/img/home-page/icon/btn-sports.svg`,
		sideMenuIcon: `${bannerImgUrl}/h5/img/home-page/icon/sidemenu-sports.svg`,
		subMenus: [
			{
				...products.CryptoSports,
				menuType: defMenuType.entPage
			},
			{
				...products.Soccer,
				menuType: defMenuType.entPage,
				hasDesktopLink: true
			},
			{
				...products.SBOBET,
				menuType: defMenuType.entPage,
				hasDesktopLink: true
			},
			{
				...products.BtiSport,
				menuType: defMenuType.entPage,
				hasDesktopLink: true
			},
			{
				...products.IMSports,
				menuType: defMenuType.entPage,
				hasDesktopLink: true
			},
			{
				...products.SabaSoccer,
				menuType: defMenuType.entPage,
				hasDesktopLink: true
			},
			{
				...products.ESportALL,
				menuType: defMenuType.entPage
			},
			{
				...products.Basketball,
				menuType: defMenuType.entPage,
				hasDesktopLink: true
			},
			{
				...products.Volleyball,
				menuType: defMenuType.entPage,
				hasDesktopLink: true
			},
			{
				...products.VirtualSports,
				menuType: defMenuType.entPage
			}
		]
	},
	{
		defDisplayKey: "lbl_eSports",
		lobbyCategoryId: lobbyCategoryEnum.ESPORTS,
		category: "esports",
		mainMenuImage: `${bannerImgUrl}/h5/img/home-page/icon/btn-esports.svg`,
		sideMenuIcon: `${bannerImgUrl}/h5/img/home-page/icon/sidemenu-esports.svg`,
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
	{
		defDisplayKey: "lbl_LiveCasino",
		lobbyCategoryId: lobbyCategoryEnum.CASINO,
		category: "livecasino",
		mainMenuImage: `${bannerImgUrl}/h5/img/home-page/icon/btn-casino.svg`,
		sideMenuIcon: `${bannerImgUrl}/h5/img/home-page/icon/sidemenu-casino.svg`,
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
				...products.WMCasino
			},
			{
				menuType: defMenuType.entPage,
				...products.Allbet
			},
			{
				menuType: defMenuType.entPage,
				...products.WE
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
				...products.DreamGaming
			},
			{
				menuType: defMenuType.entPage,
				...products.AsiaGaming
			},
			{
				menuType: defMenuType.entPage,
				...products.WonCasino
			}
		]
	},
	{
		defDisplayKey: "lbl_Slots",
		lobbyCategoryId: lobbyCategoryEnum.SLOTS,
		category: "slots",
		mainMenuImage: `${bannerImgUrl}/h5/img/home-page/icon/btn-slots.svg`,
		sideMenuIcon: `${bannerImgUrl}/h5/img/home-page/icon/sidemenu-slots.svg`,
		subMenus: [
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.PragmaticPlaySlot.tpId },
				...products.PragmaticPlaySlot,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.Spadegaming.tpId },
				...products.Spadegaming,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.AdvantPlay.tpId },
				...products.AdvantPlay,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.ES.tpId },
				...products.ES,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.Nextspin.tpId },
				...products.Nextspin,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.PGSoft.tpId },
				...products.PGSoft,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.FaChai.tpId },
				...products.FaChai,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.MicrogamingSlot.tpId },
				...products.MicrogamingSlot,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.JILI.tpId },
				...products.JILI,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.SPRIBE.tpId },
				...products.SPRIBE,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.RedTiger.tpId },
				...products.RedTiger,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.NetEnt.tpId },
				...products.NetEnt,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.CQ9.tpId },
				...products.CQ9,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.PlaynGO.tpId },
				...products.PlaynGO,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.GamePlay.tpId },
				...products.GamePlay,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.YGGDrassil.tpId },
				...products.YGGDrassil,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.Habanero.tpId },
				...products.Habanero,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.SimplePlay.tpId },
				...products.SimplePlay,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.SkywindSlot.tpId },
				...products.SkywindSlot,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.NewPlayTechSlot.tpId },
				...products.NewPlayTechSlot,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.BNG.tpId },
				...products.BNG,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.NoLimitCity.tpId },
				...products.NoLimitCity,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: { provider: products.AmigoGaming.tpId },
				...products.AmigoGaming,
				path: path.casino.root
			}
		]
	},
	{
		defDisplayKey: "lbl_Games",
		lobbyCategoryId: lobbyCategoryEnum.GAMES,
		category: "games",
		mainMenuImage: `${bannerImgUrl}/h5/img/home-page/icon/btn-games.svg`,
		sideMenuIcon: `${bannerImgUrl}/h5/img/home-page/icon/sidemenu-games.svg`,
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
				...products["93Connect"]
			}
		]
	},
	{
		defDisplayKey: "lbl_Fishing",
		lobbyCategoryId: lobbyCategoryEnum.FISHING,
		category: "fishing",
		mainMenuImage: `${bannerImgUrl}/h5/img/home-page/icon/btn-fishing.svg`,
		sideMenuIcon: `${bannerImgUrl}/h5/img/home-page/icon/sidemenu-fishing.svg`,
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
	{
		defDisplayKey: "lbl_Lottery",
		lobbyCategoryId: lobbyCategoryEnum.LOTTERY,
		category: "lottery",
		mainMenuImage: `${bannerImgUrl}/h5/img/home-page/icon/btn-lottery.svg`,
		sideMenuIcon: `${bannerImgUrl}/h5/img/home-page/icon/sidemenu-lottery.svg`,
		subMenus: [
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
	{
		defDisplayKey: "CockFighting",
		lobbyCategoryId: lobbyCategoryEnum.Cockfighting,
		category: "cockFighting",
		mainMenuImage: `${bannerImgUrl}/h5/img/home-page/icon/btn-cockfigting.svg`,
		sideMenuIcon: "icon icon-lottery",
		subMenus: [
			{
				...products.GACockFighting,
				menuType: defMenuType.entPage
			},
			{
				...products.WCC_Cockfighting,
				menuType: defMenuType.entPage
			}
		]
	}
]);
