export default {
	home: {
		root: "/"
	},
	promotion: {
		root: "promotion"
	},
	promotionInfo: {
		root: "promotion/promotionInfo"
	},
	wallet: {
		root: "wallet"
	},
	livechat: {
		root: "livechat"
	},
	profile: {
		root: "profile"
	},
	bankInfo: {
		root: "bank-info"
	},
	login: {
		root: "login"
	},
	join: {
		root: "join"
	},
	deposit: {
		root: "deposit",
		sub: {
			root: "/",
			onlineBank: {
				root: "onlineBank",
				sub: {
					root: "/",
					setOnlineBanking: {
						root: ":payName"
					}
				}
			},
			mobilePay: {
				root: "mobilePay",
				sub: {
					root: "/",
					setMobilePay: {
						root: ":channelName"
					}
				}
			},
			cryptoPay: {
				root: "cryptoPay",
				sub: {
					root: "/",
					setCryptoPay: {
						root: ":channelName"
					}
				}
			},
			localBank: {
				root: "localBank"
			}
		}
	},
	depositHistory: {
		root: "deposit-history"
	},
	withdrawal: {
		root: "withdrawal"
	},
	eWalletWithdrawal: {
		root: "eWallet-withdrawal"
	},
	cryptoWithdrawal: {
		root: "crypto-withdrawal"
	},
	withdrawalHistory: {
		root: "withdrawal-history"
	},
	transfer: {
		root: "transfer"
	},
	transferHistory: {
		root: "transfer-history"
	},
	statement: {
		root: "statement"
	},
	financialLog: {
		root: "financial-log"
	},
	message: {
		root: "message"
	},
	announcement: {
		root: "announcement"
	},
	casino: {
		root: "slots"
	},
	forgetPassword: {
		root: "forget-password"
	},
	resetPassword: {
		root: "resetPassword"
	},
	changePassword: {
		root: "change-password"
	},
	setting: {
		root: "setting"
	},
	kyc: {
		root: "kyc"
	},
	kycWaiting: {
		root: "kyc-waiting"
	},
	whoami: {
		root: "whoami"
	},
	ranking: {
		root: "leaderboard"
	},
	kiss918: {
		root: "918kiss"
	},
	referral: {
		root: "referral"
	},
	referralHistory: {
		root: "referral-history"
	},
	angpao: {
		root: "angpao"
	},
	oneGame: {
		root: "poker"
	},
	vip: {
		root: "vip"
	},
	gameProvider: {
		root: "game-provider"
	},
	mysteryBox: {
		root: "mysteryBox"
	},
	luckyWheel: {
		root: "lucky-wheel"
	},
	streaming: {
		root: "streaming"
	},
	eWallet: {
		root: "eWallet"
	},
	cryptoWallet: {
		root: "crypto-wallet"
	},
	appDownload: {
		root: "app-download"
	},
	checkSpeed: {
		root: "speed"
	},
	um: {
		root: "um"
	},
	mega888: {
		root: "mega888"
	},
	worldCup: {
		root: "world-cup"
	},
	rebateExclude: {
		root: "rebateExclude"
	},
	dragonEgg: {
		root: "dragonEgg"
	}
};

export const defSpecialPath = {
	appentpage: "appEntPage"
};
