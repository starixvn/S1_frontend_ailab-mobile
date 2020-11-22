import React from "react";
import { configContext } from "./context";

export default ({
	config,
	path,
	uiSetting,
	children,
	i18n,
	userInfo,
	setPopBox
}) => (
	<configContext.Provider
		value={{ config, path, uiSetting, i18n, userInfo, setPopBox }}>
		{children}
	</configContext.Provider>
);
