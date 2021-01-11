import React, { useContext } from "react";
import PropTypes from "prop-types";
import { userInfoContext } from "../common/context";
import Loading from "../common/loading";

const Games = props => {
	const { userInfo } = useContext(userInfoContext);
	const {
		SelectGame,
		Games: _Games,
		Favorite,
		SetFavorite,
		TpList,
		i18n,
		imgUrl
	} = props;

	if (_Games === null) {
		return <Loading />;
	}
	const games = [];
	_Games.forEach(g => {
		const t = TpList[g.tpId];
		const _isFavorite = Favorite.includes(`${t.value}_${g.gameId}`);
		games.push(
			<div className="info" key={`casino-game-${t.value}-${g.gameId}`}>
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
					}`}
				/>
				<span className="new-icon" />
			</div>
		);
	});

	return games.length === 0 ? (
		<div className="not-found">{i18n.msg_NoData}</div>
	) : (
		<div className="slotList" id="scrollId">
			{games}
		</div>
	);
};

Games.propTypes = {
	SelectGame: PropTypes.func.isRequired,
	Games: PropTypes.arrayOf(PropTypes.object).isRequired,
	Favorite: PropTypes.arrayOf(PropTypes.object).isRequired,
	SetFavorite: PropTypes.func.isRequired,
	TpList: PropTypes.arrayOf(PropTypes.number).isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	imgUrl: PropTypes.string.isRequired
};
export default Games;
