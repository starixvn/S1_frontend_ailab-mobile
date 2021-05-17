import React, { useContext } from "react";
import path from "Path";
import { Helmet } from "react-helmet";
import { Promotion as uiSetting } from "UISetting";
import { userInfoContext, i18nContext, popBoxContext } from "Context";
import { Promotion } from "../components/promotion/promotion";
import {
	defUrlParamCols,
	defPromotionNav
} from "../components/promotion/common/def";
import Tab, { useHandleTab } from "../components/promotion/components/tab";
import Nav, { useHandleNav } from "../components/promotion/components/nav";
import config from "../config";
import staticList from "../datas/promotionList";
import Layout from "../components/common/layout";
import Header from "../components/header/header";

export default ({ location = {} }) => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { tab, onClickTab } = useHandleTab({
		defaultValue: getFilterType({ location, column: defUrlParamCols.tab })
	});
	const { filterType, onClickFilter } = useHandleNav({
		defaultValue: getFilterType({
			location,
			column: defUrlParamCols.filterType
		}),
		isLogin: userInfo.isLogin,
		tab
	});
	let helmet = {};
	switch (userInfo.langId) {
		case "en":
			helmet = (
				<Helmet>
					<link
						rel="canonical"
						href="https://www.nova88.net/en/promotion"
					/>
					<link
						rel="alternate"
						href="https://www.nova88.net/en/promotion"
						hrefLang="en-my"
					/>
					<link
						rel="alternate"
						href="https://www.nova88gol.com/cs/promotion"
						hrefLang="zh-my"
					/>
					<link
						rel="alternate"
						href="https://www.nova88apple.com/th/promotion"
						hrefLang="th-th"
					/>
					<link
						rel="alternate"
						href="https://www.nova88-indo.com/id/promotion"
						hrefLang="id-id"
					/>
				</Helmet>
			);
			break;
		case "cs":
			helmet = (
				<Helmet>
					<link
						rel="canonical"
						href="https://www.nova88gol.com/cs/promotion"
					/>
					<link
						rel="alternate"
						href="https://www.nova88.net/en/promotion"
						hrefLang="en-my"
					/>
					<link
						rel="alternate"
						href="https://www.nova88gol.com/cs/promotion"
						hrefLang="zh-my"
					/>
					<link
						rel="alternate"
						href="https://www.nova88apple.com/th/promotion"
						hrefLang="th-th"
					/>
					<link
						rel="alternate"
						href="https://www.nova88-indo.com/id/promotion"
						hrefLang="id-id"
					/>
				</Helmet>
			);
			break;
		case "th":
			helmet = (
				<Helmet>
					<link
						rel="canonical"
						href="https://www.nova88gol.com/cs/promotion"
					/>
					<link
						rel="alternate"
						href="https://www.nova88.net/en/promotion"
						hrefLang="en-my"
					/>
					<link
						rel="alternate"
						href="https://www.nova88gol.com/cs/promotion"
						hrefLang="zh-my"
					/>
					<link
						rel="alternate"
						href="https://www.nova88apple.com/th/promotion"
						hrefLang="th-th"
					/>
					<link
						rel="alternate"
						href="https://www.nova88-indo.com/id/promotion"
						hrefLang="id-id"
					/>
				</Helmet>
			);
			break;
		case "id":
			helmet = (
				<Helmet>
					<link
						rel="canonical"
						href="https://www.nova88-indo.com/id/promotion"
					/>
					<link
						rel="alternate"
						href="https://www.nova88.net/en/promotion"
						hrefLang="en-my"
					/>
					<link
						rel="alternate"
						href="https://www.nova88gol.com/cs/promotion"
						hrefLang="zh-my"
					/>
					<link
						rel="alternate"
						href="https://www.nova88apple.com/th/promotion"
						hrefLang="th-th"
					/>
					<link
						rel="alternate"
						href="https://www.nova88-indo.com/id/promotion"
						hrefLang="id-id"
					/>
				</Helmet>
			);

			break;

		default:
			helmet = (
				<Helmet>
					<link
						rel="canonical"
						href="https://www.nova88.net/en/promotion"
					/>
					<link
						rel="alternate"
						href="https://www.nova88.net/en/promotion"
						hrefLang="en-my"
					/>
					<link
						rel="alternate"
						href="https://www.nova88gol.com/cs/promotion"
						hrefLang="zh-my"
					/>
					<link
						rel="alternate"
						href="https://www.nova88apple.com/th/promotion"
						hrefLang="th-th"
					/>
					<link
						rel="alternate"
						href="https://www.nova88-indo.com/id/promotion"
						hrefLang="id-id"
					/>
				</Helmet>
			);
			break;
	}
	const nav = (
		<Nav
			navBar={defPromotionNav}
			i18n={i18n}
			tab={tab}
			filterType={filterType}
			onClickFilter={onClickFilter}
			isLogin={userInfo.isLogin}
			Class="quickSelect"
		/>
	);
	const header = (
		<Header
			hideId={true}
			hideLogo={true}
			title={true}
			titleClass="headerTag"
			link={<Tab i18n={i18n} tab={tab} onClickTab={onClickTab} />}
			navBar={nav}
		/>
	);

	return (
		<>
			<Layout
				header={header}
				mainClass={`main promotions${
					tab === "Processing" ? "" : " Expired"
				}`}>
				<Promotion
					staticList={staticList}
					config={config}
					uiSetting={uiSetting}
					path={path}
					userInfo={userInfo}
					i18n={i18n}
					setPopBox={setPopBox}
					location={location}
					tab={tab}
					nav={nav}
					filterType={filterType}
				/>
			</Layout>
			{helmet}
		</>
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
