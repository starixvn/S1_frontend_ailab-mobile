import React, { useContext } from "react";
import { userInfoContext } from "../common/context";
import Loading from "../common/loading";

const Games = props => {
	const { userInfo } = useContext(userInfoContext);
	const {
		SelectGame,
		Games,
		Favorite,
		SetFavorite,
		TpList,
		i18n,
		imgUrl
	} = props;

	if (Games === null) {
		return <Loading />;
	} else {
		let games = [];
		Games.forEach(g => {
			let t = TpList[g.tpId];
			let _isFavorite = Favorite.includes(`${t.value}_${g.gameId}`);
			games.push(
				<div
					className="info"
					key={`casino-game-${t.value}-${g.gameId}`}>
					<img
						onClick={SelectGame.bind(this, t.value, g)}
						src={`${imgUrl}/${TpList[g.tpId]?.name}/${
							g.imgName[userInfo.langId] ?? g.imgName.en
						}`}
						alt={g.name[userInfo.langId] ?? g.name.en}
					/>
					<span>{t.name}</span>
					<span
						onClick={SetFavorite.bind(this, t.value, g.gameId)}
						className={`icon icon-star-${
							_isFavorite ? "full" : "empty"
						}`}></span>
					<span className="new-icon"></span>
				</div>
			);
		});

		return games.length === 0 ? (
			<div className="not-found">{i18n["msg_NoData"]}</div>
		) : (
			<div className="slotList" id="scrollId">
				{games}
			</div>
		);
	}
};

export default Games;
