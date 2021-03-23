import React, { useContext } from "react";
import { Link } from "@reach/router";
import { i18nContext, userInfoContext } from "../common/context";
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
	const levelName = i18n[levelInfo?.levelName];

	return (
		<>
			<div className="avatar">
				<img src={levelInfo.imgUrl} alt={levelInfo.levelName} />
				<div>{levelName}</div>
			</div>
			<ProfileWallet />
			<ProfileDetail />
			<div className="btn-group">
				<button className="blue">
					<Link to={`/${path.changePassword.root}`}>
						{i18n.lbl_ChangePassword}
					</Link>
				</button>
			</div>
		</>
	);
};

export default Panel;
