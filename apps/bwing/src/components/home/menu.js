import React, { useState, useEffect, useRef, useContext } from "react";
import PropTypes, { string } from "prop-types";
import { useNavigate, Link } from "@reach/router";
import { navContext, defNavPanel } from "../common/context";
import { productList, defIconType, openGameType } from "../../datas/defMenu";
import { GET_ENTER_PAGE, defAppType } from "../../service/enterPage";
import {
	useGetTpMaintainList,
	defTpGameType
} from "../hook/useGetTpMaintainList";
import { api_GetTpIds } from "../../service/api/site";
import { useGotoGame } from "../hook/useGotoGame";
import path from "../../path";

const Menu = ({ i18n, userInfo, setPopBox }) => {
	const [selectedCol, setSelectedCol] = useState(
		Object.keys(productList(userInfo.langId))[1]
	);
	const { setNav } = useContext(navContext);
	const [showingTpIds, setShowningTpIds] = useState(null);
	const { maintainList } = useGetTpMaintainList();
	const { handleGoToGame } = useGotoGame({ autoGetData: false });
	const navigate = useNavigate();
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (userInfo.isLogin) {
			api_GetTpIds().then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							setShowningTpIds(res.data.data);
						} else {
							setPopBox({
								isOpen: true,
								content: `[${res.data.errorCode}] ${res.data.message}`
							});
						}
					}
				},
				() => {
					setPopBox({
						isOpen: true,
						content: i18n.msg_ApiServerError
					});
				}
			);
		}
	}, [setShowningTpIds, userInfo.isLogin]);

	const showSubPanel = ({ panel, popBox, tpGameType }) => {
		if (popBox) {
			if (popBox.needLogin && !userInfo.isLogin) {
				setNav(defNavPanel.login);
			} else if (
				maintainList &&
				maintainList?.some(
					m =>
						m.tpId === popBox.tpId &&
						(m.tpGameType === tpGameType ||
							m.tpGameType === defTpGameType.All)
				)
			) {
				setPopBox({
					isOpen: true,
					title: i18n.lbl_ImportantNote,
					content: i18n.lbl_underMaintenance,
					hasBtn: true,
					btnBar: (
						<div className="btn-group">
							<button
								className="white"
								onClick={() => {
									setPopBox({ isOpen: false });
								}}>
								OK
							</button>
						</div>
					)
				});
			} else {
				setPopBox({
					isOpen: true,
					title: i18n[popBox.title],
					popBoxType: popBox.type,
					tpId: popBox.tpId,
					navigate
				});
			}
		} else if (selectedCol !== panel) {
			setSelectedCol(panel);
		} else if (selectedCol === panel) {
			setSelectedCol("");
		}
	};

	const gameArr = Object.values(productList(userInfo.langId)).map(product => {
		// * 如果時間不在範圍內不渲染元件
		if (product?.isEventPeriod) {
			return null;
		}

		if (
			product.category === productList(userInfo.langId).eSports.category
		) {
			const { tpId, gameId, tpGameType } = productList(
				userInfo.langId
			).eSports;
			return (
				<ProductItem
					key={`header-menu-${product.displayKey}`}
					spanText={i18n[product.displayKey]}
					icon_img={product.icon_img}
					_click={() =>
						clickGame({
							tpId,
							gameId,
							userInfo,
							tpGameType,
							handleLogin: () => setNav(defNavPanel.login),
							handleGoToGame
						})
					}
					eventIcon={product?.eventIcon}
				/>
			);
		}
		if (!product.path && !product.href) {
			const clickLink = ({ type }) => {
				if (type === openGameType.entPage) {
					const { tpId, gameId, tpGameType } = product;
					clickGame({
						userInfo,
						tpId,
						gameId,
						tpGameType,
						handleLogin: () => setNav(defNavPanel.login)
					});
				}
			};

			return (
				<ProductItem
					key={`header-menu-${product.displayKey}`}
					spanText={i18n[product.displayKey]}
					icon_img={product.icon_img}
					selected={selectedCol === product.category}
					_click={
						product.link
							? clickLink.bind(this, { type: product?.type })
							: showSubPanel.bind(this, {
									panel: product.category,
									popBox: product?.popBox,
									tpGameType: product?.tpGameType
							  })
					}
					subIcon={product.items?.filter(
						subItem =>
							subItem.eventIcon &&
							(subItem.tpId
								? showingTpIds === null ||
								  showingTpIds.includes(subItem.tpId)
								: true)
					)}
					eventIcon={product?.eventIcon}
				/>
			);
		}

		return (
			<ProductLinkItem
				selected={selectedCol === product.category}
				key={`header-menu-${product?.category}`}
				spanText={i18n[product?.displayKey]}
				icon_img={product.icon_img}
				productPath={product.path}
				href={product.href}
				_click={showSubPanel.bind(this, {
					panel: product.category,
					popBox: product?.popBox,
					tpGameType: product?.tpGameType
				})}
				subIcon={product.items?.filter(
					subItem =>
						subItem.eventIcon &&
						(subItem.tpId
							? showingTpIds === null ||
							  showingTpIds.includes(subItem.tpId)
							: true)
				)}
				eventIcon={product?.eventIcon}
				className={product?.className ?? ""}
			/>
		);
	});

	const subGameArr = Object.values(productList(userInfo.langId)).map(item => {
		const subGame = item.items
			?.filter(subItem => {
				let showItem = true;
				if (subItem?.allowCurrency && userInfo?.currencyId) {
					showItem = subItem?.allowCurrency.includes(
						userInfo.currencyId
					);
				} else if (showingTpIds) {
					showItem = showingTpIds.includes(subItem.tpId);
				}
				if (subItem.forceShow) {
					showItem = true;
				}
				if (userInfo.isLogin === false && subItem?.hideBeforeLogin) {
					showItem = false;
				}
				return showItem;
			})
			.map(subItem => {
				const isMaintain = maintainList?.some(
					m =>
						m.tpId === subItem.tpId &&
						(m.tpGameType === subItem.tpGameType ||
							m.tpGameType === defTpGameType.All)
				);

				return (
					<SubGame
						key={`subMenu-${
							subItem.displayKey ?? subItem.displayText
						}`}
						game={subItem}
						i18n={i18n}
						userInfo={userInfo}
						handleLogin={() => setNav(defNavPanel.login)}
						handleGoToGame={handleGoToGame}
						isMaintain={isMaintain}
						category={item.category}
					/>
				);
			});

		return (
			<div
				key={`subPanel-${item.category}`}
				className={`${item.category}${
					selectedCol === item.category ? " active" : ""
				}`}>
				{subGame}
			</div>
		);
	});

	return (
		<>
			<div className="headerB">{gameArr}</div>
			<div className="gameList">{subGameArr}</div>
		</>
	);
};

