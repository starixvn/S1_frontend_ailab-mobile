import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "@reach/router";
import Slider from "../components/home/slider";
import Marquee from "../components/home/marquee";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	rootContext
} from "../components/common/context";
import { readCookie, setCookie } from "../components/common/common";
import path from "../path";
import { api_GetWalletInfo } from "../service/api/account";
import GamePanel from "../components/home/gamePanel";
import LinksPanel from "../components/home/links";
import MidBanner from "../components/home/banner";
import EventSwipper from "../components/home/eventSwipper";
import jackpot from "../styles/img/jackpot.png";

const IndexPage = () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const [redirectPath, setRedirectPath] = useState(null);
	const { setRoot } = useContext(rootContext);
	const ticker2 = new Ticker({
		info: 2,
		casino: "hotspin88am",
		currency: "vnd"
	});

	useEffect(() => {
		if (redirectPath !== null) {
			setRedirectPath(null);
		}
	}, [redirectPath]);

	useEffect(() => {
		setRoot(true);
		return () => {
			setRoot(false);
		};
	}, [setRoot]);

	useEffect(() => {
		ticker2.tick();
		setNum();
	}, [ticker2]);

	useEffect(() => {
		const cookieName = `balanceHint${userInfo.userName}`;
		if (
			userInfo.currencyId &&
			userInfo.userName &&
			readCookie(cookieName) !== "1"
		) {
			setCookie(cookieName, "1", 1);
			api_GetWalletInfo().then(res => {
				if (res.data.errorCode === 0) {
					const { data } = res.data;
					const mainWallet = {
						id: 0,
						displayKey: "lbl_MainWallet",
						balance: data?.balance
					};
					const tpWalletsArr = data?.tpWallets.map(i => {
						return {
							id: i.tpId,
							displayKey: i.displayKey,
							balance: i.balance
						};
					});

					const hasBalance =
						mainWallet.balance ||
						tpWalletsArr?.filter(t => {
							return t.balance > 0;
						}).length >= 1;

					if (!hasBalance) {
						const ClosePopUp = () => {
							setPopBox({
								isOpen: false
							});
						};

						const RedirectToDeposit = () => {
							setRedirectPath(`/${path.deposit.root}`);
							ClosePopUp();
						};

						setPopBox({
							isOpen: true,
							title: i18n.lbl_Notice,
							content: (
								<>
									<p>
										{`${i18n.msg_BalanceHint} : `}
										<span className="important">
											{`${
												i18n[
													`Currency_${userInfo.currencyId}`
												]
											} 0`}
										</span>
									</p>
									<p>{i18n.msg_DepositHint}</p>
								</>
							),
							hasBtn: true,
							btnBar: (
								<div className="btn-group">
									<button
										className="cancel"
										onClick={ClosePopUp}>
										{i18n.lbl_Later}
									</button>
									<button
										onClick={RedirectToDeposit}
										className="submit">
										{i18n.lbl_DepositNow}
									</button>
								</div>
							)
						});
					}
				}
			});
		}
	}, [i18n, setPopBox, userInfo.currencyId, userInfo.userName]);

	return redirectPath !== null ? (
		<Redirect to={redirectPath} noThrow />
	) : (
		<>
			<div className="bannerS">
				<img src={jackpot} alt="" />
				<p>VND</p>
				<p>{num}</p>
			</div>
			<Slider />
			<Marquee />
			<EventSwipper />
			<MidBanner langId={userInfo.langId} />
			<GamePanel i18n={i18n} userInfo={userInfo} />
			<LinksPanel i18n={i18n} langId={userInfo.langId} />
		</>
	);
};

export default IndexPage;
