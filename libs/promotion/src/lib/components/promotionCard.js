import React from "react";
import PropTypes from "prop-types";
import { JoinBtn } from "./joinBtn";
import DetailBtn from "./detailBtn";
// import PromoRule from "./promoRule";
import { Stamp } from "./stamp";
import ProcessBar from "./processBar";

const PromotionCard = ({
	p,
	_isClaimed,
	_isNew,
	imgSRC,
	func_CallBack,
	i18n = {},
	uiSetting = {},
	// ruleCols,
	filterType,
	clickMoreInfo,
	userInfo,
	RefreshProcessBar,
	config
}) => {
	const getPromoStyle = () => {
		let promoStyle = uiSetting?.defPromoDisplayStyle?.default;
		if (_isClaimed && uiSetting?.defPromoDisplayStyle?.claimed) {
			promoStyle = uiSetting?.defPromoDisplayStyle?.claimed;
		} else if (_isNew && uiSetting?.defPromoDisplayStyle?.new) {
			promoStyle = uiSetting?.defPromoDisplayStyle?.new;
		}
		//  此段 expired 顯示邏輯因市場需求調整 先隱藏處理 如果後來需求有做調整在打開
		// else if (
		// 	(!CanJoin({
		// 		canJoin: p.canJoin,
		// 		filterType: p.filterType ?? filterType
		// 	}) ||
		// 		p.beenUsed) &&
		// 	uiSetting?.defPromoDisplayStyle?.expired
		// ) {
		// 	promoStyle = uiSetting?.defPromoDisplayStyle?.expired;
		// }

		return promoStyle;
	};

	const promoStyle = getPromoStyle();

	return (
		<div className={promoStyle}>
			<Stamp
				_isClaimed={_isClaimed}
				_isNew={_isNew}
				filterType={filterType}
				canJoin={p.canJoin}
				uiSetting={uiSetting}
			/>
			<img src={imgSRC} alt={p.bonusCode ?? ""} />
			<div className="protitle">{p.title}</div>
			<div className={uiSetting?.description ?? "text"}>
				{p.description}
			</div>
			{/* <PromoRule promotionInfo={p} ruleCols={ruleCols} /> */}
			<ProcessBar
				{...p}
				RefreshProcessBar={RefreshProcessBar.bind(this, p)}
			/>
			<div className="btn-group">
				<DetailBtn
					displayText_Detail={i18n?.lbl_More_Info}
					promotionType={p.promotionType}
					promotionLink={p.promotionLink}
					promotionAction={p.promotionAction}
					clickMoreInfo={clickMoreInfo.bind(
						this,
						userInfo.langId,
						p.bonusCode,
						filterType
					)}
				/>
				<JoinBtn
					promotionInfo={p}
					func_CallBack={func_CallBack}
					uiSetting={uiSetting}
					filterType={filterType}
					config={config}
					isLogin={config?.userInfo}
				/>
			</div>
		</div>
	);
};

PromotionCard.defaultProps = {
	p: {},
	_isClaimed: false,
	_isNew: false,
	imgSRC: "",
	func_CallBack: () => null,
	i18n: {},
	uiSetting: {},
	userInfo: {},
	filterType: null,
	clickMoreInfo: () => null,
	RefreshProcessBar: () => null,
	config: null
};

PromotionCard.propTypes = {
	p: PropTypes.objectOf(PropTypes.any),
	_isClaimed: PropTypes.bool,
	_isNew: PropTypes.bool,
	imgSRC: PropTypes.string,
	func_CallBack: PropTypes.func,
	i18n: PropTypes.objectOf(PropTypes.any),
	uiSetting: PropTypes.objectOf(PropTypes.any),
	filterType: PropTypes.string,
	clickMoreInfo: PropTypes.func,
	userInfo: PropTypes.objectOf(PropTypes.any),
	RefreshProcessBar: PropTypes.func,
	config: PropTypes.objectOf(PropTypes.any)
};

export const CardForStatic = ({
	userInfo: { langId },
	p,
	i18n = {},
	uiSetting
}) => (
	<div className="promodule">
		<img src={p.imgUrl?.[langId]} alt={p.bonusCode ?? ""} />
		<div className="protitle">{p.title?.[langId]}</div>
		<div className={uiSetting?.description ?? "text"}>
			{p.description?.[langId]}
		</div>
		<div className="btn-group">
			<a
				className={uiSetting?.detailBtn ?? "white"}
				href={p.bannerLink?.[langId] ?? ""}
				target="_blank"
				rel="noopener noreferrer">
				{i18n?.lbl_More_Info}
			</a>
		</div>
	</div>
);

CardForStatic.defaultProps = {
	p: {},
	i18n: {},
	uiSetting: {},
	userInfo: {}
};

CardForStatic.propTypes = {
	p: PropTypes.objectOf(PropTypes.any),
	i18n: PropTypes.objectOf(PropTypes.any),
	uiSetting: PropTypes.objectOf(PropTypes.any),
	userInfo: PropTypes.objectOf(PropTypes.any)
};

export default PromotionCard;