Menu.defaultProps = {
	setPopBox: () => null
};

Menu.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	setPopBox: PropTypes.func
};

const SubGame = ({
	game,
	i18n,
	userInfo,
	handleLogin,
	handleGoToGame,
	isMaintain,
	category
}) => {
	const showingEventIcon = getEventIcon({ eventIcon: game?.eventIcon });

	if (game?.href) {
		return (
			<a
				className={`${showingEventIcon} ${isMaintain ? "active" : ""}`}
				href={game.href}
				target="_blank"
				rel="noreferrer"
				style={isMaintain ? { pointerEvents: "none" } : null}>
				<img src={game.img} alt={i18n[game.spanTextKey]} />
				<div>{i18n[game.displayKey] ?? game.displayText}</div>
				{isMaintain ? (
					<div className="under">{i18n.lbl_underMaintenance}</div>
				) : (
					""
				)}
			</a>
		);
	}
	return game?.path ? (
		<Link
			className={`${showingEventIcon} ${isMaintain ? "active" : ""}`}
			to={
				category === "slot"
					? `/${path.casino.root}/${game.tpId}`
					: game.path
			}
			state={game.parameter}
			style={isMaintain ? { pointerEvents: "none" } : null}>
			<img
				src={game.img}
				alt={i18n[game.displayKey] ?? game.displayText}
			/>
			<div>{i18n[game.displayKey] ?? game.displayText}</div>
			{isMaintain ? (
				<div className="under">{i18n.lbl_underMaintenance}</div>
			) : (
				""
			)}
		</Link>
	) : (
		<button
			className={`${showingEventIcon} ${isMaintain ? "active" : ""}`}
			disabled={isMaintain}
			onClick={clickGame.bind(this, {
				tpId: game.tpId,
				gameId: game.gameId,
				useGotoGame: game.useGotoGame,
				specialUrl: game?.specialUrl ?? "",
				tpGameType: game.tpGameType,
				userInfo,
				handleGoToGame,
				handleLogin
			})}>
			<img
				src={game.img}
				alt={i18n[game.displayKey] ?? game.displayText}
			/>
			<div>{i18n[game.displayKey] ?? game.displayText}</div>
			{game?.hasDesktopLink && (
				<div className="switchbtn">
					<button
						onClick={
							isMaintain
								? () => null
								: e => {
										e.stopPropagation();
										clickGame({
											tpId: game.tpId,
											gameId: game.gameId,
											useGotoGame: game.useGotoGame,
											specialUrl: game?.specialUrl ?? "",
											tpGameType: game.tpGameType,
											userInfo,
											handleGoToGame,
											handleLogin,
											appType: defAppType.desktop
										});
								  }
						}>
						{i18n.lbl_Sportsbook_Desktop}
					</button>
					<button>{i18n.lbl_Sportsbook_PlayNow}</button>
				</div>
			)}
			{isMaintain && (
				<div className="under">{i18n.lbl_underMaintenance}</div>
			)}
		</button>
	);
};

