import React, { useContext } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import {
	defFilterType,
	defPromotionType,
	defWalletType,
	defCategoryId
} from "./common/def";
import { isExpiry, isClaimed, isNew } from "./common/common";
import Card, { CardForStatic } from "./components/promotionCard";
import { configContext } from "./common/context";
import SpecialBonusCodeInputBox from "./components/specialBonusCodeInputBox";
import { useHandleSpecialBonus } from "./hook/useHandleSpecialBonus";
import { useGetPromotions } from "./hook/useGetPromotions";
import { useHandlePromotionInfo } from "./promotionInfo.popbox";

export const Promotion = ({ staticList, filterType }) => (
	<PromotionContent staticList={staticList} filterType={filterType} />
);

Promotion.defaultProps = {
	formatSetting: {},
	staticList: [],
	filterType: 0
};

Promotion.propTypes = {
	formatSetting: PropTypes.shape({
		isConvertRequired: PropTypes.bool,
		digits: PropTypes.number
	}),
	staticList: PropTypes.arrayOf(PropTypes.any),
	filterType: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
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
	clickMoreInfo
}) => {
	return datas.map(p => {
		const imgSRC = p.banner;
		const _isClaimed = isClaimed(p);
		const _isNew = _isClaimed ? false : isNew(p);
		const isDisplay =
			moment.unix(p.displayFrom).diff(Date.now()) <= 0 &&
			moment.unix(p.displayTo).diff(Date.now()) >= 0;

		return (
			isDisplay && (
				<Card
					key={`promotion-${userInfo.langId}-${p.bonusCode}`}
					_isClaimed={_isClaimed}
					_isNew={_isNew}
					imgSRC={imgSRC}
					func_CallBack={func_CallBack}
					i18n={i18n}
					uiSetting={uiSetting}
					userInfo={userInfo}
					p={p}
					ruleCols={ruleCols}
					filterType={filterType}
					promotionInfo={p}
					RefreshProcessBar={RefreshProcessBar}
					clickMoreInfo={clickMoreInfo}
				/>
			)
		);
	});
};

const PromotionContent = ({ staticList, filterType }) => {
	const { getPromotionDetail } = useHandlePromotionInfo({ filterType });

	const clickMoreInfo = (langId, bonusCode) => {
		getPromotionDetail(langId, bonusCode);
	};

	const { uiSetting, userInfo, i18n, api, ruleCols } = useContext(
		configContext
	);

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
	} = useHandleSpecialBonus({ langId: userInfo.langId, filterType });

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
			userInfo,
			i18n,
			uiSetting,
			ruleCols,
			func_CallBack: GetSpecialBonusList,
			filterType,
			RefreshProcessBar: specialBonusRefreshProcessBar,
			clickMoreInfo
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
						p.categoryId === defCategoryId.Mega888SlotRNGFishing ||
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

			if (
				filterType !== defFilterType.all ||
				filterType !== defFilterType.firstDeposit
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
			userInfo,
			i18n,
			uiSetting,
			ruleCols,
			func_CallBack: getPromotionList,
			filterType,
			RefreshProcessBar: refreshProcessBar,
			clickMoreInfo
		});
	}
	const staticRows =
		filterType === defFilterType.all
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
			<div className="nodata icon icon-nodata">
				<div className="txt-white">{i18n.msg_NoData}</div>
			</div>
		) : null;

	return (
		<>
			<SpecialBonusCodeInputBox
				i18n={i18n}
				value={specialCode}
				onChange={onChangeSpecialCode}
				onSubmit={onSubmitSpecialCode}
				filterType={filterType}
				isLogin={userInfo.isLogin}
			/>
			{rows}
			{staticRows}
			{noData}
		</>
	);
};

PromotionContent.defaultProps = {
	staticList: null,
	filterType: null
};

PromotionContent.propTypes = {
	staticList: PropTypes.arrayOf(PropTypes.any),
	filterType: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
