import React, { useContext } from "react";
import { i18nContext, userInfoContext, navContext } from "../common/context";
import ProfileDetail from "./profile.detail";
import ProfileWallet from "./profile.wallet";
import ProfileLinks from "./profile.links";
import { defLevelList } from "../vip/def";

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);

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
			<ProfileLinks
				i18n={i18n}
				setUserInfo={setUserInfo}
				setNav={setNav}
			/>
		</>
	);
};

export default Panel;
