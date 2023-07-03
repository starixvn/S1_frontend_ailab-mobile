import React, { useContext } from "react";
import { themeContext, i18nContext } from "Context";
import themeList from "../../datas/theme";

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const { theme, setTheme } = useContext(themeContext);
	const handleTheme = _theme => {
		if (theme !== _theme) {
			document.querySelector("html").setAttribute("class", _theme);
			setTheme(_theme);
		}
	};
	return (
		<>
			<div>{i18n.lbl_Themes}</div>
			<div className="mode">
				<button
					className={`icon icon-sun${
						theme === themeList.default ? " active" : ""
					}`}
					onClick={handleTheme.bind(null, themeList.default)}
				/>
				<button
					className={`icon icon-moon${
						theme === themeList.dark ? " active" : ""
					}`}
					onClick={handleTheme.bind(null, themeList.dark)}
				/>
			</div>
		</>
	);
};

export default Panel;
