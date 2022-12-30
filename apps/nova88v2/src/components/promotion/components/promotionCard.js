import React from "react";
import PropTypes from "prop-types";
import { Link } from "../../../route/link";
import JoinBtn from "./joinBtn";
import DetailBtn from "./detailBtn";
import { Stamp } from "./stamp";
import ProcessBar from "./processBar";
// import PromoRule from "./promoRule";

const PromotionCard = ({
	p,
	_isClaimed,
	_isNew,
	imgSRC,
	func_CallBack,
	i18n = {},
	uiSetting,
	userInfo,
	// ruleCols,
	promotionInfo,
	RefreshProcessBar,
	clickMoreInfo,
	filterType
}) => (
	<div
		className={`promodule${_isClaimed ? " active" : ""}${
			p.beenUsed ? " expirModule" : ""
		}`}>
		<Stamp
			_isClaimed={_isClaimed}
			_isNew={_isNew}
			filterType={filterType}
			canJoin={p.canJoin}
		/>
		<img src={imgSRC} alt={p.bonusCode ?? ""} />
		<div className="protitle">{p.title}</div>
		<div className="text">{p.description}</div>
		{/* <PromoRule promotionInfo={p} ruleCols={ruleCols} /> */}
		<ProcessBar
			{...promotionInfo}
			RefreshProcessBar={RefreshProcessBar.bind(this, promotionInfo)}
		/>
		<div className="btn-group">
			<JoinBtn
				promotionInfo={p}
				func_CallBack={func_CallBack}
				uiSetting={uiSetting}
				filterType={filterType}
			/>
			<DetailBtn
				displayText_Detail={i18n?.lbl_More_Info}
				promotionType={p.promotionType}
				promotionLink={p.promotionLink}
				promotionAction={p.promotionAction}
				clickMoreInfo={clickMoreInfo.bind(
					this,
					userInfo.langId,
					p.bonusCode
				)}
			/>
		</div>
	</div>
);

PromotionCard.defaultProps = {
	p: {},
	_isClaimed: false,
	_isNew: false,
	imgSRC: "",
	func_CallBack: () => null,
	i18n: {},
	uiSetting: {},
	userInfo: {}
};

PromotionCard.propTypes = {
	p: PropTypes.objectOf(PropTypes.any),
	_isClaimed: PropTypes.bool,
	_isNew: PropTypes.bool,
	imgSRC: PropTypes.string,
	func_CallBack: PropTypes.func,
	i18n: PropTypes.objectOf(PropTypes.any),
	uiSetting: PropTypes.objectOf(PropTypes.any),
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
			<img src={p.imgUrl?.[langId]} alt={p.description ?? ""} />
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
