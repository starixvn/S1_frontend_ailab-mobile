/* eslint-disable camelcase */
import { siteInfo, bannerImgUrl } from "../config";
import path from "../path";
import { defGameInfo } from "./productList";
import { isEventPeriod } from "../components/common/common";
import { eventTime } from "../components/common/eventTime";

export const defIconType = {
	live: " liveicon",
	new: " newicon",
	new_nav: " newicon",
	hot: " hoticon"
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
	PT: { tpId: 27, tpGameType: 46 },
	JILI: { tpId: 32, tpGameType: 53 },
	MG: { tpId: 34, tpGameType: 57 },
	NetEnt: { tpId: 37, tpGameType: 64 },
	RedTiger: { tpId: 38, tpGameType: 65 },
	AdvantPlay: { tpId: 39, tpGameType: 67 }
};

export const productList = langId => {
	return {
		worldCup: {
			category: "worldCup",
			event: true,
			path: path.worldCup.root,
			eventIcon: [
				{
					icon: defIconType.new,
					inPeriod: isEventPeriod(eventTime.worldCup_new)
				},
				{
					icon: defIconType.hot,
					inPeriod: isEventPeriod(eventTime.worldCup_hot)
				}
			]
		},
		sports: {
			category: "sports",
			displayKey: "lbl_Sports",
			icon_img: `${bannerImgUrl}/h5/img/gameicon/sport.png`,
			items: [
				{
					displayKey: "lbl_FIFAWorldCup",
					img: `${bannerImgUrl}/h5/img/sport/fifa.png`,
					...defGameInfo.WorldCup,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.worldCup_new)
						},
						{
							icon: defIconType.hot,
							inPeriod: isEventPeriod(eventTime.worldCup_hot)
						}
					]
				},
				{
					displayKey: "lbl_SabaSport",
					img: `${bannerImgUrl}/h5/img/sport/sabasport.png`,
					...defGameInfo.Sports
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
					]
				},
				{
					displayKey: "lbl_BTISport",
					img: `${bannerImgUrl}/h5/img/sport/btisport.png`,
					...defGameInfo.BTISport,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.new_BTI)
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
			category: "play",
			displayKey: "lbl_Games",
			icon_img: `${bannerImgUrl}/h5/img/gameicon/games.png`,
			items: [
				{
					displayKey: "lbl_tcg",
					img: `${bannerImgUrl}/h5/img/lottery/lottery-tcg.png`,
					...defGameInfo.tcg,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.tcg)
						}
					]
				},
				{
					displayKey: "lbl_V8Poker",
					img: `${bannerImgUrl}/h5/img/lottery/lottery-v8poker.png`,
					...defGameInfo.V8Poker
				},
				{
					...defGameInfo.kingMaker,
					img: `${bannerImgUrl}/h5/img/lottery/lottery-kingmaker.png`,
					displayKey: "lbl_KingMaker",
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.new_Km)
						}
					]
				},
				{
					displayKey: "lbl_TraditionalLottery",
					img: `${bannerImgUrl}/h5/img/lottery/lottery-tl.png`,
					...defGameInfo.One789_lottery
				},
				{
					displayKey: "lbl_789Lottery",
					img: `${bannerImgUrl}/h5/img/lottery/lottery-789.png`,
					...defGameInfo.One789_lottery_789
				},
				{
					displayKey: "lbl_Vgaming",
					img: `${bannerImgUrl}/h5/img/lottery/lottery-saba.png`,
					...defGameInfo.sabaClub
				},
				{
					displayKey: "lbl_Keno",
					img: `${bannerImgUrl}/h5/img/lottery/lottery-keno.png`,
					...defGameInfo.Keno
				},
				{
					displayKey: "lbl_Lottery",
					img: `${bannerImgUrl}/h5/img/lottery/lottery-lottery.png`,
					...defGameInfo.lottery
				},
				{
					displayKey: "lbl_tableGame",
					img: `${bannerImgUrl}/h5/img/lottery/lottery-table.png`,
					...defGameInfo.tableGame,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.tableGame)
						}
					]
				},
				{
					displayKey: "lbl_VirtualGames",
					img: `${bannerImgUrl}/h5/img/lottery/virtual.png`,
					...defGameInfo.VirtualGame,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.game_virtualGame)
						}
					]
				}
			]
		},
		eSports: {
			category: "virtualsports",
			displayKey: "lbl_eSports",
			...defGameInfo.eSports,
			icon_img: `${bannerImgUrl}/h5/img/gameicon/esport.png`
		},
		casino: {
			category: "slot",
			displayKey: "lbl_Slots",
			icon_img: `${bannerImgUrl}/h5/img/gameicon/slot.png`,
			items: [
				{
					...defGameInfo.Casino_AdvantPlay,
					parameter: defGameInfo.Casino_AdvantPlay,
					path: path.casino.root,
					displayText: "AdvantPlay",
					img: `${bannerImgUrl}/h5/img/slot/ap.png`,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.casino_AdvantPlay)
						}
					]
				},
				{
					...defGameInfo.Casino_PP,
					parameter: defGameInfo.Casino_PP,
					path: path.casino.root,
					icon: "icon icon-PP",
					displayText: "Pragmatic Play",
					img: `${bannerImgUrl}/h5/img/slot/pp.png`
				},
				{
					...defGameInfo.Casino_Habanero,
					parameter: defGameInfo.Casino_Habanero,
					path: path.casino.root,
					displayText: "Habanero",
					img: `${bannerImgUrl}/h5/img/slot/ho.png`,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.casino_Habanero)
						}
					]
				},
				{
					...defGameInfo.Casino_NetEnt,
					parameter: defGameInfo.Casino_NetEnt,
					path: path.casino.root,
					displayText: "NetEnt",
					img: `${bannerImgUrl}/h5/img/slot/ne.png`,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.casino_NetEnt)
						}
					]
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
					...defGameInfo.Casino_PT,
					parameter: defGameInfo.Casino_PT,
					path: path.casino.root,
					img: `${bannerImgUrl}/h5/img/slot/pt.png`,
					icon: "icon icon-pt",
					displayText: "PlayTech"
				},
				{
					...defGameInfo.casino_ICG,
					parameter: defGameInfo.casino_ICG,
					path: path.casino.root,
					img: `${bannerImgUrl}/h5/img/slot/icg.png`,
					icon: "icon icon-ICG",
					displayText: "Astro Tech"
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
					...defGameInfo.Casino_SG,
					parameter: defGameInfo.Casino_SG,
					path: path.casino.root,
					img: `${bannerImgUrl}/h5/img/slot/sg.png`,
					icon: "icon icon-SG",
					displayText: "Spadegaming"
				},
				{
					...defGameInfo.Casino_RedTiger,
					parameter: defGameInfo.Casino_RedTiger,
					path: path.casino.root,
					displayText: "Red Tiger",
					img: `${bannerImgUrl}/h5/img/slot/red.png`,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.casino_RedTiger)
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
					...defGameInfo.Casino_ow,
					parameter: defGameInfo.Casino_ow,
					img: `${bannerImgUrl}/h5/img/slot/ow.png`,
					icon: "icon icon-OW",
					displayText: "Saba Casino"
				}
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
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.liveCasino_pp)
						}
					],
					...defGameInfo.LIVEcasinoPP
				},
				{
					displayText: "Microgaming",
					icon: "icon icon-mg",
					img: `${bannerImgUrl}/h5/img/liveGameNew/live-mg.png`,
					...defGameInfo.LIVEcasinoMG,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.liveCasino_mg)
						}
					]
				},
				{
					displayText: "Evolution Gaming",
					img: `${bannerImgUrl}/h5/img/liveGameNew/live-evo.png`,
					...defGameInfo.LIVEcasinoEVO,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.liveCasino_evo)
						}
					]
				},
				{
					displayText: "Playtech",
					icon: "icon icon-pt",
					img: `${bannerImgUrl}/h5/img/liveGameNew/live-pt.png`,
					...defGameInfo.LIVEcasinoPT,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.liveCasino_pt)
						}
					],
					useGotoGame: true
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
			category: "game",
			displayKey: "lbl_Fishing",
			icon_img: `${bannerImgUrl}/h5/img/gameicon/fish.png`,
			items: [
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
					displayKey: "lbl_Game_ICG_DRAGONBALL_FISHING",
					img: `${bannerImgUrl}/h5/img/fish/fish-db.png`,
					icon: "icon icon-ICG",
					...defGameInfo.ICG_DRAGONBALL_FISHING
				},
				{
					displayKey: "lbl_Game_ICG_FISHING_OF_SAVIORS",
					img: `${bannerImgUrl}/h5/img/fish/fish-fos.png`,
					icon: "icon icon-ICG",
					...defGameInfo.ICG_FISHING_OF_SAVIORS
				},
				{
					displayKey: "lbl_Game_ICG_THE_TYRANT_AND_THE_PRINCESS",
					img: `${bannerImgUrl}/h5/img/fish/fish-ttatp.png`,
					icon: "icon icon-ICG",
					...defGameInfo.ICG_THE_TYRANT_AND_THE_PRINCESS
				},
				{
					displayKey: "lbl_FishingGG",
					icon: "icon icon-gg",
					img: `${bannerImgUrl}/h5/img/fish/fish-fworld.png`,
					...defGameInfo.Fishing
				},
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
				displayText: "SBOBET",
				...defGameInfo.sportSbo
			},
			{
				displayKey: "lbl_BTISport",
				...defGameInfo.BTISport
			}
		]
	},
	{
		displayKey: "lbl_Games",
		icon: "icon icon-kelo",
		subItems: [
			{
				...defGameInfo.tcg,
				displayKey: "lbl_tcg"
			},
			{
				...defGameInfo.sabaClub,
				displayKey: "lbl_Vgaming"
			},
			{
				displayKey: "lbl_TraditionalLottery",
				...defGameInfo.One789_lottery
			},
			{
				displayKey: "lbl_789Lottery",
				...defGameInfo.One789_lottery_789
			},
			{
				...defGameInfo.kingMaker,
				displayKey: "lbl_KingMaker"
			},
			{
				...defGameInfo.V8Poker,
				displayKey: "lbl_V8Poker"
			},
			{
				...defGameInfo.Keno,
				displayKey: "lbl_Keno"
			},
			{
				...defGameInfo.lottery,
				displayKey: "lbl_Lottery"
			},
			{
				...defGameInfo.tableGame,
				displayKey: "lbl_tableGame"
			}
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
			{
				...defGameInfo.ICG_DRAGONBALL_FISHING,
				displayKey: "lbl_Game_ICG_DRAGONBALL_FISHING"
			},
			{
				...defGameInfo.ICG_FISHING_OF_SAVIORS,
				displayKey: "lbl_Game_ICG_FISHING_OF_SAVIORS"
			},
			{
				...defGameInfo.ICG_THE_TYRANT_AND_THE_PRINCESS,
				displayKey: "lbl_Game_ICG_THE_TYRANT_AND_THE_PRINCESS"
			},
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
		...defGameInfo.eSports,
		displayKey: "lbl_eSports",
		icon: "icon icon-e-sports"
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
				...defGameInfo.LIVEcasinoPT,
				displayText: "Playtech"
			},
			{
				...defGameInfo.LIVEcasinoMG,
				displayKey: "Microgaming"
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
				...defGameInfo.LIVEcasinoDG,
				displayText: "Dream Gaming"
			},
			{
				...defGameInfo.LIVEcasinoAE,
				displayText: "AE Sexy"
			},
			{
				...defGameInfo.LIVEcasinoAG,
				displayText: "Asia Gaming"
			},
			{
				...defGameInfo.LIVEcasinoAB,
				displayText: "Allbet"
			},
			{
				...defGameInfo.LIVEcasinoSA,
				displayText: "SA Gaming"
			},
			{
				...defGameInfo.LIVEcasinoEB,
				displayText: "eBET"
			}
			// {
			// 	...defGameInfo.LIVEcasinoEVO,
			// 	displayText: "Evolution Gaming"
			// }
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
