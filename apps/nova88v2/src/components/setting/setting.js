import React, { useContext } from "react";
import { userInfoContext } from "Context";
import Logo from "./logo";
import ListPanel from "./listPanel";
import ProfilePanel from "./profilePanel";
import ShortcutPanel from "./shortcutPanel";

const Setting = () => {
	const { userInfo } = useContext(userInfoContext);
	const { isLogin } = userInfo;

	return (
		<>
			{isLogin ? <ProfilePanel /> : <Logo />}
			<ShortcutPanel />
			<ListPanel />
		</>
	);
};

export default Setting;
