import React from "react";
import { Router, createHistory, LocationProvider } from "@reach/router";
import path from "./path";
import { Wrapper } from "./components/common/wrapper";
import PopBox from "./components/common/popbox";
import Home from "./pages/home";
import Promotion from "./pages/promotion";
import Wallet from "./pages/wallet";
import Layout from "./components/common/layout";
import Profile from "./components/member/profile";
import BankInfo from "./components/member/bankInfo";
import Member from "./pages/member";

import Deposit from "./pages/deposit";
import DepositHistory from "./components/deposit/deposit.history";

import Withdrawal from "./pages/withdrawal";
import WithdrawalHome from "./components/withdrawal/withdrawal";
import WithdrawalHistory from "./components/withdrawal/withdrawal.history";

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

import Message from "./pages/message";
import PersonalMsg from "./components/message/personalMsg";
import Announcement from "./components/message/announcement";

import Other from "./components/setting/other";
import Casino from "./pages/casino";
import ForgetPwd from "./components/login/forgetPwd";
import ResetPwd from "./components/login/resetPwd";
import ChangePwd from "./components/member/changePwd";

import Kyc from "./components/withdrawal/kyc";
import KycWaiting from "./components/withdrawal/kycWaiting";

import Whoami from "./pages/whoami";
import PromotionInfo from "./pages/promotionInfo";

import Games from "./pages/games";
import Fishing from "./pages/fishing";
import LiveCasino from "./pages/liveCasino";

import HowToDeposit from "./pages/howToDeposit";
import HowToWithdraw from "./pages/howToWithdraw";
import HowToPlay from "./pages/howToPlay";

import Ranking from "./pages/ranking";
import AngPow from "./pages/angPow";
import MysteryBox from "./pages/mysteryBox";
import VIP from "./pages/vip";

import FriendReferral from "./pages/referral";
import ReferFriends from "./components/referral/referFriends";
import ReferralHistory from "./components/referral/referral.history";

const Index = () => {
	const history = createHistory(window);
	return (
		<Wrapper>
			<LocationProvider history={history}>
				<Layout>
					<Router>
						<Home path={path.home.root} default />
						<ForgetPwd path={path.forgetPassword.root} />
						<ResetPwd path={path.resetPassword.root} />
						<ChangePwd path={path.changePassword.root} />
						<Promotion path={path.promotion.root} />

						<PromotionInfo path={path.promotionInfo.root} />
						<Wallet path={path.wallet.root} />
						<Member path={path.member.root}>
							<Profile path={path.member.sub.root} />
							<BankInfo path={path.member.sub.bankInfo.root} />
						</Member>
						<FriendReferral path={path.referral.root}>
							<ReferFriends path={path.referral.sub.root} />
							<ReferralHistory
								path={path.referral.sub.history.root}
							/>
						</FriendReferral>

						<Deposit path={path.deposit.root}>
							<Deposit path="/" />
							<DepositHistory path={path.depositHistory.root} />
						</Deposit>

						{/* <Deposit path={path.deposit.root}>
							<DepositHome path={path.deposit.sub.root} />
							<OnlineBanking
								path={path.deposit.sub.onlineBank.root}>
								<OnlineBankingMain
									path={path.deposit.sub.onlineBank.sub.root}
								/>
								<SetOnlineBanking
									path={
										path.deposit.sub.onlineBank.sub
											.setOnlineBanking.root
									}
								/>
							</OnlineBanking>
							<MobilePay path={path.deposit.sub.mobilePay.root}>
								<MobilePayMain
									path={path.deposit.sub.mobilePay.sub.root}
								/>
								<SetMobilePay
									path={
										path.deposit.sub.mobilePay.sub
											.setMobilePay.root
									}
								/>
							</MobilePay>
							<LocalBank path={path.deposit.sub.localBank.root}>
								<LocalBankMain path="/" />
							</LocalBank>
							<DepositHistory
								path={path.deposit.sub.history.root}
							/>
						</Deposit> */}
						<Withdrawal path={path.withdrawal.root}>
							<WithdrawalHome path={path.withdrawal.sub.root} />
							<WithdrawalHistory
								path={path.withdrawal.sub.history.root}
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
						<Message path={path.message.root}>
							<PersonalMsg path={path.message.sub.root} />
							<Announcement
								path={path.message.sub.announcement.root}
							/>
						</Message>
						<Other path={`${path.other.root}`} />
						<Casino path={`${path.casino.root}`} />
						<Casino path={`${path.casino.root}/:tpId`} />
						<Whoami path={path.whoami.root} />
						<Games path={path.games.root} />
						<Fishing path={path.fishing.root} />
						<LiveCasino path={path.liveCasino.root} />
						<HowToDeposit path={path.howToDeposit.root} />
						<HowToWithdraw path={path.howToWithdraw.root} />
						<HowToPlay path={path.howToPlay.root} />
						<Ranking path={path.leaderBoard.root} />
						<AngPow path={path.angPow.root} />
						<MysteryBox path={path.mysteryBox.root} />
						<VIP path={path.vip.root} />
					</Router>
				</Layout>
			</LocationProvider>
			<PopBox />
		</Wrapper>
	);
};

export default Index;
