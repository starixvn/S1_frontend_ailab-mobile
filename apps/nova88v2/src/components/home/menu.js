import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { menuIconTypeEnum } from "@ailab-mobile/common";
import React, { useState, useEffect, useContext } from "react";
import { userInfoContext } from "../common/context";
import { getUrlParameter } from "../common/common";
import { cloudBannerImgURL } from "../../config";
import { useMenu } from "../hook/useMenu";
import { isShowEventIcon, defCol } from "../../datas/defMenu";

const Menu = () => {
	const {
		userInfo: { langId }
	} = useContext(userInfoContext);
	const { t } = useTranslation();
	const [selectedCategory, setSelectedCategory] = useState(defCol.sports);
	const { menuData, onClickProductItem } = useMenu();

	const selectedGames =
		menuData?.find(({ category }) => category === selectedCategory)?.data ||
		[];

	const onClickCategory = category => {
		if (category !== selectedCategory) setSelectedCategory(category);
	};

	useEffect(() => {
		const prevPage = getUrlParameter("prev");
		if (prevPage === defCol.slots) setSelectedCategory(defCol.slots);
	}, []);

	return (
		<>
			<div className="home-sidebar">
				{menuData.map(mainMenuItem => {
					const { category, categoryIcon, displayKey, data } =
						mainMenuItem || {};
					// * 查看 subMenu 是否有在顯示範圍的 New Icon( 手機貌似只有 New Tag )
					const isNew = data.some(subMenuItem => {
						const { iconType, iconStartTime, iconEndTime } =
							subMenuItem || {};

						return (
							isShowEventIcon(iconStartTime, iconEndTime) &&
							iconType === menuIconTypeEnum.New
						);
					});

					return (
						<button
							className={classNames(`btn-${categoryIcon}`, {
								active: selectedCategory === category
							})}
							key={category}
							onClick={() => onClickCategory(category)}>
							{isNew && <div className="new-icon">New</div>}
							<div className="btn-circle">
								<img
									src={`${cloudBannerImgURL}/h5/img/4.0/${categoryIcon}-icon.png`}
									alt={categoryIcon}
								/>
							</div>
							<div>{t(displayKey)}</div>
						</button>
					);
				})}
			</div>

			<div className="home-gamelist">
				<div className={`${selectedCategory} active`}>
					{selectedGames.map(subMenuItem => {
						const {
							tpGameIdNo,
							productName,
							iconType,
							iconStartTime,
							iconEndTime,
							isInMaintain,
							mobileHeaderPicUrl
						} = subMenuItem || {};

						const displayName =
							subMenuItem?.currencyGameName &&
							subMenuItem?.currencyGameName[langId] &&
							subMenuItem?.currencyGameName[langId];

						// * 後端這裡是字串格式 需做處理
						const suBMenuImage =
							mobileHeaderPicUrl &&
							JSON.parse(mobileHeaderPicUrl)[0];

						const isNew =
							isShowEventIcon(iconStartTime, iconEndTime) &&
							iconType === menuIconTypeEnum.New;

						return (
							<button
								key={tpGameIdNo}
								className={classNames("gamelist-item", {
									under: isInMaintain
								})}
								onClick={() => onClickProductItem(subMenuItem)}>
								<div className="gamelist-img">
									{isNew && (
										<div className="new-icon">New</div>
									)}
									<img src={suBMenuImage} alt={productName} />
									<div className="gamelist-title">
										{displayName ||
											subMenuItem?.productName}
									</div>
								</div>
							</button>
						);
					})}
				</div>
			</div>
		</>
	);
};

export { Menu };
