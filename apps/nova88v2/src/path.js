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
		root: "bankInfo"
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
		root: "depositHistory"
	},
	withdrawal: {
		root: "withdrawal"
	},
	withdrawalHistory: {
		root: "withdrawalHistory"
	},
	transfer: {
		root: "transfer"
	},
	transferHistory: {
		root: "transferHistory"
	},
	statement: {
		root: "statement"
	},
	financialLog: {
		root: "financialLog"
	},
	message: {
		root: "message"
	},
	announcement: {
		root: "announcement"
	},
	casino: {
		root: "casino"
	},
	forgetPassword: {
		root: "forgetPassword"
	},
	resetPassword: {
		root: "resetPassword"
	},
	changePassword: { root: "changePassword" },
	setting: {
		root: "setting"
	},
	kyc: {
		root: "kyc"
	},
	kycWaiting: {
		root: "kycWaiting"
	},
	whoami: {
		root: "whoami"
	},
	ranking: {
		root: "leaderBoard"
	},
	kiss918: {
		root: "918kiss"
	},
	referral: {
		root: "referral"
	},
	referralHistory: {
		root: "referralHistory"
	},
	angPow: {
		root: "angPow"
	},
	oneGame: {
		root: "oneGame"
	},
	contactUs: {
		root: "contactUs"
	},
	gameProvider: {
		root: "gameProvider"
	}
};
