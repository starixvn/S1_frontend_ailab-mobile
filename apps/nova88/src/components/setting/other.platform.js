import React, { useContext, useState, useEffect, useRef } from "react";
import { Redirect } from "@reach/router";
import path from "../../path";
import { navContext, defNavPanel, userInfoContext } from "../common/context";
import { defGameInfo } from "../../datas/productList";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import config from "../../config";
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

export default ({ langId = "en", isLogin = false }) => {
	const { setNav } = useContext(navContext);
	const { userInfo } = useContext(userInfoContext);
	const [redirectPath, setRedirectPath] = useState(null);
	const [tpIds, setTpIds] = useState(null);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (userInfo.isLogin) {
			api.site.GetTpIds().then(
				res => {
					if (res.data.errorCode === 0 && isMountedRef.current) {
						setTpIds(res.data.data);
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
	}, [userInfo.isLogin]);

	const ClickItem = ({ _path, urlParams, tpId, gameId, needLogin }) => {
		const loginCallback = () => {
			setNav(defNavPanel.login);
		};

		if (_path)
			return !isLogin && needLogin
				? loginCallback()
				: setRedirectPath(`/${_path}${urlParams}`);

		return GET_ENTER_PAGE({
			isLogin,
			langId,
			tpId,
			gameId,
			loginCallback
		});
	};

	const rows = defPlatfrom
		.filter(item => {
			return tpIds?.includes(item.tpId);
		})
		.map(p => {
			const key = `other-platform-${p.tpId}-${p.gameId}`;
			let params = null;
			if (p.parameter) {
				params = Object.keys(p.parameter).map(k => {
					return `${k}=${p.parameter[k]}`;
				});
			}

			const _urlParams = params !== null ? `?${params.join("&")}` : "";
			return (
				<img
					key={key}
					src={`${config.cloudImgURL}/SiteSkin/img/logo/${p.imgName}.png`}
					// src={`${config.imgUrl}/common/images/logo/${p.imgName}.png`}
					onClick={ClickItem.bind(this, {
						...p,
						urlParams: _urlParams
					})}
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
