import { isDateRange } from "@ailab-mobile/common";
import { defCurrenyId } from "../components/common/common";

export const changeAllowCurrenciesByTime = ({
	allowCurriesList,
	currencies,
	endTime
}) => {
	const oldCurrencyList = allowCurriesList ?? Object.values(defCurrenyId);
	const allowCurrencies = isDateRange({ endDate: endTime })
		? oldCurrencyList.filter(currency => !currencies.includes(currency))
		: oldCurrencyList;

	return allowCurrencies;
};

const allowedCurrencyList = {
	VIP: [
		defCurrenyId.MYR,
		defCurrenyId.THB,
		defCurrenyId.IDR,
		defCurrenyId.VND
	],
	affiliate: [
		defCurrenyId.MYR,
		defCurrenyId.THB,
		defCurrenyId.IDR,
		defCurrenyId.CNY,
		defCurrenyId.BDT,
		defCurrenyId.USD,
		defCurrenyId.KHM,
		defCurrenyId.INR,
		defCurrenyId.VND
	],
	exchange: [defCurrenyId.INR, defCurrenyId.BDT, defCurrenyId.USD],
	rewards: [
		defCurrenyId.MYR,
		defCurrenyId.THB,
		defCurrenyId.IDR,
		defCurrenyId.VND
	],
	wheel: [defCurrenyId.MYR, defCurrenyId.THB, defCurrenyId.IDR],
	worldCup: [
		defCurrenyId.MYR,
		defCurrenyId.THB,
		defCurrenyId.IDR,
		defCurrenyId.INR
	],
	"4D": [defCurrenyId.MYR],
	dragonEgg: [
		defCurrenyId.MYR,
		defCurrenyId.THB,
		defCurrenyId.IDR,
		defCurrenyId.VND
	],

	// ==== transfer ====
	transferFunds: [
		defCurrenyId.INR,
		defCurrenyId.BDT,
		defCurrenyId.USD,
		defCurrenyId.MYR
	],

	// ==== withdrawal ====
	bankCard: [
		defCurrenyId.MYR,
		defCurrenyId.THB,
		defCurrenyId.IDR,
		defCurrenyId.INR,
		defCurrenyId.BDT,
		defCurrenyId.KHM,
		defCurrenyId.VND,
		defCurrenyId.KHM,
		defCurrenyId.CNY
	],
	eWallet: [
		defCurrenyId.IDR,
		defCurrenyId.BDT,
		defCurrenyId.MYR,
		defCurrenyId.THB
	],

	// ====products====
	// sports
	sportsCricket: [defCurrenyId.BDT, defCurrenyId.INR],
	sportsVolleyball: [
		defCurrenyId.MYR,
		defCurrenyId.THB,
		defCurrenyId.IDR,
		defCurrenyId.USD,
		defCurrenyId.CNY,
		defCurrenyId.KHM
	],
	wap: [defCurrenyId.IDR],

	// esports
	esports_IM: [
		defCurrenyId.MYR,
		defCurrenyId.THB,
		defCurrenyId.IDR,
		defCurrenyId.VND,
		defCurrenyId.KHM,
		defCurrenyId.INR,
		defCurrenyId.BDT
	],

	// live casino
	liveCasinoWM: [
		defCurrenyId.MYR,
		defCurrenyId.USD,
		defCurrenyId.THB,
		defCurrenyId.CNY,
		defCurrenyId.IDR,
		defCurrenyId.INR,
		defCurrenyId.KHM,
		defCurrenyId.VND
	],

	liveCasino_N2: [
		defCurrenyId.THB,
		defCurrenyId.IDR,
		defCurrenyId.CNY,
		defCurrenyId.BDT,
		defCurrenyId.USD,
		defCurrenyId.KHM,
		defCurrenyId.INR,
		defCurrenyId.VND
	],
	liveCasinoSkywind: [
		defCurrenyId.MYR,
		defCurrenyId.THB,
		defCurrenyId.IDR,
		defCurrenyId.CNY,
		defCurrenyId.USD,
		defCurrenyId.KHM,
		defCurrenyId.INR,
		defCurrenyId.VND
	],
	liveCasinoMG: [
		defCurrenyId.MYR,
		defCurrenyId.THB,
		defCurrenyId.IDR,
		defCurrenyId.BDT,
		defCurrenyId.USD,
		defCurrenyId.KHM,
		defCurrenyId.INR,
		defCurrenyId.VND
	],
	liveCasinoPlayTech: [
		defCurrenyId.MYR,
		defCurrenyId.THB,
		defCurrenyId.IDR,
		defCurrenyId.CNY,
		defCurrenyId.USD,
		defCurrenyId.KHM,
		defCurrenyId.INR,
		defCurrenyId.VND
	],
	liveCasinoDG: [
		defCurrenyId.MYR,
		defCurrenyId.THB,
		defCurrenyId.IDR,
		defCurrenyId.CNY,
		defCurrenyId.USD,
		defCurrenyId.KHM,
		defCurrenyId.INR,
		defCurrenyId.VND,
		defCurrenyId.BDT
	],
	liveCasinoSA: [
		defCurrenyId.MYR,
		defCurrenyId.THB,
		defCurrenyId.IDR,
		defCurrenyId.BDT,
		defCurrenyId.USD,
		defCurrenyId.KHM,
		defCurrenyId.INR,
		defCurrenyId.VND
	],
	allbet: [defCurrenyId.MYR, defCurrenyId.IDR, defCurrenyId.THB],
	liveCasino_SkyWind: [
		defCurrenyId.MYR,
		defCurrenyId.IDR,
		defCurrenyId.CNY,
		defCurrenyId.INR,
		defCurrenyId.VND,
		defCurrenyId.THB
	],

	// slot
	slotAMB: [
		defCurrenyId.THB,
		defCurrenyId.USD,
		defCurrenyId.KHM,
		defCurrenyId.CNY
	],
	slotJoker: [
		defCurrenyId.MYR,
		defCurrenyId.USD,
		defCurrenyId.THB,
		defCurrenyId.CNY,
		defCurrenyId.IDR,
		defCurrenyId.INR,
		defCurrenyId.KHM,
		defCurrenyId.BDT,
		defCurrenyId.USDT
	],
	slotPegasus: [defCurrenyId.MYR],
	slotSimplePlay: [
		defCurrenyId.MYR,
		defCurrenyId.THB,
		defCurrenyId.IDR,
		defCurrenyId.BDT,
		defCurrenyId.USD,
		defCurrenyId.KHM,
		defCurrenyId.INR,
		defCurrenyId.VND
	],
	slotMicrogaming: [
		defCurrenyId.MYR,
		defCurrenyId.THB,
		defCurrenyId.IDR,
		defCurrenyId.BDT,
		defCurrenyId.USD,
		defCurrenyId.KHM,
		defCurrenyId.INR,
		defCurrenyId.VND
	],
	slotPGSoft: [
		defCurrenyId.THB,
		defCurrenyId.IDR,
		defCurrenyId.CNY,
		defCurrenyId.BDT,
		defCurrenyId.USD,
		defCurrenyId.KHM,
		defCurrenyId.INR,
		defCurrenyId.VND
	],
	slotSkyWind: [
		defCurrenyId.MYR,
		defCurrenyId.THB,
		defCurrenyId.IDR,
		defCurrenyId.CNY,
		defCurrenyId.USD,
		defCurrenyId.KHM,
		defCurrenyId.INR,
		defCurrenyId.VND
	],
	slotPlayTech: [
		defCurrenyId.MYR,
		defCurrenyId.THB,
		defCurrenyId.IDR,
		defCurrenyId.CNY,
		defCurrenyId.USD,
		defCurrenyId.KHM,
		defCurrenyId.INR,
		defCurrenyId.VND
	],
	FaChai: [
		defCurrenyId.MYR,
		defCurrenyId.THB,
		defCurrenyId.IDR,
		defCurrenyId.INR,
		defCurrenyId.BDT,
		defCurrenyId.USD,
		defCurrenyId.VND
	],
	slot_SkyWind: [
		defCurrenyId.MYR,
		defCurrenyId.THB,
		defCurrenyId.IDR,
		defCurrenyId.CNY,
		defCurrenyId.INR,
		defCurrenyId.VND
	],
	slotAmigo: [
		defCurrenyId.MYR,
		defCurrenyId.THB,
		defCurrenyId.BDT,
		defCurrenyId.IDR,
		defCurrenyId.CNY,
		defCurrenyId.USD,
		defCurrenyId.INR,
		defCurrenyId.VND,
		defCurrenyId.KHM
	],

	// game
	mPoker: [defCurrenyId.THB],
	amb: [defCurrenyId.THB],
	spaceman: [
		defCurrenyId.MYR,
		defCurrenyId.IDR,
		defCurrenyId.THB,
		defCurrenyId.BDT,
		defCurrenyId.CNY,
		defCurrenyId.USD,
		defCurrenyId.KHM,
		defCurrenyId.VND
	],

	// fishing
	fishingGod: [defCurrenyId.INR, defCurrenyId.VND],
	oneShot: [defCurrenyId.INR, defCurrenyId.VND],
	tyrantAndProncess: [defCurrenyId.INR],
	fishingOfSaviors: [defCurrenyId.INR],
	fishing_Haiba: [
		defCurrenyId.MYR,
		defCurrenyId.USD,
		defCurrenyId.THB,
		defCurrenyId.CNY,
		defCurrenyId.IDR,
		defCurrenyId.INR,
		defCurrenyId.KHM,
		defCurrenyId.BDT,
		defCurrenyId.USDT
	],
	fishingHappyFish5: [
		defCurrenyId.MYR,
		defCurrenyId.USD,
		defCurrenyId.THB,
		defCurrenyId.CNY,
		defCurrenyId.IDR,
		defCurrenyId.INR,
		defCurrenyId.KHM,
		defCurrenyId.BDT,
		defCurrenyId.USDT
	],
	fishingMonsterAwaken: [
		defCurrenyId.MYR,
		defCurrenyId.USD,
		defCurrenyId.THB,
		defCurrenyId.CNY,
		defCurrenyId.IDR,
		defCurrenyId.INR,
		defCurrenyId.KHM,
		defCurrenyId.BDT,
		defCurrenyId.USDT
	],

	// 4D
	haoLong: [defCurrenyId.MYR],

	// lottery
	indo4d: [defCurrenyId.IDR],
	thaiLottery: [defCurrenyId.THB],
	fast3: [
		defCurrenyId.MYR,
		defCurrenyId.USD,
		defCurrenyId.THB,
		defCurrenyId.CNY,
		defCurrenyId.IDR,
		defCurrenyId.INR,
		defCurrenyId.KHM,
		defCurrenyId.BDT,
		defCurrenyId.USDT
	],
	Traditional_Lottery: [defCurrenyId.VND],

	// other products

	// slot & game
	SPRIBE: [
		defCurrenyId.MYR,
		defCurrenyId.THB,
		defCurrenyId.IDR,
		defCurrenyId.INR,
		defCurrenyId.USD,
		defCurrenyId.CNY,
		defCurrenyId.KHM,
		defCurrenyId.VND
	],
	PP: [
		defCurrenyId.MYR,
		defCurrenyId.USD,
		defCurrenyId.THB,
		defCurrenyId.CNY,
		defCurrenyId.IDR,
		defCurrenyId.KHM,
		defCurrenyId.BDT,
		defCurrenyId.VND
	],
	V8Poker: [
		defCurrenyId.MYR,
		defCurrenyId.USD,
		defCurrenyId.THB,
		defCurrenyId.IDR,
		defCurrenyId.INR,
		defCurrenyId.CNY,
		defCurrenyId.KHM,
		defCurrenyId.VND,
		defCurrenyId.USDT
	]
};

export default allowedCurrencyList;
