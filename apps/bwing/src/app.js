import React from "react";
import { Provider } from "react-redux";
import { store } from "@ailab-mobile/store";
import { Router, createHistory, LocationProvider } from "@reach/router";
import path, { defSpecialPath } from "./path";
import { Wrapper } from "./components/common/wrapper";
import PopBox from "./components/common/popbox";
import Home from "./pages/home";
import Promotion from "./pages/promotion";
import Wallet from "./pages/wallet";
import Layout from "./components/common/layout";
import Profile from "./components/member/profile";
import BankInfo from "./components/member/bankInfo";
import EWallet from "./components/member/eWallet";
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
import CockFighting from "./pages/cockFighting";
import LiveCasino from "./pages/liveCasino";
import Sports from "./pages/sports";

import HowToDeposit from "./pages/howToDeposit";
import HowToWithdraw from "./pages/howToWithdraw";
import HowToPlay from "./pages/howToPlay";

// import Ranking from "./pages/ranking";
import Angpao from "./pages/angpao";
import MysteryBox from "./pages/mysteryBox";
import VIP from "./pages/vip";
import VipInner from "./pages/vip-inner";

import FriendReferral from "./pages/referral";
import Referral from "./components/referral/referral";
import ReferralHistory from "./components/referral/referral.history";
import AppDownload from "./pages/appDownload";

import AppEntPage from "./pages/appEntPage";
import Streaming from "./pages/streaming";
import LuckyWheel from "./pages/luckyWheel";
import UMPage from "./pages/um";
import WorldCup from "./pages/worldCup";
import RebateExclude from "./pages/rebateExclude";
import News from "./pages/news";
import Lottery from "./pages/lottery";
import Esports from "./pages/esports";
import DragonEgg from "./pages/dragonEgg";
import EuroCup from "./pages/euroCup";
import Launcher from "./pages/launcher";
import Survey from "./pages/survey";
import Leaderboard from "./pages/leaderboard";

const Index = () => {
	const history = createHistory(window);

	return (
		<Provider store={store}>
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
								<BankInfo
									path={path.member.sub.bankInfo.root}
								/>
								<CryptoWallet
									path={path.member.sub.cryptoWallet.root}
								/>
								<EWallet path={path.member.sub.eWallet.root} />
							</Member>
							<FriendReferral path={path.referral.root}>
								<Referral path={path.referral.sub.root} />
								<ReferralHistory
									path={path.referral.sub.history.root}
								/>
							</FriendReferral>

							<Deposit path={path.deposit.root}>
								<Deposit path="/" />
								<DepositHistory
									path={path.depositHistory.root}
								/>
							</Deposit>
							<Withdrawal path={path.withdrawal.root}>
								<WithdrawalHome
									path={path.withdrawal.sub.root}
								/>
								<WithdrawalHistory
									path={path.withdrawal.sub.history.root}
								/>
								<WithdrawalCrypto
									path={
										path.withdrawal.sub.cryptoWithdrawal
											.root
									}
								/>
								<WithdrawalEWallet
									path={
										path.withdrawal.sub.eWalletWithdrawal
											.root
									}
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
							<CockFighting path={path.cockFighting.root} />
							<Sports path={path.sports.root} />
							<LiveCasino path={path.liveCasino.root} />
							<Lottery path={path.lottery.root} />
							<Esports path={path.eSports.root} />
							<HowToDeposit path={path.howToDeposit.root} />
							<HowToWithdraw path={path.howToWithdraw.root} />
							<HowToPlay path={path.howToPlay.root} />
							{/* <Ranking path={path.leaderBoard.root} /> */}
							<Angpao path={path.angpao.root} />
							<MysteryBox path={path.mysteryBox.root} />
							<LuckyWheel path={path.luckyWheel.root} />

							<VIP path={path.vip.root} />
							<VipInner path={path.vip.sub.vipInner.root} />

							<AppDownload path={path.appDownload.root} />
							<AppEntPage
								path={`/${defSpecialPath.appentpage}`}
							/>
							<Streaming path={path.streaming.root} />
							<UMPage path={path.um.root} />
							<WorldCup path={path.worldCup.root} />
							<RebateExclude path={path.rebateExclude.root} />
							<RebateExclude
								path={`/:langId/${path.rebateExclude.root}`}
							/>
							<News path={path.news.root} />
							<DragonEgg path={path.dragonEgg.root} />
							<EuroCup path={path.euroCup.root} />
							<Launcher path={`${path.launcher.root}/:type`} />
							<Survey path={path.survey.root} />
							<Leaderboard path={path.leaderboard.root} />
						</Router>
					</Layout>
				</LocationProvider>
				<PopBox />
			</Wrapper>
		</Provider>
	);
};

export default Index;
