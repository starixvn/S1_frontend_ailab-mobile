import { defGameInfo } from "../../datas/productList";
import path from "../../path";

const defPlatfrom = [
	{
		...defGameInfo.Sports,
		imgName: "sabaa",
		otherPlatformImg: "sabab"
	},
	{
		...defGameInfo.eSports_TFGaming,
		imgName: "tfga"
	},
	{
		...defGameInfo.SBOSport,
		imgName: "sboa"
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
		...defGameInfo.LIVEcasinoAB,
		imgName: "aba"
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
		...defGameInfo.LIVEcasinoBG,
		imgName: "bga"
	},
	{
		...defGameInfo.LIVEcasinoYEEBET,
		imgName: "yba"
	},
	{
		...defGameInfo.Casino_MGP,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_MGP },
		imgName: "mga"
	},
	{
		...defGameInfo.Casino_PlayTech,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_PlayTech },
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
		imgName: "nea"
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
		imgName: "apa"
	},
	{
		...defGameInfo.Casino_Habanero,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_Habanero },
		imgName: "habaneroa"
	},
	{
		...defGameInfo.Casino_SimplePlay,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_SimplePlay },
		imgName: "simpleplaya"
	},
	{
		...defGameInfo.Casino_Skywind,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_Skywind },
		imgName: "ska"
	},
	{
		...defGameInfo.Casino_Nextspin,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_Nextspin },
		imgName: "nextspina"
	},
	{
		...defGameInfo.sports_IM,
		imgName: "im-sportsa"
	},
	{
		...defGameInfo.eSports_IM,
		imgName: "im-esportsa"
	},
	{
		...defGameInfo.Casino_SPRIBE,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_SPRIBE },
		imgName: "spribea"
	},
	{
		...defGameInfo.LIVEcasinoEB,
		path: path.casino.root,
		parameter: { ...defGameInfo.LIVEcasinoEB },
		imgName: "we"
	},
	{
		...defGameInfo.Casino_Endorphina,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_Endorphina },
		imgName: "es"
	},
	{
		...defGameInfo.Casino_FaChai,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_FaChai },
		imgName: "fachai"
	},
	{
		...defGameInfo.Casino_PNG,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_PNG },
		imgName: "pnga"
	},
	{
		...defGameInfo.Casino_Amigo,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_Amigo },
		imgName: "amigoa"
	}
];

export default defPlatfrom;
