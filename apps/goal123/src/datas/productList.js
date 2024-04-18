import { isDateRange } from "@ailab-mobile/common";
import { angPaoEventPeriod } from "../pages/angpao";
import { isEventPeriod } from "../components/common/common";
import path from "../path";
import { eventTime } from "../components/common/eventTime";
import { bannerImgUrl } from "../config";

export const defProductType = {
	Sports: 1,
	Slots: 2,
	LiveCasino: 3,
	Fishing: 4,
	CockFighting: 5,
	Lottery: 6,
	VirtualSports: 7,
	Poker: 8,
	Crypto: 9,
	Games: 10,
	ESports: 11
};

export const defGameInfo = {
	Sports: { tpId: 41, gameId: 1, tpGameType: 69 },
	CryptoSports: { tpId: 45, tpGameType: 87 },
	SBOSport: { tpId: 42, tpGameType: 77 },
	BTISport: { tpId: 29, tpGameType: 49 },
	SabaSoccer: { tpId: 41, gameId: 997, tpGameType: 69 },
	sports_IM: { tpId: 52, tpGameType: 103, gameId: "IMSB" },
	eSports: { tpId: 41, gameId: 43, tpGameType: 69 },
	eSports_TFGaming: { tpId: 48, gameId: 0, tpGameType: 97 },
	eSports_IM: { tpId: 52, gameId: "ESPORTSBULL", tpGameType: 102 },
	Basketball: { tpId: 1, gameId: 2, tpGameType: 1 },
	Volleyball: { tpId: 1, gameId: 6, tpGameType: 1 },
	// CockFighting: { tpId: 17, tpGameType: 27 },
	GACockFighting: { tpId: 63, tpGameType: 115 },
	sabaClub: { tpId: 41, gameId: 171, tpGameType: 95 },
	Keno: { gameId: 202, tpId: 41, tpGameType: 73 },
	lottery: { gameId: 220, tpId: 41, tpGameType: 74 },
	tableGame: { gameId: 222, tpId: 41, tpGameType: 75 },
	V8Poker: { gameId: 0, tpId: 25, tpGameType: 47 },
	fish_AB3: { tpId: 16, gameId: "AB3", tpGameType: 44 },
	fish_AT05: { tpId: 16, gameId: "AT05", tpGameType: 44 },
	fish_AT01: { tpId: 16, gameId: "AT01", tpGameType: 44 },
	fish_AT06: { tpId: 16, gameId: "AT06", tpGameType: 44 },
	fish_AT04: { tpId: 16, gameId: "AT04", tpGameType: 44 },
	ICG_DRAGONBALL_FISHING: { tpId: 24, gameId: "cmf0001", tpGameType: 40 },
	ICG_FISHING_OF_SAVIORS: { tpId: 24, gameId: "cmf0002", tpGameType: 40 },
	ICG_THE_TYRANT_AND_THE_PRINCESS: {
		tpId: 24,
		gameId: "cmf0006",
		tpGameType: 40
	},
	Fishing: { gameId: 10, tpId: 7, tpGameType: 12 },
	FishingSG: { gameId: "F-SF01", tpId: 10, tpGameType: 31 },
	FishingSGW: { gameId: "F-SF02", tpId: 10, tpGameType: 31 },
	Fishing_Zombie_Party: {
		gameId: "F-ZP01",
		tpId: 10,
		tpGameType: 31
	},
	Fishing_Alien_Hunter: {
		gameId: "F-AH01",
		tpId: 10,
		tpGameType: 31
	},
	Skywind_Ocean_Ruler: { gameId: "sw_or", tpId: 43, tpGameType: 85 },
	Skywind_Cai_Shen_Da_Hai: {
		gameId: "sw_cashdaha",
		tpId: 43,
		tpGameType: 85
	},
	Casino_All: { tpId: 0 },
	casino_ICG: { tpId: 24, tpGameType: 39 },
	Casino_CQ9: { tpId: 16, tpGameType: 29 },
	Casino_PNG: { tpId: 54, tpGameType: 105 },
	Casino_GPI: { tpId: 6, tpGameType: 11 },
	Casino_YGG: { tpId: 8, tpGameType: 14 },
	Casino_SG: { tpId: 10, tpGameType: 15 },
	Casino_PP: { tpId: 5, tpGameType: 7 },
	Casino_PG: { tpId: 14, tpGameType: 17 },
	// 新的 PlayTech (Seamless Wallet)
	Casino_PlayTech: { tpId: 51, gameId: "0", tpGameType: 100 },
	Casino_ow: {
		gameId: 208,
		tpId: 41,
		tpGameType: 4
	},
	Casino_MGP: { tpId: 34, tpGameType: 57 },
	Casino_NetEnt: { tpId: 37, tpGameType: 64 },
	Casino_JOKER: { tpId: 9, tpGameType: 13 },
	Casino_Jili: { tpId: 32, tpGameType: 53 },
	Casino_RedTiger: { tpId: 38, tpGameType: 65 },
	Casino_AdvantPlay: { tpId: 39, tpGameType: 67 },
	Casino_Habanero: { tpId: 40, tpGameType: 68 },
	Casino_Skywind: { tpId: 43, tpGameType: 82 },
	Casino_SimplePlay: { tpId: 44, tpGameType: 86 },
	Casino_Nextspin: { tpId: 50, tpGameType: 99 },
	Casino_SPRIBE: { tpId: 53, tpGameType: 104 },
	Casino_Amigo: { tpId: 60, tpGameType: 112 },
	Casino_Endorphina: { tpId: 49, tpGameType: 98 },
	Casino_FaChai: { tpId: 55, tpGameType: 106 },
	Casino_BNG: { tpId: 57, tpGameType: 108 },
	Casino_NoLimitCity: { tpId: 59, tpGameType: 111 },
	LIVEcasinoWM: { gameId: 20, tpId: 20, tpGameType: 32 },
	LIVEcasinoDG: { tpId: 4, gameId: 4, tpGameType: 10 },
	LIVEcasinoPP: { gameId: 101, tpId: 5, tpGameType: 16 },
	LIVEcasinoBG: { tpId: 47, gameId: 0, tpGameType: 94 },
	LIVEcasinoYEEBET: { tpId: 46, gameId: 0, tpGameType: 93 },
	LIVEcasinoAE: { gameId: 15, tpId: 15, tpGameType: 18 },
	LIVEcasinoAG: { gameId: 3, tpId: 3, tpGameType: 8 },
	LIVEcasinoAB: { gameId: 12, tpId: 12, tpGameType: 6 },
	LIVEcasinoSA: { gameId: 2, tpId: 2, tpGameType: 9 },
	LIVEcasinoEB: { gameId: 18, tpId: 18, tpGameType: 28 },
	LIVEcasinoMW: { gameId: 105, tpId: 5 },
	LIVEcasinoEVO: { gameId: 0, tpId: 36, tpGameType: 63 },
	// 新的 PlayTech (Seamless Wallet)
	LIVEcasino_PlayTech: { tpId: 51, gameId: "0", tpGameType: 101 },
	LIVEcasinoMGP: { tpId: 34, tpGameType: 58 },
	LIVEcasinoMG: { tpId: 34, gameId: "0", tpGameType: 58 },
	LIVEcasinoSkywind: { tpId: 43, gameId: "0", tpGameType: 84 },
	LIVECasinoWon: {
		tpId: 64,
		gameId: 0,
		tpGameType: 116
	},
	Indo4d: {
		gameId: 223,
		tpId: 41,
		tpGameType: 20
	},
	NumberGame: {
		gameId: 161,
		tpId: 41,
		tpGameType: 70
	},
	kingMaker: { tpId: 11, tpGameType: 52 },
	tcg: { tpId: 33, tpGameType: 55 },
	MaxGame: {
		tpId: 41,
		gameId: 237,
		tpGameType: 83
	},
	IM_Avaitor: {
		tpId: 53,
		gameId: "imgame12001",
		tpGameType: 104
	},
	IM_Mines: {
		tpId: 53,
		gameId: "imgame12002",
		tpGameType: 104
	},
	IM_Goal: {
		tpId: 53,
		gameId: "imgame12003",
		tpGameType: 104
	},
	IM_Dice: {
		tpId: 53,
		gameId: "imgame12004",
		tpGameType: 104
	},
	// VirtualGame: {
	// 	tpId: 41,
	// 	gameId: 245,
	// 	tpGameType: 22
	// },
	VirtualSports: {
		tpId: 41,
		gameId: 192,
		tpGameType: 72
	},
	WorldCup: {
		tpId: 41,
		gameId: 2002,
		tpGameType: 1
	},
	GPI_VNLottery: { tpId: 6, gameId: "sode", tpGameType: 89 },
	Spaceman: { tpId: 5, tpGameType: 7, gameId: 1302 },
	Crash: { tpId: 39, tpGameType: 67, gameId: "Crash" },
	GoRush: { tpId: 32, tpGameType: 53, gameId: 224 },
	"93Connect": { tpId: 62, tpGameType: 114, gameId: "LOBBY" }
};

