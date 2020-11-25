import { transferDirection } from "../../../lib/common/common";

describe("transferDirection", () => {
	test("transfer from displayMainWallet to displaySabaWallet", () => {
		let result = {
			startWallet: "Main Wallet",
			endWallet: "Sportsbook Wallet"
		};
		expect(
			transferDirection(1, "Main Wallet", "Sportsbook Wallet").endWallet
		).toBe(result.endWallet);
	});

	test("transfer from displaySabaWallet to displayMainWallet", () => {
		let result = {
			startWallet: "Main Wallet",
			endWallet: "Sportsbook Wallet"
		};
		expect(
			transferDirection(2, "Main Wallet", "Sportsbook Wallet")
		).not.toBe(result);
	});

	test("undefined direction", () => {
		expect(
			transferDirection(0, "Main Wallet", "Sportsbook Wallet").endWallet
		).toBe("");

		expect(
			transferDirection(0, "Main Wallet", "Sportsbook Wallet").startWallet
		).toBe("");
	});
});
