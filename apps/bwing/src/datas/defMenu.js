/* eslint-disable camelcase */
import { siteInfo } from "../config";
import path from "../path";
import { defGameInfo } from "./productList";
import { isEventPeriod } from "../components/common/common";
import { eventTime } from "../components/common/eventTime";

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
import liveCasino_N2 from "../styles/img/liveGame/livegame10.png";
import liveCasino_PT from "../styles/img/liveGame/livegamePT.png";

import sabaSports from "../styles/img/sport.png";
import BTI from "../styles/img/BTI-sport.png";

import kingMaker from "../styles/img/kingmaker.png";

export const defIconType = {
	live: " liveIcon",
	new: " newicon",
	new_nav: " icon icon-newicon"
};

export const defTpCategoryId = {
	All: 0,
	Sports: 1,
	Slots: 2,
	LiveCasino: 3,
	Fishing: 4,
	Cockfighting: 5,
	Lottery: 6,
	VirtualSports: 7,
	Poker: 8
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
					tpCategoryId: defTpCategoryId.Sports
				},
				{
					displayKey: "lbl_BTISport",
					img: BTI,
					...defGameInfo.BTISport,
					tpCategoryId: defTpCategoryId.Sports,
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
					displayKey: "lbl_V8Poker",
					img: game_V8Poker,
					...defGameInfo.V8Poker,
					tpCategoryId: defTpCategoryId.Poker
				},
				{
					...defGameInfo.kingMaker,
					img: kingMaker,
					displayKey: "lbl_KingMaker",
					tpCategoryId: defTpCategoryId.Poker,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.new_Km)
						}
					]
				},
				{
					displayKey: "lbl_TraditionalLottery",
					img: game_One789LotteryTra,
					...defGameInfo.One789_lottery,
					tpCategoryId: defTpCategoryId.Lottery
				},
				{
					displayKey: "lbl_789Lottery",
					img: game_One789Lottery,
					...defGameInfo.One789_lottery_789,
					tpCategoryId: defTpCategoryId.Lottery
				},
				{
					displayKey: "lbl_SabaClub",
					img: game_SabaClub,
					...defGameInfo.sabaClub,
					tpCategoryId: defTpCategoryId.Slots
				},
				{
					displayKey: "lbl_Keno",
					img: game_Keno,
					...defGameInfo.Keno,
					tpCategoryId: defTpCategoryId.Lottery
				},
				{
					displayKey: "lbl_Lottery",
					img: game_Lottery,
					...defGameInfo.lottery,
					tpCategoryId: defTpCategoryId.Lottery
				}
			]
		},
		eSports: {
			displayKey: "lbl_eSports",
			...defGameInfo.eSports,
			tpCategoryId: defTpCategoryId.Sports
		},
		casino: {
			displayKey: "lbl_Slots",
			path: path.casino.root
		},
		liveCasino: {
			displayKey: "lbl_LiveCasino",
			path: path.liveCasino.root,
			items: [
				{
					displayKey: "Playtech",
					icon: "icon icon-pt",
					img: liveCasino_PT,
					...defGameInfo.Casino_PT,
					tpCategoryId: defTpCategoryId.LiveCasino,
					eventIcon: [
						{
							icon: defIconType.new,
							inPeriod: isEventPeriod(eventTime.liveCasino_pt)
						}
					],
					useGotoGame: true
				},
				{
					displayKey: "N2Live",
					icon: "icon icon-N2LIVE",
					img: liveCasino_N2,
					...defGameInfo.LIVEcasinoN2,
					tpCategoryId: defTpCategoryId.LiveCasino
				},
				{
					displayKey: "lbl_liveCasino_789SeDie",
					icon: "icon icon-one789",
					img: liveCasino_One789,
					...defGameInfo.LIVEcasinoOne789,
					tpCategoryId: defTpCategoryId.LiveCasino
				},
				{
					displayKey: "WM",
					icon: "icon icon-WM",
					img: liveCasino_WM,
					...defGameInfo.LIVEcasinoWM,
					tpCategoryId: defTpCategoryId.LiveCasino
				},
				{
					displayKey: "AG",
					icon: "icon icon-AG",
					img: liveCasino_AG,
					...defGameInfo.LIVEcasinoAG,
					tpCategoryId: defTpCategoryId.LiveCasino
				},
				{
					displayKey: "PP",
					icon: "icon icon-PP",
					img: liveCasino_PP,
					...defGameInfo.LIVEcasinoPP,
					tpCategoryId: defTpCategoryId.LiveCasino
				},
				{
					displayKey: "AE",
					icon: "icon icon-AE",
					img: liveCasino_AE,
					...defGameInfo.LIVEcasinoAE,
					tpCategoryId: defTpCategoryId.LiveCasino
				},
				{
					displayKey: "DG",
					icon: "icon icon-DG",
					img: liveCasino_DG,
					...defGameInfo.LIVEcasinoDG,
					tpCategoryId: defTpCategoryId.LiveCasino
				},
				{
					displayKey: "AB",
					icon: "icon icon-AB",
					img: liveCasino_AB,
					...defGameInfo.LIVEcasinoAB,
					tpCategoryId: defTpCategoryId.LiveCasino
				},
				{
					displayKey: "eBET",
					icon: "icon icon-EB",
					img: liveCasino_EB,
					...defGameInfo.LIVEcasinoEB,
					tpCategoryId: defTpCategoryId.LiveCasino
				},
				{
					displayKey: "SA",
					icon: "icon icon-SA",
					img: liveCasino_SA,
					...defGameInfo.LIVEcasinoSA,
					tpCategoryId: defTpCategoryId.LiveCasino
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
					tpCategoryId: defTpCategoryId.Fishing
				},
				{
					displayKey: "lbl_Oneshot_Fishing",
					img: fishing_CQ9_AT01,
					icon: "icon icon-cq9",
					...defGameInfo.Fishing_AT01,
					tpCategoryId: defTpCategoryId.Fishing
				},
				{
					displayKey: "lbl_Game_ICG_DRAGONBALL_FISHING",
					img: fishing_ICG_DB,
					icon: "icon icon-ICG",
					...defGameInfo.ICG_DRAGONBALL_FISHING,
					tpCategoryId: defTpCategoryId.Fishing
				},
				{
					displayKey: "lbl_Game_ICG_FISHING_OF_SAVIORS",
					img: fishing_ICG_FOS,
					icon: "icon icon-ICG",
					...defGameInfo.ICG_FISHING_OF_SAVIORS,
					tpCategoryId: defTpCategoryId.Fishing
				},
				{
					displayKey: "lbl_Game_ICG_THE_TYRANT_AND_THE_PRINCESS",
					img: fishing_ICG_TTATP,
					icon: "icon icon-ICG",
					...defGameInfo.ICG_THE_TYRANT_AND_THE_PRINCESS,
					tpCategoryId: defTpCategoryId.Fishing
				},
				{
					displayKey: "lbl_FishingGG",
					icon: "icon icon-gg",
					img: fishing_GG,
					...defGameInfo.Fishing,
					tpCategoryId: defTpCategoryId.Fishing
				},
				{
					displayKey: "lbl_FishingSG1",
					icon: "icon icon-SG",
					img: fishing_SG,
					...defGameInfo.Fishing_SG,
					tpCategoryId: defTpCategoryId.Fishing
				},
				{
					displayKey: "lbl_FishingSG2",
					icon: "icon icon-SG",
					img: fishing_SGwar,
					...defGameInfo.Fishing_SGW,
					tpCategoryId: defTpCategoryId.Fishing
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
		},
		ranking: {
			displayKey: "lbl_Ranking",
			path: path.leaderBoard.root
		}
	};
};
