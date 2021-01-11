import React, { useState, useEffect, useContext, useRef } from "react";
import { Redirect } from "@reach/router";
import moment from "moment";
import DropdownIMG from "../common/dropdown.image";
import config from "../../config";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	bankSlipPopBoxContext
} from "../common/context";
import LimitTip from "./limitTip";
import { isConvert, checkAmount, number_format } from "../common/common";
import InputBox, { defIptStatus } from "../common/inputbox.hint";
import {
	api_DepositReqWireTransfer,
	api_GetBankInfoOffList
} from "../../service/api/payment";
import PageVerify from "./deposit.pageVerify";
import path from "../../path";
import Loading from "../common/loading";
import { api_SetAccountName } from "../../service/api/accountStrict";
import DepositWrapper from "./deposit.wrapper";
import BackBtn from "./backBtn";

export const Panel = props => props.children;

export const Main = props => {
	const { i18n } = useContext(i18nContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setbankSlipPopBox } = useContext(bankSlipPopBoxContext);

	const [bankList, setBankList] = useState([]);
	const [selBank, setSelBank] = useState({
		idx: null,
		bank: null
	});
	const [amount, setAmount] = useState("");
	const [accountName, setAccountName] = useState(userInfo.accountName ?? "");
	const [warning, setWarning] = useState({
		accountName: { status: defIptStatus.default, msg: "" },
		amount: { status: defIptStatus.default, msg: "" }
	});

	const _isConvert = isConvert(userInfo.currencyId);
	const [processing, setProcessing] = useState(false);

	const [redirectPath, setRedirectPath] = useState(null);
	const [pageVerify, setPageVerify] = useState(true);
	const [loading, setLoading] = useState(true);

	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	PageVerify(
		userInfo,
		i18n,
		setPopBox,
		setRedirectPath,
		setPageVerify,
		props.location.state?.paymentList?.length >= 0
	);

	useEffect(() => {
		if (props.location.state?.paymentList) {
			const datas = props.location.state.paymentList.map(b => {
				const { bankLogo, sysId, bankName, ...rest } = b;
				return {
					...rest,
					image: bankLogo,
					id: sysId,
					displayText: bankName
				};
			});
			if (isMountedRef.current) {
				setLoading(false);
				setBankList(datas);
				setProcessing(false);
			}
		} else if (userInfo.isLogin) {
			setLoading(true);
			api_GetBankInfoOffList().then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							const datas = res.data.data.map(b => {
								const {
									bankLogo,
									sysId,
									bankName,
									...rest
								} = b;
								return {
									...rest,
									image: bankLogo,
									id: sysId,
									displayText: bankName
								};
							});
							if (datas.length > 0) {
								setBankList(datas);
							} else {
								setRedirectPath(`/${path.deposit.root}`);
							}
						}

						setLoading(false);
					}
				},
				err => {
					if (isMountedRef.current) {
						setLoading(false);
					}
				}
			);
		}
	}, [props.location.state, userInfo.isLogin]);

	const SelectBank = idx => {
		setSelBank({
			idx,
			bank: bankList[idx]
		});
	};

	const VaildAmount = _amount => {
		const result = checkAmount(
			_amount,
			selBank?.bank?.minAmount,
			selBank?.bank?.maxAmount,
			_isConvert,
			i18n
		);
		if (result.status !== 0) {
			setWarning(prev => ({
				...prev,
				amount: {
					status: defIptStatus.warning,
					msg: result.msg
				}
			}));
		} else {
			setWarning(prev => ({
				...prev,
				amount: {
					status: defIptStatus.verified,
					msg: ""
				}
			}));
		}
		return result.status === 0;
	};

	const EditField = (col, e) => {
		const { value } = e.target;

		if (col === "amount") {
			if (selBank.bank) {
				VaildAmount(value);
				setAmount(value);
			} else {
				setWarning(prev => ({
					...prev,
					amount: {
						status: defIptStatus.warning,
						msg: i18n.lbl_SelectBank
					}
				}));
			}
		} else {
			setAccountName(value);
			setWarning(prev => {
				let msg = "";
				let status = defIptStatus.verified;
				if (!value) {
					status = defIptStatus.warning;
					msg = i18n.msg_RealnameTip;
				}
				return {
					...prev,
					accountName: {
						status,
						msg
					}
				};
			});
		}
	};

	const ClickSubmit = () => {
		if (!processing) {
			const result = VaildAmount(amount) && accountName;

			if (result && pageVerify) {
				const RedirectToNext = (real_amount, sysId) => {
					api_DepositReqWireTransfer({
						amount: real_amount,
						sysId
					}).then(
						res => {
							if (isMountedRef.current) {
								if (res.data.errorCode === 0) {
									setbankSlipPopBox(prevState => ({
										...prevState,
										...res.data.data,
										depositTime: `${moment().format(
											"yyyy-MM-DDT"
										)}${moment().format("HH:mm")}`,
										isOpen: true,
										amount: real_amount,
										_isConvert,
										closeCallBack: () =>
											setRedirectPath(
												`/${path.deposit.root}`
											)
									}));

									setPopBox(prevState => ({
										...prevState,
										isOpen: false
									}));
								} else {
									setPopBox(prevState => ({
										...prevState,
										title: i18n.lbl_ImportantNote,
										content: i18n.msg_WrongAmount
									}));
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
				};

				const openConfirmPopBox = () => {
					const real_amount = _isConvert
						? Number(amount) * 1000
						: Number(amount);
					setPopBox({
						isOpen: true,
						title: i18n.lbl_ImportantNote,
						content: (
							<>
								<p>{i18n.lbl_ConfirmDeposit}</p>
								<img
									src={`${config.imgUrl}/common/images/BankLogo/${selBank.bank.image}`}
									alt={selBank.bank.bankName}
								/>
								<div>
									<ul>
										<li className="text-lightBlue">
											{i18n.lbl_DepositAmount} :
										</li>
										<li>
											{number_format(
												real_amount,
												_isConvert
											)}
										</li>
									</ul>
								</div>
							</>
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
									onClick={RedirectToNext.bind(
										this,
										real_amount,
										selBank.bank.id
									)}>
									{i18n.lbl_Confirm}
								</button>
							</div>
						)
					});
				};

				const SetAccountName = () => {
					api_SetAccountName({
						name: accountName || userInfo.accountName
					}).then(
						res => {
							if (isMountedRef.current) {
								if (
									res.data.errorCode === 0 ||
									res.data.errorCode === -5
								) {
									if (res.data.errorCode === 0) {
										setUserInfo(prevState => ({
											...prevState,
											accountName
										}));
									}
									openConfirmPopBox();
								} else {
									setPopBox(prevState => ({
										...prevState,
										title: i18n.lbl_ImportantNote,
										content: res.data.message,
										hasBtn: true,
										btnBar: (
											<div className="btn-group">
												<button
													className="cancel"
													onClick={() =>
														setPopBox(prev => ({
															...prev,
															isOpen: false
														}))
													}>
													{i18n.lbl_Cancel}
												</button>
											</div>
										)
									}));
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
				};

				if (!userInfo.accountName) {
					setPopBox({
						isOpen: true,
						title: i18n.lbl_ImportantNote,
						content: i18n.msg_ConfirmRealNameAlert,
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
									onClick={SetAccountName}>
									{i18n.lbl_Confirm}
								</button>
							</div>
						)
					});
				} else {
					SetAccountName();
				}
			} else {
				setWarning({
					accountName: {
						status: !accountName
							? defIptStatus.warning
							: defIptStatus.verified,
						msg: !accountName ? i18n.msg_EnterRealName : ""
					},
					amount: {
						status: !amount
							? defIptStatus.warning
							: defIptStatus.verified,
						msg: !amount ? i18n.lbl_AmountTooltip : ""
					}
				});
				VaildAmount(amount);
			}
		}
	};

	if (loading) {
		return <Loading />;
	}
	return redirectPath !== null ? (
		<Redirect to={redirectPath} noThrow />
	) : pageVerify ? (
		<DepositWrapper step={3} total={2} i18n={i18n}>
			<div className="depositInBox">
				<div className="inputBox">
					<DropdownIMG
						mainKey="localBank-bankList"
						onSelectItem={SelectBank}
						options={bankList}
						selectedIdx={selBank?.idx}
						i18n={i18n}
						ImgURL={`${config.imgUrl}/common/images/BankLogo/`}
						className="bankLogo"
					/>
					<LimitTip
						displayTextLimit={i18n.lbl_Limit}
						displayTextUnLimit={i18n.lbl_Unlimited}
						minAmount={selBank?.bank?.minAmount}
						maxAmount={selBank?.bank?.maxAmount}
						_isConvert={_isConvert}
					/>
				</div>
				{!userInfo.accountName ? (
					<InputBox
						title={i18n.lbl_RealName}
						value={accountName}
						onChange={EditField.bind(this, "accountName")}
						tipDisplayText={warning.accountName.msg}
						btnStatus={warning.accountName.status}
					/>
				) : null}
				<InputBox
					title={i18n.lbl_Amount}
					value={amount}
					numberConvert={isConvert(userInfo.currencyId)}
					inputType="tel"
					onChange={EditField.bind(this, "amount")}
					tipDisplayText={warning.amount.msg}
					btnStatus={warning.amount.status}
				/>
				<div className="btn-group">
					<button className="submit" onClick={ClickSubmit}>
						{i18n.lbl_deposit_submit}
					</button>
				</div>
			</div>
			<BackBtn i18n={i18n} to="../" />
		</DepositWrapper>
	) : null;
};
