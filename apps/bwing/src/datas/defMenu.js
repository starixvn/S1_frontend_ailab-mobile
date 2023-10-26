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
	new: " newicon",
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
	Endorphina: { tpId: 49, tpGameType: 98 }
};

export const productList = langId => {
	return {
		cryptoSports: {
			category: "cryptoSports",
			link: true,
			type: openGameType.entPage,
			...defGameInfo.CryptoSports,
			icon_img: `${bannerImgUrl}/h5/img/gameicon/cryptosports.png`,
			eventIcon: [
				{
					icon: defIconType.new,
					inPeriod: isEventPeriod(eventTime.sports_cryptoSports)
				}
			]
		},
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
				{
					displayKey: "lbl_CryptoSports",
					img: `${bannerImgUrl}/h5/img/sport/cryptosports.png`,
					...defGameInfo.CryptoSports,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(
								eventTime.sports_cryptoSports
							)
						}
					]
				},
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
					img: `${bannerImgUrl}/h5/img/new-game/king.png`,
					displayKey: "lbl_KingMaker"
				},
				{
					displayKey: "lbl_Vgaming",
					img: `${bannerImgUrl}/h5/img/new-game/vgamimg.png`,
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
					img: `${bannerImgUrl}/h5/img/new-game/v8.png`,
					...defGameInfo.V8Poker
				},
				{
					displayKey: "lbl_tableGame",
					img: `${bannerImgUrl}/h5/img/new-game/table.png`,
					...defGameInfo.tableGame
				},
				{
					displayText: "Avaitor",
					img: `${bannerImgUrl}/h5/img/new-game/spribe-aviator.png`,
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
					img: `${bannerImgUrl}/h5/img/new-game/spribe-mines.png`,
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
					img: `${bannerImgUrl}/h5/img/new-game/spribe-goal.png`,
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
					img: `${bannerImgUrl}/h5/img/new-game/spribe-dice.png`,
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
					img: `${bannerImgUrl}/h5/img/new-game/pp.png`,
					displayText: "Spaceman"
				},
				{
					...defGameInfo.Crash,
					img: `${bannerImgUrl}/h5/img/new-game/ap.png`,
					displayText: "Crash"
				},
				{
					...defGameInfo.GoRush,
					img: `${bannerImgUrl}/h5/img/new-game/jili.png`,
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
					displayKey: "lbl_Saba",
					img: `${bannerImgUrl}/h5/img/esport/saba.png`,
					...defGameInfo.eSports
				},
				{
					displayText: "IM E-Sports",
					img: `${bannerImgUrl}/h5/img/esport/inplaymatrix.png`,
					...defGameInfo.eSports_IM,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.IM)
						}
					]
				},
				{
					displayKey: "lbl_TFGaming",
					img: `${bannerImgUrl}/h5/img/esport/tfg.png`,
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
					displayText: "Endorphina",
					img: `${bannerImgUrl}/h5/img/slot/endorphina.png`,
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
					...defGameInfo.Casino_PNG,
					parameter: defGameInfo.Casino_PNG,
					path: path.casino.root,
					img: `${bannerImgUrl}/h5/img/slot/playngo.png`,
					icon: "icon icon-png",
					displayText: "Play'n GO",
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
			displayKey: "lbl_LiveCasino",
			icon_img: `${bannerImgUrl}/h5/img/gameicon/live.png`,
			items: [
				{
					displayText: "Pragmatic Play",
					icon: "icon icon-PP",
					img: `${bannerImgUrl}/h5/img/liveGameNew/live-pp.png`,
					...defGameInfo.LIVEcasinoPP
				},
				{
					displayText: "Big Gaming",
					icon: "icon icon-bg",
					img: `${bannerImgUrl}/h5/img/liveGameNew/live-bg.png`,
					...defGameInfo.LIVEcasinoBG,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.liveCasino_bg)
						}
					]
				},
				{
					displayText: "YEEBET",
					icon: "icon icon-sk",
					img: `${bannerImgUrl}/h5/img/liveGameNew/live-yb.png`,
					...defGameInfo.LIVEcasinoYEEBET,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.yee_bet)
						}
					]
				},
				{
					displayText: "Skywind",
					icon: "icon icon-sk",
					img: `${bannerImgUrl}/h5/img/liveGameNew/live-sk.png`,
					...defGameInfo.LIVEcasinoSkywind,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.skywind)
						}
					]
				},
				{
					displayText: "Microgaming",
					icon: "icon icon-mg",
					img: `${bannerImgUrl}/h5/img/liveGameNew/live-mg.png`,
					...defGameInfo.LIVEcasinoMG
				},
				{
					displayText: "Evolution Gaming",
					img: `${bannerImgUrl}/h5/img/liveGameNew/live-evo.png`,
					...defGameInfo.LIVEcasinoEVO
				},
				// 新的 PlayTech (Seamless Wallet)
				{
					displayText: "PlayTech",
					icon: "icon icon-pt",
					img: `${bannerImgUrl}/h5/img/liveGameNew/live-pt.png`,
					...defGameInfo.LIVEcasinoPlaytech
				},
				{
					displayText: "n2-LIVE",
					img: `${bannerImgUrl}/h5/img/liveGameNew/live-n2live.png`,
					...defGameInfo.LIVEcasinoN2
				},
				{
					displayKey: "lbl_liveCasino_789SeDie",
					img: `${bannerImgUrl}/h5/img/liveGameNew/live-one789.png`,
					...defGameInfo.LIVEcasinoOne789
				},
				{
					displayText: "WM Casino",
					img: `${bannerImgUrl}/h5/img/liveGameNew/live-wm.png`,
					...defGameInfo.LIVEcasinoWM
				},
				{
					displayText: "Asia Gaming",
					img: `${bannerImgUrl}/h5/img/liveGameNew/live-ag.png`,
					...defGameInfo.LIVEcasinoAG
				},
				{
					displayText: "AE Sexy",
					icon: "icon icon-AE",
					img: `${bannerImgUrl}/h5/img/liveGameNew/live-ae.png`,
					...defGameInfo.LIVEcasinoAE
				},
				{
					displayText: "Dream Gaming",
					img: `${bannerImgUrl}/h5/img/liveGameNew/live-dg.png`,
					...defGameInfo.LIVEcasinoDG
				},
				{
					displayText: "Allbet",
					img: `${bannerImgUrl}/h5/img/liveGameNew/live-ab.png`,
					...defGameInfo.LIVEcasinoAB
				},
				{
					displayText: "eBET",
					img: `${bannerImgUrl}/h5/img/liveGameNew/live-ebet.png`,
					...defGameInfo.LIVEcasinoEB
				},
				{
					displayText: "SA Gaming",
					img: `${bannerImgUrl}/h5/img/liveGameNew/live-sa.png`,
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
					img: `${bannerImgUrl}/h5/img/fish/fish-fg.png`,
					...defGameInfo.Fishing_SG
				},
				{
					displayKey: "lbl_FishingSG2",
					icon: "icon icon-SG",
					img: `${bannerImgUrl}/h5/img/fish/fish-fwar.png`,
					...defGameInfo.Fishing_SGW
				},
				{
					displayKey: "lbl_Fishing_Zombie_Party",
					icon: "icon icon-SG",
					img: `${bannerImgUrl}/h5/img/fish/fish-zp.png`,
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
					img: `${bannerImgUrl}/h5/img/fish/fish-ah.png`,
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
					img: `${bannerImgUrl}/h5/img/fish/fish-paradise.png`,
					icon: "icon icon-cq9",
					...defGameInfo.Fishing_AB3
				},
				{
					displayKey: "lbl_Oneshot_Fishing",
					img: `${bannerImgUrl}/h5/img/fish/fish-tos.png`,
					icon: "icon icon-cq9",
					...defGameInfo.Fishing_AT01
				},
				{
					displayKey: "lbl_FishingGG",
					icon: "icon icon-gg",
					img: `${bannerImgUrl}/h5/img/fish/fish-fworld.png`,
					...defGameInfo.Fishing
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
					displayKey: "GPI_VNLottery",
					img: `${bannerImgUrl}/h5/img/new-lottery/lottery-vn.png`,
					...defGameInfo.GPI_VNLottery,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.GPI_Lottery)
						}
					]
				},
				{
					displayKey: "lbl_tcg",
					img: `${bannerImgUrl}/h5/img/new-lottery/lottery-tcg.png`,
					...defGameInfo.tcg
				},
				{
					displayKey: "lbl_TraditionalLottery",
					img: `${bannerImgUrl}/h5/img/new-lottery/lottery-tl.png`,
					...defGameInfo.One789_lottery
				},
				// {
				// 	displayKey: "lbl_789Lottery",
				// 	img: `${bannerImgUrl}/h5/img/lottery/lottery-789.png`,
				// 	...defGameInfo.One789_lottery_789
				// },
				{
					displayKey: "lbl_Keno",
					img: `${bannerImgUrl}/h5/img/new-lottery/lottery-keno.png`,
					...defGameInfo.Keno
				},
				{
					displayKey: "lbl_Lottery",
					img: `${bannerImgUrl}/h5/img/new-lottery/lottery-lottery.png`,
					...defGameInfo.lottery
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

export const defSubMenus = () => [
	{
		displayKey: "lbl_Sports",
		icon: "icon icon-sports",
		subItems: [
			{
				displayKey: "lbl_SabaSport",
				...defGameInfo.Sports
			},
			{
				displayKey: "lbl_CryptoSports",
				...defGameInfo.CryptoSports
			},
			{
				displayText: "SBOBET",
				...defGameInfo.sportSbo
			},
			{
				displayKey: "lbl_BTISport",
				...defGameInfo.BTISport
			},
			{
				displayKey: "lbl_VirtualSports",
				...defGameInfo.VirtualSports
			}
		]
	},
	{
		displayKey: "lbl_Games",
		icon: "icon icon-kelo",
		subItems: [
			{
				...defGameInfo.kingMaker,
				displayKey: "lbl_KingMaker"
			},
			{
				...defGameInfo.sabaClub,
				displayKey: "lbl_Vgaming"
			},
			// {
			// 	...defGameInfo.MaxGame,
			// 	displayText: "Max Game"
			// },
			{
				...defGameInfo.V8Poker,
				displayKey: "lbl_V8Poker"
			},
			{
				...defGameInfo.tableGame,
				displayKey: "lbl_tableGame"
			}
			// {
			// 	...defGameInfo.VirtualGame,
			// 	displayKey: "lbl_VirtualGames"
			// }
		]
	},
	{
		displayKey: "lbl_Fishing",
		icon: "icon icon-game",
		subItems: [
			{
				...defGameInfo.Fishing_AB3,
				displayKey: "lbl_Paradise"
			},
			{
				...defGameInfo.Fishing_AT01,
				displayKey: "lbl_Oneshot_Fishing"
			},
			// {
			// 	...defGameInfo.ICG_DRAGONBALL_FISHING,
			// 	displayKey: "lbl_Game_ICG_DRAGONBALL_FISHING"
			// },
			// {
			// 	...defGameInfo.ICG_FISHING_OF_SAVIORS,
			// 	displayKey: "lbl_Game_ICG_FISHING_OF_SAVIORS"
			// },
			// {
			// 	...defGameInfo.ICG_THE_TYRANT_AND_THE_PRINCESS,
			// 	displayKey: "lbl_Game_ICG_THE_TYRANT_AND_THE_PRINCESS"
			// },
			{
				...defGameInfo.Fishing,
				displayKey: "lbl_FishingGG"
			},
			{
				...defGameInfo.Fishing_SG,
				displayKey: "lbl_FishingSG1"
			},
			{
				...defGameInfo.Fishing_SGW,
				displayKey: "lbl_FishingSG2"
			}
		]
	},
	{
		displayKey: "lbl_Lottery",
		// icon: "icon icon-kelo",
		subItems: [
			{
				...defGameInfo.GPI_VNLottery,
				displayKey: "GPI_VNLottery"
			},
			{
				...defGameInfo.tcg,
				displayKey: "lbl_tcg"
			},
			{
				displayKey: "lbl_TraditionalLottery",
				...defGameInfo.One789_lottery
			},
			// {
			// 	displayKey: "lbl_789Lottery",
			// 	...defGameInfo.One789_lottery_789
			// },
			{
				...defGameInfo.Keno,
				displayKey: "lbl_Keno"
			},
			{
				...defGameInfo.lottery,
				displayKey: "lbl_Lottery"
			}
		]
	},
	{
		...defGameInfo.eSports,
		displayKey: "lbl_eSports",
		icon: "icon icon-e-sports",
		subItems: [
			{
				...defGameInfo.eSports,
				displayKey: "lbl_Saba"
			},
			{
				...defGameInfo.eSports_TFGaming,
				displayKey: "lbl_TFGaming"
			}
		]
	},
	{
		displayKey: "lbl_Slots",
		path: `/${path.casino.root}`,
		icon: "icon icon-casino"
	},
	{
		displayKey: "lbl_LiveCasino",
		icon: "icon icon-livecasino",
		subItems: [
			{
				...defGameInfo.LIVEcasinoPP,
				displayText: "Pragmatic Play"
			},
			{
				...defGameInfo.LIVEcasinoBG,
				displayText: "Big Gaming"
			},
			{
				...defGameInfo.LIVEcasinoYEEBET,
				displayText: "YEEBET"
			},
			{
				...defGameInfo.LIVEcasinoSkywind,
				displayText: "Skywind"
			},
			{
				...defGameInfo.LIVEcasinoMG,
				displayText: "Microgaming"
			},
			{
				...defGameInfo.LIVEcasinoEVO,
				displayText: "Evolution Gaming"
			},
			{
				...defGameInfo.LIVEcasinoPT,
				displayText: "Playtech"
			},
			{
				...defGameInfo.LIVEcasinoN2,
				displayText: "n2-LIVE"
			},
			{
				displayKey: "lbl_liveCasino_789SeDie",
				...defGameInfo.LIVEcasinoOne789
			},
			{
				...defGameInfo.LIVEcasinoWM,
				displayText: "WM Casino"
			},
			{
				...defGameInfo.LIVEcasinoAG,
				displayText: "Asia Gaming"
			},
			{
				...defGameInfo.LIVEcasinoAE,
				displayText: "AE Sexy"
			},
			{
				...defGameInfo.LIVEcasinoDG,
				displayText: "Dream Gaming"
			},
			// {
			// 	...defGameInfo.LIVEcasinoAB,
			// 	displayText: "Allbet"
			// },
			{
				...defGameInfo.LIVEcasinoEB,
				displayText: "eBET"
			},
			{
				...defGameInfo.LIVEcasinoSA,
				displayText: "SA Gaming"
			}
		]
	},
	{
		displayKey: "lbl_Promotions",
		path: `/${path.promotion.root}`,
		icon: "icon icon-gift"
	},
	{
		displayKey: "lbl_APP_DOWNLOAD",
		path: `/${path.appDownload.root}`,
		icon: "icon icon-mobile"
	},
	{
		displayKey: "lbl_VIP",
		path: `/${path.vip.root}`,
		icon: "icon icon-vip"
	}
];
