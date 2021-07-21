import React, { useContext, useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { api_GetTpIds } from "../../service/api/site";
import { useGotoGame } from "../hook/useGotoGame";

import {
	i18nContext,
	userInfoContext,
	navContext,
	defNavPanel
} from "./context";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import LinksPanel from "../home/links";
import { productList, defTpCategoryId } from "../../datas/defMenu";
import { useGetTpMaintainList } from "../hook/useGetTpMaintainList";

const ProductPage = ({ category, titleKey }) => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setNav } = useContext(navContext);
	const [tpIds, setTpIds] = useState(null);
	const { handleGoToGame } = useGotoGame({ autoGetData: false });
	const { maintainList } = useGetTpMaintainList();
	const _productList = productList(userInfo.langId)[category].items;
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
					setTpIds(res.data.data);
				}
			});
		}
	}, [userInfo.isLogin, i18n]);

	const ClickGame = ({
		tpId,
		gameId,
		betType,
		useGotoGame: _useGotoGame
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
						gameId
				  })
				: null
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
					(m.tpCategoryId === game.tpCategoryId ||
						m.tpCategoryId === defTpCategoryId.All)
			);
			if (game.eventIcon) {
				const eventInPeriodObj = game.eventIcon.find(
					obj => obj.inPeriod === true
				);
				showingIcon = eventInPeriodObj ? eventInPeriodObj.icon : "";
			}
			return (
				<button
					className={`gameInBox${showingIcon}${
						underMaintain ? " under" : ""
					}`}
					key={`Game-Panel-${game.displayKey}`}
					onClick={
						underMaintain
							? () => null
							: ClickGame.bind(this, {
									tpId: game.tpId,
									gameId: game.gameId,
									betType: game.betType,
									useGotoGame: game.useGotoGame
							  })
					}>
					{underMaintain ? (
						<div className="underBtn">
							{i18n.lbl_underMaintenance}
						</div>
					) : null}
					<img src={game.img} alt={game.displayKey} />
					<p>
						<span className={`icon icon-${game.icon}`} />
						{i18n[game.displayKey] ?? game.displayKey}
					</p>
				</button>
			);
		});

	return (
		<>
			<div className="gameArea">
				<p className="gameAear__title lightBTitle">
					{i18n[titleKey].toUpperCase()}
				</p>
				<div className="gameBox">{arr}</div>
			</div>
			<LinksPanel i18n={i18n} langId={userInfo.langId} />
		</>
	);
};

ProductPage.propTypes = {
	category: PropTypes.string.isRequired,
	titleKey: PropTypes.string.isRequired
};

export default ProductPage;
