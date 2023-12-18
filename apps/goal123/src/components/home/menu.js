import React, { useState, useContext, useMemo, useEffect } from "react";
import classNames from "classnames";
import { products, menuIconTypeEnum } from "@ailab-mobile/common";
import { useMenu } from "../hook/useMenu";
import { isShowEventIcon, defCol, defMenuType } from "../../datas/defMenu";
import { i18nContext, userInfoContext } from "../common/context";
import { defAppType } from "../../service/enterPage";
import { Autoplay } from "../common/swipperBanner";
import { bannerImgUrl } from "../../config";
import path from "../../path";

const swiperParam = {
	spaceBetween: 5,
	centeredSlides: true,
	rebuildOnUpdate: true,
	pagination: {
		el: ".swiper-pagination",
		clickable: true
	},
	containerClass: "gameBox"
};

const Menu = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const [selectedCategory, setSelectedCategory] = useState(defCol.hotGame);
	const { menuList = [], onClickProductItem } = useMenu();

	// * 非靜態遊戲 須從 useMenu 裡面拿遊戲資料
	const hotGameList = useMemo(() => {
		const allProducts = menuList.flatMap(
			mainMenuItem => mainMenuItem?.data
		);

		const SoccerItem = allProducts?.find(
			({ tpGameIdNo }) => tpGameIdNo === products.Soccer.tpGameIdNo
		);

		const SabaSoccerItem = allProducts?.find(
			({ tpGameIdNo }) => tpGameIdNo === products.SabaSoccer.tpGameIdNo
		);

		const VGamingItem = allProducts?.find(
			({ tpGameIdNo }) => tpGameIdNo === products.Vgaming.tpGameIdNo
		);
		const VirtualSportsItem = allProducts?.find(
			({ tpGameIdNo }) => tpGameIdNo === products.VirtualSports.tpGameIdNo
		);
		const KenoItem = allProducts?.find(
			({ tpGameIdNo }) => tpGameIdNo === products.Keno.tpGameIdNo
		);
		const V8PokerItem = allProducts?.find(
			({ tpGameIdNo }) => tpGameIdNo === products.V8Poker.tpGameIdNo
		);
		const ESportALLItem = allProducts?.find(
			({ tpGameIdNo }) => tpGameIdNo === products.ESportALL.tpGameIdNo
		);

		return [
			SoccerItem,
			SabaSoccerItem,
			{
				defSubMenuImage: `${bannerImgUrl}/h5/img/hotgame/slots.jpg`,
				menuType: defMenuType.Link,
				defDisplayKey: "lbl_Slots",
				path: path.casino.root
			},
			VGamingItem,
			VirtualSportsItem,
			KenoItem,
			V8PokerItem,
			ESportALLItem
		].filter(item => item);
	}, [menuList]);

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

		// * 動態特例 Crypto Sport
		const cryptoSportItem = data?.find(
			({ tpGameIdNo }) => tpGameIdNo === products.CryptoSports.tpGameIdNo
		);

		return (
			<>
				{cryptoSportItem && (
					<button onClick={() => onClickProductItem(cryptoSportItem)}>
						<img
							src={`${bannerImgUrl}/h5/img/hotgameicon/cryptosports.png`}
							alt={category}
						/>
					</button>
				)}
				<button
					key={category}
					className={classNames({
						active: selectedCategory === category,
						// * 目前只用 New Tag
						newicon: isNew
					})}
					onClick={() => onClickCategory(category)}>
					<img src={mainMenuImage} alt={category} />
					<p>{i18n[defDisplayKey]}</p>
				</button>
			</>
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
			hasDesktopLink,
			defSubMenuImage,
			defDisplayKey
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
				className={classNames("game", { active: isInMaintain })}
				key={`${tpGameIdNo}${productName}`}
				onClick={() => onClickProductItem(subMenuItem)}>
				{isNew && <div className="newicon" />}
				<img src={suBMenuImage} alt={productName} />
				<div className="title">
					{displayName ||
						subMenuItem?.productName ||
						i18n[defDisplayKey]}
				</div>
				{hasDesktopLink && (
					<div className="switchbtn">
						<button
							onClick={e => {
								e.stopPropagation();
								onClickProductItem({
									...subMenuItem,
									appType: defAppType.desktop
								});
							}}>
							{i18n.lbl_Sportsbook_Desktop}
						</button>
						<button>{i18n.lbl_Sportsbook_PlayNow}</button>
					</div>
				)}
				{isInMaintain && (
					<div className="maintenance">
						{i18n.lbl_underMaintenance}
					</div>
				)}
			</div>
		);
	});

	const subPanelArr = [];

	for (let i = 0; i < subMenus?.length; i += 9) {
		const subPanel = subMenus.slice(i, i + 9);
		subPanelArr.push(
			<div className="gamelistNew" key={i}>
				{subPanel}
			</div>
		);
	}

	return (
		<>
			<div className="sideBarNew">
				<div>
					<button
						className={classNames({
							active: selectedCategory === "hotGame"
						})}
						onClick={() => onClickCategory(defCol.hotGame)}>
						<img
							src={`${bannerImgUrl}/h5/img/hotgameicon/hot.png`}
							alt="hotGame"
						/>
						<p>{i18n.lbl_Hot}</p>
					</button>
					{mainMenus}
				</div>
			</div>
			<Autoplay Rows={subPanelArr} params={swiperParam} />
		</>
	);
};

export default Menu;
