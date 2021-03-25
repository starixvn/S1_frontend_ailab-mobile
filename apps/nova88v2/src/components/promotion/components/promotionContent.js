import React from "react";
import DepositRecord from "./depositRecord";
import PromoRule from "./promotionContent.promoRule";
import { Stamp } from "./stamp";
import { CanJoin } from "../common/common";
import { defUrlParamCols } from "../common/def";

export default ({
	promotionInfo,
	i18n = {},
	_isExpiry,
	_isClaimed,
	_isNew,
	ruleCols,
	currencyId,
	urlParameters = {},
	Class = "promodule"
}) => (
	<div
		className={`${Class}${promotionInfo.isJoin ? " active" : ""}${
			CanJoin({
				_isExpiry,
				canJoin: promotionInfo.canJoin,
				filterType: urlParameters?.[defUrlParamCols.filterType]
			})
				? ""
				: " Expired"
		}`}>
		<Stamp
			_isClaimed={_isClaimed}
			_isNew={_isNew}
			_isExpiry={_isExpiry}
			filterType={urlParameters?.[defUrlParamCols.filterType]}
			canJoin={promotionInfo.canJoin}
		/>
		<img src={promotionInfo.banner} alt={promotionInfo.title} />
		<div className="protitle">{promotionInfo.title}</div>
		<div className="text">{promotionInfo.description}</div>

		<PromoRule promotionInfo={promotionInfo} ruleCols={ruleCols} />
		<DepositRecord
			promotionInfo={promotionInfo}
			i18n={i18n}
			currencyId={currencyId}
			filterType={urlParameters?.[defUrlParamCols.filterType]}
		/>
		<div
			className="text"
			dangerouslySetInnerHTML={{
				__html: `<pre>${promotionInfo.details}</pre>`
			}}
		/>
	</div>
);
