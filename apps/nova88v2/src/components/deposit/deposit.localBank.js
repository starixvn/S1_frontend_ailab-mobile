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
import { paymentImgURL } from "../../config";
import {
	isConvert,
	number_format,
	defCurrenyId,
	getBase64,
	debounce
} from "../common/common";
import AmountInput from "./deposit.amountInput";
import { useHandleAmount } from "../hook/useHandleAmount";
import api from "../../service/api";
import DepositChannel, {
	defDepChannelValue,
	defDepositChannel
} from "./localbank.depositChannel";
import PromoList, { setCustPromo } from "./promoList";

const payType = "localBank";

const useHandleSelect = () => {
	const [selData, setSelectData] = useState(null);
	const [warning, setWarning] = useState({ msg: "", status: null });

	const HandleSelectData = idx => {
		if (idx !== null) {
			setSelectData(idx);
			setWarning({ msg: "", status: null });
		}
	};

	const SetWarning = msg => {
		if (msg) {
			setWarning({ msg, status: 1 });
		} else {
			setWarning({ msg, status: null });
		}
	};

	return { selData, warning, HandleSelectData, SetWarning };
};

const Payment = props => {
	const {
		paymentList,
		userPaymentData,
		handleUserPaymentData,
		promoList,
		asyncPromotionConfirmPopBox,
		checkDepositSpecialCode
	} = props;

	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const [processing, setProcessing] = useState(false);
	const { bankSlipPopBox, setbankSlipPopBox } = useContext(
		bankSlipPopBoxContext
	);
	const { setLoading } = useContext(loadingContext);
	const [selBank, setBank] = useState({});
	const [accountInfo, setAccountInfo] = useState({});
	const [custBankInfo, setCustBankInfo] = useState([]);
	const [depositPromo, setDepositPromo] = useState({
		bonusCode: null,
		requiredAmount: null,
		specialCode: ""
	});

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
		i18n,
		digits: userInfo.currencyId === defCurrenyId.IDR ? 3 : 2,
		lastAmount: userPaymentData?.amount
	});

	const {
		selData: selDepositChannel,
		warning: depositChannelWarning,
		HandleSelectData: HandleDepositChannel,
		SetWarning: depositChannelSetWarning
	} = useHandleSelect();

	const {
		selData: selBankAccount,
		warning: bankAccountlWarning,
		HandleSelectData: HandleBankAccount,
		SetWarning: bankAccountSetWarning
	} = useHandleSelect();

	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		if (paymentList.length > 0) {
			let bankIdx = paymentList.findIndex(
				obj => obj.sysId === userPaymentData?.sysId
			);
			bankIdx = bankIdx === -1 ? 0 : bankIdx;
			SelectBank(paymentList[bankIdx]);
		}
		return () => {
			isMountedRef.current = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [paymentList.length, userPaymentData.payType]);

	useEffect(() => {
		if (userInfo.isLogin) {
			api.account.GetCustBankInfo().then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							const { data } = res.data;
							if (data !== null) {
								const bankInfoDetail =
									data.bankInfoDetail ?? [];
								const getBankInfoArr = bankInfoDetail.map(
									i => ({
										displayText: `${i.bankName} / ${i.accountNo} / ${userInfo.accountName}`,
										bankName: i.bankName,
										image: i.bankLogo,
										accountNo: i.accountNo,
										SysId: i.sysId
									})
								);
								setCustBankInfo(() => getBankInfoArr);
							}
						} else {
							setPopBox({
								isOpen: true,
								content: `[${res.data.errorCode}]${res.data.message}`
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
					setLoading(false);
				}
			);
		}
	}, [i18n, setPopBox, userInfo.isLogin, userInfo.accountName]);

	const SelectBank = bankInfo => {
		setLoading(true);
		api.payment.GetLocalBankInfo({ sysId: bankInfo.sysId }).then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						setAccountInfo(res.data.data);
						setBank(bankInfo);
					} else {
						setPopBox({
							isOpen: true,
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

	const SubmitProof = (bankInfo, accInfo) => {
		const { ...restBankInfo } = bankInfo;
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
			hideSubmit: true
		}));
	};

	const reciptIsRequired =
		userInfo.currencyId === 4 ? bankSlipPopBox.receipt ?? false : true;

	const canSubmit =
		selBank.sysId &&
		amount !== "" &&
		VaildAmount({ amount, displayWarning: false }) &&
		reciptIsRequired;

	const isShowSubmit = paymentList.filter(
		item => item.sysId === selBank.sysId
	)[0]?.canSubmit;

	const classStyle = () => {
		let result = "";
		if (isShowSubmit && canSubmit) {
			result = "blue";
		} else {
			result = isShowSubmit ? "gray" : "orange";
		}
		return result;
	};

	const ClickSubmit = async () => {
		let result =
			selBank.sysId &&
			amount !== "" &&
			VaildAmount({ _amount: amount }) &&
			selBank.canSubmit &&
			canSubmit;

		if (selDepositChannel === null) {
			depositChannelSetWarning(i18n.lbl_LocalBankDepositChannelTip);
			result = false;
		} else if (
			(defDepositChannel[selDepositChannel].value ===
				defDepChannelValue.OnlineBanking &&
				selBankAccount === null) ||
			(defDepositChannel[selDepositChannel].value ===
				defDepChannelValue.ATM &&
				selBankAccount === null)
		) {
			bankAccountSetWarning(i18n.lbl_LocalBankBankAccountTip);
			result = false;
		}

		if (result && !processing) {
			const resultAmount = _isConvert ? amount * 1000 : Number(amount);

			if (
				userInfo.phoneVerified &&
				depositPromo.requiredAmount &&
				resultAmount < depositPromo.requiredAmount
			) {
				const success = await asyncPromotionConfirmPopBox();

				if (!success) return;
			}

			let { bonusCode } = depositPromo;

			if (depositPromo.specialCode) {
				bonusCode = await checkDepositSpecialCode(
					depositPromo.specialCode
				);

				if (!bonusCode) {
					return;
				}
			}

			const RedirectToNext = debounce((real_amount, sysId) => {
				setLoading(true);
				setPopBox(prevState => ({
					...prevState,
					isOpen: false
				}));

				let channelData = {};
				if (
					defDepositChannel[selDepositChannel].value ===
						defDepChannelValue.OnlineBanking ||
					defDepositChannel[selDepositChannel].value ===
						defDepChannelValue.ATM
				) {
					channelData = {
						fromChannel:
							defDepositChannel[selDepositChannel]?.value,
						fromSysId: custBankInfo[selBankAccount]?.SysId,
						fromAccountNum: custBankInfo[selBankAccount]?.accountNo
					};
				}

				api.payment
					.DepositReqWireTransfer({
						amount: real_amount,
						sysId,
						bankId: selBank.bankId,
						...channelData
					})
					.then(
						async res => {
							if (isMountedRef.current) {
								if (res.data.errorCode === 0) {
									const RefreshPage = () => {
										window.location.reload();
									};

									const CloseDoneDepositPopup = () => {
										const userData = {
											payType: "localBank",
											amount: real_amount,
											sysId
										};

										if (Object.keys(channelData)?.length) {
											userData.localBankChannel = channelData;
										} else if (selDepositChannel) {
											userData.localBankChannel = {
												fromChannel:
													defDepositChannel[
														selDepositChannel
													]?.value
											};
										}

										handleUserPaymentData({ userData });

										setProcessing(false);
									};

									const UploadReceipt = async () => {
										try {
											const image = await getBase64(
												bankSlipPopBox.receiptFile
											);
											const resUploadReceipt = await api.payment.UploadReceipt(
												res.data.data.transId,
												image
											);

											if (
												resUploadReceipt.data
													.errorCode !== 0
											) {
												setPopBox(prevState => ({
													...prevState,
													title:
														i18n.lbl_ImportantNote,
													content: `[${resUploadReceipt.data.errorCode}] ${resUploadReceipt.data.message}`,
													isOpen: true,
													hasBtn: true,
													btnBar: (
														<div className="btn-group">
															<button
																className="orange"
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
											setPopBox({
												isOpen: true,
												content: i18n.msg_ApiServerError
											});
											CloseDoneDepositPopup();
										}
									};

									await Promise.all([
										bankSlipPopBox.receiptFile &&
											UploadReceipt(),
										bonusCode &&
											setCustPromo({
												langId: userInfo.langId,
												TransId: res.data.data.transId,
												BonusCode: bonusCode,
												setPopBox,
												i18n,
												toNextStep: CloseDoneDepositPopup
											})
									]);

									RefreshPage();
								} else {
									setPopBox(() => ({
										isOpen: true,
										content: `[${res.data.errorCode}] ${res.data.message}`
									}));
									setLoading(false);
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
			}, 1000);

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
							className="bankimg"
							src={`${paymentImgURL}/square/${selBank.bankLogo?.toLowerCase()}`}
							alt={selBank.bankName}
						/>
						<div>
							<span>{i18n.lbl_DepositAmount} :</span>{" "}
							{number_format(real_amount, _isConvert, 0)}
						</div>
					</>
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
							className="orange"
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
		}
	};

	const _isConvert = isConvert(userInfo.currencyId);

	return (
		<>
			<GroupList
				title={i18n.lbl_SelectBank}
				dataList={paymentList}
				SelectPayment={SelectBank}
				selected={selBank?.sysId}
				mainKey={`deposit-full-${payType}-bankList`}
				imgKey="bankLogo"
				idKey="sysId"
				bindFullObj={true}
				prefixImgUrl={`${paymentImgURL}/square/`}
				imgKeyWithExtension={true}
				accountInfo={accountInfo}
				displayKey="bankName"
				_isConvert={_isConvert}
				// deposit channel
				DepositChannelProps={{
					HandleDepositChannel,
					selDepositChannel,
					depositChannelWarning
				}}
				BankAccountProps={{
					HandleBankAccount,
					selBankAccount,
					custBankInfo,
					bankAccountlWarning
				}}
				userPaymentData={userPaymentData?.localBankChannel}
				// deposit amount
				amount={amount}
				SelectAmount={SelectAmount}
				EditAmount={EditAmount}
				tip={i18n.lbl_AmountTooltip?.replace(
					"{{0}}",
					selBank?.minAmount
						? number_format(selBank?.minAmount, _isConvert, 0)
						: 1
				)}
				msg={warning.msg}
				status={warning.status}
				currencyId={userInfo.currencyId}
				SubmitProof={SubmitProof}
			/>

			<PromoList
				i18n={i18n}
				amount={Number(amount)}
				userInfo={userInfo}
				promoList={promoList}
				depositPromo={depositPromo}
				setDepositPromo={setDepositPromo}
			/>

			<div className="btn-group">
				<button
					className={classStyle()}
					disabled={!canSubmit}
					onClick={ClickSubmit}>
					{isShowSubmit ? i18n.lbl_Submit : i18n.lbl_DepositStatus1}
				</button>
			</div>
		</>
	);
};

Payment.defaultProps = {
	userPaymentData: {},
	handleUserPaymentData: () => null,
	promoList: []
};

Payment.propTypes = {
	paymentList: PropTypes.arrayOf(PropTypes.object).isRequired,
	userPaymentData: PropTypes.objectOf(PropTypes.any),
	handleUserPaymentData: PropTypes.func,
	promoList: PropTypes.arrayOf(PropTypes.objectOf),
	asyncPromotionConfirmPopBox: PropTypes.func.isRequired,
	checkDepositSpecialCode: PropTypes.func.isRequired
};

const GroupList = ({
	mainKey,
	dataList,
	SelectPayment,
	title,
	imgKey,
	idKey,
	prefixImgUrl,
	imgKeyWithExtension,
	accountInfo,
	_isConvert,
	DepositChannelProps,
	BankAccountProps,
	userPaymentData,
	amount,
	SelectAmount,
	EditAmount,
	tip,
	msg,
	status,
	currencyId,
	SubmitProof
}) => {
	const { i18n } = useContext(i18nContext);
	const [selectedBank, setSelectedBank] = useState(dataList[0]);
	const rows = dataList?.map(data => {
		const _mainKey = `${mainKey}-${data[idKey]}`;
		const { bankCode, canSubmit, maxAmount, minAmount } = data;

		return (
			<div key={_mainKey}>
				<div
					className={`bankName${
						bankCode === selectedBank.bankCode ? " active" : ""
					} ${canSubmit ? "" : " pending"}`}
					key={_mainKey}
					onClick={() => {
						setSelectedBank(data);
						SelectPayment(data);
					}}>
					<img
						key={`${_mainKey}-img`}
						src={`${prefixImgUrl}${
							imgKeyWithExtension
								? data[imgKey]?.toLowerCase()
								: `${data[imgKey]?.toLowerCase()}.png`
						}`}
						alt={data[imgKey] ?? ""}
					/>
					<i className="icon icon-icon32px_check" />
					{data.canSubmit === false && <div className="mask" />}
				</div>
				<div className="subtitle">{bankCode}</div>
				{minAmount === null || maxAmount === null ? null : (
					<div className="subinfo">
						<span>
							{`${i18n?.lbl_Min}: ${
								minAmount === 0
									? i18n.lbl_Unlimited
									: number_format(minAmount, _isConvert, 0)
							}`}
						</span>
						<span>
							{`${i18n?.lbl_Max}: ${
								maxAmount === 0
									? i18n.lbl_Unlimited
									: number_format(maxAmount, _isConvert, 0)
							}`}
						</span>
					</div>
				)}
			</div>
		);
	});

	const additionalRows = () => {
		return (
			<>
				<div className="info infoAccount">
					<ul>
						<li>
							<img
								src={`${prefixImgUrl}${
									imgKeyWithExtension
										? selectedBank.bankLogo?.toLowerCase()
										: `${selectedBank.bankLogo?.toLowerCase()}.png`
								}`}
								alt={selectedBank.bankLogo ?? ""}
							/>
							<div>{selectedBank.bankCode}</div>
						</li>
						<CopyBtn value={accountInfo.accountName} />
						<CopyBtn value={accountInfo.accountNo} />
					</ul>
				</div>
				{selectedBank.qrCodeUrl && (
					<>
						<div className="title">
							<span>*</span>
							{i18n.lbl_ScanQR}
						</div>
						<div className="infoModule">
							<div className="qrCode">
								<img
									src={`${paymentImgURL}${selectedBank.qrCodeUrl}`}
									alt={selectedBank.bankName}
								/>
							</div>
						</div>
					</>
				)}
				<DepositChannel
					i18n={i18n}
					DepositChannelProps={DepositChannelProps}
					BankAccountProps={BankAccountProps}
					userPaymentData={userPaymentData}
				/>
				<div className="btn-group">
					<button
						onClick={SubmitProof.bind(
							this,
							selectedBank,
							accountInfo
						)}>
						{i18n.lbl_UploadReceipt}
					</button>
				</div>
				<AmountInput
					title={i18n.lbl_DepositAmount}
					channel={selectedBank}
					i18n={i18n}
					_isConvert={_isConvert}
					amount={amount}
					SelectAmount={SelectAmount}
					EditAmount={EditAmount}
					payType={payType}
					tip={tip}
					msg={msg}
					status={status}
					currencyId={currencyId}
					noInfoModule={true}
				/>
			</>
		);
	};

	const renderPage = () => {
		return (
			<>
				{rows}
				{additionalRows()}
			</>
		);
	};

	return (
		<>
			<div className="title">
				<span className="text-org">*</span>
				{title}
			</div>
			<div className="selectModule selectNew">{renderPage()}</div>
		</>
	);
};

GroupList.defaultProps = {
	dataList: null,
	imgKeyWithExtension: false,
	accountInfo: {},
	DepositChannelProps: {},
	BankAccountProps: {},
	userPaymentData: {},
	amount: "",
	SelectAmount: () => null,
	EditAmount: () => null,
	tip: "",
	msg: "",
	status: "",
	currencyId: null,
	SubmitProof: () => null
};

GroupList.propTypes = {
	dataList: PropTypes.arrayOf(PropTypes.object),
	SelectPayment: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	mainKey: PropTypes.string.isRequired,
	imgKey: PropTypes.string.isRequired,
	idKey: PropTypes.string.isRequired,
	prefixImgUrl: PropTypes.string.isRequired,
	imgKeyWithExtension: PropTypes.bool,
	accountInfo: PropTypes.objectOf(PropTypes.any),
	_isConvert: PropTypes.bool.isRequired,
	DepositChannelProps: PropTypes.objectOf(PropTypes.any),
	BankAccountProps: PropTypes.objectOf(PropTypes.any),
	userPaymentData: PropTypes.objectOf(PropTypes.any),
	amount: PropTypes.string,
	SelectAmount: PropTypes.func,
	EditAmount: PropTypes.func,
	tip: PropTypes.string,
	msg: PropTypes.string,
	status: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	currencyId: PropTypes.number,
	SubmitProof: PropTypes.func
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

CopyBtn.defaultProps = {
	value: null
};

CopyBtn.propTypes = {
	value: PropTypes.string
};

export default Payment;
