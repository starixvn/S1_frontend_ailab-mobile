export const transferDirection = (
	direction,
	displayMainWallet,
	displayAdjustment,
	isAdjustment,
	tpName
) => {
	let startWallet = "";
	let endWallet = "";
	if (direction === 1) {
		if (isAdjustment) {
			startWallet = tpName;
			endWallet = displayAdjustment;
		} else {
			startWallet = displayMainWallet;
			endWallet = tpName;
		}
	} else if (isAdjustment) {
		startWallet = tpName;
		endWallet = displayAdjustment;
	} else {
		startWallet = tpName;
		endWallet = displayMainWallet;
	}
	return { startWallet, endWallet };
};
