import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "@reach/router";
import { LOGOUT } from "apps/goal123/src/service/auth";
import { navContext, userInfoContext } from "../../common/context";

const LogoutButton = () => {
	const [redirectPath, setRedirectPath] = useState(null);
	const { setNav } = useContext(navContext);
	const { setUserInfo } = useContext(userInfoContext);
	const { t } = useTranslation();

	const handleLogout = () => {
		LOGOUT(() => {
			setUserInfo(prevState => ({
				isLogin: false,
				langId: prevState.langId
			}));
			setNav(null);
			setRedirectPath("/");
		});
	};

	if (redirectPath !== null) {
		return <Redirect to={redirectPath} noThrow />;
	}

	return (
		<div className="menu-logout">
			<button className="logout" onClick={handleLogout}>
				{t("lbl_Logout")}
			</button>
		</div>
	);
};

export default LogoutButton;
