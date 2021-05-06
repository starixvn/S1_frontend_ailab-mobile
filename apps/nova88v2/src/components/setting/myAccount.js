import React, { useContext, useEffect } from "react";
import { useNavigate } from "@reach/router";
import {
	i18nContext,
	userInfoContext,
	msgCountContext
} from "../common/context";
import { Link } from "../../route/link";
import Header from "../header/header";
import Footer from "../common/footer";
import path from "../../path";
import VIPLevel from "../common/vipLevel";

const MyAccount = () => {
	const navigate = useNavigate();
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { msgCount } = useContext(msgCountContext);

	useEffect(() => {
		if (!userInfo.isLogin) {
			navigate(`/${userInfo.langId}`);
		}
	}, [userInfo.isLogin]);

	return (
		<>
			<Header title={i18n.lbl_MyAccount} hideLogo={true} />
			<main className="main">
				<VIPLevel userInfo={userInfo} i18n={i18n} />
				<div className="name">{userInfo.userName}</div>
				<div className="myAccount">
					<Link to={path.profile.root}>
						<div className="icon icon-member" />
						<div>{i18n.lbl_Profile}</div>
					</Link>
					<Link to={path.referral.root}>
						<div className="icon icon-friendreferral" />
						<div>{i18n.lbl_ReferFriends}</div>
					</Link>
					<Link to={path.changePassword.root}>
						<div className="icon icon-icon32px_password" />
						<div>{i18n.lbl_ChangePassword}</div>
					</Link>
					<Link to={path.message.root}>
						<div className="icon icon-envelope">
							{msgCount ? (
								<i className="quantity">
									{msgCount <= 99 ? msgCount : "99+"}
								</i>
							) : null}
						</div>
						<div>{i18n.lbl_Message}</div>
					</Link>
					<Link to={path.wallet.root}>
						<div className="icon icon-icon32px_wallet" />
						<div>{i18n.lbl_MyWallet}</div>
					</Link>
					<Link to={path.bankInfo.root}>
						<div className="icon icon-icon32px_bank-account" />
						<div>{i18n.lbl_BankInfo}</div>
					</Link>
				</div>
			</main>
			<Footer />
		</>
	);
};

export default MyAccount;
