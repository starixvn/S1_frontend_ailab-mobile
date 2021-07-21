import { defTpCategoryId } from "./productList";

const gameType = {
	table: "lbl_TableGame",
	slots: "lbl_SlotsGame",
	poker: "lbl_Poker"
};

export const defProductType = {
	slots: "slots"
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
					tpCategoryId: defTpCategoryId.Slots
				},
				{
					name: "Thor Infinity Reels",
					provider: "YGG",
					gameTypeKey: gameType.slots,
					imgUrl: "thor_infinity_reels",
					tpId: 8,
					gameId: 1035,
					productType: defProductType.slots,
					tpCategoryId: defTpCategoryId.Slots
				},
				{
					name: "Mahjong Ways Two",
					provider: "PG Soft",
					gameTypeKey: gameType.slots,
					imgUrl: "mahjong_ways_two",
					tpId: 14,
					gameId: 74,
					productType: defProductType.slots,
					tpCategoryId: defTpCategoryId.Slots
				},
				{
					name: "Fire Queen 2",
					provider: "CQ9",
					gameTypeKey: gameType.slots,
					imgUrl: "fire_queen_2",
					tpId: 16,
					gameId: 186,
					productType: defProductType.slots,
					tpCategoryId: defTpCategoryId.Slots
				},
				{
					name: "Gates of Olympus",
					provider: "PP",
					gameTypeKey: gameType.slots,
					imgUrl: "gates_of_olympus",
					tpId: 5,
					gameId: "vs20olympgate",
					productType: defProductType.slots,
					tpCategoryId: defTpCategoryId.Slots
				},
				{
					name: "God Of Fortune",
					provider: "GPI",
					gameTypeKey: gameType.slots,
					imgUrl: "god_of_fortune",
					tpId: 6,
					gameId: "godoffortune",
					productType: defProductType.slots,
					tpCategoryId: defTpCategoryId.Slots
				},
				{
					name: "Zhao Cai Jin Bao Jackpot",
					provider: "Playtech",
					gameTypeKey: gameType.slots,
					imgUrl: "zhao_cai_jin_bao_jackpot",
					tpId: 27,
					gameId: "Zhao Cai Jin Bao Jackpot",
					productType: defProductType.slots,
					tpCategoryId: defTpCategoryId.Slots
				},
				{
					name: "SUPREME CAISHEN",
					provider: "Joker",
					gameTypeKey: gameType.slots,
					imgUrl: "supreme_caishen",
					tpId: 9,
					gameId: "byz81hmsq748k",
					productType: defProductType.slots,
					tpCategoryId: defTpCategoryId.Slots
				},
				{
					name: "Houyi's Legend",
					provider: "ICG",
					gameTypeKey: gameType.slots,
					imgUrl: "houyi's_legend",
					tpId: 24,
					gameId: "cm00034",
					productType: defProductType.slots,
					tpCategoryId: defTpCategoryId.Slots
				},
				{
					name: "Baccarat",
					provider: "Saba Casino",
					gameTypeKey: gameType.table,
					imgUrl: "baccarat",
					tpId: 1,
					gameId: 208,
					productType: defProductType.slots,
					tpCategoryId: defTpCategoryId.Slots
				},
				{
					name: "Virtual Games",
					provider: "OW",
					gameTypeKey: gameType.slots,
					imgUrl: "virtual_games",
					tpId: 1,
					gameId: 245,
					productType: defProductType.slots,
					tpCategoryId: defTpCategoryId.Slots
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
					tpCategoryId: defTpCategoryId.Slots
				},
				{
					name: "Thor Infinity Reels",
					provider: "YGG",
					gameTypeKey: gameType.slots,
					imgUrl: "thor_infinity_reels",
					tpId: 8,
					gameId: 1035,
					productType: defProductType.slots,
					tpCategoryId: defTpCategoryId.Slots
				},
				{
					name: "Mahjong Ways Two",
					provider: "PG Soft",
					gameTypeKey: gameType.slots,
					imgUrl: "mahjong_ways_two",
					tpId: 14,
					gameId: 74,
					productType: defProductType.slots,
					tpCategoryId: defTpCategoryId.Slots
				},
				{
					name: "Jumping Mobile",
					provider: "CQ9",
					gameTypeKey: gameType.slots,
					imgUrl: "jumping_mobile",
					tpId: 16,
					gameId: 105,
					productType: defProductType.slots,
					tpCategoryId: defTpCategoryId.Slots
				},
				{
					name: "Gates of Olympus",
					provider: "PP",
					gameTypeKey: gameType.slots,
					imgUrl: "gates_of_olympus",
					tpId: 5,
					gameId: "vs20olympgate",
					productType: defProductType.slots,
					tpCategoryId: defTpCategoryId.Slots
				},
				{
					name: "God Of Fortune",
					provider: "GPI",
					gameTypeKey: gameType.slots,
					imgUrl: "god_of_fortune",
					tpId: 6,
					gameId: "godoffortune",
					productType: defProductType.slots,
					tpCategoryId: defTpCategoryId.Slots
				},
				{
					name: "Gem Queen",
					provider: "Playtech",
					gameTypeKey: gameType.slots,
					imgUrl: "gem_queen",
					tpId: 27,
					gameId: "gemq",
					productType: defProductType.slots,
					tpCategoryId: defTpCategoryId.Slots
				},
				{
					name: "SUPREME CAISHEN",
					provider: "Joker",
					gameTypeKey: gameType.slots,
					imgUrl: "supreme_caishen",
					tpId: 9,
					gameId: "byz81hmsq748k",
					productType: defProductType.slots,
					tpCategoryId: defTpCategoryId.Slots
				},
				{
					name: "Houyi's Legend",
					provider: "ICG",
					gameTypeKey: gameType.slots,
					imgUrl: "houyi's_legend",
					tpId: 24,
					gameId: "cm00034",
					productType: defProductType.slots,
					tpCategoryId: defTpCategoryId.Slots
				},
				{
					name: "Baccarat",
					provider: "Saba Casino",
					gameTypeKey: gameType.table,
					imgUrl: "baccarat",
					tpId: 1,
					gameId: 208,
					productType: defProductType.slots,
					tpCategoryId: defTpCategoryId.Slots
				},
				{
					name: "Virtual Games",
					provider: "OW",
					gameTypeKey: gameType.slots,
					imgUrl: "virtual_games",
					tpId: 1,
					gameId: 245,
					productType: defProductType.slots,
					tpCategoryId: defTpCategoryId.Slots
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
					tpCategoryId: defTpCategoryId.Poker
				},
				{
					name: "Jhandi Munda",
					provider: "Kingmaker",
					gameTypeKey: gameType.poker,
					imgUrl: "jhandi_munda",
					tpId: 11,
					tpCategoryId: defTpCategoryId.Poker
				},
				{
					name: "Archer",
					provider: "Playtech",
					gameTypeKey: gameType.slots,
					imgUrl: "archer",
					tpId: 27,
					gameId: "arc",
					productType: defProductType.slots,
					tpCategoryId: defTpCategoryId.Slots
				},
				{
					name: "God Of Fortune",
					provider: "GPI",
					gameTypeKey: gameType.slots,
					imgUrl: "god_of_fortune",
					tpId: 6,
					gameId: "godoffortune",
					productType: defProductType.slots,
					tpCategoryId: defTpCategoryId.Slots
				},
				{
					name: "Thor Infinity Reels",
					provider: "YGG",
					gameTypeKey: gameType.slots,
					imgUrl: "thor_infinity_reels",
					tpId: 8,
					gameId: 1035,
					productType: defProductType.slots,
					tpCategoryId: defTpCategoryId.Slots
				},
				{
					name: "Gates of Olympus",
					provider: "PP",
					gameTypeKey: gameType.slots,
					imgUrl: "gates_of_olympus",
					tpId: 5,
					gameId: "vs20olympgate",
					productType: defProductType.slots,
					tpCategoryId: defTpCategoryId.Slots
				},
				{
					name: "Houyi's Legend",
					provider: "ICG",
					gameTypeKey: gameType.slots,
					imgUrl: "houyi's_legend",
					tpId: 24,
					gameId: "cm00034",
					productType: defProductType.slots,
					tpCategoryId: defTpCategoryId.Slots
				},
				{
					name: "Sky Lantern",
					provider: "CQ9",
					gameTypeKey: gameType.slots,
					imgUrl: "sky_lantern",
					tpId: 16,
					gameId: 146,
					productType: defProductType.slots,
					tpCategoryId: defTpCategoryId.Slots
				},
				{
					name: "Sonya Blackjack",
					provider: "YGG",
					gameTypeKey: gameType.table,
					imgUrl: "sonya_blackjack",
					tpId: 8,
					gameId: 21001,
					productType: defProductType.slots,
					tpCategoryId: defTpCategoryId.Slots
				},
				{
					name: "Baccarat",
					provider: "Saba Casino",
					gameTypeKey: gameType.table,
					imgUrl: "baccarat",
					tpId: 1,
					gameId: 208,
					productType: defProductType.slots,
					tpCategoryId: defTpCategoryId.Slots
				},
				{
					name: "Virtual Games",
					provider: "OW",
					gameTypeKey: gameType.slots,
					imgUrl: "virtual_games",
					tpId: 1,
					gameId: 245,
					productType: defProductType.slots,
					tpCategoryId: defTpCategoryId.Slots
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
					tpCategoryId: defTpCategoryId.Slots
				},
				{
					name: "Thor Infinity Reels",
					provider: "YGG",
					gameTypeKey: gameType.slots,
					imgUrl: "thor_infinity_reels",
					tpId: 8,
					gameId: 1035,
					productType: defProductType.slots,
					tpCategoryId: defTpCategoryId.Slots
				},
				{
					name: "Sky Lantern",
					provider: "CQ9",
					gameTypeKey: gameType.slots,
					imgUrl: "sky_lantern",
					tpId: 16,
					gameId: 146,
					productType: defProductType.slots,
					tpCategoryId: defTpCategoryId.Slots
				},
				{
					name: "Gates of Olympus",
					provider: "PP",
					gameTypeKey: gameType.slots,
					imgUrl: "gates_of_olympus",
					tpId: 5,
					gameId: "vs20olympgate",
					productType: defProductType.slots,
					tpCategoryId: defTpCategoryId.Slots
				},
				{
					name: "God Of Fortune",
					provider: "GPI",
					gameTypeKey: gameType.slots,
					imgUrl: "god_of_fortune",
					tpId: 6,
					gameId: "godoffortune",
					productType: defProductType.slots,
					tpCategoryId: defTpCategoryId.Slots
				},
				{
					name: "Archer",
					provider: "Playtech",
					gameTypeKey: gameType.slots,
					imgUrl: "archer",
					tpId: 27,
					gameId: "arc",
					productType: defProductType.slots,
					tpCategoryId: defTpCategoryId.Slots
				},
				{
					name: "LUCKY GOD",
					provider: "Joker",
					gameTypeKey: gameType.slots,
					imgUrl: "lucky_god",
					tpId: 9,
					gameId: "dhdirsn3m3xia",
					productType: defProductType.slots,
					tpCategoryId: defTpCategoryId.Slots
				},
				{
					name: "Houyi's Legend",
					provider: "ICG",
					gameTypeKey: gameType.slots,
					imgUrl: "houyi's_legend",
					tpId: 24,
					gameId: "cm00034",
					productType: defProductType.slots,
					tpCategoryId: defTpCategoryId.Slots
				},
				{
					name: "Baccarat",
					provider: "Saba Casino",
					gameTypeKey: gameType.table,
					imgUrl: "baccarat",
					tpId: 1,
					gameId: 208,
					productType: defProductType.slots,
					tpCategoryId: defTpCategoryId.Slots
				},
				{
					name: "Sonya Blackjack",
					provider: "YGG",
					gameTypeKey: gameType.table,
					imgUrl: "sonya_blackjack",
					tpId: 8,
					gameId: 21001,
					productType: defProductType.slots,
					tpCategoryId: defTpCategoryId.Slots
				},
				{
					name: "Virtual Games",
					provider: "OW",
					gameTypeKey: gameType.slots,
					imgUrl: "virtual_games",
					tpId: 1,
					gameId: 245,
					productType: defProductType.slots,
					tpCategoryId: defTpCategoryId.Slots
				}
			];
	}
};
