import React, { useContext, useState } from "react";
import { Match } from "@reach/router";
import PropTypes from "prop-types";
import { userInfoContext, i18nContext, msgCountContext } from "Context";
import { Link } from "@Router";
import path from "../../path";

const Footer = () => {
	const { userInfo } = useContext(userInfoContext);
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
						const isMatch = props.match !== null;
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
						const isMatch = props.match !== null;
						return (
							<Link
								to={path.promotion.root}
								className={`icon icon-gift${
									isMatch ? " active" : ""
								}`}>
								<div className="circleAnimation" />
								<span>{i18n.lbl_Promotion}</span>
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
						const isMatch = props.match !== null;
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
						const isMatch = props.match !== null;
						return (
							<Link
								onClick={handleWalletMenu.bind(this, true)}
								to={path.promotion.root}
								className={`icon icon-gift${
									isMatch && !openWalletMenu ? " active" : ""
								}`}>
								<div className="circleAnimation" />
								<span>{i18n.lbl_Promotion}</span>
							</Link>
						);
					}}
				</Match>

				<a
					className={`icon icon-icon32px_wallet${
						openWalletMenu ? " active" : ""
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
					isOpen={openWalletMenu}
					handleWalletMenu={handleWalletMenu}
					i18n={i18n}
				/>
			) : null}
		</>
	);
};

const FooterWalletMenu = ({ isOpen, handleWalletMenu, i18n = {} }) => (
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
				to={path.withdrawal.root}
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

FooterWalletMenu.defaultProps = {
	isOpen: false
};

FooterWalletMenu.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	isOpen: PropTypes.bool,
	handleWalletMenu: PropTypes.func.isRequired
};

export default Footer;
