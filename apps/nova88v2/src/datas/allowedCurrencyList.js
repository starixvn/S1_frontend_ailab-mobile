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
	VIP: [defCurrenyId.MYR, defCurrenyId.THB, defCurrenyId.IDR],
	affiliate: [
		defCurrenyId.MYR,
		defCurrenyId.THB,
		defCurrenyId.IDR,
		defCurrenyId.CNY,
		defCurrenyId.BDT,
		defCurrenyId.USD,
		defCurrenyId.INR
	],
	exchange: [defCurrenyId.INR, defCurrenyId.BDT],
	rewards: [defCurrenyId.MYR, defCurrenyId.THB, defCurrenyId.IDR],
	wheel: [defCurrenyId.MYR, defCurrenyId.THB, defCurrenyId.IDR],
	worldCup: [
		defCurrenyId.MYR,
		defCurrenyId.THB,
		defCurrenyId.IDR,
		defCurrenyId.INR
	],

	// ==== withdrawal ====
	bankCard: [
		defCurrenyId.MYR,
		defCurrenyId.THB,
		defCurrenyId.IDR,
		defCurrenyId.INR,
		defCurrenyId.BDT
	],
	eWallet: [
		defCurrenyId.IDR,
		defCurrenyId.BDT,
		defCurrenyId.MYR,
		defCurrenyId.THB
	],

	// ====products====
	// sports
	wap: [defCurrenyId.IDR],

	// live casino
	liveCasinoWM: [defCurrenyId.MYR, defCurrenyId.THB, defCurrenyId.IDR],

	// slot
	slotAMB: [defCurrenyId.THB, defCurrenyId.USD, defCurrenyId.CNY],

	// poker
	oneGame: [
		defCurrenyId.MYR,
		defCurrenyId.IDR,
		defCurrenyId.THB,
		defCurrenyId.BDT,
		defCurrenyId.CNY,
		defCurrenyId.USD
	],

	// game
	mPoker: [defCurrenyId.THB],
	amb: [defCurrenyId.THB],

	// fishing
	fishingGod: [defCurrenyId.INR],
	oneShot: [defCurrenyId.INR],
	tyrantAndProncess: [defCurrenyId.INR],
	fishingOfSaviors: [defCurrenyId.INR],

	// lottery
	indo4d: [defCurrenyId.IDR],
	thaiLottery: [defCurrenyId.THB]
};

export default allowedCurrencyList;
