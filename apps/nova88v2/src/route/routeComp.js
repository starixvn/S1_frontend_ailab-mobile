import React from "react";
import { Router } from "@reach/router";
import MyWallet from "../pages/wallet";
import Promotion from "../pages/promotion";
import Casino from "../pages/casino";

import path, { defSpecialPath } from "../path";
import Home from "../pages/home";

import ForgetPwd from "../components/login/forgetPwd";
import ResetPwd from "../components/login/resetPwd";

import Setting from "../pages/setting";
import GameProvider from "../components/setting/listPanel/gameProvider";
import Whoami from "../pages/whoami";
import PromotionInfo from "../pages/promotionInfo";

import Ranking from "../pages/ranking";
import Angpao from "../pages/angpao";

import BankInfo from "../pages/bankInfo";
import Profile from "../pages/profile";
import Message from "../pages/message";
import Announcement from "../pages/announcement";

import Deposit from "../pages/deposit";
import DepositHistory from "../pages/depositHistory";

import Withdrawal from "../pages/withdrawal";
import EWallet from "../pages/eWallet";
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

// import Kiss918 from "../pages/918kiss";

import FriendReferral from "../pages/referral";
// import ReferFriends from "../components/referral/referFriends";
import ReferralHistory from "../pages/referralHistory";
import OneGame from "../pages/oneGame";
import VIP from "../pages/vip";
import MysteryBox from "../pages/mysteryBox";
import LuckyWheel from "../pages/luckyWheel";
import Streaming from "../pages/streaming";
import CryptoWallet from "../pages/cryptoWallet";
import AppDownload from "../pages/appDownload";
import CheckSpeed from "../pages/checkSpeed";
import AppEntPage from "../pages/appEntPage";
import UMPage from "../pages/um";
import Mega888 from "../pages/mega888";
import WorldCup from "../pages/worldCup";
import RebateExclude from "../pages/rebateExclude";
import DragonEgg from "../pages/dragonEgg";

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
			<GameProvider path={`/:langId/${path.gameProvider.root}`} />

			<Whoami path={path.whoami.root} />
			<Ranking path={`/:langId/${path.ranking.root}`} />
			<Angpao path={`/:langId/${path.angpao.root}`} />

			<ChangePwd path={`/:langId/${path.changePassword.root}`} />
			<Profile path={`/:langId/${path.profile.root}`} />
			<BankInfo path={`/:langId/${path.bankInfo.root}`} />
			<MyWallet path={`/:langId/${path.wallet.root}`} />
			<EWallet path={`/:langId/${path.eWallet.root}`} />
			<CryptoWallet path={`/:langId/${path.cryptoWallet.root}`} />
			<Message path={`/:langId/${path.message.root}`} />
			<Announcement path={`/:langId/${path.announcement.root}`} />

			<FriendReferral path={`/:langId/${path.referral.root}`} />
			<ReferralHistory path={`/:langId/${path.referralHistory.root}`} />

			<Deposit path={`/:langId/${path.deposit.root}`} />
			<DepositHistory path={`/:langId/${path.depositHistory.root}`} />

			<Withdrawal path={`/:langId/${path.withdrawal.root}`} />
			<Withdrawal
				path={`/:langId/${path.eWalletWithdrawal.root}`}
				isEWallet={true}
			/>
			<Withdrawal
				path={`/:langId/${path.cryptoWithdrawal.root}`}
				isCrypto={true}
			/>
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
			<VIP path={`/:langId/${path.vip.root}`} />
			<MysteryBox path={`/:langId/${path.mysteryBox.root}`} />
			<LuckyWheel path={`/:langId/${path.luckyWheel.root}`} />
			{/* <Kiss918 path={`/:langId/${path.kiss918.root}`} /> */}
			<Streaming path={`/:langId/${path.streaming.root}`} />
			<AppDownload path={`/:langId/${path.appDownload.root}`} />
			<CheckSpeed path={`/:langId/${path.checkSpeed.root}`} />
			<AppEntPage path={`/${defSpecialPath.appentpage}`} />
			<UMPage path={`/:langId/${path.um.root}`} />
			<UMPage path={`/${path.um.root}`} />
			<Mega888 path={`/:langId/${path.mega888.root}`} />
			<WorldCup path={`/:langId/${path.worldCup.root}`} />
			<RebateExclude path={`/:langId/${path.rebateExclude.root}`} />
			<DragonEgg path={`/:langId/${path.dragonEgg.root}`} />
		</Router>
	);
};

export default RouteComponents;
