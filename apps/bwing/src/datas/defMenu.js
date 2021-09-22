/* eslint-disable camelcase */
import { siteInfo } from "../config";
import path from "../path";
import { defGameInfo } from "./productList";
import { isEventPeriod } from "../components/common/common";
import { eventTime } from "../components/common/eventTime";

import game_SabaClub from "../styles/img/lottery/lottery-saba.png";
import game_Keno from "../styles/img/lottery/lottery-keno.png";
import game_Lottery from "../styles/img/lottery/lottery-lottery.png";
import game_One789Lottery from "../styles/img/lottery/lottery-789.png";
import traditionalLottery from "../styles/img/lottery/lottery-tl.png";
import game_V8Poker from "../styles/img/lottery/lottery-v8poker.png";
import game_tcg from "../styles/img/lottery/lottery-TCG.png";

import fishing_GG from "../styles/img/fish/fish-fworld.png";
import fishing_SG from "../styles/img/fish/fish-fg.png";
import fishing_SGwar from "../styles/img/fish/fish-fwar.png";
import fishing_ICG_DB from "../styles/img/fish/fish-db.png";
import fishing_ICG_FOS from "../styles/img/fish/fish-fos.png";
import fishing_ICG_TTATP from "../styles/img/fish/fish-ttatp.png";
import fishing_ICG_TOS from "../styles/img/fishingICG-TOS.png";
import fishing_CQ9_AB3 from "../styles/img/fish/fish-Paradise.png";
import fishing_CQ9_AT05 from "../styles/img/luckyfishing.png";
import fishing_CQ9_AT01 from "../styles/img/fish/fish-tos.png";
import fishing_CQ9_AT06 from "../styles/img/watermarginfishing.png";
import fishing_CQ9_AT04 from "../styles/img/thunderfighter.png";

import liveCasino_One789 from "../styles/img/liveGameNew/live-one789.png";
import liveCasino_WM from "../styles/img/liveGameNew/live-wm.png";
import liveCasino_AG from "../styles/img/liveGameNew/live-ag.png";
import liveCasino_PP from "../styles/img/liveGameNew/live-pp.png";
import liveCasino_AE from "../styles/img/liveGameNew/live-ae.png";
import liveCasino_DG from "../styles/img/liveGameNew/live-dg.png";
import liveCasino_AB from "../styles/img/liveGameNew/live-ab.png";
import liveCasino_EB from "../styles/img/liveGameNew/live-ebet.png";
import liveCasino_SA from "../styles/img/liveGameNew/live-sa.png";
import liveCasino_N2 from "../styles/img/liveGameNew/live-n2live.png";
import liveCasino_PT from "../styles/img/liveGameNew/live-pt.png";

import sabaSports from "../styles/img/sport/sabaSport.png";
import BTI from "../styles/img/sport/BtiSport.png";

import kingMaker from "../styles/img/lottery/lottery-kingmaker.png";

export const defIconType = {
	live: " liveIcon",
	new: " newicon",
	new_nav: " icon icon-newicon"
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
	MG: { tpId: 34, tpGameType: 57 }
};

