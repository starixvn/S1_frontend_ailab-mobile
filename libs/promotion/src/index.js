export * from "./lib/promotion";
export * from "./lib/components/promoRule";
// * common
export { defRuleCols, defNav, defPromotionType } from "./lib/common/def";
export { configContext } from "./lib/common/context";
export {
	defCategoryId,
	defFilterType,
	defUrlParamCols,
	defWalletType,
	defPromotionNav,
	defBonusType
} from "./lib/common/def";
export { default as Wrapper } from "./lib/common/wrapper";
export { default as RemainTime } from "./lib/common/remainTime";
export {
	isExpiry,
	isClaimed,
	isNew,
	CanJoin,
	getUrlParameter,
	number_format
} from "./lib/common/common";
// * components
export { JoinBtn } from "./lib/components/joinBtn";
export { useHandleNav, default as Nav } from "./lib/components/nav";
export { default as SpecialBonusCodeInputBox } from "./lib/components/specialBonusCodeInputBox";
export { CardForStatic, default as Card } from "./lib/components/promotionCard";
export { default as DepositRecord } from "./lib/components/depositRecord";
export { default as PromoRule } from "./lib/components/promoRule";
export { default as CashBackInfo } from "./lib/components/cashBackInfo";
export { Stamp } from "./lib/components/stamp";
export { default as ProcessBar } from "./lib/components/processBar";
export { default as DetailBtn } from "./lib/components/detailBtn";
// * hook
export { useHandlePopBox } from "./lib/hook/useHandlePopBox";
export { useRefreshProcessBar } from "./lib/hook/useRefreshProcessBar";
export { useHandleSpecialBonus } from "./lib/hook/useHandleSpecialBonus";
export { useGetPromotions } from "./lib/hook/useGetPromotions";

export { useHandlePromotionInfo } from "./lib/promotionInfo.popbox";
