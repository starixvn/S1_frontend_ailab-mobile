import React, { useContext } from "react";
import PropTypes from "prop-types";
import { userInfoContext } from "Context";
import Loading from "../common/loading";
import {
	useGetTpMaintainList,
	defTpGameType
} from "../hook/useGetTpMaintainList";
import { defSlotTpGameType } from "../../datas/productList";

const GamePanel = React.forwardRef((props, ref) => {
	const {
		selectGame,
		gameList,
		providerList,
		activeProvider,
		activeCategory,
		i18n,
		imgUrl,
		handleSetFavorite,
		renderSlot
	} = props;
	const { userInfo } = useContext(userInfoContext);
	const { maintainList } = useGetTpMaintainList();
	if (gameList === null) return <Loading />;
	const games = [];
	let storageStr = localStorage.getItem("favorite") ?? "";
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
			renderSlot();
			handleSetFavorite(g.gameId, _isFavorite, g.tpId);
			const storageFavList = storageStr
				.split("&")
				.filter(str => !(str === ""));
			let filterList;
			if (_isFavorite) {
				filterList = storageFavList.filter(
					item => item !== `${g.tpId}_${g.gameId}`
				);
				localStorage.setItem("favorite", filterList.join("&"));
			} else {
				localStorage.setItem(
					"favorite",
					`${storageStr ?? ""}${storageStr === false ? "" : "&"}${
						g.tpId
					}_${g.gameId}`
				);
			}
		};

		const brandName = providerList.find(obj => obj.tpId === g.tpId)?.tpName;
		games.push(
			<div
				className={`info${isMaintain ? " star active" : ""}`}
				key={`casino-game-${brandName}-${g.gameId}`}>
				{activeCategory === "new" ? (
					<i className="icon icon-new" />
				) : null}
				<button>
					<img
						data-testid="gameImg"
						onClick={isMaintain ? () => null : () => selectGame(g)}
						src={`${imgUrl}/${brandName}/${
							g.imgName[userInfo.langId] ?? g.imgName.en
						}`}
						alt={g.gameName[userInfo.langId] ?? g.gameName.en}
					/>
				</button>
				<span data-testid="providerName">{brandName}</span>
				{isMaintain && (
					<div className="under">{i18n.lbl_underMaintenance}</div>
				)}
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
	renderSlot: null,
	activeCategory: null
};

GamePanel.propTypes = {
	selectGame: PropTypes.func.isRequired,
	gameList: PropTypes.arrayOf(PropTypes.object),
	providerList: PropTypes.arrayOf(PropTypes.any),
	activeProvider: PropTypes.objectOf(PropTypes.any).isRequired,
	activeCategory: PropTypes.string,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	imgUrl: PropTypes.string.isRequired,
	handleSetFavorite: PropTypes.func,
	renderSlot: PropTypes.func
};

export default GamePanel;
