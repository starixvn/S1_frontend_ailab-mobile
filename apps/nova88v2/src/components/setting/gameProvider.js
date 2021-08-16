import React, { useContext, useEffect, useRef, useState } from "react";
import path from "../../path";
import { i18nContext, userInfoContext, popBoxContext } from "../common/context";
import { defGameInfo, defTpCategoryId } from "../../datas/productList";
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
		tpCategoryId: defTpCategoryId.Sports
	},
	{
		...defGameInfo.LIVEcasinoAB,
		imgName: "ab",
		tpCategoryId: defTpCategoryId.LiveCasino
	},
	// {
	// 	...defGameInfo.Fishing,
	// 	imgName: "yl"
	// },
	{
		...defGameInfo.LIVEcasinoAG,
		imgName: "ag",
		tpCategoryId: defTpCategoryId.LiveCasino
	},
	{
		...defGameInfo.Casino_JOKER,
		path: path.casino.root,
		imgName: "jk",
		tpCategoryId: defTpCategoryId.Slots
	},
	{
		...defGameInfo.Casino_GPI,
		path: path.casino.root,
		imgName: "gp",
		tpCategoryId: defTpCategoryId.Slots
	},
	{
		...defGameInfo.LIVEcasinoDG,
		imgName: "dg",
		tpCategoryId: defTpCategoryId.LiveCasino
	},
	{
		...defGameInfo.LIVEcasinoSA,
		imgName: "sa",
		tpCategoryId: defTpCategoryId.LiveCasino
	},
	{
		...defGameInfo.Casino_YGG,
		path: path.casino.root,
		imgName: "yg",
		tpCategoryId: defTpCategoryId.Slots
	},
	{
		...defGameInfo.Casino_PP,
		path: path.casino.root,
		imgName: "pp",
		tpCategoryId: defTpCategoryId.Slots
	},
	{
		...defGameInfo.Casino_SG,
		path: path.casino.root,
		imgName: "sg",
		tpCategoryId: defTpCategoryId.Slots
	},
	{
		...defGameInfo.Casino_PG,
		path: path.casino.root,
		imgName: "pg",
		tpCategoryId: defTpCategoryId.Slots
	},
	{
		...defGameInfo.LIVEcasinoAE,
		imgName: "ae",
		tpCategoryId: defTpCategoryId.LiveCasino
	},
	{
		...defGameInfo.LIVEcasinoEB,
		imgName: "eb",
		tpCategoryId: defTpCategoryId.LiveCasino
	},
	// {
	// 	...defGameInfo.LIVEcasinoMW,
	// 	imgName: "mw",
	// tpCategoryId: defTpCategoryId.LiveCasino
	// },
	{
		...defGameInfo.LIVEcasinoWM,
		imgName: "wm",
		tpCategoryId: defTpCategoryId.LiveCasino
	},
	{
		...defGameInfo.Casino_CQ9,
		path: path.casino.root,
		imgName: "cq9",
		tpCategoryId: defTpCategoryId.Slots
	},
	{
		...defGameInfo.casino_ICG,
		path: path.casino.root,
		imgName: "icg",
		tpCategoryId: defTpCategoryId.Slots
	},
	// {
	// 	...defGameInfo.Casino_918Kiss,
	// 	imgName: "kiss",
	// 	path: path.kiss918.root,
	// tpCategoryId: defTpCategoryId.Slots
	// },
	{
		...defGameInfo.oneGame,
		imgName: "1g",
		tpCategoryId: defTpCategoryId.Poker
	},
	{
		...defGameInfo.Casino_PT,
		path: path.casino.root,
		imgName: "pt",
		tpCategoryId: defTpCategoryId.Slots
	},
	{
		...defGameInfo.kingMaker,
		imgName: "km",
		tpCategoryId: defTpCategoryId.Poker
	},
	{
		...defGameInfo.amb,
		imgName: "amb",
		tpCategoryId: defTpCategoryId.Poker
	},
	{
		...defGameInfo.Casino_MGP,
		imgName: "mg",
		path: path.casino.root,
		tpCategoryId: defTpCategoryId.Slots
	},
	{
		...defGameInfo.Casino_Jili,
		imgName: "ji",
		path: path.casino.root,
		tpCategoryId: defTpCategoryId.Slots
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
		const { tpId, gameId, underMaintain } = itemInfo;
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
				loginCallback: handleLogin
			});
		}
	};

	const rows = defPlatfrom
		.filter(obj =>
			showingTpIds.length > 0 ? showingTpIds.includes(obj.tpId) : true
		)
		.map(p => {
			const underMaintain = maintainList?.some(
				m =>
					m.tpId === p.tpId &&
					(m.tpCategoryId === p.tpCategoryId ||
						m.tpCategoryId === defTpCategoryId.All)
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
						underMaintain
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
