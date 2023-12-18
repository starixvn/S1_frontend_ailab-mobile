import React, { useContext, useState, useRef, useEffect } from "react";
import { lobbyCategoryEnum } from "@ailab-mobile/common";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import classNames from "classnames";
import Logo from "../common/logo";
import path from "../../path";
import { userInfoContext, i18nContext, popBoxContext } from "../common/context";
import { api_SetLanguage } from "../../service/api/account";
import { number_format, setCookie } from "../common/common";
import ReloadSpin from "../common/reloadSpin";
import ShortcutBar from "./shortcutBar";
import { siteInfo, bannerImgUrl } from "../../config";
import DefLangs from "../../datas/defLangs";
import { tpWalletsListType } from "../transfer/transfer.def";
import useGetBalance from "../hook/useGetMainBalance";
import useGetTpBalance from "../hook/useGetTpBalance";
import useGetBonusBalance from "../hook/useGetBonusBalance";
import useGetSocialChannel, {
	defDisplayPage,
	channelIconName
} from "../hook/useGetSocialChannel";

const SubMenu = ({
	handleSideMenuPanel,
	isOpenSideMenu,
	menuList,
	onClickProductItem
}) => {
	const { i18n } = useContext(i18nContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const [isOpenSubMenu, setIsOpenSubMenu] = useState([]);

	const handleSubMenu = displayKey => {
		if (isOpenSubMenu.includes(displayKey)) {
			setIsOpenSubMenu(prevS => prevS.filter(s => s !== displayKey));
		} else {
			setIsOpenSubMenu(prevS => [...prevS, displayKey]);
		}
	};

	const closeNavPanel = () => {
		handleSideMenuPanel(false);
		setIsOpenSubMenu([]);
	};

	return (
		<div className={classNames("submenuNew", { open: isOpenSideMenu })}>
			<div className="close open" onClick={closeNavPanel}>
				<span />
				<span />
				<span />
				<span />
				<span />
				<span />
			</div>
			<Logo />
			{userInfo.isLogin && (
				<>
					<WalletInfo i18n={i18n} userInfo={userInfo} />
					<ShortcutBar />
				</>
			)}
			<SubMenuList
				i18n={i18n}
				userInfo={userInfo}
				isOpenSubMenu={isOpenSubMenu}
				menuList={menuList}
				onClickProductItem={onClickProductItem}
				handleSubMenu={handleSubMenu}
			/>
			<ContactUs i18n={i18n} langId={userInfo.langId} />
			<LangSwitch
				setPopBox={setPopBox}
				userInfo={userInfo}
				setUserInfo={setUserInfo}
			/>
		</div>
	);
};

SubMenu.propTypes = {
	handleSideMenuPanel: PropTypes.func.isRequired,
	isOpenSideMenu: PropTypes.bool.isRequired,
	menuList: PropTypes.arrayOf(PropTypes.any).isRequired,
	onClickProductItem: PropTypes.func.isRequired
};

const SubMenuList = ({
	i18n,
	userInfo,
	isOpenSubMenu,
	menuList,
	onClickProductItem,
	handleSubMenu
}) => {
	const sideMenus = menuList.map(mainMenuItem => {
		const { sideMenuIcon, defDisplayKey, data = [], lobbyCategoryId } =
			mainMenuItem || {};

		const isOpen = isOpenSubMenu.includes(defDisplayKey);

		if (lobbyCategoryId === lobbyCategoryEnum.SLOTS) {
			return (
				<Link
					key={lobbyCategoryId}
					className="icon icon-casino"
					to={path.casino.root}>
					{i18n.lbl_Slots?.toUpperCase()}
				</Link>
			);
		}

		return (
			<div className={sideMenuIcon} key={lobbyCategoryId}>
				{i18n[defDisplayKey]?.toUpperCase()}
				<i
					onClick={() => handleSubMenu(defDisplayKey)}
					className={classNames("icon icon-keyboard_arrow_right1", {
						open: isOpen
					})}
				/>
				<ul
					className={classNames({
						open: isOpen
					})}>
					{data.length > 0 &&
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
								<li
									key={tpGameIdNo}
									onClick={() =>
										onClickProductItem(subMenuItem)
									}>
									<button>
										{(
											displayName ||
											productName ||
											i18n[defDisplayKey]
										)?.toUpperCase()}
									</button>
								</li>
							);
						})}
				</ul>
			</div>
		);
	});

	return (
		<div className="side-nav">
			{sideMenus}
			<Link className="icon icon-gift" to={path.promotion.root}>
				{i18n.lbl_Promotions}
			</Link>
			<a
				className="icon icon-mobile"
				href={`${window.location.origin}/${path.appDownload.root}`}
				target="_blank"
				rel="noreferrer">
				{i18n.lbl_APPDownload}
			</a>
			<Link className="icon icon-vip" to={path.vip.root}>
				{i18n.lbl_VIP}
			</Link>
		</div>
	);
};

SubMenuList.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userInfo: PropTypes.shape({
		isLogin: PropTypes.bool,
		currencyId: PropTypes.number,
		langId: PropTypes.string
	}).isRequired,
	isOpenSubMenu: PropTypes.arrayOf(PropTypes.string).isRequired,
	menuList: PropTypes.arrayOf(PropTypes.any).isRequired,
	onClickProductItem: PropTypes.func.isRequired,
	handleSubMenu: PropTypes.func.isRequired
};

