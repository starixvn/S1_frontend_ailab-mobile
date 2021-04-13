import React, { useState, useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import { defNavPanel, navContext } from "../common/context";
import gameList, { defCol } from "../../datas/productList";
import { getEventIcon } from "./category";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import { Autoplay } from "../common/swipperBanner";
import { api_GetTpIds } from "../../service/api/site";

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
	const { setNav } = useContext(navContext);
	const [showingTpIds, setShowningTpIds] = useState(null);
	const [selectedCol, setSelectedCol] = useState(defCol.hotGame);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (userInfo.isLogin) {
			api_GetTpIds().then(res => {
				if (res.data.errorCode === 0 && isMountedRef.current) {
					setShowningTpIds(res.data.data);
				}
			});
		}
	}, [setShowningTpIds, userInfo.isLogin]);

	const showSubPanel = ({ panel }) => {
		if (selectedCol !== panel) {
			setSelectedCol(panel);
		}
	};

	const clickGame = ({ tpId, gameId }) => {
		GET_ENTER_PAGE({
			langId: userInfo.langId,
			tpId,
			gameId,
			isLogin: userInfo.isLogin === true,
			loginCallback: () => {
				setNav(defNavPanel.login);
			}
		});
	};

	const gameArr = gameList.map(item => {
		const showingEventIcon = getEventIcon({
			subIcon: item?.items?.filter(subItem => subItem.eventIcon),
			eventIcon: item?.eventIcon
		});

		return (
			<button
				key={`menu-${item.category}`}
				className={`${selectedCol === item.category ? "active" : ""}${
					showingEventIcon !== "" ? ` icon${showingEventIcon}` : ""
				}`}
				onClick={showSubPanel.bind(this, {
					panel: item.category
				})}>
				<img src={item.img} alt={item.category} />
				<p>{i18n[item.translateKey]}</p>
			</button>
		);
	});

	const subGameArr = gameList
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
			return (
				<SubGame
					key={`${subItem?.spanText ?? i18n[subItem?.spanTextKey]}`}
					game={subItem}
					clickGame={clickGame}
					i18n={i18n}
				/>
			);
		});

	const subPanelArr = [];
	for (let i = 0; i < subGameArr.length; i += 9) {
		const subPanel = subGameArr.slice(i, i + 9);
		subPanelArr.push(
			<div className="gamelistNew" key={`panel-${i}`}>
				{subPanel}
			</div>
		);
	}

	return (
		<>
			<div className="sideBarNew">{gameArr}</div>
			<Autoplay Rows={subPanelArr} params={swipperParam} />
		</>
	);
};

Menu.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired
};

const SubGame = ({ game, clickGame, i18n }) => {
	const showingEventIcon = getEventIcon({ eventIcon: game?.eventIcon });

	if (game.path) {
		return (
			<Link
				className="game"
				key={game.spanText || game.spanTextKey}
				to={`/${game.path}`}
				state={game.parameter}>
				{showingEventIcon !== "" ? (
					<i className={`icon ${showingEventIcon}`} />
				) : null}
				<img src={game.img} alt={game.spanText || game.spanTextKey} />
				<div className="title">
					{game.spanText || i18n[game.spanTextKey]}
				</div>
			</Link>
		);
	}
	return (
		<div
			className="game"
			key={game.spanText || game.spanTextKey}
			onClick={clickGame.bind(this, {
				tpId: game.tpId,
				gameId: game.gameId
			})}>
			{showingEventIcon !== "" ? (
				<i className={`icon ${showingEventIcon}`} />
			) : null}
			<img src={game.img} alt={game.spanText || game.spanTextKey} />
			<div className="title">
				{game.spanText || i18n[game.spanTextKey]}
			</div>
		</div>
	);
};

SubGame.propTypes = {
	game: PropTypes.objectOf(PropTypes.any).isRequired,
	clickGame: PropTypes.func.isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

export default Menu;
