import { defGameInfo } from "../../datas/productList";
import path from "../../path";

const defPlatfrom = [
	{
		...defGameInfo.Sports,
		parameter: { ...defGameInfo.Sports },
		imgName: "sabaa"
	},
	{
		...defGameInfo.BTISport,
		imgName: "btia"
	},
	{
		...defGameInfo.LIVEcasinoAG,
		imgName: "aga"
	},
	{
		...defGameInfo.LIVEcasinoAE,
		imgName: "aea"
	},
	{
		...defGameInfo.LIVEcasinoN2,
		imgName: "n2liveb"
	},
	{
		...defGameInfo.Casino_PP,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_PP },
		imgName: "ppb"
	},
	{
		...defGameInfo.Casino_PT,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_PT },
		imgName: "playtecha"
	},
	{
		...defGameInfo.Casino_PG,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_PG },
		imgName: "pga"
	},
	{
		...defGameInfo.Casino_SG,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_SG },
		imgName: "sga"
	},
	{
		...defGameInfo.Casino_YGG,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_YGG },
		imgName: "ygb"
	},
	{
		...defGameInfo.Casino_CQ9,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_CQ9 },
		imgName: "cq9a"
	},
	{
		...defGameInfo.Fishing,
		imgName: "yla"
	},
	{
		...defGameInfo.V8Poker,
		imgName: "v8a"
	},
	{
		...defGameInfo.kingMaker,
		imgName: "kingmaker"
	},
	{
		...defGameInfo.Casino_Jili,
		imgName: "jilia"
	}
];

export default defPlatfrom;