const WalletInfo = ({ i18n, userInfo }) => {
	const [showingBalance, setShowingBalance] = useState(true);
	const { mainWalletInfo, GetBalance } = useGetBalance({
		isLogin: userInfo.isLogin
	});
	const { tpWalletsList, GetTpWalletList } = useGetTpBalance({
		isLogin: userInfo.isLogin,
		listType: tpWalletsListType.allWallets
	});
	const { bonusWallets, GetBonusBalance } = useGetBonusBalance({
		isLogin: userInfo.isLogin
	});

	const tpWalletBalance = tpWalletsList?.reduce((prev, curr) => {
		return prev + curr.balance;
	}, 0);

	const bonusWalletsBalance = Object.values(bonusWallets).reduce(
		(prev, curr) => {
			return prev + curr.bonus;
		},
		0
	);

	const allWalletBalance =
		mainWalletInfo.balance + tpWalletBalance + bonusWalletsBalance;

	const balance = !allWalletBalance
		? 0
		: number_format(allWalletBalance, false);

	const clickReloadSpin = () => {
		GetBalance();
		GetTpWalletList({ langId: userInfo.langId });
		GetBonusBalance();
	};

	const clickEye = () => {
		setShowingBalance(prev => !prev);
	};

	return (
		<div className="side-info">
			<div>
				{i18n.lbl_Welcome} {userInfo.userName}
			</div>
			<div>
				<span>{i18n.lbl_Balance}</span>
				<button
					className={`icon icon-eye${
						showingBalance ? "" : "-blocked"
					}`}
					onClick={clickEye}
				/>
				{i18n[`Currency_${userInfo.currencyId}`]}{" "}
				{showingBalance ? balance : "*****"}
				<ReloadSpin func={clickReloadSpin} />
			</div>
		</div>
	);
};

WalletInfo.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userInfo: PropTypes.shape({
		isLogin: PropTypes.bool,
		currencyId: PropTypes.number,
		langId: PropTypes.string,
		userName: PropTypes.string
	}).isRequired
};

const ContactUs = ({ i18n, langId }) => {
	const { socialChannel } = useGetSocialChannel({
		langId,
		displayPage: defDisplayPage.Footer
	});

	const snsList = socialChannel?.map(el => (
		<a
			key={el.link}
			href={el.link}
			target="_blank"
			rel="noreferrer noopener">
			<img
				src={`${bannerImgUrl}/h5/img/${
					channelIconName[el.channelName]
				}`}
				alt={el.channelName}
			/>
		</a>
	));

	return (
		socialChannel.length > 0 && (
			<div className="contact">
				<div>{i18n.lbl_ContactUs.toUpperCase()}</div>
				<div>{snsList}</div>
			</div>
		)
	);
};

ContactUs.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	langId: PropTypes.string.isRequired
};

const languageList = () => {
	const _siteInfo = siteInfo();
	return _siteInfo.siteLangList.map(l => DefLangs[l]);
};

const LangSwitch = ({ setPopBox, userInfo, setUserInfo }) => {
	const [userLanguage, setUserLanguage] = useState("vn");
	const isMountedRef = useRef(null);
	const _languageList = languageList();

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (userInfo.langId && isMountedRef.current) {
			setUserLanguage(() => {
				return _languageList.find(l => l.value === userInfo.langId) ===
					undefined
					? "en"
					: userInfo.langId;
			});
		}
	}, [userInfo.langId, _languageList]);

	const selectLanguage = language => {
		if (userLanguage !== language) {
			const langId = language;
			setUserLanguage(language);

			if (userInfo.isLogin) {
				api_SetLanguage(langId).then(
					res => {
						if (isMountedRef.current) {
							if (res.data.errorCode === 0) {
								setUserInfo(prevState => ({
									...prevState,
									langId
								}));
							} else {
								setPopBox({
									isOpen: true,
									content: `[${res.data.errorCode}] ${res.data.message}`
								});
							}
						}
					},
					() => {
						if (isMountedRef.current) {
							setPopBox({
								isOpen: true,
								content: i18n.msg_ApiServerError
							});
						}
					}
				);
			} else {
				setUserInfo(prevState => ({
					...prevState,
					langId
				}));
			}
		}
		setCookie(siteInfo(language).langCookie, language);
	};

	return (
		<div className="language">
			<div
				className={userInfo.langId === "en" ? "open" : ""}
				onClick={selectLanguage.bind(this, "en")}>
				<img src={`${bannerImgUrl}/h5/img/en.jpg`} alt="English" />
				English
			</div>
			<div
				className={userInfo.langId === "vn" ? "open" : ""}
				onClick={selectLanguage.bind(this, "vn")}>
				<img src={`${bannerImgUrl}/h5/img/vn.jpg`} alt="Tiếng Việt" />
				Tiếng Việt
			</div>
		</div>
	);
};

LangSwitch.propTypes = {
	setPopBox: PropTypes.func.isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	setUserInfo: PropTypes.func.isRequired
};

export default SubMenu;
