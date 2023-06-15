import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "@reach/router";
import { Link } from "../../route/link";
import gameList, { defCol, defIconType } from "../../datas/productList";
import { getEventIcon } from "./category";
import { GET_ENTER_PAGE, defAppType } from "../../service/enterPage";
import useHandleLogin from "../hook/useHandleLogin";
import {
	useGetTpMaintainList,
	defTpGameType
} from "../hook/useGetTpMaintainList";
import api from "../../service/api";
import {
	useGotoGame,
	defSpecialSetting,
	open9wSports
} from "../hook/useGotoGame";
import path from "../../path";

const Menu = ({ i18n, userInfo, setPopBox }) => {
	const [selectedCol, setSelectedCol] = useState(defCol.sports);
	const [showingTpIds, setShowningTpIds] = useState(null);
	const { maintainList } = useGetTpMaintainList();
	const { handleLogin } = useHandleLogin();
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
			api.site.GetTpIds().then(
				res => {
					if (res.data.errorCode === 0 && isMountedRef.current) {
						setShowningTpIds(res.data.data);
					} else if (res.data.errorCode !== 0) {
						setPopBox({
							isOpen: true,
							content: `[${res.data.errorCode}] ${res.data.message}`
						});
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
				handleLogin();
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
		}
	};

	const gameArr = gameList({
		langId: userInfo?.langId,
		currencyId: userInfo?.currencyId
	})
		?.filter(item => {
			// * 如果時間不在範圍內不渲染元件
			if (item?.isEventPeriod) {
				return false;
			}

			if (item?.allowCurrency) {
				return item?.allowCurrency.includes(userInfo.currencyId);
			}

			return true;
		})
		.map(item => {
			let isInMaintain = false;
			if (item?.tpGameType) {
				isInMaintain = maintainList?.some(
					mt =>
						mt.tpId === item.tpId &&
						(mt.tpGameType === item.tpGameType ||
							mt.tpGameType === defTpGameType.All)
				);
			}

			let className = item.className || "";
			let style = {};

			if (isInMaintain) {
				className += ` maintenance`;
				style = { pointerEvents: "none" };
			}
			const _subIcon = item?.items?.filter(subItem => {
				// filterCurrency
				if (
					subItem?.allowCurrency &&
					!subItem?.allowCurrency.includes(userInfo.currencyId)
				) {
					return false;
				}
				return (
					subItem.eventIcon &&
					(subItem.tpId
						? showingTpIds === null ||
						  showingTpIds.includes(subItem.tpId)
						: true) &&
					(subItem.hideBeforeLogin ? userInfo.isLogin === true : true)
				);
			});

			const showingEventIcon = getEventIcon({
				subIcon: _subIcon,
				eventIcon: item?.eventIcon
			});

			if (item.event) {
				const clickEvent = ({ param }) => {
					const { tpId, gameId, tpGameType } = param;
					GET_ENTER_PAGE({
						langId: userInfo.langId,
						tpId,
						gameId,
						tpGameType,
						loginCallback: handleLogin
					});
				};

				if (item.path) {
					return (
						<Link
							key={`menu-${item.category}`}
							to={item.path}
							className={className}
							style={style}>
							<img src={item.imgUrl} alt={item.category} />
							{showingEventIcon !== "" &&
							showingEventIcon === defIconType.hot ? (
								<i className={`icon${showingEventIcon}`}>HOT</i>
							) : null}
						</Link>
					);
				}
				return (
					<button
						className={className}
						style={style}
						onClick={() => {
							clickEvent({ param: item });
						}}>
						<img src={item.imgUrl} alt={item.category} />
						{showingEventIcon !== "" ? (
							<i className={`icon${showingEventIcon}`} />
						) : null}
					</button>
				);
			}
			if (item.href) {
				return (
					<a
						key={`menu-${item.category}`}
						className={className}
						href={item.href}
						target="_blank"
						rel="noreferrer"
						style={style}>
						{item.categoryIcon && (
							<i className={`icon icon-${item.categoryIcon}`} />
						)}
						{item.imgUrl && (
							<img src={item.imgUrl} alt={item.category} />
						)}
						<div>{i18n[item.translateKey]}</div>
						{showingEventIcon !== "" ? (
							<i className={`icon${showingEventIcon}`} />
						) : null}
					</a>
				);
			}
			if (item.path) {
				return (
					<Link
						key={`menu-${item.category}`}
						to={item.path}
						style={style}
						className={className}>
						<i className={`icon icon-${item.categoryIcon}`} />
						<div>{i18n[item.translateKey]}</div>
						{item.category === "ranking" ? (
							<i className="icon-live" />
						) : null}
						{showingEventIcon !== "" ? (
							<i className={`icon${showingEventIcon}`} />
						) : null}
					</Link>
				);
			}
			return (
				<button
					key={`menu-${item.category}`}
					className={`${
						selectedCol === item.category ? "active" : ""
					} ${className}`}
					onClick={showSubPanel.bind(this, {
						panel: item.category,
						popBox: item?.popBox,
						tpGameType: item?.tpGameType
					})}
					style={style}>
					<i className={`icon icon-${item.categoryIcon}`} />
					<div>{i18n[item.translateKey]}</div>
					{showingEventIcon !== "" ? (
						<i className={`icon${showingEventIcon}`} />
					) : null}
				</button>
			);
		});

	const subGameArr = gameList({
		langId: userInfo?.langId,
		currencyId: userInfo?.currencyId
	})?.map(item => {
		let _subGame = item.items;
		if (Array.isArray(item?.customSort?.[userInfo.currencyId])) {
			const temp = [];
			item.customSort[userInfo.currencyId].forEach(gameName => {
				const game = item.items.find(el => el.sortKey === gameName);
				if (game) temp.push(game);
			});
			_subGame = temp;
		}

		const subGame = _subGame
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
							subItem.spanTextKey || subItem.spanText
						}`}
						game={subItem}
						i18n={i18n}
						userInfo={userInfo}
						handleLogin={handleLogin}
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
			<div className="sideBar">{gameArr}</div>
			<div className="gameList">{subGameArr}</div>
		</>
	);
};

Menu.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	setPopBox: PropTypes.func.isRequired
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

	const clickGame = async ({
		tpId,
		gameId,
		useGotoGame: _useGotoGame,
		specialUrl,
		tpGameType,
		bettype,
		appType
	}) => {
		if (tpId === defSpecialSetting.sports_9w && userInfo.isLogin) {
			const result = await handleGoToGame({
				isLogin: userInfo.isLogin,
				langId: userInfo.langId,
				tpId,
				gameId,
				tpGameType
			});
			const { url, key, userId } = result ?? {};
			open9wSports({ url, key, userId });
		} else {
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
				bettype,
				appType
			});
		}
	};

	const content = (
		<>
			{showingEventIcon !== "" ? (
				<i className={`icon ${showingEventIcon}`} />
			) : null}
			<img src={game.img} alt={i18n[game.spanTextKey]} />
			<div>{game.spanText || i18n[game.spanTextKey]}</div>
			{isMaintain ? (
				<div className="under">{i18n.lbl_underMaintenance}</div>
			) : (
				""
			)}
		</>
	);

	if (game.needLogin && userInfo.isLogin === false) {
		return (
			<button
				className={isMaintain ? "active" : ""}
				disabled={isMaintain}
				onClick={handleLogin}>
				{content}
			</button>
		);
	}

	if (game?.href) {
		return (
			<a
				className={isMaintain ? "active" : ""}
				href={game.href}
				target="_blank"
				rel="noreferrer"
				style={isMaintain ? { pointerEvents: "none" } : null}>
				{content}
			</a>
		);
	}

	let _path = game.path;
	if (category === "slot" && game.spanText !== "Mega888") {
		_path = `${path.casino.root}/${game.tpId}`;
	}

	return game?.path ? (
		<Link
			className={isMaintain ? "active" : ""}
			to={_path}
			state={game.parameter}
			style={isMaintain ? { pointerEvents: "none" } : null}>
			{content}
		</Link>
	) : (
		<button
			className={isMaintain ? "active" : ""}
			disabled={isMaintain}
			onClick={clickGame.bind(this, {
				tpId: game.tpId,
				gameId: game.gameId,
				useGotoGame: game.useGotoGame,
				specialUrl: game?.specialUrl ?? "",
				tpGameType: game.tpGameType,
				bettype: game?.bettype
			})}>
			{content}
			{game?.hasDesktopLink && (
				<div className="switchbtn">
					<button
						disabled={isMaintain}
						onClick={e => {
							e.stopPropagation();
							clickGame({
								tpId: game.tpId,
								gameId: game.gameId,
								useGotoGame: game.useGotoGame,
								specialUrl: game?.specialUrl ?? "",
								tpGameType: game.tpGameType,
								bettype: game?.bettype,
								appType: defAppType.desktop
							});
						}}>
						{i18n.lbl_Sportsbook_Desktop}
					</button>
					<button>{i18n.lbl_Sportsbook_PlayNow}</button>
				</div>
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

export default Menu;
