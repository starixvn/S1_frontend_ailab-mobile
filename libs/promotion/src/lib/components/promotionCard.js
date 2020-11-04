import React from "react";
import JoinBtn from "./joinBtn";
import RemainTime from "../common/remainTime";
import { number_format } from "@ailab-mobile/common";
import DetailBtn from "./detailBtn";
import { Promotion as UIPromotion } from "UISetting";

export const CardWithoutRule = ({
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
			<button
				className={UIPromotion?.promotionCard?.detailBtn ?? "white"}>
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
	i18n
}) => (
	<div
		className={`promodule${_isClaimed ? " open" : ""}${
			_isExpiry ? " Expired" : ""
		}`}>
		{_isClaimed ? (
			<div className="claimed"></div>
		) : _isNew ? (
			<div className="new active"></div>
		) : null}
		<img src={imgSRC} alt={p.bonusCode ?? ""} />
		<div className="protitle">{p.title}</div>
		<div className="text">{p.description}</div>
		<div className="rollover">
			<div>
				{p.requiredAmount > 0 ? (
					<>
						<div className="icon icon-icon32px_money">
							{i18n.lbl_MinAmount}
						</div>
						<div>
							{number_format(
								p.requiredAmount,
								isConvert(userInfo.currencyId)
							)}
						</div>
					</>
				) : null}
				<div className="icon icon-icon32px_time">
					{i18n.lbl_RemainingTime}
				</div>
				<div>
					{RemainTime({
						promotionInfo: p,
						i18n,
						isLogin: userInfo.isLogin
					})}
				</div>
				<div className="icon icon-icon32px_">{i18n.lbl_RollOver}</div>
				<div>{p.rollOver ? p.rollOver : 1}X</div>
			</div>
		</div>
		<div className="btn-group">
			<DetailBtn
				displayText_Detail={i18n.lbl_Details}
				bonusCode={p.bonusCode}
				class_DetailBtn={UIPromotion?.promotionCard?.detailBtn}
			/>
			<JoinBtn
				promotionInfo={p}
				func_CallBack={getPromotionListV2}
				class_JoinNowBtn={UIPromotion?.promotionCard?.joinNow}
			/>
		</div>
	</div>
);

export const CardForStatic = ({ userInfo, p, i18n }) => (
	<div className="promodule">
		<img src={p.imgUrl?.[userInfo.langId]} alt={p.bonusCode ?? ""} />
		<div className="protitle">{p.title?.[userInfo.langId]}</div>
		<div className="text">{p.description?.[userInfo.langId]}</div>
		<div className="btn-group">
			<a
				className={UIPromotion?.promotionCard?.detailBtn ?? "white"}
				href={p.bannerLink?.[userInfo.langId]}
				target="_blank"
				rel="noopener noreferrer">
				{i18n.lbl_Details}
			</a>
		</div>
	</div>
);
