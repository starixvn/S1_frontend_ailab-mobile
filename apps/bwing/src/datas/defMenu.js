/* eslint-disable camelcase */
import { isDateRange } from "@ailab-mobile/common";
import { siteInfo, bannerImgUrl } from "../config";
import path from "../path";
import { defGameInfo } from "./productList";
import { isEventPeriod } from "../components/common/common";
import { eventTime } from "../components/common/eventTime";
import { angPaoEventPeriod } from "../pages/angpao";

export const defIconType = {
	live: " liveicon",
	new: " tag-new-pop",
	new_nav: " newicon",
	hot: " hoticon"
};

export const openGameType = {
	entPage: "entPage",
	Link: "Link",
	LinkOrBtn: "LinkOrBtn",
	useGoToGame: "useGoToGame"
};

export const defSlotTpGameType = {
	Saba: { tpId: 1, tpGameType: 4 },
	PP: { tpId: 5, tpGameType: 7 },
	GPI: { tpId: 6, tpGameType: 11 },
	Joker: { tpId: 9, tpGameType: 13 },
	YGG: { tpId: 8, tpGameType: 14 },
	SG: { tpId: 10, tpGameType: 15 },
	PG: { tpId: 14, tpGameType: 17 },
	CQ9: { tpId: 16, tpGameType: 29 },
	Iconic: { tpId: 24, tpGameType: 39 },
	// 新的 PlayTech (Seamless Wallet)
	PlayTech: { tpId: 51, tpGameType: 100 },
	JILI: { tpId: 32, tpGameType: 53 },
	MG: { tpId: 34, tpGameType: 57 },
	NetEnt: { tpId: 37, tpGameType: 64 },
	RedTiger: { tpId: 38, tpGameType: 65 },
	AdvantPlay: { tpId: 39, tpGameType: 67 },
	SimplePlay: { tpId: 44, tpGameType: 86 },
	Nextspin: { tpId: 50, tpGameType: 99 },
	SPRIBE: { tpId: 53, tpGameType: 104 },
	Endorphina: { tpId: 49, tpGameType: 98 },
	FaChai: { tpId: 55, tpGameType: 106 },
	NoLimitCity: { tpId: 59, tpGameType: 111 }
};

