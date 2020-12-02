import React from "react";
import { Link } from "@reach/router";
import JoinBtn from "./joinBtn";
import DepositRecord from "./depositRecord";
import ProcessBar from "./processBar";
import PromoRule from "./promotionContent.promoRule";

export default ({
	path,
	uiSetting = {},
	promotionInfo,
	i18n,
	userInfo,
	_isExpiry,
	_isClaimed,
	_isNew,
	GetPromotionDetail,
	RefreshProcessBar,
	ruleCols,
	divisionBy1000
}) => (
	<div
		className={`promodule${promotionInfo.isJoin ? " open" : ""}${
			_isExpiry ? " Expired" : ""
		}`}>
		{_isClaimed ? (
			<div className="claimed"></div>
		) : _isNew && !_isExpiry ? (
			<div className="new active"></div>
		) : null}
		<img src={promotionInfo.banner} alt={promotionInfo.title} />
		<Link className="btn-cancel" to={`/${path.promotion.root}`}>
			{i18n.lbl_Back}
		</Link>

		<JoinBtn
			promotionInfo={promotionInfo}
			func_GetPromotionDetail={GetPromotionDetail}
			uiSetting={uiSetting}
		/>

		<div className="protitle">{promotionInfo.title}</div>
		<div className="text">{promotionInfo.description}</div>

		<DepositRecord promotionInfo={promotionInfo} i18n={i18n} />

		<ProcessBar
			i18n={i18n}
			currencyId={userInfo.currencyId}
			{...promotionInfo}
			RefreshProcessBar={RefreshProcessBar.bind(this, promotionInfo)}
		/>

		<PromoRule
			promotionInfo={promotionInfo}
			i18n={i18n}
			isLogin={userInfo.isLogin}
			currencyId={userInfo.currencyId}
			ruleCols={ruleCols}
			divisionBy1000={divisionBy1000}
		/>
		<div
			className="text"
			dangerouslySetInnerHTML={{
				__html: `<pre>${promotionInfo.details}</pre>`
			}}></div>
	</div>
);
