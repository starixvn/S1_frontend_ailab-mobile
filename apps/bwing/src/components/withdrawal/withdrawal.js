import React, { useContext, useEffect, useState, useRef } from "react";
import { i18nContext, userInfoContext, popBoxContext } from "../common/context";
import {
	number_format,
	isConvert,
	checkWithdrawalAmount
} from "../common/common";
import {
	api_GetWithdrawalAvailableBalance,
	api_GetCustBankInfo
} from "../../service/api/account";
import {
	api_WithdrawalReq,
	api_GetWithdrawalInfoRecent,
	api_SetWithdrawalCancel,
	api_KycCheck
} from "../../service/api/payment";
import RecentDatas from "./withdrawal.recentDatas";
import path from "../../path";
import { Redirect } from "@reach/router";
import Loading from "../common/loading";
import WalletPanel from "./walletPanel";
import BankCardPanel from "./bankCardPanel";
import AmountPanel from "./amountPanel";
import { defIptStatus } from "../common/inputbox.hint";

const initWarning = {
	status: defIptStatus.default,
	msg: ""
};

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const [balanceInfo, setBalanceInfo] = useState(null);
	const _isConvert = isConvert(userInfo.currencyId);
	const [amount, setAmount] = useState("");
	const [warning, setWarning] = useState(initWarning);
	const [selBank, setSelBank] = useState(null);
	const [bankInfo, setbankInfo] = useState({
		accountName: "",
		bankList: []
	});
	const [recentDatas, setRecentDatas] = useState([]);

	const [redirectPath, setRedirectPath] = useState(null);
	const [pageVerify, setPageVerify] = useState(true);
	const [loading, setLoading] = useState(true);

	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	useEffect(() => {
		if (isMountedRef.current && redirectPath !== null) {
			setRedirectPath(null);
		}
	}, [redirectPath]);

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
			const CheckBankInfo = async () => {
				let result = await api_GetCustBankInfo().then(res => {
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
								if (!pageVerify) {
									setPageVerify(true);
								}
							}
							hasBankInfo = true;
						} else {
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
											<button
												className="blue"
												onClick={ClosePopBox}>
												{i18n.lbl_UpdateBankDetail}
											</button>
										</div>
									)
								});

								setPageVerify(false);
							}
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
								api_GetWithdrawalAvailableBalance().then(
									res => {
										if (
											res.data.errorCode === 0 &&
											isMountedRef.current
										) {
											setBalanceInfo(res.data.data);
											setLoading(false);
										}
									},
									err => {
										if (isMountedRef.current) {
											setLoading(false);
										}
									}
								);

								api_GetWithdrawalInfoRecent().then(res => {
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
		pageVerify
	]);

	const KycCheck = async UpdatePageVerify => {
		let executeKycProcess = await api_KycCheck().then(res => {
			if (isMountedRef.current) {
				if (res.data.errorCode === 1) {
					setRedirectPath(`/${path.kyc.root}`);
				} else if (res.data.errorCode === 2) {
					setRedirectPath(`/${path.kycWaiting.root}`);
				} else {
					if (isMountedRef.current && UpdatePageVerify) {
						setPageVerify(true);
					}
				}
			}

			return res.data.errorCode === 1 || res.data.errorCode === 2;
		});

		return executeKycProcess;
	};

	const GetBalance = () => {
		if (pageVerify) {
			api_GetWithdrawalAvailableBalance().then(res => {
				if (res.data.errorCode === 0 && isMountedRef.current) {
					setBalanceInfo(res.data.data);
				}
			});
		}
	};

	let _availableBalance =
		balanceInfo?.availableBalance !== null ||
		balanceInfo?.availableBalance !== undefined
			? balanceInfo?.availableBalance
			: 0;

	const VaildAmount = _amount => {
		let result = checkWithdrawalAmount(
			_amount,
			balanceInfo?.availableBalance,
			_isConvert,
			i18n
		);
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

	const EditAmount = value => {
		VaildAmount(value);
		setAmount(value);
	};

	const ClickSubmit = () => {
		if (pageVerify) {
			let result = VaildAmount(amount) && selBank;
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
											setWarning(initWarning);
											setSelBank(null);
											api_GetWithdrawalAvailableBalance().then(
												res => {
													if (
														res.data.errorCode ===
															0 &&
														isMountedRef.current
													) {
														setBalanceInfo(
															res.data.data
														);
													}
												}
											);
											api_GetWithdrawalInfoRecent().then(
												res => {
													if (
														res.data.errorCode ===
															0 &&
														isMountedRef.current
													) {
														setRecentDatas(
															res.data.data
														);
													}
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
										content: content,
										hasBtn: false
									});
								}
							}
						},
						err => {
							if (isMountedRef.current) {
								this.props.setPopBox({
									isOpen: true,
									title: this.props.i18n.lbl_ImportantNote,
									content: this.props.i18n.msg_ApiServerError
								});
							}
						}
					);
				};

				let real_amount = _isConvert
					? Number(amount) * 1000
					: Number(amount);
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
										{number_format(real_amount, _isConvert)}
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
								{i18n["lbl_Cancel"]}
							</button>
							<button
								className="submit"
								onClick={RedirectToNext.bind(
									this,
									selBank.accountNo,
									real_amount,
									selBank.sysId
								)}>
								{i18n["lbl_Confirm"]}
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
						let datas = res.data.data;
						let _custBankInfo =
							datas === null ? [] : datas.bankInfoDetail;
						setbankInfo(() => ({
							accountName: datas?.accountName,
							bankList: _custBankInfo
						}));
					} else {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: res.data.message
						});
					}
					setLoading(false);
				}
			},
			err => {
				if (isMountedRef.current) {
					setPopBox({
						isOpen: true,
						title: i18n.lbl_ImportantNote,
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
			const ClickSubmit = () => {
				setPopBox({ isOpen: false });
				api_SetWithdrawalCancel(transId).then(
					res => {
						if (isMountedRef.current) {
							if (res.data.errorCode === 0) {
								api_GetWithdrawalInfoRecent().then(res => {
									if (res.data.errorCode === 0) {
										setRecentDatas(res.data.data);
										GetBalance();
									}
								});
							} else {
								this.props.setPopBox({
									isOpen: true,
									title: this.props.i18n.lbl_ImportantNote,
									content: res.data.message
								});
							}
						}
					},
					err => {
						if (isMountedRef.current) {
							this.props.setPopBox({
								isOpen: true,
								title: this.props.i18n.lbl_ImportantNote,
								content: this.props.i18n.msg_ApiServerError
							});
						}
					}
				);
			};

			const ClickCancel = () => {
				setPopBox({ isOpen: false });
			};

			setPopBox({
				isOpen: true,
				title: i18n.lbl_ImportantNote,
				content: i18n["lbl_CancelConfirm"],
				hasBtn: true,
				btnBar: (
					<div className="btn-group">
						<button className="cancel" onClick={ClickSubmit}>
							{i18n["lbl_Yes"]}
						</button>
						<button className="submit" onClick={ClickCancel}>
							{i18n["lbl_No"]}
						</button>
					</div>
				)
			});
		}
	};

	const GetWithdrawalInfoRecent = () => {
		api_GetWithdrawalInfoRecent().then(res => {
			if (res.data.errorCode === 0 && isMountedRef.current) {
				setRecentDatas(res.data.data);
			}
		});
	};

	return redirectPath === null ? (
		pageVerify ? (
			loading ? (
				<Loading />
			) : (
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
							warning={warning}
						/>
					</div>
					<RecentDatas
						Datas={recentDatas}
						ClickCancel={ClickCancel}
						GetRecentDatas={GetWithdrawalInfoRecent}
					/>
				</section>
			)
		) : null
	) : (
		<Redirect to={redirectPath} noThrow />
	);
};

export default Panel;
