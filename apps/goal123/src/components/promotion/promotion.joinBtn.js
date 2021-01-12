import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import { Link, Redirect } from "@reach/router";
import PropTypes from "prop-types";
import path from "../../path";
import { api_promotion_SetClaimPromotion } from "../../service/api/promotion";
import { number_format, isConvert } from "../common/common";
import { promoStatus } from "./promotion.def";

const JoinBtn = ({ userInfo, i18n, p, GetPromotion, isList, setPopBox }) => {
	const [redirectPath, setRedirectPath] = useState(null);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const onJoinPromotion = (promotion, e) => {
		e.stopPropagation();

		if (userInfo.isLogin !== false) {
			const ClosePopBox = () => {
				setPopBox({
					isOpen: false
				});
			};

			if (
				userInfo.currencyId &&
				(!userInfo.accountName || !userInfo.phoneNo || !userInfo.email)
			) {
				const RedirectToProfile = () => {
					setRedirectPath(
						`/${path.member.root}?prevPage=${path.promotionInfo.root}&BonusCode=${p.bonusCode}`
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
				promotion.canJoin &&
				!promotion.isJoin &&
				promotion.result === 1 &&
				promotion.requiredAmount > 0
			) {
				const RedirectToDeposit = () => {
					setRedirectPath(
						`/${path.deposit.root}?prevPage=${path.promotionInfo.root}&BonusCode=${p.bonusCode}`
					);
					ClosePopBox();
				};

				const _currency = i18n[`Currency_${userInfo.currencyId}`];
				const _requiredAmount = number_format(
					promotion.requiredAmount - promotion.depositAmount,
					isConvert(userInfo.currencyId)
				);

				setPopBox({
					isOpen: true,
					title: i18n.lbl_ImportantNote,
					content: (
						<div className="info">
							{i18n.lbl_RequireMinAmountHint}{" "}
							<span className="text-org">
								{_currency} ${_requiredAmount}
							</span>
							<br />
							{i18n.lbl_RequireMinAmountHint_Back}
						</div>
					),
					hasBtn: true,
					btnBar: (
						<div className="btn-group">
							<button className="blue" onClick={ClosePopBox}>
								{i18n.lbl_Later}
							</button>
							<button
								onClick={RedirectToDeposit}
								className="btn-check">
								{i18n.lbl_DepositNow}
							</button>
						</div>
					)
				});
			} else {
				api_promotion_SetClaimPromotion({
					langId: userInfo.langId,
					BonusCode: promotion.bonusCode
				}).then(
					res => {
						if (isMountedRef.current) {
							if (res.data.errorCode === 0) {
								isList
									? GetPromotion()
									: GetPromotion(
											userInfo.langId,
											promotion.bonusCode
									  );

								setPopBox({
									isOpen: true,
									title: i18n.lbl_ImportantNote,
									content: <p>{i18n.lbl_UpdateSuccessful}</p>,
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
										`/${path.member.root}?prevPage=${path.promotionInfo.root}&BonusCode=${p.bonusCode}`
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
												className="blue"
												onClick={ClosePopBox}>
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
												: `[${res.data.errorCode}] Something went wrong...`}
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
					},
					err => {
						if (isMountedRef.current) {
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
								content: i18n.msg_ApiServerError
							});
						}
					}
				);
			}
		}
	};

	const expiryTime = moment.duration(
		moment
			.unix(
				p.isJoin && p.status === promoStatus.Running && p.custExpiryTime
					? moment(p.custExpiryTime).unix()
					: p.periodTo
			)
			.diff(new Date())
	);

	return redirectPath === null ? (
		<>
			{(userInfo.isLogin && p.isJoin) || expiryTime._milliseconds < 0 ? (
				<></>
			) : userInfo.isLogin ? (
				<button
					className={isList ? "yellow" : "btn-check"}
					onClick={onJoinPromotion.bind(this, p)}>
					{i18n.lbl_PromoJoinNow}
				</button>
			) : (
				<Link
					className={isList ? "yellow" : "btn-check"}
					to={`/${path.login.root}`}>
					{i18n.lbl_PromoJoinNow}
				</Link>
			)}
		</>
	) : (
		<Redirect to={redirectPath} noThrow />
	);
};

JoinBtn.defaultProps = {
	isList: null
};

JoinBtn.propTypes = {
	userInfo: PropTypes.objectOf(propTypes.string).isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	p: PropTypes.objectOf(PropTypes.string).isRequired,
	GetPromotion: PropTypes.func.isRequired,
	isList: PropTypes.bool,
	setPopBox: PropTypes.func.isRequired
};

export default JoinBtn;
