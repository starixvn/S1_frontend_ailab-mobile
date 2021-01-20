import React, { useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Redirect, Link } from "@reach/router";
// import SubMenu from "../subMenu/subMenu";
import { userInfoContext, i18nContext, msgCountContext } from "./context";
import JoinPanel from "../join/join";
import LoginPanel from "../login/login";
import ReloadSpin from "./reloadSpin";
import { number_format } from "./common";
import path from "../../path";
import Logo from "../../styles/img/logo.png";
import { tpWalletsListType } from "../transfer/transfer.def";
import useGetBalance from "../hook/useGetMainBalance";
import useGetTpBalance from "../hook/useGetTpBalance";

const HeaderTitle = ({ title }) => (
	<>
		<div className="title">{title}</div>
		<LoginPanel hideBtn={true} />
	</>
);

HeaderTitle.propTypes = {
	title: PropTypes.string.isRequired
};

const Header = ({ title, hideLogo }) => {
	return (
		<header className={title ? "header" : ""} id="header">
			{hideLogo ? null : (
				<a href="/">
					<img src={Logo} alt="logo" />
				</a>
			)}
			{title ? <HeaderTitle title={title} /> : <HeaderBtn />}
			{/* <SubMenu /> */}
		</header>
	);
};

Header.defaultProps = {
	hideLogo: null
};

Header.propTypes = {
	title: PropTypes.string.isRequired,
	hideLogo: PropTypes.bool
};

const HeaderBtn = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { msgCount } = useContext(msgCountContext);
	const [redirectPath, setRedirectPath] = useState(null);

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

	useEffect(() => {
		if (isMountedRef.current && redirectPath !== null) {
			setRedirectPath(null);
		}
	}, [redirectPath, setRedirectPath]);

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
		: number_format(allWalletBalance, false);

	const ClickUserName = () => {
		if (userInfo.isLogin) {
			setRedirectPath(`/${path.member.root}`);
		}
	};

	let display = null;
	if (redirectPath !== null) {
		display = <Redirect to={redirectPath} noThrow />;
	} else if (userInfo?.isLogin) {
		display = (
			<>
				<HeaderInfo
					userName={userInfo?.userName}
					currency={i18n[`Currency_${userInfo.currencyId}`]}
					amount={balance}
					ClickUserName={ClickUserName}
				/>
				<ReloadSpin func={clickReloadSpin} />
				<div className="headerButton">
					<Link to={path.message.root} className="icon icon-chat">
						{msgCount ? (
							<span className="amount">{msgCount}</span>
						) : null}
					</Link>
				</div>
			</>
		);
	} else {
		display = (
			<div className="headerButton">
				<JoinPanel />
				<LoginPanel ButtonTitle={i18n.lbl_Login} />
			</div>
		);
	}

	return display;
};

const HeaderInfo = props => {
	return (
		<div className="headerInfo">
			<div className="MemberID" onClick={props.ClickUserName}>
				{props.userName}
			</div>
			<div className="Balance">
				{props.currency} {props.amount}
			</div>
		</div>
	);
};

HeaderInfo.defaultProps = {
	amount: 0,
	currency: ""
};

HeaderInfo.propTypes = {
	ClickUserName: PropTypes.func.isRequired,
	userName: PropTypes.string.isRequired,
	currency: PropTypes.string,
	amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default Header;
