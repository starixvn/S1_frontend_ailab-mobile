import React, { useContext } from "react";
import { userInfoContext } from "../../common/context";
import MenuAppDownload from "./components/MenuAppDownload";
import MenuInfo from "./components/MenuInfo";
import MenuPlatform from "./components/MenuPlatform";
import MenuSwitchLang from "./components/MenuSwitchLang";
import LogoSection from "./components/LogoSection";
import MenuTop from "./components/MenuTop";
import VipInfo from "./components/VipInfo";
import MemberTransaction from "./components/MemberTransaction";
import MemberWallet from "./components/MemberWallet";
import MemberPersonal from "./components/MemberPersonal";
import MenuLobby from "./components/MenuLobby";
import LogoutButton from "./components/LogoutButton";

const Menu = ({ toggleMenu }) => {
	const { userInfo } = useContext(userInfoContext);

	return (
		<main className="menu">
			<MenuTop toggleMenu={toggleMenu} />
			<LogoSection />
			{userInfo.isLogin && (
				<div className="menu-member">
					<div className="member">
						<MemberPersonal />
						<MemberWallet />
						<MemberTransaction />
						<VipInfo />
					</div>
				</div>
			)}
			<MenuPlatform />
			<MenuLobby />
			<MenuInfo />
			<MenuAppDownload />
			<MenuSwitchLang />
			{userInfo.isLogin && <LogoutButton />}
		</main>
	);
};

export default Menu;
