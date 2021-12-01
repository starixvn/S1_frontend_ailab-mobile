import React, { useContext } from "react";
import { NoData } from "@ailab-mobile/common";
import PropTypes from "prop-types";
import {
	defFilterType,
	defPromotionType,
	defUrlParamCols,
	defWalletType,
	defCategoryId
} from "./common/def";
import { isExpiry, isClaimed, isNew } from "./common/common";
import Card, { CardForStatic } from "./components/promotionCard";
import Nav, { useHandleNav } from "./components/nav";
import Wrapper from "./common/wrapper";
import { configContext } from "./common/context";
import SpecialBonusCodeInputBox from "./components/specialBonusCodeInputBox";
import { useHandleSpecialBonus } from "./hook/useHandleSpecialBonus";
import { useGetPromotions } from "./hook/useGetPromotions";
import { useHandlePromotionInfo } from "./promotionInfo.popbox";

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

Promotion.defaultProps = {
	formatSetting: {}
};

Promotion.propTypes = {
	formatSetting: PropTypes.shape({
		isConvertRequired: PropTypes.bool,
		digits: PropTypes.number
	})
};

const setPromotionCards = ({
	datas,
	userInfo,
	i18n,
	uiSetting,
	ruleCols,
	func_CallBack,
	filterType,
	RefreshProcessBar,
	clickMoreInfo,
	config
}) => {
	return datas.map(p => {
		const imgSRC = p.banner;
		const _isClaimed = isClaimed(p);
		const _isNew = _isClaimed ? false : isNew(p);
		return (
			<Card
				key={`promotion-${userInfo.langId}-${p.bonusCode}`}
				p={p}
				_isClaimed={_isClaimed}
				_isNew={_isNew}
				imgSRC={imgSRC}
				func_CallBack={func_CallBack}
				i18n={i18n}
				uiSetting={uiSetting}
				ruleCols={ruleCols}
				filterType={filterType}
				RefreshProcessBar={RefreshProcessBar}
				clickMoreInfo={clickMoreInfo}
				userInfo={userInfo}
				config={config}
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
	const config = useContext(configContext);
	const { uiSetting, userInfo, i18n, api, ruleCols } = config;

	const { getPromotionDetail } = useHandlePromotionInfo({ config });

	const clickMoreInfo = (langId, bonusCode, filterType) => {
		getPromotionDetail(langId, bonusCode, filterType);
	};

	const { filterType, onClickFilter } = useHandleNav({
		defaultValue: getFilterType({
			location,
			column: defUrlParamCols.filterType
		}),
		isLogin: userInfo.isLogin
	});
	const { promotion, getPromotionList, refreshProcessBar } = useGetPromotions(
		{
			api,
			userInfo
		}
	);

	const {
		onChangeSpecialCode,
		specialCode,
		onSubmitSpecialCode,
		specialBonusDatas,
		GetSpecialBonusList,
		refreshProcessBar: specialBonusRefreshProcessBar
	} = useHandleSpecialBonus({ api, langId: userInfo.langId, filterType });

	let rows = [];
	if (filterType === defFilterType.specialBonus) {
		rows = setPromotionCards({
			datas: specialBonusDatas,
			userInfo,
			i18n,
			uiSetting,
			ruleCols,
			func_CallBack: GetSpecialBonusList,
			filterType,
			RefreshProcessBar: specialBonusRefreshProcessBar,
			clickMoreInfo,
			config
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
					(p.promotionType === defPromotionType.firstDeposit ||
						p.promotionType === defPromotionType.walletBonus) &&
					!isExpiry({
						...p,
						isLogin: userInfo.isLogin
					})
				);
			}

			if (filterType === defFilterType.sportsbook) {
				return (
					p.categoryId === defCategoryId.SabaSports &&
					!isExpiry({
						...p,
						isLogin: userInfo.isLogin
					})
				);
			}

			if (filterType === defFilterType.liveCasino) {
				return (
					(p.categoryId === defCategoryId.PtLiveCasino ||
						(p.walletType === defWalletType.Seamless &&
							p.categoryId === defCategoryId.LiveCasino)) &&
					!isExpiry({
						...p,
						isLogin: userInfo.isLogin
					})
				);
			}

			if (filterType === defFilterType.slots) {
				return (
					(p.categoryId === defCategoryId.PtSlots ||
						(p.walletType === defWalletType.Seamless &&
							p.categoryId === defCategoryId.Slots)) &&
					!isExpiry({
						...p,
						isLogin: userInfo.isLogin
					})
				);
			}

			if (filterType === defFilterType.other) {
				return (
					p.promotionType === defPromotionType.static &&
					!isExpiry({
						...p,
						isLogin: userInfo.isLogin
					})
				);
			}

			return (
				p.promotionType === filterType &&
				!isExpiry({
					...p,
					isLogin: userInfo.isLogin
				})
			);
		});

		rows = setPromotionCards({
			datas,
			userInfo,
			i18n,
			uiSetting,
			ruleCols,
			func_CallBack: getPromotionList,
			filterType,
			RefreshProcessBar: refreshProcessBar,
			clickMoreInfo,
			config
		});
	}
	const staticRows =
		filterType === defFilterType.all &&
		staticList?.map(p => {
			return (
				<CardForStatic
					key={`static-promotion-${userInfo.langId}-${p.bonusCode}`}
					userInfo={userInfo}
					p={p}
					i18n={i18n}
					uiSetting={uiSetting}
				/>
			);
		});

	const noData =
		!rows?.length && !staticRows?.length ? (
			<NoData displayText={i18n.msg_NoData} />
		) : null;

	return (
		<>
			<Nav
				navBar={navBar}
				i18n={i18n}
				filterType={filterType}
				onClickFilter={onClickFilter}
				isLogin={userInfo.isLogin}
			/>
			<SpecialBonusCodeInputBox
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
