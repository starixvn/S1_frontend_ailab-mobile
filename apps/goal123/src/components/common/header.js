import React, { useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Redirect, Link } from "@reach/router";
// import SubMenu from "../subMenu/subMenu";
import {
	userInfoContext,
	i18nContext,
	walletInfoContext,
	popBoxContext,
	msgCountContext
} from "./context";
import {
	api_GetBalnace,
	api_account_GetTpWalletList,
	api_account_GetTpWalletBalance
} from "../../service/api/account";
import JoinPanel from "../join/join";
import LoginPanel from "../login/login";
import ReloadSpin from "./reloadSpin";
import { number_format } from "./common";
import path from "../../path";
import Logo from "../../styles/img/logo.png";
import { tpWalletsListType } from "../transfer/transfer.def";

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
	const { walletInfo, setWalletInfo } = useContext(walletInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const [redirectPath, setRedirectPath] = useState(null);
	const [processing, setProcessing] = useState(false);
	const [tpWalletsList, setTpWalletsList] = useState([]);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (userInfo.isLogin) {
			GetBalance();
		}
	}, [userInfo.isLogin]);

	useEffect(() => {
		if (isMountedRef.current && redirectPath !== null) {
			setRedirectPath(null);
		}
	}, [redirectPath, setRedirectPath]);

	const GetBalance = () => {
		if (!processing) {
			setProcessing(true);

			api_GetBalnace().then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							setWalletInfo(prevState => ({
								...prevState,
								main: res.data.data
							}));
						} else {
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
								content: `[${res.data.errorCode}]${res.data.message}`
							});
						}
						setProcessing(false);
					}
				},
				err => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: i18n.msg_ApiServerError
						});
						setProcessing(false);
					}
				}
			);

			api_account_GetTpWalletList({
				ListType: tpWalletsListType.allWallets
			}).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							res.data.data?.forEach(i => {
								api_account_GetTpWalletBalance({
									TpId: i.tpId
								}).then(
									response => {
										if (response.data.errorCode === 0) {
											const { data } = response.data;
											const tpWalletData = {
												id: data.tpId,
												balance: data.balance
											};

											const tpWalletIdx = tpWalletsList.findIndex(
												wallet => wallet.id === i.tpId
											);

											if (tpWalletIdx !== -1) {
												setTpWalletsList(prev => {
													prev[
														tpWalletIdx
													] = tpWalletData;
													return prev;
												});
											} else {
												setTpWalletsList(prev => [
													...prev,
													tpWalletData
												]);
											}
										}
									},
									err => {
										if (isMountedRef.current) {
											setPopBox({
												isOpen: true,
												title: i18n.lbl_ImportantNote,
												content: i18n.msg_ApiServerError
											});
										}
									}
								);
							});
						} else {
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
								content: res.data.message
							});
						}
					}
				},
				err => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: i18n.msg_ApiServerError
						});
					}
				}
			);
		}
	};

	const otherWalletBalance = tpWalletsList?.reduce((prev, curr) => {
		return prev + curr.balance;
	}, 0);
	const allWalletBalance = walletInfo.main + otherWalletBalance;

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
				<ReloadSpin func={GetBalance} />
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

	// return redirectPath === null ? (
	// 	userInfo?.isLogin ? (
	// 		<>
	// 			<HeaderInfo
	// 				userName={userInfo?.userName}
	// 				currency={i18n[`Currency_${userInfo.currencyId}`]}
	// 				amount={balance}
	// 				ClickUserName={ClickUserName}
	// 			/>
	// 			<ReloadSpin func={GetBalance} />
	// 			<div className="headerButton">
	// 				<Link to={path.message.root} className="icon icon-chat">
	// 					{msgCount ? (
	// 						<span className="amount">{msgCount}</span>
	// 					) : null}
	// 				</Link>
	// 			</div>
	// 		</>
	// 	) : (
	// 		<div className="headerButton">
	// 			<JoinPanel />
	// 			<LoginPanel ButtonTitle={i18n.lbl_Login} />
	// 		</div>
	// 	)
	// ) : (
	// 	<Redirect to={redirectPath} noThrow />
	// );
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
	amount: 0
};

HeaderInfo.propTypes = {
	ClickUserName: PropTypes.func.isRequired,
	userName: PropTypes.string.isRequired,
	currency: PropTypes.string.isRequired,
	amount: PropTypes.number
};

export default Header;
