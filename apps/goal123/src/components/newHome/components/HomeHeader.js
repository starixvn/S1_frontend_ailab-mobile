import React, { useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@reach/router";
import { bannerImgUrl } from "../../../config";
import useGetBalance from "../../hook/useGetMainBalance";
import useGetTpBalance from "../../hook/useGetTpBalance";
import useGetBonusBalance from "../../hook/useGetBonusBalance";
import { api_account_GetPopupMsg } from "../../../service/api/account";
import { tpWalletsListType } from "../../transfer/transfer.def";
import { userInfoContext, msgCountContext } from "../../common/context";
import { number_format } from "../../common/common";
import path from "../../../path";

const HomeHeader = ({ showAd, onclickCancel }) => {
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

	const [popUp, setPopUp] = useState("");

	const GetPopupMsg = () => {
		try {
			api_account_GetPopupMsg().then(res => {
				if (res.data.data) {
					setPopUp(res.data.data.popupMessage);
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
			<div className={showAd ? "appdownload active" : "appdownload"}>
				<img
					src={`${bannerImgUrl}/h5/img/home-page/goal123-appicon.png`}
					alt="app-download-banner"
				/>
				<div className="text">
					<span>{t("Label_DownloadApp")}</span>
					<span>{t("lbl_DownloadAppHint")}</span>
				</div>
				<button
					className="btn-download"
					onClick={() => {
						navigate("/appDownload");
					}}>
					{t("lbl_Downloads")}
				</button>
				<i className="icon icon-close" onClick={onclickCancel} />
			</div>

			<div className="header-content">
				<div className="logo">
					<a className="logo-img">
						<img
							src={`${bannerImgUrl}/h5/img/logo.png`}
							alt="logo"
						/>
					</a>
					<span className="en">
						{t("Label_Header_HarvestWealth")}
					</span>
				</div>

				{!userInfo.isLogin && (
					<div className="loginjoin">
						<button
							className="login"
							onClick={() => {
								navigate("/login");
							}}>
							{t("lbl_Login")}
						</button>
						<button
							className="join"
							onClick={() => {
								navigate("/join");
							}}>
							{t("lbl_JoinNow")}
						</button>
					</div>
				)}

				{userInfo.isLogin && (
					<div className="member-info">
						<div className="member-id">
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
										navigate(`${path.message.root}`);
									}}>
									{popUp && (
										<div className="info">
											<div>{popUp}</div>
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

export default HomeHeader;
