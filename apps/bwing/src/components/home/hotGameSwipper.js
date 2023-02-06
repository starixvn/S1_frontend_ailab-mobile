import React, { useContext, useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import PropTypes from "prop-types";
import { popBoxContext, navContext, defNavPanel } from "../common/context";
import { GET_CASINO_ENTER_PAGE, GET_ENTER_PAGE } from "../../service/enterPage";
import {
	useGetTpMaintainList,
	defTpGameType
} from "../hook/useGetTpMaintainList";
import { api_HotGame_GetDataList } from "../../service/api/hotGame";

export const defProductType = {
	Sports: 1,
	Slots: 2,
	LiveCasino: 3,
	Fishing: 4,
	CockFighting: 5,
	Lottery: 6,
	VirtualSports: 7,
	Poker: 8
};

const HotGameSwipper = ({ i18n, userInfo }) => {
	const { setPopBox } = useContext(popBoxContext);
	const { setNav } = useContext(navContext);
	const handleLogin = () => {
		setNav(defNavPanel.login);
	};
	const { maintainList } = useGetTpMaintainList();

	const [gameList, setGameList] = useState([]);

	useEffect(() => {
		api_HotGame_GetDataList()
			.then(res => {
				if (res.data.errorCode === 0) {
					setGameList(res.data.data?.HotGame);
				} else {
					setPopBox({
						isOpen: true,
						content: `[${res.data.errorCode}] ${res.data.message}`
					});
				}
			})
			.catch();
	}, []);

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
		} else if (tpCategory === defProductType.slots) {
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

	const rows = gameList.map(g => {
		return (
			<a
				className="hotGamModule"
				key={`hotgamelist-${g.tpId}-${g.gameId}-${g.gameName}`}
				onClick={clickGame.bind(this, {
					tpId: g?.tpId,
					gameId: g?.gameId,
					tpCategory: g?.tpCategory,
					tpGameType: g.tpGameType
				})}>
				<img className="gameimg" src={g.gameLogo} alt="" />
				<div className="title">
					<p>{g.gameName}</p>
					<img src={g.tpLogo} alt="" />
				</div>
			</a>
		);
	});

	return (
		<div className="hotgame">
			<div className="titleBox">
				<div className="title">HOT GAME</div>
				{/* <!-- <a>MORE</a> --> */}
			</div>
			<Marquee speed={60} className="gameBox" gradient={false}>
				{rows}
			</Marquee>
		</div>
	);
};

HotGameSwipper.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired
};

export default HotGameSwipper;
