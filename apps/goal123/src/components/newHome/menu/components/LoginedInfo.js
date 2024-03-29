import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { bannerImgUrl } from "apps/goal123/src/config";
import { useNavigate } from "@reach/router";
import { userInfoContext } from "../../../common/context";

const LoginedInfo = () => {

    const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const navigate = useNavigate();




	return (
		<>
			{userInfo.isLogin && (
				<div className="menu-member">
					<div className="member">
						<div className="member-personal">
							{/* 會員資料 */}
							<div className="member-profile">
								{/* 請判斷會員當前等級, 在"user-level"後加入等級的classname才有樣式變化 */}
								{/* 等級依序: bronze, silver, gold, titanium, diamond, goal123 */}
								{/* 純樣式變化 */}
								<div href="" className="user-level bronze">
									<img
										src="https://banner.goal123.org/h5/img/home-page/icon/sidemenu-user.svg"
										alt=""
									/>
								</div>
								<div className="user-profile">
									{t("lbl_Welcome")}
									{/* 用戶ID name */}
									<span className="user-name">
										{userInfo.userName}
									</span>
									{/* 連去Profile */}
									<button
										className="profile-edit"
										href="/profile">
										{t("Label_Menu_Edit_Profile")}
									</button>
								</div>
							</div>
							<div
								className={`member-message ${
									msgCount && "active"
								}`}>
								<Link
									className="icon-message"
									to={`/${path.message.root}`}>
									{/* 有"新信件"時,請產生info小彈窗 */}

									{popUp && (
										<div className="info">
											<div>{popUp}</div>
											<button
												className="icon-close"
												onClick={handleClosePopup}
											/>
										</div>
									)}
								</Link>
							</div>
						</div>
						{/* 會員錢包 */}
						<div className="member-wallet">
							<div className="wallet">
								<div className="balance-behavior">
									<span>{t("lbl_Balance")}</span>
									<button
										className={`icon icon-eye${
											showingBalance ? "" : "-close"
										}`}
										onClick={clickEye}
									/>
								</div>
								{/* 會員餘額 */}
								<div className="wallet-balance">
									<span>
										{t(`Currency_${userInfo.currencyId}`)}
									</span>
									<div className="number active">
										<span>
											{showingBalance ? balance : "*****"}
											<button
												className="icon icon-spinner11"
												onClick={clickReloadSpin}
											/>
										</span>
									</div>
								</div>
								{/* BOUNS Wallet ****會員有達到Bouns條件才會出現 */}
								<BonusWalletRows />
							</div>
						</div>
						{/* 會員交易活動 */}
						<div className="member-transaction">
							<div className="transaction-behavior">
								{/* 存款 */}
								<button
									className="btn-deposit"
									onClick={() => navigate(`/deposit`)}>
									<i className="icon-sidemenu-deposit" />
									deposit
								</button>
								{/* 提款 */}
								<button
									className="btn-withdraw"
									onClick={() => navigate(`/withdrawal`)}>
									<i className="icon-sidemenu-withdraw" />
									withdraw
								</button>
							</div>
							<div className="transaction-other">
								{/* 投注紀錄 */}
								<button
									className="btn-statement"
									onClick={() => navigate(`/statement`)}>
									<img
										src="https://banner.goal123.org/h5/img/home-page/icon/sidemenu-statement.svg"
										alt=""
									/>
									<span>statement</span>
								</button>
								{/* 所有交易紀錄 */}
								<button
									className="btn-financial"
									onClick={() => navigate(`/financialLog`)}>
									<img
										src="https://banner.goal123.org/h5/img/home-page/icon/sidemenu-financial.svg"
										alt=""
									/>
									<span>financial</span>
								</button>
								{/* 銀行資訊 */}
								<button
									className="btn-bankinfo"
									onClick={() => navigate(`/bankinfo`)}>
									<img
										src="https://banner.goal123.org/h5/img/home-page/icon/sidemenu-bank.svg"
										alt=""
									/>
									<span>bank info</span>
								</button>
								{/* 虛擬貨幣 */}
								<button
									className="btn-crypto"
									onClick={() => navigate(`/cryptoWallet`)}>
									<img
										src="https://banner.goal123.org/h5/img/home-page/icon/sidemenu-crypto.svg"
										alt="crypto-wallet"
									/>
									<span>crypto wallet</span>
								</button>
							</div>
						</div>
						<VIP />
					</div>
				</div>
			)}
		</>
	);
};

export default LoginedInfo;
