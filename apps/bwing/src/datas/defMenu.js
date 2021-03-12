/* eslint-disable camelcase */
import { siteInfo } from "../config";
import path from "../path";
import { defGameInfo } from "./productList";
import { isEventPeriod } from "../components/common/common";

import game_SabaClub from "../styles/img/sabaclub.png";
import game_Keno from "../styles/img/keno.png";
import game_Lottery from "../styles/img/Lottery.png";
import game_One789Lottery from "../styles/img/one789.png";
import game_One789LotteryTra from "../styles/img/lotteryTra.png";
import game_V8Poker from "../styles/img/lotteryV8.png";

import fishing_GG from "../styles/img/fishingGG.png";
import fishing_SG from "../styles/img/fishingSG.png";
import fishing_SGwar from "../styles/img/fishingSGwar.png";
import fishing_ICG_DB from "../styles/img/fishingICG-DB.png";
import fishing_ICG_FOS from "../styles/img/fishingICG-FOS.png";
import fishing_ICG_TTATP from "../styles/img/fishingICG-TTATP.png";
import fishing_ICG_TOS from "../styles/img/fishingICG-TOS.png";
import fishing_CQ9_AB3 from "../styles/img/paradise.png";
import fishing_CQ9_AT05 from "../styles/img/luckyfishing.png";
import fishing_CQ9_AT01 from "../styles/img/oneshot-fishing.png";
import fishing_CQ9_AT06 from "../styles/img/watermarginfishing.png";
import fishing_CQ9_AT04 from "../styles/img/thunderfighter.png";

import liveCasino_One789 from "../styles/img/liveGame/liveGame9.png";
import liveCasino_WM from "../styles/img/liveGame/liveGame1.png";
import liveCasino_AG from "../styles/img/liveGame/liveGame2.png";
import liveCasino_PP from "../styles/img/liveGame/liveGame3.png";
import liveCasino_AE from "../styles/img/liveGame/liveGame4.png";
import liveCasino_DG from "../styles/img/liveGame/liveGame5.png";
import liveCasino_AB from "../styles/img/liveGame/liveGame6.png";
import liveCasino_EB from "../styles/img/liveGame/liveGame7.png";
import liveCasino_SA from "../styles/img/liveGame/liveGame8.png";

export const defIconType = {
	live: " liveIcon",
	new: " newicon",
	new_nav: " icon icon-newicon"
};

const eventTime = {
	ranking: { startDate: "2021/01/01 12:00:00" },
	new_one789: { endDate: "2021/01/22 11:00:00" },
	new_V8Poker: { endDate: "2021/03/05 23:59:59" },
	new_ICG: { endDate: "2021/02/05 11:00:00" },
	new_CQ9_fishing: { endDate: "2021/03/05 11:00:00" },
	new_vip: { startDate: "2021/03/11 12:00:00" }
};

