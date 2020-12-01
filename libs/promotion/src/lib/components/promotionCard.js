import React from "react";
import JoinBtn from "./joinBtn";
import RemainTime from "../common/remainTime";
import { number_format, isConvert } from "@ailab-mobile/common";
import DetailBtn from "./detailBtn";

const defRuleCols = {
	minAmount: "minAmount",
	requiredAmount: "requiredAmount",
	rollOver: "rollOver"
};

export const PromoRule = ({ promotionInfo, i18n, isLogin, currencyId }) => {
	return (
		<div className="rollover">
			<div>
				{promotionInfo.requiredAmount > 0 ? (
					<>
						<div className="icon icon-icon32px_money">
							{i18n.lbl_MinAmount}
						</div>
						<div>
							{number_format(
								promotionInfo.requiredAmount,
								isConvert(currencyId)
							)}
						</div>
					</>
				) : null}
				<div className="icon icon-icon32px_time">
					{i18n.lbl_RemainingTime}
				</div>
				<div>
					{RemainTime({
						promotionInfo,
						i18n,
						isLogin
					})}
				</div>
				<div className="icon icon-icon32px_">{i18n.lbl_RollOver}</div>
				<div>{promotionInfo.rollOver}X</div>
			</div>
		</div>
	);
};

export const CardWithoutRule = ({
	uiSetting,
	href,
	promotion,
	imgSRC,
	detailsDisplayText
}) => (
	<div
		href={href}
		className="promodule"
		target="_blank"
		rel="noopener noreferrer">
		<img src={imgSRC} alt={promotion.imgName ?? ""} />
		<div className="protitle">{promotion.title}</div>
		<div className="text">{promotion.description}</div>
		<div className="btn-group">
			<button className={uiSetting?.detailBtn ?? "white"}>
				{detailsDisplayText}
			</button>
		</div>
	</div>
);

export default ({
	p,
	userInfo,
	_isExpiry,
	_isClaimed,
	_isNew,
	imgSRC,
	getPromotionListV2,
	i18n,
	uiSetting
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
		<PromoRule
			promotionInfo={p}
			i18n={i18n}
			isLogin={userInfo.isLogin}
			currencyId={userInfo.currencyId}
		/>
		<div className="btn-group">
			<DetailBtn
				displayText_Detail={i18n.lbl_Details}
				bonusCode={p.bonusCode}
			/>
			<JoinBtn
				promotionInfo={p}
				func_CallBack={getPromotionListV2}
				uiSetting={uiSetting}
			/>
		</div>
	</div>
);

export const CardForStatic = ({ userInfo, p, i18n, uiSetting }) => (
	<div className="promodule">
		<img src={p.imgUrl?.[userInfo.langId]} alt={p.bonusCode ?? ""} />
		<div className="protitle">{p.title?.[userInfo.langId]}</div>
		<div className="text">{p.description?.[userInfo.langId]}</div>
		<div className="btn-group">
			<a
				className={uiSetting?.detailBtn ?? "white"}
				href={p.bannerLink?.[userInfo.langId] ?? ""}
				target="_blank"
				rel="noopener noreferrer">
				{i18n.lbl_Details}
			</a>
		</div>
	</div>
);
