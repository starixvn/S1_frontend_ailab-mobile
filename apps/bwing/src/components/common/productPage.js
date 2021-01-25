import React, { useContext } from "react";
import PropTypes from "prop-types";

import {
	i18nContext,
	userInfoContext,
	navContext,
	defNavPanel
} from "./context";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import LinksPanel from "../home/links";
import { productList } from "../../datas/defMenu";

const ProductPage = ({ category }) => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setNav } = useContext(navContext);
	const _productList = productList(userInfo.langId)[category].items;

	const ClickGame = (tpId, gameId, betType) => {
		GET_ENTER_PAGE({
			langId: userInfo.langId,
			tpId,
			gameId,
			isLogin: userInfo.isLogin,
			betType,
			loginCallback: () => {
				setNav(defNavPanel.login);
			}
		});
	};

	const arr = _productList.map(game => {
		let showingIcon = "";
		if (game.eventIcon) {
			const eventInPeriodObj = game.eventIcon.find(
				obj => obj.inPeriod === true
			);
			showingIcon = eventInPeriodObj ? eventInPeriodObj.icon : "";
		}
		return (
			<button
				className={`gameInBox${showingIcon}`}
				key={`liveCasinoPanel-${game.displayKey}`}
				onClick={ClickGame.bind(
					this,
					game.tpId,
					game.gameId,
					game.betType
				)}>
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
					{i18n.lbl_LiveCasino.toUpperCase()}
				</p>
				<div className="gameBox">{arr}</div>
			</div>
			<LinksPanel i18n={i18n} langId={userInfo.langId} />
		</>
	);
};

ProductPage.propTypes = {
	category: PropTypes.string.isRequired
};

export default ProductPage;
