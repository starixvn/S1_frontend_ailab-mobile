import PropTypes from "prop-types";
import React, { useContext } from "react";
import {
	useRefreshProcessBar,
	defPromotionType,
	JoinBtn,
	DepositRecord,
	ProcessBar,
	CashBackInfo
} from "@ailab-mobile/promotion";
import { popBoxContext } from "../../common/context";
import PromoRule from "../components/promoRule";
import Mission from "./promotionMission";

const PromotionInInfoContent = ({
	promotionInfo,
	getPromotionDetail,
	config,
	filterType
}) => {
	const { setPopBox } = useContext(popBoxContext);
	const { refreshProcessBar, processBarInfo } = useRefreshProcessBar({
		config
	});

	if (promotionInfo === null) return null;

	return (
		<div id="popup" className="promotion-inner active">
			<div className="pop">
				<div className="popTit">
					<div
						className="icon icon-close"
						onClick={() => setPopBox({ isOpen: false })}
					/>
				</div>
				<div className="promotion-pop">
					<div className="promotion-banner">
						<img
							src={promotionInfo?.banner}
							alt={promotionInfo?.title}
						/>
					</div>
					<div className="promotion-title">
						{promotionInfo?.title}
						<span>{promotionInfo?.description}</span>
					</div>

					<div className={config?.uiSetting?.btnGroup}>
						{!promotionInfo.canJoin &&
						promotionInfo.promotionType ===
							defPromotionType.static ? (
							<a
								className={
									config?.uiSetting.joinBtn ?? "btn-check"
								}
								rel="noreferrer"
								target="_blank"
								href={`https://direct.lc.chat/${config.liveChatId}/`}>
								{config?.i18n.lbl_Apply_Now}
							</a>
						) : (
							<JoinBtn
								promotionInfo={promotionInfo}
								func_GetPromotionDetail={getPromotionDetail}
								uiSetting={config?.uiSetting}
								filterType={filterType}
								config={config}
								isLogin={config?.userInfo}
							/>
						)}
					</div>

					<DepositRecord
						promotionInfo={promotionInfo}
						i18n={config?.i18n}
						currencyId={config?.userInfo?.currencyId}
						filterType={filterType}
					/>
					<ProcessBar
						{...promotionInfo}
						custRollOver={
							processBarInfo?.custRollOver ??
							promotionInfo.custRollOver
						}
						custTurnOver={
							processBarInfo?.custTurnOver ??
							promotionInfo.custTurnOver
						}
						RefreshProcessBar={refreshProcessBar.bind(
							this,
							promotionInfo
						)}
						config={config}
					/>
					{promotionInfo.promotionType ===
						defPromotionType.missionBonus &&
						!promotionInfo.isJoin && (
							// 這邊不用lib內共用Mission組件是因為html結構有異
							<Mission
								promotionInfo={promotionInfo}
								config={config}
							/>
						)}
					{promotionInfo.promotionType !==
						defPromotionType.missionBonus && (
						<PromoRule
							promotionInfo={promotionInfo}
							ruleCols={config?.ruleCols}
							config={config}
						/>
					)}

					<CashBackInfo
						cashBackDetails={promotionInfo.cashBackDetails}
						config={config}
					/>
					<div
						className="promotion-content"
						dangerouslySetInnerHTML={{
							__html: `<pre>${promotionInfo.details}</pre>`
						}}
					/>
				</div>
			</div>
		</div>
	);
};

PromotionInInfoContent.defaultProps = {
	promotionInfo: null,
	getPromotionDetail: null,
	config: null,
	filterType: null
};

PromotionInInfoContent.propTypes = {
	promotionInfo: PropTypes.objectOf(PropTypes.any),
	getPromotionDetail: PropTypes.func,
	config: PropTypes.objectOf(PropTypes.any),
	filterType: PropTypes.string
};

export default PromotionInInfoContent;
