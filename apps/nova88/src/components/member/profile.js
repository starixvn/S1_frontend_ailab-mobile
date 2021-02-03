import React, { useContext } from "react";
import { i18nContext, userInfoContext } from "Context";
import { Link } from "@reach/router";
import ProfileDetail from "./profile.detail";
import path from "../../path";
import ProfileWallet from "./profile.wallet";

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);

	return (
		<>
			<div className="avatar" />
			<div className="viplv">
				<i className="icon icon-vip" />
				VIP Lv{userInfo.userLevel}
			</div>
			<ProfileWallet />
			<ProfileDetail />
			<div className="btn-group">
				<Link to={`/${path.changePassword.root}`}>
					{i18n.lbl_ChangePassword}
				</Link>
			</div>
		</>
	);
};

export default Panel;
