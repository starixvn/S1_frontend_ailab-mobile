import React, { useRef, useEffect, useState } from "react";
import moment from "moment";
import { Link, Redirect } from "@reach/router";
import {
	defPromotionType,
	defFilterType,
	defHideJoinBtnTypes
} from "../common/def";
import ClaimWithLockedAmount from "./joinBtn.claimWithLockedAmount";
import { useHandlePopBox } from "../hook/useHandlePopBox";

export const JoinBtn = ({
	uiSetting = {},
	promotionInfo,
	func_GetPromotionDetail,
	func_CallBack,
	filterType,
	config
}) => {
	const { handlePopBox, handleErrorPopBox, clickClose } = useHandlePopBox(
		config
	);
	const isMountedRef = useRef(null);
	const [redirectPath, setRedirectPath] = useState(null);
	const [processing, setProcessing] = useState(false);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const { path, userInfo, i18n, api, formatSetting, handleLogin } = config;

	if (
		!promotionInfo ||
		defHideJoinBtnTypes.includes(promotionInfo.promotionType)
	) {
		return null;
	}

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
				.then(res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							if (func_GetPromotionDetail) {
								func_GetPromotionDetail(
									userInfo.langId,
									bonusCode,
									filterType
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
									`/${path.member.root}?prevPage=${path.promotionInfo.root}&BonusCode=${bonusCode}`
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
						setProcessing(false);
					}
				});
		}
	};

	const onJoinPromotion = _promo => {
		if (userInfo.isLogin !== false) {
			if (
				userInfo.currencyId &&
				!(userInfo.accountName && userInfo.phoneNo && userInfo.email)
			) {
				const RedirectToProfile = () => {
					setRedirectPath(
						`/${path.member.root}?prevPage=${path.promotionInfo.root}&BonusCode=${_promo.bonusCode}`
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
					setRedirectPath(`/${path.deposit.root}`);
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
					_promo.promotionType === defPromotionType.firstDeposit)
			) {
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
				SetClaimPromotion({ bonusCode: _promo.bonusCode });
			}
		}
	};

	const _canJoin = !(
		(filterType === defFilterType.specialBonus ||
			promotionInfo.filterType === defFilterType.specialBonus) &&
		!promotionInfo.canJoin
	);

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
	} else if (
		promotionInfo &&
		!promotionInfo.beenUsed &&
		(userInfo.isLogin === false ||
			(_canJoin && userInfo.isLogin && !promotionInfo.isJoin))
	) {
		const joinNowDisplayText =
			promotionInfo.promotionType === defPromotionType.cashback ||
			promotionInfo.promotionType === defPromotionType.retentionFreeBet
				? i18n?.lbl_ClaimNow?.toUpperCase()
				: i18n?.lbl_PromoJoinNow?.toUpperCase();

		if (userInfo.isLogin === false) {
			btnResult = handleLogin ? (
				<button
					className={uiSetting.joinBtn ?? "btn-check"}
					onClick={handleLogin}>
					{joinNowDisplayText}
				</button>
			) : (
				<Link
					className={uiSetting.joinBtn ?? "btn-check"}
					to={`/${path.login.root}`}>
					{joinNowDisplayText}
				</Link>
			);
		} else {
			btnResult = (
				<button
					className={uiSetting.joinBtn ?? "btn-check"}
					onClick={onJoinPromotion.bind(this, promotionInfo)}>
					{joinNowDisplayText}
				</button>
			);
		}
	}

	return btnResult;
};
