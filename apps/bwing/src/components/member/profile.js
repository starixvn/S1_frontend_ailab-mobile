import React, { useContext } from "react";
import { Link } from "@reach/router";
import { i18nContext, userInfoContext, popBoxContext } from "../common/context";
import ProfileDetail from "./profile.detail";
import path from "../../path";
import ProfileWallet from "./profile.wallet";
import { defLevelList } from "../vip/def";
import VerificationPanel from "./verificationPanel";
import useVerifyEmail from "./hook/useVerifyEmail";

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
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
		)
	);
};

export default Panel;
