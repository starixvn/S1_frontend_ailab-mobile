import React, { useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { userInfoContext, i18nContext } from "Context";
import { Link } from "@Router";
import ReloadSpin from "../common/reloadSpin";
import { number_format, isConvert } from "../common/common";
import { tpWalletsListType } from "../transfer/transfer.def";
import useGetBalance from "../hook/useGetMainBalance";
import useGetTpBalance from "../hook/useGetTpBalance";
import Logo from "../common/logo";
import path from "../../path";

const HeaderTitle = ({ title = "", link, i18n }) =>
	title ? (
		<div className="title">
			{link ? (
				<Link to={link}>
					<i className="icon icon icon-icon32px_1" />
					{i18n.lbl_Back}
				</Link>
			) : null}
			{title}
		</div>
	) : null;

const Header = ({ title, hideLogo, filter, link }) => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const headerClassName = !title ? "" : "header";

	return (
		<header className={headerClassName} id="header">
			{hideLogo ? null : (
				<a href={`/${userInfo.langId}`}>
					<Logo langId={userInfo.langId} />
				</a>
			)}
			{title ? (
				<HeaderTitle title={title} link={link} i18n={i18n} />
			) : (
				<HeaderBtn userInfo={userInfo} />
			)}
			{filter || null}
		</header>
	);
};

const HeaderBtn = ({ userInfo }) => {
	const { i18n } = useContext(i18nContext);
	const { mainWalletInfo, GetBalance } = useGetBalance({
		isLogin: userInfo.isLogin
	});
	const { tpWalletsList, GetTpWalletList } = useGetTpBalance({
		isLogin: userInfo.isLogin,
		listType: tpWalletsListType.allWallets
	});

	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const clickReloadSpin = () => {
		GetBalance();
		GetTpWalletList();
	};

	const otherWalletBalance = tpWalletsList?.reduce((prev, curr) => {
		return prev + curr.balance;
	}, 0);
	const allWalletBalance = mainWalletInfo.balance + otherWalletBalance;
	const balance = !allWalletBalance
		? 0
		: number_format(allWalletBalance, isConvert(userInfo.currencyId));

	let content = null;
	if (userInfo?.isLogin) {
		content = (
			<>
				<HeaderInfo
					userName={userInfo?.userName}
					currency={i18n[`Currency_${userInfo.currencyId}`]}
					amount={balance}
				/>
				<ReloadSpin func={clickReloadSpin} className="clickBtn" />
			</>
		);
	} else {
		content = (
			<div className="headerButton">
				<Link className="loginBtn" to={path.login.root}>
					{i18n.lbl_Login}
				</Link>
				<Link className="joinBtn" to={path.join.root}>
					{i18n.lbl_JoinNow}
				</Link>
			</div>
		);
	}

	return content;
};

const HeaderInfo = props => {
	return (
		<div className="headerInfo">
			<div className="MemberID">
				{props.userName}
				<span className="icon icon-arrow_drop_down" />
			</div>
			<div className="Balance">
				{props.currency} {props.amount}
			</div>
		</div>
	);
};

HeaderInfo.defaultProps = {
	userName: "",
	currency: null,
	amount: 0
};

HeaderInfo.propTypes = {
	userName: PropTypes.string,
	currency: PropTypes.string,
	amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

Header.defaultProps = {
	filter: null,
	title: null,
	hideLogo: false,
	link: null
};

Header.propTypes = {
	filter: PropTypes.node,
	title: PropTypes.string,
	hideLogo: PropTypes.bool,
	link: PropTypes.string
};

HeaderTitle.defaultProps = {
	title: null,
	link: null,
	i18n: {}
};

HeaderTitle.propTypes = {
	title: PropTypes.string,
	link: PropTypes.string,
	i18n: PropTypes.objectOf(PropTypes.string)
};

export default Header;
