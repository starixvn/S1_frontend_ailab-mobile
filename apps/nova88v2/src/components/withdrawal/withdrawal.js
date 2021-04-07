import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "@reach/router";
import { Link } from "@Router";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	loadingContext
} from "../common/context";
import { number_format, isConvert, checkAmount } from "../common/common";
import InputBox from "../common/inputbox.hint";
import { defIptStatus } from "../common/inputStatus";
import config from "../../config";
import RecentDatas from "./withdrawal.recentDatas";
import ReloadSpin from "../common/reloadSpin";
import path from "../../path";
import useTip from "../hook/useTip";
import { Iov_GetBlackBox } from "../common/iovation";
import api from "../../service/api";

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
	const [balanceInfo, setBalanceInfo] = useState(null);
	const _isConvert = isConvert(userInfo.currencyId);
	const [amount, setAmount] = useState("");
	const [warning, setWarning] = useState(initWarning);
	const [selBank, setSelBank] = useState(null);
	const [bankInfo, setbankInfo] = useState({
		accountName: "",
		bankList: []
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
		if (
			userInfo.isLogin &&
			userInfo.currencyId &&
			(!userInfo.accountName || !userInfo.phoneNo) &&
			userInfo.currencyId !== 96
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
						if (
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
						} else if (
							userInfo.currencyId === 96 &&
							res.data.data?.uSDTDetail &&
							res.data.data?.uSDTDetail.length > 0
						) {
							setPopBox({ isOpen: false });
							if (isMountedRef.current) {
								setbankInfo(() => ({
									accountName: res.data.data.accountName,
									bankList: res.data.data.uSDTDetail
								}));
								setSelBank(res.data.data.uSDTDetail?.[0]);
								if (!pageVerify) {
									setPageVerify(true);
								}
							}
							hasBankInfo = true;
						} else if (
							userInfo.currencyId &&
							userInfo.currencyId !== 96
						) {
							const ClosePopBox = () => {
								setPopBox({ isOpen: false });
								navigate(
									`/${userInfo.langId}/${path.bankInfo.root}`
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
						} else {
							const ClosePopBox = () => {
								setPopBox({ isOpen: false });
								navigate(
									`/${userInfo.langId}/${path.cryptoWallet.root}`
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

	const _availableBalance =
		balanceInfo?.availableBalance !== null ||
		balanceInfo?.availableBalance !== undefined
			? balanceInfo?.availableBalance
			: 0;

	const VaildAmount = _amount => {
		const result = checkAmount(
			_amount,
			selBank?.minAmount,
			selBank?.maxAmount,
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

	const EditAmount = e => {
		const { value } = e.target;
		VaildAmount(value);
		setAmount(value);
	};

	const ClickSubmit = () => {
		if (pageVerify) {
			const result = VaildAmount(amount);
			if (result) {
				const RedirectToNext = async (
					accountNo,
					_real_amount,
					sysId
				) => {
					const blackbox = await Iov_GetBlackBox();
					api.payment
						.WithdrawalReq(accountNo, _real_amount, sysId, blackbox)
						.then(
							res => {
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
															resRecent.data
																.errorCode ===
																0 &&
															isMountedRef.current
														) {
															GetBalance();
															setRecentDatas(
																resRecent.data
																	.data
															);
															setWarning(
																initWarning
															);
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

				const real_amount = _isConvert
					? Number(amount) * 1000
					: Number(amount);
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
							</ul>
						</div>
					),
					hasBtn: true,
					btnBar: (
						<div className="btn-group">
							<button
								className="blue"
								onClick={() =>
									setPopBox(prevState => ({
										...prevState,
										isOpen: false
									}))
								}>
								{i18n.lbl_Cancel}
							</button>
							<button
								className="orange"
								onClick={RedirectToNext.bind(
									this,
									userInfo.currencyId === 96
										? selBank.usdtAddress
										: selBank.accountNo,
									real_amount,
									userInfo.currencyId !== 96
										? selBank.sysId
										: 0
								)}>
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

	let banks = [];

	if (userInfo.currencyId === 96) {
		banks = bankInfo?.bankList?.map(b => {
			return (
				<div
					className={`account${
						selBank?.usdtAddress === b.usdtAddress ? " active" : ""
					}`}
					key={`withdrawal-bank-${b.usdtAddress}`}
					onClick={SelectBank.bind(this, b)}>
					<div className="icon icon-BTC">{b.usdtAddress}</div>
				</div>
			);
		});
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
					onClick={SelectBank.bind(this, b)}>
					<img
						src={`${config.imgUrl}/common/images/BankLogo/${b.bankLogo}`}
						alt={b.bankName}
					/>
				</button>
			);
		});
	}

	return pageVerify ? (
		<>
			<div className="icon icon-member">
				<div className="circleAnimation" />
			</div>
			<div className="name">{userInfo.userName}</div>
			<div className="text-org">{i18n.lbl_EligibleWithdrawalAmount}</div>
			<div className="balance">
				{i18n[`Currency_${userInfo.currencyId}`]}{" "}
				{number_format(_availableBalance, _isConvert)}
				<ReloadSpin func={GetBalance} />
			</div>
			<InputBox
				icon="icon-pencil"
				value={amount}
				inputType="tel"
				onChange={EditAmount}
				clickInfo={() => showTipHandler("amount")}
				infoText={i18n.lbl_AmountTooltip?.replace("{{0}}", 1)}
				showTips={showTips.includes("amount")}
				placeholder={i18n.lbl_Amount}
				btnStatus={warning.status}
				warningMsg={warning.msg}
			/>
			{userInfo.currencyId === 96 ? (
				<div className="bankAccount">{banks}</div>
			) : (
				<div className="selectBank">
					{banks}
					{bankInfo?.bankList?.length < 3 ? (
						<Link to={path.bankInfo.root} />
					) : null}
				</div>
			)}
			<div className="btn-group">
				<button
					className={amount > 0 ? "" : "gray"}
					onClick={ClickSubmit}>
					{i18n.lbl_Submit}
				</button>
			</div>
			<RecentDatas Datas={recentDatas} ClickCancel={ClickCancel} />
		</>
	) : null;
};

export default Panel;
