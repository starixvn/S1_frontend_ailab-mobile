import classNames from "classnames";
import { bool, func } from "prop-types";
import { Link } from "@Router";
import { useTranslation } from "react-i18next";
import React, { useContext, useState, useEffect } from "react";
import { userInfoContext } from "Context";
import {
	setCookie,
	isConvert,
	readCookie,
	number_format,
	currencyIdToCurrency
} from "../common/common";
import path from "../../path";
import ReloadSpin from "../common/reloadSpin";
import { cloudBannerImgURL } from "../../config";
import useGetBalance from "../hook/useGetMainBalance";
import useGetTpBalance from "../hook/useGetTpBalance";
import { tpWalletsListType } from "../transfer/transfer.def";

const Header = ({ showAppHint, setShowAppHint }) => {
	const { t } = useTranslation();

	const { userInfo } = useContext(userInfoContext);
	const { isLogin, langId, userName, currencyId } = userInfo;

	const { mainWalletInfo, GetBalance } = useGetBalance({ isLogin });
	const { tpWalletsList, GetTpWalletList } = useGetTpBalance({
		isLogin,
		listType: tpWalletsListType.allWallets
	});

	const [showBalance, setShowBalance] = useState(true);

	const onReloadBalance = () => {
		GetBalance();
		GetTpWalletList();
	};

	const handleCloseAppDownload = () => {
		setCookie("AppDownloadHint", "1", 1);
		setShowAppHint(false);
	};

	const otherWalletBalance = tpWalletsList?.reduce(
		(prev, curr) => prev + curr.balance,
		0
	);
	const allWalletBalance = mainWalletInfo.balance + otherWalletBalance;
	const balance = !allWalletBalance
		? 0
		: number_format(allWalletBalance, isConvert(currencyId));

	useEffect(() => {
		if (readCookie("AppDownloadHint") === "1") setShowAppHint(false);
	}, []);

	return (
		<header id="header">
			{showAppHint && (
				<div
					className={classNames("appdownload", {
						active: showAppHint
					})}>
					<button
						className="icon icon-close"
						onClick={handleCloseAppDownload}
					/>
					<img
						src={`${cloudBannerImgURL}/h5/img/app/appicon.jpg`}
						alt="app icon"
					/>
					<div>
						<div>{t("lbl_DownloadApp")}</div>
						<div>{t("Label_AppDownload_BetAnytimeAnyWhere")}</div>
					</div>
					<Link to={path.appDownload.root}>{t("lbl_Downloads")}</Link>
				</div>
			)}
			<div className="header-module">
				<a className="header-logo" href={`/${langId}`}>
					<img
						src={`${cloudBannerImgURL}/h5/img/4.0/logo_w.png`}
						alt="logo"
					/>
				</a>
				<a className="splogo" />
				{isLogin ? (
					<div className="header-info">
						<div>
							{t("Label_General_Hello")},{" "}
							<Link className="MemberID" to={path.profile.root}>
								{userName}
							</Link>
						</div>
						<div className="header-balance">
							<span>{currencyIdToCurrency[currencyId]}</span>
							<div>
								{showBalance && (
									<>
										${balance}
										<ReloadSpin func={onReloadBalance} />
									</>
								)}
								<button
									onClick={() => {
										setShowBalance(prev => !prev);
									}}>
									<img
										className="icon-minus"
										src={`${cloudBannerImgURL}/h5/img/4.0/${
											showBalance ? "minus" : "plus"
										}.png`}
										alt=""
									/>
								</button>
							</div>
						</div>
					</div>
				) : (
					<>
						<div className="home-btn-group header-login">
							<Link className="btn-login" to={path.login.root}>
								{t("lbl_Login")}
							</Link>
							<Link className="btn-register" to={path.join.root}>
								{t("lbl_Register")}
							</Link>
						</div>
						<Link className="btn-menu" to={path.setting.root}>
							<img
								src={`${cloudBannerImgURL}/h5/img/4.0/menu.png`}
								alt="setting"
							/>
						</Link>
					</>
				)}
			</div>
		</header>
	);
};

Header.propTypes = {
	showAppHint: bool.isRequired,
	setShowAppHint: func.isRequired
};

export { Header };
