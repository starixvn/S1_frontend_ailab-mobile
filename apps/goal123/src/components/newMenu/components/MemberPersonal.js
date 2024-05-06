import React, { useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@reach/router";
import path from "apps/goal123/src/path";
import { bannerImgUrl } from "apps/goal123/src/config";
import { userInfoContext, msgCountContext } from "../../common/context";

const MemberPersonal = () => {
	const { userInfo } = useContext(userInfoContext);
	const { msgCount } = useContext(msgCountContext);
	const navigate = useNavigate();
	const { t } = useTranslation();

	const [popUp, setPopUp] = useState("");

	const GetPopupMsg = () => {
		try {
			api_account_GetPopupMsg().then(res => {
				if (res.data.data) {
					setPopUp(res.data.data.popupMessage);
				}
			});
		} catch (error) {}
	};

	useEffect(() => {
		if (userInfo?.isLogin) {
			GetPopupMsg();
		}
	}, [userInfo?.isLogin]);

	const handleClosePopup = e => {
		e.stopPropagation();
		setPopUp("");
	};

	const vipLevelEnum = {
		1: "bronze",
		2: "silver",
		3: "gold",
		4: "platinum",
		5: "diamond",
		6: "goal123"
	};

	const userLevel = vipLevelEnum[userInfo.userLevel] || "";

	return (
		<div className="member-personal">
			<div className="member-profile">
				<div className={`user-level ${userLevel}`}>
					<img
						src={`${bannerImgUrl}/h5/img/home-page/icon/sidemenu-user.svg`}
						alt="side-menu-user"
					/>
				</div>
				<div className="user-profile">
					{t("Label_Hey")}
					<span className="user-name">{userInfo.userName}</span>
					<button
						className="profile-edit"
						onClick={() => navigate(`/${path.member.root}`)}>
						{t("Label_Menu_Edit")}
					</button>
				</div>
			</div>
			<div
				className={
					msgCount ? "member-message active" : "member-message"
				}>
				<a
					className="icon-message"
					onClick={() => {
						navigate(`${path.message.root}`);
					}}>
					{popUp && (
						<div className="info">
							<div>{popUp}</div>
							<button
								className="icon-close"
								onClick={handleClosePopup}
							/>
						</div>
					)}
				</a>
			</div>
		</div>
	);
};

export default MemberPersonal;
