import React, { useContext } from "react";
import PropTypes from "prop-types";
import { userInfoContext } from "Context";
import Loading from "../common/loading";

const GamePanel = props => {
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

	if (Games === null) return <Loading />;

	const games = [];
	Games.forEach(g => {
		const t = TpList[g.tpId];
		const _isFavorite = Favorite.includes(`${t.value}_${g.gameId}`);
		games.push(
			<div className="info" key={`casino-game-${t.value}-${g.gameId}`}>
				{g.new ? <i className="icon icon-new" /> : null}
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
			</div>
		);
	});

	return games.length === 0 ? (
		<div className="nodata icon icon-nodata">
			<div className="txt-white">{i18n.msg_NoData}</div>
		</div>
	) : (
		<div className="slotList" id="scrollId">
			{games}
		</div>
	);
};

GamePanel.defaultProps = {
	Games: [],
	Favorite: []
};

GamePanel.propTypes = {
	SelectGame: PropTypes.func.isRequired,
	Games: PropTypes.arrayOf(PropTypes.object),
	Favorite: PropTypes.arrayOf(PropTypes.any),
	SetFavorite: PropTypes.func.isRequired,
	TpList: PropTypes.objectOf(PropTypes.any).isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	imgUrl: PropTypes.string.isRequired
};

export default GamePanel;
