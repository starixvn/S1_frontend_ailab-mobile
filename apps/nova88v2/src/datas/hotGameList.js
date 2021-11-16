import { defSlotTpGameType } from "./productList";

const gameType = {
	table: "lbl_TableGame",
	slots: "lbl_SlotsGame",
	poker: "lbl_Poker"
};

export const defProductType = {
	slots: "slots"
};

const otherTpGameType = {
	OWVirtualGames: 22,
	KMPoker: 52
};

export default ({ currencyName }) => {
	switch (currencyName) {
		case "THB":
			return [
				{
					name: "Brothers Kingdom",
					provider: "Spade Gaming",
					gameTypeKey: gameType.slots,
					imgUrl: "brothers_kingdom",
					tpId: 10,
					gameId: "S-GK01",
					productType: defProductType.slots,
					tpGameType: defSlotTpGameType.SG.tpGameType
				},
				{
					name: "Thor Infinity Reels",
					provider: "YGG",
					gameTypeKey: gameType.slots,
					imgUrl: "thor_infinity_reels",
					tpId: 8,
					gameId: 1035,
					productType: defProductType.slots,
					tpGameType: defSlotTpGameType.YGG.tpGameType
				},
				{
					name: "Mahjong Ways Two",
					provider: "PG Soft",
					gameTypeKey: gameType.slots,
					imgUrl: "mahjong_ways_two",
					tpId: 14,
					gameId: 74,
					productType: defProductType.slots,
					tpGameType: defSlotTpGameType.MG.tpGameType
				},
				{
					name: "Fire Queen 2",
					provider: "CQ9",
					gameTypeKey: gameType.slots,
					imgUrl: "fire_queen_2",
					tpId: 16,
					gameId: 186,
					productType: defProductType.slots,
					tpGameType: defSlotTpGameType.CQ9.tpGameType
				},
				{
					displayKey: "lbl_HotGames_Nova88_Olympus",
					name: "Nova88 Olympus",
					provider: "PP",
					gameTypeKey: gameType.slots,
					imgUrl: {
						default: "88_of_olympus_en",
						cs: "88_of_olympus_cs"
					},
					tpId: 5,
					gameId: "vs20olympnova88",
					productType: defProductType.slots,
					tpGameType: defSlotTpGameType.PP.tpGameType
				},
				{
					name: "God Of Fortune",
					provider: "GPI",
					gameTypeKey: gameType.slots,
					imgUrl: "god_of_fortune",
					tpId: 6,
					gameId: "godoffortune",
					productType: defProductType.slots,
					tpGameType: defSlotTpGameType.GPI.tpGameType
				},
				{
					name: "Zhao Cai Jin Bao Jackpot",
					provider: "Playtech",
					gameTypeKey: gameType.slots,
					imgUrl: "zhao_cai_jin_bao_jackpot",
					tpId: 27,
					gameId: "Zhao Cai Jin Bao Jackpot",
					productType: defProductType.slots,
					tpGameType: defSlotTpGameType.PT.tpGameType
				},
				{
					name: "SUPREME CAISHEN",
					provider: "Joker",
					gameTypeKey: gameType.slots,
					imgUrl: "supreme_caishen",
					tpId: 9,
					gameId: "byz81hmsq748k",
					productType: defProductType.slots,
					tpGameType: defSlotTpGameType.Joker.tpGameType
				},
				{
					name: "Houyi's Legend",
					provider: "ICG",
					gameTypeKey: gameType.slots,
					imgUrl: "houyi's_legend",
					tpId: 24,
					gameId: "cm00034",
					productType: defProductType.slots,
					tpGameType: defSlotTpGameType.Iconic.tpGameType
				},
				{
					name: "Baccarat",
					provider: "Saba Casino",
					gameTypeKey: gameType.table,
					imgUrl: "baccarat",
					tpId: 1,
					gameId: 208,
					productType: defProductType.slots,
					tpGameType: defSlotTpGameType.Saba.tpGameType
				},
				{
					name: "Virtual Games",
					provider: "OW",
					gameTypeKey: gameType.slots,
					imgUrl: "virtual_games",
					tpId: 1,
					gameId: 245,
					productType: defProductType.slots,
					tpGameType: otherTpGameType.OWVirtualGames
				}
			];
		case "IDR":
			return [
				{
					name: "5 Fortune Dragons",
					provider: "Spade Gaming",
					gameTypeKey: gameType.slots,
					imgUrl: "5_fortune_dragons",
					tpId: 10,
					gameId: "S-FD01",
					productType: defProductType.slots,
					tpGameType: defSlotTpGameType.SG.tpGameType
				},
				{
					name: "Thor Infinity Reels",
					provider: "YGG",
					gameTypeKey: gameType.slots,
					imgUrl: "thor_infinity_reels",
					tpId: 8,
					gameId: 1035,
					productType: defProductType.slots,
					tpGameType: defSlotTpGameType.YGG.tpGameType
				},
				{
					name: "Mahjong Ways Two",
					provider: "PG Soft",
					gameTypeKey: gameType.slots,
					imgUrl: "mahjong_ways_two",
					tpId: 14,
					gameId: 74,
					productType: defProductType.slots,
					tpGameType: defSlotTpGameType.PG.tpGameType
				},
				{
					name: "Jumping Mobile",
					provider: "CQ9",
					gameTypeKey: gameType.slots,
					imgUrl: "jumping_mobile",
					tpId: 16,
					gameId: 105,
					productType: defProductType.slots,
					tpGameType: defSlotTpGameType.CQ9.tpGameType
				},
				{
					displayKey: "lbl_HotGames_Nova88_Olympus",
					name: "Nova88 Olympus",
					provider: "PP",
					gameTypeKey: gameType.slots,
					imgUrl: {
						default: "88_of_olympus_en",
						cs: "88_of_olympus_cs"
					},
					tpId: 5,
					gameId: "vs20olympnova88",
					productType: defProductType.slots,
					tpGameType: defSlotTpGameType.PP.tpGameType
				},
				{
					name: "God Of Fortune",
					provider: "GPI",
					gameTypeKey: gameType.slots,
					imgUrl: "god_of_fortune",
					tpId: 6,
					gameId: "godoffortune",
					productType: defProductType.slots,
					tpGameType: defSlotTpGameType.GPI.tpGameType
				},
				{
					name: "Gem Queen",
					provider: "Playtech",
					gameTypeKey: gameType.slots,
					imgUrl: "gem_queen",
					tpId: 27,
					gameId: "gemq",
					productType: defProductType.slots,
					tpGameType: defSlotTpGameType.PT.tpGameType
				},
				{
					name: "SUPREME CAISHEN",
					provider: "Joker",
					gameTypeKey: gameType.slots,
					imgUrl: "supreme_caishen",
					tpId: 9,
					gameId: "byz81hmsq748k",
					productType: defProductType.slots,
					tpGameType: defSlotTpGameType.Joker.tpGameType
				},
				{
					name: "Houyi's Legend",
					provider: "ICG",
					gameTypeKey: gameType.slots,
					imgUrl: "houyi's_legend",
					tpId: 24,
					gameId: "cm00034",
					productType: defProductType.slots,
					tpGameType: defSlotTpGameType.Iconic.tpGameType
				},
				{
					name: "Baccarat",
					provider: "Saba Casino",
					gameTypeKey: gameType.table,
					imgUrl: "baccarat",
					tpId: 1,
					gameId: 208,
					productType: defProductType.slots,
					tpGameType: defSlotTpGameType.Saba.tpGameType
				},
				{
					name: "Virtual Games",
					provider: "OW",
					gameTypeKey: gameType.slots,
					imgUrl: "virtual_games",
					tpId: 1,
					gameId: 245,
					productType: defProductType.slots,
					tpGameType: otherTpGameType.OWVirtualGames
				}
			];
		case "INR":
			return [
				{
					name: "Andar Bahar",
					provider: "Kingmaker",
					gameTypeKey: gameType.poker,
					imgUrl: "andar_bahar",
					tpId: 11,
					tpGameType: otherTpGameType.KMPoker
				},
				{
					name: "Jhandi Munda",
					provider: "Kingmaker",
					gameTypeKey: gameType.poker,
					imgUrl: "jhandi_munda",
					tpId: 11,
					tpGameType: otherTpGameType.KMPoker
				},
				{
					name: "Archer",
					provider: "Playtech",
					gameTypeKey: gameType.slots,
					imgUrl: "archer",
					tpId: 27,
					gameId: "arc",
					productType: defProductType.slots,
					tpGameType: defSlotTpGameType.PT.tpGameType
				},
				{
					name: "God Of Fortune",
					provider: "GPI",
					gameTypeKey: gameType.slots,
					imgUrl: "god_of_fortune",
					tpId: 6,
					gameId: "godoffortune",
					productType: defProductType.slots,
					tpGameType: defSlotTpGameType.GPI.tpGameType
				},
				{
					name: "Thor Infinity Reels",
					provider: "YGG",
					gameTypeKey: gameType.slots,
					imgUrl: "thor_infinity_reels",
					tpId: 8,
					gameId: 1035,
					productType: defProductType.slots,
					tpGameType: defSlotTpGameType.YGG.tpGameType
				},
				{
					displayKey: "lbl_HotGames_Nova88_Olympus",
					name: "Nova88 Olympus",
					provider: "PP",
					gameTypeKey: gameType.slots,
					imgUrl: {
						default: "88_of_olympus_en",
						cs: "88_of_olympus_cs"
					},
					tpId: 5,
					gameId: "vs20olympnova88",
					productType: defProductType.slots,
					tpGameType: defSlotTpGameType.PP.tpGameType
				},
				{
					name: "Houyi's Legend",
					provider: "ICG",
					gameTypeKey: gameType.slots,
					imgUrl: "houyi's_legend",
					tpId: 24,
					gameId: "cm00034",
					productType: defProductType.slots,
					tpGameType: defSlotTpGameType.Iconic.tpGameType
				},
				{
					name: "Sky Lantern",
					provider: "CQ9",
					gameTypeKey: gameType.slots,
					imgUrl: "sky_lantern",
					tpId: 16,
					gameId: 146,
					productType: defProductType.slots,
					tpGameType: defSlotTpGameType.CQ9.tpGameType
				},
				{
					name: "Sonya Blackjack",
					provider: "YGG",
					gameTypeKey: gameType.table,
					imgUrl: "sonya_blackjack",
					tpId: 8,
					gameId: 21001,
					productType: defProductType.slots,
					tpGameType: defSlotTpGameType.YGG.tpGameType
				},
				{
					name: "Baccarat",
					provider: "Saba Casino",
					gameTypeKey: gameType.table,
					imgUrl: "baccarat",
					tpId: 1,
					gameId: 208,
					productType: defProductType.slots,
					tpGameType: defSlotTpGameType.Saba.tpGameType
				},
				{
					name: "Virtual Games",
					provider: "OW",
					gameTypeKey: gameType.slots,
					imgUrl: "virtual_games",
					tpId: 1,
					gameId: 245,
					productType: defProductType.slots,
					tpGameType: otherTpGameType.OWVirtualGames
				}
			];
		default:
			return [
				{
					name: "5 Fortune Dragons",
					provider: "Spade Gaming",
					gameTypeKey: gameType.slots,
					imgUrl: "5_fortune_dragons",
					tpId: 10,
					gameId: "S-FD01",
					productType: defProductType.slots,
					tpGameType: defSlotTpGameType.SG.tpGameType
				},
				{
					name: "Thor Infinity Reels",
					provider: "YGG",
					gameTypeKey: gameType.slots,
					imgUrl: "thor_infinity_reels",
					tpId: 8,
					gameId: 1035,
					productType: defProductType.slots,
					tpGameType: defSlotTpGameType.YGG.tpGameType
				},
				{
					name: "Sky Lantern",
					provider: "CQ9",
					gameTypeKey: gameType.slots,
					imgUrl: "sky_lantern",
					tpId: 16,
					gameId: 146,
					productType: defProductType.slots,
					tpGameType: defSlotTpGameType.CQ9.tpGameType
				},
				{
					displayKey: "lbl_HotGames_Nova88_Olympus",
					name: "Nova88 Olympus",
					provider: "PP",
					gameTypeKey: gameType.slots,
					imgUrl: {
						default: "88_of_olympus_en",
						cs: "88_of_olympus_cs"
					},
					tpId: 5,
					gameId: "vs20olympnova88",
					productType: defProductType.slots,
					tpGameType: defSlotTpGameType.PP.tpGameType
				},
				{
					name: "God Of Fortune",
					provider: "GPI",
					gameTypeKey: gameType.slots,
					imgUrl: "god_of_fortune",
					tpId: 6,
					gameId: "godoffortune",
					productType: defProductType.slots,
					tpGameType: defSlotTpGameType.GPI.tpGameType
				},
				{
					name: "Archer",
					provider: "Playtech",
					gameTypeKey: gameType.slots,
					imgUrl: "archer",
					tpId: 27,
					gameId: "arc",
					productType: defProductType.slots,
					tpGameType: defSlotTpGameType.PT.tpGameType
				},
				{
					name: "LUCKY GOD",
					provider: "Joker",
					gameTypeKey: gameType.slots,
					imgUrl: "lucky_god",
					tpId: 9,
					gameId: "dhdirsn3m3xia",
					productType: defProductType.slots,
					tpGameType: defSlotTpGameType.Joker.tpGameType
				},
				{
					name: "Houyi's Legend",
					provider: "ICG",
					gameTypeKey: gameType.slots,
					imgUrl: "houyi's_legend",
					tpId: 24,
					gameId: "cm00034",
					productType: defProductType.slots,
					tpGameType: defSlotTpGameType.Iconic.tpGameType
				},
				{
					name: "Baccarat",
					provider: "Saba Casino",
					gameTypeKey: gameType.table,
					imgUrl: "baccarat",
					tpId: 1,
					gameId: 208,
					productType: defProductType.slots,
					tpGameType: defSlotTpGameType.Saba.tpGameType
				},
				{
					name: "Sonya Blackjack",
					provider: "YGG",
					gameTypeKey: gameType.table,
					imgUrl: "sonya_blackjack",
					tpId: 8,
					gameId: 21001,
					productType: defProductType.slots,
					tpGameType: defSlotTpGameType.YGG.tpGameType
				},
				{
					name: "Virtual Games",
					provider: "OW",
					gameTypeKey: gameType.slots,
					imgUrl: "virtual_games",
					tpId: 1,
					gameId: 245,
					productType: defProductType.slots,
					tpGameType: otherTpGameType.OWVirtualGames
				}
			];
	}
};
