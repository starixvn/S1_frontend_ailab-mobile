import React, { useContext, useEffect, useRef, useState } from "react";
import { i18nContext, userInfoContext, popBoxContext } from "Context";
import { Link } from "@Router";
import path from "../../../path";
import { cloudBannerImgURL } from "../../../config";
import { defGameInfo } from "../../../datas/productList";
import { GET_ENTER_PAGE } from "../../../service/enterPage";
import Header from "../../header/header";
import api from "../../../service/api";
import useHandleLogin from "../../hook/useHandleLogin";
import {
	useGetTpMaintainList,
	defTpGameType
} from "../../hook/useGetTpMaintainList";
import allowedCurrencyList from "../../../datas/allowedCurrencyList";

const defPlatfrom = [
	{
		...defGameInfo.Soccer,
		imgName: "saba"
	},
	{
		...defGameInfo.LIVEcasinoAB,
		imgName: "ab"
	},
	{
		...defGameInfo.LIVEcasinoAG,
		imgName: "ag"
	},
	{
		...defGameInfo.Casino_JOKER,
		path: path.casino.root,
		imgName: "casino_joker"
	},
	{
		...defGameInfo.Casino_GPI,
		path: path.casino.root,
		imgName: "casino_gpi"
	},
	{
		...defGameInfo.LIVEcasinoDG,
		imgName: "dg"
	},
	{
		...defGameInfo.LIVEcasinoSA,
		imgName: "sa"
	},
	{
		...defGameInfo.Casino_YGG,
		path: path.casino.root,
		imgName: "casino_ygg"
	},
	{
		...defGameInfo.Casino_AMB,
		path: path.casino.root,
		imgName: "casino_askme",
		allowCurrencies: allowedCurrencyList.slotAMB
	},
	{
		...defGameInfo.Casino_PP,
		path: path.casino.root,
		imgName: "casino_pp"
	},
	{
		...defGameInfo.Casino_SG,
		path: path.casino.root,
		imgName: "casino_sg"
	},
	{
		...defGameInfo.Casino_PG,
		path: path.casino.root,
		imgName: "casino_pg"
	},
	{
		...defGameInfo.LIVEcasinoAE,
		imgName: "ae"
	},
	{
		...defGameInfo.LIVEcasinoEB,
		imgName: "we"
	},
	{
		...defGameInfo.LIVEcasinoWM,
		imgName: "wm"
	},
	{
		...defGameInfo.Casino_CQ9,
		path: path.casino.root,
		imgName: "casino_cq9"
	},
	{
		...defGameInfo.Casino_PlayTech,
		path: path.casino.root,
		imgName: "casino_pt"
	},
	{
		...defGameInfo.kingMaker,
		imgName: "km"
	},
	{
		...defGameInfo.amb,
		imgName: "casino_askme"
	},
	{
		...defGameInfo.Casino_MGP,
		imgName: "casino_mg",
		path: path.casino.root
	},
	{
		...defGameInfo.Casino_Jili,
		imgName: "casino_jili",
		path: path.casino.root
	},
	{
		...defGameInfo.Casino_NetEnt,
		imgName: "casino_netent",
		path: path.casino.root
	},
	{
		...defGameInfo.LIVEcasinoEVO,
		imgName: "ev"
	},
	{
		...defGameInfo.Casino_RedTiger,
		imgName: "casino_redtiger",
		path: path.casino.root
	},
	{
		...defGameInfo.Casino_AdvantPlay,
		imgName: "casino_ap",
		path: path.casino.root
	},
	{
		...defGameInfo.Casino_Habanero,
		imgName: "casino_hb",
		path: path.casino.root
	},
	{
		...defGameInfo.Casino_SimplePlay,
		imgName: "casino_simpleplay",
		path: path.casino.root
	},
	{
		...defGameInfo.Casino_Skywind,
		imgName: "sk",
		path: path.casino.root
	},
	{
		...defGameInfo.Casino_Nextspin,
		imgName: "casino_nextspin",
		path: path.casino.root
	},
	{
		...defGameInfo.ESport_IM,
		imgName: "im-esports"
	},
	{
		...defGameInfo.Casino_SPRIBE,
		imgName: "spribe"
	},
	{
		...defGameInfo.Casino_Endorphina,
		imgName: "casino_es",
		path: path.casino.root
	},
	{
		...defGameInfo.Casino_FaChai,
		imgName: "casino_fachai",
		path: path.casino.root
	},
	{
		...defGameInfo.Casino_PEGASUS,
		imgName: "casino_pegasus",
		path: path.casino.root
	},
	{
		...defGameInfo.TFGaming,
		imgName: "tfg"
	},
	{
		...defGameInfo.Traditional_Lottery,
		imgName: "casino_789"
	},
	{
		...defGameInfo.V8Poker,
		imgName: "v8"
	},
	{
		...defGameInfo.Casino_PNG,
		imgName: "png",
		path: path.casino.root
	},
	{
		...defGameInfo.Casino_BNG,
		imgName: "casino_bng"
	},
	{
		...defGameInfo.Casino_NoLimitCity,
		imgName: "casino_nlc",
		path: path.casino.root
	}
];

