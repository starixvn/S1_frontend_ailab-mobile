import path from "../path";

export const account_msg = {
	myAccount: {
		to: path.profile.root,
		displayKey: "lbl_Profile",
		mainClass: "main"
	},
	message: {
		to: path.message.root,
		displayKey: "lbl_Message",
		tabHint: true,
		subTabs: {
			message: {
				to: path.message.root,
				displayKey: "lbl_PersonalMsg",
				mainClass: "main Message"
			},
			announcement: {
				to: path.announcement.root,
				displayKey: "lbl_Announcement",
				mainClass: "main Announcement"
			}
		}
	}
};

export const withdrawal = {
	withdrawal: {
		to: `${path.withdrawal.root}`,
		displayKey: "lbl_Withdrawal",
		mainClass: "main",
		subTabs: {
			withdrawal: {
				to: path.withdrawal.root,
				displayKey: "lbl_Withdrawal",
				mainClass: "main withdrawal",
				type: 1
			},
			cryptoWithdrawal: {
				to: path.cryptoWithdrawal.root,
				displayKey: "lbl_CryptoWithdrawal",
				mainClass: "main crypto",
				type: 4
			}
		}
	},
	withdrawalHistory: {
		to: `${path.withdrawalHistory.root}`,
		displayKey: "lbl_WithdrawalHistory",
		mainClass: "main history"
	}
};

export const withdrawalWithEWallet = {
	withdrawal: {
		to: `${path.withdrawal.root}`,
		displayKey: "lbl_Withdrawal",
		mainClass: "main",
		subTabs: {
			withdrawal: {
				to: path.withdrawal.root,
				displayKey: "lbl_Withdrawal",
				mainClass: "main withdrawal",
				type: 1
			},
			eWalletWithdrawal: {
				to: path.eWalletWithdrawal.root,
				displayKey: "lbl_EWalletWithdrawal",
				mainClass: "main eWallet",
				type: 3
			},
			cryptoWithdrawal: {
				to: path.cryptoWithdrawal.root,
				displayKey: "lbl_CryptoWithdrawal",
				mainClass: "main crypto",
				type: 4
			}
		}
	},
	withdrawalHistory: {
		to: `${path.withdrawalHistory.root}`,
		displayKey: "lbl_WithdrawalHistory",
		mainClass: "main history"
	}
};

export const withdrawalWithoutBankInfo = {
	withdrawal: {
		to: `${path.withdrawal.root}`,
		displayKey: "lbl_Withdrawal",
		mainClass: "main",
		subTabs: {
			cryptoWithdrawal: {
				to: path.cryptoWithdrawal.root,
				displayKey: "lbl_CryptoWithdrawal",
				mainClass: "main crypto",
				type: 4
			}
		}
	},
	withdrawalHistory: {
		to: `${path.withdrawalHistory.root}`,
		displayKey: "lbl_WithdrawalHistory",
		mainClass: "main history"
	}
};

export const transfer = {
	transfer: {
		to: `${path.transfer.root}`,
		displayKey: "lbl_Transfer",
		mainClass: "main"
	},
	transferHistory: {
		to: `${path.transferHistory.root}`,
		displayKey: "lbl_TransferHistory",
		mainClass: "main history"
	}
};

export const deposit = {
	deposit: {
		to: `${path.deposit.root}`,
		displayKey: "lbl_Deposit",
		mainClass: "main"
	},
	depositHistory: {
		to: `${path.depositHistory.root}`,
		displayKey: "lbl_DepositHistory",
		mainClass: "main history"
	}
};

export const statement_financialLog = {
	statement: {
		to: `${path.statement.root}`,
		displayKey: "lbl_Statement",
		mainClass: "main history"
	},
	financialLog: {
		to: `${path.financialLog.root}`,
		displayKey: "lbl_financialLog",
		mainClass: "main history"
	}
};

export const myWallet = {
	myWallet: {
		to: `${path.wallet.root}`,
		displayKey: "lbl_MyWallet",
		mainClass: "main"
	},
	bankInfo: {
		to: path.bankInfo.root,
		displayKey: "lbl_BankInfo",
		subTabs: {
			bankInfo: {
				to: path.bankInfo.root,
				displayKey: "lbl_BankInfo",
				mainClass: "main Wallet",
				type: 1
			},
			cryptoWallet: {
				to: path.cryptoWallet.root,
				displayKey: "lbl_CryptoWallet",
				mainClass: "main Wallet",
				type: 4
			}
		}
	}
};

export const myWalletWithEWallet = {
	myWallet: {
		to: `${path.wallet.root}`,
		displayKey: "lbl_MyWallet",
		mainClass: "main"
	},
	bankInfo: {
		to: path.bankInfo.root,
		displayKey: "lbl_BankInfo",
		subTabs: {
			bankInfo: {
				to: path.bankInfo.root,
				displayKey: "lbl_BankInfo",
				mainClass: "main Wallet",
				type: 1
			},
			eWallet: {
				to: path.eWallet.root,
				displayKey: "lbl_EWallet",
				mainClass: "main Wallet",
				type: 3
			},
			cryptoWallet: {
				to: path.cryptoWallet.root,
				displayKey: "lbl_CryptoWallet",
				mainClass: "main Wallet",
				type: 4
			}
		}
	}
};

export const myWalletWithoutBankInfo = {
	myWallet: {
		to: `${path.wallet.root}`,
		displayKey: "lbl_MyWallet",
		mainClass: "main"
	},
	bankInfo: {
		to: path.bankInfo.root,
		displayKey: "lbl_BankInfo",
		subTabs: {
			cryptoWallet: {
				to: path.cryptoWallet.root,
				displayKey: "lbl_CryptoWallet",
				mainClass: "main Wallet",
				type: 4
			}
		}
	}
};

export const referral = {
	transfer: {
		to: `${path.referral.root}`,
		displayKey: "lbl_ReferFriends",
		mainClass: "main referral"
	},
	referralHistory: {
		to: `${path.referralHistory.root}`,
		displayKey: "lbl_ReferralHistory",
		mainClass: "main history"
	}
};
