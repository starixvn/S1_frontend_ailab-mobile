import React, { useContext, useEffect, useRef, useState } from "react";
import path from "Path";
import { Promotion as uiSetting } from "UISetting";
import { userInfoContext, i18nContext, popBoxContext } from "Context";
import { PromotionInfo } from "../components/promotion/promotionInfo";
import Tab, { useHandleTab } from "../components/promotion/components/tab";
import Nav from "../components/promotion/components/nav";
import { Link } from "../route/link";
import { defUrlParamCols } from "../components/promotion/common/def";
import config from "../config";
import Layout from "../components/common/layout";
import Header from "../components/header/header";
import JoinBtn from "../components/promotion/components/joinBtn";
import { getUrlParameter } from "../components/common/common";
import api from "../service/api";

export default () => {
	const { userInfo } = useContext(userInfoContext);
	const isMountedRef = useRef(null);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { tab, onClickTab } = useHandleTab({
		defaultValue: getUrlParameter("tab")
	});

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});
	const bonusCode = getUrlParameter("bonusCode");
	const filterType = getUrlParameter("filterType");

	// const { GetSpecialBonusList } = useHandleSpecialBonus({
	// 	api,
	// 	langId: userInfo.langId,
	// 	filterType
	// });

	const [promotionInfo, setPromotionInfo] = useState({});
	const urlParameters = {
		[defUrlParamCols.tab]: tab,
		[defUrlParamCols.filterType]: filterType
	};

	useEffect(() => {
		GetPromotionDetail(userInfo.langId, bonusCode);
	}, [bonusCode]);

	const GetPromotionDetail = (langId, _bonusCode) => {
		api.promotion
			.GetPromotionDetail({
				langId,
				BonusCode: _bonusCode
			})
			.then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							setPromotionInfo(res.data.data);
						} else {
							handleErrorPopBox({ ...res.data, uiSetting });
						}
					}
				},
				err => {
					if (isMountedRef.current) {
						handleErrorPopBox({ uiSetting });
					}
				}
			);
	};

	const joinBtn = (
		<div className="btn-group">
			<JoinBtn
				promotionInfo={promotionInfo}
				filterType={urlParameters?.[defUrlParamCols.filterType]}
			/>
		</div>
	);

	const children = (
		<>
			<Link to={path.promotion.root}>
				<div className="icon icon-keyboard_arrow_left" />
			</Link>
			{joinBtn}
		</>
	);
	const nav = (
		<Nav i18n={i18n} tab={tab} Class="quickChangePage">
			{children}
		</Nav>
	);
	const header = (
		<Header
			hideLogo={true}
			title={true}
			titleClass="headerTag"
			link={<Tab i18n={i18n} tab={tab} onClickTab={onClickTab} />}
			navBar={nav}
		/>
	);

	return (
		<Layout
			header={header}
			mainClass={`main promotions${tab === "Expired" ? " Expired" : ""}`}>
			<PromotionInfo
				config={config}
				uiSetting={uiSetting}
				path={path}
				userInfo={userInfo}
				i18n={i18n}
				setPopBox={setPopBox}
			/>
		</Layout>
	);
};
