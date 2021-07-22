import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "@reach/router";
import { Link } from "../../route/link";
import gameList, { defCol, defTpCategoryId } from "../../datas/productList";
import { getEventIcon } from "./category";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import useHandleLogin from "../hook/useHandleLogin";
import { useGetTpMaintainList } from "../hook/useGetTpMaintainList";
import api from "../../service/api";
import { GetCurrencyName } from "../common/common";
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

	const currencyName = GetCurrencyName({
		langId: userInfo.langId,
		currencyId: userInfo.currencyId,
		i18n
	});

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

	const showSubPanel = ({ panel, popBox, tpCategoryId }) => {
		if (popBox) {
			if (popBox.needLogin && !userInfo.isLogin) {
				handleLogin();
			} else if (
				maintainList &&
				maintainList?.some(
					m =>
						m.tpId === popBox.tpId &&
						(m.tpCategoryId === tpCategoryId ||
							m.tpCategoryId === defTpCategoryId.All)
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

	const gameArr = gameList({ langId: userInfo?.langId, currencyName }).map(
		item => {
			const _subIcon = item?.items?.filter(
				subItem =>
					subItem.eventIcon &&
					(subItem.tpId
						? showingTpIds === null ||
						  showingTpIds.includes(subItem.tpId)
						: true) &&
					(subItem.hideBeforeLogin ? userInfo.isLogin === true : true)
			);
			const showingEventIcon = getEventIcon({
				subIcon: _subIcon,
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
						popBox: item?.popBox,
						tpCategoryId: item.tpCategoryId
					})}>
					<i className={`icon icon-${item.categoryIcon}`} />
					<div>{i18n[item.translateKey]}</div>
					{showingEventIcon !== "" ? (
						<i className={`icon${showingEventIcon}`} />
					) : null}
				</button>
			);
		}
	);

	const subGameArr = gameList({
		langId: userInfo?.langId,
		currencyName
	})?.map(item => {
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
						(m.tpCategoryId === item.tpCategoryId ||
							m.tpCategoryId === defTpCategoryId.All)
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
		specialUrl
	}) => {
		if (tpId === defSpecialSetting.sports_9w) {
			const result = await handleGoToGame({
				isLogin: userInfo.isLogin,
				langId: userInfo.langId,
				tpId,
				gameId
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
							gameId
					  })
					: null,
				specialUrl
			});
		}
	};

	if (game?.href) {
		return (
			<a
				className={isMaintain ? "active" : ""}
				href={game.href}
				target="_blank"
				rel="noreferrer"
				style={isMaintain ? { pointerEvents: "none" } : null}>
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
			</a>
		);
	}

	return game?.path ? (
		<Link
			className={isMaintain ? "active" : ""}
			to={
				category === "slot"
					? `${path.casino.root}/${game.tpId}`
					: game.path
			}
			state={game.parameter}
			style={isMaintain ? { pointerEvents: "none" } : null}>
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
		</Link>
	) : (
		<button
			className={isMaintain ? "active" : ""}
			disabled={isMaintain}
			onClick={clickGame.bind(this, {
				tpId: game.tpId,
				gameId: game.gameId,
				useGotoGame: game.useGotoGame,
				specialUrl: game?.specialUrl ?? ""
			})}>
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
