import React, { useContext, useRef, useEffect, useState } from "react";
import { Link, Redirect } from "@reach/router";
import { isExpiry } from "../common/common";
import { defBonusType, defPromotionType } from "../common/def";
import ClaimWithLockedAmount from "./joinBtn.claimWithLockedAmount";
import { configContext } from "../common/context";

export default ({
	uiSetting = {},
	promotionInfo,
	func_GetPromotionDetail,
	func_CallBack
}) => {
	const { path, userInfo, setPopBox, i18n, api } = useContext(configContext);
	const isMountedRef = useRef(null);
	const [redirectPath, setRedirectPath] = useState(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	const ClosePopBox = () => {
		setPopBox({
			isOpen: false
		});
	};

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

						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: <p>{i18n.msg_Updatesuccessful}</p>,
							hasBtn: true,
							btnBar: (
								<div className="btn-group">
									<button
										onClick={ClosePopBox}
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
							ClosePopBox();
						};
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: <p>{i18n.msg_OTPHint}</p>,
							hasBtn: true,
							btnBar: (
								<div className="btn-group">
									<button
										className={
											uiSetting.popBox?.cancelBtn ??
											"blue"
										}
										onClick={ClosePopBox}>
										{i18n.lbl_Later}
									</button>
									<button
										onClick={RedirectToProfile}
										className={
											uiSetting.popBox?.submitBtn ??
											"btn-check"
										}>
										{i18n.lbl_GoNow}
									</button>
								</div>
							)
						});
					} else {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: (
								<p>
									{res.data.message
										? res.data.message
										: `[${res.data.errorCode}] ${i18n.msg_ApiServerError}`}
								</p>
							),
							hasBtn: true,
							btnBar: (
								<div className="btn-group">
									<button
										onClick={ClosePopBox}
										className={
											uiSetting.popBox?.submitBtn ??
											"btn-check"
										}>
										{i18n.lbl_Close}
									</button>
								</div>
							)
						});
					}
				}
			});
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
					ClosePopBox();
				};
				setPopBox({
					isOpen: true,
					title: i18n.lbl_ImportantNote,
					content: <p>{i18n.lbl_UpdatePersonalInfoPromotion}</p>,
					hasBtn: true,
					btnBar: (
						<div className="btn-group">
							<button
								className={
									uiSetting.popBox?.cancelBtn ?? "blue"
								}
								onClick={ClosePopBox}>
								{i18n.lbl_Cancel}
							</button>
							<button
								onClick={RedirectToProfile}
								className={
									uiSetting.popBox?.submitBtn ?? "btn-check"
								}>
								{i18n.lbl_GoNow}
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
				setPopBox({
					isOpen: true,
					title: i18n.lbl_ImportantNote,
					content: (
						<div className="info">
							{i18n.lbl_RequireMinAmountHint}
							<span className="text-org">
								{` ${i18n[`Currency_${userInfo.currencyId}`]} ${
									_promo.requiredAmount
								}`}
							</span>
							<br />
							{i18n.msg_GoToDepositPage}
						</div>
					),
					hasBtn: true,
					btnBar: (
						<div className="btn-group">
							<button
								className={
									uiSetting.popBox?.cancelBtn ?? "blue"
								}
								onClick={ClosePopBox}>
								{i18n.lbl_Later}
							</button>
							<Link
								to={`/${path.deposit.root}`}
								className={
									uiSetting.popBox?.submitBtn ?? "btn-check"
								}>
								{i18n.lbl_DepositNow}
							</Link>
						</div>
					)
				});
			} else if (
				userInfo.isLogin &&
				_promo.canJoin &&
				_promo.promotionType === defPromotionType.reDeposit
			) {
				if (_promo.bonusType === defBonusType.Percentage) {
					setPopBox({
						isOpen: true,
						title: i18n.lbl_ImportantNote,
						content: (
							<ClaimWithLockedAmount
								uiSetting={uiSetting}
								i18n={i18n}
								promotionInfo={promotionInfo}
								ClosePopBox={ClosePopBox}
								SetClaimPromotion={SetClaimPromotion}
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

	let _isExpiry = isExpiry({
		...promotionInfo,
		isLogin: userInfo.isLogin
	});

	return redirectPath !== null ? (
		<Redirect to={redirectPath} noThrow />
	) : userInfo.isLogin === false && !_isExpiry ? (
		<Link
			className={uiSetting.joinBtn ?? "btn-check"}
			to={`/${path.login.root}`}>
			{i18n.lbl_PromoJoinNow}
		</Link>
	) : userInfo.isLogin && !promotionInfo.isJoin && !_isExpiry ? (
		<button
			className={uiSetting.joinBtn ?? "btn-check"}
			onClick={onJoinPromotion.bind(this, promotionInfo)}>
			{i18n.lbl_PromoJoinNow}
		</button>
	) : null;
};
