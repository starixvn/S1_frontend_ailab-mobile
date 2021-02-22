import React, { useContext } from "react";
import { i18nContext, userInfoContext } from "Context";
import { Link } from "@reach/router";
import ProfileDetail from "./profile.detail";
import path from "../../path";
import ProfileWallet from "./profile.wallet";
import { defLevelList } from "../vip/def";

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const levelInfo = userInfo.userLevel
		? defLevelList[Number(userInfo.userLevel) - 1]
		: {};

	return (
		<>
			<div className="avatar">
				<img src={levelInfo.imgUrl} alt={levelInfo.levelName} />
				<div>{i18n[levelInfo.levelName]}</div>
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
