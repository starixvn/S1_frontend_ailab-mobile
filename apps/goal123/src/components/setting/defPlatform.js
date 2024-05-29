import { products } from "@ailab-mobile/common";
import { defMenuType } from "../../datas/defMenu";
import path from "../../path";

const defPlatForm = [
	{
		...products.Soccer,
		imgName: "sabab"
	},
	{
		...products.TFGaming,
		imgName: "tfga"
	},
	{
		...products.SBOBET,
		imgName: "sboa"
	},
	{
		...products.BtiSport,
		imgName: "btia"
	},
	{
		...products.AsiaGaming,
		imgName: "aga"
	},
	{
		...products.Allbet,
		imgName: "aba"
	},
	{
		...products.AESexy,
		imgName: "aea"
	},
	{
		...products.NewPlayTechSlot,
		imgName: "ppb",
		path: path.casino.root,
		parameter: { provider: products.NewPlayTechSlot.tpId },
		menuType: defMenuType.Link
	},
	{
		...products.BigGaming,
		imgName: "bga"
	},
	{
		...products.YeebetCasino,
		imgName: "yba"
	},
	{
		...products.MicrogamingCasino,
		imgName: "mga"
	},
	{
		...products.NewPlayTechCasino,
		imgName: "pta"
	},
	{
		...products.PGSoft,
		imgName: "pga",
		path: path.casino.root,
		parameter: { provider: products.PGSoft.tpId },
		menuType: defMenuType.Link
	},
	{
		...products.Spadegaming,
		imgName: "sga",
		path: path.casino.root,
		parameter: { provider: products.Spadegaming.tpId },
		menuType: defMenuType.Link
	},
	{
		...products.YGGDrassil,
		imgName: "yga",
		path: path.casino.root,
		parameter: { provider: products.YGGDrassil.tpId },
		menuType: defMenuType.Link
	},
	{
		...products.CQ9,
		imgName: "cq9a",
		menuType: defMenuType.Link,
		parameter: { provider: products.CQ9.tpId },
		path: path.casino.root
	},
	{
		...products.JILI,
		imgName: "jilia",
		menuType: defMenuType.Link,
		parameter: { provider: products.JILI.tpId },
		path: path.casino.root
	},
	{
		...products.FishingWorld,
		imgName: "yla"
	},
	{
		...products.V8Poker,
		imgName: "v8a"
	},
	{
		...products.KingMaker,
		imgName: "kingmakera"
	},
	{
		...products.NetEnt,
		imgName: "nea",
		menuType: defMenuType.Link,
		parameter: { provider: products.NetEnt.tpId },
		path: path.casino.root
	},
	{
		...products.EvolutionGaming,
		imgName: "evolutiona"
	},
	{
		...products.RedTiger,
		imgName: "rta",
		menuType: defMenuType.Link,
		parameter: { provider: products.RedTiger.tpId },
		path: path.casino.root
	},
	{
		...products.AdvantPlay,
		imgName: "apa",
		menuType: defMenuType.Link,
		parameter: { provider: products.AdvantPlay.tpId },
		...products.AdvantPlay,
		path: path.casino.root
	},
	{
		...products.Habanero,
		imgName: "habaneroa",
		menuType: defMenuType.Link,
		parameter: { provider: products.Habanero.tpId },
		path: path.casino.root
	},
	{
		...products.SimplePlay,
		imgName: "simpleplaya",
		menuType: defMenuType.Link,
		parameter: { provider: products.SimplePlay.tpId },
		path: path.casino.root
	},
	{
		...products.SkywindCasino,
		imgName: "ska"
	},
	{
		...products.Nextspin,
		imgName: "nextspina",
		menuType: defMenuType.Link,
		parameter: { provider: products.Nextspin.tpId },
		path: path.casino.root
	},
	{
		...products.IMSports,
		imgName: "im-sportsa"
	},
	{
		...products.IMESports,
		imgName: "im-esportsa"
	},
	{
		...products.SPRIBE,
		imgName: "spribea",
		menuType: defMenuType.Link,
		parameter: { provider: products.SPRIBE.tpId },
		path: path.casino.root
	},
	{
		...products.WE,
		imgName: "we"
	},
	{
		...products.ES,
		imgName: "es",
		menuType: defMenuType.Link,
		parameter: { provider: products.ES.tpId },
		path: path.casino.root
	},
	{
		...products.FaChai,
		imgName: "fachai",
		menuType: defMenuType.Link,
		parameter: { provider: products.FaChai.tpId },
		path: path.casino.root
	},
	{
		...products.PlaynGO,
		imgName: "pnga",
		menuType: defMenuType.Link,
		parameter: { provider: products.PlaynGO.tpId },
		path: path.casino.root
	},
	{
		...products.BNG,
		imgName: "bnga",
		menuType: defMenuType.Link,
		parameter: { provider: products.BNG.tpId },
		path: path.casino.root
	},
	{
		...products.NoLimitCity,
		imgName: "nlca",
		menuType: defMenuType.Link,
		parameter: { provider: products.NoLimitCity.tpId },
		path: path.casino.root
	},
	{
		...products.AmigoGaming,
		imgName: "amigoa",
		menuType: defMenuType.Link,
		parameter: { provider: products.AmigoGaming.tpId },
		path: path.casino.root
	},
	{
		...products.GACockFighting,
		imgName: "cockfightinga"
	},
	{
		...products["93Connect"],
		imgName: "93connecta"
	},
	{
		...products.WonCasino,
		imgName: "woncasinoa"
	}
];

export default defPlatForm;
