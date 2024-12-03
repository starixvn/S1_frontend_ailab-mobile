import React, { useContext } from "react";
import {
	navContext,
	i18nContext,
	popBoxContext,
	userInfoContext
} from "../common/context";
import ProfileDetail from "./profile.detail";
import { LOGOUT } from "../../service/auth";
import ProfileWallet from "./profile.wallet";
import { defLevelList } from "../vip/def";
import VerificationPanel from "./verificationPanel";
import useVerifyEmail from "./hook/useVerifyEmail";

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const { setNav } = useContext(navContext);
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
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

	const handleLogout = () => {
		LOGOUT(() => {
			setUserInfo(prevState => ({
				isLogin: false,
				langId: prevState.langId
			}));
			setNav(() => null);
			localStorage.removeItem("fpsNeededToCheck");
		});
	};

	return (
		tokenPassed && (
			<>
				<div className="porfileVip">
					<img src={levelInfo.imgUrl} alt={levelInfo.levelName} />
					<button>{levelName}</button>
				</div>
				<VerificationPanel
					i18n={i18n}
					accountName={userInfo.accountName}
					phoneVerified={userInfo.phoneVerified}
					emailVerified={userInfo.emailVerified}
					phoneReward={userInfo.phoneReward}
					emailReward={userInfo.emailReward}
					currencyId={userInfo.currencyId}
				/>
				<ProfileWallet />
				<ProfileDetail />

				<div className="btn-group">
					<button
						type="button"
						className="btn-primary"
						onClick={handleLogout}>
						{i18n.lbl_Logout}
					</button>
				</div>
			</>
		)
	);
};

export default Panel;
