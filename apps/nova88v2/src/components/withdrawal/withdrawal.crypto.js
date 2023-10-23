import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "@reach/router";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	loadingContext,
	withdrawalBlockSettingContext
} from "../common/context";
import { number_format, isConvert, checkAmount } from "../common/common";
import { defPopBoxType } from "../common/popbox";
import InputBox from "../common/inputbox.hint";
import { defIptStatus } from "../common/inputStatus";
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
	const { setUserInfo, userInfo } = useContext(userInfoContext);
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
		uSDTDetail: []
	});
	const [allWithdrawalLimit, setWithdrawalLimit] = useState({});
	const [limitInfo, setLimitInfo] = useState({
		limit: {},
		withdrawalLimitHint: ""
	});
	const { showTips, showTipHandler } = useTip();
	const [recentDatas, setRecentDatas] = useState([]);
	const [pageVerify, setPageVerify] = useState(true);

	const isMountedRef = useRef(null);
	const isClickedRef = useRef(false);

	const displayCrypto =
		withdrawalSettingTypeList?.find(
			item => item.type === WITHDRAWAL_BLOCK_SETTING_TYPE.Crypto
		)?.status ?? true;

	const GetDailyWithdrawalLimit = () => {
		api.payment.GetWithdrawalLimit().then(
			res => {
				if (res.data.errorCode === 0 && isMountedRef.current) {
					const limit = {
						unlimited: res.data.data?.unlimited,
						withdrawalAvailableAmount:
							res.data.data?.withdrawalAvailableAmount,
						withdrawalMin: res.data.data?.withdrawalMin,
						maxTimes: res.data.data.maxTimes,
						withdrawalTimes: res.data.data.withdrawalTimes
					};

					setLimitInfo({
						limit,
						withdrawalLimitHint: limitHint(limit)
					});
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

	const getCustBankInfo = () => {
		api.account.GetCustBankInfo().then(
			res => {
				if (res.data.errorCode === 0) {
					if (res.data.data?.uSDTDetail?.length) {
						setPopBox({ isOpen: false });
						if (isMountedRef.current) {
							setUserInfo(prev => ({
								...prev,
								accountName: res.data?.data?.accountName
							}));
							setbankInfo(() => ({
								accountName: res.data?.data?.accountName,
								uSDTDetail: res.data?.data?.uSDTDetail || []
							}));
							setSelBank(res.data?.data?.uSDTDetail?.[0]);
							if (!pageVerify) {
								setPageVerify(true);
							}
						}
					} else {
						setbankInfo(() => ({
							accountName: res.data?.data?.accountName || "",
							uSDTDetail: []
						}));
					}
				} else {
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
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (!bankInfo.uSDTDetail?.length) {
			return;
		}
		const curNetwork = selBank?.network;
		const cryptoLimit = allWithdrawalLimit?.usdtList?.find(
			el =>
				el.network === curNetwork &&
				el.currencyId === selBank?.currencyId
		);
		const limit = {
			...cryptoLimit,
			withdrawalAvailableAmount:
				allWithdrawalLimit.withdrawalAvailableAmount,
			unlimited: allWithdrawalLimit.unlimited,
			maxTimes: allWithdrawalLimit.maxTimes
		};
		setLimitInfo({ withdrawalLimitHint: limitHint(limit), limit });
	}, [selBank, i18n, allWithdrawalLimit]);

	useEffect(() => {
		if (!selBank || !amount) return;
		VaildAmount(amount);
	}, [limitInfo]);

	useEffect(() => {
		getCustBankInfo();
	}, [allWithdrawalLimit]);

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
			GetDailyWithdrawalLimit();

			KycCheck(true).then(kycProcess => {
				if (!kycProcess) {
					if (userInfo.isLogin) {
						api.account.GetWithdrawalAvailableBalance().then(
							res => {
								if (
									res.data.errorCode === 0 &&
									isMountedRef.current
								) {
									setBalanceInfo(res.data.data);
								} else if (res.data.errorCode !== 0) {
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
										content: i18n.msg_ApiServerError
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

			// CheckBankInfo().then(hasBankInfo => {
			// 	if (hasBankInfo) {
			// 	}
			// });
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
		if (!limitInfo?.limit) return null;

		if (
			!limitInfo.limit.unlimited &&
			real_amount > limitInfo.limit.withdrawalAvailableAmount
		) {
			result = {
				status: defIptStatus.warning,
				msg: i18n.lbl_WithdrawalDailyReached
			};
		} else {
			result = checkAmount({
				amount: _amount,
				minAmount: limitInfo.limit.withdrawalMin,
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
		if (bankInfo?.uSDTDetail?.length > 0) {
			ClickSubmit();
		} else {
			const ClosePopBox = () => {
				setPopBox({ isOpen: false });
				navigate(`/${userInfo.langId}/${path.cryptoWallet.root}`);
			};

			if (isMountedRef.current) {
				setPopBox({
					isOpen: true,
					title: i18n.lbl_ImportantNote,
					content: i18n.lbl_UpdateCryptoWalletAddr,
					hasBtn: true,
					hideCloseBtn: true,
					btnBar: (
						<div className="btn-group">
							<button className="blue" onClick={ClosePopBox}>
								{i18n.lbl_Btn_UpdateCryptoWallet}
							</button>
						</div>
					)
				});
			}
		}
	};

	const ClickSubmit = () => {
		if (pageVerify) {
			const result = VaildAmount(amount);
			if (result && !selBank.disabled) {
				const RedirectToNext = async ({
					accountNo,
					real_amount,
					exchangeInfo
				}) => {
					const blackbox = await Iov_GetBlackBox();
					const { rate, to_Amount } = exchangeInfo;

					try {
						const res = await api.payment.WithdrawalCryptoReq({
							AccountNo: accountNo,
							amount: real_amount,
							blackbox,
							CurrencyId: selBank.currencyId,
							ExchangeRate: rate,
							ExchangeAmount: to_Amount
						});

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

				const handleClickSubmit = ({ exchangeInfo }) => {
					let target;
					if (selBank.usdtAddress) {
						api.account.GetCustBankInfo().then(
							res => {
								if (isMountedRef.current) {
									const { uSDTDetail } = res.data.data;
									if (uSDTDetail && uSDTDetail.length > 0) {
										target = uSDTDetail.find(
											({ usdtAddress }) =>
												usdtAddress ===
												selBank.usdtAddress
										);
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
					if (target !== undefined && target.disabled) return;

					if (!isClickedRef.current) {
						isClickedRef.current = true;
						RedirectToNext({
							accountNo: selBank.usdtAddress,
							real_amount,
							exchangeInfo
						});
					}
					setTimeout(() => {
						isClickedRef.current = false;
					}, 1000);
				};

				api.payment
					.GetExchangeInfo({
						Amount: real_amount,
						CurrencyName: selBank.currencyName,
						Network: selBank.network
					})
					.then(
						res => {
							if (
								res.data.errorCode === 0 &&
								isMountedRef.current
							) {
								setPopBox({
									isOpen: true,
									title: i18n.lbl_ImportantNote,
									content: (
										<div>
											<ul>
												<li className="text-org">
													{i18n.lbl_WithdrawalTo} :
												</li>
												<li>{selBank?.nickName}</li>
												<li className="text-org">
													{
														i18n.lbl_CryptoWalletAddress
													}{" "}
													:
												</li>
												<li>{selBank?.usdtAddress}</li>
												<li className="text-org">
													{i18n.lbl_WithdrawalAmount}{" "}
													:
												</li>
												<li>
													{number_format(
														real_amount,
														_isConvert
													)}
												</li>
												<li className="text-org">
													{`${i18n.lbl_ReceiveUSDT} :`}
												</li>
												<li>
													{Number(
														res.data.data.to_Amount
													).toString()}
												</li>
												<li className="text-org">
													{`${i18n.lbl_WithdrawalCryptoNote}`}
												</li>
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
												onClick={() => {
													handleClickSubmit({
														exchangeInfo:
															res.data.data
													});
												}}>
												{i18n.lbl_Submit}
											</button>
										</div>
									)
								});
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
	};
	const SelectBank = b => {
		if (
			b.usdtAddress === selBank?.usdtAddress &&
			b.currencyId === selBank?.currencyId
		)
			return;

		setSelBank(b);
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
	const closePopbox = () => {
		navigate(`/${userInfo.langId}/${path.profile.root}`);
		setPopBox({ isOpen: false });
	};

	const addCryptoWallet = () => {
		if (userInfo.isLogin) {
			if (!userInfo.phoneVerified) {
				setPopBox({
					isOpen: true,
					title: i18n.lbl_ImportantNote,
					content: i18n.lbl_Crypto_OTP,
					hasBtn: true,
					hideCloseBtn: true,
					btnBar: (
						<div className="btn-group">
							<button onClick={closePopbox}>
								{i18n.lbl_UpdatePersonalDetail}
							</button>
						</div>
					)
				});
			} else {
				setPopBox({
					title: i18n.lbl_Add_Crypto_Wallet,
					isOpen: true,
					popBoxType: defPopBoxType.AddCryptoWallet,
					GetCustBankInfo: getCustBankInfo
				});
			}
		} else {
			api.accountStrict.GetCustProfile().then(
				res_custInfo => {
					if (
						res_custInfo.data.errorCode === 0 &&
						isMountedRef.current
					) {
						const { data } = res_custInfo.data;
						if (!data.phoneVerified) {
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
								content: i18n.lbl_Crypto_OTP,
								hasBtn: true,
								hideCloseBtn: true,
								btnBar: (
									<div className="btn-group">
										<button onClick={closePopbox}>
											{i18n.lbl_UpdatePersonalDetail}
										</button>
									</div>
								)
							});
						} else {
							setPopBox({
								title: i18n.lbl_Add_Crypto_Wallet,
								isOpen: true,
								popBoxType: defPopBoxType.AddCryptoWallet,
								GetCustBankInfo: getCustBankInfo
							});
						}
					} else if (res_custInfo.data.errorCode !== 0) {
						setPopBox({
							isOpen: true,
							content: `[${res_custInfo.data.errorCode}] ${res_custInfo.data.message}`
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

	const delUSDTwallet = ({
		USDTAddress,
		NickName,
		AccountName,
		CurrencyId
	}) => {
		setPopBox({
			isOpen: true,
			title: i18n.lbl_ImportantNote,
			content: i18n.lbl_CheckConfirm,
			hasBtn: true,
			btnBar: (
				<div className="btn-group">
					<button
						className="white"
						onClick={() =>
							removeAccount({
								USDTAddress,
								NickName,
								AccountName,
								CurrencyId
							})
						}>
						{i18n.lbl_Yes}
					</button>
					<button className="orange" onClick={closePopbox}>
						{i18n.lbl_No}
					</button>
				</div>
			)
		});
	};

	const removeAccount = ({
		USDTAddress,
		NickName,
		AccountName,
		CurrencyId
	}) => {
		api.accountStrict
			.DelCustUSDTInfo({ USDTAddress, NickName, AccountName, CurrencyId })
			.then(res => {
				if (res.data.errorCode === 0) {
					getCustBankInfo();
					setPopBox({ isOpen: false });
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

	let banks = [];
	const showingAmount = (
		<>
			{i18n[`Currency_${userInfo.currencyId}`]}{" "}
			{number_format(balanceInfo?.availableBalance ?? 0, _isConvert)}
		</>
	);

	banks = bankInfo?.uSDTDetail?.map(b => {
		return (
			<div
				className={`account${
					selBank?.usdtAddress === b.usdtAddress &&
					selBank?.currencyName === b.currencyName
						? " active"
						: ""
				} ${b.disabled ? "pending" : ""}`}
				key={`withdrawal-bank-${b.usdtAddress}-${b.currencyId}`}
				data-testid="crypto-address-icon"
				onClick={SelectBank.bind(this, b)}>
				<div className="nickName">{b.nickName}</div>
				<div className="nickName">
					{b.currencyName === b.network
						? b.currencyName
						: `${b.currencyName}-${b.network}`}
				</div>
				<div className="icon icon-USDT">{b.usdtAddress}</div>
				{b.disabled ? <div className="mask" /> : null}

				{/* * 暫時隱藏 delete crypto wallet 按鈕，以防止有用戶重複新增刪除帳號來套利，當 risk 評估覺得可以的話有機會再打開 */}
				{/* <button
					onClick={() =>
						delUSDTwallet({
							USDTAddress: b.usdtAddress,
							NickName: b.nickName,
							AccountName: userInfo.accountName,
							CurrencyId: b.currencyId
						})
					}
					className="icon icon-bin clickBtn"
				/> */}
			</div>
		);
	});
	if (banks?.length < 3) {
		banks?.push(
			<div key="add bank" className="account" onClick={addCryptoWallet}>
				<div className="icon icon-plus text-org" />
			</div>
		);
	}

	const limitHint = limit => {
		if (!limit)
			return i18n.lbl_WithdrawalDailyMinMax?.replace(
				"{{0}}/{{1}}",
				i18n.lbl_Unlimited
			);
		return i18n.lbl_WithdrawalDailyMinMax
			?.replace(
				"{{0}}",
				!limit?.withdrawalMin
					? 1
					: number_format(limit?.withdrawalMin, _isConvert, 2)
			)
			?.replace(
				"{{1}}",
				limit?.unlimited
					? i18n.lbl_Unlimited
					: number_format(
							limit?.withdrawalAvailableAmount,
							_isConvert,
							2
					  )
			);
	};

	if (!displayCrypto) return null;

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
			<div className="bankAccount">{banks}</div>
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
				infoText={limitInfo.withdrawalLimitHint}
				showTips={showTips.includes("amount")}
				placeholder={i18n.lbl_Amount}
				btnStatus={warning.status}
				warningMsg={warning.msg}
				testAttr="withdrawal_amount"
			/>
			<div className="text-org">
				{limitInfo?.limit && (
					<span>
						{`${i18n.lbl_Times}: ${
							limitInfo?.limit.withdrawalTimes
						} / ${
							limitInfo.limit.maxTimes
								? limitInfo.limit.maxTimes
								: i18n.lbl_Unlimited
						}`}
					</span>
				)}
				{limitInfo.withdrawalLimitHint}
			</div>
			<div className="btn-group">
				<button
					className={
						warning.status !== defIptStatus.warning &&
						!(
							limitInfo?.limit?.maxTimes > 0 &&
							limitInfo?.limit?.withdrawalTimes >=
								limitInfo?.limit?.maxTimes
						)
							? ""
							: "gray"
					}
					disabled={
						limitInfo?.limit?.maxTimes > 0 &&
						limitInfo?.limit?.withdrawalTimes >=
							limitInfo?.limit?.maxTimes
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