const GameProvider = ({ userInfo, i18n }) => {
	const { setPopBox } = useContext(popBoxContext);
	const [showingTpIds, setShowingTpIds] = useState([]);
	const { handleLogin } = useHandleLogin();
	const isMountedRef = useRef(null);
	const { isLogin, langId, currencyId } = userInfo;
	const { maintainList } = useGetTpMaintainList();

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (isLogin) {
			api.site.GetTpIds().then(
				res => {
					if (res.data.errorCode === 0 && isMountedRef.current) {
						setShowingTpIds(res.data.data);
					} else if (res.data.errorCode !== 0) {
						setPopBox({
							isOpen: true,
							content: `[${res.data.errorCode}] ${res.data.message}`
						});
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
	}, [isLogin, i18n]);

	const ClickItem = itemInfo => {
		const { tpId, gameId, underMaintain, tpGameType } = itemInfo;
		if (underMaintain) {
			setPopBox({
				isOpen: true,
				title: i18n.lbl_ImportantNote,
				content: i18n.lbl_underMaintenance
			});
		} else {
			GET_ENTER_PAGE({
				tpId,
				langId,
				gameId,
				isLogin,
				tpGameType,
				loginCallback: handleLogin
			});
		}
	};

	const filters = el => {
		let flag = true;
		if (showingTpIds.length) {
			flag = showingTpIds.includes(el.tpId) && flag;
		}
		if (el.allowCurrencies) {
			flag = el.allowCurrencies.includes(currencyId) && flag;
		}

		return flag;
	};

	const rows = defPlatfrom
		.filter(obj => filters(obj))
		.map(p => {
			const underMaintain = maintainList?.some(
				m =>
					m.tpId === p.tpId &&
					(m.tpGameType === p.tpGameType ||
						m.tpGameType === defTpGameType.All)
			);

			return p.path && !underMaintain ? (
				<Link
					key={`gameProvider-${p.tpId}-${p.gameId}-${p.tpGameType}`}
					to={`${p.path}/${p.tpId}`}
					state={{ tpId: p.tpId, gameId: p.gameId }}>
					<img
						src={`${cloudBannerImgURL}/h5/img/venderlogo/${p.imgName}.png`}
						alt={p.imgName}
					/>
				</Link>
			) : (
				<button
					key={`gameProvider-${p.tpId}-${p.gameId}-${p.tpGameType}`}
					onClick={ClickItem.bind(this, {
						tpId: p.tpId,
						gameId: p.gameId,
						underMaintain,
						tpGameType: p.tpGameType
					})}>
					<img
						src={`${cloudBannerImgURL}/h5/img/venderlogo/${p.imgName}.png`}
						alt={p.imgName}
					/>
				</button>
			);
		});

	return rows;
};

const IndexPage = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);

	const link = (
		<Link to={path.setting.root}>
			<i className="icon icon-keyboard_arrow_left" />
		</Link>
	);

	return (
		<>
			<Header title={i18n.ibi_GameProvider} hideLogo={true} link={link} />
			<main className="main provider">
				<GameProvider i18n={i18n} userInfo={userInfo} />
			</main>
		</>
	);
};

export default IndexPage;
