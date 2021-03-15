import React, { useContext, useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { api_GetTpIds } from "../../service/api/site";

import {
	i18nContext,
	userInfoContext,
	navContext,
	defNavPanel
} from "./context";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import LinksPanel from "../home/links";
import { productList } from "../../datas/defMenu";

const ProductPage = ({ category, titleKey }) => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setNav } = useContext(navContext);
	const [tpIds, setTpIds] = useState(null);
	const _productList = productList(userInfo.langId)[category].items;
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (userInfo.isLogin) {
			api_GetTpIds().then(
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
	}, [userInfo.isLogin, i18n]);

	const ClickGame = (tpId, gameId, betType) => {
		GET_ENTER_PAGE({
			langId: userInfo.langId,
			tpId,
			gameId,
			isLogin: userInfo.isLogin,
			betType,
			loginCallback: () => {
				setNav(defNavPanel.login);
			}
		});
	};

	const arr = _productList
		.filter(item => {
			return tpIds ? tpIds.includes(item.tpId) : true;
		})
		.map(game => {
			let showingIcon = "";
			if (game.eventIcon) {
				const eventInPeriodObj = game.eventIcon.find(
					obj => obj.inPeriod === true
				);
				showingIcon = eventInPeriodObj ? eventInPeriodObj.icon : "";
			}
			return (
				<button
					className={`gameInBox${showingIcon}`}
					key={`Game-Panel-${game.displayKey}`}
					onClick={ClickGame.bind(
						this,
						game.tpId,
						game.gameId,
						game.betType
					)}>
					<img src={game.img} alt={game.displayKey} />
					<p>
						<span className={`icon icon-${game.icon}`} />
						{i18n[game.displayKey] ?? game.displayKey}
					</p>
				</button>
			);
		});

	return (
		<>
			<div className="gameArea">
				<p className="gameAear__title lightBTitle">
					{i18n[titleKey].toUpperCase()}
				</p>
				<div className="gameBox">{arr}</div>
			</div>
			<LinksPanel i18n={i18n} langId={userInfo.langId} />
		</>
	);
};

ProductPage.propTypes = {
	category: PropTypes.string.isRequired,
	titleKey: PropTypes.string.isRequired
};

export default ProductPage;
