import React, { useContext } from "react";
import PropTypes from "prop-types";
import { userInfoContext } from "Context";
import Loading from "../common/loading";
import {
	useGetTpMaintainList,
	defTpGameType
} from "../hook/useGetTpMaintainList";

const GamePanel = React.forwardRef((props, ref) => {
	const {
		selectGame,
		gameList,
		providerList,
		activeProvider,
		i18n,
		imgUrl,
		handleSetFavorite,
		favoriteStr,
		setFavoriteStr,
		newGamesArr
	} = props;
	const { userInfo } = useContext(userInfoContext);
	const { maintainList } = useGetTpMaintainList();
	if (gameList === null) return <Loading />;
	const games = [];
	let storageStr = favoriteStr ?? "";
	if (storageStr && storageStr.charAt(0) === "&") {
		storageStr = storageStr.substring(1, storageStr.length);
	}
	const storageList = storageStr?.split("&") ?? [];
	gameList?.forEach(g => {
		const handleIsFavorite = () => {
			return storageList?.includes(`${g.tpId}_${g.gameId}`);
		};
		const _isFavorite = handleIsFavorite();
		const isMaintain = maintainList?.some(
			m =>
				m.tpId === g.tpId &&
				(m.tpGameType === activeProvider?.tpGameType ||
					m.tpGameType === defTpGameType.All)
		);

		const onToggleFavorite = () => {
			handleSetFavorite(g.gameId, _isFavorite, g.tpId);
			let filterList;
			if (_isFavorite) {
				filterList = storageList.filter(
					item => item !== `${g.tpId}_${g.gameId}`
				);
				localStorage.setItem("favorite", filterList.join("&"));
				setFavoriteStr(filterList.join("&"));
			} else {
				localStorage.setItem(
					"favorite",
					`${storageStr ?? ""}${storageStr === false ? "" : "&"}${
						g.tpId
					}_${g.gameId}`
				);
				setFavoriteStr(
					`${storageStr ?? ""}${storageStr === false ? "" : "&"}${
						g.tpId
					}_${g.gameId}`
				);
			}
		};

		const gameProviderName = providerList.find(obj => obj.tpId === g.tpId)
			?.gameImgDisplayText;
		const gameImage = `${imgUrl}/${gameProviderName}/${
			g.imgName[userInfo.langId] ?? g.imgName.en
		}`;

		games.push(
			<div
				className={`info${isMaintain ? " active" : ""}`}
				key={`casino-game-${gameProviderName}-${g.gameId}`}>
				{newGamesArr.includes(g.gameId) ? (
					<i className="icon icon-new" />
				) : null}
				<button>
					<img
						data-testid="gameImg"
						onClick={
							isMaintain
								? () => null
								: () =>
										selectGame({
											...g,
											providerName: gameProviderName
										})
						}
						src={gameImage}
						alt={g.gameName[userInfo.langId] ?? g.gameName.en}
					/>
				</button>
				<span data-testid="providerName">{gameProviderName}</span>
				{isMaintain ? (
					<div className="maintenance">
						{i18n.lbl_underMaintenance}
					</div>
				) : null}
				<span
					onClick={onToggleFavorite}
					data-testid="favBtn"
					className={`icon icon-star-${
						_isFavorite ? "full" : "empty"
					}`}
				/>
			</div>
		);
	});
	games.sort(() => Math.random() - 0.5); // 隨機排列遊戲列表
	return games.length === 0 ? (
		<div data-testid="noData" className="nodata icon icon-nodata" ref={ref}>
			<div className="txt-white">{i18n.msg_NoData}</div>
		</div>
	) : (
		<div className="slotList" id="scrollId" ref={ref}>
			{games}
		</div>
	);
});

GamePanel.defaultProps = {
	gameList: [],
	providerList: null,
	handleSetFavorite: null,
	newGamesArr: []
};

GamePanel.propTypes = {
	selectGame: PropTypes.func.isRequired,
	gameList: PropTypes.arrayOf(PropTypes.object),
	providerList: PropTypes.arrayOf(PropTypes.any),
	activeProvider: PropTypes.objectOf(PropTypes.any).isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	imgUrl: PropTypes.string.isRequired,
	handleSetFavorite: PropTypes.func,
	favoriteStr: PropTypes.string.isRequired,
	setFavoriteStr: PropTypes.func.isRequired,
	newGamesArr: PropTypes.arrayOf(PropTypes.string)
};

export default GamePanel;
