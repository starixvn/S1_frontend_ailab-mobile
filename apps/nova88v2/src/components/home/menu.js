import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "@reach/router";
import { Link } from "../../route/link";
import gameList, { defCol } from "../../datas/productList";
import { getEventIcon } from "./category";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import useHandleLogin from "../hook/useHandleLogin";
import api from "../../service/api";

const Menu = ({ i18n, userInfo, setPopBox }) => {
	const [selectedCol, setSelectedCol] = useState(defCol.sports);
	const [showingTpIds, setShowningTpIds] = useState(null);
	const { handleLogin } = useHandleLogin();
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
			api.site.GetTpIds().then(res => {
				if (res.data.errorCode === 0 && isMountedRef.current) {
					setShowningTpIds(res.data.data);
				}
			});
		}
	}, [setShowningTpIds, userInfo.isLogin]);

	const showSubPanel = ({ panel, tpId, gameId, popBox }) => {
		if (tpId && gameId) {
			GET_ENTER_PAGE({
				langId: userInfo.langId,
				tpId,
				gameId,
				isLogin: userInfo.isLogin === true,
				loginCallback: handleLogin
			});
		} else if (popBox) {
			popBox.needLogin && !userInfo.isLogin
				? handleLogin()
				: setPopBox({
						isOpen: true,
						title: i18n[popBox.title],
						popBoxType: popBox.type,
						navigate
				  });
		} else if (selectedCol !== panel) {
			setSelectedCol(panel);
		}
	};

	const gameArr = gameList({ langId: userInfo.langId }).map(item => {
		const showingEventIcon = getEventIcon({
			subIcon: item?.items?.filter(subItem => subItem.eventIcon),
			eventIcon: item?.eventIcon
		});

		if (item.href) {
			return (
				<a
					key={`menu-${item.category}`}
					href={item.href}
					target="_blank"
					rel="noreferrer">
					<i className={`icon icon-${item.categoryIcon}`} />
					<div>{i18n[item.translateKey]}</div>
					{showingEventIcon !== "" ? (
						<i className={`icon${showingEventIcon}`} />
					) : null}
				</a>
			);
		}
		if (item.path) {
			return (
				<Link key={`menu-${item.category}`} to={item.path}>
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
				className={selectedCol === item.category ? "active" : ""}
				onClick={showSubPanel.bind(this, {
					panel: item.category,
					tpId: item?.tpId,
					gameId: item?.gameId,
					popBox: item?.popBox
				})}>
				<i className={`icon icon-${item.categoryIcon}`} />
				<div>{i18n[item.translateKey]}</div>
				{showingEventIcon !== "" ? (
					<i className={`icon${showingEventIcon}`} />
				) : null}
			</button>
		);
	});

	const subGameArr = gameList({ langId: userInfo?.langId })?.map(item => {
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
				return showItem;
			})
			.map(subItem => {
				return (
					<SubGame
						key={`subMenu-${
							subItem.spanTextKey || subItem.spanText
						}`}
						game={subItem}
						i18n={i18n}
						userInfo={userInfo}
						handleLogin={handleLogin}
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

const SubGame = ({ game, i18n, userInfo, handleLogin }) => {
	const showingEventIcon = getEventIcon({ eventIcon: game?.eventIcon });

	const clickGame = ({ tpId, gameId }) => {
		GET_ENTER_PAGE({
			langId: userInfo.langId,
			tpId,
			gameId,
			isLogin: userInfo.isLogin === true,
			loginCallback: handleLogin
		});
	};

	return game?.path ? (
		<Link to={game.path} state={game.parameter}>
			{showingEventIcon !== "" ? (
				<i className={`icon ${showingEventIcon}`} />
			) : null}
			<img src={game.img} alt={i18n[game.spanTextKey]} />
			<div>{game.spanText || i18n[game.spanTextKey]}</div>
		</Link>
	) : (
		<button
			onClick={clickGame.bind(this, {
				tpId: game.tpId,
				gameId: game.gameId
			})}>
			{showingEventIcon !== "" ? (
				<i className={`icon ${showingEventIcon}`} />
			) : null}
			<img src={game.img} alt={i18n[game.spanTextKey]} />
			<div>{game.spanText || i18n[game.spanTextKey]}</div>
		</button>
	);
};

SubGame.propTypes = {
	game: PropTypes.objectOf(PropTypes.any).isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	handleLogin: PropTypes.func.isRequired
};

export default Menu;
