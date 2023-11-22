import classNames from "classnames";
import { Match } from "@reach/router";
import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@Router";
import { rootContext, userInfoContext, msgCountContext } from "Context";
import path from "../../path";
import { cloudBannerImgURL } from "../../config";
import { defLiveChatLangIdToCurrencyId } from "./common";
import allowedCurrencyList from "../../datas/allowedCurrencyList";

const Footer = () => {
	const { t } = useTranslation();

	const { root } = useContext(rootContext);
	const { msgCount } = useContext(msgCountContext);
	const { userInfo } = useContext(userInfoContext);
	const { isLogin, langId, currencyId } = userInfo;

	const [footerPopup, setFooterPopup] = useState(false);

	return (
		isLogin && (
			<>
				<footer id="footer" className="footer">
					<Match path={`/:langId/${path.home.root}`}>
						{({ match }) => {
							const isMatch = match !== null || root;
							return (
								<Link
									className={classNames("footer-item", {
										active: isMatch
									})}
									to={path.home.root}>
									<img
										src={`${cloudBannerImgURL}/h5/img/4.0/footer/home${
											isMatch ? "-dark" : ""
										}.png`}
										alt="Home"
									/>
									<span className="footer-title">
										{t("lbl_Home")}
									</span>
								</Link>
							);
						}}
					</Match>
					<Match path={`/:langId/${path.promotion.root}`}>
						{({ match, location }) => {
							const isMatch =
								match !== null ||
								location.pathname?.includes(
									`/${path.promotion.root}`
								);
							return (
								<Link
									className={classNames("footer-item", {
										active: isMatch
									})}
									to={path.promotion.root}>
									<img
										src={`${cloudBannerImgURL}/h5/img/4.0/footer/gift${
											isMatch ? "-dark" : ""
										}.png`}
										alt="Poromotion"
									/>
									<span className="footer-title">
										{t("lbl_Promotion")}
									</span>
								</Link>
							);
						}}
					</Match>

					<a
						className={classNames("footer-item plus", {
							active: footerPopup
						})}
						onClick={() => {
							setFooterPopup(prev => !prev);
						}}
					/>

					<a
						rel="noreferrer"
						target="_blank"
						href={`https://direct.lc.chat/11638088/${
							defLiveChatLangIdToCurrencyId[langId] ??
							defLiveChatLangIdToCurrencyId.en
						}`}
						className="footer-item">
						<img
							src={`${cloudBannerImgURL}/h5/img/4.0/footer/livechat.png`}
							alt="Livechat"
						/>
						<span className="footer-title">
							{t("lbl_LiveChat")}
						</span>
					</a>

					<Match path={`/:langId/${path.setting.root}`}>
						{({ location }) => {
							const isMatch = location.pathname?.includes(
								`/${path.setting.root}`
							);
							return (
								<Link
									className={classNames("footer-item", {
										active: isMatch,
										me: msgCount > 0
									})}
									to={path.setting.root}>
									<img
										src={`${cloudBannerImgURL}/h5/img/4.0/footer/me${
											isMatch ? "-dark" : ""
										}.png`}
										alt="Me"
									/>
									<span className="footer-title">
										{t("lbl_Me")}
									</span>
								</Link>
							);
						}}
					</Match>
				</footer>

				<div
					className={classNames("footer-popup", {
						active: footerPopup
					})}>
					<div className="footer-popup-item">
						<Link to={path.deposit.root}>
							<div className="footer-popup-img">
								<img
									src={`${cloudBannerImgURL}/h5/img/4.0/footer/deposit.png`}
									alt="Deposit"
								/>
							</div>
						</Link>
						<div className="footer-popup-title">
							{t("lbl_Deposit")}
						</div>
					</div>

					<div className="footer-popup-item">
						<Link to={path.withdrawal.root}>
							<div className="footer-popup-img">
								<img
									src={`${cloudBannerImgURL}/h5/img/4.0/footer/withdrawal.png`}
									alt="Withdrawal"
								/>
							</div>
						</Link>
						<div className="footer-popup-title">
							{t("lbl_Withdrawal")}
						</div>
					</div>

					{allowedCurrencyList.transferFunds.includes(currencyId) && (
						<div className="footer-popup-item">
							<Link to={path.transfer.root}>
								<div className="footer-popup-img">
									<img
										src={`${cloudBannerImgURL}/h5/img/4.0/footer/transfer.png`}
										alt="Transfer"
									/>
								</div>
							</Link>
							<div className="footer-popup-title">
								{t("lbl_Transfer")}
							</div>
						</div>
					)}

					<div className="footer-popup-item">
						<Link to={path.message.root}>
							<div className="footer-popup-img">
								<img
									src={`${cloudBannerImgURL}/h5/img/4.0/footer/massage.png`}
									alt="Message"
								/>
							</div>
						</Link>
						<div className="footer-popup-title">
							{t("lbl_Message")}
						</div>
					</div>
				</div>
			</>
		)
	);
};

export { Footer };
