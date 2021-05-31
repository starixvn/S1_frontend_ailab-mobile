import { defGameInfo } from "../../datas/productList";
import path from "../../path";

const defPlatfrom = [
	{
		...defGameInfo.Sports,
		parameter: { ...defGameInfo.Sports },
		imgName: "saba"
	},
	{
		...defGameInfo.LIVEcasinoAB,
		imgName: "ab"
	},
	{
		...defGameInfo.Fishing,
		imgName: "yl"
	},
	{
		...defGameInfo.LIVEcasinoAG,
		imgName: "ag"
	},
	{
		...defGameInfo.Casino_GPI,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_GPI },
		imgName: "gp"
	},
	{
		...defGameInfo.LIVEcasinoDG,
		imgName: "dg"
	},
	{
		...defGameInfo.LIVEcasinoSA,
		imgName: "sa"
	},
	{
		...defGameInfo.Casino_YGG,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_YGG },
		imgName: "yg"
	},
	{
		...defGameInfo.Casino_PP,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_PP },
		imgName: "pp"
	},
	{
		...defGameInfo.Casino_SG,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_SG },
		imgName: "sg"
	},
	{
		...defGameInfo.Casino_PG,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_PG },
		imgName: "pg"
	},
	{
		...defGameInfo.LIVEcasinoEB,
		imgName: "eb"
	},
	{
		...defGameInfo.LIVEcasinoWM,
		imgName: "wm"
	},
	{
		...defGameInfo.Casino_CQ9,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_CQ9 },
		imgName: "cq9"
	},
	{
		...defGameInfo.casino_ICG,
		path: path.casino.root,
		parameter: { ...defGameInfo.casino_ICG },
		imgName: "icg"
	},
	{
		...defGameInfo.V8Poker,
		imgName: "v8"
	},
	{
		...defGameInfo.LIVEcasinoN2,
		imgName: "n2live"
	},
	{
		...defGameInfo.Casino_PT,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_PT },
		imgName: "playtech"
	},
	{
		...defGameInfo.BTISport,
		imgName: "bti"
	}
];

export default defPlatfrom;
