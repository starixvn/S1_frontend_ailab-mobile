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
		defCurrenyId.INR
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
		defCurrenyId.VND
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
	allbet: [
		defCurrenyId.MYR,
		defCurrenyId.IDR,
		defCurrenyId.THB,
		defCurrenyId.VND
	],

	// slot
	slotAMB: [
		defCurrenyId.THB,
		defCurrenyId.USD,
		defCurrenyId.KHM,
		defCurrenyId.CNY
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

	// fishing
	fishingGod: [defCurrenyId.INR, defCurrenyId.KHM],
	oneShot: [defCurrenyId.INR],
	tyrantAndProncess: [defCurrenyId.INR],
	fishingOfSaviors: [defCurrenyId.INR],

	// lottery
	indo4d: [defCurrenyId.IDR],
	thaiLottery: [defCurrenyId.THB],

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
	]
};

export default allowedCurrencyList;
