import classNames from "classnames";
import React, { useState, useContext } from "react";
import { Link, Match } from "@reach/router";
import { userInfoContext, i18nContext } from "./context";
import path from "../../path";
import { siteInfo, bannerImgUrl } from "../../config";

const defChatLangSubUrl = {
	en: 1,
	id: 2,
	cs: 3,
	th: 4
};

const Footer = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);

	const [showContact, setShowContact] = useState(false);

	const { langId, isLogin } = userInfo;

	return (
		<footer className="footer">
			<Match path={path.home.root}>
				{({ match }) => {
					const isMatch = match !== null;
					return (
						<Link
							onClick={() => setShowContact(false)}
							to={path.home.root}
							className={classNames("footer-item", {
								active: isMatch
							})}>
							<div className="icon-home-outline" />
							<span>{i18n.lbl_Home}</span>
						</Link>
					);
				}}
			</Match>

			<Match path={path.sports.root}>
				{({ match }) => {
					const isMatch = match !== null;
					return (
						<Link
							onClick={() => setShowContact(false)}
							to={`/${path.sports.root}`}
							className={classNames("footer-item tag-hot-pop", {
								active: isMatch
							})}>
							<div className="icon-soccer-solid" />
							<span>{i18n.lbl_Footer_Sports}</span>
						</Link>
					);
				}}
			</Match>

			{isLogin ? (
				<Match path={path.deposit.root}>
					{({ match }) => {
						const isMatch = match !== null;
						return (
							<Link
								onClick={() => setShowContact(false)}
								to={`/${path.deposit.root}`}
								className={classNames("footer-item", {
									active: isMatch
								})}>
								<div className="icon-deposit-footer" />
								<span>{i18n.lbl_Deposit}</span>
							</Link>
						);
					}}
				</Match>
			) : (
				<Match path={path.promotion.root}>
					{({ match, location }) => {
						const isMatch =
							match !== null ||
							location.pathname === `/${path.promotionInfo.root}`;

						return (
							<Link
								onClick={() => setShowContact(false)}
								to={`/${path.promotion.root}`}
								className={classNames("footer-item", {
									active: isMatch
								})}>
								<div className="icon-promo-white" />
								<span>{i18n.lbl_Footer_Promotion}</span>
							</Link>
						);
					}}
				</Match>
			)}

			<div
				className="footer-item"
				onClick={() => setShowContact(!showContact)}>
				<button className="icon-livechat" />
				<span>{i18n.lbl_Contact}</span>
				<div
					className={classNames("footer-pop", {
						active: showContact
					})}>
					<a
						className="footer-pop-item"
						rel="noreferrer noopener"
						href={siteInfo().zaloId}
						target="_blank">
						<img
							src={`${bannerImgUrl}/h5/img/4.0/zalo.png`}
							alt="Zalo"
						/>
						<div>Zalo</div>
					</a>
					<a
						className="footer-pop-item"
						target="_blank"
						rel="noreferrer"
						href={`https://direct.lc.chat/${
							siteInfo().liveChatId
						}/${defChatLangSubUrl[langId] ?? ""}`}>
						<img
							src={`${bannerImgUrl}/h5/img/4.0/livechat.png`}
							alt="Live Chat"
						/>
						<div>{i18n.lbl_LiveChat}</div>
					</a>
					<a
						className="footer-pop-item"
						rel="noreferrer noopener"
						href={siteInfo().telegramId}
						target="_blank">
						<img
							src={`${bannerImgUrl}/h5/img/4.0/telegram.png`}
							alt="Telegram"
						/>
						<div>Telegram</div>
					</a>
					<button className="icon-arrow-white" />
				</div>
			</div>

			{isLogin ? (
				<Match path={path.member.root}>
					{({ location }) => {
						const isMatch =
							location.pathname === `/${path.member.root}` ||
							location.pathname ===
								`/${path.member.root}/${path.member.sub.bankInfo.root}`;
						return (
							<Link
								onClick={() => setShowContact(false)}
								to={`/${path.member.root}`}
								className={classNames("footer-item", {
									active: isMatch
								})}>
								<div className="icon-account-white" />
								<span>{i18n.lbl_Me}</span>
							</Link>
						);
					}}
				</Match>
			) : (
				<Match path={path.other.root}>
					{({ location }) => {
						const isMatch =
							location.pathname === `/${path.other.root}`;
						return (
							<Link
								onClick={() => setShowContact(false)}
								to={`/${path.other.root}`}
								className={classNames("footer-item", {
									active: isMatch
								})}>
								<div className="icon-other-white" />
								<span>{i18n.lbl_Other}</span>
							</Link>
						);
					}}
				</Match>
			)}
		</footer>
	);
};

export default Footer;
