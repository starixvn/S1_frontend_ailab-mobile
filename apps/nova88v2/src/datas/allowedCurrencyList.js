import { defCurrenyId } from "../components/common/common";

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
		defCurrenyId.KHM
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
	slotAMB: [
		defCurrenyId.THB,
		defCurrenyId.USD,
		defCurrenyId.CNY,
		defCurrenyId.KHM
	],

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
	vGaming: [
		defCurrenyId.MYR,
		defCurrenyId.IDR,
		defCurrenyId.THB,
		defCurrenyId.BDT,
		defCurrenyId.CNY,
		defCurrenyId.USD,
		defCurrenyId.INR
	],
	maxGame: [
		defCurrenyId.MYR,
		defCurrenyId.IDR,
		defCurrenyId.THB,
		defCurrenyId.BDT,
		defCurrenyId.CNY,
		defCurrenyId.USD,
		defCurrenyId.INR
	],
	virtualGame: [
		defCurrenyId.MYR,
		defCurrenyId.IDR,
		defCurrenyId.THB,
		defCurrenyId.BDT,
		defCurrenyId.CNY,
		defCurrenyId.USD,
		defCurrenyId.INR
	],

	// fishing
	fishingGod: [defCurrenyId.INR, defCurrenyId.KHM],
	oneShot: [defCurrenyId.INR],
	tyrantAndProncess: [defCurrenyId.INR],
	fishingOfSaviors: [defCurrenyId.INR],

	// lottery
	indo4d: [defCurrenyId.IDR],
	thaiLottery: [defCurrenyId.THB]
};

export default allowedCurrencyList;
