import React, { useState, useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "@reach/router";
import { defNavPanel, navContext, popBoxContext } from "../common/context";
import gameList, { defCol, openGameType } from "../../datas/productList";
import { getEventIcon } from "./category";
import { GET_ENTER_PAGE, defAppType } from "../../service/enterPage";
import { Autoplay } from "../common/swipperBanner";
import { api_GetTpIds } from "../../service/api/site";
import { useGotoGame } from "../hook/useGotoGame";
import {
	useGetTpMaintainList,
	defTpGameType
} from "../hook/useGetTpMaintainList";
import { getUrlParameter } from "../common/common";

const swipperParam = {
	spaceBetween: 5,
	centeredSlides: true,
	rebuildOnUpdate: true,
	pagination: {
		el: ".swiper-pagination",
		clickable: true
	},
	containerClass: "gameBox"
};

const Menu = ({ i18n, userInfo }) => {
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
	}, []);

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
				<img src={item.img} alt={item.category} />
				<p>{i18n[item.translateKey]}</p>
			</button>
		);
	});

	const subGameArr = gameList
		.filter(el => !el.event)
		.find(item => {
			return item.category === selectedCol;
		})
		.items?.filter(subItem => {
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
			return (
				<SubGame
					key={`${subItem?.spanText ?? i18n[subItem?.spanTextKey]}`}
					game={subItem}
					clickGame={clickGame}
					i18n={i18n}
					underMaintain={underMaintain}
				/>
			);
		});

	const subPanelArr = [];

	for (let i = 0; i < subGameArr?.length; i += 9) {
		const subPanel = subGameArr.slice(i, i + 9);
		subPanelArr.push(
			<div className="gamelistNew" key={`panel-${i}`}>
				{subPanel}
			</div>
		);
	}

	return (
		<>
			<div className="sideBarNew">
				<div>{gameArr}</div>
			</div>
			<Autoplay Rows={subPanelArr} params={swipperParam} />
		</>
	);
};

Menu.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired
};

const SubGame = ({ game, clickGame, i18n, underMaintain }) => {
	const showingEventIcon = getEventIcon({ eventIcon: game?.eventIcon });

	if (game.path) {
		return (
			<Link
				className={`game${underMaintain ? " active" : ""}`}
				key={game.spanText || game.spanTextKey}
				to={`/${game.path}${game.tpId ? `/${game.tpId}` : ""}`}
				style={underMaintain ? { pointerEvents: "none" } : null}
				state={game.parameter}>
				{showingEventIcon !== "" ? (
					<div className={` ${showingEventIcon}`} />
				) : null}
				<img src={game.img} alt={game.spanText || game.spanTextKey} />
				<div className="title">
					{game.spanText || i18n[game.spanTextKey]}
				</div>
				{underMaintain ? (
					<div className="maintenance">
						{i18n.lbl_underMaintenance}
					</div>
				) : null}
			</Link>
		);
	}
	return (
		<div
			className={`game${underMaintain ? " active" : ""}`}
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
			<img src={game.img} alt={game.spanText || game.spanTextKey} />
			<div className="title">
				{game.spanText || i18n[game.spanTextKey]}
			</div>
			{game?.hasDesktopLink && (
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
			)}
			{underMaintain ? (
				<div className="maintenance">{i18n.lbl_underMaintenance}</div>
			) : null}
		</div>
	);
};

SubGame.defaultProps = {
	underMaintain: false
};

SubGame.propTypes = {
	game: PropTypes.objectOf(PropTypes.any).isRequired,
	clickGame: PropTypes.func.isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	underMaintain: PropTypes.bool
};

export default Menu;
