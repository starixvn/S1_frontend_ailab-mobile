import React, { useContext } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { Link } from "@Router";
import { userInfoContext, msgCountContext } from "Context";
import {
	useGetCustVIPProgressQuery,
	useGetCustBonusWalletQuery
} from "@ailab-mobile/service";
import path from "../../path";
import {
	isConvert,
	number_format,
	currencyIdToCurrency
} from "../common/common";
import { cloudBannerImgURL } from "../../config";
import useGetBalance from "../hook/useGetMainBalance";
import useGetTpBalance from "../hook/useGetTpBalance";
import useGetBonusBalance from "../hook/useGetBonusBalance";
import { tpWalletsListType } from "../transfer/transfer.def";
import { defbanner } from "../vip/def";
import allowedCurrencyList from "../../datas/allowedCurrencyList";
import MsgPopup from "../common/msgPopup";

const PeofilePanel = () => {
	const { t } = useTranslation();

	const { msgCount } = useContext(msgCountContext);
	const { userInfo } = useContext(userInfoContext);
	const { langId, isLogin, currencyId, userName, userLevel } = userInfo;

	const {
		data: { data: custBonusWallet } = {}
	} = useGetCustBonusWalletQuery();

	const {
		data: { data: custVIPProgress } = {}
	} = useGetCustVIPProgressQuery();

	const { mainWalletInfo } = useGetBalance({ isLogin });
	const { tpWalletsList } = useGetTpBalance({
		isLogin,
		listType: tpWalletsListType.afterTransWallets
	});
	const { bonusWallets } = useGetBonusBalance({ isLogin });

	const bonusWalletsBalance = Object.values(bonusWallets).reduce(
		(prev, curr) => {
			return prev + curr.bonus;
		},
		0
	);

	const tpWalletBalance = tpWalletsList.reduce(
		(accumulator, currentValue) => {
			return accumulator + currentValue.balance;
		},
		0
	);

	const allWalletBalance =
		mainWalletInfo.balance + tpWalletBalance + bonusWalletsBalance;

	const vipLevelData = defbanner(langId).find(
		({ level }) => level === custVIPProgress?.currentVipLevel
	);

	const nextVipLevelText = defbanner(langId).find(
		({ level }) => level === userLevel + 1
	)?.levelText;

	const isVipLevelHighest = custVIPProgress?.upDeposit === null;

	return (
		<>
			<div className="menu-top">
				<div className="menu-top-profile">
					<div className="profile-item">
						<div>
							<img
								src={`${cloudBannerImgURL}/h5/img/4.0/profile-2.png`}
								alt="profile"
							/>
							<div>
								<div>
									<span>{t("Label_General_Hello")},</span>
									{userName}
								</div>
								<Link to={path.profile.root}>
									{t("lbl_Setting_Edit")}
								</Link>
							</div>
						</div>
						<Link
							to={path.message.root}
							className={classNames("message", {
								active: msgCount > 0
							})}>
							<img
								src={`${cloudBannerImgURL}/h5/img/4.0/message-2.png`}
								alt="message"
							/>
							<MsgPopup />
						</Link>
					</div>
				</div>
				<div className="menu-top-balance">
					<div>{t("lbl_Balance")}</div>
					<div>
						{currencyIdToCurrency[currencyId]}{" "}
						{number_format(allWalletBalance, isConvert(currencyId))}
						<Link to={path.deposit.root}>{t("lbl_Deposit")}</Link>
					</div>
				</div>
			</div>
			<div className="wallet-box">
				<div className="wallet-list">
					<div>
						<div className="wallet-list-item main-wallet">
							{t("lbl_MainWallet")}
							<div>
								{currencyIdToCurrency[currencyId]}{" "}
								{number_format(
									mainWalletInfo?.balance,
									isConvert(currencyId)
								)}
							</div>
						</div>
						{tpWalletsList?.map(({ id, balance, displayText }) => {
							return (
								<div
									key={id}
									className="wallet-list-item ninewallet">
									{displayText}
									<div>
										{currencyIdToCurrency[currencyId]}{" "}
										{number_format(
											balance,
											isConvert(currencyId)
										)}
									</div>
								</div>
							);
						})}
						{allowedCurrencyList.transferFunds.includes(
							currencyId
						) && (
							<Link to={path.transfer.root}>
								{t("lbl_Transfer")}
							</Link>
						)}
					</div>
				</div>
				<div className="bank-list">
					<Link to={path.withdrawal.root}>
						<img
							src={`${cloudBannerImgURL}/h5/img/4.0/withdrawal-2.png`}
							alt="withdrawal"
						/>
						<div>{t("lbl_Withdrawal")}</div>
					</Link>
					<Link to={path.statement.root}>
						<img
							src={`${cloudBannerImgURL}/h5/img/4.0/statement.png`}
							alt="statement"
						/>
						<div>{t("lbl_Statement")}</div>
					</Link>
					<Link to={path.financialLog.root}>
						<img
							src={`${cloudBannerImgURL}/h5/img/4.0/financial.png`}
							alt="financial"
						/>
						<div>{t("lbl_financialLog")}</div>
					</Link>
					<Link to={path.bankInfo.root}>
						<img
							src={`${cloudBannerImgURL}/h5/img/4.0/bankinfo.png`}
							alt="bankinfo"
						/>
						<div>{t("lbl_BankInfo")}</div>
					</Link>
				</div>
				{custBonusWallet?.length > 0 && (
					<div className="casino-wallet">
						{custBonusWallet?.map(
							({
								bonus,
								bonusId,
								turnover,
								rollover,
								promoCategoryId
							}) => {
								const percentage =
									turnover > rollover
										? 100
										: ((turnover / rollover) * 100).toFixed(
												2
										  );

								return (
									<div
										key={bonusId}
										className="casino-wallet-item">
										<div className="money">
											<div>
												{t(
													`lbl_BonusWallet_${promoCategoryId}`
												)}
											</div>
											<div>
												{
													currencyIdToCurrency[
														currencyId
													]
												}{" "}
												{number_format(
													bonus,
													isConvert(currencyId)
												)}
											</div>
										</div>
										<div className="progress">
											<div
												className="progress-bar"
												style={{
													width: `${percentage}%`
												}}
											/>
										</div>
										<div className="progress-number">
											{percentage}%
										</div>
									</div>
								);
							}
						)}
					</div>
				)}
			</div>
			{allowedCurrencyList.VIP.includes(currencyId) && custVIPProgress && (
				<div className={`menu-vip ${vipLevelData.levelText}`}>
					<div className="left">
						<div>{t("lbl_VIP_YourVIPIs")}</div>
						<div>{t(vipLevelData.displayKey)}</div>
						<div>
							{number_format(
								custVIPProgress?.actualDeposit,
								isConvert(currencyId)
							)}
							<div>
								/
								{number_format(
									custVIPProgress?.upDeposit,
									isConvert(currencyId)
								)}
							</div>
						</div>
					</div>
					<div className="right">
						<img
							src={`${cloudBannerImgURL}/h5/img/4.0/menu-${vipLevelData.levelText}.png`}
							alt={vipLevelData.levelText}
						/>
						{!isVipLevelHighest && (
							<>
								<div className="dot-progress">
									<div className="progress-bar-vertical">
										<div className="progress-now-vertical" />
									</div>
								</div>
								<img
									src={`${cloudBannerImgURL}/h5/img/4.0/menu-${nextVipLevelText}.png`}
									alt={nextVipLevelText}
								/>
							</>
						)}
					</div>
					{isVipLevelHighest ? (
						<div className="vip-text">
							{t("Label_Vip_ReachedTheHighestLevel")}
						</div>
					) : (
						<Link to={path.vip.root} className="vip-text next">
							{t("Label_Vip_NextMilestone")}
						</Link>
					)}
				</div>
			)}
		</>
	);
};

export default PeofilePanel;
