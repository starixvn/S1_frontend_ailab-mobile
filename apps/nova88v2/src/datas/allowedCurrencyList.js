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
	rewards: [defCurrenyId.MYR, defCurrenyId.THB, defCurrenyId.IDR],
	wheel: [defCurrenyId.MYR, defCurrenyId.THB, defCurrenyId.IDR],
	worldCup: [
		defCurrenyId.MYR,
		defCurrenyId.THB,
		defCurrenyId.IDR,
		defCurrenyId.INR
	],
	dragonEgg: [
		defCurrenyId.MYR,
		defCurrenyId.THB,
		defCurrenyId.IDR,
		defCurrenyId.VND
	],

	// ==== transfer ====
	transferFunds: [defCurrenyId.INR, defCurrenyId.BDT, defCurrenyId.USD],

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
	allbet: [defCurrenyId.MYR, defCurrenyId.IDR, defCurrenyId.THB],

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
	FaChai: [
		defCurrenyId.MYR,
		defCurrenyId.THB,
		defCurrenyId.IDR,
		defCurrenyId.INR,
		defCurrenyId.BDT,
		defCurrenyId.USD,
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
	vGaming: [
		defCurrenyId.MYR,
		defCurrenyId.IDR,
		defCurrenyId.THB,
		defCurrenyId.BDT,
		defCurrenyId.CNY,
		defCurrenyId.USD,
		defCurrenyId.KHM,
		defCurrenyId.INR
	],
	spaceman: [
		defCurrenyId.MYR,
		defCurrenyId.IDR,
		defCurrenyId.THB,
		defCurrenyId.BDT,
		defCurrenyId.CNY,
		defCurrenyId.USD,
		defCurrenyId.KHM
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

	// other products

	// slot & game
	SPRIBE: [
		defCurrenyId.MYR,
		defCurrenyId.THB,
		defCurrenyId.IDR,
		defCurrenyId.INR,
		defCurrenyId.USD,
		defCurrenyId.CNY,
		defCurrenyId.KHM
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
