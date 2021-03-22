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
	member: {
		root: "member",
		sub: {
			root: "/",
			bankInfo: {
				root: "bankinfo"
			}
		}
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
			localBank: {
				root: "localBank"
			},
			history: {
				root: "history"
			}
		}
	},
	withdrawal: {
		root: "withdrawal",
		sub: {
			root: "/",
			history: {
				root: "history"
			}
		}
	},
	transfer: {
		root: "transfer",
		sub: {
			root: "/",
			history: {
				root: "history"
			}
		}
	},
	statement: {
		root: "statement"
	},
	financialLog: {
		root: "financialLog"
	},
	message: {
		root: "message",
		sub: {
			root: "/",
			announcement: {
				root: "announcement"
			}
		}
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
		root: "setting",
		sub: {
			root: "/",
			other: {
				root: "other"
			}
		}
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
	leaderBoard: {
		root: "leaderBoard"
	},
	angPow: {
		root: "angPow"
	},
	referral: {
		root: "referral",
		sub: {
			root: "/",
			history: {
				root: "history"
			}
		}
	},
	mysteryBox: {
		root: "mysteryBox"
	},
	vip: {
		root: "vip"
	}
};
