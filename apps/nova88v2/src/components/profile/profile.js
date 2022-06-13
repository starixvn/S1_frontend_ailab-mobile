import React, { useContext } from "react";
import { i18nContext, userInfoContext, popBoxContext } from "Context";
import { Link } from "@Router";
import ProfileDetail from "./profile.detail";
import path from "../../path";
import VIPLevel from "../common/vipLevel";
import VerificationPanel from "./verificationPanel";
import useVerifyEmail from "./hook/useVerifyEmail";
import useHandleLineLogin, { defType } from "../hook/useHandleLineLogin";
import { defCurrenyId } from "../common/common";

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { lineLogin } = useHandleLineLogin();
	const { tokenPassed } = useVerifyEmail({
		langId: userInfo.langId,
		i18n,
		setPopBox,
		setUserInfo
	});

	const clickLineBinding = () => {
		if (!userInfo.isLineBinding) {
			lineLogin({ type: defType.binding });
		}
	};

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
				{userInfo.currencyId === defCurrenyId.THB && (
					<>
						<div className="btn-group">
							<button
								className={`btn-line${
									userInfo.isLineBinding ? " active" : ""
								}`}
								onClick={clickLineBinding}>
								<i className="icon icon-line-bold" />
								{userInfo.isLineBinding
									? i18n.lbl_Connected
									: i18n.lbl_Connect}
							</button>
						</div>
						<div className="txt-line">
							{i18n.lbl_LinkLineAccount}
						</div>
					</>
				)}
			</>
		)
	);
};

export default Panel;
