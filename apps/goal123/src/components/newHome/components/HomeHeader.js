import PropTypes from "prop-types";
import React, { useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@reach/router";
import path from "apps/goal123/src/path";
import { bannerImgUrl } from "../../../config";
import useGetBalance from "../../hook/useGetMainBalance";
import useGetTpBalance from "../../hook/useGetTpBalance";
import useGetBonusBalance from "../../hook/useGetBonusBalance";
import { api_account_GetPopupMsg } from "../../../service/api/account";
import { tpWalletsListType } from "../../transfer/transfer.def";
import { userInfoContext, msgCountContext } from "../../common/context";
import { number_format } from "../../common/common";

const HomeHeader = ({ appHint, handleDownloadHint }) => {
	const { userInfo } = useContext(userInfoContext);
	const navigate = useNavigate();
	const { t } = useTranslation();
	const [showingBalance, setShowingBalance] = useState(true);

	const { mainWalletInfo, GetBalance } = useGetBalance({
		isLogin: userInfo.isLogin
	});

	const { tpWalletsList, GetTpWalletList } = useGetTpBalance({
		isLogin: userInfo.isLogin,
		listType: tpWalletsListType.allWallets
	});
	const { bonusWallets, GetBonusBalance } = useGetBonusBalance({
		isLogin: userInfo.isLogin
	});

	const tpWalletBalance = tpWalletsList?.reduce((prev, curr) => {
		return prev + curr.balance;
	}, 0);

	const bonusWalletsBalance = Object.values(bonusWallets).reduce(
		(prev, curr) => {
			return prev + curr.bonus;
		},
		0
	);

	const allWalletBalance =
		mainWalletInfo.balance + tpWalletBalance + bonusWalletsBalance;

	const balance = !allWalletBalance
		? 0
		: number_format(allWalletBalance, false);

	const clickReloadSpin = e => {
		GetBalance();
		GetTpWalletList({ langId: userInfo.langId });
		GetBonusBalance();
		e.currentTarget.classList.toggle("active");
	};

	const clickEye = () => {
		setShowingBalance(prev => !prev);
	};

	const { msgCount } = useContext(msgCountContext);

	// get popup message

	const [popUp, setPopUp] = useState({});

	const GetPopupMsg = () => {
		try {
			api_account_GetPopupMsg().then(res => {
				if (res.data.data) {
					setPopUp(res.data.data);
				}
			});
		} catch (error) {}
	};

	useEffect(() => {
		if (userInfo?.isLogin) {
			GetPopupMsg();
		}
	}, [userInfo?.isLogin]);

	const handleClosePopup = e => {
		e.stopPropagation();
		setPopUp("");
	};

	return (
		<>
			{appHint && (
				<div className={appHint ? "appdownload active" : "appdownload"}>
					<img
						src={`${bannerImgUrl}/h5/img/home-page/goal123-appicon.png`}
						alt="header-app-banner"
					/>
					<div className="text">
						<span>{t("Label_Header_DownloadApp")}</span>
						<span>{t("lbl_DownloadAppHint")}</span>
					</div>
					<button
						className="btn-download"
						onClick={() => {
							navigate(`/${path.appDownload.root}`);
						}}>
						{t("lbl_Downloads")}
					</button>
					<i
						className="icon icon-close"
						onClick={handleDownloadHint}
					/>
				</div>
			)}

			<div className="header-content">
				<div className="logo">
					<div>
						<a className="logo-img">
							<img
								src={`${bannerImgUrl}/h5/img/logo.png`}
								alt="header-logo"
							/>
						</a>
						<span className="en">
							{t("Label_Header_HarvestWealth")}
						</span>
					</div>
					<a
						className="logo-eurocup"
						href={`/${userInfo.langId}/${path.euroCup.root}`}>
						<img
							src={`${bannerImgUrl}/h5/img/event/eurocup/euro-logo-gif-new.webp`}
							alt="header-eurocup-logo"
						/>
					</a>
				</div>

				{!userInfo.isLogin && (
					<div className="loginjoin">
						<button
							className="login"
							onClick={() => {
								navigate(`${path.login.root}`);
							}}>
							{t("lbl_Login")}
						</button>
						<button
							className="join"
							onClick={() => {
								navigate(`${path.join.root}`);
							}}>
							{t("lbl_JoinNow")}
						</button>
					</div>
				)}

				{userInfo.isLogin && (
					<div className="member-info">
						<div
							className="member-id"
							onClick={() => {
								navigate(`${path.member.root}`);
							}}>
							{t("Label_Hey")}
							<span className="user-name">
								{userInfo.userName}
							</span>
						</div>
						<div className="member-important">
							<div className="member-balance">
								<span>
									<button
										className="icon-eye"
										onClick={clickEye}
									/>
									{t(`Currency_${userInfo.currencyId}`)}
								</span>
								<div className="number">
									<span>
										{showingBalance ? balance : "*****"}
									</span>
									<button
										className="icon icon-spinner11"
										onClick={clickReloadSpin}
									/>
								</div>
							</div>
							<div
								className={
									msgCount
										? "member-message active"
										: "member-message"
								}>
								<a
									className="icon-message"
									onClick={() => {
										navigate(`${path.message.root}`, {
											state: {
												id: popUp.id,
												pageNumber: popUp.pageNumber,
												popupShowed: false
											}
										});
									}}>
									{popUp?.popupMessage && (
										<div className="info">
											<div>{popUp?.popupMessage}</div>
											<button
												className="icon-close"
												onClick={handleClosePopup}
											/>
										</div>
									)}
								</a>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

HomeHeader.defaultProps = {
	appHint: false,
	handleDownloadHint: () => null
};

HomeHeader.propTypes = {
	appHint: PropTypes.bool,
	handleDownloadHint: PropTypes.func
};

export default HomeHeader;
