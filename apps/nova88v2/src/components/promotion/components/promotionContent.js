import React from "react";
import PropTypes from "prop-types";
import DepositRecord from "./depositRecord";
import PromoRule from "./promoRule";
import { Stamp } from "./stamp";
import { CanJoin } from "../common/common";
import { defUrlParamCols } from "../common/def";
import CashBackInfo from "./cashBackInfo";

const PromoContent = ({
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
		}${promotionInfo.beenUsed ? " expirModule" : ""}`}>
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

		<PromoRule
			promotionInfo={promotionInfo}
			ruleCols={ruleCols}
			isList={false}
		/>
		<CashBackInfo
			bonusCode={promotionInfo.bonusCode}
			cashBackDetails={promotionInfo.cashBackDetails}
			currencyId={currencyId}
			i18n={i18n}
		/>
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

PromoContent.defaultProps = {
	Class: "promodule",
	currencyId: null
};

PromoContent.propTypes = {
	Class: PropTypes.string,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	currencyId: PropTypes.number
};

export default PromoContent;
