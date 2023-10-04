import classNames from "classnames";
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { userInfoContext } from "Context";
import Loading from "../common/loading";
import { defTpGameType } from "../hook/useGetTpMaintainList";
import { defSlotTpGameType } from "../../datas/productList";

const GamePanel = React.forwardRef((props, ref) => {
	const {
		selectGame,
		gameList,
		providerList,
		maintainList,
		activeProvider,
		activeCategory,
		i18n,
		imgUrl,
		handleSetFavorite,
		favoriteStr,
		setFavoriteStr
	} = props;
	const { userInfo } = useContext(userInfoContext);
	const { langId } = userInfo;

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
				(m.tpGameType ===
					defSlotTpGameType[activeProvider.tpName]?.tpGameType ||
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

		const brandName = providerList.find(obj => obj.tpId === g.tpId)?.tpName;
		const gameProviderName = providerList.find(obj => obj.tpId === g.tpId)
			?.gameImgDisplayText;

		games.push(
			<div
				className={classNames("slots-products-item", {
					maintain: isMaintain
				})}
				key={`casino-game-${brandName}-${g.gameId}`}>
				{activeCategory === "new" && <i className="icon icon-new" />}
				<button>
					<button
						type="button"
						onClick={onToggleFavorite}
						className={`icon-fav-${
							_isFavorite ? "solid" : "outline"
						}`}
					/>
					<img
						onClick={
							isMaintain
								? () => null
								: () =>
										selectGame({
											...g,
											providerName: gameProviderName
										})
						}
						src={`${imgUrl}/${brandName}/${
							g.imgName[langId] ?? g.imgName.en
						}`}
						alt={g.gameName[langId] ?? g.gameName.en}
					/>
					<div className="name">
						{g.gameName[langId] ?? g.gameName.en}
					</div>
				</button>
				{isMaintain ? (
					<div className="tag-maintain">
						{i18n.lbl_underMaintenance}
					</div>
				) : null}
			</div>
		);
	});
	return games.length === 0 ? (
		<div className="nodata icon icon-nodata" ref={ref}>
			<div className="txt-white">{i18n.msg_NoData}</div>
		</div>
	) : (
		<div className="slots-products" id="scrollId" ref={ref}>
			{games}
		</div>
	);
});

GamePanel.defaultProps = {
	gameList: [],
	providerList: null,
	maintainList: [],
	handleSetFavorite: null,
	activeCategory: null
};

GamePanel.propTypes = {
	selectGame: PropTypes.func.isRequired,
	gameList: PropTypes.arrayOf(PropTypes.object),
	providerList: PropTypes.arrayOf(PropTypes.any),
	maintainList: PropTypes.arrayOf(PropTypes.any),
	activeProvider: PropTypes.objectOf(PropTypes.any).isRequired,
	activeCategory: PropTypes.string,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	imgUrl: PropTypes.string.isRequired,
	handleSetFavorite: PropTypes.func,
	favoriteStr: PropTypes.string.isRequired,
	setFavoriteStr: PropTypes.func.isRequired
};

export default GamePanel;
