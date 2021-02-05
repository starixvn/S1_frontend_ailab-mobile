import React, { useContext, useState } from "react";
import { Redirect } from "@reach/router";
import PropTypes from "prop-types";
import path from "../../path";
import { navContext, defNavPanel } from "../common/context";
import { defGameInfo } from "../../datas/productList";
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
		...defGameInfo.LIVEcasinoEB,
		imgName: "eb"
	},
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
	{
		...defGameInfo.V8Poker,
		imgName: "v8"
	}
];

const Platform = ({ langId, isLogin }) => {
	const { setNav } = useContext(navContext);
	const [redirectPath, setRedirectPath] = useState(null);

	const ClickItem = ({ _path, urlParams, tpId, gameId }) => {
		const loginCallback = () => {
			setNav(defNavPanel.login);
		};

		if (_path) {
			setRedirectPath(`/${_path}${urlParams}`);
		} else {
			GET_ENTER_PAGE({
				isLogin,
				langId,
				tpId,
				gameId,
				loginCallback
			});
		}
	};

	const rows = defPlatfrom.map(p => {
		const key = `other-platform-${p.tpId}-${p.gameId}`;
		let params = null;
		if (p.parameter) {
			params = Object.keys(p.parameter).map(_key => {
				return `${_key}=${p.parameter[key]}`;
			});
		}

		const _urlParams = params !== null ? `?${params.join("&")}` : "";

		return (
			<img
				key={key}
				alt={p.imgName}
				src={`${config.imgUrl}/common/images/logo/${p.imgName}.png`}
				onClick={ClickItem.bind(this, { ...p, urlParams: _urlParams })}
			/>
		);
	});

	return redirectPath !== null ? (
		<Redirect to={redirectPath} noThrow />
	) : (
		<div className="partner-bar">{rows}</div>
	);
};

Platform.defaultProps = {
	isLogin: null
};

Platform.propTypes = {
	langId: PropTypes.string.isRequired,
	isLogin: PropTypes.bool
};

export default Platform;
