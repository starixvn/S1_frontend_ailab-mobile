import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "@reach/router";
import Slider from "../components/home/slider";
import Marquee from "../components/home/marquee";
import Menu from "../components/home/menu";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	rootContext
} from "../components/common/context";
import { readCookie, setCookie } from "../components/common/common";
import path from "../path";
import { api_GetWalletInfo } from "../service/api/account";
import Submenu from "../components/home/submenu";
import AppDownloadHint, { isIOS } from "../components/home/appDownload";
import HeaderShortcut from "../components/home/headerShortcut";
import EventSwipper from "../components/home/eventSwipper";

const IndexPage = () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setRoot } = useContext(rootContext);
	const [redirectPath, setRedirectPath] = useState(null);
	const [appHint, setAppHint] = useState(false);

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
	}, []);

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
										className="blue"
										onClick={ClosePopUp}>
										{i18n.lbl_Later}
									</button>
									<button
										onClick={RedirectToDeposit}
										className="orange">
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

	useEffect(() => {
		const cookieName = `appDownloadHint${userInfo.userName}`;

		if (userInfo.userName && readCookie(cookieName) !== "1") {
			setAppHint(true);
		}
	}, [userInfo.currencyId, userInfo.userName]);

	return redirectPath !== null ? (
		<Redirect to={redirectPath} noThrow />
	) : (
		<>
			{userInfo.isLogin ? (
				<HeaderShortcut userInfo={userInfo} i18n={i18n} />
			) : null}
			<Slider />
			<EventSwipper userInfo={userInfo} />
			<Marquee />
			<Menu i18n={i18n} userInfo={userInfo} />
			<Submenu />
			{!isIOS && appHint ? (
				<AppDownloadHint
					i18n={i18n}
					cookieName={`appDownloadHint${userInfo.userName}`}
					langId={userInfo.langId}
					setAppHint={setAppHint}
				/>
			) : null}
		</>
	);
};

export default IndexPage;
