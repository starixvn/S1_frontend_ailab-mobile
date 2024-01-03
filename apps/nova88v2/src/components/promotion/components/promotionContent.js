import React from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import DepositRecord from "./depositRecord";
import PromoRule from "./promoRule";
import { defPromotionType } from "../common/def";
import CashBackInfo from "./cashBackInfo";
import JoinBtn from "./joinBtn";
import ProcessBar from "./processBar";
import PromoMission from "./mission";
import path from "../../../path";

const PromoContent = ({
	promotionInfo,
	i18n = {},
	ruleCols,
	currencyId,
	refreshProcessBar,
	langId,
	showAllPromosBtn,
	filterType,
	processBarInfo,
	GetPromotionDetail
}) => (
	<div className="proInfomodule">
		<div className="btn-group">
			{promotionInfo.promotionType === defPromotionType.static ? (
				<a
					className="red"
					rel="noreferrer"
					target="_blank"
					href="https://direct.lc.chat/11638088/">
					{i18n.lbl_Apply_Now}
				</a>
			) : (
				<JoinBtn
					promotionInfo={promotionInfo}
					filterType={filterType}
					func_GetPromotionDetail={GetPromotionDetail}
				/>
			)}
			{showAllPromosBtn && (
				<Link to={`/${langId}/${path.promotion.root}`}>
					{i18n.lbl_promo_all_promos}
				</Link>
			)}
		</div>
		<div className="protitle">{promotionInfo.title}</div>
		<div className="text">{promotionInfo.description}</div>
		<ProcessBar
			{...promotionInfo}
			custRollOver={
				processBarInfo?.custRollOver ?? promotionInfo.custRollOver
			}
			custTurnOver={
				processBarInfo?.custTurnOver ?? promotionInfo.custTurnOver
			}
			RefreshProcessBar={refreshProcessBar.bind(this, promotionInfo)}
		/>
		{promotionInfo.promotionType === defPromotionType.missionBonus &&
			!promotionInfo.isJoin && (
				<PromoMission promotionInfo={promotionInfo} />
			)}
		<PromoRule promotionInfo={promotionInfo} ruleCols={ruleCols} />
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
			filterType={filterType}
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
	currencyId: null,
	promotionInfo: null,
	ruleCols: null,
	refreshProcessBar: () => null,
	langId: null,
	showAllPromosBtn: null,
	filterType: null,
	processBarInfo: null,
	GetPromotionDetail: () => null
};

PromoContent.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	currencyId: PropTypes.number,
	promotionInfo: PropTypes.objectOf(PropTypes.any),
	ruleCols: PropTypes.arrayOf(PropTypes.any),
	refreshProcessBar: PropTypes.func,
	langId: PropTypes.string,
	showAllPromosBtn: PropTypes.bool,
	filterType: PropTypes.string,
	processBarInfo: PropTypes.objectOf(PropTypes.any),
	GetPromotionDetail: PropTypes.func
};

export default PromoContent;
