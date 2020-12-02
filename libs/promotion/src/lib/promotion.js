import React, {
	useEffect,
	useState,
	useCallback,
	useRef,
	useContext
} from "react";
import { defFilterType, defPromotionType, defTabs } from "./common/def";
import { isExpiry, isClaimed, isNew } from "./common/common";
import Card, {
	CardForStatic,
	CardWithoutRule
} from "./components/promotionCard";
import Nav from "./components/nav";
import Tab from "./components/tab";
import { NoData } from "@ailab-mobile/common";
import Wrapper from "./common/wrapper";
import { configContext } from "./common/context";

export const Promotion = props => {
	const { staticList, ...rest } = props;
	return (
		<Wrapper {...rest}>
			<PromotionContent staticList={staticList} />
		</Wrapper>
	);
};

const PromotionContent = ({ staticList }) => {
	const {
		config,
		uiSetting,
		userInfo,
		i18n,
		api,
		ruleCols,
		divisionBy1000
	} = useContext(configContext);
	const [promotion, setPromotion] = useState([]);
	const [tab, setTab] = useState(defTabs.Processing.key);
	const [filterType, setFilterType] = useState(defFilterType.all);
	const isMountedRef = useRef(null);
	// const [staticList, setStaticList] = useState([]);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	const getPromotionListV2 = useCallback(() => {
		api.promotion
			.GetPromotionListV2({
				langId: userInfo.langId
			})
			.then(res => {
				if (res.data.errorCode === 0 && isMountedRef.current) {
					let result = res.data.data.sort((a, b) => {
						return a.periodFrom > b.periodFrom ? -1 : 1;
					});

					setPromotion(result);
				}
			});
	}, [userInfo.langId]);

	useEffect(() => {
		getPromotionListV2();

		// fetch(siteInfo().staticPromotions)
		// 	.then(res => {
		// 		return res.json();
		// 	})
		// 	.then(data => {
		// 		setStaticList(data);
		// 	});
	}, [getPromotionListV2]);

	const onClickTab = tabKey => {
		setTab(tabKey);
	};

	const onClickFilter = value => {
		setFilterType(value);
	};

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
			if (p.actionLink?.startsWith("Promotion/Bonus?")) {
				let lang =
					p.fromDB || p.lang.includes(userInfo.langId)
						? userInfo.langId
						: "en";
				let actionLinkByLang = p.fromDB
					? null
					: p.actionLinkByLang?.find(a => a.lang === userInfo.langId);
				let actionLink = actionLinkByLang
					? actionLinkByLang.link
					: p.actionLink;

				let href = `${config.t_and_cURL}${
					p.urlWithLang || p.fromDB ? `/${lang}` : ""
				}/${actionLink}`;

				let imgSRC = p.fromDB
					? p.imgURL
					: `${config.imgUrl}/CMS/${
							siteInfo().siteName
					  }/Promotion/${lang}/${p.img}`;

				return (
					<CardWithoutRule
						key={`promotion-${langId}-${promotion.bonusCode}`}
						href={href}
						promotion={p}
						imgSRC={imgSRC}
						detailsDisplayText={i18n.lbl_Details}
						uiSetting={uiSetting}
					/>
				);
			} else {
				let imgSRC = p.banner;
				let _isClaimed = isClaimed(p);
				let _isNew = _isClaimed ? false : isNew(p);
				let _isExpiry = tab === defTabs.Expired.key;
				return (
					<Card
						key={`promotion-${userInfo.langId}-${p.bonusCode}`}
						p={p}
						userInfo={userInfo}
						_isExpiry={_isExpiry}
						_isClaimed={_isClaimed}
						_isNew={_isNew}
						imgSRC={imgSRC}
						getPromotionListV2={getPromotionListV2}
						i18n={i18n}
						uiSetting={uiSetting}
						ruleCols={ruleCols}
						divisionBy1000={divisionBy1000}
					/>
				);
			}
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
