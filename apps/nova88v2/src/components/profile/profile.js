import React, { useContext } from "react";
import { i18nContext, userInfoContext, popBoxContext } from "Context";
import { Link } from "@Router";
import ProfileDetail from "./profile.detail";
import path from "../../path";
import VIPLevel from "../common/vipLevel";
import VerificationPanel from "./verificationPanel";
import useVerifyEmail from "./hook/useVerifyEmail";

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { tokenPassed } = useVerifyEmail({
		langId: userInfo.langId,
		i18n,
		setPopBox,
		setUserInfo
	});

	return (
		tokenPassed && (
			<>
				<VIPLevel userInfo={userInfo} i18n={i18n} />
				<VerificationPanel
					i18n={i18n}
					accountName={userInfo.accountName}
					phoneVerified={userInfo.phoneVerified}
					emailVerified={userInfo.emailVerified}
					currencyId={userInfo.currencyId}
					phoneReward={userInfo.phoneReward}
					emailReward={userInfo.emailReward}
				/>
				<ProfileDetail />
				<div className="btn-group">
					<Link to={`${path.changePassword.root}`}>
						{i18n.lbl_ChangePassword}
					</Link>
				</div>
			</>
		)
	);
};

export default Panel;
