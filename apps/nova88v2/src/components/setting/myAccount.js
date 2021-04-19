import React, { useContext } from "react";
import {
	i18nContext,
	userInfoContext,
	msgCountContext
} from "../common/context";
import { Link } from "../../route/link";
import Header from "../header/header";
import { markMap, csMap } from "../profile/profile";
import path from "../../path";

const MyAccount = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { msgCount } = useContext(msgCountContext);

	return (
		<>
			<Header title={i18n.lbl_MyAccount} hideLogo={true} />
			<main className="main">
				<div className="vip_mark">
					<img
						src={`https://image.n88media.com/VIP/img/vip0${userInfo.userLevel}.png`}
						alt="vip"
					/>
					<div>
						{userInfo.langId === "cs"
							? `${i18n[csMap[userInfo.userLevel]]} ${
									i18n.lbl_Club
							  }`
							: i18n[markMap[userInfo.userLevel]]}
					</div>
				</div>
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
		</>
	);
};

export default MyAccount;