export const productList = langId => {
	return {
		sports: {
			displayKey: "lbl_Sports",
			...defGameInfo.Sports
		},
		game: {
			displayKey: "lbl_Games",
			path: path.games.root,
			items: [
				{
					displayKey: "lbl_V8Poker",
					img: game_V8Poker,
					...defGameInfo.V8Poker,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.new_V8Poker)
						}
					]
				},
				{
					displayKey: "lbl_TraditionalLottery",
					img: game_One789LotteryTra,
					...defGameInfo.One789_lottery,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.new_one789)
						}
					]
				},
				{
					displayKey: "lbl_789Lottery",
					img: game_One789Lottery,
					...defGameInfo.One789_lottery_789,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.new_one789)
						}
					]
				},
				{
					displayKey: "lbl_SabaClub",
					img: game_SabaClub,
					...defGameInfo.sabaClub
				},
				{
					displayKey: "lbl_Keno",
					img: game_Keno,
					...defGameInfo.Keno
				},
				{
					displayKey: "lbl_Lottery",
					img: game_Lottery,
					...defGameInfo.lottery
				}
			]
		},
		eSports: {
			displayKey: "lbl_eSports",
			...defGameInfo.eSports
		},
		casino: {
			displayKey: "lbl_Slots",
			path: path.casino.root,
			eventIcon: [
				{
					icon: defIconType.new_nav,
					inPeriod: isEventPeriod(eventTime.new_ICG)
				}
			]
		},
		liveCasino: {
			displayKey: "lbl_LiveCasino",
			path: path.liveCasino.root,
			items: [
				{
					displayKey: "lbl_liveCasino_789SeDie",
					icon: "icon icon-one789",
					img: liveCasino_One789,
					...defGameInfo.LIVEcasinoOne789,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.new_one789)
						}
					]
				},
				{
					displayKey: "WM",
					icon: "icon icon-WM",
					img: liveCasino_WM,
					...defGameInfo.LIVEcasinoWM
				},
				{
					displayKey: "AG",
					icon: "icon icon-AG",
					img: liveCasino_AG,
					...defGameInfo.LIVEcasinoAG
				},
				{
					displayKey: "PP",
					icon: "icon icon-PP",
					img: liveCasino_PP,
					...defGameInfo.LIVEcasinoPP
				},
				{
					displayKey: "AE",
					icon: "icon icon-AE",
					img: liveCasino_AE,
					...defGameInfo.LIVEcasinoAE
				},
				{
					displayKey: "DG",
					icon: "icon icon-DG",
					img: liveCasino_DG,
					...defGameInfo.LIVEcasinoDG
				},
				{
					displayKey: "AB",
					icon: "icon icon-AB",
					img: liveCasino_AB,
					...defGameInfo.LIVEcasinoAB
				},
				{
					displayKey: "eBET",
					icon: "icon icon-EB",
					img: liveCasino_EB,
					...defGameInfo.LIVEcasinoEB
				},
				{
					displayKey: "SA",
					icon: "icon icon-SA",
					img: liveCasino_SA,
					...defGameInfo.LIVEcasinoSA
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
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.new_CQ9_fishing)
						}
					]
				},
				// {
				// 	displayKey: "lbl_Lucky_Fishing",
				// 	img: fishing_CQ9_AT05,
				// 	icon: "icon icon-cq9",
				// 	...defGameInfo.Fishing_AT05,
				// 	eventIcon: [
				// 		{
				// 			icon: defIconType.new,
				// 			inPeriod: isEventPeriod(eventTime.new_CQ9_fishing)
				// 		}
				// 	]
				// },
				{
					displayKey: "lbl_Oneshot_Fishing",
					img: fishing_CQ9_AT01,
					icon: "icon icon-cq9",
					...defGameInfo.Fishing_AT01,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.new_CQ9_fishing)
						}
					]
				},
				// {
				// 	displayKey: "lbl_Water_Margin_Fishing",
				// 	img: fishing_CQ9_AT06,
				// 	icon: "icon icon-cq9",
				// 	...defGameInfo.Fishing_AT06,
				// 	eventIcon: [
				// 		{
				// 			icon: defIconType.new,
				// 			inPeriod: isEventPeriod(eventTime.new_CQ9_fishing)
				// 		}
				// 	]
				// },
				// {
				// 	displayKey: "lbl_Thunder_Fighter",
				// 	img: fishing_CQ9_AT04,
				// 	icon: "icon icon-cq9",
				// 	...defGameInfo.Fishing_AT04,
				// 	eventIcon: [
				// 		{
				// 			icon: defIconType.new,
				// 			inPeriod: isEventPeriod(eventTime.new_CQ9_fishing)
				// 		}
				// 	]
				// },
				{
					displayKey: "lbl_Game_ICG_DRAGONBALL_FISHING",
					img: fishing_ICG_DB,
					icon: "icon icon-ICG",
					...defGameInfo.ICG_DRAGONBALL_FISHING,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.new_ICG)
						}
					]
				},
				{
					displayKey: "lbl_Game_ICG_FISHING_OF_SAVIORS",
					img: fishing_ICG_FOS,
					icon: "icon icon-ICG",
					...defGameInfo.ICG_FISHING_OF_SAVIORS,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.new_ICG)
						}
					]
				},
				{
					displayKey: "lbl_Game_ICG_THE_TYRANT_AND_THE_PRINCESS",
					img: fishing_ICG_TTATP,
					icon: "icon icon-ICG",
					...defGameInfo.ICG_THE_TYRANT_AND_THE_PRINCESS,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.new_ICG)
						}
					]
				},
				// {
				// 	displayKey: "lbl_FishingGG",
				// 	icon: "icon icon-gg",
				// 	img: fishing_GG,
				// 	...defGameInfo.Fishing
				// },
				{
					displayKey: "lbl_FishingSG1",
					icon: "icon icon-SG",
					img: fishing_SG,
					...defGameInfo.Fishing_SG
				},
				{
					displayKey: "lbl_FishingSG2",
					icon: "icon icon-SG",
					img: fishing_SGwar,
					...defGameInfo.Fishing_SGW
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
			path: path.vip.root,
			eventIcon: [
				{
					icon: defIconType.new_nav,
					inPeriod: isEventPeriod(eventTime.new_vip)
				}
			]
		},
		ranking: {
			displayKey: "lbl_Ranking",
			path: path.leaderBoard.root,
			eventIcon: [
				{
					icon: defIconType.live,
					inPeriod: isEventPeriod(eventTime.ranking)
				}
			]
		}
	};
};
