import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { bannerImgUrl } from "apps/goal123/src/config";
import { useNavigate } from "@reach/router";
import { userInfoContext } from "../../common/context";

const MenuLogoSection = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const navigate = useNavigate();

	return (
		<>
			{userInfo.isLogin ? (
				<div className="menu-brand active">
					<a className="brand-logo">
						<img
							src={`${bannerImgUrl}/h5/img/logo.png`}
							alt="menu-logo"
						/>
					</a>
				</div>
			) : (
				<div className="menu-brand">
					<a className="brand-logo">
						<img
							src={`${bannerImgUrl}/h5/img/logo.png`}
							alt="menu-logo"
						/>
					</a>
					<div className="brand-title">
						{t("Label_Menu_Welcome_Bonus")}
						<span>{t("Label_Menu_For_New_Player")}</span>
					</div>
					<div className="joinlogin">
						<button
							className="btn-join"
							onClick={() => navigate(`/join`)}>
							{t("Label_Menu_Register_Now")}
						</button>
						<span>
							{t("Label_Menu_Already_A_Member")}
							<a
								className="btn-login"
								onClick={() => navigate(`/login`)}>
								{t("Label_Menu_Login_Here")}
							</a>
						</span>
					</div>
				</div>
			)}
		</>
	);
};

export default MenuLogoSection;
