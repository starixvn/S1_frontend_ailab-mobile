import React, { useContext, useEffect, useState, useRef } from "react";
import { Redirect } from "@reach/router";
import path from "../../path";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	loadingContext,
	withdrawalBlockSettingContext
} from "../common/context";
import RecentDatas from "./withdrawal.recentDatas";
import { number_format, isConvert, checkAmount } from "../common/common";
import {
	api_account_GetCustEWalletInfo,
	api_GetWithdrawalAvailableBalance
} from "../../service/api/account";
import {
	api_GetWithdrawalInfoRecent,
	api_SetWithdrawalCancel,
	api_KycCheck,
	api_payment_GetWithdrawalLimit,
	api_payment_WithdrawalEWalletReq
} from "../../service/api/payment";
import WalletPanel from "./walletPanel";
import EWalletCardPanel from "./eWalletCardPanel";
import AmountPanel from "./amountPanel";
import { defIptStatus } from "../common/inputbox.hint";
import ImportantNote from "./importantNote";
import { WITHDRAWAL_BLOCK_SETTING_TYPE } from "../../datas/withdrawalSetting";

const initStatus = { checked: null, msg: "" };

const initSelectedEWallet = {
	eWalletName: "",
	eWalletLogo: "",
	eWalletSite: null,
	sysId: null,
	accountNo: ""
};

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setLoading } = useContext(loadingContext);
	const _isConvert = isConvert(userInfo.currencyId);
	const { withdrawalSettingTypeList } = useContext(
		withdrawalBlockSettingContext
	);
	const [amount, setAmount] = useState("");
	const [redirectPath, setRedirectPath] = useState(null);
	const [pageVerify, setPageVerify] = useState(true);
	const [balanceInfo, setBalanceInfo] = useState({
		balance: 0,
		deduction: 0,
		availableBalance: 0
	});
	const [recentDatas, setRecentDatas] = useState([]);
	const [inputStatus, setInputStatus] = useState(initStatus);
	const [withdrawalLimit, setWithdrawalLimit] = useState({
		withdrawalMin: 0
	});
	const [eWalletInfo, setEWalletInfo] = useState({
		accountName: "",
		eWalletList: []
	});
	const [selectedEWallet, setSelectedEWallet] = useState(initSelectedEWallet);
	const isMountedRef = useRef(null);
	const isClickedRef = useRef(false);
	const _availableBalance =
		balanceInfo?.availableBalance !== null &&
		balanceInfo?.availableBalance !== undefined
			? balanceInfo?.availableBalance
			: null;

	const displayEWallet =
		withdrawalSettingTypeList?.find(
			item => item.type === WITHDRAWAL_BLOCK_SETTING_TYPE.EWallet
		)?.status ?? true;

	const GetDailyWithdrawalLimit = () => {
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

	const GetBalance = () => {
		if (pageVerify) {
			api_GetWithdrawalAvailableBalance().then(
				res => {
					if (res.data.errorCode === 0 && isMountedRef.current) {
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
					setPopBox({
						isOpen: true,
						content: i18n.msg_ApiServerError
					});
					setLoading(false);
				}
			);
		}
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

	const GetCustEWalletInfo = () => {
		api_account_GetCustEWalletInfo()
			.then(res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						const { data } = res.data;
						if (data !== null) {
							setEWalletInfo(() => ({
								accountName: userInfo.accountName,
								eWalletList: data
							}));
							// bwing goal 沒有 defAccountNo 參數 這裡先拿第一個當已選取的
							setSelectedEWallet(
								res.data.data?.[0] || initSelectedEWallet
							);
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
	};

	const EditAmount = value => {
		const _amount = String(value).replace(/^(0+)|[^\d]+/g, "");
		VaildAmount(_amount);
		setAmount(_amount);
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

	const placeHolderHandle = () => {
		return `${i18n.lbl_MinMaxAmount}:${number_format(
			withdrawalLimit.eWalletWithdrawalMin,
			_isConvert,
			0
		)}/${
			withdrawalLimit.unlimited
				? i18n.lbl_Unlimited
				: number_format(
						withdrawalLimit.eWalletWithdrawalAvailableAmount,
						_isConvert,
						0
				  )
		}`;
	};

	const SelectEWallet = eWallet => {
		if (
			eWallet.sysId &&
			(eWallet.sysId !== selectedEWallet?.sysId ||
				eWallet.accountNo !== selectedEWallet?.accountNo)
		) {
			setSelectedEWallet(eWallet);
		}
	};

	const VaildAmount = _amount => {
		let result = {};
		const real_amount = _isConvert
			? Number(_amount) * 1000
			: Number(_amount);
		if (
			!withdrawalLimit.unlimited &&
			real_amount > withdrawalLimit.eWalletWithdrawalAvailableAmount
		) {
			result = {
				status: defIptStatus.warning,
				msg: i18n.lbl_NotinLimit
			};
		} else if (
			!withdrawalLimit.unlimited &&
			real_amount > withdrawalLimit.withdrawalAvailableAmount
		) {
			result = {
				status: defIptStatus.warning,
				msg: i18n.lbl_WithdrawalDailyReached
			};
		} else if (
			real_amount < withdrawalLimit.eWalletWithdrawalMin ||
			(!withdrawalLimit.unlimited &&
				real_amount > withdrawalLimit.withdrawalAvailableAmount)
		) {
			const _msg = i18n.lbl_AmountTooltip.replace(
				"{{0}}",
				number_format(
					withdrawalLimit.eWalletWithdrawalMin,
					_isConvert,
					0
				)
			);
			result = {
				status: defIptStatus.warning,
				msg: _msg
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
			GetDailyWithdrawalLimit();
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
			GetCustEWalletInfo();

			KycCheck(true)
				.then(kycProcess => {
					if (!kycProcess) {
						GetBalance();
						GetWithdrawalInfoRecent();
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

	const ClickSubmit = () => {
		if (
			withdrawalLimit.maxTimes > 0 &&
			withdrawalLimit.withdrawalTimes >= withdrawalLimit.maxTimes
		)
			return;
		if (pageVerify) {
			const result = VaildAmount(amount);
			if (!eWalletInfo?.eWalletList?.length) {
				const ClosePopBox = () => {
					setPopBox({ isOpen: false });
					setRedirectPath(
						`/${path.member.root}/${path.member.sub.eWallet.root}`
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
					// 參數 memo 送空字串
					api_payment_WithdrawalEWalletReq({
						AccountNo: accountNo,
						amount: _realAmount,
						sysId,
						memo: ""
					}).then(
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
												setInputStatus(initStatus);
												setSelectedEWallet(null);
												GetDailyWithdrawalLimit();
												GetBalance();
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
							selectedEWallet.accountNo,
							real_amount,
							selectedEWallet.sysId
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
									<span>{selectedEWallet?.eWalletName}</span>
								</li>
								<li>
									{i18n.lbl_BankAccountName}
									<span>{eWalletInfo?.accountName}</span>
								</li>
								<li>
									{i18n.lbl_BankNumber}
									<span>{selectedEWallet?.accountNo}</span>
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
								className="btn-gray"
								onClick={() =>
									setPopBox(prevState => ({
										...prevState,
										isOpen: false
									}))
								}>
								{i18n.lbl_Cancel}
							</button>
							<button
								className="btn-primary"
								onClick={handleClickSubmit}>
								{i18n.lbl_Submit}
							</button>
						</div>
					)
				});
			}
		}
	};

	const ClickCancel = () => {
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
											GetDailyWithdrawalLimit();
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
						<button className="btn-gray" onClick={closePopBox}>
							{i18n.lbl_Cancel}
						</button>
						<button className="btn-primary" onClick={submitConfirm}>
							{i18n.lbl_Submit}
						</button>
					</div>
				)
			});
		}
	};

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
				<EWalletCardPanel
					i18n={i18n}
					custEWalletInfo={eWalletInfo?.eWalletList}
					selectedEWallet={selectedEWallet}
					setSelectedEWallet={setSelectedEWallet}
					setRedirectPath={setRedirectPath}
					GetCustEWalletInfo={GetCustEWalletInfo}
					SelectEWallet={SelectEWallet}
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
						placeholder={placeHolderHandle()}
						isEWallet={true}
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

	if (!displayEWallet) return null;

	return content;
};

export default Panel;