SubGame.defaultProps = {
	isMaintain: false
};

SubGame.propTypes = {
	game: PropTypes.objectOf(PropTypes.any).isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	handleLogin: PropTypes.func.isRequired,
	handleGoToGame: PropTypes.func.isRequired,
	isMaintain: PropTypes.bool,
	category: PropTypes.string.isRequired
};

const ProductItem = ({
	spanText,
	subIcon,
	eventIcon,
	icon_img,
	_click,
	selected
}) => {
	const showingEventIcon = getEventIcon({ subIcon, eventIcon });
	return (
		<div
			className={`nav${showingEventIcon} ${selected ? "active" : ""}`}
			onClick={_click}>
			<img src={icon_img} alt={spanText} />
			{spanText?.toUpperCase()}
		</div>
	);
};

ProductItem.defaultProps = {
	subIcon: [],
	eventIcon: [],
	icon_img: null,
	_click: () => null,
	selected: null
};

ProductItem.propTypes = {
	spanText: PropTypes.string.isRequired,
	subIcon: PropTypes.arrayOf(PropTypes.object),
	eventIcon: PropTypes.arrayOf(PropTypes.object),
	icon_img: PropTypes.string,
	_click: PropTypes.func,
	selected: PropTypes.bool
};

const ProductLinkItem = ({
	spanText,
	productPath,
	href,
	subIcon,
	eventIcon,
	icon_img,
	_click,
	selected,
	className
}) => {
	const showingEventIcon = getEventIcon({ subIcon, eventIcon });

	if (productPath) {
		return (
			<Link to={`/${productPath}`}>
				<div className={`nav${showingEventIcon} ${className} `}>
					<img src={icon_img} alt={spanText} />
					{String(spanText ?? "").toUpperCase()}
				</div>
			</Link>
		);
	}
	if (href) {
		return (
			<a
				href={href}
				className={`nav${showingEventIcon} ${
					selected ? " active" : ""
				}`}>
				<img src={icon_img} alt={spanText} />
				{spanText.toUpperCase()}
			</a>
		);
	}
	return (
		<div
			onClick={_click}
			className={`nav${showingEventIcon} ${selected ? " active" : ""}`}>
			<img src={icon_img} alt={spanText} />
			{spanText.toUpperCase()}
		</div>
	);
};

ProductLinkItem.defaultProps = {
	productPath: "",
	href: "",
	subIcon: [],
	eventIcon: [],
	icon_img: null,
	_click: () => null,
	selected: null,
	className: ""
};

ProductLinkItem.propTypes = {
	spanText: PropTypes.string.isRequired,
	productPath: PropTypes.string,
	href: PropTypes.string,
	subIcon: PropTypes.arrayOf(PropTypes.object),
	eventIcon: PropTypes.arrayOf(PropTypes.object),
	icon_img: PropTypes.string,
	_click: PropTypes.func,
	selected: PropTypes.bool,
	className: string
};

const getEventIcon = ({ subIcon, eventIcon }) => {
	let showingEventIcon = "";
	let eventIconList = eventIcon ?? [];

	if (subIcon?.length > 0) {
		const categoryIdx = subIcon.findIndex(obj =>
			obj?.eventIcon.find(item => item.inPeriod === true)
		);
		eventIconList =
			categoryIdx === -1 ? [] : subIcon[categoryIdx].eventIcon;
	}

	const eventInPeriodObj = eventIconList?.find(
		item => item.inPeriod === true
	);
	showingEventIcon = eventInPeriodObj ? eventInPeriodObj.icon : "";

	if (showingEventIcon === defIconType.new) {
		showingEventIcon = defIconType.new_nav;
	}

	return showingEventIcon;
};

const clickGame = async ({
	userInfo,
	tpId,
	gameId,
	useGotoGame: _useGotoGame,
	specialUrl,
	tpGameType,
	handleLogin,
	handleGoToGame,
	appType
}) => {
	GET_ENTER_PAGE({
		langId: userInfo.langId,
		tpId,
		gameId,
		isLogin: userInfo.isLogin === true,
		loginCallback: handleLogin,
		execFunction: _useGotoGame
			? handleGoToGame.bind(this, {
					isLogin: userInfo.isLogin === true,
					langId: userInfo.langId,
					tpId,
					gameId,
					tpGameType
			  })
			: null,
		specialUrl,
		tpGameType,
		appType
	});
};

export default Menu;
