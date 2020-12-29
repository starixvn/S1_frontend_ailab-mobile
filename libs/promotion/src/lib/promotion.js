import React, { useContext } from "react";
import {
	defFilterType,
	defPromotionType,
	defTabs,
	defUrlParamCols
} from "./common/def";
import { isExpiry, isClaimed, isNew } from "./common/common";
import Card, { CardForStatic } from "./components/promotionCard";
import Nav, { useHandleNav } from "./components/nav";
import Tab, { useHandleTab } from "./components/tab";
import { NoData } from "@ailab-mobile/common";
import Wrapper from "./common/wrapper";
import { configContext } from "./common/context";
import PropTypes from "prop-types";
import SpecialBonusCodeInputBox from "./components/specialBonusCodeInputBox";
import { useHandleSpecialBonus } from "./hook/useHandleSpecialBonus";
import { useGetPromotions } from "./hook/useGetPromotions";

export const Promotion = ({ staticList, location, navBar, ...rest }) => {
	return (
		<Wrapper {...rest}>
			<PromotionContent
				staticList={staticList}
				location={location}
				navBar={navBar}
			/>
		</Wrapper>
	);
};

Promotion.propTypes = {
	formatSetting: PropTypes.shape({
		isConvertRequired: PropTypes.bool,
		digits: PropTypes.number
	})
};

const setPromotionCards = ({
	datas,
	tab,
	userInfo,
	i18n,
	uiSetting,
	ruleCols,
	func_CallBack,
	urlParameters
}) => {
	return datas.map(p => {
		let imgSRC = p.banner;
		let _isClaimed = isClaimed(p);
		let _isNew = _isClaimed ? false : isNew(p);
		let _isExpiry = tab === defTabs.Expired.key;
		return (
			<Card
				key={`promotion-${userInfo.langId}-${p.bonusCode}`}
				p={p}
				_isExpiry={_isExpiry}
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

const getFilterType = ({ location, column }) => {
	const state = location?.state;
	return state?.[column]
		? isNaN(state?.[column])
			? state?.[column]
			: Number(state?.[column])
		: undefined;
};

const PromotionContent = ({ staticList, location, navBar }) => {
	const { uiSetting, userInfo, i18n, api, ruleCols } = useContext(
		configContext
	);
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
	const { promotion, getPromotionListV2 } = useGetPromotions({
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
		rows = setPromotionCards({
			datas: specialBonusDatas,
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
			if (tab === defTabs.Processing.key) {
				if (filterType === defFilterType.all) {
					return !isExpiry({
						...p,
						isLogin: userInfo.isLogin
					});
				} else if (filterType === defFilterType.firstDeposit) {
					return (
						(p.promotionType === filterType ||
							p.promotionType === defPromotionType.walletBonus) &&
						!isExpiry({
							...p,
							isLogin: userInfo.isLogin
						})
					);
				} else {
					return (
						p.promotionType === filterType &&
						!isExpiry({
							...p,
							isLogin: userInfo.isLogin
						})
					);
				}
			} else {
				return isExpiry({
					...p,
					isLogin: userInfo.isLogin
				});
			}
		});

		rows = setPromotionCards({
			datas,
			tab,
			userInfo,
			i18n,
			uiSetting,
			ruleCols,
			func_CallBack: getPromotionListV2,
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

	let noData =
		!rows?.length && !staticRows ? (
			<NoData displayText={i18n.msg_NoData} />
		) : null;

	return (
		<>
			<Tab i18n={i18n} tab={tab} onClickTab={onClickTab} />
			<Nav
				navBar={navBar}
				i18n={i18n}
				tab={tab}
				filterType={filterType}
				onClickFilter={onClickFilter}
				isLogin={userInfo.isLogin}
			/>
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