export const productList = langId => {
	return {
		sports: {
			displayKey: "lbl_Sports",
			path: path.sports.root,
			items: [
				{
					displayKey: "lbl_SabaSport",
					img: sabaSports,
					...defGameInfo.Sports,
					tpGameType: 1
				},
				{
					displayKey: "lbl_BTISport",
					img: BTI,
					...defGameInfo.BTISport,
					tpGameType: 49,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.new_BTI)
						}
					]
				}
			]
		},
		game: {
			displayKey: "lbl_Games",
			path: path.games.root,
			items: [
				{
					displayKey: "lbl_tcg",
					img: game_tcg,
					...defGameInfo.tcg,
					tpGameType: 55,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.tcg)
						}
					]
				},
				{
					displayKey: "lbl_V8Poker",
					img: game_V8Poker,
					...defGameInfo.V8Poker,
					tpGameType: 42
				},
				{
					...defGameInfo.kingMaker,
					img: kingMaker,
					displayKey: "lbl_KingMaker",
					tpGameType: 52,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.new_Km)
						}
					]
				},
				{
					displayKey: "lbl_TraditionalLottery",
					img: traditionalLottery,
					...defGameInfo.One789_lottery,
					tpGameType: 35
				},
				{
					displayKey: "lbl_789Lottery",
					img: game_One789Lottery,
					...defGameInfo.One789_lottery_789,
					tpGameType: 36
				},
				{
					displayKey: "lbl_Vgaming",
					img: game_SabaClub,
					...defGameInfo.sabaClub,
					tpGameType: 59
				},
				{
					displayKey: "lbl_Keno",
					img: game_Keno,
					...defGameInfo.Keno,
					tpGameType: 5
				},
				{
					displayKey: "lbl_Lottery",
					img: game_Lottery,
					...defGameInfo.lottery,
					tpGameType: 25
				}
			]
		},
		eSports: {
			displayKey: "lbl_eSports",
			...defGameInfo.eSports,
			tpGameType: 1
		},
		casino: {
			displayKey: "lbl_Slots",
			path: path.casino.root,
			eventIcon: [
				{
					icon: defIconType.new,
					inPeriod: isEventPeriod(eventTime.casino_MGP)
				}
			]
		},
		liveCasino: {
			displayKey: "lbl_LiveCasino",
			path: path.liveCasino.root,
			items: [
				// {
				// 	displayKey: "Microgaming",
				// 	icon: "icon icon-mg",
				// 	img: liveCasino_MGP,
				// 	...defGameInfo.Casino_MGP,
				// 	tpGameType: 58,
				// 	eventIcon: [
				// 		{
				// 			icon: defIconType.new,
				// 			inPeriod: isEventPeriod(eventTime.liveCasino_MGP)
				// 		}
				// 	]
				// },

				{
					displayKey: "Pragmatic Play",
					icon: "icon icon-PP",
					img: liveCasino_PP,
					...defGameInfo.LIVEcasinoPP,
					tpGameType: 16
				},
				{
					displayKey: "Playtech",
					icon: "icon icon-pt",
					img: liveCasino_PT,
					...defGameInfo.Casino_PT,
					tpGameType: 48,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.liveCasino_pt)
						}
					],
					useGotoGame: true
				},
				{
					displayKey: "n2-LIVE",
					img: liveCasino_N2,
					...defGameInfo.LIVEcasinoN2,
					tpGameType: 45
				},
				{
					displayKey: "lbl_liveCasino_789SeDie",
					img: liveCasino_One789,
					...defGameInfo.LIVEcasinoOne789,
					tpGameType: 37
				},
				{
					displayKey: "WM Casino",
					img: liveCasino_WM,
					...defGameInfo.LIVEcasinoWM,
					tpGameType: 32
				},
				{
					displayKey: "Asia Gaming",
					img: liveCasino_AG,
					tpGameType: 8
				},
				{
					displayKey: "AE Casino",
					icon: "icon icon-AE",
					img: liveCasino_AE,
					...defGameInfo.LIVEcasinoAE,
					tpGameType: 18
				},
				{
					displayKey: "Dream Gaming",
					img: liveCasino_DG,
					...defGameInfo.LIVEcasinoDG,
					tpGameType: 10
				},
				{
					displayKey: "Allbet",
					img: liveCasino_AB,
					...defGameInfo.LIVEcasinoAB,
					tpGameType: 6
				},
				{
					displayKey: "eBET",
					img: liveCasino_EB,
					...defGameInfo.LIVEcasinoEB,
					tpGameType: 28
				},
				{
					displayKey: "SA Gaming",
					img: liveCasino_SA,
					...defGameInfo.LIVEcasinoSA,
					tpGameType: 9
				}
			]
		},
		fishing: {
			displayKey: "lbl_Fishing",
			path: path.fishing.root,
			items: [
				{
					displayKey: "lbl_Paradise",
					img: fishing_CQ9_AB3,
					icon: "icon icon-cq9",
					...defGameInfo.Fishing_AB3,
					tpGameType: 44
				},
				{
					displayKey: "lbl_Oneshot_Fishing",
					img: fishing_CQ9_AT01,
					icon: "icon icon-cq9",
					...defGameInfo.Fishing_AT01,
					tpGameType: 44
				},
				{
					displayKey: "lbl_Game_ICG_DRAGONBALL_FISHING",
					img: fishing_ICG_DB,
					icon: "icon icon-ICG",
					...defGameInfo.ICG_DRAGONBALL_FISHING,
					tpGameType: 40
				},
				{
					displayKey: "lbl_Game_ICG_FISHING_OF_SAVIORS",
					img: fishing_ICG_FOS,
					icon: "icon icon-ICG",
					...defGameInfo.ICG_FISHING_OF_SAVIORS,
					tpGameType: 40
				},
				{
					displayKey: "lbl_Game_ICG_THE_TYRANT_AND_THE_PRINCESS",
					img: fishing_ICG_TTATP,
					icon: "icon icon-ICG",
					...defGameInfo.ICG_THE_TYRANT_AND_THE_PRINCESS,
					tpGameType: 40
				},
				{
					displayKey: "lbl_FishingGG",
					icon: "icon icon-gg",
					img: fishing_GG,
					...defGameInfo.Fishing,
					tpGameType: 12
				},
				{
					displayKey: "lbl_FishingSG1",
					icon: "icon icon-SG",
					img: fishing_SG,
					...defGameInfo.Fishing_SG,
					tpGameType: 31
				},
				{
					displayKey: "lbl_FishingSG2",
					icon: "icon icon-SG",
					img: fishing_SGwar,
					...defGameInfo.Fishing_SGW,
					tpGameType: 31
				}
			]
		},
		promotion: {
			displayKey: "lbl_Promotions",
			path: path.promotion.root
		},
		affiliate: {
			displayKey: "lbl_Affiliates",
			href: siteInfo(langId).affiliateLink
		},
		vip: {
			displayKey: "lbl_VIP",
			path: path.vip.root
		}
		// ranking: {
		// 	displayKey: "lbl_Ranking",
		// 	path: path.leaderBoard.root
		// }
	};
};
