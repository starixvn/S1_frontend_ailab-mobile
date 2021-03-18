import React from "react";
import { Router } from "@reach/router";

import MyWallet from "../pages/wallet";
import Promotion from "../pages/promotion";
import Casino from "../pages/casino";

import path from "../path";
import Home from "../pages/home";

import ForgetPwd from "../components/login/forgetPwd";
import ResetPwd from "../components/login/resetPwd";

import Setting from "../pages/setting";
import ContactUs from "../components/setting/contactUs";
import GameProvider from "../components/setting/gameProvider";
import Whoami from "../pages/whoami";
import PromotionInfo from "../pages/promotionInfo";

import Ranking from "../pages/ranking";
import AngPow from "../pages/angPow";

import BankInfo from "../pages/bankInfo";
import Profile from "../pages/profile";
import Message from "../pages/message";
import Announcement from "../pages/announcement";

import Deposit from "../pages/deposit";
import DepositHome from "../components/deposit/deposit";
import {
	Panel as OnlineBanking,
	Main as OnlineBankingMain
} from "../components/deposit/deposit.onlineBanking";
import SetOnlineBanking from "../components/deposit/deposit.onlineBanking.set";

import {
	Panel as MobilePay,
	Main as MobilePayMain
} from "../components/deposit/deposit.mobilePay";
import SetMobilePay from "../components/deposit/deposit.mobilePay.set";

import {
	Panel as CryptoPay,
	Main as CryptoPayMain
} from "../components/deposit/deposit.cryptoPay";
import SetCryptoPay from "../components/deposit/deposit.cryptoPay.set";

import {
	Panel as LocalBank,
	Main as LocalBankMain
} from "../components/deposit/deposit.localBank";
import DepositHistory from "../pages/depositHistory";

import Withdrawal from "../pages/withdrawal";
import WithdrawalHistory from "../pages/withdrawalHistory";

import Transfer from "../pages/transfer";
// import TransferHome from "../components/transfer/transfer";
import TransferHistory from "../pages/transferHistory";

import Statement from "../pages/statement";
import BetDateRange from "../components/statement/byDateRange";
import BetOneDay from "../components/statement/byDay";
import BetByCategory from "../components/statement/byCategory";
import BetDetail from "../components/statement/detail";
import FinancialLog from "../pages/financialLog";
import FinancialLogHome from "../components/statement/financialLog";

import ChangePwd from "../components/profile/changePwd";

import Kyc from "../components/withdrawal/kyc";
import KycWaiting from "../components/withdrawal/kycWaiting";

import Kiss918 from "../pages/918kiss";

import FriendReferral from "../pages/referral";
// import ReferFriends from "../components/referral/referFriends";
import ReferralHistory from "../pages/referralHistory";

import OneGame from "../pages/oneGame";

const RouteComponents = () => {
	return (
		<Router>
			<Home path={`/:langId/${path.home.root}`} default>
				<Home path={path.join.root} />
				<Home path={path.login.root} />
			</Home>
			<ForgetPwd path={`/:langId/${path.forgetPassword.root}`} />
			<ResetPwd path={`/:langId/${path.resetPassword.root}`} />
			<Promotion path={`/:langId/${path.promotion.root}`} />
			<PromotionInfo path={`/:langId/${path.promotionInfo.root}`} />
			<Casino path={`/:langId/${path.casino.root}`} />
			<Casino path={`/:langId/${path.casino.root}/:tpId`} />
			<Setting path={`/:langId/${path.setting.root}`} />
			<ContactUs path={`/:langId/${path.contactUs.root}`} />
			<GameProvider path={`/:langId/${path.gameProvider.root}`} />

			<Whoami path={path.whoami.root} />
			<Ranking path={`/:langId/${path.ranking.root}`} />
			<AngPow path={`/:langId/${path.angPow.root}`} />

			<ForgetPwd path={`/:langId/${path.forgetPassword.root}`} />
			<ResetPwd path={`/:langId/${path.resetPassword.root}`} />
			<Promotion path={`/:langId/${path.promotion.root}`} />
			<PromotionInfo path={`/:langId/${path.promotionInfo.root}`} />
			<Casino path={`/:langId/${path.casino.root}`} />
			<Casino path={`/:langId/${path.casino.root}/:tpId`} />
			<Whoami path={path.whoami.root} />
			<Ranking path={`/:langId/${path.ranking.root}`} />
			<AngPow path={`/:langId/${path.angPow.root}`} />

			<ChangePwd path={`/:langId/${path.changePassword.root}`} />
			<Profile path={`/:langId/${path.profile.root}`} />
			<BankInfo path={`/:langId/${path.bankInfo.root}`} />
			<MyWallet path={`/:langId/${path.wallet.root}`} />
			<Message path={`/:langId/${path.message.root}`} />
			<Announcement path={`/:langId/${path.announcement.root}`} />

			<FriendReferral path={`/:langId/${path.referral.root}`} />
			<ReferralHistory path={`/:langId/${path.referralHistory.root}`} />

			<Deposit path={`/:langId/${path.deposit.root}`}>
				<DepositHome path={path.deposit.sub.root} />
				<OnlineBanking path={path.deposit.sub.onlineBank.root}>
					<OnlineBankingMain
						path={path.deposit.sub.onlineBank.sub.root}
					/>
					<SetOnlineBanking
						path={
							path.deposit.sub.onlineBank.sub.setOnlineBanking
								.root
						}
					/>
				</OnlineBanking>
				<MobilePay path={path.deposit.sub.mobilePay.root}>
					<MobilePayMain path={path.deposit.sub.mobilePay.sub.root} />
					<SetMobilePay
						path={path.deposit.sub.mobilePay.sub.setMobilePay.root}
					/>
				</MobilePay>
				<CryptoPay path={path.deposit.sub.cryptoPay.root}>
					<CryptoPayMain path={path.deposit.sub.cryptoPay.sub.root} />
					<SetCryptoPay
						path={path.deposit.sub.cryptoPay.sub.setCryptoPay.root}
					/>
				</CryptoPay>
				<LocalBank path={path.deposit.sub.localBank.root}>
					<LocalBankMain path="/" />
				</LocalBank>
			</Deposit>
			<DepositHistory path={`/:langId/${path.depositHistory.root}`} />

			<Withdrawal path={`/:langId/${path.withdrawal.root}`} />
			<WithdrawalHistory
				path={`/:langId/${path.withdrawalHistory.root}`}
			/>

			<Kyc path={`/:langId/${path.kyc.root}`} />
			<KycWaiting path={`/:langId/${path.kycWaiting.root}`} />

			<Transfer path={`/:langId/${path.transfer.root}`} />
			<TransferHistory path={`/:langId/${path.transferHistory.root}`} />

			<Statement path={`/:langId/${path.statement.root}`} />
			<BetDateRange
				path={`/:langId/${path.statement.root}/:timePeriod`}
			/>
			<BetOneDay
				path={`/:langId/${path.statement.root}/:timePeriod/:date`}
			/>
			<BetByCategory
				path={`/:langId/${path.statement.root}/:timePeriod/:date/:category`}
			/>
			<BetDetail
				path={`/:langId/${path.statement.root}/:timePeriod/:date/:category/:game`}
			/>

			<FinancialLog path={`/:langId/${path.financialLog.root}`}>
				<FinancialLogHome path="/" />{" "}
			</FinancialLog>

			<OneGame path={`/:langId/${path.oneGame.root}`} />
			{/* <Kiss918 path={`/:langId/${path.kiss918.root}`} /> */}
		</Router>
	);
};

export default RouteComponents;
