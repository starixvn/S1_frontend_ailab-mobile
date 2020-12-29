import React, { useContext } from "react";
import { userInfoContext } from "Context";
import Loading from "../common/loading";

const Games = props => {
	const {
		SelectGame,
		Games,
		Favorite,
		SetFavorite,
		TpList,
		i18n,
		imgUrl
	} = props;
	const { userInfo } = useContext(userInfoContext);

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
					{g.new ? <i className="icon icon-new"></i> : null}
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
				</div>
			);
		});

		return games.length === 0 ? (
			<div className="nodata icon icon-nodata">
				<div className="txt-white">{i18n["msg_NoData"]}</div>
			</div>
		) : (
			<div className="slotList" id="scrollId">
				{games}
			</div>
		);
	}
};

export default Games;
