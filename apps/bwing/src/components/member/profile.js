import React, { useContext } from "react";
import { i18nContext, userInfoContext } from "../common/context";
import { Link } from "@reach/router";
import ProfileDetail from "./profile.detail";
import path from "../../path";

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);

	return (
		<>
			<div className="avatar"></div>
			{/* <div className="viplv">
				<i className="icon icon-vip"></i>VIP Lv{userInfo.userLevel}
			</div> */}
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
