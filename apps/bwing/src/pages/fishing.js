import React, { useContext } from "react";
import { i18nContext, userInfoContext } from "../components/common/context";
import { GET_ENTER_PAGE } from "../service/enterPage";
import LinksPanel from "../components/home/links";
import { productList } from "../datas/defMenu";

export default () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const _productList = productList(userInfo.langId).fishing.items;

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
				key={`fishingPanel-${game.displayKey}`}
				onClick={ClickGame.bind(
					this,
					game.tpId,
					game.gameId,
					game.betType
				)}>
				<img src={game.img} alt={i18n[game.displayKey]} />
				<p>
					<span className="icon icon-SG" />
					{i18n[game.displayKey]}
				</p>
			</button>
		);
	});

	return (
		<>
			<div className="gameArea">
				<p className="gameAear__title lightBTitle">
					{i18n.lbl_PromoCategory_3.toUpperCase()}
				</p>
				<div className="gameBox">{arr}</div>
			</div>{" "}
			<LinksPanel i18n={i18n} langId={userInfo.langId} />
		</>
	);
};
