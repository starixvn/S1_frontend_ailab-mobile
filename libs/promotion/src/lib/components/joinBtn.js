import React, { useContext, useRef, useEffect, useState } from "react";
import { Link, Redirect } from "@reach/router";
import path from "Path";
import { userInfoContext, popBoxContext, i18nContext } from "Context";
import { api_promotion_SetClaimPromotion } from "@ailab-mobile/api";
import { Inputbox, number_format } from "@ailab-mobile/common";
import { isExpiry } from "../common/common";
import { defBonusType, defPromotionType } from "../common/def";

export default ({
	promotionInfo,
	func_GetPromotionDetail,
	func_CallBack,
	class_JoinNowBtn
}) => {
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { i18n } = useContext(i18nContext);
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
		api_promotion_SetClaimPromotion({
			langId: userInfo.langId,
			BonusCode: bonusCode,
			LockedAmount:
				LockedAmount && !isNaN(LockedAmount) ? Number(LockedAmount) : 0
		}).then(res => {
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
									className="btn-check">
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
								<button className="blue" onClick={ClosePopBox}>
									{i18n.lbl_Later}
								</button>
								<button
									onClick={RedirectToProfile}
									className="btn-check">
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
									className="btn-check">
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
							<button className="blue" onClick={ClosePopBox}>
								{i18n.lbl_Cancel}
							</button>
							<button
								onClick={RedirectToProfile}
								className="btn-check">
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
							<button className="blue" onClick={ClosePopBox}>
								{i18n.lbl_Later}
							</button>
							<Link
								to={`/${path.deposit.root}`}
								className="btn-check">
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
			className={class_JoinNowBtn ?? "btn-check"}
			to={`/${path.login.root}`}>
			{i18n.lbl_PromoJoinNow}
		</Link>
	) : userInfo.isLogin && !promotionInfo.isJoin && !_isExpiry ? (
		<button
			className={class_JoinNowBtn ?? "btn-check"}
			onClick={onJoinPromotion.bind(this, promotionInfo)}>
			{i18n.lbl_PromoJoinNow}
		</button>
	) : null;
};

const ClaimWithLockedAmount = ({
	i18n,
	promotionInfo,
	ClosePopBox,
	SetClaimPromotion
}) => {
	const [warning, setWarning] = useState({ status: false, msg: "" });
	const [claimAmount, setClaimAmount] = useState("");

	const OnChangeClaimAmount = e => {
		setClaimAmount(e.target.value);
		if (warning.status) {
			setWarning({ status: false, msg: "" });
		}
	};

	const checkClaimAmount = ({ _claimAmount, requiredAmount, maxAmount }) => {
		if (_claimAmount === "" || isNaN(_claimAmount)) {
			return false;
		} else {
			let num_claimAmount = Number(_claimAmount);
			return (
				num_claimAmount >= requiredAmount &&
				num_claimAmount <= maxAmount
			);
		}
	};

	const onJoinPromotion = ({
		_claimAmount,
		bonusCode,
		requiredAmount,
		maxAmount
	}) => {
		if (checkClaimAmount({ _claimAmount, requiredAmount, maxAmount })) {
			SetClaimPromotion({
				bonusCode: bonusCode,
				LockedAmount: _claimAmount
			});
		} else {
			setWarning({
				status: true,
				msg: `${_claimAmount} ${i18n.lbl_NotinLimit}`
			});
		}
	};

	return (
		<>
			<div className="txt-lightgray text-center">
				{i18n.lbl_PleaseEnterClaimAmount}
			</div>
			<Inputbox
				value={claimAmount}
				onChange={OnChangeClaimAmount}
				inputType="tel"
				Warning={warning}
			/>
			<div className="text-org">
				{`${i18n.lbl_ClaimAmountRange} : ${number_format(
					promotionInfo.requiredAmount
				)} ~ ${number_format(promotionInfo.maxAmount)}`}
			</div>
			<div className="btn-group">
				<button className="white" onClick={ClosePopBox}>
					{i18n.lbl_Cancel}
				</button>
				<button
					className="orange"
					onClick={onJoinPromotion.bind(this, {
						...promotionInfo,
						_claimAmount: claimAmount
					})}>
					{i18n.lbl_PromoJoinNow}
				</button>
			</div>
		</>
	);
};
