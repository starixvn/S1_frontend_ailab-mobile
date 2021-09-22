import React, { useContext } from "react";
import Marquee from "react-fast-marquee";
import PropTypes from "prop-types";
import { popBoxContext } from "../common/context";
import HotGameList, { defProductType } from "../../datas/hotGameList";
import { GET_CASINO_ENTER_PAGE, GET_ENTER_PAGE } from "../../service/enterPage";
import useHandleLogin from "../hook/useHandleLogin";
import { useGetTpMaintainList } from "../hook/useGetTpMaintainList";
import { GetCurrencyName } from "../common/common";

const HotGame = ({ i18n, userInfo }) => {
	const { setPopBox } = useContext(popBoxContext);
	const { handleLogin } = useHandleLogin();
	const { maintainList } = useGetTpMaintainList();

	const currencyName = GetCurrencyName({
		langId: userInfo.langId,
		currencyId: userInfo.currencyId,
		i18n
	});

	const clickGame = ({ tpId, gameId, productType, tpGameType }) => {
		if (
			maintainList?.some(
				m => m.tpId === tpId && m.tpGameType === tpGameType
			)
		) {
			setPopBox({
				isOpen: true,
				content: i18n.lbl_underMaintenance,
				hasBtn: true,
				btnBar: (
					<div className="btn-group">
						<button
							className="white"
							onClick={() => {
								setPopBox({ isOpen: false });
							}}>
							OK
						</button>
					</div>
				)
			});
		} else if (userInfo.isLogin === false) {
			handleLogin();
		} else if (productType === defProductType.slots) {
			GET_CASINO_ENTER_PAGE({
				langId: userInfo.langId,
				tpId,
				gameId,
				isFree: false,
				tpGameType
			});
		} else {
			GET_ENTER_PAGE({
				langId: userInfo.langId,
				tpId,
				gameId,
				isLogin: userInfo.isLogin,
				loginCallback: handleLogin,
				tpGameType
			});
		}
	};

	const gameArr = HotGameList({ currencyName }).map(game => {
		return (
			<div key={`hotGame-${game.name}`} className="hotGamModule">
				<img
					src={`https://banner.0814media.net/img/hotgame/${game.imgUrl}.jpg`}
					alt={game.name}
				/>
				<div>{game.name}</div>
				<div>{`${i18n[game.gameTypeKey]} ${game.provider}`}</div>
				<div className="btn-group">
					<button
						onClick={clickGame.bind(this, {
							tpId: game?.tpId,
							gameId: game?.gameId,
							productType: game?.productType,
							tpGameType: game.tpGameType
						})}>
						{i18n.lbl_PlayNow.toUpperCase()}
					</button>
				</div>
			</div>
		);
	});

	return (
		<>
			<div className="moduleTitle icon icon-mediafire">
				{i18n.lbl_HotGame}
			</div>
			<Marquee speed={60} className="hotGame" gradient={false}>
				{gameArr}
			</Marquee>
		</>
	);
};

HotGame.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired
};

export default HotGame;
