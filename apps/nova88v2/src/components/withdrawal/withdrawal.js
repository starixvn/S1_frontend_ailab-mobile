import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "@reach/router";
import { Link } from "@Router";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	loadingContext,
	withdrawalBlockSettingContext
} from "../common/context";
import {
	number_format,
	isConvert,
	checkAmount,
	defCurrenyId
} from "../common/common";
import InputBox from "../common/inputbox.hint";
import { defIptStatus } from "../common/inputStatus";
import { paymentImgURL } from "../../config";
import RecentDatas from "./withdrawal.recentDatas";
import ReloadSpin from "../common/reloadSpin";
import path from "../../path";
import useTip from "../hook/useTip";
import { Iov_GetBlackBox } from "../common/iovation";
import api from "../../service/api";
import VIPLevel from "../common/vipLevel";
import BalancePanel from "./balancePanel";
import ImportantNote from "./importantNote";
import RestoreAll from "./restoreAll";
import { WITHDRAWAL_BLOCK_SETTING_TYPE } from "../../datas/withdrawalSetting";

const initWarning = {
	status: defIptStatus.default,
	msg: ""
};

const Panel = () => {
	const navigate = useNavigate();
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setLoading } = useContext(loadingContext);
	const { withdrawalSettingTypeList } = useContext(
		withdrawalBlockSettingContext
	);
	const [balanceInfo, setBalanceInfo] = useState(null);
	const _isConvert = isConvert(userInfo.currencyId);
	const [amount, setAmount] = useState("");
	const [warning, setWarning] = useState(initWarning);
	const [selBank, setSelBank] = useState(null);
	const [bankInfo, setbankInfo] = useState({
		accountName: "",
		bankList: []
	});

	const [withdrawalLimit, setWithdrawalLimit] = useState({
		withdrawalMin: 0
	});
	const { showTips, showTipHandler } = useTip();
	const [recentDatas, setRecentDatas] = useState([]);
	const [pageVerify, setPageVerify] = useState(true);
	const isMountedRef = useRef(null);
	const isClickedRef = useRef(false);

	const displayBankCard =
		withdrawalSettingTypeList?.find(
			item => item.type === WITHDRAWAL_BLOCK_SETTING_TYPE.BankCard
		)?.status ?? true;

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});
	useEffect(() => {
		if (userInfo.isLogin) {
			GetDailyWithdrawalLimit();
		}
	}, [userInfo.isLogin]);

	useEffect(() => {
		if (
			userInfo.isLogin &&
			userInfo.currencyId === defCurrenyId.INR &&
			!userInfo.phoneVerified
		) {
			setPopBox({
				isOpen: true,
				title: i18n.lbl_Withdrawal,
				content: i18n.lbl_Complete_PhoneVerification,
				hasBtn: true,
				btnBar: (
					<div className="btn-group">
						<button
							className="gray"
							onClick={() => setPopBox({ isOpen: false })}>
							{i18n.lbl_Later}
						</button>
						<button
							className="blue"
							onClick={() => {
								navigate(
									`/${userInfo.langId}/${path.profile.root}`
								);
								setPopBox({ isOpen: false });
							}}>
							{i18n.lbl_VerifyNow}
						</button>
					</div>
				)
			});
		}
	}, [userInfo.currencyId]);

	const GetDailyWithdrawalLimit = () => {
		api.payment.GetWithdrawalLimit().then(
			res => {
				if (res.data.errorCode === 0 && isMountedRef.current) {
					setWithdrawalLimit(res.data.data);
				} else if (res.data.errorCode !== 0) {
					setPopBox({
						isOpen: true,
						content: `[${res.data.errorCode}] ${res.data.message}`
					});
				}
			},
			() => {
				setPopBox({
					isOpen: true,
					content: i18n.msg_ApiServerError
				});
			}
		);
	};

	useEffect(() => {
		if (
			userInfo.isLogin &&
			userInfo.regTime &&
			(!userInfo.accountName || !userInfo.phoneNo)
		) {
			const ClosePopBox = () => {
				setPopBox({ isOpen: false });
				navigate(
					`/${userInfo.langId}/${path.profile.root}?prevPage=${path.withdrawal.root}`
				);
			};
			if (isMountedRef.current) {
				setPopBox({
					isOpen: true,
					title: i18n.lbl_ImportantNote,
					content: i18n.lbl_UpdatePersonalInfo,
					hasBtn: true,
					hideCloseBtn: true,
					btnBar: (
						<div className="btn-group">
							<button className="blue" onClick={ClosePopBox}>
								{i18n.lbl_UpdatePersonalDetail}
							</button>
						</div>
					)
				});

				setLoading(false);
				setPageVerify(false);
			}
		} else if (userInfo.isLogin) {
			const CheckBankInfo = async () => {
				const result = await api.account.GetCustBankInfo().then(
					res => {
						let hasBankInfo = false;
						if (res.data.errorCode === 0) {
							if (
								res.data.data?.bankInfoDetail &&
								res.data.data?.bankInfoDetail.length > 0
							) {
								if (isMountedRef.current) {
									setbankInfo(() => ({
										accountName: res.data.data.accountName,
										bankList: res.data.data.bankInfoDetail
									}));
									const defAccountIdx = res.data.data?.bankInfoDetail.findIndex(
										obj =>
											obj.accountNo ===
											res.data.data?.defAccountNo
									);
									const noDisabledAccountIdx = res.data.data?.bankInfoDetail.findIndex(
										obj => !obj.disabled
									);

									// * 若有 disabled 則不會 setSelBank 所以有可能不會有預設所選到的 bankCard
									if (
										defAccountIdx !== -1 &&
										!res.data.data.bankInfoDetail[
											defAccountIdx
										]?.disabled
									) {
										setSelBank(
											res.data.data.bankInfoDetail[
												defAccountIdx
											]
										);
									} else if (
										defAccountIdx === -1 &&
										!res.data.data.bankInfoDetail[0]
											?.disabled
									) {
										setSelBank(
											res.data.data.bankInfoDetail[0]
										);
									} else if (noDisabledAccountIdx) {
										setSelBank(
											res.data.data.bankInfoDetail[
												noDisabledAccountIdx
											]
										);
									}

									if (!pageVerify) {
										setPageVerify(true);
									}
								}
								hasBankInfo = true;
							}
						} else {
							setPopBox({
								isOpen: true,
								content: `[${res.data.errorCode}] ${res.data.message}`
							});
						}
						return hasBankInfo;
					},
					() => {
						setPopBox({
							isOpen: true,
							content: i18n.msg_ApiServerError
						});
					}
				);
				return result;
			};

			CheckBankInfo().then(hasBankInfo => {
				if (hasBankInfo) {
					KycCheck(true).then(kycProcess => {
						if (!kycProcess) {
							if (userInfo.isLogin) {
								api.account
									.GetWithdrawalAvailableBalance()
									.then(
										res => {
											if (
												res.data.errorCode === 0 &&
												isMountedRef.current
											) {
												setBalanceInfo(res.data.data);
											} else if (
												res.data.errorCode !== 0
											) {
												setPopBox({
													isOpen: true,
													content: `[${res.data.errorCode}] ${res.data.message}`
												});
											}
											setLoading(false);
										},
										() => {
											if (isMountedRef.current) {
												setPopBox({
													isOpen: true,
													content:
														i18n.msg_ApiServerError
												});
												setLoading(false);
											}
										}
									);

								api.payment.GetWithdrawalInfoRecent().then(
									res => {
										if (
											res.data.errorCode === 0 &&
											isMountedRef.current
										) {
											setRecentDatas(res.data.data);
										} else if (res.data.errorCode !== 0) {
											setPopBox({
												isOpen: true,
												content: `[${res.data.errorCode}] ${res.data.message}`
											});
										}
									},
									() => {
										setPopBox({
											isOpen: true,
											content: i18n.msg_ApiServerError
										});
									}
								);
							}
						}
					});
				}
			});
		}
	}, [
		userInfo.accountName,
		userInfo.birth_d,
		userInfo.phoneNo,
		userInfo.currencyId,
		userInfo.isLogin,
		i18n,
		setPopBox,
		pageVerify,
		userInfo.langId,
		navigate,
		setLoading
	]);
	const KycCheck = async UpdatePageVerify => {
		const executeKycProcess = await api.payment.KycCheck().then(res => {
			if (isMountedRef.current) {
				if (res.data.errorCode === 1) {
					navigate(`/${userInfo.langId}/${path.kyc.root}`);
				} else if (res.data.errorCode === 2) {
					navigate(`/${userInfo.langId}/${path.kycWaiting.root}`);
				} else if (isMountedRef.current && UpdatePageVerify) {
					setPageVerify(true);
				} else if (res.data.errorCode !== 0) {
					setPopBox({
						isOpen: true,
						content: `[${res.data.errorCode}] ${res.data.message}`
					});
				}
			}
			return res.data.errorCode === 1 || res.data.errorCode === 2;
		});
		return executeKycProcess;
	};

	const GetBalance = () => {
		if (pageVerify) {
			api.account.GetWithdrawalAvailableBalance().then(
				res => {
					if (res.data.errorCode === 0 && isMountedRef.current) {
						setBalanceInfo(res.data.data);
					} else if (res.data.errorCode !== 0) {
						setPopBox({
							isOpen: true,
							content: `[${res.data.errorCode}] ${res.data.message}`
						});
					}
				},
				() => {
					setPopBox({
						isOpen: true,
						content: i18n.msg_ApiServerError
					});
				}
			);
		}
	};

	const VaildAmount = _amount => {
		let result = {};
		const real_amount = _isConvert
			? Number(_amount) * 1000
			: Number(_amount);
		if (
			!withdrawalLimit.unlimited &&
			real_amount > withdrawalLimit.withdrawalAvailableAmount
		) {
			result = {
				status: defIptStatus.warning,
				msg: i18n.lbl_WithdrawalDailyReached
			};
		} else {
			result = checkAmount({
				amount: _amount,
				minAmount: withdrawalLimit.withdrawalMin,
				maxAmount: balanceInfo?.availableBalance,
				_isConvert,
				i18n,
				maxAmountAllowUnlimit: false,
				hintKey: "lbl_Insufficientbalance",
				digits: 0
			});
		}
		if (result.status !== 0) {
			setWarning({
				status: defIptStatus.warning,
				msg: result.msg
			});
		} else {
			setWarning({
				status: defIptStatus.verified,
				msg: ""
			});
		}
		return result.status === 0;
	};

	const EditAmount = e => {
		const { value } = e.target;
		VaildAmount(value);
		setAmount(value);
	};

	const checkAccount = () => {
		if (bankInfo?.bankList?.length > 0) {
			ClickSubmit();
		} else {
			const ClosePopBox = () => {
				setPopBox({ isOpen: false });
				navigate(`/${userInfo.langId}/${path.bankInfo.root}`);
			};

			if (isMountedRef.current) {
				setPopBox({
					isOpen: true,
					title: i18n.lbl_ImportantNote,
					content: i18n.lbl_UpdateBankInfo,
					hasBtn: true,
					hideCloseBtn: true,
					btnBar: (
						<div className="btn-group">
							<button className="blue" onClick={ClosePopBox}>
								{i18n.lbl_UpdateBankDetail}
							</button>
						</div>
					)
				});
				setPageVerify(false);
			}
		}
	};

	const ClickSubmit = () => {
		if (pageVerify) {
			const result = VaildAmount(amount);
			if (result) {
				const RedirectToNext = async (
					accountNo,
					_real_amount,
					sysId,
					ifscCode
				) => {
					const blackbox = await Iov_GetBlackBox();
					try {
						const res = await api.payment.WithdrawalReq(
							accountNo,
							_real_amount,
							sysId,
							blackbox,
							ifscCode
						);

						if (isMountedRef.current) {
							if (
								res.data.errorCode === 0 ||
								res.data.errorCode === 2
							) {
								KycCheck(false).then(kycProcess => {
									if (!kycProcess) {
										setAmount("");
										api.payment
											.GetWithdrawalInfoRecent()
											.then(resRecent => {
												if (
													resRecent.data.errorCode ===
														0 &&
													isMountedRef.current
												) {
													GetBalance();
													setRecentDatas(
														resRecent.data.data
													);
													GetDailyWithdrawalLimit();
													setWarning(initWarning);
												} else if (
													resRecent.data.errorCode !==
													0
												) {
													setPopBox({
														isOpen: true,
														content: `[${resRecent.data.errorCode}] ${resRecent.data.message}`
													});
												}
											});
									}
								});
								setPopBox({ isOpen: false });
							} else {
								let content = res.data.message;
								if (res.data.errorCode === -1) {
									content = `${
										i18n.lbl_RolloverOver
									}: ${number_format(
										parseFloat(res.data.message),
										_isConvert
									)}`;
								} else if (res.data.errorCode === -2) {
									content = `${
										i18n.lbl_DepositOver
									}: ${number_format(
										parseFloat(res.data.message),
										_isConvert
									)}`;
								} else if (res.data.errorCode === -3) {
									content = `${
										i18n.lbl_WithdrawalOver
									}: ${number_format(
										parseFloat(res.data.message),
										_isConvert
									)}`;
								}
								setPopBox({
									isOpen: true,
									title: i18n.lbl_ImportantNote,
									content,
									hasBtn: false
								});
							}
						}
					} catch (error) {
						if (isMountedRef.current) {
							setPopBox({
								isOpen: true,
								content: i18n.msg_ApiServerError
							});
						}
					}
				};

				const real_amount = _isConvert
					? Number(amount) * 1000
					: Number(amount);

				const handleClickSubmit = () => {
					if (!isClickedRef.current) {
						isClickedRef.current = true;
						RedirectToNext(
							selBank.accountNo,
							real_amount,
							selBank.sysId,
							userInfo.currencyId === defCurrenyId.INR
								? selBank.ifscCode
								: null
						);
					}
					setTimeout(() => {
						isClickedRef.current = false;
					}, 1000);
				};

				setPopBox({
					isOpen: true,
					title: i18n.lbl_ImportantNote,
					content: (
						<div>
							<ul>
								<li className="text-org">
									{i18n.lbl_WithdrawalTo} :
								</li>
								<li>{selBank?.bankName}</li>
								<li className="text-org">
									{i18n.lbl_BankAccountName} :
								</li>
								<li>{bankInfo?.accountName}</li>
								<li className="text-org">
									{i18n.lbl_BankNumber} :
								</li>
								<li>{selBank?.accountNo}</li>
								<li className="text-org">
									{i18n.lbl_WithdrawalAmount} :
								</li>
								<li>
									{number_format(real_amount, _isConvert)}
								</li>
								{userInfo.currencyId === defCurrenyId.INR ? (
									<>
										<li className="text-org">
											{i18n.lbl_IFSCCode} :
										</li>
										<li>{selBank.ifscCode}</li>
									</>
								) : null}
							</ul>
						</div>
					),
					hasBtn: true,
					btnBar: (
						<div className="btn-group">
							<button
								className="white"
								onClick={() =>
									setPopBox(prevState => ({
										...prevState,
										isOpen: false
									}))
								}>
								{i18n.lbl_Cancel}
							</button>
							<button
								data-testid="RedirectToNext"
								className="orange"
								onClick={handleClickSubmit}>
								{i18n.lbl_Submit}
							</button>
						</div>
					)
				});
			}
		}
	};

	const SelectBank = b => {
		if (
			b.sysId &&
			(b.sysId !== selBank?.sysId || b.accountNo !== selBank?.accountNo)
		) {
			setSelBank(b);
		}
	};

	const ClickCancel = transId => {
		if (pageVerify) {
			const ClickPopBoxSubmit = () => {
				setPopBox({ isOpen: false });
				api.payment.SetWithdrawalCancel(transId).then(
					res => {
						if (isMountedRef.current) {
							if (res.data.errorCode === 0) {
								api.payment.GetWithdrawalInfoRecent().then(
									resRecent => {
										if (resRecent.data.errorCode === 0) {
											GetBalance();
											GetDailyWithdrawalLimit();
											setRecentDatas(resRecent.data.data);
										} else {
											setPopBox({
												isOpen: true,
												content: `[${resRecent.data.errorCode}] ${resRecent.data.message}`
											});
										}
									},
									() => {
										setPopBox({
											isOpen: true,
											content: i18n.msg_ApiServerError
										});
									}
								);
							} else {
								setPopBox({
									isOpen: true,
									content: `[${res.data.errorCode}] ${res.data.message}`
								});
							}
						}
					},
					() => {
						if (isMountedRef.current) {
							setPopBox({
								isOpen: true,
								content: i18n.msg_ApiServerError
							});
						}
					}
				);
			};

			const ClickPopBoxCancel = () => {
				setPopBox({ isOpen: false });
			};

			setPopBox({
				isOpen: true,
				title: i18n.lbl_ImportantNote,
				content: i18n.lbl_CancelConfirm,
				hasBtn: true,
				btnBar: (
					<div className="btn-group">
						<button className="white" onClick={ClickPopBoxSubmit}>
							{i18n.lbl_Yes}
						</button>
						<button className="orange" onClick={ClickPopBoxCancel}>
							{i18n.lbl_No}
						</button>
					</div>
				)
			});
		}
	};

	let banks = [];
	const showingAmount = (
		<>
			{i18n[`Currency_${userInfo.currencyId}`]}{" "}
			{number_format(balanceInfo?.availableBalance ?? 0, _isConvert)}
		</>
	);
	banks = bankInfo?.bankList?.map(b => {
		return (
			<button
				disabled={b?.disabled}
				className={
					selBank?.sysId === b.sysId &&
					selBank?.accountNo === b.accountNo
						? `active ${b?.disabled ? "pending" : ""}`
						: `${b?.disabled ? "pending" : ""}`
				}
				key={`withdrawal-bank-${b.sysId}-${b.accountNo}`}
				data-testid="bank-icon"
				onClick={SelectBank.bind(this, b)}>
				{b?.disabled && <div className="mask" />}
				<img
					src={`${paymentImgURL}/square/${b.bankLogo?.toLowerCase()}`}
					alt={b.bankName}
				/>
			</button>
		);
	});

	const withdrawalLimitHint = i18n.lbl_WithdrawalDailyMinMax
		?.replace(
			"{{0}}",
			!withdrawalLimit.withdrawalMin
				? 1
				: number_format(withdrawalLimit.withdrawalMin, _isConvert, 2)
		)
		?.replace(
			"{{1}}",
			withdrawalLimit.unlimited
				? i18n.lbl_Unlimited
				: number_format(
						withdrawalLimit.withdrawalAvailableAmount,
						_isConvert,
						2
				  )
		);

	if (!displayBankCard) return null;

	return pageVerify ? (
		<>
			<VIPLevel userInfo={userInfo} i18n={i18n} />
			<div className="name">{userInfo.userName}</div>
			<div className="text-org">{i18n.lbl_EligibleWithdrawalAmount}</div>
			<div className="balanceModule">
				<ReloadSpin func={GetBalance} content={showingAmount} />
				<RestoreAll
					i18n={i18n}
					setLoading={setLoading}
					GetBalance={GetBalance}
					setPopBox={setPopBox}
					isLogin={userInfo.isLogin}
				/>
			</div>

			<>
				<div className="selectBank">
					{banks}
					{bankInfo?.bankList?.length < 3 ? (
						<Link to={path.bankInfo.root} />
					) : null}
				</div>
				{userInfo.currencyId === defCurrenyId.INR ? (
					<div className="ifsc">
						{i18n.lbl_IFSCCode}:<span>{selBank?.ifscCode}</span>
					</div>
				) : null}
			</>

			<BalancePanel
				currencyId={userInfo.currencyId}
				i18n={i18n}
				balanceInfo={balanceInfo}
				_isConvert={_isConvert}
			/>
			<InputBox
				icon="icon-pencil"
				value={amount}
				inputType="tel"
				onChange={EditAmount}
				clickInfo={() => showTipHandler("amount")}
				infoText={withdrawalLimitHint}
				showTips={showTips.includes("amount")}
				placeholder={i18n.lbl_Amount}
				btnStatus={warning.status}
				warningMsg={warning.msg}
				testAttr="withdrawal_amount"
			/>
			<div className="text-org">
				<span>
					{`${i18n.lbl_Times}: ${withdrawalLimit.withdrawalTimes} / ${
						withdrawalLimit.maxTimes
							? withdrawalLimit?.maxTimes
							: i18n.lbl_Unlimited
					}`}
				</span>
				{withdrawalLimitHint}
			</div>
			<div className="btn-group">
				<button
					className={
						warning.status !== defIptStatus.warning &&
						!(
							withdrawalLimit.maxTimes > 0 &&
							withdrawalLimit.withdrawalTimes >=
								withdrawalLimit.maxTimes
						) &&
						!(
							!userInfo.phoneVerified &&
							userInfo.currencyId === defCurrenyId.INR
						)
							? ""
							: "gray"
					}
					disabled={
						(withdrawalLimit.maxTimes > 0 &&
							withdrawalLimit.withdrawalTimes >=
								withdrawalLimit.maxTimes) ||
						(!userInfo.phoneVerified &&
							userInfo.currencyId === defCurrenyId.INR)
					}
					data-testid="submit_withdrawal"
					onClick={checkAccount}>
					{i18n.lbl_Submit}
				</button>
			</div>
			<RecentDatas Datas={recentDatas} ClickCancel={ClickCancel} />
			<ImportantNote i18n={i18n} langId={userInfo.langId} />
		</>
	) : null;
};

export default Panel;
