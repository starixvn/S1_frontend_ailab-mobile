import { defGameInfo } from "../../datas/productList";
import path from "../../path";

const defPlatfrom = [
	{
		...defGameInfo.Sports,
		imgName: "sabaa",
		otherPlatformImg: "sabab"
	},
	// {
	// 	...defGameInfo.BTISport,
	// 	imgName: "btia",
	// },
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
		imgName: "n2livea",
		otherPlatformImg: "n2liveb"
	},
	{
		...defGameInfo.Casino_PP,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_PP },
		imgName: "ppa",
		otherPlatformImg: "ppb"
	},
	{
		...defGameInfo.Casino_MGP,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_MGP },
		imgName: "mga"
	},
	{
		...defGameInfo.Casino_PT,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_PT },
		imgName: "pta"
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
		imgName: "yga",
		otherPlatformImg: "ygb"
	},
	{
		...defGameInfo.Casino_CQ9,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_CQ9 },
		imgName: "cq9a"
	},
	{
		...defGameInfo.Casino_Jili,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_Jili },
		imgName: "jilia"
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
		imgName: "kingmakera"
	},
	{
		...defGameInfo.Casino_NetEnt,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_NetEnt },
		imgName: "ne"
	},
	{
		...defGameInfo.LIVEcasinoEVO,
		imgName: "evolutiona"
	},
	{
		...defGameInfo.Casino_RedTiger,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_RedTiger },
		imgName: "rta"
	},
	{
		...defGameInfo.Casino_AdvantPlay,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_AdvantPlay },
		imgName: "ap"
	}
];

export default defPlatfrom;
