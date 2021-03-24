import React from "react";
import PropTypes from "prop-types";
import HotGameList from "../../datas/hotGameList";
import { Autoplay } from "../common/swipperBanner";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import useHandleLogin from "../hook/useHandleLogin";

const swipperParam = {
	spaceBetween: 5,
	slidesPerView: 2,
	centeredSlides: true,
	autoplay: {
		delay: 2500,
		disableOnInteraction: false
	},
	rebuildOnUpdate: true,
	loop: true,
	containerClass: "hotGame"
};

const HotGame = ({ i18n, userInfo }) => {
	const { handleLogin } = useHandleLogin();

	const clickGame = ({ tpId, gameId }) => {
		GET_ENTER_PAGE({
			langId: userInfo.langId,
			tpId,
			gameId,
			isLogin: userInfo.isLogin === true,
			loginCallback: handleLogin
		});
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
							gameId: game?.gameId
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
			<Autoplay Rows={gameArr} params={swipperParam} />
		</>
	);
};

HotGame.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired
};

export default HotGame;
