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
			<div className="nav">{i18n.lbl_Games.toUpperCase()}</div>
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
				className={`nav${
					useMatch(`/${path.casino.root}`) !== null ? " active" : ""
				}`}>
				{i18n.lbl_Slots.toUpperCase()}
			</Link>
			<div className="nav">{i18n.lbl_LiveCasino.toUpperCase()}</div>
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
		</div>
	);
};
