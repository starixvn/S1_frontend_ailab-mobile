import React, { useContext, useEffect, useRef, useState } from "react";
import path from "../../path";
import { i18nContext, userInfoContext, popBoxContext } from "../common/context";
import { defGameInfo } from "../../datas/productList";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import { cloudImgURL } from "../../config";
import Header from "../header/header";
import { Link } from "../../route/link";
import api from "../../service/api";
import Footer from "../common/footer";
import useHandleLogin from "../hook/useHandleLogin";
import { useGetTpMaintainList } from "../hook/useGetTpMaintainList";

const defPlatfrom = [
	{
		...defGameInfo.Soccer,
		imgName: "saba",
		tpGameType: 1
	},
	{
		...defGameInfo.LIVEcasinoAB,
		imgName: "ab",
		tpGameType: 6
	},
	// {
	// 	...defGameInfo.Fishing,
	// 	imgName: "yl"
	// },
	{
		...defGameInfo.LIVEcasinoAG,
		imgName: "ag",
		tpGameType: 8
	},
	{
		...defGameInfo.Casino_JOKER,
		path: path.casino.root,
		imgName: "jk",
		tpGameType: 13
	},
	{
		...defGameInfo.Casino_GPI,
		path: path.casino.root,
		imgName: "gp",
		tpGameType: 11
	},
	{
		...defGameInfo.LIVEcasinoDG,
		imgName: "dg",
		tpGameType: 10
	},
	{
		...defGameInfo.LIVEcasinoSA,
		imgName: "sa",
		tpGameType: 9
	},
	{
		...defGameInfo.Casino_YGG,
		path: path.casino.root,
		imgName: "yg",
		tpGameType: 14
	},
	{
		...defGameInfo.Casino_PP,
		path: path.casino.root,
		imgName: "pp",
		tpGameType: 7
	},
	{
		...defGameInfo.Casino_SG,
		path: path.casino.root,
		imgName: "sg",
		tpGameType: 15
	},
	{
		...defGameInfo.Casino_PG,
		path: path.casino.root,
		imgName: "pg",
		tpGameType: 17
	},
	{
		...defGameInfo.LIVEcasinoAE,
		imgName: "ae",
		tpGameType: 18
	},
	{
		...defGameInfo.LIVEcasinoEB,
		imgName: "eb",
		tpGameType: 28
	},
	// {
	// 	...defGameInfo.LIVEcasinoMW,
	// 	imgName: "mw",
	// },
	{
		...defGameInfo.LIVEcasinoWM,
		imgName: "wm",
		tpGameType: 32
	},
	{
		...defGameInfo.Casino_CQ9,
		path: path.casino.root,
		imgName: "cq9",
		tpGameType: 29
	},
	{
		...defGameInfo.casino_ICG,
		path: path.casino.root,
		imgName: "icg",
		tpGameType: 39
	},
	// {
	// 	...defGameInfo.Casino_918Kiss,
	// 	imgName: "kiss",
	// 	path: path.kiss918.root,
	// },
	{
		...defGameInfo.oneGame,
		imgName: "1g",
		tpGameType: 41
	},
	{
		...defGameInfo.Casino_PT,
		path: path.casino.root,
		imgName: "pt",
		tpGameType: 48
	},
	{
		...defGameInfo.kingMaker,
		imgName: "km",
		tpGameType: 52
	},
	{
		...defGameInfo.amb,
		imgName: "amb",
		tpGameType: 50
	},
	{
		...defGameInfo.Casino_MGP,
		imgName: "mg",
		path: path.casino.root,
		tpGameType: 58
	},
	{
		...defGameInfo.Casino_Jili,
		imgName: "ji",
		path: path.casino.root,
		tpGameType: 53
	}
];

const GameProvider = ({ userInfo, i18n }) => {
	const { setPopBox } = useContext(popBoxContext);
	const [showingTpIds, setShowingTpIds] = useState([]);
	const { handleLogin } = useHandleLogin();
	const isMountedRef = useRef(null);
	const { isLogin, langId } = userInfo;
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
					}
				},
				() => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
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
				isLogin,
				langId,
				tpId,
				gameId,
				loginCallback: handleLogin,
				tpGameType
			});
		}
	};

	const rows = defPlatfrom
		.filter(obj =>
			showingTpIds.length > 0 ? showingTpIds.includes(obj.tpId) : true
		)
		.map(p => {
			const underMaintain = maintainList?.some(
				m => m.tpId === p.tpId && m.tpGameType === p.tpGameType
			);

			return p.path && !underMaintain ? (
				<Link
					key={`gameProvider-${p.tpId}-${p.gameId}`}
					to={p.path}
					state={{ tpId: p.tpId, gameId: p.gameId }}>
					<img
						src={`${cloudImgURL}/SiteSkin/img/logo/${p.imgName}.png`}
						alt={p.imgName}
					/>
				</Link>
			) : (
				<button
					key={`gameProvider-${p.tpId}-${p.gameId}`}
					onClick={ClickItem.bind(this, {
						tpId: p.tpId,
						gameId: p.gameId,
						underMaintain,
						tpGameType: p.tpGameType
					})}>
					<img
						src={`${cloudImgURL}/SiteSkin/img/logo/${p.imgName}.png`}
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
			<Footer />
		</>
	);
};

export default IndexPage;
