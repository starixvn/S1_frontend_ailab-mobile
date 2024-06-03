import classNames from "classnames";
import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../../common/context";
import { useMenu } from "../../hook/useMenu";
import useClickGame from "../../newHome/hooks/useClickGame";

const MenuLobby = () => {
	const [selectedSubMenu, setSelectedSubMenu] = useState("");
	const { userInfo } = useContext(userInfoContext);
	const { menuList } = useMenu();
	const { t } = useTranslation();
	const { onclickStaticProduct } = useClickGame();

	const sideMenus = menuList.map(mainMenuItem => {
		const {
			sideMenuIcon,
			defDisplayKey,
			data = [],
			lobbyCategoryId,
			category
		} = mainMenuItem || {};

		return (
			<div
				className={classNames("lobby-list", {
					active: selectedSubMenu === category
				})}
				key={lobbyCategoryId}>
				<div
					className="list"
					onClick={() =>
						setSelectedSubMenu(prev => {
							if (selectedSubMenu === category) return "";
							return category;
						})
					}>
					<img src={sideMenuIcon} alt={category} />
					<span>{t(defDisplayKey)}</span>
				</div>
				{selectedSubMenu === category && (
					<div className="lobby-item">
						{data?.length > 0 &&
							data.map(subMenuItem => {
								const {
									productName,
									currencyGameName,
									tpGameIdNo
								} = subMenuItem || {};

								const displayName =
									currencyGameName &&
									currencyGameName[userInfo?.langId] &&
									currencyGameName[userInfo?.langId];

								return (
									<div
										className="lobby-item"
										key={tpGameIdNo}
										onClick={() =>
											onclickStaticProduct(subMenuItem)
										}>
										<button>
											{displayName || productName}
										</button>
									</div>
								);
							})}
					</div>
				)}
			</div>
		);
	});

	return (
		<div className="menu-lobby">
			<div className="lobby">{sideMenus}</div>
		</div>
	);
};

export default MenuLobby;
