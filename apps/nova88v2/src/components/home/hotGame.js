import React, { useContext, useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import PropTypes from "prop-types";
import { popBoxContext } from "../common/context";
import { defProductType } from "../../datas/hotGameList";
import { GET_CASINO_ENTER_PAGE, GET_ENTER_PAGE } from "../../service/enterPage";
import useHandleLogin from "../hook/useHandleLogin";
import {
	useGetTpMaintainList,
	defTpGameType
} from "../hook/useGetTpMaintainList";
import api from "../../service/api";

const HotGame = ({ i18n, userInfo }) => {
	const { setPopBox } = useContext(popBoxContext);
	const { handleLogin } = useHandleLogin();
	const { maintainList } = useGetTpMaintainList();
	const [gameList, setGameList] = useState([]);

	useEffect(() => {
		api.hotGame
			.GetDataList({
				currencyId: userInfo.currencyId,
				langId: userInfo.langId
			})
			.then(res => {
				if (res.data.errorCode === 0) {
					setGameList(res.data.data?.HotGame ?? []);
				} else {
					setPopBox({
						isOpen: true,
						content: `[${res.data.errorCode}] ${res.data.message}`
					});
				}
			});
	}, [userInfo.currencyId]);

	const clickGame = ({ tpId, gameId, tpCategory, tpGameType }) => {
		if (
			maintainList?.some(
				m =>
					m.tpId === tpId &&
					(m.tpGameType === tpGameType ||
						m.tpGameType === defTpGameType.All)
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
		} else if (tpCategory === defProductType.Slots) {
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

	const gameArr = gameList?.map(game => {
		return (
			<div key={`hotGame-${game.gameName}`} className="hotGamModule">
				<img src={game.gameLogo} alt={game.gameName} />
				<div className="hotgametitle">
					<img alt={game.tpName} src={game.tpLogo} />
					<div>
						<div className="hotgame-name">{game.gameName}</div>
						<div>
							{`${i18n[`lbl_tpCategory_${game.tpCategory}`]} ${
								game.tpName
							}`}
						</div>
					</div>
				</div>
				g
				<div className="btn-group">
					<button
						onClick={clickGame.bind(this, {
							tpId: game?.tpId,
							gameId: game?.gameId,
							tpCategory: game?.tpCategory,
							tpGameType: game.tpGameType,
							specialUrl: game?.specialUrl ?? ""
						})}>
						{i18n.lbl_PlayNow}
					</button>
				</div>
			</div>
		);
	});

	return (
		gameArr && (
			<>
				<div className="moduleTitle">{i18n.lbl_HotGame}</div>
				<Marquee speed={60} className="hotGame" gradient={false}>
					{gameArr}
				</Marquee>
			</>
		)
	);
};

HotGame.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired
};

export default HotGame;
