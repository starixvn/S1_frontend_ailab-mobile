import React from "react";
import { Link, useMatch } from "@reach/router";
import path from "../../path";
import { siteInfo } from "../../config";
import { defGameInfo } from "../../datas/productList";

export default ({ i18n, OnClickProduct, userInfo }) => {
	return (
		<div className="headerB">
			<button
				onClick={OnClickProduct.bind(this, {
					...defGameInfo.Sports,
					lang: userInfo.langId,
					isLogin: userInfo.isLogin
				})}
				className="nav">
				{i18n.lbl_Sports.toUpperCase()}
			</button>
			<Link
				to={`/${path.games.root}`}
				className={`nav${
					useMatch(`/${path.games.root}`) !== null ? " active" : ""
				}`}>
				{i18n.lbl_Games.toUpperCase()}
			</Link>
			<button
				onClick={OnClickProduct.bind(this, {
					...defGameInfo.eSports,
					lang: userInfo.langId,
					isLogin: userInfo.isLogin
				})}
				className="nav">
				{i18n.lbl_eSports.toUpperCase()}
			</button>
			<Link
				to={`/${path.casino.root}`}
				className={`nav icon icon-newicon${
					useMatch(`/${path.casino.root}`) !== null ? " active" : ""
				}`}>
				{i18n.lbl_Slots.toUpperCase()}
			</Link>
			<Link
				to={`/${path.liveCasino.root}`}
				className={`nav${
					useMatch(`/${path.liveCasino.root}`) !== null
						? " active"
						: ""
				}`}>
				{i18n.lbl_LiveCasino.toUpperCase()}
			</Link>
			<Link
				to={`/${path.fishing.root}`}
				className={`nav icon icon-newicon${
					useMatch(`/${path.fishing.root}`) !== null ? " active" : ""
				}`}>
				{i18n.lbl_Fishing.toUpperCase()}
			</Link>
			<Link
				to={`/${path.promotion.root}`}
				className={`nav${
					useMatch(`/${path.promotion.root}`) !== null
						? " active"
						: ""
				}`}>
				{i18n.lbl_Promotions.toUpperCase()}
			</Link>
			<a
				target="_blank"
				rel="noreferrer"
				href={siteInfo(userInfo.langId).affiliateLink}
				className="nav">
				{i18n.lbl_Affiliates.toUpperCase()}
			</a>
			<Link
				to={`/${path.ranking.root}`}
				className={`nav liveIcon${
					useMatch(`/${path.ranking.root}`) !== null ? " active" : ""
				}`}>
				{i18n.lbl_Ranking.toUpperCase()}
			</Link>
		</div>
	);
};
