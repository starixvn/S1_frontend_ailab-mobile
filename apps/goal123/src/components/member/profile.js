import React, { useContext } from "react";
import {
	i18nContext,
	userInfoContext,
	navContext,
	popBoxContext
} from "../common/context";
import ProfileDetail from "./profile.detail";
import ProfileWallet from "./profile.wallet";
import ProfileLinks from "./profile.links";
import { defLevelList } from "../vip/def";
import VerificationPanel from "./verificationPanel";
import useVerifyEmail from "./hook/useVerifyEmail";

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);
	const { setPopBox } = useContext(popBoxContext);

	const levelInfo = userInfo.userLevel
		? defLevelList[Number(userInfo.userLevel) - 1]
		: {};
	const levelName = i18n[levelInfo?.levelName];

	const { tokenPassed } = useVerifyEmail({
		langId: userInfo.langId,
		i18n,
		setPopBox,
		setUserInfo
	});

	return (
		tokenPassed && (
			<>
				<div className="avatar">
					<div className="circle" />
					<img src={levelInfo.imgUrl} alt={levelInfo.levelName} />
					<div>{levelName}</div>
				</div>
				<ProfileWallet />
				<VerificationPanel
					i18n={i18n}
					accountName={userInfo.accountName}
					phoneVerified={userInfo.phoneVerified}
					emailVerified={userInfo.emailVerified}
					phoneReward={userInfo.phoneReward}
					emailReward={userInfo.emailReward}
					currencyId={userInfo.currencyId}
				/>
				<ProfileDetail />
				<ProfileLinks
					i18n={i18n}
					setUserInfo={setUserInfo}
					setNav={setNav}
				/>
			</>
		)
	);
};

export default Panel;
