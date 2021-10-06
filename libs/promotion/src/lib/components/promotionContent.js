import React from "react";
import { Link } from "@reach/router";
import JoinBtn from "./joinBtn";
import DepositRecord from "./depositRecord";
import ProcessBar from "./processBar";
import PromoRule from "./promoRule";
import { Stamp } from "./stamp";
import { CanJoin } from "../common/common";
import { defUrlParamCols } from "../common/def";
import CashBackInfo from "./cashBackInfo";

export default ({
	path,
	uiSetting = {},
	promotionInfo,
	i18n = {},
	_isExpiry,
	_isClaimed,
	_isNew,
	GetPromotionDetail,
	RefreshProcessBar,
	ruleCols,
	currencyId,
	urlParameters = {}
}) => (
	<div
		className={`promodule${promotionInfo.isJoin ? " open" : ""}${
			!CanJoin({
				canJoin: promotionInfo.canJoin,
				filterType: urlParameters?.[defUrlParamCols.filterType]
			}) || promotionInfo.beenUsed
				? " Expired"
				: ""
		}`}>
		<Stamp
			_isClaimed={_isClaimed}
			_isNew={_isNew}
			_isExpiry={_isExpiry}
			filterType={urlParameters?.[defUrlParamCols.filterType]}
			canJoin={promotionInfo.canJoin}
			uiSetting={uiSetting}
		/>
		<img src={promotionInfo.banner} alt={promotionInfo.title} />
		<Link
			className="btn-cancel"
			to={`/${path.promotion.root}`}
			state={urlParameters}>
			{i18n?.lbl_Back}
		</Link>
		<JoinBtn
			promotionInfo={promotionInfo}
			func_GetPromotionDetail={GetPromotionDetail}
			uiSetting={uiSetting}
			filterType={urlParameters?.[defUrlParamCols.filterType]}
		/>
		<div className="protitle">{promotionInfo.title}</div>
		<div className="text">{promotionInfo.description}</div>
		<DepositRecord
			promotionInfo={promotionInfo}
			i18n={i18n}
			currencyId={currencyId}
			filterType={urlParameters?.[defUrlParamCols.filterType]}
		/>
		<ProcessBar
			{...promotionInfo}
			RefreshProcessBar={RefreshProcessBar.bind(this, promotionInfo)}
		/>
		<PromoRule
			promotionInfo={promotionInfo}
			ruleCols={ruleCols}
			isList={false}
		/>

		<CashBackInfo cashBackDetails={promotionInfo.cashBackDetails} />
		<div
			className="text"
			dangerouslySetInnerHTML={{
				__html: `<pre>${promotionInfo.details}</pre>`
			}}
		/>
	</div>
);