const defIconType = {
	live: " liveicon",
	new: " newicon",
	hot: " hoticon"
};

export const defCol = {
	hotGame: "hotGame",
	sports: "sports",
	esports: "e-sport",
	games: "games",
	fishing: "fishing",
	slots: "slots",
	livecasino: "livecasino",
	lottery: "lottery",
	cockfighting: "cockFighting"
};

export const openGameType = {
	entPage: "entPage",
	Link: "Link",
	LinkOrBtn: "LinkOrBtn",
	useGoToGame: "useGoToGame"
};

export const defSlotTpGameType = {
	Saba: { tpId: 41, tpGameType: 4 },
	PP: { tpId: 5, tpGameType: 7 },
	GPI: { tpId: 6, tpGameType: 11 },
	YGG: { tpId: 8, tpGameType: 14 },
	SG: { tpId: 10, tpGameType: 15 },
	PG: { tpId: 14, tpGameType: 17 },
	CQ9: { tpId: 16, tpGameType: 29 },
	PNG: { tpId: 54, tpGameType: 105 },
	Iconic: { tpId: 24, tpGameType: 39 },
	// 新的 PlayTech (Seamless Wallet)
	PlayTech: { tpId: 51, tpGameType: 100 },
	JILI: { tpId: 32, tpGameType: 53 },
	MG: { tpId: 34, tpGameType: 57 },
	NetEnt: { tpId: 37, tpGameType: 64 },
	RedTiger: { tpId: 38, tpGameType: 65 },
	AdvantPlay: { tpId: 39, tpGameType: 67 },
	Habanero: { tpId: 40, tpGameType: 68 },
	Skywind: { tpId: 43, tpGameType: 82 },
	SimplePlay: { tpId: 44, tpGameType: 86 },
	Nextspin: { tpId: 50, tpGameType: 99 },
	SPRIBE: { tpId: 53, tpGameType: 104 },
	Endorphina: { tpId: 49, tpGameType: 98 },
	FaChai: { tpId: 55, tpGameType: 106 },
	BNG: { tpId: 57, tpGameType: 108 },
	NoLimitCity: { tpId: 59, tpGameType: 111 },
	Amigo: { tpId: 60, tpGameType: 112 }
};

