import React, { useContext } from "react";
import { i18nContext, userInfoContext } from "Context";
import { Link } from "@Router";
import ProfileDetail from "./profile.detail";
import path from "../../path";
import VIPLevel from "../common/vipLevel";

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);

	return (
		<>
			<VIPLevel userInfo={userInfo} i18n={i18n} />
			<ProfileDetail />
			<div className="btn-group">
				<Link to={`${path.changePassword.root}`}>
					{i18n.lbl_ChangePassword}
				</Link>
			</div>
		</>
	);
};

export default Panel;
