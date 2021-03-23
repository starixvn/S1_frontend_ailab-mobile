import React, { useContext } from "react";
import path from "Path";
import { Promotion as uiSetting } from "UISetting";
import { userInfoContext, i18nContext, popBoxContext } from "Context";
import { PromotionInfo } from "../components/promotion/promotionInfo";
import Tab, { useHandleTab } from "../components/promotion/components/tab";
import Nav, { useHandleNav } from "../components/promotion/components/nav";
import { Link } from "../route/link";
import { defUrlParamCols } from "../components/promotion/common/def";
import config from "../config";
import Layout from "../components/common/layout";
import Header from "../components/header/header";

export default ({ location = {} }) => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { tab, onClickTab } = useHandleTab({
		defaultValue: getFilterType({ location, column: defUrlParamCols.tab })
	});
	const children = (
		<>
			<Link to={path.promotion.root}>
				<div className="icon icon icon-icon32px_1" />
				{i18n.lbl_Back}
			</Link>
			<div className="btn-group">
				<Link to={path.join.root}>{i18n.lbl_JoinNow}</Link>
			</div>
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
		<Layout header={header} mainClass="main promotions">
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

const getFilterType = ({ location, column }) => {
	const state = location?.state;
	return state?.[column]
		? isNaN(state?.[column])
			? state?.[column]
			: Number(state?.[column])
		: undefined;
};
