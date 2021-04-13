import React from "react";
import { Router, createHistory, LocationProvider } from "@reach/router";
import path from "./path";
import langKeys from "./datas/langKeys";
import { Wrapper } from "./components/common/wrapper";
import PopBox from "./components/common/popbox";
import Home from "./pages/home";
import Promotion from "./pages/promotion";
import Wallet from "./pages/wallet";
import LiveChat from "./pages/livechat";
import Layout from "./components/common/layout";
import Profile from "./components/member/profile";
import BankInfo from "./components/member/bankInfo";
import Member from "./pages/member";

import Deposit from "./pages/deposit";
import DepositHistory from "./components/deposit/deposit.history";

// import DepositHome from "./components/deposit/deposit";
// import {
// 	Panel as OnlineBanking,
// 	Main as OnlineBankingMain
// } from "./components/deposit/deposit.onlineBanking";
// import SetOnlineBanking from "./components/deposit/deposit.onlineBanking.set";

// import {
// 	Panel as MobilePay,
// 	Main as MobilePayMain
// } from "./components/deposit/deposit.mobilePay";
// import SetMobilePay from "./components/deposit/deposit.mobilePay.set";

// import {
// 	Panel as LocalBank,
// 	Main as LocalBankMain
// } from "./components/deposit/deposit.localBank";

// import {
// 	Panel as CryptoPay,
// 	Main as CryptoPayMain
// } from "./components/deposit/deposit.cryptoPay";
// import SetCryptoPay from "./components/deposit/deposit.cryptoPay.set";

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

import Casino from "./pages/casino";
import ForgetPwd from "./components/login/forgetPwd";
import ResetPwd from "./components/login/resetPwd";
import ChangePwd from "./components/member/changePwd";

import Setting from "./pages/setting";
import SettingInfo from "./components/setting/settingInfo";
import Other from "./components/setting/other";

import Kyc from "./components/withdrawal/kyc";
import KycWaiting from "./components/withdrawal/kycWaiting";

import Whoami from "./pages/whoami";
import PromotionInfo from "./pages/promotionInfo";
// import Kiss918 from "./pages/918kiss";

import Ranking from "./pages/ranking";

import FriendReferral from "./pages/referral";
import ReferFriends from "./components/referral/referFriends";
import ReferralHistory from "./components/referral/referral.history";

import AngPow from "./pages/angPow";
import OneGame from "./pages/oneGame";
import VIP from "./pages/vip";
import MysteryBox from "./pages/mysteryBox";

const Index = () => {
	const history = createHistory(window);
	return (
		<LocationProvider history={history}>
			<Wrapper pageLangKeys={langKeys}>
				<Layout>
					<Router>
						<Home path={path.home.root} default={true} />
						<ForgetPwd path={path.forgetPassword.root} />
						<ResetPwd path={path.resetPassword.root} />
						<ChangePwd path={path.changePassword.root} />
						<Promotion path={path.promotion.root} />
						<PromotionInfo path={path.promotionInfo.root} />
						<Wallet path={path.wallet.root} />
						<LiveChat path={path.livechat.root} />
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

						{/* <Deposit path={path.depositOld.root}>
							<DepositHome path={path.depositOld.sub.root} />
							<OnlineBanking
								path={path.depositOld.sub.onlineBank.root}>
								<OnlineBankingMain
									path={
										path.depositOld.sub.onlineBank.sub.root
									}
								/>
								<SetOnlineBanking
									path={
										path.depositOld.sub.onlineBank.sub
											.setOnlineBanking.root
									}
								/>
							</OnlineBanking>
							<MobilePay
								path={path.depositOld.sub.mobilePay.root}>
								<MobilePayMain
									path={
										path.depositOld.sub.mobilePay.sub.root
									}
								/>
								<SetMobilePay
									path={
										path.depositOld.sub.mobilePay.sub
											.setMobilePay.root
									}
								/>
							</MobilePay>
							<CryptoPay
								path={path.depositOld.sub.cryptoPay.root}>
								<CryptoPayMain
									path={
										path.depositOld.sub.cryptoPay.sub.root
									}
								/>
								<SetCryptoPay
									path={
										path.depositOld.sub.cryptoPay.sub
											.setCryptoPay.root
									}
								/>
							</CryptoPay>
							<LocalBank
								path={path.depositOld.sub.localBank.root}>
								<LocalBankMain path="/" />
							</LocalBank>
							<DepositHistory
								path={path.depositOld.sub.history.root}
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
							<FinancialLogHome path="/" />{" "}
						</FinancialLog>
						<Message path={path.message.root}>
							<PersonalMsg path={path.message.sub.root} />
							<Announcement
								path={path.message.sub.announcement.root}
							/>
						</Message>
						<Casino path={`${path.casino.root}`} />
						<Casino path={`${path.casino.root}/:tpId`} />
						<Setting path={path.setting.root}>
							<SettingInfo path={path.setting.sub.root} />
							<Other path={path.setting.sub.other.root} />
						</Setting>
						<Whoami path={path.whoami.root} />
						<Ranking path={path.ranking.root} />
						<AngPow path={path.angPow.root} />
						<OneGame path={path.oneGame.root} />
						<VIP path={path.vip.root} />
						{/* <Kiss918 path={path.kiss918.root} /> */}
						<MysteryBox path={path.mysteryBox.root} />
					</Router>
				</Layout>
				<PopBox />
			</Wrapper>
		</LocationProvider>
	);
};

export default Index;
