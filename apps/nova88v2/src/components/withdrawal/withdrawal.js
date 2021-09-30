import React, { useContext, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "@reach/router";
import { Link } from "@Router";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	loadingContext
} from "../common/context";
import {
	number_format,
	isConvert,
	checkAmount,
	defCurrenyId
} from "../common/common";
import { defPopBoxType } from "../common/popbox";
import InputBox from "../common/inputbox.hint";
import { defIptStatus } from "../common/inputStatus";
import { cloudImgURL } from "../../config";
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

const initWarning = {
	status: defIptStatus.default,
	msg: ""
};

const Panel = ({ isCrypto }) => {
	const navigate = useNavigate();
	const { i18n } = useContext(i18nContext);
	const { setUserInfo, userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setLoading } = useContext(loadingContext);
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

	const GetDailyWithdrawalLimit = () => {
		api.payment.GetWithdrawalLimit().then(res => {
			if (res.data.errorCode === 0 && isMountedRef.current) {
				setWithdrawalLimit(res.data.data);
			}
		});
	};

	useEffect(() => {
		if (
			userInfo.isLogin &&
			userInfo.currencyId &&
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
				const result = await api.account.GetCustBankInfo().then(res => {
					let hasBankInfo = false;
					if (res.data.errorCode === 0) {
						if (isCrypto) {
							if (res.data.data?.uSDTDetail.length > 0) {
								setPopBox({ isOpen: false });
								if (isMountedRef.current) {
									setbankInfo(() => ({
										accountName:
											res.data?.data?.accountName,
										bankList:
											res.data?.data?.uSDTDetail || []
									}));
									setSelBank(res.data?.data?.uSDTDetail?.[0]);
									if (!pageVerify) {
										setPageVerify(true);
									}
								}
								hasBankInfo = true;
							}
						} else if (
							res.data.data?.bankInfoDetail &&
							res.data.data?.bankInfoDetail.length > 0
						) {
							setPopBox({ isOpen: false });
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
								setSelBank(
									res.data.data.bankInfoDetail?.[
										defAccountIdx === -1 ? 0 : defAccountIdx
									]
								);
								if (!pageVerify) {
									setPageVerify(true);
								}
							}
							hasBankInfo = true;
						}
					}
					return hasBankInfo;
				});
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
												setLoading(false);
											}
										},
										() => {
											if (isMountedRef.current) {
												setLoading(false);
											}
										}
									);

								api.payment
									.GetWithdrawalInfoRecent()
									.then(res => {
										if (
											res.data.errorCode === 0 &&
											isMountedRef.current
										) {
											setRecentDatas(res.data.data);
										}
									});
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
				}
			}
			return res.data.errorCode === 1 || res.data.errorCode === 2;
		});
		return executeKycProcess;
	};

	const GetBalance = () => {
		if (pageVerify) {
			api.account.GetWithdrawalAvailableBalance().then(res => {
				if (res.data.errorCode === 0 && isMountedRef.current) {
					setBalanceInfo(res.data.data);
				}
			});
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
		} else if (isCrypto) {
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
				setPageVerify(false);
			}
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
						const res = isCrypto
							? await api.payment.WithdrawalUSDTReq(
									accountNo,
									_real_amount,
									blackbox
							  )
							: await api.payment.WithdrawalReq(
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
								title: i18n.lbl_ImportantNote,
								content: i18n.msg_ApiServerError
							});
						}
					}
				};

				const real_amount = _isConvert
					? Number(amount) * 1000
					: Number(amount);

				if (isCrypto) {
					api.payment
						.GetExchangeInfo({ Amount: real_amount })
						.then(res => {
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
												onClick={RedirectToNext.bind(
													this,
													selBank.usdtAddress,
													real_amount,
													0,
													userInfo.currencyId ===
														defCurrenyId.INR
														? selBank.ifscCode
														: null
												)}>
												{i18n.lbl_Submit}
											</button>
										</div>
									)
								});
							} else if (res.data.errorCode !== 0) {
								setPopBox({
									isOpen: true,
									title: i18n.lbl_ImportantNote,
									content: i18n.msg_ApiServerError
								});
							}
						});
				} else {
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
									{userInfo.currencyId ===
									defCurrenyId.INR ? (
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
									onClick={RedirectToNext.bind(
										this,
										selBank.accountNo,
										real_amount,
										selBank.sysId,
										userInfo.currencyId === defCurrenyId.INR
											? selBank.ifscCode
											: null
									)}>
									{i18n.lbl_Submit}
								</button>
							</div>
						)
					});
				}
			}
		}
	};

	const SelectBank = b => {
		if (
			b.sysId &&
			(b.sysId !== selBank?.sysId || b.accountNo !== selBank?.accountNo)
		) {
			setSelBank(b);
		} else if (b.usdtAddress !== selBank?.usdtAddress) {
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
								api.payment
									.GetWithdrawalInfoRecent()
									.then(resRecent => {
										if (res.data.errorCode === 0) {
											GetBalance();
											GetDailyWithdrawalLimit();
											setRecentDatas(resRecent.data.data);
										}
									});
							} else {
								setPopBox({
									isOpen: true,
									title: i18n.lbl_ImportantNote,
									content: res.data.message
								});
							}
						}
					},
					() => {
						if (isMountedRef.current) {
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
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

	const GetCustBankInfo = () => {
		api.account.GetCustBankInfo().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						const resData = res.data.data;
						if (resData) {
							setUserInfo(prev => ({
								...prev,
								accountName: resData.accountName
							}));
							setbankInfo(() => ({
								accountName: resData.accountName,
								bankList: resData.uSDTDetail
							}));
						}
					} else {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: i18n.msg_ApiServerError
						});
					}
					setLoading(false);
				}
			},
			() => {
				if (isMountedRef.current) {
					setLoading(false);
					setPopBox({
						isOpen: true,
						title: i18n.lbl_ImportantNote,
						content: i18n.msg_ApiServerError
					});
				}
			}
		);
	};

	const addCryptoWallet = () => {
		if (userInfo.isLogin) {
			if (!userInfo.phoneVerified) {
				setPopBox({
					isOpen: true,
					title: i18n.lbl_ImportantNote,
					content: i18n.lbl_UpdatePersonalInfo,
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
					GetCustBankInfo
				});
			}
		} else {
			api.accountStrict.GetCustProfile().then(res_custInfo => {
				if (res_custInfo.data.errorCode === 0 && isMountedRef.current) {
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
							GetCustBankInfo
						});
					}
				}
			});
		}
	};

	const delUSDTwallet = ({ USDTAddress, NickName, AccountName }) => {
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
								AccountName
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

	const removeAccount = ({ USDTAddress, NickName, AccountName }) => {
		api.accountStrict
			.DelCustUSDTInfo({ USDTAddress, NickName, AccountName })
			.then(res => {
				if (res.data.errorCode === 0) {
					GetCustBankInfo();
					setPopBox({ isOpen: false });
				} else {
					setPopBox({
						isOpen: true,
						title: i18n.lbl_ImportantNote,
						content: res.data.message
					});
				}
			})
			.catch(() => {
				setPopBox({
					isOpen: true,
					title: i18n.lbl_ImportantNote,
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
	if (isCrypto) {
		banks = bankInfo?.bankList?.map(b => {
			return (
				<div
					className={`account${
						selBank?.usdtAddress === b.usdtAddress ? " active" : ""
					}`}
					key={`withdrawal-bank-${b.usdtAddress}`}
					data-testid="crypto-address-icon"
					onClick={SelectBank.bind(this, b)}>
					<div className="nickName">{b.nickName}</div>
					<div className="icon icon-BTC">{b.usdtAddress}</div>
					<button
						onClick={() =>
							delUSDTwallet({
								USDTAddress: b.usdtAddress,
								NickName: b.nickName,
								AccountName: userInfo.accountName
							})
						}
						className="icon icon-bin clickBtn"
					/>
				</div>
			);
		});
		if (banks?.length < 3) {
			banks?.push(
				<div className="account" onClick={addCryptoWallet}>
					<div className="icon icon-plus text-org" />
				</div>
			);
		}
	} else {
		banks = bankInfo?.bankList?.map(b => {
			return (
				<button
					className={
						selBank?.sysId === b.sysId &&
						selBank?.accountNo === b.accountNo
							? "active"
							: ""
					}
					key={`withdrawal-bank-${b.sysId}-${b.accountNo}`}
					data-testid="bank-icon"
					onClick={SelectBank.bind(this, b)}>
					<img
						src={`${cloudImgURL}/SiteSkin/img/BankLogo/${b.bankLogo?.toLowerCase()}`}
						alt={b.bankName}
					/>
				</button>
			);
		});
	}

	const withdrawalLimitHint = i18n.lbl_WithdrawalDailyMinMax
		?.replace(
			"{{0}}",
			!withdrawalLimit.withdrawalMin
				? 1
				: number_format(withdrawalLimit.withdrawalMin, _isConvert, 0)
		)
		?.replace(
			"{{1}}",
			withdrawalLimit.unlimited
				? i18n.lbl_Unlimited
				: number_format(
						withdrawalLimit.withdrawalAvailableAmount,
						_isConvert,
						0
				  )
		);
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
			{isCrypto ? (
				<div className="bankAccount">{banks}</div>
			) : (
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
			)}
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
			<div className="text-org">{withdrawalLimitHint}</div>
			<div className="btn-group">
				<button
					className={
						warning.status !== defIptStatus.warning ? "" : "gray"
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

Panel.defaultProps = {
	isCrypto: false
};

Panel.propTypes = {
	isCrypto: PropTypes.bool
};
