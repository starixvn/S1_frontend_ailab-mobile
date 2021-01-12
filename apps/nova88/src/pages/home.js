import React, { useRef, useState, useEffect, useContext } from "react";
import { i18nContext, userInfoContext, popBoxContext } from "Context";
import { Redirect } from "@reach/router";
import Slider from "../components/home/slider";
import Marquee from "../components/home/marquee";
import Category from "../components/home/category";
import ShortcutBar from "../components/home/shortcutBar";

import { readCookie, setCookie } from "../components/common/common";
import path from "../path";
import api from "../service/api";

const IndexPage = () => {
	const shortcutBar = useRef(null);
	const [shortcutBarLocate, setShortcutBarLocate] = useState(null);
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const [redirectPath, setRedirectPath] = useState(null);

	useEffect(() => {
		if (redirectPath !== null) {
			setRedirectPath(null);
		}
	}, [redirectPath]);

	useEffect(() => {
		if (shortcutBar.current !== null) {
			setShortcutBarLocate(shortcutBar.current?.getBoundingClientRect());
		}
	}, []);

	useEffect(() => {
		const cookieName = `balanceHint${userInfo.userName}`;
		if (
			userInfo.currencyId &&
			userInfo.userName &&
			readCookie(cookieName) !== "1"
		) {
			setCookie(cookieName, "1", 1);
			api.account.GetWalletInfo().then(res => {
				if (res.data.errorCode === 0) {
					const { balance, tpWallets } = res.data.data;
					const mainWallet = {
						id: 0,
						displayKey: "lbl_MainWallet",
						balance
					};
					const tpWalletsArr = tpWallets?.map(i => {
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
										type="submit"
										className="blue"
										onClick={ClosePopUp}>
										{i18n.lbl_Later}
									</button>
									<button
										type="submit"
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

	return redirectPath !== null ? (
		<Redirect to={redirectPath} noThrow />
	) : (
		<>
			<Slider />
			<Marquee />
			<Category shortcutBarLocate={shortcutBarLocate} />
			<ShortcutBar _ref={shortcutBar} />
		</>
	);
};

export default IndexPage;
