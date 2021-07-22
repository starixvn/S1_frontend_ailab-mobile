import React, { useContext } from "react";
import PropTypes from "prop-types";
import { userInfoContext } from "Context";
import Loading from "../common/loading";
import { defTpCategoryId } from "../../datas/productList";
import { useGetTpMaintainList } from "../hook/useGetTpMaintainList";

const GamePanel = React.forwardRef((props, ref) => {
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
	const { maintainList } = useGetTpMaintainList();

	if (Games === null) return <Loading />;

	const games = [];
	Games.forEach(g => {
		const t = TpList[g.tpId];
		const _isFavorite = Favorite.includes(`${t.value}_${g.gameId}`);
		const isMaintain = maintainList?.some(
			m =>
				m.tpId === g.tpId &&
				(m.tpCategoryId === defTpCategoryId.Slots ||
					m.tpCategoryId === defTpCategoryId.All)
		);
		games.push(
			<div
				className={`info${isMaintain ? " star active" : ""}`}
				key={`casino-game-${t.value}-${g.gameId}`}>
				{g.new ? <i className="icon icon-new" /> : null}
				<img
					onClick={
						isMaintain
							? () => null
							: SelectGame.bind(this, t.value, g)
					}
					src={`${imgUrl}/${TpList[g.tpId]?.name}/${
						g.imgName[userInfo.langId] ?? g.imgName.en
					}`}
					alt={g.name[userInfo.langId] ?? g.name.en}
				/>
				<span>{t.name}</span>
				{isMaintain && (
					<div className="under">{i18n.lbl_underMaintenance}</div>
				)}
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
		<div className="nodata icon icon-nodata" ref={ref}>
			<div className="txt-white">{i18n.msg_NoData}</div>
		</div>
	) : (
		<div className="slotList" id="scrollId" ref={ref}>
			{games}
		</div>
	);
});

GamePanel.defaultProps = {
	Games: [],
	Favorite: []
};

GamePanel.propTypes = {
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

export default GamePanel;
