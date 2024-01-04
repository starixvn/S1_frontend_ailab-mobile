import React, { useContext, useRef, useEffect, useState } from "react";
import moment from "moment";
import { userInfoContext, i18nContext, popBoxContext } from "Context";
import { Redirect } from "@reach/router";
import path from "../../../path";
import {
	defPromotionType,
	defFilterType,
	defWrapperCol,
	defHideJoinBtnTypes
} from "../common/def";
import ClaimWithLockedAmount from "./joinBtn.claimWithLockedAmount";
import { useHandlePopBox } from "../hook/useHandlePopBox";
import useHandleLogin from "../../hook/useHandleLogin";
import api from "../../../service/api";

export default ({
	promotionInfo,
	func_GetPromotionDetail,
	func_CallBack,
	filterType
}) => {
	if (defHideJoinBtnTypes.includes(promotionInfo.promotionType)) return null;

	const formatSetting = {
		[defWrapperCol.formatSetting.isConvertRequired]: false,
		[defWrapperCol.formatSetting.formatRequired]: undefined,
		[defWrapperCol.formatSetting.digits]: undefined
	};

	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { handlePopBox, clickClose } = useHandlePopBox();
	const isMountedRef = useRef(null);
	const [redirectPath, setRedirectPath] = useState(null);
	const [processing, setProcessing] = useState(false);

	const { handleLogin } = useHandleLogin();
	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const SetClaimPromotion = ({ bonusCode, LockedAmount = 0 }) => {
		if (!processing) {
			setProcessing(true);
			api.promotion
				.SetClaimPromotion({
					langId: userInfo.langId,
					BonusCode: bonusCode,
					LockedAmount:
						LockedAmount && !isNaN(LockedAmount)
							? Number(LockedAmount)
							: 0
				})
				.then(
					res => {
						if (isMountedRef.current) {
							if (res.data.errorCode === 0) {
								if (func_GetPromotionDetail) {
									func_GetPromotionDetail(
										userInfo.langId,
										bonusCode
									);
								} else if (func_CallBack) {
									func_CallBack();
								}
								handlePopBox({
									content: <p>{i18n?.lbl_ClaimSucceed}</p>,
									btnBar: (
										<div className="btn-group">
											<button
												onClick={clickClose}
												className="btn-check">
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
												className="blue"
												onClick={clickClose}>
												{i18n?.lbl_Later}
											</button>
											<button
												onClick={RedirectToProfile}
												className="btn-check">
												{i18n?.lbl_GoNow}
											</button>
										</div>
									)
								});
							} else {
								setPopBox({
									isOpen: true,
									content: `[${res.data.errorCode}] ${res.data.message}`
								});
							}
						}
						setProcessing(false);
					},
					() => {
						setProcessing(false);

						setPopBox({
							isOpen: true,
							content: i18n.msg_ApiServerError
						});
					}
				);
		}
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
							<button className="blue" onClick={clickClose}>
								{i18n?.lbl_Cancel}
							</button>
							<button
								onClick={RedirectToProfile}
								className="btn-check">
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
							<button className="blue" onClick={clickClose}>
								{i18n?.lbl_Later}
							</button>
							<button
								onClick={RedirectToDeposit}
								className="btn-check">
								{i18n?.lbl_DepositNow}
							</button>
						</div>
					)
				});
			} else if (
				userInfo.isLogin &&
				_promo.canJoin &&
				(_promo.promotionType === defPromotionType.reDeposit ||
					_promo.promotionType === defPromotionType.firstDeposit ||
					_promo.promotionType === defPromotionType.missionBonus)
			) {
				handlePopBox({
					content: (
						<ClaimWithLockedAmount
							promotionInfo={promotionInfo}
							ClosePopBox={clickClose}
							SetClaimPromotion={SetClaimPromotion}
							i18n={i18n}
							formatSetting={formatSetting}
						/>
					)
				});
			} else {
				SetClaimPromotion({ bonusCode: _promo.bonusCode });
			}
		} else if (userInfo.isLogin === false) {
			handleLogin();
		}
	};

	const joinNowDisplayText =
		promotionInfo?.promotionType === defPromotionType.cashback
			? i18n?.lbl_ClaimNow
			: i18n?.lbl_PromoJoinNow;

	let btnResult = null;
	if (redirectPath !== null) {
		btnResult = <Redirect to={redirectPath} noThrow />;
	} else if (
		(promotionInfo.isJoin && userInfo.isLogin) ||
		promotionInfo.promotionType === defPromotionType.rebate ||
		promotionInfo.promotionType === defPromotionType.other ||
		(filterType === defFilterType.specialBonus && !promotionInfo.canJoin) ||
		promotionInfo.beenUsed ||
		moment.unix(promotionInfo.periodFrom).diff(Date.now()) > 0 ||
		moment.unix(promotionInfo.periodTo).diff(Date.now()) < 0
	) {
		btnResult = null;
	} else {
		btnResult = (
			<button
				className="orange"
				onClick={onJoinPromotion.bind(this, promotionInfo)}>
				{joinNowDisplayText?.toUpperCase()}
			</button>
		);
	}

	return btnResult;
};