const gameList = [
	{
		category: "hotGame",
		translateKey: "lbl_Hot",
		img: `${bannerImgUrl}/h5/img/home-page/icon/btn-hotgame.svg`,
		items: [
			// {
			// 	...defGameInfo.Sports,
			// 	img: `${bannerImgUrl}/h5/img/hotgame/sport.jpg`,
			// 	spanTextKey: "lbl_Sports",
			// 	hasDesktopLink: true
			// },
			{
				...defGameInfo.SabaSoccer,
				// img: `${bannerImgUrl}/h5/img/hotgame/sabasoccer.jpg`,
				img: `${bannerImgUrl}/h5/img/home-page/hotgame/sports-saba.png`,
				spanTextKey: "lbl_SabaSoccer",
				hasDesktopLink: true
			},
			{
				...defGameInfo.BTISport,
				// img: `${bannerImgUrl}/h5/img/hotgame/sport.jpg`,
				img: `${bannerImgUrl}/h5/img/home-page/hotgame/sports-bti.png`,
				spanTextKey: "lbl_BTISport",
				hasDesktopLink: true
			},
			{
				// img: `${bannerImgUrl}/h5/img/hotgame/slots.jpg`,
				img: `${bannerImgUrl}/h5/img/home-page/hotgame/slots.png`,
				spanTextKey: "lbl_Slots",
				// 首頁的hotgame只需要跳轉到slots的tab
				// path: path.casino.root,
				category: defCol.slots
			},
			{
				...defGameInfo.sabaClub,
				img: `${bannerImgUrl}/h5/img/home-page/hotgame/games-vgaming.png`,
				spanTextKey: "lbl_Vgaming"
			},
			{
				// 需要確認 先放圖
				...defGameInfo.Casino_AdvantPlay,
				img: `${bannerImgUrl}/h5/img/home-page/hotgame/casino.png`,
				spanTextKey: "lbl_Casino",
				category: defCol.livecasino
			},
			// {
			// 	...defGameInfo.VirtualSports,
			// 	img: `${bannerImgUrl}/h5/img/hotgame/virtual.jpg`,
			// 	spanTextKey: "lbl_VirtualSports"
			// },
			{
				...defGameInfo.Keno,
				// img: `${bannerImgUrl}/h5/img/hotgame/keno.jpg`,
				img: `${bannerImgUrl}/h5/img/home-page/hotgame/lottery.png`,
				spanTextKey: "lbl_Lottery",
				category: defCol.lottery
			},
			{
				...defGameInfo.V8Poker,
				img: `${bannerImgUrl}/h5/img/home-page/hotgame/games-v8power.png`,
				spanTextKey: "lbl_V8Poker"
			},
			{
				// ...defGameInfo.FishingSG,
				img: `${bannerImgUrl}/h5/img/home-page/hotgame/fishing.png`,
				spanTextKey: "lbl_Fishing",
				category: defCol.fishing
			},

			{
				...defGameInfo.eSports,
				img: `${bannerImgUrl}/h5/img/home-page/hotgame/esports.png`,
				spanTextKey: "lbl_eSports",
				category: defCol.esports
			},
			{
				...defGameInfo.GACockFighting,
				img: `${bannerImgUrl}/h5/img/home-page/hotgame/cockfighting.png`,
				spanTextKey: "lbl_CockFighting",
				category: defCol.cockfighting
			}
		]
	},
	{
		category: "event",
		img: `${bannerImgUrl}/h5/img/event/wheel/eventlink-top.png`,
		className: "event",
		path: `luckyWheel`,
		link: true,
		type: openGameType.Link,
		isEventPeriod: !isDateRange(angPaoEventPeriod)
	},
	// {
	// 	category: "cryptoSports",
	// 	img: `${bannerImgUrl}/h5/img/hotgameicon/cryptosports.png`,
	// 	link: true,
	// 	type: openGameType.entPage,
	// 	...defGameInfo.CryptoSports,
	// 	eventIcon: [
	// 		{
	// 			icon: defIconType.new,
	// 			inPeriod: isEventPeriod(eventTime.sports_cryptoSports)
	// 		}
	// 	]
	// },
	{
		category: "sports",
		translateKey: "lbl_Sports",
		img: `${bannerImgUrl}/h5/img/home-page/icon/btn-sports.svg`,
		items: [
			{
				...defGameInfo.Sports,
				img: `${bannerImgUrl}/h5/img/home-page/Header/SBSW/sports/soccer.png`,
				spanTextKey: "lbl_Soccer",
				hasDesktopLink: true
			},
			// {
			// 	...defGameInfo.CryptoSports,
			// 	img: `${bannerImgUrl}/h5/img/hotgame/sports/cryptosports.png`,
			// 	spanTextKey: "lbl_CryptoSports",
			// 	eventIcon: [
			// 		{
			// 			icon: defIconType.new,
			// 			inPeriod: isEventPeriod(eventTime.sports_cryptoSports)
			// 		}
			// 	]
			// },
			{
				...defGameInfo.SBOSport,
				img: `${bannerImgUrl}/h5/img/home-page/Header/SBO/sports/sbobet.png`,
				spanText: "SBOBET",
				hasDesktopLink: true
			},
			{
				...defGameInfo.BTISport,
				img: `${bannerImgUrl}/h5/img/home-page/Header/BTI/sports/bti-sport.png`,
				spanTextKey: "lbl_BTISport",
				hasDesktopLink: true
			},
			{
				...defGameInfo.sports_IM,
				img: `${bannerImgUrl}/h5/img/home-page/Header/IM/sports/im-sports.png`,
				spanText: "IM Sports",
				hasDesktopLink: true,
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.IM)
					}
				]
			},
			// {
			// 	...defGameInfo.SabaSoccer,
			// 	img: `${bannerImgUrl}/h5/img/hotgame/sports/sabasoccer.png`,
			// 	spanTextKey: "lbl_SabaSoccer",
			// 	hasDesktopLink: true
			// },
			// {
			// 	...defGameInfo.eSports,
			// 	img: `${bannerImgUrl}/h5/img/hotgame/sports/e-sports.png`,
			// 	spanTextKey: "lbl_eSports"
			// },
			// {
			// 	...defGameInfo.Basketball,
			// 	img: `${bannerImgUrl}/h5/img/hotgame/sports/baseketball.png`,
			// 	spanTextKey: "lbl_Basketball",
			// 	hasDesktopLink: true
			// },
			// {
			// 	...defGameInfo.Volleyball,
			// 	img: `${bannerImgUrl}/h5/img/hotgame/sports/volleyball.png`,
			// 	spanTextKey: "lbl_Volleyball",
			// 	hasDesktopLink: true
			// },
			{
				...defGameInfo.VirtualSports,
				img: `${bannerImgUrl}/h5/img/home-page/Header/SBSW/sports/virtual-sports.png`,
				spanTextKey: "lbl_VirtualSports",
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.sports_virtualSports)
					}
				]
			}
		]
	},
	{
		category: "e-sport",
		translateKey: "lbl_eSports",
		img: `${bannerImgUrl}/h5/img/home-page/icon/btn-esports.svg`,
		items: [
			{
				...defGameInfo.eSports,
				img: `${bannerImgUrl}/h5/img/home-page/Header/SBSW/esports/saba.png`,
				spanTextKey: "lbl_Saba"
			},
			{
				...defGameInfo.eSports_IM,
				img: `${bannerImgUrl}/h5/img/home-page/Header/IM/esports/im-e-sports.png`,
				spanText: "IM E-Sports",
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.IM)
					}
				]
			},
			{
				...defGameInfo.eSports_TFGaming,
				img: `${bannerImgUrl}/h5/img/home-page/Header/TFG/esports/tfgaming.png`,
				spanTextKey: "lbl_TFGaming"
			}
		]
	},
	{
		category: "games",
		translateKey: "lbl_Games",
		img: `${bannerImgUrl}/h5/img/home-page/icon/btn-games.svg`,
		items: [
			{
				...defGameInfo.kingMaker,
				img: `${bannerImgUrl}/h5/img/home-page/Header/KM/games/king-maker.png`,
				spanTextKey: "lbl_KingMaker"
			},
			{
				...defGameInfo["93Connect"],
				img: `${bannerImgUrl}/h5/img/home-page/Header/NTConnect/games/93connect.png`,
				spanText: "93Connect",
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.game_93Connect)
					}
				]
			},
			{
				...defGameInfo.sabaClub,
				img: `${bannerImgUrl}/h5/img/home-page/Header/SBSW/games/vgaming.png`,
				spanTextKey: "lbl_Vgaming"
			},
			// {
			// 	...defGameInfo.MaxGame,
			// 	img: `${bannerImgUrl}/h5/img/hotgame/new-games/maxgame.png`,
			// 	spanText: "Max Game",
			// 	eventIcon: [
			// 		{
			// 			icon: defIconType.new,
			// 			inPeriod: isEventPeriod(eventTime.game_MaxGame)
			// 		}
			// 	]
			// },
			{
				...defGameInfo.V8Poker,
				img: `${bannerImgUrl}/h5/img/home-page/Header/V8/games/v8-poker.png`,
				spanTextKey: "lbl_V8Poker"
			},
			{
				...defGameInfo.tableGame,
				img: `${bannerImgUrl}/h5/img/home-page/Header/SBSW/games/table-game.png`,
				spanTextKey: "lbl_tableGame"
			},
			{
				...defGameInfo.VirtualGame,
				img: `${bannerImgUrl}/h5/img/hotgame/new-games/vir.png`,
				spanTextKey: "lbl_VirtualGames"
			},
			{
				...defGameInfo.IM_Avaitor,
				img: `${bannerImgUrl}/h5/img/home-page/Header/SPRIBE/games/aviator.png`,
				spanText: "Avaitor",
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.IM)
					}
				]
			},
			{
				...defGameInfo.IM_Mines,
				img: `${bannerImgUrl}/h5/img/home-page/Header/SPRIBE/games/mines.png`,
				spanText: "Mines",
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.IM)
					}
				]
			},
			{
				...defGameInfo.IM_Goal,
				img: `${bannerImgUrl}/h5/img/home-page/Header/SPRIBE/games/goal.png`,
				spanText: "Goal",
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.IM)
					}
				]
			},
			{
				...defGameInfo.IM_Dice,
				img: `${bannerImgUrl}/h5/img/home-page/Header/SPRIBE/games/dice.png`,
				spanText: "Dice",
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.IM)
					}
				]
			},
			{
				...defGameInfo.Spaceman,
				img: `${bannerImgUrl}/h5/img/home-page/Header/PP/games/spaceman.png`,
				spanText: "Spaceman"
			},
			{
				...defGameInfo.Crash,
				img: `${bannerImgUrl}/h5/img/home-page/Header/AP/games/crash.png`,
				spanText: "Crash"
			},
			{
				...defGameInfo.GoRush,
				img: `${bannerImgUrl}/h5/img/home-page/Header/JILI/games/go-rush.png`,
				spanText: "Go Rush"
			}
		]
	},
	{
		category: "fishing",
		translateKey: "lbl_Fishing",
		img: `${bannerImgUrl}/h5/img/home-page/icon/btn-fishing.svg`,
		items: [
			{
				...defGameInfo.FishingSG,
				img: `${bannerImgUrl}/h5/img/home-page/Header/SG/fishing/fishing-god.png`,
				spanTextKey: "lbl_FishingSG1"
			},
			{
				...defGameInfo.FishingSGW,
				img: `${bannerImgUrl}/h5/img/home-page/Header/SG/fishing/fishing-war.png`,
				spanTextKey: "lbl_FishingSG2"
			},
			{
				...defGameInfo.Fishing_Zombie_Party,
				img: `${bannerImgUrl}/h5/img/home-page/Header/SG/fishing/zombie-party.png`,
				spanTextKey: "lbl_Fishing_Zombie_Party",
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.Fishing_Zombie_Party)
					}
				]
			},
			{
				...defGameInfo.Fishing_Alien_Hunter,
				img: `${bannerImgUrl}/h5/img/home-page/Header/SG/fishing/alien-hunter.png`,
				spanTextKey: "lbl_Fishing_Alien_Hunter",
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.Fishing_Alien_Hunter)
					}
				]
			},
			{
				...defGameInfo.fish_AB3,
				img: `${bannerImgUrl}/h5/img/home-page/Header/CQ9/fishing/paradise.png`,
				spanTextKey: "lbl_Paradise"
			},
			{
				...defGameInfo.fish_AT01,
				img: `${bannerImgUrl}/h5/img/home-page/Header/CQ9/fishing/oneshot-fishing.png`,
				spanTextKey: "lbl_Oneshot_Fishing"
			}

			// {
			// 	...defGameInfo.Skywind_Ocean_Ruler,
			// 	img: `${bannerImgUrl}/h5/img/hotgame/fishing/fishing-or.png`,
			// 	spanTextKey: "Skywind_Ocean_Ruler",
			// 	eventIcon: [
			// 		{
			// 			icon: defIconType.new,
			// 			inPeriod: isEventPeriod(eventTime.skywind)
			// 		}
			// 	]
			// },
			// {
			// 	...defGameInfo.Skywind_Cai_Shen_Da_Hai,
			// 	img: `${bannerImgUrl}/h5/img/hotgame/fishing/fishing-cai.png`,
			// 	spanTextKey: "Skywind_Cai_Shen_Da_Hai",
			// 	eventIcon: [
			// 		{
			// 			icon: defIconType.new,
			// 			inPeriod: isEventPeriod(eventTime.skywind)
			// 		}
			// 	]
			// },
			// {
			// 	...defGameInfo.ICG_DRAGONBALL_FISHING,
			// 	img: `${bannerImgUrl}/h5/img/hotgame/fishing/fishing-dragonball.png`,
			// 	spanTextKey: "lbl_Game_ICG_DRAGONBALL_FISHING"
			// },
			// {
			// 	...defGameInfo.ICG_FISHING_OF_SAVIORS,
			// 	img: `${bannerImgUrl}/h5/img/hotgame/fishing/fishing-saviors.png`,
			// 	spanTextKey: "lbl_Game_ICG_FISHING_OF_SAVIORS"
			// },
			// {
			// 	...defGameInfo.ICG_THE_TYRANT_AND_THE_PRINCESS,
			// 	img: `${bannerImgUrl}/h5/img/hotgame/fishing/fishing-thetyrant.png`,
			// 	spanTextKey: "lbl_Game_ICG_THE_TYRANT_AND_THE_PRINCESS"
			// },
		]
	},
	{
		category: "lottery",
		translateKey: "lbl_Lottery",
		img: `${bannerImgUrl}/h5/img/home-page/icon/btn-lottery.svg`,
		items: [
			{
				...defGameInfo.GPI_VNLottery,
				img: `${bannerImgUrl}/h5/img/home-page/Header/GPI/lottery/vn-lottery.png`,
				spanTextKey: "GPI_VNLottery",
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.GPI_Lottery)
					}
				]
			},
			{
				...defGameInfo.tcg,
				img: `${bannerImgUrl}/h5/img/home-page/Header/TCG/lottery/tc-gaming.png`,
				spanTextKey: "lbl_tcg"
			},
			{
				...defGameInfo.Keno,
				img: `${bannerImgUrl}/h5/img/home-page/Header/SBSW/lottery/keno.png`,
				spanTextKey: "lbl_Keno"
			},
			{
				...defGameInfo.lottery,
				img: `${bannerImgUrl}/h5/img/home-page/Header/SBSW/lottery/lottery.png`,
				spanTextKey: "lbl_Lottery"
			}
		]
	},
	{
		category: "cockFighting",
		translateKey: "lbl_CockFighting",
		img: `${bannerImgUrl}/h5/img/home-page/icon/btn-cockfigting.svg`,
		items: [
			{
				...defGameInfo.GACockFighting,
				img: `${bannerImgUrl}/h5/img/home-page/Header/GA/cockfighting/cockfighting.png`,
				spanText: "GA Cock Fighting",
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.GA_CockFighting)
					}
				]
			}
		]
	},
	{
		category: "slots",
		translateKey: "lbl_Slots",
		img: `${bannerImgUrl}/h5/img/home-page/icon/btn-slots.svg`,
		items: [
			{
				...defGameInfo.Casino_PP,
				parameter: defGameInfo.Casino_PP,
				spanText: "Pragmatic Play",
				img: `${bannerImgUrl}/h5/img/home-page/Header/PP/slots/pragmatic-play.png`,
				path: path.casino.root,
				providerImgName: "pp"
			},

			{
				...defGameInfo.Casino_SG,
				parameter: defGameInfo.Casino_SG,
				spanText: "Spadegaming",
				img: `${bannerImgUrl}/h5/img/home-page/Header/SG/slots/spadegaming.png`,
				path: path.casino.root,
				providerImgName: "sg"
			},
			{
				...defGameInfo.Casino_AdvantPlay,
				parameter: defGameInfo.Casino_AdvantPlay,
				spanText: "AdvantPlay",
				img: `${bannerImgUrl}/h5/img/home-page/Header/AP/slots/advantplay.png`,
				path: path.casino.root,
				providerImgName: "ap"
			},
			{
				...defGameInfo.Casino_Amigo,
				parameter: defGameInfo.Casino_Amigo,
				spanText: "Amigo Gaming",
				img: `${bannerImgUrl}/h5/img/home-page/Header/Amigo/slots/amigo-gaming.png`,
				path: path.casino.root,
				providerImgName: "amigo",
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.casino_amigo)
					}
				]
			},
			{
				...defGameInfo.Casino_Endorphina,
				parameter: defGameInfo.Casino_Endorphina,
				spanText: "ES",
				img: `${bannerImgUrl}/h5/img/home-page/Header/ES/slots/es.png`,
				path: path.casino.root,
				providerImgName: "es",
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.casino_Endorphina)
					}
				]
			},
			{
				...defGameInfo.Casino_Nextspin,
				parameter: defGameInfo.Casino_Nextspin,
				spanText: "Nextspin",
				img: `${bannerImgUrl}/h5/img/home-page/Header/Nextspin/slots/nextspin.png`,
				path: path.casino.root,
				providerImgName: "nextspin",
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.casino_Nextspin)
					}
				]
			},
			{
				...defGameInfo.Casino_PG,
				parameter: defGameInfo.Casino_PG,
				spanText: "PG Soft",
				img: `${bannerImgUrl}/h5/img/home-page/Header/PG/slots/pg-soft.png`,
				path: path.casino.root,
				providerImgName: "pg"
			},
			{
				...defGameInfo.Casino_BNG,
				parameter: defGameInfo.Casino_BNG,
				spanText: "BNG",
				img: `${bannerImgUrl}/h5/img/home-page/Header/BNG/slots/bng.png`,
				path: path.casino.root,
				providerImgName: "",
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.slot_bng)
					}
				]
			},
			{
				...defGameInfo.Casino_FaChai,
				parameter: defGameInfo.Casino_FaChai,
				spanText: "Fa Chai",
				img: `${bannerImgUrl}/h5/img/home-page/Header/FaChai/slots/fachai.png`,
				path: path.casino.root,
				providerImgName: "",
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.slot_fachai)
					}
				]
			},
			{
				...defGameInfo.Casino_MGP,
				parameter: defGameInfo.Casino_MGP,
				spanText: "Microgaming",
				img: `${bannerImgUrl}/h5/img/home-page/Header/MG/slots/microgaming.png`,
				path: path.casino.root,
				providerImgName: "mg"
			},
			{
				...defGameInfo.Casino_Jili,
				parameter: defGameInfo.Casino_Jili,
				spanText: "Jili",
				img: `${bannerImgUrl}/h5/img/home-page/Header/JILI/slots/jili.png`,
				path: path.casino.root,
				providerImgName: "jili"
			},
			{
				...defGameInfo.Casino_SPRIBE,
				parameter: defGameInfo.Casino_SPRIBE,
				spanText: "SPRIBE",
				img: `${bannerImgUrl}/h5/img/home-page/Header/SPRIBE/slots/spribe.png`,
				path: path.casino.root,
				providerImgName: "spribe"
			},
			{
				...defGameInfo.Casino_NoLimitCity,
				parameter: defGameInfo.Casino_NoLimitCity,
				spanText: "NoLimit City",
				img: `${bannerImgUrl}/h5/img/home-page/Header/NLC/slots/nolimit-city.png`,
				path: path.casino.root,
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.slot_NoLimitCity)
					}
				]
			},
			{
				...defGameInfo.Casino_RedTiger,
				parameter: defGameInfo.Casino_RedTiger,
				spanText: "Red Tiger",
				img: `${bannerImgUrl}/h5/img/home-page/Header/RedTiger/slots/red-tiger.png`,
				path: path.casino.root,
				providerImgName: "rt"
			},
			{
				...defGameInfo.Casino_NetEnt,
				parameter: defGameInfo.Casino_NetEnt,
				spanText: "NetEnt",
				img: `${bannerImgUrl}/h5/img/home-page/Header/Netent/slots/netent.png`,
				path: path.casino.root,
				providerImgName: "ne"
			},
			{
				...defGameInfo.Casino_CQ9,
				parameter: defGameInfo.Casino_CQ9,
				spanText: "CQ9",
				img: `${bannerImgUrl}/h5/img/home-page/Header/CQ9/slots/cq9.png`,
				path: path.casino.root,
				providerImgName: "cq9"
			},
			{
				...defGameInfo.Casino_PNG,
				parameter: defGameInfo.Casino_PNG,
				spanText: "Play' n GO",
				img: `${bannerImgUrl}/h5/img/home-page/Header/PNG/slots/playn-go.png`,
				path: path.casino.root,
				providerImgName: "png",
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.PNG)
					}
				]
			},
			{
				...defGameInfo.Casino_GPI,
				parameter: defGameInfo.Casino_GPI,
				spanText: "Game Play",
				img: `${bannerImgUrl}/h5/img/home-page/Header/GPI/slots/game-play.png`,
				path: path.casino.root,
				providerImgName: "gpi"
			},
			{
				...defGameInfo.Casino_YGG,
				parameter: defGameInfo.Casino_YGG,
				spanText: "YGGDrassil",
				img: `${bannerImgUrl}/h5/img/home-page/Header/YGG/slots/yggdrassil.png`,
				path: path.casino.root,
				providerImgName: "yg"
			},
			{
				...defGameInfo.Casino_Habanero,
				parameter: defGameInfo.Casino_Habanero,
				spanText: "Habanero",
				img: `${bannerImgUrl}/h5/img/home-page/Header/HB/slots/habanero.png`,
				path: path.casino.root,
				providerImgName: "habanero"
			},
			{
				...defGameInfo.Casino_SimplePlay,
				parameter: defGameInfo.Casino_SimplePlay,
				spanText: "SimplePlay",
				img: `${bannerImgUrl}/h5/img/home-page/Header/SimplePlay/slots/simpleplay.png`,
				path: path.casino.root,
				providerImgName: "simpleplay",
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.casino_SimplePlay)
					}
				]
			},
			{
				...defGameInfo.Casino_Skywind,
				parameter: defGameInfo.Casino_Skywind,
				spanText: "Skywind",
				img: `${bannerImgUrl}/h5/img/home-page/Header/Skywind/slots/skywind.png`,
				path: path.casino.root,
				providerImgName: "sk",
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.skywind)
					}
				]
			},
			// 新的 PlayTech (Seamless Wallet)
			{
				...defGameInfo.Casino_PlayTech,
				parameter: defGameInfo.Casino_PlayTech,
				spanText: "PlayTech",
				img: `${bannerImgUrl}/h5/img/home-page/Header/PlayTech/slots/playtech.png`,
				path: path.casino.root,
				providerImgName: "pt"
			}
			// {
			// 	...defGameInfo.casino_ICG,
			// 	parameter: defGameInfo.casino_ICG,
			// 	spanText: "Astro Tech",
			// 	img: `${bannerImgUrl}/h5/img/hotgame/slots/slot-icg.png`,
			// 	path: path.casino.root,
			// 	providerImgName: "icg"
			// },
			// {
			// 	...defGameInfo.Casino_ow,
			// 	parameter: defGameInfo.Casino_ow,
			// 	spanText: "Saba Casino",
			// 	img: `${bannerImgUrl}/h5/img/hotgame/slots/slot-sc.png`
			// }
		]
	},
	{
		category: "livecasino",
		translateKey: "lbl_Live",
		img: `${bannerImgUrl}/h5/img/home-page/icon/btn-casino.svg`,
		items: [
			{
				...defGameInfo.LIVEcasinoPP,
				spanText: "Pragmatic Play",
				img: `${bannerImgUrl}/h5/img/home-page/Header/PP/casino/pragmatic-play.png`
			},
			{
				...defGameInfo.LIVECasinoWon,
				spanText: "Won Casino",
				img: `${bannerImgUrl}/h5/img/hotgame/livecasino/livecasino-woncasino.png`,
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.liveCasino_Won)
					}
				]
			},
			{
				...defGameInfo.LIVEcasinoBG,
				spanText: "Big Gaming",
				img: `${bannerImgUrl}/h5/img/home-page/Header/BG/casino/big-gaming.png`,
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.liveCasino_bg)
					}
				]
			},
			{
				...defGameInfo.LIVEcasinoYEEBET,
				spanText: "YEEBET",
				img: `${bannerImgUrl}/h5/img/home-page/Header/Yeebet/casino/yeebet-casino.png`,
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.yee_bet)
					}
				]
			},
			{
				...defGameInfo.LIVEcasinoSkywind,
				spanText: "Skywind",
				img: `${bannerImgUrl}/h5/img/home-page/Header/Skywind/casino/skywind.png`,
				eventIcon: [
					{
						icon: defIconType.new,
						inPeriod: isEventPeriod(eventTime.skywind)
					}
				]
			},
			{
				...defGameInfo.LIVEcasinoMG,
				spanText: "Microgaming",
				img: `${bannerImgUrl}/h5/img/home-page/Header/MG/casino/microgaming.png`
			},
			{
				...defGameInfo.LIVEcasinoEVO,
				spanText: "Evolution Gaming",
				img: `${bannerImgUrl}/h5/img/home-page/Header/EVO/casino/evolution-gaming.png`,
				tpGameType: 63
			},
			// 新的 PlayTech (Seamless Wallet)
			{
				...defGameInfo.LIVEcasino_PlayTech,
				spanText: "PlayTech",
				img: `${bannerImgUrl}/h5/img/home-page/Header/PlayTech/casino/playtech.png`
			},
			{
				...defGameInfo.LIVEcasinoWM,
				spanText: "WM Casino",
				img: `${bannerImgUrl}/h5/img/home-page/Header/WonCasino/casino/woncasino.png`
			},
			{
				...defGameInfo.LIVEcasinoDG,
				spanText: "Dream Gaming",
				img: `${bannerImgUrl}/h5/img/home-page/Header/DG/casino/dream-gaming.png`
			},
			{
				...defGameInfo.LIVEcasinoAE,
				spanText: "AE Sexy",
				img: `${bannerImgUrl}/h5/img/home-page/Header/Sexy/casino/ae-sexy.png`
			},
			{
				...defGameInfo.LIVEcasinoAG,
				spanText: "Asia Gaming",
				img: `${bannerImgUrl}/h5/img/home-page/Header/AG/casino/asia-gaming.png`
			},
			{
				...defGameInfo.LIVEcasinoAB,
				spanText: "Allbet",
				img: `${bannerImgUrl}/h5/img/home-page/Header/Allbet/casino/allbet.png`
			},
			{
				...defGameInfo.LIVEcasinoSA,
				spanText: "SA Gaming",
				img: `${bannerImgUrl}/h5/img/home-page/Header/SA/casino/sa-gaming.png`
			},
			{
				...defGameInfo.LIVEcasinoEB,
				spanText: "WE",
				img: `${bannerImgUrl}/h5/img/home-page/Header/WE/casino/we.png`
			}
		]
	}
];

export default gameList;
