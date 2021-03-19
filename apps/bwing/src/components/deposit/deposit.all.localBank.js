import React, {
	useContext,
	useState,
	useRef,
	useEffect,
	Component
} from "react";
import PropTypes from "prop-types";
import moment from "moment";
import ClipboardJS from "../../lib/clipboard.min";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	bankSlipPopBoxContext,
	loadingContext
} from "../common/context";
import config from "../../config";
import { isConvert, number_format } from "../common/common";
import AmountInput from "./deposit.all.amountInput";
import { useHandleAmount } from "./hook/useHandleAmount";
import Radio from "./deposit.all.radio";
import {
	api_payment_GetLocalBankInfo,
	api_DepositReqWireTransfer,
	api_UploadReceipt
} from "../../service/api/payment";
import { api_SetAccountName } from "../../service/api/accountStrict";

const payType = "localBank";

const Payment = props => {
	const { paymentList, creditTimeKey } = props;

	const { i18n } = useContext(i18nContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { bankSlipPopBox, setbankSlipPopBox } = useContext(
		bankSlipPopBoxContext
	);
	const { setLoading } = useContext(loadingContext);

	const [processing, setProcessing] = useState(false);
	const [selBank, setBank] = useState({});
	const [accountInfo, setAccountInfo] = useState({});
	const [realName, setRealName] = useState(
		userInfo.accountName === null || userInfo.accountName === undefined
			? ""
			: userInfo.accountName
	);
	const [realNameTip, setRealNameTip] = useState("");

	const {
		amount,
		warning,
		SelectAmount,
		EditAmount,
		VaildAmount
	} = useHandleAmount({
		currencyId: userInfo.currencyId,
		minAmount: selBank?.minAmount,
		maxAmount: selBank?.maxAmount,
		i18n
	});

	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		if (paymentList.length > 0) {
			SelectBank(paymentList[0]);
		}
		return () => {
			isMountedRef.current = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [paymentList.length]);

	const SelectBank = bankInfo => {
		setLoading(true);
		api_payment_GetLocalBankInfo({ sysId: bankInfo.sysId }).then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						setAccountInfo(res.data.data);
						setBank(bankInfo);
					}
					setLoading(false);
				}
			},
			() => {
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

	const SubmitProof = (bankInfo, accInfo) => {
		const { currencyId, ...restBankInfo } = bankInfo;
		const { accountName, accountNo } = accInfo;
		setbankSlipPopBox(prev => ({
			...prev,
			...restBankInfo,
			depositTime: prev.depositTime
				? prev.depositTime
				: `${moment().format("yyyy-MM-DDT")}${moment().format(
						"HH:mm"
				  )}`,
			accountNo,
			accountName,
			isOpen: true,
			disableSubmit: true
		}));
	};

	const ClickSubmit = () => {
		const checkAccountName = !!userInfo.accountName || !!realName;
		const result =
			selBank.sysId &&
			amount !== "" &&
			VaildAmount({ amount }) &&
			checkAccountName;

		if (result && !processing) {
			const RedirectToNext = (real_amount, sysId) => {
				setLoading(true);
				setPopBox(prevState => ({
					...prevState,
					isOpen: false
				}));

				api_DepositReqWireTransfer({
					amount: real_amount,
					sysId
				}).then(
					res => {
						if (isMountedRef.current) {
							if (res.data.errorCode === 0) {
								const CloseDoneDepositPopup = () => {
									setProcessing(false);
									window.location.reload();
								};

								if (bankSlipPopBox.receipt) {
									const UploadReceipt = async () => {
										try {
											const formData = new FormData();
											formData.append(
												"TransId",
												res.data.data.transId
											);
											formData.append(
												"Receipt",
												bankSlipPopBox.receipt
											);

											const resUploadReceipt = await api_UploadReceipt(
												formData
											);

											if (
												resUploadReceipt.data
													.errorCode !== 0
											) {
												setPopBox(prevState => ({
													...prevState,
													title:
														i18n.lbl_ImportantNote,
													content: result.message,
													isOpen: true,
													hasBtn: true,
													btnBar: (
														<div className="btn-group">
															<button
																className="blue"
																onClick={
																	CloseDoneDepositPopup
																}>
																OK
															</button>
														</div>
													)
												}));
											} else {
												CloseDoneDepositPopup();
											}
										} catch (error) {
											CloseDoneDepositPopup();
										}
									};

									UploadReceipt();
								} else {
									CloseDoneDepositPopup();
								}
							} else {
								setPopBox(prevState => ({
									...prevState,
									isOpen: true,
									title: i18n.lbl_ImportantNote,
									content: i18n.msg_WrongAmount
								}));
								setLoading(false);
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
							setLoading(false);
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
								src={`${config.imgUrl}/common/images/BankLogo/${selBank.bankLogo}`}
								alt={selBank.bankName}
							/>
							<div className="tip">
								<span>{i18n.lbl_DepositAmount} :</span>{" "}
								{number_format(real_amount, _isConvert)}
							</div>
						</>
					),
					hasBtn: true,
					btnBar: (
						<div className="btn-group">
							<button
								className="Cancel"
								onClick={() =>
									setPopBox(prevState => ({
										...prevState,
										isOpen: false
									}))
								}>
								{i18n.lbl_Cancel}
							</button>
							<button
								className="blue"
								onClick={RedirectToNext.bind(
									this,
									real_amount,
									selBank.sysId
								)}>
								{i18n.lbl_Submit}
							</button>
						</div>
					)
				});
			};

			const SetAccountName = () => {
				api_SetAccountName({
					name: realName || userInfo.accountName
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
										realName
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
							<button className="submit" onClick={SetAccountName}>
								{i18n.lbl_Confirm}
							</button>
						</div>
					)
				});
			} else {
				openConfirmPopBox();
			}
		}
	};

	const HandleAccountName = e => {
		setRealName(e.target.value);
		if (!realNameTip) {
			setRealNameTip("");
		}
	};

	const _isConvert = isConvert(userInfo.currencyId);
	const canSubmit =
		selBank.sysId &&
		amount !== "" &&
		VaildAmount({ amount, displayWarning: false }) &&
		(!!userInfo.accountName || !!realName);

	return (
		<div className="depositModule_mobile open">
			<div className="title text-org">{`${i18n.lbl_CreditTime}: ${i18n[creditTimeKey]}`}</div>
			<GroupList
				title={i18n.lbl_SelectBank}
				dataList={paymentList}
				SelectPayment={SelectBank}
				selected={selBank?.sysId}
				mainKey={`deposit-full-${payType}-bankList`}
				imgKey="bankLogo"
				idKey="sysId"
				bindFullObj={true}
				prefixImgUrl={`${config.imgUrl}/common/images/BankLogo/`}
				imgKeyWithExtension={true}
				accountInfo={accountInfo}
				i18n={i18n}
				displayKey="bankName"
				_isConvert={_isConvert}
			/>
			{!userInfo.accountName ? (
				<>
					<div className="title">
						<span className="text-org">*</span>
						{i18n.lbl_RealName}
					</div>
					<div className="inputBox">
						<input onChange={HandleAccountName} value={realName} />
						<div className="tip">{realNameTip}</div>
					</div>
				</>
			) : null}
			<AmountInput
				title={i18n.lbl_DepositAmount}
				channel={selBank}
				i18n={i18n}
				_isConvert={_isConvert}
				amount={amount}
				tip={warning}
				SelectAmount={SelectAmount}
				EditAmount={EditAmount}
				payType={payType}
			/>
			<div className="btn-group">
				<button
					className="blue"
					onClick={SubmitProof.bind(this, selBank, accountInfo)}>
					{i18n.lbl_UploadReceipt}
				</button>
				<button
					className={canSubmit ? "blue" : "darkGray"}
					onClick={ClickSubmit}>
					{i18n.lbl_Submit}
				</button>
			</div>
		</div>
	);
};

