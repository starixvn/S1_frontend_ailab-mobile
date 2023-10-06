import React from "react";
import PropTypes from "prop-types";
import {
	JoinBtn,
	CanJoin,
	ProcessBar,
	DetailBtn
} from "@ailab-mobile/promotion";

const PromotionCard = ({
	p,
	_isClaimed,
	_isNew,
	imgSRC,
	func_CallBack,
	i18n = {},
	uiSetting = {},
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
		} else if (
			(!CanJoin({
				canJoin: p.canJoin,
				filterType: p.filterType ?? filterType
			}) ||
				p.beenUsed) &&
			uiSetting?.defPromoDisplayStyle?.expired
		) {
			promoStyle = uiSetting?.defPromoDisplayStyle?.expired;
		}

		return promoStyle;
	};

	return (
		<div className={getPromoStyle()}>
			<div className="lobby-promotion-img">
				<img src={imgSRC} alt={p.bonusCode ?? ""} />
			</div>

			<ProcessBar
				{...p}
				RefreshProcessBar={RefreshProcessBar.bind(this, p)}
			/>
			<div className="btn-group">
				<JoinBtn
					promotionInfo={p}
					func_CallBack={func_CallBack}
					uiSetting={uiSetting}
					filterType={filterType}
					config={config}
					isLogin={config?.userInfo}
				/>
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

export default PromotionCard;
