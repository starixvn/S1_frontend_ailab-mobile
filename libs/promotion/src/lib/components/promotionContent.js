import React from "react";
import PropTypes from "prop-types";
import { JoinBtn } from "./joinBtn";
import DepositRecord from "./depositRecord";
import ProcessBar from "./processBar";
import PromoRule from "./promoRule";
import Mission from "./promotionMission";
import { defPromotionType } from "../common/def";
import CashBackInfo from "./cashBackInfo";

const PromoContent = ({
	promotionInfo,
	GetPromotionDetail,
	RefreshProcessBar,
	config = {},
	filterType,
	processBarInfo
}) => (
	<div className="promodule">
		<div className={config?.uiSetting?.btnGroup ?? btnGroup}>
			{promotionInfo.promotionType === defPromotionType.static ? (
				<a
					className={config?.uiSetting.joinBtn ?? "btn-check"}
					rel="noreferrer"
					target="_blank"
					href={`https://direct.lc.chat/${config.liveChatId}/`}>
					{config?.i18n.lbl_Apply_Now}
				</a>
			) : (
				<JoinBtn
					promotionInfo={promotionInfo}
					func_GetPromotionDetail={GetPromotionDetail}
					uiSetting={config?.uiSetting}
					filterType={filterType}
					config={config}
					isLogin={config?.userInfo}
				/>
			)}
		</div>

		<div className="protitle">{promotionInfo.title}</div>
		<div className="text">{promotionInfo.description}</div>
		<DepositRecord
			promotionInfo={promotionInfo}
			i18n={config?.i18n}
			currencyId={config?.userInfo?.currencyId}
			filterType={filterType}
		/>

		<ProcessBar
			{...promotionInfo}
			custRollOver={
				processBarInfo?.custRollOver ?? promotionInfo.custRollOver
			}
			custTurnOver={
				processBarInfo?.custTurnOver ?? promotionInfo.custTurnOver
			}
			RefreshProcessBar={RefreshProcessBar.bind(this, promotionInfo)}
			config={config}
		/>

		{promotionInfo.promotionType === defPromotionType.missionBonus &&
			!promotionInfo.isJoin && (
				<Mission promotionInfo={promotionInfo} config={config} />
			)}

		<PromoRule
			promotionInfo={promotionInfo}
			ruleCols={config?.ruleCols}
			isList={false}
			config={config}
		/>

		<CashBackInfo
			cashBackDetails={promotionInfo.cashBackDetails}
			config={config}
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
	promotionInfo: null,
	GetPromotionDetail: () => null,
	RefreshProcessBar: () => null,
	config: null,
	filterType: null,
	processBarInfo: null
};

PromoContent.propTypes = {
	promotionInfo: PropTypes.objectOf(PropTypes.any),
	GetPromotionDetail: PropTypes.func,
	RefreshProcessBar: PropTypes.func,
	config: PropTypes.objectOf(PropTypes.any),
	filterType: PropTypes.string,
	processBarInfo: PropTypes.objectOf(PropTypes.any)
};

export default PromoContent;
