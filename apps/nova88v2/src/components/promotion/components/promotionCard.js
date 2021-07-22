import React from "react";
import PropTypes from "prop-types";
import { Link } from "../../../route/link";
import JoinBtn from "./joinBtn";
import DetailBtn from "./detailBtn";
import PromoRule from "./promoRule";
import { Stamp } from "./stamp";
import { defUrlParamCols } from "../common/def";

const PromotionCard = ({
	p,
	_isExpiry,
	_isClaimed,
	_isNew,
	imgSRC,
	func_CallBack,
	i18n = {},
	uiSetting,
	ruleCols,
	urlParameters,
	userInfo
}) => (
	<div className={`promodule${_isClaimed ? " active" : ""}`}>
		<div className="expiredIcon" />
		<Stamp
			_isClaimed={_isClaimed}
			_isNew={_isNew}
			_isExpiry={_isExpiry}
			filterType={urlParameters?.[defUrlParamCols.filterType]}
			canJoin={p.canJoin}
		/>
		<img src={imgSRC} alt={p.bonusCode ?? ""} />
		<div className="protitle">{p.title}</div>
		<div className="text">{p.description}</div>
		<PromoRule promotionInfo={p} ruleCols={ruleCols} />
		<div className="btn-group">
			<DetailBtn
				displayText_Detail={i18n?.lbl_Details}
				bonusCode={p.bonusCode}
				urlParameters={urlParameters}
				userInfo={userInfo}
				promotionType={p.promotionType}
				promotionLink={p.promotionLink}
				promotionAction={p.promotionAction}
			/>
			<JoinBtn
				promotionInfo={p}
				func_CallBack={func_CallBack}
				uiSetting={uiSetting}
				filterType={urlParameters?.[defUrlParamCols.filterType]}
			/>
		</div>
	</div>
);

PromotionCard.defaultProps = {
	p: {},
	_isExpiry: false,
	_isClaimed: false,
	_isNew: false,
	imgSRC: "",
	func_CallBack: () => null,
	i18n: {},
	uiSetting: {},
	ruleCols: [],
	urlParameters: {},
	userInfo: {}
};

PromotionCard.propTypes = {
	p: PropTypes.objectOf(PropTypes.any),
	_isExpiry: PropTypes.bool,
	_isClaimed: PropTypes.bool,
	_isNew: PropTypes.bool,
	imgSRC: PropTypes.string,
	func_CallBack: PropTypes.func,
	i18n: PropTypes.objectOf(PropTypes.any),
	uiSetting: PropTypes.objectOf(PropTypes.any),
	ruleCols: PropTypes.arrayOf(PropTypes.any),
	urlParameters: PropTypes.objectOf(PropTypes.any),
	userInfo: PropTypes.objectOf(PropTypes.any)
};

export default PromotionCard;

export const CardForStatic = ({
	userInfo: { langId },
	p,
	i18n = {},
	uiSetting
}) => {
	return (
		<div className="promodule">
			<img src={p.imgUrl?.[langId]} alt={p.bonusCode ?? ""} />
			<div className="protitle">{p.title?.[langId]}</div>
			<div className="text">{p.description?.[langId]}</div>
			<div className="btn-group">
				<Link
					className={uiSetting?.detailBtn ?? "white"}
					to={p.bannerLink?.[langId] ?? ""}
					target="_blank"
					rel="noopener noreferrer">
					{i18n?.lbl_Details}
				</Link>
			</div>
		</div>
	);
};
