import React from "react";
import JoinBtn from "./joinBtn";
import DetailBtn from "./detailBtn";
import PromoRule from "./promotionCard.promoRule";

export default ({
	p,
	_isExpiry,
	_isClaimed,
	_isNew,
	imgSRC,
	func_CallBack,
	i18n = {},
	uiSetting,
	ruleCols
}) => (
	<div
		className={`promodule${_isClaimed ? " open" : ""}${
			_isExpiry ? " Expired" : ""
		}`}>
		{_isClaimed ? (
			<div className="claimed"></div>
		) : _isNew && !_isExpiry ? (
			<div className="new active"></div>
		) : null}
		<img src={imgSRC} alt={p.bonusCode ?? ""} />
		<div className="protitle">{p.title}</div>
		<div className="text">{p.description}</div>
		<PromoRule promotionInfo={p} ruleCols={ruleCols} />
		<div className="btn-group">
			<DetailBtn
				displayText_Detail={i18n?.lbl_Details}
				bonusCode={p.bonusCode}
			/>
			<JoinBtn
				promotionInfo={p}
				func_CallBack={func_CallBack}
				uiSetting={uiSetting}
			/>
		</div>
	</div>
);

export const CardForStatic = ({
	userInfo: { langId },
	p,
	i18n = {},
	uiSetting
}) => (
	<div className="promodule">
		<img src={p.imgUrl?.[langId]} alt={p.bonusCode ?? ""} />
		<div className="protitle">{p.title?.[langId]}</div>
		<div className="text">{p.description?.[langId]}</div>
		<div className="btn-group">
			<a
				className={uiSetting?.detailBtn ?? "white"}
				href={p.bannerLink?.[langId] ?? ""}
				target="_blank"
				rel="noopener noreferrer">
				{i18n?.lbl_Details}
			</a>
		</div>
	</div>
);
