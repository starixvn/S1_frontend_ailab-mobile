import React, { useContext, useState } from "react";
import path from "../../path";
import { navContext, defNavPanel } from "../common/context";
import { defGameInfo } from "../../datas/productList";
import { Redirect } from "@reach/router";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import config from "../../config";

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
	{
		...defGameInfo.Fishing,
		imgName: "yl"
	},
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
	{
		...defGameInfo.LIVEcasinoMW,
		imgName: "mw"
	},
	{
		...defGameInfo.LIVEcasinoWM,
		imgName: "wm"
	},
	{
		...defGameInfo.Casino_918Kiss,
		imgName: "kiss",
		path: path.kiss918.root
	}
];

export default ({ langId, isLogin }) => {
	const { setNav } = useContext(navContext);
	const [redirectPath, setRedirectPath] = useState(null);

	const ClickItem = ({ path, urlParams, tpId, gameId, needLogin }) => {
		const loginCallback = () => {
			setNav(defNavPanel.login);
		};

		if (path) {
			return !isLogin && needLogin
				? loginCallback()
				: setRedirectPath(`/${path}${urlParams}`);
		} else {
			GET_ENTER_PAGE({
				isLogin,
				langId,
				tpId,
				gameId,
				loginCallback: loginCallback
			});
		}
	};

	let rows = defPlatfrom.map(p => {
		let key = `other-platform-${p.tpId}-${p.gameId}`;
		let params = null;
		if (p.parameter) {
			params = Object.keys(p.parameter).map(key => {
				return `${key}=${p.parameter[key]}`;
			});
		}

		let _urlParams = params !== null ? `?${params.join("&")}` : "";

		return (
			<img
				key={key}
				src={`${config.imgUrl}/common/images/logo/${p.imgName}.png`}
				onClick={ClickItem.bind(this, { ...p, urlParams: _urlParams })}
				alt={p.imgName}
			/>
		);
	});

	return redirectPath !== null ? (
		<Redirect to={redirectPath} noThrow />
	) : (
		<div className="partner-bar">{rows}</div>
	);
};
