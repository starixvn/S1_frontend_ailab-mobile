import React from "react";
import { Link } from "@reach/router";
import path from "Path";
import { number_format } from "@ailab-mobile/common";
import RemainTime from "../common/remainTime";
import JoinBtn from "./joinBtn";
import DepositRecord from "./depositRecord";
import ProcessBar from "./processBar";

export default ({
	promotionInfo,
	i18n,
	userInfo,
	_isExpiry,
	_isClaimed,
	_isNew,
	GetPromotionDetail,
	RefreshProcessBar
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

		<div className="info">
			<ul>
				<li>
					<span className="title">
						{i18n.lbl_RollOver?.toUpperCase()}
					</span>
					<span>{promotionInfo.rollOver}x</span>
				</li>
				<li>
					<span className="title">
						{i18n.lbl_RemainingTime?.toUpperCase()}
					</span>
					<span>
						{RemainTime({
							promotionInfo,
							i18n,
							isLogin: userInfo.isLogin
						})}
					</span>
				</li>
				{promotionInfo.requiredAmount > 0 ? (
					<li>
						<span className="title">
							{i18n.lbl_MinAmount?.toUpperCase()}
						</span>
						<span>
							{number_format(promotionInfo.requiredAmount)}
						</span>
					</li>
				) : null}
			</ul>
		</div>
		<div
			className="text"
			dangerouslySetInnerHTML={{
				__html: `<pre>${promotionInfo.details}</pre>`
			}}></div>
	</div>
);
