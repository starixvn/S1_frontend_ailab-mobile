import React, { useContext, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import { navContext, defNavPanel, popBoxContext } from "../common/context";
import { api_GetTpIds } from "../../service/api/site";
import { useGotoGame } from "../hook/useGotoGame";
import path from "../../path";
import { productList } from "../../datas/defMenu";
import { defGameInfo } from "../../datas/productList";
import {
	useGetTpMaintainList,
	defTpGameType
} from "../hook/useGetTpMaintainList";
import { bannerImgUrl } from "../../config";

const defGameType = {
	default: "default",
	casino: "casino"
};

const defGameList = [
	// {
	// 	...defGameInfo.One789_lottery_789,
	// 	displayKey: "lbl_789Lottery",
	// 	img: `${bannerImgUrl}/h5/img/maingame/789lottery.png`,
	// 	gameType: defGameType.default
	// },
	{
		...defGameInfo.LIVEcasinoOne789,
		displayKey: "lbl_liveCasino_789SeDie",
		img: `${bannerImgUrl}/h5/img/maingame/789se.png`,
		gameType: defGameType.default
	},
	{
		...defGameInfo.sabaClub,
		displayKey: "lbl_Vgaming",
		img: `${bannerImgUrl}/h5/img/maingame/vgaming.png`,
		gameType: defGameType.default
	},
	{
		...defGameInfo.VirtualSports,
		subPath: path.sports.root,
		displayKey: "lbl_VirtualSports",
		img: `${bannerImgUrl}/h5/img/maingame/virtual.png`,
		gameType: defGameType.default,
		parameter: { ...productList.virtualSports }
	},
	{
		...defGameInfo.Keno,
		displayKey: "lbl_Keno",
		img: `${bannerImgUrl}/h5/img/maingame/sabakeno.png`,
		gameType: defGameType.default
	}
];

const GamePanel = ({ i18n, userInfo }) => {
	const { setNav } = useContext(navContext);
	const { setPopBox } = useContext(popBoxContext);
	const [tpIds, setTpIds] = useState(null);
	const isMountedRef = useRef(null);
	const { handleGoToGame } = useGotoGame({ autoGetData: false });
	const { maintainList } = useGetTpMaintainList();

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (userInfo.isLogin) {
			api_GetTpIds().then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							setTpIds(res.data.data);
						} else {
							setPopBox({
								isOpen: true,
								content: `[${res.data.errorCode}] ${res.data.message}`
							});
						}
					}
				},
				() => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							content: i18n.msg_ApiServerError
						});
					}
				}
			);
		}
	}, [userInfo.isLogin, i18n]);

	const ClickGame = ({
		tpId,
		gameId,
		betType,
		useGotoGame: _useGotoGame,
		tpGameType
	}) => {
		const underMaintain = maintainList?.some(
			m =>
				m.tpId === tpId &&
				(m.tpGameType === tpGameType ||
					m.tpGameType === defTpGameType.All)
		);

		if (underMaintain) {
			setPopBox({
				isOpen: true,
				content: i18n.lbl_underMaintenance
			});
		} else {
			GET_ENTER_PAGE({
				langId: userInfo.langId,
				tpId,
				gameId,
				isLogin: userInfo.isLogin,
				betType,
				loginCallback: () => {
					setNav(defNavPanel.login);
				},
				execFunction: _useGotoGame
					? handleGoToGame.bind(this, {
							isLogin: userInfo.isLogin === true,
							langId: userInfo.langId,
							tpId,
							gameId,
							tpGameType
					  })
					: null,
				tpGameType
			});
		}
	};

	const rows = defGameList
		.filter(item => {
			return tpIds ? tpIds.includes(item.tpId) : true;
		})
		.map(g => {
			const displayText = i18n[g.displayKey] ?? g.displayKey;
			const underMaintain = maintainList?.some(
				m =>
					m.tpId === g.tpId &&
					(m.tpGameType === g.tpGameType ||
						m.tpGameType === defTpGameType.All)
			);
			return (
				<a
					className={underMaintain ? "under" : ""}
					key={`promoGameList-${g.displayKey}`}
					onClick={ClickGame.bind(this, {
						tpId: g.tpId,
						gameId: g.gameId,
						betType: g.betType,
						useGotoGame: g.useGotoGame,
						tpGameType: g.tpGameType
					})}>
					<img src={g.img} alt={displayText} />
					<div className="title">{displayText}</div>
					<div className="underBtn">{i18n.lbl_underMaintenance}</div>
				</a>
			);
		});

	return <div className="maingame">{rows}</div>;
};

GamePanel.defaultProps = {
	userInfo: {}
};

GamePanel.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any)
};

export default GamePanel;
