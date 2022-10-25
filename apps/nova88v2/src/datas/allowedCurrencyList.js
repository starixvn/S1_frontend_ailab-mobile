import { defCurrenyId } from "../components/common/common";

const allowedCurrencyList = {
	VIP: [defCurrenyId.MYR, defCurrenyId.THB, defCurrenyId.IDR],
	affiliate: [
		defCurrenyId.MYR,
		defCurrenyId.THB,
		defCurrenyId.IDR,
		defCurrenyId.CNY
	],
	exchange: [defCurrenyId.INR, defCurrenyId.BDT],
	rewards: [defCurrenyId.MYR, defCurrenyId.THB, defCurrenyId.IDR],
	worldCup: [
		defCurrenyId.MYR,
		defCurrenyId.THB,
		defCurrenyId.IDR,
		defCurrenyId.INR
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
		defCurrenyId.IDR,
		defCurrenyId.MYR,
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

	// kelo
	indo4d: [defCurrenyId.IDR]
};

export default allowedCurrencyList;
