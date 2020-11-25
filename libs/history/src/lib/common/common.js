export const transferDirection = (
	direction,
	displayMainWallet,
	displaySabaWallet
) => {
	let startWallet = "";
	let endWallet = "";

	if (direction === 1) {
		startWallet = displayMainWallet;
		endWallet = displaySabaWallet;
	} else if (direction === 2) {
		startWallet = displaySabaWallet;
		endWallet = displayMainWallet;
	}

	return { startWallet, endWallet };
};
