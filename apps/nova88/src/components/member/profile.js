import React, { useContext } from "react";
import { i18nContext } from "Context";
import { Link } from "@reach/router";
import ProfileDetail from "./profile.detail";
import path from "../../path";
import ProfileWallet from "./profile.wallet";

const Panel = () => {
	const { i18n } = useContext(i18nContext);

	return (
		<>
			<div className="avatar"></div>
			{/* <div className="viplv">
				<i className="icon icon-vip"></i>VIP Lv{userInfo.userLevel}
			</div> */}
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
