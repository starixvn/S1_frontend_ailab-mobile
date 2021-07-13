import React, { useContext } from "react";
import { userInfoContext } from "../common/context";
import Loading from "../common/loading";
import { useGetTpMaintainList } from "../hook/useGetTpMaintainList";
import forgetPwd from "../login/forgetPwd";

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
		const underMaintain = maintainList.includes(g.tpId);
		games.push(
			<div
				className={`info${underMaintain ? " under" : ""}`}
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
					<div className="underBtn">{i18n.lbl_underMaintenance}</div>
				) : null}
				{g.new ? <div className="newTag">NEW</div> : null}
			</div>
		);
	});

	return games.length === 0 ? (
		<div className="not-found">
			<i className="icon icon-warning" />
			<p>{i18n.msg_NoData}</p>
		</div>
	) : (
		<div className="slotList" id="scrollId">
			{games}
		</div>
	);
};

export default Games;
