import React from "react";
import { Provider } from "react-redux";
import { store } from "@ailab-mobile/store";
import { Router, createHistory, LocationProvider } from "@reach/router";
import path, { defSpecialPath } from "./path";
import { Wrapper } from "./components/common/wrapper";
import PopBox from "./components/common/popbox";
import Home from "./pages/home";
import NewHome from "./pages/NewHome";
import Promotion from "./pages/promotion";
import Profile from "./components/member/profile";
import BankInfo from "./components/member/bankInfo";
import EWalletInfo from "./components/member/eWallet";
import Member from "./pages/member";

import Deposit from "./pages/deposit";
import CryptoWallet from "./components/member/cryptoWallet";
import DepositHistory from "./components/deposit/deposit.history";

import Withdrawal from "./pages/withdrawal";
import WithdrawalHome from "./components/withdrawal/withdrawal";
import WithdrawalHistory from "./components/withdrawal/withdrawal.history";
import WithdrawalCrypto from "./components/withdrawal/withdrawal.crypto";
import WithdrawalEWallet from "./components/withdrawal/withdrawal.EWallet";

import Transfer from "./pages/transfer";
import TransferHome from "./components/transfer/transfer";
import TransferHistory from "./components/transfer/transfer.history";

import Statement from "./pages/statement";
import StatementList from "./components/statement/statement";
import BetDateRange from "./components/statement/byDateRange";
import BetOneDay from "./components/statement/byDay";
import BetByCategory from "./components/statement/byCategory";
import BetDetail from "./components/statement/detail";
import FinancialLog from "./pages/financialLog";
import FinancialLogHome from "./components/statement/financialLog";

import PersonalMsg from "./components/message/personalMsg";
import Announcement from "./components/message/announcement";

import Casino from "./pages/casino";
import ForgetPwd from "./components/login/forgetPwd";
import ResetPwd from "./components/login/resetPwd";
import ChangePwd from "./components/member/changePwd";

import Other from "./components/setting/other";

import Kyc from "./components/withdrawal/kyc";
import KycWaiting from "./components/withdrawal/kycWaiting";

import Whoami from "./pages/whoami";
import PromotionInfo from "./pages/promotionInfo";

// import Ranking from "./pages/ranking";
import Angpao from "./pages/angpao";

import LuckyWheel from "./pages/luckyWheel";

import FriendReferral from "./pages/referral";
import Referral from "./components/referral/referral";
import ReferralHistory from "./components/referral/referral.history";

import VIP from "./pages/vip";
import AppEntPage from "./pages/appEntPage";
import AppDownload from "./pages/appDownload";
import Login from "./components/login/login";
import Join from "./components/join/join.refactor";
import UMPage from "./pages/um";
import WorldCup from "./pages/worldCup";
import RebateExclude from "./pages/rebateExclude";
import DragonEgg from "./pages/dragonEgg";
import Ambassador from "./pages/ambassador";
import EuroCup from "./pages/euroCup";

const Index = () => {
	const history = createHistory(window);
	return (
		<Provider store={store}>
			<Wrapper>
				<LocationProvider history={history}>
					<Router primary={false}>
						<NewHome path={path.home.root} default={true} />
						{/* <Home path={path.home.root} default={true} /> */}
						<ForgetPwd path={path.forgetPassword.root} />
						<ResetPwd path={path.resetPassword.root} />
						<ChangePwd path={path.changePassword.root} />
						<Promotion path={path.promotion.root} />
						<PromotionInfo path={path.promotionInfo.root} />
						<Member path={path.member.root}>
							<Profile path={path.member.sub.root} />
							<BankInfo path={path.member.sub.bankInfo.root} />
						</Member>

						<EWalletInfo path={path.eWallet.root} />
						<CryptoWallet path={path.cryptoWallet.root} />

						<FriendReferral path={path.referral.root}>
							<Referral path={path.referral.sub.root} />
							<ReferralHistory
								path={path.referral.sub.history.root}
							/>
						</FriendReferral>

						<Deposit path={path.deposit.root} />
						<DepositHistory path={path.depositHistory.root} />

						<Withdrawal path={path.withdrawal.root}>
							<WithdrawalHome path={path.withdrawal.sub.root} />
							<WithdrawalHistory
								path={path.withdrawal.sub.history.root}
							/>
							<WithdrawalEWallet
								path={
									path.withdrawal.sub.eWalletWithdrawal.root
								}
							/>
							<WithdrawalCrypto
								path={path.withdrawal.sub.cryptoWithdrawal.root}
							/>
						</Withdrawal>

						<Kyc path={path.kyc.root} />
						<KycWaiting path={path.kycWaiting.root} />
						<Transfer path={path.transfer.root}>
							<TransferHome path={path.transfer.sub.root} />
							<TransferHistory
								path={path.transfer.sub.history.root}
							/>
						</Transfer>
						<Statement path={path.statement.root}>
							<StatementList path="/" />
							<BetDateRange path="/:timePeriod" />
							<BetOneDay path="/:timePeriod/:date" />
							<BetByCategory path="/:timePeriod/:date/:category" />
							<BetDetail path="/:timePeriod/:date/:category/:game" />
						</Statement>
						<FinancialLog path={path.financialLog.root}>
							<FinancialLogHome path="/" />
						</FinancialLog>
						<PersonalMsg path={path.message.root} />
						<Announcement path={path.announcement.root} />
						<Casino path={`${path.casino.root}`} />
						<Casino path={`${path.casino.root}/:tpId`} />
						<Other path={path.other.root} />
						<Whoami path={path.whoami.root} />
						{/* <Ranking path={path.leaderBoard.root} /> */}
						<Angpao path={path.angpao.root} />

						<LuckyWheel path={path.luckyWheel.root} />
						<VIP path={path.vip.root} />
						<AppDownload path={path.appDownload.root} />
						<AppEntPage path={`/${defSpecialPath.appentpage}`} />
						<UMPage path={path.um.root} />
						<WorldCup path={path.worldCup.root} />
						<RebateExclude path={path.rebateExclude.root} />
						<RebateExclude
							path={`/:langId/${path.rebateExclude.root}`}
						/>
						<DragonEgg path={path.dragonEgg.root} />
						<Ambassador path={path.ambassador.root} />
						<EuroCup path={`/:langId/${path.euroCup.root}`} />
					</Router>
					<Join />
					<Login />
				</LocationProvider>
				<PopBox />
			</Wrapper>
		</Provider>
	);
};

export default Index;
