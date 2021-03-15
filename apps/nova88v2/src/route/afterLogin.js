import React, { lazy, Suspense } from "react";
import { Router } from "@reach/router";
import path from "../path";

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

import DepositHistory from "../components/deposit/deposit.history";

import Withdrawal from "../pages/withdrawal";
import WithdrawalHome from "../components/withdrawal/withdrawal";
import WithdrawalHistory from "../components/withdrawal/withdrawal.history";

import Transfer from "../pages/transfer";
import TransferHome from "../components/transfer/transfer";
import TransferHistory from "../components/transfer/transfer.history";

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

// import Kiss918 from "../pages/918kiss";

import FriendReferral from "../pages/referral";
import ReferFriends from "../components/referral/referFriends";
import ReferralHistory from "../components/referral/referral.history";

import OneGame from "../pages/oneGame";

// const Loadable = ({ loader, loading }) => {
// 	const Content = lazy(loader);
// 	return (
// 		<Suspense fallback={loading ?? <div />}>
// 			<Content />
// 		</Suspense>
// 	);
// };

// export const MyWallet = () =>
// 	Loadable({ loader: () => import("../pages/wallet") });

// export const Promotion = () =>
// 	Loadable({ loader: () => import("../pages/promotion") });

// export const Casino = () =>
// 	Loadable({ loader: () => import("../pages/casino") });

// export const ForgetPwd = () =>
// 	Loadable({ loader: () => import("../components/login/forgetPwd") });

// export const ResetPwd = () =>
// 	Loadable({ loader: () => import("../components/login/resetPwd") });

// const AfterLoginRouter = () => (
// 	<Router>
// 		<ForgetPwd path={`/:langId/${path.forgetPassword.root}`} />
// 		<ResetPwd path={`/:langId/${path.resetPassword.root}`} />
// 		<PromotionInfo path={`/:langId/${path.promotionInfo.root}`} />

// 		<Whoami path={path.whoami.root} />
// 		<Ranking path={`/:langId/${path.ranking.root}`} />
// 		<AngPow path={`/:langId/${path.angPow.root}`} />

// 		<ChangePwd path={`/:langId/${path.changePassword.root}`} />
// 		<Profile path={`/:langId/${path.profile.root}`} />
// 		<BankInfo path={`/:langId/${path.bankInfo.root}`} />
// 		<MyWallet path={`/:langId/${path.wallet.root}`} />
// 		<Message path={`/:langId/${path.message.root}`} />
// 		<Announcement path={`/:langId/${path.announcement.root}`} />

// 		<FriendReferral path={`/:langId/${path.referral.root}`}>
// 			<ReferFriends path={path.referral.sub.root} />
// 			<ReferralHistory path={path.referral.sub.history.root} />
// 		</FriendReferral>

// 		<Deposit path={`/:langId/${path.deposit.root}`}>
// 			<DepositHome path={path.deposit.sub.root} />
// 			<OnlineBanking path={path.deposit.sub.onlineBank.root}>
// 				<OnlineBankingMain
// 					path={path.deposit.sub.onlineBank.sub.root}
// 				/>
// 				<SetOnlineBanking
// 					path={path.deposit.sub.onlineBank.sub.setOnlineBanking.root}
// 				/>
// 			</OnlineBanking>
// 			<MobilePay path={path.deposit.sub.mobilePay.root}>
// 				<MobilePayMain path={path.deposit.sub.mobilePay.sub.root} />
// 				<SetMobilePay
// 					path={path.deposit.sub.mobilePay.sub.setMobilePay.root}
// 				/>
// 			</MobilePay>
// 			<CryptoPay path={path.deposit.sub.cryptoPay.root}>
// 				<CryptoPayMain path={path.deposit.sub.cryptoPay.sub.root} />
// 				<SetCryptoPay
// 					path={path.deposit.sub.cryptoPay.sub.setCryptoPay.root}
// 				/>
// 			</CryptoPay>
// 			<LocalBank path={path.deposit.sub.localBank.root}>
// 				<LocalBankMain path="/" />
// 			</LocalBank>
// 			<DepositHistory path={path.deposit.sub.history.root} />
// 		</Deposit>
// 		<Withdrawal path={`/:langId/${path.withdrawal.root}`} />
// 		<WithdrawalHistory path={path.withdrawalHistory.root} />
// 		<Kyc path={`/:langId/${path.kyc.root}`} />
// 		<KycWaiting path={`/:langId/${path.kycWaiting.root}`} />
// 		<Transfer path={`/:langId/${path.transfer.root}`}>
// 			<TransferHome path={path.transfer.sub.root} />
// 			<TransferHistory path={path.transfer.sub.history.root} />
// 		</Transfer>
// 		<Statement path={`/:langId/${path.statement.root}`}>
// 			<StatementList path="/" />
// 			<BetDateRange path="/:timePeriod" />
// 			<BetOneDay path="/:timePeriod/:date" />
// 			<BetByCategory path="/:timePeriod/:date/:category" />
// 			<BetDetail path="/:timePeriod/:date/:category/:game" />
// 		</Statement>
// 		<FinancialLog path={`/:langId/${path.financialLog.root}`}>
// 			<FinancialLogHome path="/" />{" "}
// 		</FinancialLog>

// 		<OneGame path={`/:langId/${path.oneGame.root}`} />
// 		{/* <Kiss918 path={`/:langId/${path.kiss918.root}`} /> */}
// 	</Router>
// );

// export default AfterLoginRouter;
