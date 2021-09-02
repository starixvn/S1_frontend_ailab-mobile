import React, { useContext } from "react";
import { NoData } from "@ailab-mobile/common";
import PropTypes from "prop-types";
import {
	defFilterType,
	defPromotionType,
	defTabs,
	defUrlParamCols
} from "./common/def";
import { isExpiry, isClaimed, isNew } from "./common/common";
import Card, { CardForStatic } from "./components/promotionCard";
import Wrapper from "./common/wrapper";
import { configContext } from "./common/context";
import SpecialBonusCodeInputBox from "./components/specialBonusCodeInputBox";
import { useHandleSpecialBonus } from "./hook/useHandleSpecialBonus";
import { useGetPromotions } from "./hook/useGetPromotions";

export const Promotion = ({
	staticList,
	location,
	tab,
	filterType,
	nav,
	...rest
}) => {
	return (
		<Wrapper {...rest}>
			<PromotionContent
				staticList={staticList}
				location={location}
				nav={nav}
				tab={tab}
				filterType={filterType}
			/>
		</Wrapper>
	);
};

Promotion.defaultProps = {
	formatSetting: {},
	staticList: [],
	location: {},
	tab: "",
	nav: {},
	filterType: 0
};

Promotion.propTypes = {
	formatSetting: PropTypes.shape({
		isConvertRequired: PropTypes.bool,
		digits: PropTypes.number
	}),
	staticList: PropTypes.arrayOf(PropTypes.any),
	location: PropTypes.objectOf(PropTypes.any),
	tab: PropTypes.string,
	nav: PropTypes.node,
	filterType: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

const setPromotionCards = ({
	datas,
	userInfo,
	i18n,
	uiSetting,
	ruleCols,
	func_CallBack,
	urlParameters
}) => {
	return datas.map(p => {
		const imgSRC = p.banner;
		const _isClaimed = isClaimed(p);
		const _isNew = _isClaimed ? false : isNew(p);
		return (
			<Card
				userInfo={userInfo}
				key={`promotion-${userInfo.langId}-${p.bonusCode}`}
				p={p}
				_isClaimed={_isClaimed}
				_isNew={_isNew}
				imgSRC={imgSRC}
				func_CallBack={func_CallBack}
				i18n={i18n}
				uiSetting={uiSetting}
				ruleCols={ruleCols}
				urlParameters={urlParameters}
			/>
		);
	});
};

const PromotionContent = ({ staticList, location, tab, nav, filterType }) => {
	const { uiSetting, userInfo, i18n, api, ruleCols } = useContext(
		configContext
	);

	const { promotion, getPromotionList } = useGetPromotions({
		api,
		userInfo
	});
	const {
		onChangeSpecialCode,
		specialCode,
		onSubmitSpecialCode,
		specialBonusDatas,
		GetSpecialBonusList
	} = useHandleSpecialBonus({ api, langId: userInfo.langId, filterType });

	const urlParameters = {
		[defUrlParamCols.tab]: tab,
		[defUrlParamCols.filterType]: filterType
	};
	let rows = [];
	if (filterType === defFilterType.specialBonus) {
		const datas = specialBonusDatas.filter(p => {
			return !isExpiry({
				...p,
				isLogin: userInfo.isLogin
			});
		});

		rows = setPromotionCards({
			datas,
			tab,
			userInfo,
			i18n,
			uiSetting,
			ruleCols,
			func_CallBack: GetSpecialBonusList,
			urlParameters
		});
	} else {
		const datas = promotion?.filter(p => {
			if (filterType === defFilterType.all) {
				return !isExpiry({
					...p,
					isLogin: userInfo.isLogin
				});
			}
			if (filterType === defFilterType.firstDeposit) {
				return (
					(p.promotionType === filterType ||
						p.promotionType === defPromotionType.walletBonus) &&
					!isExpiry({
						...p,
						isLogin: userInfo.isLogin
					})
				);
			}
			if (filterType === defFilterType.rebateAndCashBack) {
				return (
					(p.promotionType === defPromotionType.rebate ||
						p.promotionType === defPromotionType.cashback) &&
					!isExpiry({
						...p,
						isLogin: userInfo.isLogin
					})
				);
			}
			if (
				filterType !== defFilterType.all ||
				filterType !== defFilterType.firstDeposit ||
				filterType !== defFilterType.rebateAndCashBack
			) {
				return (
					p.promotionType === filterType &&
					!isExpiry({
						...p,
						isLogin: userInfo.isLogin
					})
				);
			}

			return false;
		});

		rows = setPromotionCards({
			datas,
			tab,
			userInfo,
			i18n,
			uiSetting,
			ruleCols,
			func_CallBack: getPromotionList,
			urlParameters
		});
	}
	const staticRows =
		tab === defTabs.Processing.key && filterType === defFilterType.all
			? staticList?.map(p => {
					return (
						<CardForStatic
							key={`static-promotion-${userInfo.langId}-${p.bonusCode}`}
							userInfo={userInfo}
							p={p}
							i18n={i18n}
							uiSetting={uiSetting}
						/>
					);
			  })
			: null;

	const noData =
		!rows?.length && !staticRows?.length ? (
			<NoData displayText={i18n.msg_NoData} />
		) : null;

	return (
		<>
			<SpecialBonusCodeInputBox
				tab={tab}
				filterType={filterType}
				i18n={i18n}
				onChange={onChangeSpecialCode}
				value={specialCode}
				onSubmit={onSubmitSpecialCode}
				isLogin={userInfo.isLogin}
				uiSetting={uiSetting}
			/>
			{rows}
			{staticRows}
			{noData}
		</>
	);
};
