import React, { useContext, useRef, useEffect, useState } from "react";
import { userInfoContext, i18nContext } from "Context";
import { Link, Redirect } from "@reach/router";
import path from "../../../path";
import { isExpiry } from "../common/common";
import {
	defBonusType,
	defPromotionType,
	defFilterType,
	defWrapperCol
} from "../common/def";

import ClaimWithLockedAmount from "./joinBtn.claimWithLockedAmount";
import { useHandlePopBox } from "../hook/useHandlePopBox";
import useHandleLogin from "../../hook/useHandleLogin";
import api from "../../../service/api";

export default ({
	uiSetting = {},
	promotionInfo,
	func_GetPromotionDetail,
	func_CallBack,
	filterType
}) => {
	const formatSetting = {
		[defWrapperCol.formatSetting.isConvertRequired]: false,
		[defWrapperCol.formatSetting.formatRequired]: undefined,
		[defWrapperCol.formatSetting.digits]: undefined
	};

	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);

	const { handlePopBox, handleErrorPopBox, clickClose } = useHandlePopBox();
	const isMountedRef = useRef(null);
	const [redirectPath, setRedirectPath] = useState(null);
	const { handleLogin } = useHandleLogin();
	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const SetClaimPromotion = ({ bonusCode, LockedAmount = 0 }) => {
		api.promotion
			.SetClaimPromotion({
				langId: userInfo.langId,
				BonusCode: bonusCode,
				LockedAmount:
					LockedAmount && !isNaN(LockedAmount)
						? Number(LockedAmount)
						: 0
			})
			.then(res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						if (func_GetPromotionDetail) {
							func_GetPromotionDetail(userInfo.langId, bonusCode);
						} else if (func_CallBack) {
							func_CallBack();
						}
						handlePopBox({
							content: <p>{i18n?.msg_Updatesuccessful}</p>,
							btnBar: (
								<div className="btn-group">
									<button
										onClick={clickClose}
										className={
											uiSetting.popBox?.submitBtn ??
											"btn-check"
										}>
										OK
									</button>
								</div>
							)
						});
					} else if (res.data.errorCode === -5) {
						const RedirectToProfile = () => {
							setRedirectPath(
								`/${userInfo.langId}/${path.profile.root}?prevPage=${path.promotionInfo.root}&BonusCode=${bonusCode}`
							);
							clickClose();
						};
						handlePopBox({
							content: <p>{i18n?.msg_OTPHint}</p>,
							btnBar: (
								<div className="btn-group">
									<button
										className={
											uiSetting.popBox?.cancelBtn ??
											"blue"
										}
										onClick={clickClose}>
										{i18n?.lbl_Later}
									</button>
									<button
										onClick={RedirectToProfile}
										className={
											uiSetting.popBox?.submitBtn ??
											"btn-check"
										}>
										{i18n?.lbl_GoNow}
									</button>
								</div>
							)
						});
					} else {
						handleErrorPopBox({ ...res.data, uiSetting });
					}
				}
			});
	};

	const onJoinPromotion = (_promo = {}) => {
		if (userInfo.isLogin !== false) {
			if (
				userInfo.currencyId &&
				!(userInfo.accountName && userInfo.phoneNo && userInfo.email)
			) {
				const RedirectToProfile = () => {
					setRedirectPath(
						`/${userInfo.langId}/${path.profile.root}?prevPage=${path.promotionInfo.root}&BonusCode=${_promo.bonusCode}`
					);
					clickClose();
				};
				handlePopBox({
					content: <p>{i18n?.lbl_UpdatePersonalInfoPromotion}</p>,
					btnBar: (
						<div className="btn-group">
							<button
								className={
									uiSetting.popBox?.cancelBtn ?? "blue"
								}
								onClick={clickClose}>
								{i18n?.lbl_Cancel}
							</button>
							<button
								onClick={RedirectToProfile}
								className={
									uiSetting.popBox?.submitBtn ?? "btn-check"
								}>
								{i18n?.lbl_GoNow}
							</button>
						</div>
					)
				});
			} else if (
				_promo.canJoin &&
				!_promo.isJoin &&
				_promo.result === 1 &&
				_promo.requiredAmount > 0
			) {
				const RedirectToDeposit = () => {
					setRedirectPath(`/${userInfo.langId}/${path.deposit.root}`);
					clickClose();
				};
				handlePopBox({
					content: (
						<div className="info">
							{i18n?.lbl_RequireMinAmountHint}
							<span className="text-org">
								{` ${
									i18n?.[`Currency_${userInfo.currencyId}`]
								} ${_promo.requiredAmount}`}
							</span>
							<br />
							{i18n?.msg_GoToDepositPage}
						</div>
					),
					btnBar: (
						<div className="btn-group">
							<button
								className={
									uiSetting.popBox?.cancelBtn ?? "blue"
								}
								onClick={clickClose}>
								{i18n?.lbl_Later}
							</button>
							<button
								onClick={RedirectToDeposit}
								className={
									uiSetting.popBox?.submitBtn ?? "btn-check"
								}>
								{i18n?.lbl_DepositNow}
							</button>
						</div>
					)
				});
			} else if (
				userInfo.isLogin &&
				_promo.canJoin &&
				(_promo.promotionType === defPromotionType.reDeposit ||
					(filterType == defFilterType.specialBonus &&
						_promo.promotionType === defPromotionType.firstDeposit))
			) {
				if (_promo.bonusType === defBonusType.Percentage) {
					handlePopBox({
						content: (
							<ClaimWithLockedAmount
								uiSetting={uiSetting}
								promotionInfo={promotionInfo}
								ClosePopBox={clickClose}
								SetClaimPromotion={SetClaimPromotion}
								i18n={i18n}
								formatSetting={formatSetting}
							/>
						)
					});
				} else {
					SetClaimPromotion({
						bonusCode: _promo.bonusCode,
						LockedAmount: promotionInfo.maxAmount
					});
				}
			} else {
				SetClaimPromotion({ bonusCode: _promo.bonusCode });
			}
		}
	};

	const _isExpiry = isExpiry({
		...promotionInfo,
		isLogin: userInfo.isLogin
	});

	const _canJoin = !(
		filterType === defFilterType.specialBonus && !promotionInfo?.canJoin
	);

	return redirectPath !== null ? (
		<Redirect to={redirectPath} noThrow />
	) : userInfo.isLogin === false && !_isExpiry ? (
		<button
			className={uiSetting.joinBtn ?? "btn-check"}
			onClick={() => handleLogin()}>
			{i18n?.lbl_PromoJoinNow}
		</button>
	) : _canJoin && userInfo.isLogin && !promotionInfo?.isJoin && !_isExpiry ? (
		<button
			className={uiSetting.joinBtn ?? "btn-check"}
			onClick={onJoinPromotion.bind(this, promotionInfo)}>
			{i18n?.lbl_PromoJoinNow}
		</button>
	) : null;
};
