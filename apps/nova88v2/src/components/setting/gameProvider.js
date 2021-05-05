import React, { useContext, useEffect, useRef, useState } from "react";
import path from "../../path";
import { i18nContext, userInfoContext } from "../common/context";
import { defGameInfo } from "../../datas/productList";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import config from "../../config";
import Header from "../header/header";
import { Link } from "../../route/link";
import api from "../../service/api";
import Footer from "../common/footer";
import useHandleLogin from "../hook/useHandleLogin";

const defPlatfrom = [
	{
		...defGameInfo.Soccer,
		imgName: "saba"
	},
	{
		...defGameInfo.LIVEcasinoAB,
		imgName: "ab"
	},
	// {
	// 	...defGameInfo.Fishing,
	// 	imgName: "yl"
	// },
	{
		...defGameInfo.LIVEcasinoAG,
		imgName: "ag"
	},
	{
		...defGameInfo.Casino_JOKER,
		path: path.casino.root,
		imgName: "jk"
	},
	{
		...defGameInfo.Casino_GPI,
		path: path.casino.root,
		imgName: "gp"
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
		imgName: "yg"
	},
	{
		...defGameInfo.Casino_PP,
		path: path.casino.root,
		imgName: "pp"
	},
	{
		...defGameInfo.Casino_SG,
		path: path.casino.root,
		imgName: "sg"
	},
	{
		...defGameInfo.Casino_PG,
		path: path.casino.root,
		imgName: "pg"
	},
	{
		...defGameInfo.LIVEcasinoAE,
		imgName: "ae"
	},
	{
		...defGameInfo.LIVEcasinoEB,
		imgName: "eb"
	},
	// {
	// 	...defGameInfo.LIVEcasinoMW,
	// 	imgName: "mw"
	// },
	{
		...defGameInfo.LIVEcasinoWM,
		imgName: "wm"
	},
	{
		...defGameInfo.Casino_CQ9,
		path: path.casino.root,
		imgName: "cq9"
	},
	{
		...defGameInfo.casino_ICG,
		path: path.casino.root,
		imgName: "icg"
	},
	// {
	// 	...defGameInfo.Casino_918Kiss,
	// 	imgName: "kiss",
	// 	path: path.kiss918.root
	// },
	{
		...defGameInfo.oneGame,
		imgName: "1g"
	},
	{
		...defGameInfo.Casino_PT,
		path: path.casino.root,
		imgName: "pt"
	}
];

const GameProvider = ({ userInfo, i18n }) => {
	const [showingTpIds, setShowingTpIds] = useState([]);
	const { handleLogin } = useHandleLogin();
	const isMountedRef = useRef(null);
	const { isLogin, langId } = userInfo;

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
		const { tpId, gameId } = itemInfo;
		GET_ENTER_PAGE({
			isLogin,
			langId,
			tpId,
			gameId,
			loginCallback: handleLogin
		});
	};

	const rows = defPlatfrom
		.filter(obj =>
			showingTpIds.length > 0 ? showingTpIds.includes(obj.tpId) : true
		)
		.map(p => {
			return p.path ? (
				<Link
					key={`gameProvider-${p.tpId}-${p.gameId}`}
					to={p.path}
					state={{ tpId: p.tpId, gameId: p.gameId }}>
					<img
						src={`${config.cloudImgURL}/SiteSkin/img/logo/${p.imgName}.png`}
						alt={p.imgName}
					/>
				</Link>
			) : (
				<button
					key={`gameProvider-${p.tpId}-${p.gameId}`}
					onClick={ClickItem.bind(this, {
						tpId: p.tpId,
						gameId: p.gameId
					})}>
					<img
						src={`${config.cloudImgURL}/SiteSkin/img/logo/${p.imgName}.png`}
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
