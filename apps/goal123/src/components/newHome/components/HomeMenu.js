import React, { useState, useContext, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "@reach/router";
import { defNavPanel, navContext, popBoxContext } from "../../common/context";
import gameList, { defCol, openGameType } from "../../../datas/productList";
import { getEventIcon } from "../../home/category";
import { GET_ENTER_PAGE } from "../../../service/enterPage";
import { api_GetTpIds } from "../../../service/api/site";
import { useGotoGame } from "../../hook/useGotoGame";
import {
	useGetTpMaintainList,
	defTpGameType
} from "../../hook/useGetTpMaintainList";
import { getUrlParameter } from "../../common/common";

const HomeMenu = ({ i18n, userInfo }) => {
	const navigate = useNavigate();
	const { setNav } = useContext(navContext);
	const { setPopBox } = useContext(popBoxContext);
	const [showingTpIds, setShowningTpIds] = useState(null);
	const [selectedCol, setSelectedCol] = useState(defCol.hotGame);
	const { handleGoToGame } = useGotoGame({ autoGetData: false });
	const { maintainList } = useGetTpMaintainList();
	const target = getUrlParameter("target");
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

	useEffect(() => {
		if (target) setSelectedCol(target);
	}, [selectedCol]);

	const showSubPanel = ({ panel }) => {
		if (selectedCol !== panel) {
			setSelectedCol(panel);
		}
	};

	const clickGame = ({
		tpId,
		gameId,
		useGotoGame: _useGotoGame,
		tpGameType,
		appType
	}) => {
		GET_ENTER_PAGE({
			langId: userInfo.langId,
			tpId,
			gameId,
			isLogin: userInfo.isLogin === true,
			loginCallback: () => {
				setNav(defNavPanel.login);
			},
			execFunction: _useGotoGame
				? handleGoToGame.bind(this, {
						isLogin: userInfo.isLogin === true,
						langId: userInfo.langId,
						tpId,
						gameId,
						tpGameType
				  })
				: null,
			tpGameType,
			appType
		});
	};

	const clickLink = ({ type, item }) => {
		if (type === openGameType.Link) {
			navigate(`/${item?.path}`);
		}
		if (type === openGameType.entPage) {
			const { tpId, gameId, tpGameType } = item;
			clickGame({ tpId, gameId, tpGameType });
		}
	};

	const SubGame = ({ game, underMaintain }) => {
		const showingEventIcon = getEventIcon({ eventIcon: game?.eventIcon });

		// if (game.path) {
		// 	return (
		// 		<Link
		// 			className={`game${underMaintain ? " active" : ""}`}
		// 			key={game.spanText || game.spanTextKey}
		// 			to={`/${game.path}${game.tpId ? `/${game.tpId}` : ""}`}
		// 			style={underMaintain ? { pointerEvents: "none" } : null}
		// 			state={game.parameter}>
		// 			{showingEventIcon !== "" ? (
		// 				<div className={` ${showingEventIcon}`} />
		// 			) : null}
		// 			<img
		// 				src={game.img}
		// 				alt={game.spanText || game.spanTextKey}
		// 			/>
		// 			<div className="title">
		// 				{game.spanText || i18n[game.spanTextKey]}
		// 			</div>
		// 			{underMaintain ? (
		// 				<div className="maintenance">
		// 					{i18n.lbl_underMaintenance}
		// 				</div>
		// 			) : null}
		// 		</Link>
		// 	);
		// }

		// const imgSrc = selectedCol === game.category
		// ? game.img.replace('.svg', '-active.svg')
		// : game.img;

		return (
			<div
				className="gamelist-item"
				key={game.spanText || game.spanTextKey}
				onClick={
					underMaintain
						? () => null
						: clickGame.bind(this, {
								tpId: game.tpId,
								gameId: game.gameId,
								useGotoGame: game.useGotoGame,
								tpGameType: game.tpGameType
						  })
				}>
				{showingEventIcon !== "" ? (
					<div className={` ${showingEventIcon}`} />
				) : null}
				<div className="gamelist-img">
					<img
						src={game.img}
						alt={game.spanText || game.spanTextKey}
					/>
				</div>
				<div className="gamelist-title">
					{game.spanText || i18n[game.spanTextKey]}
				</div>
				{/* {game?.hasDesktopLink && (
					<div className="switchbtn">
						<button
							onClick={
								underMaintain
									? () => null
									: e => {
											e.stopPropagation();
											clickGame({
												tpId: game.tpId,
												gameId: game.gameId,
												useGotoGame: game.useGotoGame,
												tpGameType: game.tpGameType,
												appType: defAppType.desktop
											});
									  }
							}>
							{i18n.lbl_Sportsbook_Desktop}
						</button>
						<button>{i18n.lbl_Sportsbook_PlayNow}</button>
					</div>
				)} */}
				{underMaintain ? (
					<div className="under-maintenance">
						{i18n.lbl_underMaintenance}
					</div>
				) : null}
			</div>
		);
	};

	const gameArr = gameList.map(item => {
		const _subIcon = item?.items?.filter(
			subItem =>
				subItem.eventIcon &&
				(subItem.tpId
					? showingTpIds === null ||
					  showingTpIds.includes(subItem.tpId)
					: true)
		);

		const showingEventIcon = getEventIcon({
			subIcon: _subIcon,
			eventIcon: item?.eventIcon
		});

		const imgSrc =
			selectedCol === item.category
				? item.img.replace(".svg", "-active.svg") // 如果当前类别被选中，使用带有-active的图片
				: item.img; // 否则使用默认图片

		// * 如果時間不在範圍內不渲染元件
		if (item?.isEventPeriod) {
			return null;
		}

		return (
			<button
				key={`menu-${item.category}`}
				className={`${item?.className ?? ""} ${
					selectedCol === item.category ? "active" : ""
				}${showingEventIcon !== "" ? ` ${showingEventIcon}` : ""}`}
				onClick={
					item.link
						? clickLink.bind(this, { type: item?.type, item })
						: showSubPanel.bind(this, { panel: item.category })
				}>
				<div className="category-icon">
					<img src={imgSrc} alt={item.category} />
				</div>
				<span>{i18n[item.translateKey]}</span>
			</button>
		);
	});

	const subGameArr = useMemo(() => {
		// 獲取當前選擇類別下的所有遊戲
		const games =
			gameList.find(item => item.category === selectedCol)?.items || [];

		// 過濾出應該顯示的遊戲項目
		return games
			.filter(subItem => {
				return showingTpIds
					? showingTpIds.includes(subItem.tpId) ||
							subItem.spanTextKey === "lbl_Slots"
					: true;
			})
			.map(subItem => {
				const underMaintain = maintainList?.some(
					m =>
						m.tpId === subItem.tpId &&
						(m.tpGameType === subItem.tpGameType ||
							m.tpGameType === defTpGameType.All)
				);

				// 渲染每個遊戲項目
				return (
					<SubGame
						key={`${subItem.tpId}-${subItem.gameId}`}
						game={subItem}
						underMaintain={underMaintain}
						clickGame={clickGame}
						i18n={i18n}
					/>
				);
			});
	}, [selectedCol, maintainList, showingTpIds]);

	const subPanelArr = (
		<div className="home-gamelist">
			<div className="gamelist-box active">{subGameArr}</div>
		</div>
	);

	return (
		<>
			<div className="home-sidebar">
				<div className="sidebar-tab">{gameArr}</div>
			</div>
			{subPanelArr}
		</>
	);
};

export default HomeMenu;
