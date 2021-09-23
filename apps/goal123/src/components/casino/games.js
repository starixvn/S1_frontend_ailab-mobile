import React, { useContext } from "react";
import PropTypes from "prop-types";
import { userInfoContext } from "../common/context";
import Loading from "../common/loading";
import {
	useGetTpMaintainList,
	defTpGameType
} from "../hook/useGetTpMaintainList";
import { defSlotTpGameType } from "../../datas/productList";

const Games = props => {
	const { userInfo } = useContext(userInfoContext);
	const { maintainList } = useGetTpMaintainList();
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
		const underMaintain = maintainList?.some(
			m =>
				m.tpId === g.tpId &&
				(m.tpGameType === defSlotTpGameType[t.name].tpGameType ||
					m.tpGameType === defTpGameType.All)
		);
		games.push(
			<div
				className={`info${underMaintain ? " active" : ""}`}
				key={`casino-game-${t.value}-${g.gameId}`}>
				<img
					onClick={
						underMaintain
							? () => null
							: SelectGame.bind(this, t.value, g)
					}
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
				{underMaintain ? (
					<div className="maintenance">
						{i18n.lbl_underMaintenance}
					</div>
				) : null}
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

Games.defaultProps = {
	Games: [],
	Favorite: []
};

Games.propTypes = {
	SelectGame: PropTypes.func.isRequired,
	Games: PropTypes.arrayOf(PropTypes.object),
	Favorite: PropTypes.arrayOf(
		PropTypes.oneOfType([PropTypes.object, PropTypes.string])
	),
	SetFavorite: PropTypes.func.isRequired,
	TpList: PropTypes.objectOf(PropTypes.any).isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	imgUrl: PropTypes.string.isRequired
};
export default Games;
