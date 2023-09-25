import React, { useContext, useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { api_GetTpIds } from "../../service/api/site";
import { useGotoGame } from "../hook/useGotoGame";
import { sportStreamDef } from "../../datas/productList";
import { getUrlParameter } from "./common";
import {
	i18nContext,
	userInfoContext,
	navContext,
	defNavPanel
} from "./context";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import { productList } from "../../datas/defMenu";
import {
	useGetTpMaintainList,
	defTpGameType
} from "../hook/useGetTpMaintainList";

const ProductPage = ({ category, titleKey, bannerUrl }) => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setNav } = useContext(navContext);
	const [tpIds, setTpIds] = useState(null);
	const { handleGoToGame } = useGotoGame({ autoGetData: false });
	const { maintainList } = useGetTpMaintainList();
	const _productList = productList(userInfo.langId)[category].items;
	const isMountedRef = useRef(null);
	const sport_game = getUrlParameter("game");
	const sport_tpId = sportStreamDef[sport_game]?.tpId;
	const sport_gameId = sportStreamDef[sport_game]?.gameId;
	// const matchid = getUrlParameter("matchid");
	const sport_tpGameType = sportStreamDef[sport_game]?.tpGameType;

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
							setTpIds(res.data.data);
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
			if (sport_game) {
				GET_ENTER_PAGE({
					langId: userInfo.langId,
					tpId: sport_tpId,
					gameId: sport_gameId,
					isLogin: userInfo.isLogin,
					betType: null,
					loginCallback: () => {
						setNav(defNavPanel.login);
					},
					execFunction: null,
					tpGameType: sport_tpGameType
				});
			}
		}
	}, [userInfo.isLogin, i18n]);
	const ClickGame = ({
		tpId,
		gameId,
		betType,
		useGotoGame: _useGotoGame,
		tpGameType
	}) => {
		GET_ENTER_PAGE({
			langId: userInfo.langId,
			tpId,
			gameId,
			isLogin: userInfo.isLogin,
			betType,
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
			tpGameType
		});
	};

	const arr = _productList
		.filter(item => {
			return tpIds ? tpIds.includes(item.tpId) : true;
		})
		.map(game => {
			let showingIcon = "";
			const underMaintain = maintainList?.some(
				m =>
					m.tpId === game.tpId &&
					(m.tpGameType === game.tpGameType ||
						m.tpGameType === defTpGameType.All)
			);
			if (game.eventIcon) {
				const eventInPeriodObj = game.eventIcon.find(
					obj => obj.inPeriod === true
				);
				showingIcon = eventInPeriodObj ? eventInPeriodObj.icon : "";
			}
			return (
				<button
					className={`lobby-products-item ${showingIcon}${
						underMaintain ? " lobby-products-item maintain" : ""
					}`}
					key={`Game-Panel-${game.displayKey}`}
					onClick={
						underMaintain
							? () => null
							: ClickGame.bind(this, {
									tpId: game.tpId,
									gameId: game.gameId,
									betType: game.betType,
									useGotoGame: game.useGotoGame,
									tpGameType: game.tpGameType
							  })
					}>
					{underMaintain ? (
						<div className="tag-maintain">
							{i18n.lbl_underMaintenance}
						</div>
					) : null}
					<img src={game.img} alt={game.displayKey} />
					<div className="name">
						{i18n[game.displayKey] ||
							game.displayKey ||
							game.displayText}
					</div>
				</button>
			);
		});

	const Banner = () => {
		return (
			<div className="lobby-banner">
				<img src={bannerUrl} alt="" />
			</div>
		);
	};

	const Lobby = () => {
		return (
			<div className="wrapper">
				<div className="col-12">
					<div className="lobby-top">
						<Banner />
					</div>
					<div className="lobby-products">{arr}</div>
				</div>
			</div>
		);
	};

	return <Lobby />;
};

ProductPage.propTypes = {
	category: PropTypes.string.isRequired,
	titleKey: PropTypes.string.isRequired,
	bannerUrl: PropTypes.string.isRequired
};

export default ProductPage;
