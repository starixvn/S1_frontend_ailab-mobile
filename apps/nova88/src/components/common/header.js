import React, { useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Redirect, Link } from "@reach/router";
import { userInfoContext, i18nContext, msgCountContext } from "Context";
import JoinPanel from "../join/join";
import LoginPanel from "../login/login";
import ReloadSpin from "./reloadSpin";
import { number_format, isConvert } from "./common";
import path from "../../path";
import { tpWalletsListType } from "../transfer/transfer.def";
import useGetBalance from "../hook/useGetMainBalance";
import useGetTpBalance from "../hook/useGetTpBalance";
import Logo from "./logo";

const HeaderTitle = ({ title = "" }) => (
	<>
		<div className="title">{title}</div>
		<LoginPanel hideBtn={true} />
		<JoinPanel />
	</>
);

const Header = ({ title = "", hideLogo = false }) => {
	const { userInfo } = useContext(userInfoContext);

	return (
		<header className={title ? "header" : ""} id="header">
			{hideLogo ? null : (
				<a href="/">
					<Logo langId={userInfo.langId} />
				</a>
			)}
			{title ? (
				<HeaderTitle title={title} />
			) : (
				<HeaderBtn userInfo={userInfo} />
			)}
		</header>
	);
};

const HeaderBtn = ({ userInfo }) => {
	const { i18n } = useContext(i18nContext);
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
		: number_format(allWalletBalance, isConvert(userInfo.currencyId));

	let content = null;
	if (redirectPath === null) {
		if (userInfo?.isLogin) {
			content = (
				<>
					<HeaderInfo
						userName={userInfo?.userName}
						currency={i18n[`Currency_${userInfo.currencyId}`]}
						amount={balance}
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
			content = (
				<div className="headerButton">
					<JoinPanel />
					<LoginPanel ButtonTitle={i18n.lbl_Login} />
				</div>
			);
		}
	} else {
		content = <Redirect to={redirectPath} noThrow />;
	}

	return content;
};

const HeaderInfo = props => {
	return (
		<div className="headerInfo">
			<div className="MemberID">{props.userName}</div>
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

export default Header;
