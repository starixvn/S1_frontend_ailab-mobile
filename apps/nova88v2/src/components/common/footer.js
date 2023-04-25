import React, { useContext, useState } from "react";
import { Match } from "@reach/router";

import PropTypes from "prop-types";
import { Link } from "@Router";
import {
	userInfoContext,
	i18nContext,
	msgCountContext,
	rootContext,
	eWalletContext
} from "./context";
import path from "../../path";
import MsgPopup from "./msgPopup";
import { defCurrenyId } from "./common";

const Footer = () => {
	const { userInfo } = useContext(userInfoContext);
	const { root } = useContext(rootContext);
	const { i18n } = useContext(i18nContext);
	const { msgCount } = useContext(msgCountContext);
	const [openWalletMenu, setOpenWalletMenu] = useState(false);

	const handleWalletMenu = isClose => {
		setOpenWalletMenu(prev => (isClose === true ? false : !prev));
	};

	const footer =
		userInfo.isLogin === false ? (
			<footer id="footer">
				<Match path={`/:langId/${path.home.root}`}>
					{props => {
						const isMatch = props.match !== null || root;
						return (
							<Link
								to={path.home.root}
								className={`icon icon-home${
									isMatch ? " active" : ""
								}`}>
								<div className="circleAnimation" />
								<span>{i18n.lbl_Home}</span>
							</Link>
						);
					}}
				</Match>
				<Match path={`/:langId/${path.promotion.root}`}>
					{props => {
						const isMatch =
							props.match !== null ||
							props.location.pathname ===
								`/${path.promotionInfo.root}`;
						return (
							<Link
								to={path.promotion.root}
								className={`icon icon-gift${
									isMatch ? " active" : ""
								}`}>
								<div className="circleAnimation" />
								<span>{i18n.lbl_Promotion}</span>
								<div className="icon icon-mediafire">HOT</div>
							</Link>
						);
					}}
				</Match>

				<a
					rel="noreferrer"
					target="_blank"
					href="https://direct.lc.chat/11638088/"
					className="icon icon-contact">
					<div className="circleAnimation" />
					<span>{i18n.lbl_LiveChat}</span>
				</a>

				<Match path={`/:langId/${path.setting.root}`}>
					{props => {
						const isMatch = props.location.pathname?.includes(
							`/${path.setting.root}`
						);
						return (
							<Link
								to={path.setting.root}
								className={`icon icon-menu${
									isMatch ? " active" : ""
								}`}>
								<div className="circleAnimation" />
								<span>{i18n.lbl_More}</span>
							</Link>
						);
					}}
				</Match>
			</footer>
		) : (
			<footer id="footer">
				<Match path={`/:langId/${path.home.root}`}>
					{props => {
						const isMatch = props.match !== null || root;
						return (
							<Link
								onClick={handleWalletMenu.bind(this, true)}
								to={path.home.root}
								className={`icon icon-home${
									isMatch && !openWalletMenu ? " active" : ""
								}`}>
								<div className="circleAnimation" />
								<span>{i18n.lbl_Home}</span>
							</Link>
						);
					}}
				</Match>
				<Match path={`/:langId/${path.promotion.root}`}>
					{props => {
						const isMatch =
							props.match !== null ||
							props.location.pathname ===
								`/${path.promotionInfo.root}`;
						return (
							<Link
								onClick={handleWalletMenu.bind(this, true)}
								to={path.promotion.root}
								className={`icon icon-gift${
									isMatch && !openWalletMenu ? " active" : ""
								}`}>
								<div className="circleAnimation" />
								<span>{i18n.lbl_Promotion}</span>
								<div className="icon icon-mediafire">HOT</div>
							</Link>
						);
					}}
				</Match>

				<a
					className={`icon icon-icon32px_wallet${
						openWalletMenu ? " icon-close active" : ""
					}`}
					onClick={handleWalletMenu}>
					<div className="circleAnimation" />
					<span>{i18n.lbl_Wallet}</span>
				</a>

				<a
					rel="noreferrer"
					target="_blank"
					href="https://direct.lc.chat/11638088/"
					className="icon icon-contact">
					<div className="circleAnimation" />
					<span>{i18n.lbl_LiveChat}</span>
				</a>

				<Match path={`/:langId/${path.setting.root}`}>
					{props => {
						const isMatch = props.location.pathname?.includes(
							`/${path.setting.root}`
						);
						return (
							<Link
								onClick={handleWalletMenu.bind(this, true)}
								to={path.setting.root}
								className={`icon icon-menu${
									isMatch && !openWalletMenu ? " active" : ""
								}`}>
								{msgCount > 0 ? (
									<div className="icon icon-envelope" />
								) : null}
								<MsgPopup userInfo={userInfo} />
								<div className="circleAnimation" />
								<span>{i18n.lbl_More}</span>
							</Link>
						);
					}}
				</Match>
			</footer>
		);

	return (
		<>
			{footer}
			{userInfo.isLogin ? (
				<FooterWalletMenu
					userInfo={userInfo}
					isOpen={openWalletMenu}
					handleWalletMenu={handleWalletMenu}
					i18n={i18n}
				/>
			) : null}
		</>
	);
};

const FooterWalletMenu = ({
	userInfo,
	isOpen,
	handleWalletMenu,
	i18n = {}
}) => {
	const { isShowEWallet } = useContext(eWalletContext);
	// 因目前BDT幣別不支援localBank,故先隱藏
	const withdrawalLink = () => {
		if (userInfo.currencyId === defCurrenyId.BDT && isShowEWallet) {
			return path.eWalletWithdrawal.root;
		}
		if (userInfo.currencyId === defCurrenyId.BDT && !isShowEWallet) {
			return path.cryptoWithdrawal.root;
		}
		return path.withdrawal.root;
	};
	return (
		<div className={`walletMenu${isOpen ? " active" : ""}`}>
			<div className="walletModule">
				<Link
					className="icon icon-icon32px_wallet"
					to={path.wallet.root}
					onClick={handleWalletMenu}>
					<div className="circleAnimation" />
					<span>{i18n.lbl_MyWallet}</span>
				</Link>
				<Link
					className="icon icon-icon32px_Withdraw"
					to={withdrawalLink()}
					onClick={handleWalletMenu}>
					<div className="circleAnimation" />
					<span>{i18n.lbl_Withdrawal}</span>
				</Link>
				<Link
					className="icon icon-icon32px_deposit"
					to={path.deposit.root}
					onClick={handleWalletMenu}>
					<div className="circleAnimation" />
					<span>{i18n.lbl_Deposit}</span>
				</Link>
				<Link
					className="icon icon-icon32px_Funds-transfer"
					to={path.transfer.root}
					onClick={handleWalletMenu}>
					<div className="circleAnimation" />
					<span>{i18n.lbl_Transfer}</span>
				</Link>
				<Link
					className="icon icon-icon32px_History"
					to={path.statement.root}
					onClick={handleWalletMenu}>
					<div className="circleAnimation" />
					<span>{i18n.lbl_Statement}</span>
				</Link>
			</div>
		</div>
	);
};

FooterWalletMenu.defaultProps = {
	isOpen: false
};

FooterWalletMenu.propTypes = {
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	isOpen: PropTypes.bool,
	handleWalletMenu: PropTypes.func.isRequired
};

export default Footer;
