import React, { useState, useContext } from "react";
import { useMatch } from "@reach/router";
import { useTranslation } from "react-i18next";
import { bannerImgUrl, siteInfo } from "../../../config";
import { userInfoContext } from "../../common/context";
import Menu from "../menu";

const HomeFooter = () => {
	const { userInfo } = useContext(userInfoContext);
	const { t } = useTranslation();
	const [clickHome, setClickHome] = useState(false);
	const [clickdeposit, setClickDeposit] = useState(false);
	const [clickPromotion, setClickPromotion] = useState(false);

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const matchPromotion = useMatch("/promotion");
	const matchHome = useMatch("/");

	const onClickDeposit = () => {
		setClickDeposit(!clickdeposit);
	};

	const onClickHome = () => {
		setClickHome(!clickHome);
	};

	const onClickPromotion = () => {
		setClickPromotion(!clickPromotion);
	};

	const liveChatUrl = `https://direct.lc.chat/${siteInfo().liveChatId}
	}`;

	const handleLiveChatClick = () => {
		window.open(liveChatUrl, "_blank", "noopener,noreferrer");
	};

	const FocusItemImg = {
		iconHome: {
			beforeClickSrc: `${bannerImgUrl}/h5/img/home-page/footer/icon-home.svg`,
			afterClickSrc: `${bannerImgUrl}/h5/img/home-page/footer/icon-home-active.svg`
		},
		iconPromotion: {
			beforeClickSrc: `${bannerImgUrl}/h5/img/home-page/footer/icon-promotion.svg`,
			afterClickSrc: `${bannerImgUrl}/h5/img/home-page/footer/icon-promotion-active.svg`
		},
		iconDeposit: {
			// beforeLoginSrc: `${bannerImgUrl}/h5/img/home-page/footer/icon-deposit.svg`,
			// beforeLoginbutClcikedSrc: `${bannerImgUrl}/h5/img/home-page/footer/icon-deposit-after.svg`,
			beforeClickSrc: `${bannerImgUrl}/h5/img/home-page/footer/icon-deposit-after.svg`,
			afterClickSrc: `${bannerImgUrl}/h5/img/home-page/footer/icon-deposit-after-active.svg`
		},
		iconLiveChat: {
			beforeClickSrc: `${bannerImgUrl}/h5/img/home-page/footer/icon-livechat.svg`,
			afterClickSrc: `${bannerImgUrl}/h5/img/home-page/footer/icon-livechat.svg`
		},
		iconMenu: {
			beforeClickSrc: `${bannerImgUrl}/h5/img/home-page/footer/icon-menu.svg`,
			afterClickSrc: `${bannerImgUrl}/h5/img/home-page/footer/icon-menu-active.svg`
		}
	};

	return (
		<>
			{isMenuOpen && <Menu toggleMenu={toggleMenu} />}
			<footer id="footer" className="footer">
				<div
					className={
						userInfo.isLogin ? "footer-menu after" : "footer-menu"
					}>
					<div
						className={
							userInfo.isLogin
								? "footer-list-after"
								: "footer-list"
						}>
						<a
							href="/"
							className={
								clickHome || matchHome ? "item active" : "item"
							}
							onClick={onClickHome}>
							<img
								src={
									clickHome || matchHome
										? FocusItemImg.iconHome.afterClickSrc
										: FocusItemImg.iconHome.beforeClickSrc
								}
								alt=""
							/>
							{!userInfo.Login && (
								<span
									className={
										clickHome || (matchHome && "active ")
									}>
									{t("lbl_Home")}
								</span>
							)}
						</a>

						<a
							href="/promotion"
							className={
								clickPromotion || matchPromotion
									? "item active"
									: "item"
							}
							onClick={onClickPromotion}>
							<img
								src={
									clickPromotion || matchPromotion
										? FocusItemImg.iconPromotion
												.afterClickSrc
										: FocusItemImg.iconPromotion
												.beforeClickSrc
								}
								alt=""
							/>
							{!userInfo.Login && (
								<span
									className={
										clickPromotion ||
										(matchPromotion && "active ")
									}>
									{t("Label_Footer_Promos")}
								</span>
							)}
						</a>

						{!userInfo.isLogin && (
							<a href="/login" className="item">
								<img
									onClick={onClickDeposit}
									src="https://banner.goal123.org/h5/img/home-page/footer/icon-deposit.svg"
								/>
								<span>{t("lbl_Deposit")}</span>
							</a>
						)}

						{userInfo.isLogin && (
							<a
								className={
									clickdeposit
										? "item deposit active"
										: "item deposit "
								}>
								<img
									onClick={onClickDeposit}
									src={
										clickdeposit
											? FocusItemImg.iconDeposit
													.afterClickSrc
											: FocusItemImg.iconDeposit
													.beforeClickSrc
									}
								/>
							</a>
						)}

						{userInfo.isLogin && clickdeposit && (
							<div className="footer-transaction active">
								<div className="transaction">
									<a
										href="/deposit"
										className="transaction-item">
										<img
											src="https://banner.goal123.org/h5/img/home-page/footer/icon-sub-deposit.svg"
											alt=""
										/>
										<span>{t("lbl_Deposit")}</span>
									</a>
									<a
										href="/withdrawal"
										className="transaction-item">
										<img
											src="https://banner.goal123.org/h5/img/home-page/footer/icon-sub-withdraw.svg"
											alt=""
										/>
										<span>{t("lbl_Withdrawal")}</span>
									</a>
									<a
										href="/statement"
										className="transaction-item">
										<img
											src="https://banner.goal123.org/h5/img/home-page/footer/icon-sub-statement.svg"
											alt=""
										/>
										<span>{t("lbl_Statement")}</span>
									</a>
									<a
										href="financialLog"
										className="transaction-item">
										<img
											src="https://banner.goal123.org/h5/img/home-page/footer/icon-sub-financial.svg"
											alt=""
										/>
										<span>{t("lbl_Financial")}</span>
									</a>
								</div>
							</div>
						)}

						<a className="item" onClick={handleLiveChatClick}>
							<img
								src={FocusItemImg.iconLiveChat.beforeClickSrc}
								alt=""
							/>
							<span>{t("lbl_LiveChat")}</span>
						</a>
						<a
							className={isMenuOpen ? "item active" : "item "}
							onClick={toggleMenu}>
							<img
								src={
									isMenuOpen
										? `${bannerImgUrl}/h5/img/home-page/footer/icon-menu-active.svg`
										: `${bannerImgUrl}/h5/img/home-page/footer/icon-menu.svg`
								}
								alt=""
							/>
							<span className={isMenuOpen && "active "}>
								{t("Label_Footer_Menu")}
							</span>
						</a>
					</div>
				</div>
			</footer>
		</>
	);
};

export default HomeFooter;
