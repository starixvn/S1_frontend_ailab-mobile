import React, { useContext, useEffect, useState, useRef } from "react";
import { Redirect, Link } from "@reach/router";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	loadingContext,
	withdrawalBlockSettingContext
} from "../common/context";
import { number_format, isConvert, checkAmount } from "../common/common";
import {
	api_GetWithdrawalAvailableBalance,
	api_GetCustBankInfo
} from "../../service/api/account";
import {
	api_WithdrawalReq,
	api_GetWithdrawalInfoRecent,
	api_SetWithdrawalCancel,
	api_KycCheck,
	api_payment_GetWithdrawalLimit
} from "../../service/api/payment";
import InputBox from "../common/inputbox.info";
import { defIptStatus } from "../common/inputStatus";
import { paymentImgUrl } from "../../config";
import RecentDatas from "./withdrawal.recentDatas";
import ReloadSpin from "../common/reloadSpin";
import path from "../../path";
import ImportantNote from "./importantNote";
import { WITHDRAWAL_BLOCK_SETTING_TYPE } from "../../datas/withdrawalSetting";

const initStatus = { checked: null, msg: "" };

const Panel = () => {
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
	const [inputStatus, setInputStatus] = useState(initStatus);
	const [selBank, setSelBank] = useState(null);
	const [bankInfo, setbankInfo] = useState({ accountName: "", bankList: [] });
	const [recentDatas, setRecentDatas] = useState([]);
	const [withdrawalLimit, setWithdrawalLimit] = useState({
		withdrawalMin: 0
	});
	const [redirectPath, setRedirectPath] = useState(null);
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
		if (isMountedRef.current && redirectPath !== null) {
			setRedirectPath(null);
		}
	}, [redirectPath]);

	useEffect(() => {
		if (userInfo.isLogin) {
			getWithdrawalLimit();
		}
	}, [userInfo.isLogin]);

	useEffect(() => {
		if (
			userInfo.isLogin &&
			userInfo.currencyId &&
			(!userInfo.accountName || !userInfo.phoneNo)
		) {
			const ClosePopBox = () => {
				setPopBox({ isOpen: false });
				setRedirectPath(
					`/${path.member.root}?prevPage=${path.withdrawal.root}`
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
			api_GetCustBankInfo()
				.then(res => {
					if (res.data.errorCode === 0) {
						if (res.data.data?.bankInfoDetail?.length) {
							setPopBox({ isOpen: false });
							if (isMountedRef.current) {
								setbankInfo(() => ({
									accountName: res.data.data.accountName,
									bankList: res.data.data.bankInfoDetail
								}));
								const defAccountNoIdx = res.data.data.bankInfoDetail?.findIndex(
									obj =>
										obj.accountNo ===
										res.data.data.defAccountNo
								);

								const noDisabledAccountIdx = res.data.data?.bankInfoDetail.findIndex(
									obj => !obj.disabled
								);

								// * 若有 disabled 則不會 setSelBank 所以有可能不會有預設所選到的 bankCard
								if (
									defAccountNoIdx !== -1 &&
									!res.data.data.bankInfoDetail[
										defAccountNoIdx
									]?.disabled
								) {
									setSelBank(
										res.data.data.bankInfoDetail[
											defAccountNoIdx
										]
									);
								} else if (
									defAccountNoIdx === -1 &&
									!res.data.data.bankInfoDetail[0]?.disabled
								) {
									setSelBank(res.data.data.bankInfoDetail[0]);
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
						}
					} else {
						setPopBox({
							isOpen: true,
							content: `[${res.data.errorCode}] ${res.data.message}`
						});
					}
				})
				.catch(() => {
					setPopBox({
						isOpen: true,
						content: i18n.msg_ApiServerError
					});
				});

			KycCheck(true)
				.then(kycProcess => {
					if (!kycProcess) {
						api_GetWithdrawalAvailableBalance().then(
							res => {
								if (
									res.data.errorCode === 0 &&
									isMountedRef.current
								) {
									setBalanceInfo(res.data.data);
									setLoading(false);
								} else if (res.data.errorCode !== 0) {
									setPopBox({
										isOpen: true,
										content: `[${res.data.errorCode}] ${res.data.message}`
									});
								}
							},
							() => {
								if (isMountedRef.current) {
									setPopBox({
										isOpen: true,
										content: i18n.msg_ApiServerError
									});
									setLoading(false);
								}
							}
						);

						api_GetWithdrawalInfoRecent()
							.then(res => {
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
							})
							.catch(() => {
								setPopBox({
									isOpen: true,
									content: i18n.msg_ApiServerError
								});
							});
					}
				})
				.catch(() => {
					setPopBox({
						isOpen: true,
						content: i18n.msg_ApiServerError
					});
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
		setLoading
	]);

	const KycCheck = async UpdatePageVerify => {
		const executeKycProcess = await api_KycCheck().then(res => {
			if (isMountedRef.current) {
				if (res.data.errorCode === 1) {
					setRedirectPath(`/${path.kyc.root}`);
				} else if (res.data.errorCode === 2) {
					setRedirectPath(`/${path.kycWaiting.root}`);
				} else if (isMountedRef.current && UpdatePageVerify) {
					setPageVerify(true);
				}
			}

			return res.data.errorCode === 1 || res.data.errorCode === 2;
		});

		return executeKycProcess;
	};

	const getWithdrawalLimit = () => {
		api_payment_GetWithdrawalLimit().then(
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

	const GetBalance = () => {
		if (pageVerify) {
			api_GetWithdrawalAvailableBalance().then(
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

	const _availableBalance =
		balanceInfo?.availableBalance !== null &&
		balanceInfo?.availableBalance !== undefined
			? balanceInfo?.availableBalance
			: null;

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

		setInputStatus({ checked: result.status === 0, msg: result.msg });
		return result.status === 0;
	};

	const EditAmount = e => {
		const { value } = e.target;
		const _amount = String(value).replace(/^(0+)|[^\d]+/g, "");
		VaildAmount(_amount);
		setAmount(_amount);
	};

	const ClickSubmit = () => {
		if (
			withdrawalLimit.maxTimes > 0 &&
			withdrawalLimit.withdrawalTimes >= withdrawalLimit.maxTimes
		)
			return;
		if (pageVerify) {
			const result = VaildAmount(amount);
			if (!bankInfo?.bankList?.length) {
				const ClosePopBox = () => {
					setPopBox({ isOpen: false });
					setRedirectPath(
						`/${path.member.root}/${path.member.sub.bankInfo.root}`
					);
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
				return;
			}
			if (result) {
				const RedirectToNext = (accountNo, _realAmount, sysId) => {
					api_WithdrawalReq(accountNo, _realAmount, sysId).then(
						res => {
							if (isMountedRef.current) {
								if (
									res.data.errorCode === 0 ||
									res.data.errorCode === 2
								) {
									KycCheck(false).then(
										kycProcess => {
											if (!kycProcess) {
												setAmount("");
												GetBalance();
												getWithdrawalLimit();
												setInputStatus(initStatus);
												api_GetWithdrawalInfoRecent().then(
													response => {
														if (
															response.data
																.errorCode ===
																0 &&
															isMountedRef.current
														) {
															setRecentDatas(
																response.data
																	.data
															);
														} else if (
															response.data
																.errorCode !== 0
														) {
															setPopBox({
																isOpen: true,
																content: `[${response.data.errorCode}] ${response.data.message}`
															});
														}
													}
												);
											}
										},
										() => {
											setPopBox({
												isOpen: true,
												content: i18n.msg_ApiServerError
											});
										}
									);

									setPopBox({ isOpen: false });
								} else {
									let content = res.data.message;
									if (res.data.errorCode === -1) {
										content = `${
											i18n.lbl_RolloverOver
										}: ${number_format(
											parseFloat(res.data.message),
											_isConvert,
											0
										)}`;
									} else if (res.data.errorCode === -2) {
										content = `${
											i18n.lbl_DepositOver
										}: ${number_format(
											parseFloat(res.data.message),
											_isConvert,
											0
										)}`;
									} else if (res.data.errorCode === -3) {
										content = `${
											i18n.lbl_WithdrawalOver
										}: ${number_format(
											parseFloat(res.data.message),
											_isConvert,
											0
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

				const real_amount = _isConvert
					? Number(amount) * 1000
					: Number(amount);

				const handleClickSubmit = () => {
					if (!isClickedRef.current) {
						isClickedRef.current = true;
						RedirectToNext(
							selBank.accountNo,
							real_amount,
							selBank.sysId
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
								<li>
									{i18n.lbl_WithdrawalTo}
									<span>{selBank?.bankName}</span>
								</li>
								<li>
									{i18n.lbl_BankAccountName}
									<span>{bankInfo?.accountName}</span>
								</li>
								<li>
									{i18n.lbl_BankNumber}
									<span>{selBank?.accountNo}</span>
								</li>
								<li>
									{i18n.lbl_WithdrawalAmount}
									<span>
										{number_format(
											real_amount,
											_isConvert,
											0
										)}
									</span>
								</li>
							</ul>
						</div>
					),
					hasBtn: true,
					btnBar: (
						<div className="btn-group">
							<button
								className="darkGray"
								onClick={() =>
									setPopBox(prevState => ({
										...prevState,
										isOpen: false
									}))
								}>
								{i18n.lbl_Cancel}
							</button>
							<button
								className="lightBlue"
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
		if (b.sysId !== selBank?.sysId || b.accountNo !== selBank?.accountNo) {
			setSelBank(b);
		}
	};

	const ClickCancel = transId => {
		if (pageVerify) {
			const submitConfirm = () => {
				setPopBox({ isOpen: false });
				api_SetWithdrawalCancel(transId).then(
					res => {
						if (isMountedRef.current) {
							if (res.data.errorCode === 0) {
								api_GetWithdrawalInfoRecent().then(
									response => {
										if (response.data.errorCode === 0) {
											setRecentDatas(res.data.data);
											GetBalance();
											getWithdrawalLimit();
										} else {
											setPopBox({
												isOpen: true,
												content: `[${response.data.errorCode}] ${response.data.message}`
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

			const closePopBox = () => {
				setPopBox({ isOpen: false });
			};

			setPopBox({
				isOpen: true,
				title: i18n.lbl_ImportantNote,
				content: i18n.lbl_CancelConfirm,
				hasBtn: true,
				btnBar: (
					<div className="btn-group">
						<button className="darkGray" onClick={closePopBox}>
							{i18n.lbl_Cancel}
						</button>
						<button className="lightBlue" onClick={submitConfirm}>
							{i18n.lbl_Submit}
						</button>
					</div>
				)
			});
		}
	};

	const clickInfo = () => {
		const info =
			inputStatus.msg === ""
				? i18n.lbl_AmountTooltip?.replace(
						"{{0}}",
						number_format(
							withdrawalLimit.withdrawalMin,
							_isConvert,
							0
						)
				  )
				: "";
		setInputStatus({ checked: null, msg: info });
	};

	const GetWithdrawalInfoRecent = () => {
		api_GetWithdrawalInfoRecent().then(
			res => {
				if (res.data.errorCode === 0 && isMountedRef.current) {
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
	};

	const banks = bankInfo?.bankList?.map(b => {
		return (
			<button
				disabled={b?.disabled}
				className={
					selBank?.sysId === b.sysId &&
					selBank?.accountNo === b.accountNo
						? `open ${b?.disabled ? "pending" : ""}`
						: `${b?.disabled ? "pending" : ""}`
				}
				key={`withdrawal-bank-${b.sysId}-${b.accountNo}`}
				onClick={SelectBank.bind(this, b)}>
				{b?.disabled && <div className="mask" />}
				<img
					src={`${paymentImgUrl}/${b.bankLogo?.toLowerCase()}`}
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

	let content = null;
	if (redirectPath !== null) {
		content = <Redirect to={redirectPath} noThrow />;
	} else if (pageVerify) {
		content = (
			<>
				<div className="avatar" />
				<div className="name">{userInfo.userName}</div>
				<div className="text-org">
					{i18n.lbl_EligibleWithdrawalAmount}
				</div>
				{_availableBalance === null ? null : (
					<div className="balance">
						{`${
							i18n[`Currency_${userInfo.currencyId}`]
						} ${number_format(_availableBalance, _isConvert, 0)}`}
						<ReloadSpin func={GetBalance} />
					</div>
				)}
				<InputBox
					icon="icon icon-pencil"
					value={amount}
					inputType="tel"
					onChange={EditAmount}
					btnStatus={inputStatus.checked}
					tip={inputStatus.msg}
					clickInfo={clickInfo}
					numberConvert={true}
					onBlur={VaildAmount.bind(this, amount)}
				/>

				{/* <div className="tip"> */}
				{withdrawalLimit && (
					<span className="times">
						{`${i18n.lbl_Times}: ${
							withdrawalLimit.withdrawalTimes
						} / ${
							withdrawalLimit.maxTimes
								? withdrawalLimit.maxTimes
								: i18n.lbl_Unlimited
						}`}
					</span>
				)}
				<br />
				<span>{withdrawalLimitHint}</span>
				{/* </div> */}

				<div className="inputBox">
					<div className="selectBank">
						{banks}
						{bankInfo?.bankList?.length < 3 && (
							<Link
								to={`/${path.member.root}/${path.member.sub.bankInfo.root}`}>
								<i className="icon icon-plus1" />
							</Link>
						)}
					</div>
				</div>

				<div className="btn-group">
					<button className="lightBlue" onClick={ClickSubmit}>
						{i18n.lbl_Submit}
					</button>
				</div>
				<RecentDatas
					Datas={recentDatas}
					ClickCancel={ClickCancel}
					GetRecentDatas={GetWithdrawalInfoRecent}
				/>
				<ImportantNote i18n={i18n} langId={userInfo.langId} />
			</>
		);
	}

	if (!displayBankCard) return null;

	return content;
};

export default Panel;
