import React, { useContext, useEffect, useState, useRef } from "react";
import { Redirect, useNavigate } from "@reach/router";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	loadingContext
} from "../common/context";
import { number_format, isConvert, checkAmount } from "../common/common";
import {
	api_GetWithdrawalAvailableBalance,
	api_GetCustBankInfo
} from "../../service/api/account";
import {
	api_GetWithdrawalInfoRecent,
	api_SetWithdrawalCancel,
	api_KycCheck,
	api_payment_GetWithdrawalLimit,
	api_WithdrawalCryptoReq,
	api_payment_GetExchangeInfo
} from "../../service/api/payment";
import { api_DelCustCryptoWallet } from "../../service/api/accountStrict";
import { defIptStatus } from "../common/inputbox.hint";
import RecentDatas from "./withdrawal.recentDatas";
import WalletPanel from "./walletPanel";
import AmountPanel from "./amountPanel";
import path from "../../path";
import ImportantNote from "./importantNote";
import { defPopBoxType } from "../common/popbox";

const initStatus = { checked: null, msg: "" };

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const navigate = useNavigate();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setLoading } = useContext(loadingContext);
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
		uSDTDetail: []
	});
	const [recentDatas, setRecentDatas] = useState([]);
	const [allWithdrawalLimit, setWithdrawalLimit] = useState({});
	const [limitInfo, setLimitInfo] = useState({
		limit: null,
		withdrawalLimitHint: ""
	});
	const [redirectPath, setRedirectPath] = useState(null);
	const [pageVerify, setPageVerify] = useState(true);
	const isMountedRef = useRef(null);
	const isClickedRef = useRef(false);

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
		if (!bankInfo.uSDTDetail?.length) {
			return;
		}
		const curNetwork = selBank?.network;

		const cryptoLimit = allWithdrawalLimit?.usdtList.find(
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

		setInputStatus(initStatus);
		setLimitInfo({ withdrawalLimitHint: limitHint(limit), limit });
	}, [selBank, i18n]);

	useEffect(() => {
		if (!selBank || !amount) return;
		VaildAmount(amount);
	}, [limitInfo]);

	useEffect(() => {
		GetCustBankInfo();
	}, [allWithdrawalLimit]);

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
			api_payment_GetWithdrawalLimit().then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
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
		userInfo.phoneNo,
		userInfo.currencyId,
		userInfo.isLogin,
		i18n,
		setPopBox,
		setLoading
	]);

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

	const GetCustBankInfo = () => {
		api_GetCustBankInfo()
			.then(res => {
				if (res.data.errorCode === 0) {
					if (res.data.data?.uSDTDetail.length) {
						if (isMountedRef.current) {
							setbankInfo(() => ({
								accountName: res.data?.data?.accountName,
								uSDTDetail: res.data?.data?.uSDTDetail || []
							}));
							setInputStatus(initStatus);
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
					setSelBank(null);
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

	const KycCheck = async UpdatePageVerify => {
		const executeKycProcess = await api_KycCheck().then(
			res => {
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
			},
			() => {
				setPopBox({
					isOpen: true,
					content: i18n.msg_ApiServerError
				});
			}
		);

		return executeKycProcess;
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
		balanceInfo?.availableBalance !== null &&
		balanceInfo?.availableBalance !== undefined
			? balanceInfo?.availableBalance
			: null;

	const VaildAmount = _amount => {
		let result = {};
		const real_amount = _isConvert
			? Number(_amount) * 1000
			: Number(_amount);
		if (!limitInfo?.limit) return null;

		if (
			!limitInfo?.limit.unlimited &&
			real_amount > limitInfo?.limit.withdrawalAvailableAmount
		) {
			result = {
				status: defIptStatus.warning,
				msg: i18n.lbl_WithdrawalDailyReached
			};
		} else {
			result = checkAmount({
				amount: _amount,
				minAmount: limitInfo?.limit.withdrawalMin,
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

	const EditAmount = value => {
		const _amount = String(value).replace(/^(0+)|[^\d]+/g, "");
		VaildAmount(_amount);
		setAmount(_amount);
	};

	const checkAccount = () => {
		if (bankInfo?.uSDTDetail?.length > 0) {
			ClickSubmit();
		} else {
			const ClosePopBox = () => {
				setPopBox({ isOpen: false });
				navigate(
					`/${path.member.root}/${path.member.sub.cryptoWallet.root}`
				);
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
				setPageVerify(false);
			}
		}
	};

	const ClickSubmit = async () => {
		if (
			limitInfo.limit.maxTimes > 0 &&
			limitInfo.limit.withdrawalTimes >= limitInfo.limit.maxTimes
		)
			return;
		if (pageVerify) {
			const result = VaildAmount(amount);
			if (!selBank) {
				setPopBox({
					isOpen: true,
					title: i18n.lbl_ImportantNote,
					content: i18n.lbl_SelectCryptoHint
				});
				return;
			}
			if (result && !selBank.disabled) {
				const RedirectToNext = async ({
					accountNo,
					real_amount,
					to_Amount,
					rate
				}) => {
					try {
						const res = await api_WithdrawalCryptoReq({
							AccountNo: accountNo,
							amount: real_amount,
							CurrencyId: selBank.currencyId,
							ExchangeRate: rate,
							ExchangeAmount: to_Amount
						});
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
											setInputStatus(initStatus);
											api_GetWithdrawalInfoRecent().then(
												response => {
													if (isMountedRef.current) {
														if (
															response.data
																.errorCode === 0
														) {
															setRecentDatas(
																response.data
																	.data
															);
														} else {
															setPopBox({
																isOpen: true,
																content: `[${response.data.errorCode}] ${response.data.message}`
															});
														}
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
					} catch (error) {
						setPopBox({
							isOpen: true,
							content: i18n.msg_ApiServerError
						});
					}
				};

				const real_amount = _isConvert
					? Number(amount) * 1000
					: Number(amount);

				const handleClickSubmit = (to_Amount, rate) => {
					let target;
					if (selBank.usdtAddress) {
						api_GetCustBankInfo().then(
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
							to_Amount,
							rate
						});
					}
					setTimeout(() => {
						isClickedRef.current = false;
					}, 1000);
				};

				try {
					const response = await api_payment_GetExchangeInfo({
						Amount: real_amount,
						CurrencyName: selBank.currencyName,
						Network: selBank.network
					});

					const { to_Amount, rate } = response.data.data;

					setPopBox({
						isOpen: true,
						className: "cryptoNote active",
						title: i18n.lbl_ImportantNote,
						hasBtn: true,
						content: (
							<>
								<ul>
									<li>{i18n.lbl_WithdrawalTo}</li>
									<li>{selBank?.nickName}</li>
								</ul>
								<ul>
									<li>{i18n.lbl_CryptoWalletAddress}</li>
									<li>{selBank?.usdtAddress}</li>
								</ul>
								<ul>
									<li>{i18n.lbl_WithdrawalAmount}</li>
									<li>
										{number_format(
											real_amount,
											_isConvert,
											0
										)}
									</li>
								</ul>
								<ul>
									<li>{`${i18n.lbl_ReceiveUSDT} :`}</li>
									<li>{Number(to_Amount).toString()}</li>
								</ul>

								<div className="txt-cryptoNote">
									{i18n.lbl_WithdrawalCryptoNote}
								</div>
							</>
						),
						btnBar: (
							<div className="btn-group">
								<button
									className="btn-cancel"
									onClick={() =>
										setPopBox(prevState => ({
											...prevState,
											isOpen: false
										}))
									}>
									{i18n.lbl_Cancel}
								</button>
								<button
									className="btn-check"
									onClick={() => {
										handleClickSubmit(to_Amount, rate);
									}}>
									{i18n.lbl_Submit}
								</button>
							</div>
						)
					});
				} catch (error) {
					setPopBox({
						isOpen: true,
						content: i18n.msg_ApiServerError
					});
				}
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
			const submitConfirm = () => {
				setPopBox({ isOpen: false });
				api_SetWithdrawalCancel(transId).then(
					res => {
						if (isMountedRef.current) {
							if (res.data.errorCode === 0) {
								api_GetWithdrawalInfoRecent().then(
									response => {
										if (response.data.errorCode === 0) {
											setRecentDatas(response.data.data);
											GetBalance();
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
						<button className="lightBlue" onClick={submitConfirm}>
							{i18n.lbl_Submit}
						</button>
					</div>
				)
			});
		}
	};

	const delUSDTwallet = ({ currencyId, network, address, nickName }) => {
		setPopBox({
			isOpen: true,
			title: i18n.lbl_ImportantNote,
			content: i18n.lbl_CheckConfirm,
			hasBtn: true,
			btnBar: (
				<div className="btn-group">
					<button
						className="Cancel"
						onClick={() =>
							removeAccount({
								currencyId,
								network,
								address,
								nickName
							})
						}>
						{i18n.lbl_Yes}
					</button>
					<button
						className="blue"
						onClick={() => setPopBox({ isOpen: false })}>
						{i18n.lbl_No}
					</button>
				</div>
			)
		});
	};

	const removeAccount = ({ currencyId, network, address, nickName }) => {
		api_DelCustCryptoWallet({ currencyId, network, address, nickName })
			.then(res => {
				if (res.data.errorCode === 0) {
					GetCustBankInfo();
					setInputStatus(initStatus);
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

	const clickInfo = () => {
		if (!limitInfo?.limit) return;
		const info =
			inputStatus.msg === ""
				? i18n.lbl_AmountTooltip?.replace(
						"{{0}}",
						number_format(
							limitInfo?.limit.withdrawalMin,
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

	const addCryptoWallet = () => {
		const closePopbox = url => {
			if (typeof url === "string") navigate(url);
			setPopBox({ isOpen: false });
		};
		if (!userInfo.phoneVerified) {
			setPopBox({
				isOpen: true,
				title: i18n.lbl_ImportantNote,
				content: i18n.lbl_Crypto_OTP,
				hasBtn: true,
				hideCloseBtn: true,
				btnBar: (
					<div className="btn-group">
						<button
							className="blue"
							onClick={() => closePopbox(`/${path.member.root}`)}>
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
				GetCustBankInfo,
				className: "addCryptoPop active"
			});
		}
	};
	const banks = bankInfo?.uSDTDetail?.map(b => {
		const _checked =
			b.usdtAddress === selBank?.usdtAddress &&
			selBank?.currencyName === b.currencyName;
		return (
			<div
				className={`${
					_checked ? "addCryptoName active" : "addCryptoName"
				} ${b.disabled ? "pending" : ""}`}
				key={`withdrawal-bank-${b.usdtAddress}-${b.currencyId}`}
				onClick={e => {
					e.stopPropagation();
					e.preventDefault();
					SelectBank(b);
				}}>
				<div className="addCryptoInfo">
					<div className="cryptoName">
						<div className="icon icon-USDT">
							<span>{b?.nickName}</span>
							<span>
								{b.currencyName === b.network
									? b.currencyName
									: `${b.currencyName}-${b.network}`}
							</span>
						</div>
					</div>
					<div>
						{/* * 暫時隱藏 delete crypto wallet 按鈕，以防止有用戶重複新增刪除帳號來套利，當 risk 評估覺得可以的話有機會再打開 */}
						{/* <button
							onClick={() =>
								delUSDTwallet({
									address: b.usdtAddress,
									nickName: b.nickName,
									currencyId: b.currencyId,
									network: b.network
								})
							}
							className="icon icon-bin"
						/> */}
						<div className="checkbox">
							<input
								type="checkbox"
								id={b.usdtAddress}
								checked={_checked}
							/>
							<label
								htmlFor={b.usdtAddress}
								className="icon icon-checkbox-checked"
							/>
						</div>
					</div>
				</div>
				<div className="addCryptoInfo">
					<div>
						<span>{b?.usdtAddress}</span>
					</div>
				</div>
				{b.disabled ? <div className="mask" /> : null}
			</div>
		);
	});

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

				<div className="tip">{limitInfo.withdrawalLimitHint}</div>

				<div className="addCrypto">
					<div className="remainder">
						{`${i18n.lbl_Number_Of_Wallet}: ${bankInfo?.uSDTDetail?.length}/3`}
					</div>
					{banks}
					{bankInfo?.uSDTDetail?.length < 3 && (
						<div className="addCryptoName noBank">
							<div className="icon icon-plus" />
							<div onClick={addCryptoWallet}>
								{i18n.lbl_Add_Crypto_Wallet}
							</div>
						</div>
					)}
				</div>
				<div className="subModuleList">
					<AmountPanel
						i18n={i18n}
						_isConvert={_isConvert}
						amount={amount}
						balanceInfo={balanceInfo}
						EditAmount={EditAmount}
						ClickSubmit={checkAccount}
						currencyId={userInfo.currencyId}
						clickInfo={clickInfo}
						inputStatus={inputStatus}
						VaildAmount={VaildAmount}
						withdrawalLimit={limitInfo?.limit}
						withdrawalLimitHint={limitInfo.withdrawalLimitHint}
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
	return content;
};

export default Panel;