Payment.propTypes = {
	paymentList: PropTypes.arrayOf(PropTypes.object).isRequired,
	creditTimeKey: PropTypes.string.isRequired
};

const GroupList = ({
	mainKey,
	dataList,
	SelectPayment,
	selected,
	title,
	imgKey,
	idKey,
	bindFullObj,
	prefixImgUrl,
	imgKeyWithExtension,
	accountInfo,
	displayKey,
	_isConvert,
	i18n
}) => {
	const rows = dataList?.map(data => {
		const _mainKey = `${mainKey}-${data[idKey]}`;
		const isSelect = selected === data[idKey];
		const { minAmount, maxAmount } = data;
		const RadioBtn = (
			<Radio
				key={`${_mainKey}-outerRadio`}
				id={`${_mainKey}-radio`}
				radioGroup={mainKey}
				imgUrl={`${prefixImgUrl}${
					imgKeyWithExtension ? data[imgKey] : `${data[imgKey]}.png`
				}`}
				imgAlt={data[imgKey] ?? ""}
				onChange={SelectPayment.bind(
					this,
					bindFullObj ? data : data[idKey]
				)}
				isSelect={isSelect}
				displayName={data[displayKey]}
				minAmount={minAmount}
				maxAmount={maxAmount}
				_isConvert={_isConvert}
				i18n={i18n}
			/>
		);
		return isSelect ? (
			<div className="info infoAccount" key={_mainKey}>
				<ul>
					<li>
						<Radio
							key={`${_mainKey}-outerRadio`}
							className="checkBank"
							id={`${_mainKey}-radio`}
							radioGroup={mainKey}
							imgUrl={`${prefixImgUrl}${
								imgKeyWithExtension
									? data[imgKey]
									: `${data[imgKey]}.png`
							}`}
							imgAlt={data[imgKey] ?? ""}
							onChange={SelectPayment.bind(
								this,
								bindFullObj ? data : data[idKey]
							)}
							isSelect={isSelect}
						/>
						{/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
						<a
							href={accountInfo.bankSite}
							target="_blank"
							rel="noreferrer"
							className="icon icon-new-tab clickBtn"
						/>
					</li>
					<CopyBtn value={accountInfo.accountName} />
					<CopyBtn value={accountInfo.accountNo} />
				</ul>
			</div>
		) : (
			RadioBtn
		);
	});
	return (
		<>
			<div className="title">
				<span className="text-org">*</span>
				{title}
			</div>
			<div className="selectModule">{rows}</div>
		</>
	);
};

GroupList.defaultProps = {
	dataList: null,
	selected: null,
	bindFullObj: false,
	imgKeyWithExtension: false,
	accountInfo: {},
	displayKey: ""
};

GroupList.propTypes = {
	dataList: PropTypes.arrayOf(PropTypes.object),
	SelectPayment: PropTypes.func.isRequired,
	selected: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
		PropTypes.object
	]),
	title: PropTypes.string.isRequired,
	mainKey: PropTypes.string.isRequired,
	imgKey: PropTypes.string.isRequired,
	idKey: PropTypes.string.isRequired,
	bindFullObj: PropTypes.bool,
	prefixImgUrl: PropTypes.string.isRequired,
	imgKeyWithExtension: PropTypes.bool,
	accountInfo: PropTypes.objectOf(PropTypes.any),
	displayKey: PropTypes.string,
	_isConvert: PropTypes.bool.isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

class CopyBtn extends Component {
	componentDidMount() {
		/* eslint-disable */
		this._clipboard = new ClipboardJS(".copyBtn");
		this._clipboard.on("success", e => {});
		this._clipboard.on("error", e => {});
		/* eslint-enable */
	}

	componentWillUnmount() {
		this._clipboard.destroy();
	}

	render() {
		return (
			<li>
				<div>
					<span>{this.props.value}</span>
				</div>
				<button
					className="icon icon-files-empty clickBtn copyBtn"
					value={this.props.value}
					data-clipboard-text={this.props.value}
				/>
			</li>
		);
	}
}

CopyBtn.propTypes = {
	value: PropTypes.string.isRequired
};

export default Payment;
