import { defGameInfo, defTpCategoryId } from "../../datas/productList";
import path from "../../path";

const defPlatfrom = [
	{
		...defGameInfo.Sports,
		parameter: { ...defGameInfo.Sports },
		imgName: "saba",
		tpCategoryId: defTpCategoryId.Sports
	},
	{
		...defGameInfo.LIVEcasinoAB,
		imgName: "ab",
		tpCategoryId: defTpCategoryId.LiveCasino
	},
	{
		...defGameInfo.Fishing,
		imgName: "yl",
		tpCategoryId: defTpCategoryId.Fishing
	},
	{
		...defGameInfo.LIVEcasinoAG,
		imgName: "ag",
		tpCategoryId: defTpCategoryId.LiveCasino
	},
	{
		...defGameInfo.Casino_GPI,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_GPI },
		imgName: "gp",
		tpCategoryId: defTpCategoryId.Slots
	},
	{
		...defGameInfo.LIVEcasinoDG,
		imgName: "dg",
		tpCategoryId: defTpCategoryId.LiveCasino
	},
	{
		...defGameInfo.LIVEcasinoSA,
		imgName: "sa",
		tpCategoryId: defTpCategoryId.LiveCasino
	},
	{
		...defGameInfo.Casino_YGG,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_YGG },
		imgName: "yg",
		tpCategoryId: defTpCategoryId.Slots
	},
	{
		...defGameInfo.Casino_PP,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_PP },
		imgName: "pp",
		tpCategoryId: defTpCategoryId.Slots
	},
	{
		...defGameInfo.Casino_SG,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_SG },
		imgName: "sg",
		tpCategoryId: defTpCategoryId.Slots
	},
	{
		...defGameInfo.Casino_PG,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_PG },
		imgName: "pg",
		tpCategoryId: defTpCategoryId.Slots
	},
	{
		...defGameInfo.LIVEcasinoEB,
		imgName: "eb",
		tpCategoryId: defTpCategoryId.LiveCasino
	},
	{
		...defGameInfo.LIVEcasinoWM,
		imgName: "wm",
		tpCategoryId: defTpCategoryId.LiveCasino
	},
	{
		...defGameInfo.Casino_CQ9,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_CQ9 },
		imgName: "cq9",
		tpCategoryId: defTpCategoryId.Slots
	},
	{
		...defGameInfo.casino_ICG,
		path: path.casino.root,
		parameter: { ...defGameInfo.casino_ICG },
		imgName: "icg",
		tpCategoryId: defTpCategoryId.Slots
	},
	{
		...defGameInfo.V8Poker,
		imgName: "v8",
		tpCategoryId: defTpCategoryId.Poker
	},
	{
		...defGameInfo.LIVEcasinoN2,
		imgName: "n2live",
		tpCategoryId: defTpCategoryId.LiveCasino
	},
	{
		...defGameInfo.Casino_PT,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_PT },
		imgName: "playtech",
		tpCategoryId: defTpCategoryId.Slots
	},
	{
		...defGameInfo.BTISport,
		imgName: "bti",
		category: defTpCategoryId.Sports
	},
	{
		...defGameInfo.kingMaker,
		imgName: "kingmaker",
		category: defTpCategoryId.Poker
	},
	{
		...defGameInfo.Casino_MGP,
		imgName: "mga",
		category: defTpCategoryId.Slots
	},
	{
		...defGameInfo.Casino_Jili,
		imgName: "jilia",
		category: defTpCategoryId.Slots
	}
];

export default defPlatfrom;
