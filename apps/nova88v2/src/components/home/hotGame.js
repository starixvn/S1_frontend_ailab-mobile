import React from "react";
import Marquee from "react-fast-marquee";
import PropTypes from "prop-types";
import HotGameList, { defProductType } from "../../datas/hotGameList";
import { GET_CASINO_ENTER_PAGE, GET_ENTER_PAGE } from "../../service/enterPage";
import useHandleLogin from "../hook/useHandleLogin";

const HotGame = ({ i18n, userInfo }) => {
	const { handleLogin } = useHandleLogin();

	const clickGame = ({ tpId, gameId, productType }) => {
		if (userInfo.isLogin === false) {
			handleLogin();
		} else if (productType === defProductType.slots) {
			GET_CASINO_ENTER_PAGE({
				langId: userInfo.langId,
				tpId,
				gameId,
				isFree: false
			});
		} else {
			GET_ENTER_PAGE({
				langId: userInfo.langId,
				tpId,
				gameId,
				isLogin: userInfo.isLogin,
				loginCallback: handleLogin
			});
		}
	};

	const gameArr = HotGameList.map(game => {
		return (
			<div key={`hotGame-${game.name}`} className="hotGamModule">
				<img src={game.img} alt={game.name} />
				<div>{game.name}</div>
				<div>{`${i18n[game.gameTypeKey]} ${game.provider}`}</div>
				<div className="btn-group">
					<button
						onClick={clickGame.bind(this, {
							tpId: game?.tpId,
							gameId: game?.gameId,
							productType: game?.productType
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
