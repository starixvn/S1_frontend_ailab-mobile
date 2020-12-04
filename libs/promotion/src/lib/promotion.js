import React, {
	useEffect,
	useState,
	useCallback,
	useRef,
	useContext
} from "react";
import { defFilterType, defPromotionType, defTabs } from "./common/def";
import { isExpiry, isClaimed, isNew } from "./common/common";
import Card, { CardForStatic } from "./components/promotionCard";
import Nav from "./components/nav";
import Tab from "./components/tab";
import { NoData } from "@ailab-mobile/common";
import Wrapper from "./common/wrapper";
import { configContext } from "./common/context";
import PropTypes from "prop-types";

export const Promotion = ({ staticList, ...rest }) => {
	return (
		<Wrapper {...rest}>
			<PromotionContent staticList={staticList} />
		</Wrapper>
	);
};

Promotion.propTypes = {
	formatSetting: PropTypes.shape({
		isConvertRequired: PropTypes.bool,
		digits: PropTypes.number
	})
};

const useGetPromotions = ({ api, userInfo: { langId } }) => {
	const [promotion, setPromotion] = useState([]);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	const getPromotionListV2 = useCallback(() => {
		api.promotion.GetPromotionListV2({ langId }).then(res => {
			if (res.data.errorCode === 0 && isMountedRef.current) {
				let result = res.data.data.sort((a, b) =>
					a.periodFrom > b.periodFrom ? -1 : 1
				);

				setPromotion(result);
			}
		});
	}, [langId]);

	useEffect(() => {
		getPromotionListV2();
	}, [getPromotionListV2]);

	return { promotion, getPromotionListV2 };
};

const useHandleTab = () => {
	const [tab, setTab] = useState(defTabs.Processing.key);

	const onClickTab = tabKey => {
		setTab(tabKey);
	};

	return { tab, onClickTab };
};

const useHandleNav = () => {
	const [filterType, setFilterType] = useState(defFilterType.all);

	const onClickFilter = value => {
		setFilterType(value);
	};

	return { filterType, onClickFilter };
};

const PromotionContent = ({ staticList }) => {
	const { uiSetting, userInfo, i18n, api, ruleCols } = useContext(
		configContext
	);
	const { tab, onClickTab } = useHandleTab();
	const { filterType, onClickFilter } = useHandleNav();
	const { promotion, getPromotionListV2 } = useGetPromotions({
		api,
		userInfo
	});

	let rows = promotion
		?.filter(p => {
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
						!isExpiry({ ...p, isLogin: userInfo.isLogin })
					);
				} else {
					return (
						p.promotionType === filterType &&
						!isExpiry({ ...p, isLogin: userInfo.isLogin })
					);
				}
			} else {
				return isExpiry({ ...p, isLogin: userInfo.isLogin });
			}
		})
		.map(p => {
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
					getPromotionListV2={getPromotionListV2}
					i18n={i18n}
					uiSetting={uiSetting}
					ruleCols={ruleCols}
				/>
			);
		});

	let staticRows =
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
				i18n={i18n}
				tab={tab}
				filterType={filterType}
				onClickFilter={onClickFilter}
			/>
			{rows}
			{staticRows}
			{noData}
		</>
	);
};
