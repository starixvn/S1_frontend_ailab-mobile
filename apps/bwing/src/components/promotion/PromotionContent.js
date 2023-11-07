import React, { useContext } from "react";
import PropTypes from "prop-types";
import moment from "moment/moment";
import {
	configContext,
	defCategoryId,
	defFilterType,
	defPromotionType,
	defUrlParamCols,
	defWalletType,
	isClaimed,
	isExpiry,
	isNew,
	useGetPromotions,
	useHandleNav,
	useHandleSpecialBonus
} from "@ailab-mobile/promotion";
import NavBar from "./promotionNav";
import SpecialBonusCodeInputBox from "./SpecialBonusCodeInputBox";
import PromotionCard from "./promotionCard";
import useHandlePromotionInfo from "./promotionDetail/promotionInfo.popbox";

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
		const timezone = moment().format("Z");
		const isDisplay =
			moment.unix(p.displayFrom).subtract(timezone).diff(moment()) <= 0 &&
			moment.unix(p.displayTo).subtract(timezone).diff(moment()) >= 0;

		return (
			isDisplay && (
				<PromotionCard
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
			)
		);
	});
};

const getFilterType = ({ location, column }) => {
	const state = location?.state;

	let filterType = null;
	if (state?.[column]) {
		filterType = isNumber(state?.[column])
			? state?.[column]
			: Number(state?.[column]);
	}

	return filterType;
};

const PromotionContent = ({ location, navBar }) => {
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
	const {
		promotion,
		getPromotionList,
		refreshProcessBar
	} = useGetPromotions({ api, userInfo });

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
					(p.categoryId === defCategoryId.SabaSports ||
						p.categoryId === defCategoryId.SBSW) &&
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

	const noData = !rows?.length ? (
		<div className="nodata icon icon-nodata">
			<div className="txt-white">{i18n.msg_NoData}</div>
		</div>
	) : null;

	return (
		<div className="wrapper">
			<div className="col-12">
				<NavBar
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
				<div className="lobby-promotion">{rows}</div>
				{noData}
			</div>
		</div>
	);
};

export default PromotionContent;

PromotionContent.defaultProps = {
	location: null,
	navBar: null
};

PromotionContent.propTypes = {
	location: PropTypes.objectOf(PropTypes.any),
	navBar: PropTypes.arrayOf(PropTypes.any)
};
