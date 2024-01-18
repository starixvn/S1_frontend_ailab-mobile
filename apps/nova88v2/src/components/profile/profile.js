import React, { useContext } from "react";
import { i18nContext, userInfoContext, popBoxContext } from "Context";
import { Link } from "@Router";
import ProfileAddr from "./profile.addr";
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
	const isNotFilledAddrField =
		!userInfo?.addressLineFirst ||
		!userInfo?.addressCity ||
		!userInfo?.addressPostCode ||
		!userInfo?.addressState ||
		!userInfo?.addressCountry;

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

				{isNotFilledAddrField && <ProfileAddr />}

				<ProfileDetail />

				{!isNotFilledAddrField ? (
					<div className="addressModule">
						<div className="title">
							{i18n.lbl_Shipping_Address}:（{i18n.lbl_Option2}）
							<span>{i18n.lbl_Shipping_Hint}</span>
						</div>
						<div className="subtitle">{i18n.lbl_Address}</div>
						<div className="addressContent">
							<div>{userInfo.addressLineFirst}</div>
							{userInfo.addressLineSecond !== "" && (
								<div>{userInfo.addressLineSecond}</div>
							)}
							<div>
								{userInfo.addressCity},{" "}
								{userInfo.addressPostCode}
							</div>
							<div>
								{userInfo.addressState},{" "}
								{userInfo.addressCountry}
							</div>
						</div>
					</div>
				) : null}
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