export const productList = langId => {
	return {
		// cryptoSports: {
		// 	category: "cryptoSports",
		// 	link: true,
		// 	type: openGameType.entPage,
		// 	...defGameInfo.CryptoSports,
		// 	icon_img: `${bannerImgUrl}/h5/img/gameicon/cryptosports.png`,
		// 	eventIcon: [
		// 		{
		// 			icon: defIconType.new,
		// 			inPeriod: isEventPeriod(eventTime.sports_cryptoSports)
		// 		}
		// 	]
		// },
		wheel: {
			category: "wheel",
			icon_img: `${bannerImgUrl}/h5/img/event/wheel/eventlink-top.png`,
			className: "event",
			path: `luckyWheel`,
			link: true,
			type: openGameType.Link,
			isEventPeriod: !isDateRange(angPaoEventPeriod)
		},
		sports: {
			category: "sports",
			displayKey: "lbl_Sports",
			icon_img: `${bannerImgUrl}/h5/img/gameicon/sport.png`,
			items: [
				{
					displayKey: "lbl_SabaSport",
					img: `${bannerImgUrl}/h5/img/sport/sabasport.png`,
					...defGameInfo.Sports,
					hasDesktopLink: true
				},
				// {
				// 	displayKey: "lbl_CryptoSports",
				// 	img: `${bannerImgUrl}/h5/img/sport/cryptosports.png`,
				// 	...defGameInfo.CryptoSports,
				// 	eventIcon: [
				// 		{
				// 			icon: defIconType.new,
				// 			inPeriod: isEventPeriod(
				// 				eventTime.sports_cryptoSports
				// 			)
				// 		}
				// 	]
				// },
				{
					displayText: "SBOBET",
					img: `${bannerImgUrl}/h5/img/sport/sbobet.png`,
					...defGameInfo.sportSbo,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.sportSbo)
						}
					],
					hasDesktopLink: true
				},
				{
					displayKey: "lbl_BTISport",
					img: `${bannerImgUrl}/h5/img/sport/btisport.png`,
					...defGameInfo.BTISport,
					hasDesktopLink: true
				},
				{
					displayText: "IM Sports",
					img: `${bannerImgUrl}/h5/img/sport/inplaymatrix.png`,
					...defGameInfo.eSports_IM,
					hasDesktopLink: true,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.IM)
						}
					]
				},
				{
					displayKey: "lbl_VirtualSports",
					img: `${bannerImgUrl}/h5/img/sport/virtualSport.png`,
					...defGameInfo.VirtualSports,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(
								eventTime.sports_virtualSports
							)
						}
					]
				}
			]
		},
		game: {
			category: "game",
			displayKey: "lbl_Games",
			icon_img: `${bannerImgUrl}/h5/img/gameicon/games.png`,
			items: [
				{
					...defGameInfo.kingMaker,
					img: `${bannerImgUrl}/h5/img/4.0/lobby/games/king.png`,
					displayKey: "lbl_KingMaker"
				},
				{
					...defGameInfo["93Connect"],
					img: `${bannerImgUrl}/h5/img/4.0/lobby/games/93connect.png`,
					displayText: "93Connect",
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.game_93Connect)
						}
					]
				},
				{
					displayKey: "lbl_Vgaming",
					img: `${bannerImgUrl}/h5/img/4.0/lobby/games/vgaming.png`,
					...defGameInfo.sabaClub
				},
				// {
				// 	displayText: "Max Game",
				// 	img: `${bannerImgUrl}/h5/img/new-game/max.png`,
				// 	...defGameInfo.MaxGame,
				// 	eventIcon: [
				// 		{
				// 			icon: defIconType.new,
				// 			inPeriod: isEventPeriod(eventTime.game_MaxGame)
				// 		}
				// 	]
				// },
				{
					displayKey: "lbl_V8Poker",
					img: `${bannerImgUrl}/h5/img/4.0/lobby/games/v8.png`,
					...defGameInfo.V8Poker
				},
				{
					displayKey: "lbl_tableGame",
					img: `${bannerImgUrl}/h5/img/4.0/lobby/games/table.png`,
					...defGameInfo.tableGame
				},
				{
					displayText: "Avaitor",
					img: `${bannerImgUrl}/h5/img/4.0/lobby/games/spribe-aviator.png`,
					...defGameInfo.IM_Avaitor,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.IM)
						}
					]
				},
				{
					displayText: "Mines",
					img: `${bannerImgUrl}/h5/img/4.0/lobby/games/spribe-mines.png`,
					...defGameInfo.IM_Mines,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.IM)
						}
					]
				},
				{
					displayText: "Goal",
					img: `${bannerImgUrl}/h5/img/4.0/lobby/games/spribe-goal.png`,
					...defGameInfo.IM_Goal,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.IM)
						}
					]
				},
				{
					displayText: "Dice",
					img: `${bannerImgUrl}/h5/img/4.0/lobby/games/spribe-dice.png`,
					...defGameInfo.IM_Dice,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.IM)
						}
					]
				},
				{
					...defGameInfo.Spaceman,
					img: `${bannerImgUrl}/h5/img/4.0/lobby/games/pp.png`,
					displayText: "Spaceman"
				},
				{
					...defGameInfo.Crash,
					img: `${bannerImgUrl}/h5/img/4.0/lobby/games/ap.png`,
					displayText: "Crash"
				},
				{
					...defGameInfo.GoRush,
					img: `${bannerImgUrl}/h5/img/4.0/lobby/games/jili.png`,
					displayText: "Go Rush"
				}
				// {
				// 	displayKey: "lbl_VirtualGames",
				// 	img: `${bannerImgUrl}/h5/img/new-game/virtual.png`,
				// 	...defGameInfo.VirtualGame
				// }
			]
		},
		eSports: {
			category: "virtualsports",
			displayKey: "lbl_eSports",
			...defGameInfo.eSports,
			icon_img: `${bannerImgUrl}/h5/img/gameicon/esport.png`,
			items: [
				{
					// displayKey: "lbl_Saba",
					img: `${bannerImgUrl}/h5/img/4.0/lobby/esports/saba.png`,
					...defGameInfo.eSports
				},
				{
					// displayText: "IM E-Sports",
					img: `${bannerImgUrl}/h5/img/4.0/lobby/esports/inplaymatrix.png`,
					...defGameInfo.eSports_IM,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.IM)
						}
					]
				},
				{
					// displayKey: "lbl_TFGaming",
					img: `${bannerImgUrl}/h5/img/4.0/lobby/esports/tfg.png`,
					...defGameInfo.eSports_TFGaming
				}
			]
		},
		casino: {
			category: "slot",
			displayKey: "lbl_Slots",
			icon_img: `${bannerImgUrl}/h5/img/gameicon/slot.png`,
			items: [
				{
					...defGameInfo.Casino_PP,
					parameter: defGameInfo.Casino_PP,
					path: path.casino.root,
					icon: "icon icon-PP",
					displayText: "Pragmatic Play",
					img: `${bannerImgUrl}/h5/img/slot/pp.png`
				},
				{
					...defGameInfo.Casino_SG,
					parameter: defGameInfo.Casino_SG,
					path: path.casino.root,
					img: `${bannerImgUrl}/h5/img/slot/sg.png`,
					icon: "icon icon-SG",
					displayText: "Spadegaming"
				},
				{
					...defGameInfo.Casino_AdvantPlay,
					parameter: defGameInfo.Casino_AdvantPlay,
					path: path.casino.root,
					displayText: "AdvantPlay",
					img: `${bannerImgUrl}/h5/img/slot/apnew.png`
				},
				{
					...defGameInfo.Casino_Endorphina,
					parameter: defGameInfo.Casino_Endorphina,
					path: path.casino.root,
					displayText: "ES",
					img: `${bannerImgUrl}/h5/img/4.0/slot/es.png`
				},
				{
					...defGameInfo.Casino_Nextspin,
					parameter: defGameInfo.Casino_Nextspin,
					path: path.casino.root,
					displayText: "Nextspin",
					img: `${bannerImgUrl}/h5/img/slot/nextspin.png`,
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
					img: `${bannerImgUrl}/h5/img/slot/pg.png`,
					path: path.casino.root,
					icon: "icon icon-PG",
					displayText: "PG Soft"
				},
				// * bwing 改版中，因此先不做(目前沒有圖)
				// {
				// 	...defGameInfo.Casino_FaChai,
				// 	parameter: defGameInfo.Casino_FaChai,
				// 	img: `${bannerImgUrl}/h5/img/slot/pg.png`,
				// 	path: path.casino.root,
				// 	icon: "icon icon-PG",
				// 	displayText: "Fa Chai",
				// 	eventIcon: [
				// 		{
				// 			icon: defIconType.new,
				// 			inPeriod: isEventPeriod(eventTime.slot_fachai)
				// 		}
				// 	]
				// },
				{
					...defGameInfo.Casino_MGP,
					parameter: defGameInfo.Casino_MGP,
					path: path.casino.root,
					img: `${bannerImgUrl}/h5/img/slot/mg.png`,
					icon: "icon icon-mg",
					displayText: "Microgaming"
				},
				{
					...defGameInfo.Casino_Jili,
					parameter: defGameInfo.Casino_Jili,
					path: path.casino.root,
					img: `${bannerImgUrl}/h5/img/slot/jili.png`,
					icon: "icon icon-jili",
					displayText: "JILI"
				},
				{
					...defGameInfo.Casino_SPRIBE,
					parameter: defGameInfo.Casino_SPRIBE,
					path: path.casino.root,
					img: `${bannerImgUrl}/h5/img/slot/spribe.png`,
					icon: "icon icon-SPRIBE",
					displayText: "SPRIBE",
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.IM)
						}
					]
				},
				{
					...defGameInfo.Casino_NoLimitCity,
					parameter: defGameInfo.Casino_NoLimitCity,
					path: path.casino.root,
					displayText: "NoLimit City",
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
					path: path.casino.root,
					displayText: "Red Tiger",
					img: `${bannerImgUrl}/h5/img/slot/red.png`
				},
				{
					...defGameInfo.Casino_NetEnt,
					parameter: defGameInfo.Casino_NetEnt,
					path: path.casino.root,
					displayText: "NetEnt",
					img: `${bannerImgUrl}/h5/img/slot/ne.png`
				},
				{
					...defGameInfo.Casino_CQ9,
					parameter: defGameInfo.Casino_CQ9,
					path: path.casino.root,
					img: `${bannerImgUrl}/h5/img/slot/cq9.png`,
					icon: "icon icon-cq9",
					displayText: "CQ9"
				},
				{
					...defGameInfo.Casino_GPI,
					parameter: defGameInfo.Casino_GPI,
					path: path.casino.root,
					img: `${bannerImgUrl}/h5/img/slot/gpi.png`,
					icon: "icon icon-GPI",
					displayText: "Game Play"
				},
				{
					...defGameInfo.Casino_YGG,
					parameter: defGameInfo.Casino_YGG,
					path: path.casino.root,
					img: `${bannerImgUrl}/h5/img/slot/ygg.png`,
					icon: "icon icon-YGG",
					displayText: "YGGDrassil"
				},
				{
					...defGameInfo.Casino_Habanero,
					parameter: defGameInfo.Casino_Habanero,
					path: path.casino.root,
					displayText: "Habanero",
					img: `${bannerImgUrl}/h5/img/slot/ho.png`
				},
				{
					...defGameInfo.Casino_SimplePlay,
					parameter: defGameInfo.Casino_SimplePlay,
					path: path.casino.root,
					displayText: "SimplePlay",
					img: `${bannerImgUrl}/h5/img/slot/simpleplay.png`,
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
					path: path.casino.root,
					displayText: "Skywind",
					img: `${bannerImgUrl}/h5/img/slot/sk.png`,
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
					path: path.casino.root,
					img: `${bannerImgUrl}/h5/img/slot/pt.png`,
					icon: "icon icon-pt",
					displayText: "PlayTech"
				},
				{
					...defGameInfo.Casino_FaChai,
					parameter: defGameInfo.Casino_FaChai,
					path: path.casino.root,
					img: `${bannerImgUrl}/h5/img/slot/fachai.png`,
					displayText: "Fachai",
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.slot_Fachai)
						}
					]
				},
				{
					...defGameInfo.Casino_BNG,
					parameter: defGameInfo.Casino_BNG,
					path: path.casino.root,
					img: `${bannerImgUrl}/h5/img/slot/bng.png`,
					displayText: "BNG",
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.slot_BNG)
						}
					]
				},
				{
					...defGameInfo.Casino_PNG,
					parameter: defGameInfo.Casino_PNG,
					path: path.casino.root,
					img: `${bannerImgUrl}/h5/img/slot/png.png`,
					displayText: "Play' n GO",
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.slot_PNG)
						}
					]
				}
				// {
				// 	...defGameInfo.casino_ICG,
				// 	parameter: defGameInfo.casino_ICG,
				// 	path: path.casino.root,
				// 	img: `${bannerImgUrl}/h5/img/slot/icg.png`,
				// 	icon: "icon icon-ICG",
				// 	displayText: "Astro Tech"
				// },
				// {
				// 	...defGameInfo.Casino_ow,
				// 	parameter: defGameInfo.Casino_ow,
				// 	img: `${bannerImgUrl}/h5/img/slot/ow.png`,
				// 	icon: "icon icon-OW",
				// 	displayText: "Saba Casino"
				// }
			]
		},
		liveCasino: {
			category: "livecasino",
			// displayKey: "lbl_LiveCasino",
			icon_img: `${bannerImgUrl}/h5/img/4.0/gameicon/live.png`,
			items: [
				{
					// displayText: "Pragmatic Play",
					icon: "icon icon-PP",
					img: `${bannerImgUrl}/h5/img/4.0/lobby/livecasino/live-pp.png`,
					...defGameInfo.LIVEcasinoPP
				},
				{
					// displayText: "Won Casino",
					icon: "icon icon-woncasino",
					img: `${bannerImgUrl}/h5/img/4.0/lobby/livecasino/woncasino.png`,
					...defGameInfo.LIVECasinoWon,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.liveCasino_Won)
						}
					]
				},
				{
					// displayText: "Big Gaming",
					icon: "icon icon-bg",
					img: `${bannerImgUrl}/h5/img/4.0/lobby/livecasino/live-bg.png`,
					...defGameInfo.LIVEcasinoBG,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.liveCasino_bg)
						}
					]
				},
				{
					// displayText: "YEEBET",
					icon: "icon icon-sk",
					img: `${bannerImgUrl}/h5/img/4.0/lobby/livecasino/live-yb.png`,
					...defGameInfo.LIVEcasinoYEEBET,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.yee_bet)
						}
					]
				},
				{
					// displayText: "Skywind",
					icon: "icon icon-sk",
					img: `${bannerImgUrl}/h5/img/4.0/lobby/livecasino/live-sk.png`,
					...defGameInfo.LIVEcasinoSkywind,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.skywind)
						}
					]
				},
				{
					// displayText: "Microgaming",
					icon: "icon icon-mg",
					img: `${bannerImgUrl}/h5/img/4.0/lobby/livecasino/live-mg.png`,
					...defGameInfo.LIVEcasinoMG
				},
				{
					// displayText: "Evolution Gaming",
					img: `${bannerImgUrl}/h5/img/4.0/lobby/livecasino/live-evo.png`,
					...defGameInfo.LIVEcasinoEVO
				},
				// 新的 PlayTech (Seamless Wallet)
				{
					// displayText: "PlayTech",
					icon: "icon icon-pt",
					img: `${bannerImgUrl}/h5/img/4.0/lobby/livecasino/live-pt.png`,
					...defGameInfo.LIVEcasinoPlaytech
				},
				{
					// displayKey: "lbl_liveCasino_789SeDie",
					img: `${bannerImgUrl}/h5/img/4.0/lobby/livecasino/live-one789.png`,
					...defGameInfo.LIVEcasinoOne789
				},
				{
					// displayText: "WM Casino",
					img: `${bannerImgUrl}/h5/img/4.0/lobby/livecasino/live-wm.png`,
					...defGameInfo.LIVEcasinoWM
				},
				{
					// displayText: "Asia Gaming",
					img: `${bannerImgUrl}/h5/img/4.0/lobby/livecasino/live-ag.png`,
					...defGameInfo.LIVEcasinoAG
				},
				{
					// displayText: "AE Sexy",
					icon: "icon icon-AE",
					img: `${bannerImgUrl}/h5/img/4.0/lobby/livecasino/live-ae.png`,
					...defGameInfo.LIVEcasinoAE
				},
				{
					// displayText: "Dream Gaming",
					img: `${bannerImgUrl}/h5/img/4.0/lobby/livecasino/live-dg.png`,
					...defGameInfo.LIVEcasinoDG
				},
				{
					// displayText: "Allbet",
					img: `${bannerImgUrl}/h5/img/4.0/lobby/livecasino/live-ab.png`,
					...defGameInfo.LIVEcasinoAB
				},
				{
					// displayText: "eBET",
					img: `${bannerImgUrl}/h5/img/4.0/lobby/livecasino/we.png`,
					...defGameInfo.LIVEcasinoEB
				},
				{
					// displayText: "SA Gaming",
					img: `${bannerImgUrl}/h5/img/4.0/lobby/livecasino/live-sa.png`,
					...defGameInfo.LIVEcasinoSA
				}
			]
		},
		fishing: {
			category: "fishing",
			displayKey: "lbl_Fishing",
			icon_img: `${bannerImgUrl}/h5/img/gameicon/fish.png`,
			items: [
				{
					displayKey: "lbl_FishingSG1",
					icon: "icon icon-SG",
					img: `${bannerImgUrl}/h5/img/4.0/lobby/fishing/fish-fg.png`,
					...defGameInfo.Fishing_SG
				},
				{
					displayKey: "lbl_FishingSG2",
					icon: "icon icon-SG",
					img: `${bannerImgUrl}/h5/img/4.0/lobby/fishing/fish-fwar.png`,
					...defGameInfo.Fishing_SGW
				},
				{
					displayKey: "lbl_Fishing_Zombie_Party",
					icon: "icon icon-SG",
					img: `${bannerImgUrl}/h5/img/4.0/lobby/fishing/fish-zp.png`,
					...defGameInfo.Fishing_Zombie_Party,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(
								eventTime.Fishing_Zombie_Party
							)
						}
					]
				},
				{
					displayKey: "lbl_Fishing_Alien_Hunter",
					icon: "icon icon-SG",
					img: `${bannerImgUrl}/h5/img/4.0/lobby/fishing/fish-ah.png`,
					...defGameInfo.Fishing_Alien_Hunter,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(
								eventTime.Fishing_Alien_Hunter
							)
						}
					]
				},
				{
					displayKey: "lbl_Paradise",
					img: `${bannerImgUrl}/h5/img/4.0/lobby/fishing/fish-paradise.png`,
					icon: "icon icon-cq9",
					...defGameInfo.Fishing_AB3
				},
				{
					displayKey: "lbl_Oneshot_Fishing",
					img: `${bannerImgUrl}/h5/img/4.0/lobby/fishing/fish-of.png`,
					icon: "icon icon-cq9",
					...defGameInfo.Fishing_AT01
				}
				// {
				// 	displayKey: "Skywind_Ocean_Ruler",
				// 	img: `${bannerImgUrl}/h5/img/fish/fish-or.png`,
				// 	icon: "icon icon-sk",
				// 	...defGameInfo.Skywind_Ocean_Ruler,
				// 	eventIcon: [
				// 		{
				// 			icon: defIconType.new,
				// 			inPeriod: isEventPeriod(eventTime.skywind)
				// 		}
				// 	]
				// },
				// {
				// 	displayKey: "Skywind_Cai_Shen_Da_Hai",
				// 	img: `${bannerImgUrl}/h5/img/fish/fish-cai.png`,
				// 	icon: "icon icon-sk",
				// 	...defGameInfo.Skywind_Cai_Shen_Da_Hai,
				// 	eventIcon: [
				// 		{
				// 			icon: defIconType.new,
				// 			inPeriod: isEventPeriod(eventTime.skywind)
				// 		}
				// 	]
				// },
				// {
				// 	displayKey: "lbl_Game_ICG_DRAGONBALL_FISHING",
				// 	img: `${bannerImgUrl}/h5/img/fish/fish-db.png`,
				// 	icon: "icon icon-ICG",
				// 	...defGameInfo.ICG_DRAGONBALL_FISHING
				// },
				// {
				// 	displayKey: "lbl_Game_ICG_FISHING_OF_SAVIORS",
				// 	img: `${bannerImgUrl}/h5/img/fish/fish-fos.png`,
				// 	icon: "icon icon-ICG",
				// 	...defGameInfo.ICG_FISHING_OF_SAVIORS
				// },
				// {
				// 	displayKey: "lbl_Game_ICG_THE_TYRANT_AND_THE_PRINCESS",
				// 	img: `${bannerImgUrl}/h5/img/fish/fish-ttatp.png`,
				// 	icon: "icon icon-ICG",
				// 	...defGameInfo.ICG_THE_TYRANT_AND_THE_PRINCESS
				// },
			]
		},
		lottery: {
			category: "lottery",
			displayKey: "lbl_Lottery",
			icon_img: `${bannerImgUrl}/h5/img/gameicon/lottery.png`,
			items: [
				{
					// displayKey: "GPI_VNLottery",
					img: `${bannerImgUrl}/h5/img/4.0/lobby/lottery/lottery-vn.png`,
					...defGameInfo.GPI_VNLottery,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.GPI_Lottery)
						}
					]
				},
				{
					// displayKey: "lbl_tcg",
					img: `${bannerImgUrl}/h5/img/4.0/lobby/lottery/lottery-tcg.png`,
					...defGameInfo.tcg
				},
				{
					// displayKey: "lbl_TraditionalLottery",
					img: `${bannerImgUrl}/h5/img/4.0/lobby/lottery/lottery-789.png`,
					...defGameInfo.One789_lottery
				},
				// {
				// 	displayKey: "lbl_789Lottery",
				// 	img: `${bannerImgUrl}/h5/img/lottery/lottery-789.png`,
				// 	...defGameInfo.One789_lottery_789
				// },
				{
					// displayKey: "lbl_Keno",
					img: `${bannerImgUrl}/h5/img/4.0/lobby/lottery/lottery-keno.png`,
					...defGameInfo.Keno
				},
				{
					// displayKey: "lbl_Lottery",
					img: `${bannerImgUrl}/h5/img/4.0/lobby/lottery/lottery-lottery.png`,
					...defGameInfo.lottery
				}
			]
		},
		cockFighting: {
			category: "cockFighting",
			displayText: "CockFighting",
			path: path.cockFighting.root,
			icon_img: `${bannerImgUrl}/h5/img/gameicon/wcc-cockfighting.png`,
			items: [
				{
					// displayKey: "lbl_CockFighting",
					img: `${bannerImgUrl}/h5/img/4.0/lobby/cockfighting/wcc-cockfighting.png`,
					...defGameInfo.WCC_CockFighting,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.WCC_CockFighting)
						}
					]
				}
			]
		},
		promotion: {
			category: "promotion",
			displayKey: "lbl_Promotions",
			path: path.promotion.root,
			icon_img: `${bannerImgUrl}/h5/img/gameicon/promo.png`,
			eventIcon: [
				{
					icon: defIconType.hot,
					inPeriod: isEventPeriod(eventTime.promo)
				}
			]
		},
		affiliate: {
			category: "affiliate",
			displayKey: "lbl_Affiliates",
			icon_img: `${bannerImgUrl}/h5/img/gameicon/affiliates.png`,
			href: siteInfo(langId).affiliateLink
		},
		vip: {
			category: "vip",
			displayKey: "lbl_VIP",
			icon_img: `${bannerImgUrl}/h5/img/gameicon/vip.png`,
			path: path.vip.root
		}
		// ranking: {
		// 	displayKey: "lbl_Ranking",
		// 	path: path.leaderBoard.root
		// }
	};
};

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
	}
];
