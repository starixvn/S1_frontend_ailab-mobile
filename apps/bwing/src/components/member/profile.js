import React, { useContext } from "react";
import { Link } from "@reach/router";
import { i18nContext, userInfoContext } from "../common/context";
import ProfileDetail from "./profile.detail";
import path from "../../path";
import ProfileWallet from "./profile.wallet";

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);

	return (
		<>
			<div className="avatar" />
			{/* <div className="viplv">
				<i className="icon icon-vip"></i>VIP Lv{userInfo.userLevel}
			</div> */}
			<ProfileWallet />
			<ProfileDetail />

			{userInfo.accountName &&
			userInfo.birth_d &&
			userInfo.phoneNo &&
			userInfo.email ? (
				<div className="btn-group">
					<Link
						className="purple"
						to={`/${path.changePassword.root}`}>
						{i18n.lbl_ChangePassword.toUpperCase()}
					</Link>
				</div>
			) : null}
		</>
	);
};

export default Panel;
