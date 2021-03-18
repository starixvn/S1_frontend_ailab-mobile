import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "@reach/router";
import path from "../../path";
import { i18nContext } from "../common/context";
import { defGameInfo } from "../../datas/productList";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import config from "../../config";
import Header from "../header/header";
import { Link } from "../../route/link";
import api from "../../service/api";

const defPlatfrom = [
	{
		...defGameInfo.Sports,
		parameter: { ...defGameInfo.Sports },
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
		imgName: "jk"
	},
	{
		...defGameInfo.Casino_GPI,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_GPI },
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
		parameter: { ...defGameInfo.Casino_YGG },
		imgName: "yg"
	},
	{
		...defGameInfo.Casino_PP,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_PP },
		imgName: "pp"
	},
	{
		...defGameInfo.Casino_SG,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_SG },
		imgName: "sg"
	},
	{
		...defGameInfo.Casino_PG,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_PG },
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
		parameter: { ...defGameInfo.Casino_CQ9 },
		imgName: "cq9"
	},
	{
		...defGameInfo.casino_ICG,
		path: path.casino.root,
		parameter: { ...defGameInfo.casino_ICG },
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
	}
];

const GameProvider = ({ langId = "en", isLogin = false, i18n }) => {
	const navigate = useNavigate();
	const [showingTpIds, setShowingTpIds] = useState([]);
	const isMountedRef = useRef(null);

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

	const ClickItem = ({ _path, urlParams, tpId, gameId, needLogin }) => {
		const loginCallback = () => {
			navigate(`/${langId}/login`);
		};

		if (_path)
			return !isLogin && needLogin
				? loginCallback()
				: navigate(`/${langId}/${_path}${urlParams}`);

		return GET_ENTER_PAGE({
			isLogin,
			langId,
			tpId,
			gameId,
			loginCallback
		});
	};

	const rows = defPlatfrom
		.filter(obj =>
			showingTpIds.length > 0 ? showingTpIds.includes(obj.tpId) : true
		)
		.map(p => {
			const key = `gameProvider-${p.tpId}-${p.gameId}`;
			let params = null;
			if (p.parameter) {
				params = Object.keys(p.parameter).map(k => {
					return `${k}=${p.parameter[k]}`;
				});
			}

			const _urlParams = params !== null ? `?${params.join("&")}` : "";
			return (
				<button
					key={key}
					onClick={ClickItem.bind(this, {
						...p,
						urlParams: _urlParams
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

	const link = (
		<Link to={path.setting.root}>
			<i className="icon icon icon-icon32px_1" />
			{i18n.lbl_Back}
		</Link>
	);

	return (
		<>
			<Header title={i18n.ibi_GameProvider} hideLogo={true} link={link} />
			<main className="main provider">
				<GameProvider i18n={i18n} />
			</main>
		</>
	);
};

export default IndexPage;
