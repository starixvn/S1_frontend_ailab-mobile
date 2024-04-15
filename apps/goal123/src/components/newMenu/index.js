import React, { useContext } from "react";
import { userInfoContext } from "../common/context";
import LogoutButton from "./components/LogoutButton";
import MemberPersonal from "./components/MemberPersonal";
import MemberTransaction from "./components/MemberTransaction";
import MemberVipInfo from "./components/MemberVipInfo";
import MemberWallet from "./components/MemberWallet";
import MenuAppDownload from "./components/MenuAppDownload";
import MenuLobby from "./components/MenuLobby";
import MenuLogoSection from "./components/MenuLogoSection";
import MenuPlatform from "./components/MenuPlatform";
import MenuPolicyInfo from "./components/MenuPolicyInfo";
import MenuRoofSection from "./components/MenuRoofSection";
import MenuSwitchLang from "./components/MenuSwitchLang";

// toggleMenu 從 HomeFooter控制
// HomeFooter 已挪至Layout使用

const NewMenu = ({ toggleMenu }) => {
	const { userInfo } = useContext(userInfoContext);
	return (
		<main className="menu">
			<MenuRoofSection toggleMenu={toggleMenu} />
			<MenuLogoSection />
			{userInfo.isLogin && (
				<div className="menu-member">
					<div className="member">
						<MemberPersonal />
						<MemberWallet />
						<MemberTransaction />
						<MemberVipInfo />
					</div>
				</div>
			)}
			<MenuPlatform />
			<MenuLobby />
			<MenuPolicyInfo />
			<MenuAppDownload />
			<MenuSwitchLang />
			{userInfo.isLogin && <LogoutButton />}
		</main>
	);
};

export default NewMenu;
