import classNames from "classnames";
import React, { useState, useContext, useEffect, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
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

const HomeMenu = ({ userInfo }) => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { setNav } = useContext(navContext);
	const { setPopBox } = useContext(popBoxContext);
	const [showingTpIds, setShowningTpIds] = useState(null);
	const [selectedCol, setSelectedCol] = useState(defCol.hotGame);
	const { handleGoToGame } = useGotoGame({ autoGetData: false });
	const { maintainList } = useGetTpMaintainList();

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
						content: t("msg_ApiServerError")
					});
				}
			);
		}
	}, [setShowningTpIds, userInfo.isLogin, t, setPopBox]);

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

		const onMenuClick = () => {
			// 如果有 path 就到那個特定品牌slot頁面 適用於slot類別
			if (game.path && !underMaintain) {
				navigate(`/${game.path}${game.tpId ? `/${game.tpId}` : ""}`);
				return; // 終止函數執行
			}

			if (!underMaintain) {
				if (game.category) {
					setSelectedCol(game.category);
					window.scrollTo({ top: 0, behavior: "smooth" });
				} else {
					clickGame({
						tpId: game.tpId,
						gameId: game.gameId,
						useGotoGame: game.useGotoGame,
						tpGameType: game.tpGameType
					});
				}
			}
		};

		return (
			<div
				className={classNames("gamelist-item", {
					under: underMaintain
				})}
				key={game.spanText || game.spanTextKey}
				onClick={() => onMenuClick(game)}>
				{showingEventIcon !== "" ? (
					<div className={`${showingEventIcon}`} />
				) : null}
				<div className="gamelist-img">
					<img
						src={game.img}
						alt={game.spanText || game.spanTextKey}
					/>
				</div>
				<div className="gamelist-title">
					{t(game.spanText) || t(game.spanTextKey)}
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
                            {t('lbl_Sportsbook_Desktop')}
                        </button>
                        <button>{t('lbl_Sportsbook_PlayNow')}</button>
                    </div>
                )} */}
				{underMaintain ? (
					<div className="under-maintenance">
						{t("lbl_underMaintenance")}
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
				? item.img.replace(".svg", "-active.svg") // 如果是當前選中的類別使用active圖片
				: item.img;

		return (
			<button
				key={`menu-${item.category}`}
				className={`${selectedCol === item.category ? "active" : ""}`}
				onClick={
					item.link
						? clickLink.bind(this, { type: item?.type, item })
						: showSubPanel.bind(this, { panel: item.category })
				}>
				{showingEventIcon !== "" ? (
					<div className={`${showingEventIcon}`} />
				) : null}
				<div className="category-icon">
					<img src={imgSrc} alt={item.category} />
				</div>
				<span>{t(item.translateKey)}</span>
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
						key={`${subItem.spanTextKey || subItem.spanText}`}
						game={subItem}
						underMaintain={underMaintain}
						clickGame={clickGame}
					/>
				);
			});
	}, [selectedCol, maintainList, showingTpIds, t]);

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
