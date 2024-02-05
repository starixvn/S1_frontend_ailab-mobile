import moment from "moment";
import { products, lobbyCategoryEnum } from "@ailab-mobile/common";
import path from "../path";

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

export const defCol = {
	sports: "sports",
	virtualsports: "virtualsports",
	livecasino: "livecasino",
	slots: "slots",
	game: "game"
};

// * defMenuObj 禁止做任何 mutability 的行為以免改到原定義檔
export const defMenuList = Object.freeze([
	{
		displayKey: "lbl_Sports",
		lobbyCategoryId: lobbyCategoryEnum.SPORTS,
		categoryIcon: "sports",
		category: "sports",
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
				...products.SabaSoccer,
				menuType: defMenuType.entPage
			},
			{
				...products.Basketball,
				menuType: defMenuType.entPage
			},
			{
				...products.Cricket,
				menuType: defMenuType.entPage
			},
			{
				...products.Badminton,
				menuType: defMenuType.entPage
			},
			{
				...products.Volleyball,
				menuType: defMenuType.entPage
			},
			{
				...products.VirtualSports,
				menuType: defMenuType.entPage
			}
		]
	},
	{
		displayKey: "lbl_eSports",
		lobbyCategoryId: lobbyCategoryEnum.ESPORTS,
		categoryIcon: "esports",
		category: "esports",
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
		displayKey: "lbl_LiveCasino",
		lobbyCategoryId: lobbyCategoryEnum.CASINO,
		categoryIcon: "casino",
		category: "livecasino",
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
			}
		]
	},
	{
		displayKey: "lbl_Slots",
		lobbyCategoryId: lobbyCategoryEnum.SLOTS,
		categoryIcon: "slots",
		category: "slots",
		subMenus: [
			{
				menuType: defMenuType.Link,
				parameter: products.PragmaticPlaySlot.tpId,
				...products.PragmaticPlaySlot,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: products.Spadegaming.tpId,
				...products.Spadegaming,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: products.AdvantPlay.tpId,
				...products.AdvantPlay,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: products.ES.tpId,
				...products.ES,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: products.Nextspin.tpId,
				...products.Nextspin,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: products.PGSoft.tpId,
				...products.PGSoft,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: products.FaChai.tpId,
				...products.FaChai,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: products.MicrogamingSlot.tpId,
				...products.MicrogamingSlot,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: products.JILI.tpId,
				...products.JILI,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: products.SPRIBE.tpId,
				...products.SPRIBE,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: products.Joker.tpId,
				...products.Joker,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: products.Pegasus.tpId,
				...products.Pegasus,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: products.RedTiger.tpId,
				...products.RedTiger,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: products.NetEnt.tpId,
				...products.NetEnt,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: products.CQ9.tpId,
				...products.CQ9,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: products.PlaynGO.tpId,
				...products.PlaynGO,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: products.GamePlay.tpId,
				...products.GamePlay,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: products.YGGDrassil.tpId,
				...products.YGGDrassil,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: products.AskmeSlot.tpId,
				...products.AskmeSlot,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: products.Habanero.tpId,
				...products.Habanero,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: products.SimplePlay.tpId,
				...products.SimplePlay,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: products.SkywindSlot.tpId,
				...products.SkywindSlot,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: products.NewPlayTechSlot.tpId,
				...products.NewPlayTechSlot,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: products.BNG.tpId,
				...products.BNG,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: products.NoLimitCity.tpId,
				...products.NoLimitCity,
				path: path.casino.root
			},
			{
				menuType: defMenuType.Link,
				parameter: products.AmigoGaming.tpId,
				...products.AmigoGaming,
				path: path.casino.root
			}
		]
	},
	{
		displayKey: "lbl_Games",
		lobbyCategoryId: lobbyCategoryEnum.GAMES,
		categoryIcon: "games",
		category: "games",
		subMenus: [
			{
				menuType: defMenuType.entPage,
				...products.MPPoker
			},
			{
				menuType: defMenuType.entPage,
				...products.AMBPoker
			},
			{
				menuType: defMenuType.entPage,
				...products.Vgaming
			},
			{
				menuType: defMenuType.entPage,
				...products.KingMaker
			},
			{
				menuType: defMenuType.entPage,
				...products.V8Poker
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
				...products.MaxGame
			},
			{
				menuType: defMenuType.entPage,
				...products["93Connect"]
			}
		]
	},
	{
		displayKey: "lbl_Fishing",
		lobbyCategoryId: lobbyCategoryEnum.FISHING,
		categoryIcon: "fishing",
		category: "fishing",
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
				...products.FishingWorld
			},
			{
				menuType: defMenuType.entPage,
				...products.FishHaiba
			},
			{
				menuType: defMenuType.entPage,
				...products.HappyFish5
			},
			{
				menuType: defMenuType.entPage,
				...products.MonsterAwaken
			},
			{
				menuType: defMenuType.entPage,
				...products.OneshotFishing
			}
		]
	},
	{
		displayKey: "lbl_Lottery",
		lobbyCategoryId: lobbyCategoryEnum.LOTTERY,
		categoryIcon: "lottery",
		category: "lottery",
		subMenus: [
			{
				...products.GPIKeno,
				menuType: defMenuType.entPage
			},
			{
				...products.ThaiLottery,
				menuType: defMenuType.entPage
			},
			{
				...products.Fast3,
				menuType: defMenuType.entPage
			},
			{
				...products.TCGaming,
				menuType: defMenuType.entPage
			},
			{
				...products.Keno,
				menuType: defMenuType.entPage
			},
			{
				...products.Lottery,
				menuType: defMenuType.entPage
			},
			{
				...products.NumberGame,
				parameter: { provider: "NumberGame" },
				menuType: defMenuType.Link
			},
			{
				...products.TableGame,
				menuType: defMenuType.entPage
			}
		]
	},
	{
		displayKey: "lbl_Exchange",
		lobbyCategoryId: lobbyCategoryEnum.EXCHANGE,
		categoryIcon: "exchange",
		category: "exchange",
		subMenus: [
			{
				// * Nova88Exchange 就是 9W 走 GoToGame 的特例
				...products.Nova88Exchange,
				isNeedLogin: true,
				menuType: defMenuType.useGoToGame,
				categoryIcon: "exchange"
			}
		]
	},
	{
		displayKey: "lbl_4D",
		lobbyCategoryId: lobbyCategoryEnum.FourD,
		categoryIcon: "four",
		category: "4d",
		subMenus: [
			{
				...products.GrandDragon,
				isNeedLogin: true,
				menuType: defMenuType.useGoToGame
			}
		]
	}
]);
