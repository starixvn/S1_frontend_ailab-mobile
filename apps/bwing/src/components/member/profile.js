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
			<div className="porfileVip">
				<img src={levelInfo.imgUrl} alt={levelInfo.levelName} />
				<button>{levelName}</button>
			</div>
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
