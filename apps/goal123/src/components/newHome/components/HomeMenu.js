import classNames from "classnames";
import PropTypes from "prop-types";
import { menuIconTypeEnum, products } from "@ailab-mobile/common";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMenu } from "../../hook/useMenu";
import { isShowEventIcon, defCol } from "../../../datas/defMenu";
import { bannerImgUrl } from "../../../config";
import useClickGame from "../hooks/useClickGame";

const HomeMenu = ({ userInfo }) => {
	const { t } = useTranslation();
	const { menuList } = useMenu();
	const { onclickStaticProduct } = useClickGame();
	const [selectedCategory, setSelectedCategory] = useState(defCol.hotGame);

	const hotGameList = [
		{
			...products.Soccer,
			defSubMenuImage: `${bannerImgUrl}/h5/img/home-page/hotgame/sports-saba.png`,
			defDisplayKey: "lbl_SabaSoccer"
		},
		{
			...products.BtiSport,
			defSubMenuImage: `${bannerImgUrl}/h5/img/home-page/hotgame/sports-bti.png`,
			defDisplayKey: "lbl_BTISport"
		},
		{
			defSubMenuImage: `${bannerImgUrl}/h5/img/home-page/hotgame/slots.png`,
			defDisplayKey: "lbl_Slots",
			defTabRedirect: defCol.slots,
			category: defCol.slots
		},
		{
			...products.Vgaming,
			defSubMenuImage: `${bannerImgUrl}/h5/img/home-page/hotgame/games-vgaming.png`,
			defDisplayKey: "lbl_Vgaming"
		},
		{
			defSubMenuImage: `${bannerImgUrl}/h5/img/home-page/hotgame/casino.png`,
			defDisplayKey: "lbl_Casino",
			defTabRedirect: defCol.livecasino,
			category: defCol.livecasino
		},
		{
			defSubMenuImage: `${bannerImgUrl}/h5/img/home-page/hotgame/lottery.png`,
			defDisplayKey: "lbl_Lottery",
			defTabRedirect: defCol.lottery,
			category: defCol.lottery
		},
		{
			...products.V8Poker,
			defSubMenuImage: `${bannerImgUrl}/h5/img/home-page/hotgame/games-v8power.png`,
			defDisplayKey: "lbl_V8Poker"
		},
		{
			defSubMenuImage: `${bannerImgUrl}/h5/img/home-page/hotgame/fishing.png`,
			defDisplayKey: "lbl_Fishing",
			defTabRedirect: defCol.fishing,
			category: defCol.fishing
		},
		{
			defSubMenuImage: `${bannerImgUrl}/h5/img/home-page/hotgame/esports.png`,
			defTabRedirect: defCol.esports,
			defDisplayKey: "lbl_eSports",
			category: defCol.esports
		},
		{
			defSubMenuImage: `${bannerImgUrl}/h5/img/home-page/hotgame/cockfighting.png`,
			defDisplayKey: "lbl_CockFighting",
			defTabRedirect: defCol.cockFighting,
			category: defCol.cockFighting
		}
	];

	// * 為了未來 mainMenu 需要左右增加靜態的 menu 的需求
	// * api 來的資料都走 default
	const selectedSubMenus = () => {
		const switchSubMenu = {
			[defCol.hotGame]: () => hotGameList,
			default: () =>
				menuList?.find(({ category }) => category === selectedCategory)
					?.data || []
		};

		return (switchSubMenu[selectedCategory] || switchSubMenu.default)();
	};

	const onClickCategory = category => {
		if (category !== selectedCategory) setSelectedCategory(category);
	};

	const mainMenus = menuList.map(mainMenuItem => {
		const { category, defDisplayKey, data, mainMenuImage } =
			mainMenuItem || {};

		// * 查看 subMenu 是否有在顯示範圍的 New Icon
		const isNew = data.some(subMenuItem => {
			const { iconType, iconStartTime, iconEndTime } = subMenuItem || {};

			return (
				isShowEventIcon(iconStartTime, iconEndTime) &&
				iconType === menuIconTypeEnum.New
			);
		});

		const mainMenuImageRender =
			selectedCategory === category
				? mainMenuImage.replace(".svg", "-active.svg")
				: mainMenuImage;

		return (
			<button
				key={category}
				className={classNames({
					active: selectedCategory === category
				})}
				onClick={() => onClickCategory(category)}>
				{/* 目前只用 New Tag */}
				{isNew && <div className={classNames({ "new-icon": isNew })} />}
				<div className="category-icon">
					<img src={mainMenuImageRender} alt={category} />
				</div>
				<span>{t(defDisplayKey)}</span>
			</button>
		);
	});

	const subMenus = selectedSubMenus().map(subMenuItem => {
		const {
			tpGameIdNo,
			productName,
			currencyGameName,
			iconType,
			iconStartTime,
			iconEndTime,
			isInMaintain,
			mobileHeaderPicUrl,
			defSubMenuImage,
			defDisplayKey,
			defTabRedirect
		} = subMenuItem || {};
		// * 後端這裡是字串格式 需做處理
		const suBMenuImage =
			(mobileHeaderPicUrl && JSON.parse(mobileHeaderPicUrl)[0]) ||
			defSubMenuImage;

		const isNew =
			isShowEventIcon(iconStartTime, iconEndTime) &&
			iconType === menuIconTypeEnum.New;

		const displayName =
			currencyGameName &&
			currencyGameName[userInfo?.langId] &&
			currencyGameName[userInfo?.langId];

		return (
			<div
				className={classNames("gamelist-item", {
					under: isInMaintain
				})}
				key={`${tpGameIdNo}${defDisplayKey}`}
				onClick={() => {
					if (defTabRedirect) {
						window.scrollTo({ top: 0, behavior: "smooth" });
						return setSelectedCategory(defTabRedirect);
					}
					// 這裡有靜態的 hotGame， 所以用 onclickStaticProduct
					return onclickStaticProduct(subMenuItem);
				}}>
				{isNew && <div className="new-icon" />}
				<div className="gamelist-img">
					<img src={suBMenuImage} alt={productName} />
				</div>
				<div className="gamelist-title">
					{displayName ||
						subMenuItem?.productName ||
						t(defDisplayKey)}
				</div>
				{isInMaintain && (
					<div className="under-maintenance">
						{t("lbl_underMaintenance")}
					</div>
				)}
			</div>
		);
	});

	return (
		<>
			<div className="home-sidebar">
				<div className="sidebar-tab">
					<button
						className={classNames({
							active: selectedCategory === "hotGame"
						})}
						onClick={() => onClickCategory("hotGame")}>
						<div className="category-icon">
							{selectedCategory === "hotGame" ? (
								<img
									src={`${bannerImgUrl}/h5/img/home-page/icon/btn-hotgame-active.svg`}
									alt="hotGame"
								/>
							) : (
								<img
									src={`${bannerImgUrl}/h5/img/home-page/icon/btn-hotgame.svg`}
									alt="hotGame"
								/>
							)}
						</div>
						<span>{t("lbl_Hot")}</span>
					</button>
					{mainMenus}
				</div>
			</div>
			<div className="home-gamelist">
				<div className="gamelist-box active">{subMenus}</div>
			</div>
		</>
	);
};

HomeMenu.propTypes = {
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired
};

export default HomeMenu;
