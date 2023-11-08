import PropTypes from "prop-types";
import React, { useContext } from "react";
import { useNavigate } from "@reach/router";
import { userInfoContext, i18nContext } from "Context";
import { Promotion } from "../components/promotion/promotion";
import {
	defUrlParamCols,
	defPromotionNav
} from "../components/promotion/common/def";
import Tab, { useHandleTab } from "../components/promotion/components/tab";
import Nav, { useHandleNav } from "../components/promotion/components/nav";
import staticList from "../datas/promotionList";
import Layout from "../components/common/layout";
import Header from "../components/header/header";
import Wrapper from "../components/promotion/common/wrapper";

const PromotionPage = ({ location = {} }) => {
	const navigateTo = useNavigate();

	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);

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

	const titleLink = (
		<>
			<Tab i18n={i18n} tab={tab} onClickTab={onClickTab} />
			<a className="arrow-icon" onClick={() => navigateTo(-1)}>
				<i className="icon icon-keyboard_arrow_left" />
			</a>
		</>
	);

	const header = (
		<Header
			hideId={true}
			hideLogo={true}
			title={true}
			titleClass="headerTag promos"
			link={titleLink}
			navBar={nav}
		/>
	);

	return (
		<Wrapper>
			<Layout
				header={header}
				mainClass={`main promotions${
					tab === "Processing" ? "" : " Expired"
				}`}>
				<Promotion staticList={staticList} filterType={filterType} />
			</Layout>
		</Wrapper>
	);
};

PromotionPage.propTypes = {
	location: PropTypes.objectOf(PropTypes.any).isRequired
};

const getFilterType = ({ location, column }) => {
	const state = location?.state;

	if (state?.[column]) {
		return isNaN(state?.[column])
			? state?.[column]
			: Number(state?.[column]);
	}

	// eslint-disable-next-line consistent-return
	return undefined;
};

export default PromotionPage;
