import React, { useContext, useEffect, useState, useRef } from "react";
import { Redirect } from "@reach/router";
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
import RecentDatas from "./withdrawal.recentDatas";
import path from "../../path";
import WalletPanel from "./walletPanel";
import BankCardPanel from "./bankCardPanel";
import AmountPanel from "./amountPanel";
import { defIptStatus } from "../common/inputbox.hint";
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
	const [balanceInfo, setBalanceInfo] = useState({
		balance: 0,
		deduction: 0,
		availableBalance: 0
	});
	const _isConvert = isConvert(userInfo.currencyId);
	const [amount, setAmount] = useState("");
	const [inputStatus, setInputStatus] = useState(initStatus);
	const [selBank, setSelBank] = useState(null);
	const [bankInfo, setbankInfo] = useState({
		accountName: "",
		bankList: []
	});
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
				.catch(() =>
					setPopBox({
						isOpen: true,
						content: i18n.msg_ApiServerError
					})
				);

			KycCheck(true)
				.then(kycProcess => {
					if (!kycProcess) {
						api_GetWithdrawalAvailableBalance().then(
							res => {
								if (isMountedRef.current) {
									if (res.data.errorCode === 0) {
										setBalanceInfo(res.data.data);
										setLoading(false);
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
									setLoading(false);
								}
							}
						);

						api_GetWithdrawalInfoRecent()
							.then(res => {
								if (isMountedRef.current) {
									if (res.data.errorCode === 0) {
										setRecentDatas(res.data.data);
									} else {
										setPopBox({
											isOpen: true,
											content: `[${res.data.errorCode}] ${res.data.message}`
										});
									}
								}
							})
							.catch(() =>
								setPopBox({
									isOpen: true,
									content: i18n.msg_ApiServerError
								})
							);
					}
				})
				.catch(() =>
					setPopBox({
						isOpen: true,
						content: i18n.msg_ApiServerError
					})
				);
		}
	}, [
		userInfo.accountName,
		userInfo.birth_d,
		userInfo.phoneNo,
		userInfo.currencyId,
		userInfo.isLogin,
		i18n,
		setPopBox,
		pageVerify
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
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						setWithdrawalLimit(res.data.data);
					} else {
						setPopBox({
							isOpen: true,
							content: `[${res.data.errorCode}] ${res.data.message}`
						});
					}
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
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							setBalanceInfo(res.data.data);
						} else {
							setPopBox({
								isOpen: true,
								content: `[${res.data.errorCode}] ${res.data.message}`
							});
						}
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
		balanceInfo?.availableBalance !== null ||
		balanceInfo?.availableBalance !== undefined
			? balanceInfo?.availableBalance
			: 0;

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
			setInputStatus({ checked: false, msg: result.msg });
		} else {
			setInputStatus({ checked: true, msg: "" });
		}
		return result.status === 0;
	};

	const EditAmount = value => {
		const _amount = String(value).replace(/^(0+)|[^\d]+/g, "");
		VaildAmount(_amount);
		setAmount(_amount);
	};

	const clickInfo = () => {
		const _msg = i18n.lbl_AmountTooltip.replace(
			"{{0}}",
			number_format(withdrawalLimit.withdrawalMin, _isConvert, 0)
		);
		setInputStatus({
			checked: null,
			msg: inputStatus.msg === "" ? _msg : ""
		});
	};

	const ClickSubmit = () => {
		if (
			withdrawalLimit.maxTimes > 0 &&
			withdrawalLimit.withdrawalTimes >= withdrawalLimit.maxTimes
		)
			return;
		if (pageVerify) {
			const result = VaildAmount(amount) && selBank;
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
				const RedirectToNext = (accountNo, _real_amount, sysId) => {
					api_WithdrawalReq(accountNo, _real_amount, sysId).then(
						res => {
							if (isMountedRef.current) {
								if (
									res.data.errorCode === 0 ||
									res.data.errorCode === 2
								) {
									KycCheck(false).then(kycProcess => {
										if (!kycProcess) {
											setAmount("");
											setInputStatus(initStatus);
											getWithdrawalLimit();
											setSelBank(null);
											api_GetWithdrawalAvailableBalance().then(
												resBalance => {
													if (isMountedRef.current) {
														if (
															resBalance.data
																.errorCode === 0
														) {
															setBalanceInfo(
																resBalance.data
																	.data
															);
														} else {
															setPopBox({
																isOpen: true,
																content: `[${resBalance.data.errorCode}] ${resBalance.data.message}`
															});
														}
													}
												},
												() => {
													setPopBox({
														isOpen: true,
														content:
															i18n.msg_ApiServerError
													});
												}
											);
											api_GetWithdrawalInfoRecent().then(
												resRecent => {
													if (isMountedRef.current) {
														if (
															resRecent.data
																.errorCode === 0
														) {
															setRecentDatas(
																resRecent.data
																	.data
															);
														} else {
															setPopBox({
																isOpen: true,
																content: `[${resRecent.data.errorCode}] ${resRecent.data.message}`
															});
														}
													}
												},
												() => {
													setPopBox({
														isOpen: true,
														content:
															i18n.msg_ApiServerError
													});
												}
											);
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
								className="cancel"
								onClick={() =>
									setPopBox(prevState => ({
										...prevState,
										isOpen: false
									}))
								}>
								{i18n.lbl_Cancel}
							</button>
							<button
								className="submit"
								onClick={handleClickSubmit}>
								{i18n.lbl_Confirm}
							</button>
						</div>
					)
				});
			} else if (!selBank) {
				setPopBox({
					isOpen: true,
					title: i18n.lbl_ImportantNote,
					content: i18n.lbl_SelectBank_Required,
					hasBtn: false
				});
			}
		}
	};

	const GetCustBankInfo = () => {
		api_GetCustBankInfo().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						const datas = res.data.data;
						const _custBankInfo =
							datas === null ? [] : datas.bankInfoDetail;
						setbankInfo(() => ({
							accountName: datas?.accountName,
							bankList: _custBankInfo
						}));
					} else {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: `[${res.data.errorCode}] ${res.data.message}`
						});
					}
					setLoading(false);
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
	};

	const SelectBank = b => {
		if (
			!(b.sysId === selBank?.sysId && b.accountNo === selBank?.accountNo)
		) {
			setSelBank(b);
		}
	};

	const ClickCancel = transId => {
		if (pageVerify) {
			const ClickPopBoxSubmit = () => {
				setPopBox({ isOpen: false });
				api_SetWithdrawalCancel(transId).then(
					res => {
						if (isMountedRef.current) {
							if (res.data.errorCode === 0) {
								api_GetWithdrawalInfoRecent().then(
									resRecent => {
										if (resRecent.data.errorCode === 0) {
											setRecentDatas(resRecent.data.data);
											GetBalance();
											getWithdrawalLimit();
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
						<button className="cancel" onClick={ClickPopBoxSubmit}>
							{i18n.lbl_Yes}
						</button>
						<button className="submit" onClick={ClickPopBoxCancel}>
							{i18n.lbl_No}
						</button>
					</div>
				)
			});
		}
	};

	const GetWithdrawalInfoRecent = () => {
		api_GetWithdrawalInfoRecent().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						setRecentDatas(res.data.data);
					} else {
						setPopBox({
							isOpen: true,
							content: `[${res.data.errorCode}] ${res.data.message}`
						});
					}
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
			<section className="withdrawalBox">
				<WalletPanel
					i18n={i18n}
					availableBalance={_availableBalance}
					GetWithdrawalAvailableBalance={GetBalance}
				/>
				<BankCardPanel
					i18n={i18n}
					accountName={userInfo.accountName}
					custBankInfo={bankInfo?.bankList}
					selBank={selBank}
					setSelBank={setSelBank}
					setRedirectPath={setRedirectPath}
					GetCustBankInfo={GetCustBankInfo}
					SelectBank={SelectBank}
				/>
				<div className="subModuleList">
					<AmountPanel
						i18n={i18n}
						_isConvert={_isConvert}
						amount={amount}
						balanceInfo={balanceInfo}
						EditAmount={EditAmount}
						ClickSubmit={ClickSubmit}
						currencyId={userInfo.currencyId}
						clickInfo={clickInfo}
						inputStatus={inputStatus}
						VaildAmount={VaildAmount}
						withdrawalLimit={withdrawalLimit}
						withdrawalLimitHint={withdrawalLimitHint}
					/>
				</div>
				<RecentDatas
					Datas={recentDatas}
					ClickCancel={ClickCancel}
					GetRecentDatas={GetWithdrawalInfoRecent}
				/>
				<ImportantNote i18n={i18n} langId={userInfo.langId} />
			</section>
		);
	}

	if (!displayBankCard) return null;

	return content;
};

export default Panel;
