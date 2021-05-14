import React, { useEffect, useContext } from "react";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	rootContext
} from "Context";
import { useNavigate, Link } from "@reach/router";
import Layout from "../components/common/layout";
import Slider from "../components/home/slider";
import Marquee from "../components/home/marquee";
import Menu from "../components/home/menu";
import Streaming from "../components/home/streaming";
import Promos from "../components/home/promos";
import HotGame from "../components/home/hotGame";
import Referral from "../components/home/referral";
import EventSwipper from "../components/home/eventSwipper";
import HeaderShortcut from "../components/home/headerShortcut";
import Bottom from "../components/home/bottom";
import { readCookie, setCookie } from "../components/common/common";
import path from "../path";
import api from "../service/api";
import Header from "../components/header/header";
import JoinLoginBar from "../components/home/joinLoginBar";
import Logo from "../components/common/logo";
import { defPopBoxType } from "../components/common/popbox";

const IndexPage = () => {
	const navigate = useNavigate();
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setRoot } = useContext(rootContext);

	useEffect(() => {
		setRoot(true);
		return () => {
			setRoot(false);
		};
	}, [setRoot]);

	useEffect(() => {
		const ClosePopUp = () => {
			setPopBox({
				isOpen: false
			});
		};
		if (userInfo.isJoin) {
			setPopBox({
				isOpen: true,
				title: i18n.lbl_Notice,
				fullPage: true,
				content: (
					<div className="joinSuccess">
						<Logo langId={userInfo.langId} />
						<div className="step">
							<div className="stepLine">
								<div className="stepBar100" />
							</div>
							<div className="circle active">
								<div>
									<div className="icon icon-checkmark" />
								</div>
							</div>
							<div className="circle active">
								<div>
									<div className="icon icon-checkmark" />
								</div>
							</div>
							<div className="circle active">
								<div>
									<div className="icon icon-checkmark" />
								</div>
							</div>
						</div>
						<div className="Join">
							<div className="Terms">
								{i18n.lbl_AfterJoinHint}
							</div>
							<Link
								onClick={() => {
									setPopBox({
										isOpen: false
									});
									setUserInfo(prev => ({
										...prev,
										isJoin: false
									}));
								}}
								className="btn-group"
								to={`/${userInfo.langId}/${path.deposit.root}`}>
								<button>{i18n.lbl_DepositNow}</button>
							</Link>
						</div>
					</div>
				)
			});
		}
		// else {
		// 	const cookieName = `balanceHint${userInfo.userName}`;
		// 	if (
		// 		userInfo.currencyId &&
		// 		userInfo.userName &&
		// 		readCookie(cookieName) !== "1" &&
		// 	) {
		// 		setCookie(cookieName, "1", 1);
		// 		api.account.GetWalletInfo().then(res => {
		// 			if (res.data.errorCode === 0) {
		// 				const { balance, tpWallets } = res.data.data;
		// 				const mainWallet = {
		// 					id: 0,
		// 					displayKey: "lbl_MainWallet",
		// 					balance
		// 				};
		// 				const tpWalletsArr = tpWallets?.map(i => {
		// 					return {
		// 						id: i.tpId,
		// 						displayKey: i.displayKey,
		// 						balance: i.balance
		// 					};
		// 				});

		// 				const hasBalance =
		// 					mainWallet.balance ||
		// 					tpWalletsArr?.filter(t => {
		// 						return t.balance > 0;
		// 					}).length >= 1;

		// 				if (!hasBalance) {
		// 					const RedirectToDeposit = () => {
		// 						navigate(
		// 							`/${userInfo.langId}/${path.deposit.root}`
		// 						);
		// 						ClosePopUp();
		// 					};

		// 					setPopBox({
		// 						isOpen: true,
		// 						title: i18n.lbl_Notice,
		// 						content: (
		// 							<>
		// 								<p>
		// 									{`${i18n.msg_BalanceHint} : `}
		// 									<span className="important">
		// 										{`${
		// 											i18n[
		// 												`Currency_${userInfo.currencyId}`
		// 											]
		// 										} 0`}
		// 									</span>
		// 								</p>
		// 								<p>{i18n.msg_DepositHint}</p>
		// 							</>
		// 						),
		// 						hasBtn: true,
		// 						btnBar: (
		// 							<div className="btn-group">
		// 								<button
		// 									type="submit"
		// 									className="blue"
		// 									onClick={ClosePopUp}>
		// 									{i18n.lbl_Later}
		// 								</button>
		// 								<button
		// 									type="submit"
		// 									onClick={RedirectToDeposit}
		// 									className="orange">
		// 									{i18n.lbl_DepositNow}
		// 								</button>
		// 							</div>
		// 						)
		// 					});
		// 				}
		// 			}
		// 		});
		// 	}
		// }
	}, [
		i18n,
		setPopBox,
		userInfo.currencyId,
		userInfo.userName,
		navigate,
		userInfo.langId,
		userInfo.isJoin
	]);

	useEffect(() => {
		const cookieName = `${userInfo.userName}-DomainListHint`;
		if (
			userInfo.isLogin &&
			userInfo.currencyId &&
			readCookie(cookieName) !== "1"
		) {
			setPopBox({
				isOpen: true,
				title: i18n.lbl_nova88_backup_website,
				popBoxType: defPopBoxType.DomainList,
				className: "backupDomain "
			});
		}
	}, [
		userInfo.isLogin,
		userInfo.currencyId,
		i18n,
		setPopBox,
		userInfo.userName
	]);

	return (
		<Layout header={<Header />}>
			{userInfo.isLogin ? <HeaderShortcut i18n={i18n} /> : null}
			<Slider />
			<Marquee />
			{userInfo.isLogin ? null : <JoinLoginBar />}
			<div id="content">
				<Menu i18n={i18n} userInfo={userInfo} setPopBox={setPopBox} />
				<Promos i18n={i18n} userInfo={userInfo} />
				<HotGame i18n={i18n} userInfo={userInfo} />
				{userInfo.isLogin ? (
					<Referral
						i18n={i18n}
						userInfo={userInfo}
						setPopBox={setPopBox}
					/>
				) : null}
				<EventSwipper i18n={i18n} userInfo={userInfo} />
				<Streaming />
				<Bottom i18n={i18n} langId={userInfo.langId} />
			</div>
		</Layout>
	);
};

export default IndexPage;
