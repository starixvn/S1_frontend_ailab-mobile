import React, {
	useContext,
	useState,
	useRef,
	useEffect,
	Component
} from "react";
import { MetaPixelTracker } from "@ailab-mobile/common";
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
import { paymentImgUrl } from "../../config";
import {
	isConvert,
	number_format,
	getBase64,
	debounce
} from "../common/common";
import AmountInput from "./deposit.amountInput";
import { useHandleAmount } from "./hook/useHandleAmount";
import Radio from "./deposit.radio";
import {
	api_payment_GetLocalBankInfo,
	api_DepositReqWireTransfer,
	api_UploadReceipt
} from "../../service/api/payment";
import { api_SetAccountName } from "../../service/api/accountStrict";
import Inputbox from "../common/inputbox.info";
import PromoList, { setCustPromo } from "./promoList";
import ImportantNotes from "./importantNote";

const payType = "localBank";

const Payment = props => {
	const { paymentList, promoList, checkDepositSpecialCode, onSubmit } = props;

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
	const [realNameStatus, setRealNameStatus] = useState({
		checked: null,
		msg: ""
	});

	const [depositPromo, setDepositPromo] = useState({
		bonusCode: null,
		requiredAmount: null,
		specialCode: ""
	});

	const {
		amount,
		inputStatus,
		setInputStatus,
		SelectAmount,
		EditLocalBankAmount,
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

	const clickInfo = ({ col }) => {
		if (col === "amount") {
			const msg = i18n.lbl_AmountTooltip.replace(
				"{{0}}",
				number_format(selBank?.minAmount, _isConvert, 0)
			);
			setInputStatus({
				checked: null,
				msg: inputStatus.msg === "" ? msg : ""
			});
		} else {
			setRealNameStatus({
				checked: null,
				msg:
					realNameStatus.msg === ""
						? i18n.msg_ConfirmRealNameAlert
						: ""
			});
		}
	};

	const realNameCheck = () => {
		let checked = true;
		let msg = "";

		if (!realName) {
			checked = false;
			msg = i18n.msg_EnterRealName;
		}

		setRealNameStatus({ checked, msg });
	};

	const SelectBank = bankInfo => {
		setLoading(true);
		api_payment_GetLocalBankInfo({ sysId: bankInfo.sysId }).then(
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
		const { currencyId, ...restBankInfo } = bankInfo;
		const { accountName, accountNo, code } = accInfo;
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
			code,
			isOpen: true,
			disableSubmit: true
		}));
	};

	const ClickSubmit = async () => {
		const checkAccountName = !!userInfo.accountName || !!realName;
		const result =
			selBank.sysId &&
			amount !== "" &&
			VaildAmount({ _amount: amount }) &&
			checkAccountName;

		if (result && !processing) {
			let { bonusCode } = depositPromo;

			if (depositPromo.specialCode) {
				bonusCode = await checkDepositSpecialCode(
					depositPromo.specialCode
				);

				if (!bonusCode) {
					return;
				}
			}
			onSubmit();
			const RedirectToNext = debounce((real_amount, sysId) => {
				setLoading(true);
				setPopBox(prevState => ({
					...prevState,
					isOpen: false
				}));

				api_DepositReqWireTransfer({
					amount: real_amount,
					sysId,
					bankId: selBank.bankId,
					code: accountInfo.code
				}).then(
					res => {
						if (isMountedRef.current) {
							if (res.data.errorCode === 0) {
								MetaPixelTracker("depositSubmit");
								const CloseDoneDepositPopup = () => {
									setProcessing(false);
									window.location.reload();
								};

								if (
									bankSlipPopBox.receiptFile ||
									depositPromo?.bonusCode
								) {
									const UploadReceipt = async () => {
										try {
											const image = await getBase64(
												bankSlipPopBox.receiptFile
											);
											const resUploadReceipt = await api_UploadReceipt(
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
													content: result.message,
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
											CloseDoneDepositPopup();
										}
									};
									UploadReceipt();
									if (depositPromo?.bonusCode) {
										setCustPromo({
											langId: userInfo.langId,
											TransId: res.data.data.transId,
											BonusCode: depositPromo.bonusCode,
											setPopBox,
											i18n,
											toNextStep: CloseDoneDepositPopup
										});
									}
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
								content: i18n.msg_ApiServerError
							});
							setLoading(false);
						}
					}
				);
			}, 1000);

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
								src={`${paymentImgUrl}/${selBank.bankLogo?.toLowerCase()}`}
								alt={selBank.bankName}
							/>
							<div className="tip">
								<span>{i18n.lbl_DepositAmount} :</span>{" "}
								{number_format(real_amount, _isConvert, 0)}
							</div>
						</>
					),
					hasBtn: true,
					btnBar: (
						<div className="btn-group">
							<button
								className="darkGray"
								onClick={() =>
									setPopBox(prevState => ({
										...prevState,
										isOpen: false
									}))
								}>
								{i18n.lbl_Cancel}
							</button>
							<button
								className="lightBlue"
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
									content: `[${res.data.errorCode}] ${res.data.message}`,
									hasBtn: true,
									btnBar: (
										<div className="btn-group">
											<button
												className="darkGray"
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
								className="darkGray"
								onClick={() =>
									setPopBox(prevState => ({
										...prevState,
										isOpen: false
									}))
								}>
								{i18n.lbl_Cancel}
							</button>
							<button
								className="lightBlue"
								onClick={SetAccountName}>
								{i18n.lbl_Submit}
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
	};

	const _isConvert = isConvert(userInfo.currencyId);
	const canSubmit =
		selBank.sysId &&
		amount !== "" &&
		VaildAmount({ _amount: amount, displayWarning: false }) &&
		(!!userInfo.accountName || !!realName);

	const judgeBtnStatus = () => {
		if (selBank.canSubmit && canSubmit) {
			ClickSubmit();
		}
	};
	const isShowSubmit = paymentList.filter(
		item => item.sysId === selBank.sysId
	)[0]?.canSubmit;
	const classStyle = () => {
		let result = "";
		if (isShowSubmit && canSubmit) {
			result = "lightBlue";
		} else {
			result = isShowSubmit ? "darkGray" : "yellow";
		}
		return result;
	};

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
				prefixImgUrl={`${paymentImgUrl}/`}
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
					<Inputbox
						onChange={HandleAccountName}
						value={realName}
						onBlur={realNameCheck}
						btnStatus={realNameStatus.checked}
						tip={realNameStatus.msg}
						clickInfo={clickInfo.bind(this, { col: "realName" })}
					/>
				</>
			) : null}
			<AmountInput
				title={i18n.lbl_DepositAmount}
				channel={selBank}
				i18n={i18n}
				_isConvert={_isConvert}
				amount={amount}
				tip={inputStatus.msg}
				btnStatus={inputStatus.checked}
				SelectAmount={SelectAmount}
				EditAmount={EditLocalBankAmount}
				payType={payType}
				clickInfo={clickInfo.bind(this, { col: "amount" })}
				VaildAmount={VaildAmount.bind(this, { _amount: amount })}
			/>

			<PromoList
				amount={Number(amount)}
				promoList={promoList}
				i18n={i18n}
				userInfo={userInfo}
				depositPromo={depositPromo}
				setDepositPromo={setDepositPromo}
			/>

			<ImportantNotes i18n={i18n} />

			<div className="btn-group">
				<button
					className="orange"
					onClick={SubmitProof.bind(this, selBank, accountInfo)}>
					{i18n.lbl_UploadReceipt}
				</button>
				<button className={classStyle()} onClick={judgeBtnStatus}>
					{isShowSubmit ? i18n.lbl_Submit : i18n.lbl_DepositStatus1}
				</button>
			</div>
		</>
	);
};

Payment.defaultProps = {
	promoList: []
};

Payment.propTypes = {
	paymentList: PropTypes.arrayOf(PropTypes.object).isRequired,
	promoList: PropTypes.arrayOf(PropTypes.object),
	checkDepositSpecialCode: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired
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
	const selectedBank = dataList.find(({ sysId }) => sysId === selected);
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
					imgKeyWithExtension
						? data[imgKey]?.toLowerCase()
						: `${data[imgKey]?.toLowerCase()}.png`
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
				canSubmit={data.canSubmit}
			/>
		);
		return RadioBtn;
	});

	return (
		<>
			<div className="title">
				<span className="text-org">*</span>
				{title}
				{_isConvert && (
					<div className="info">
						{i18n.Label_Deposit_AdditionalInfo}
					</div>
				)}
			</div>
			<div className="selectModule">
				{rows}

				{selected && (
					<>
						<div className="info infoAccount">
							<ul>
								<li>
									<img
										src={`${prefixImgUrl}${
											imgKeyWithExtension
												? selectedBank[
														imgKey
												  ]?.toLowerCase()
												: `${selectedBank?.[
														imgKey
												  ]?.toLowerCase()}.png`
										}`}
										alt={selectedBank[imgKey]}
									/>
									<div>{selectedBank[displayKey]}</div>

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

						{accountInfo?.code && (
							<div className="info infoAccount remark">
								<ul>
									<li>
										<div className="title">
											{i18n?.Label_Remark}
										</div>
										{/* 這裡的 Copy Button 功能 是之後設計再補上的元件，不能使用 CopyBtn 元件裡沒有 li */}
										<span>{accountInfo?.code}</span>
										<button
											data-clipboard-target=".copyBtn"
											className="icon icon-files-empty clickBtn copyBtn"
											data-clipboard-text={
												accountInfo?.code
											}
										/>
									</li>

									<div
										className="tip"
										style={{ display: "block" }}>
										{i18n?.Label_Deposit_RemarkHint}
									</div>
								</ul>
							</div>
						)}

						{selectedBank.qrCodeUrl && (
							<>
								<div className="subtitle">
									<span>*</span>
									{i18n.lbl_ScanQR}
								</div>
								<div className="qrCode">
									<img
										src={`${paymentImgUrl}${selectedBank.qrCodeUrl}`}
										alt={selectedBank.bankName}
									/>
								</div>
							</>
						)}
					</>
				)}
			</div>
		</>
	);
};

GroupList.defaultProps = {
	dataList: null,
	selected: null,
	bindFullObj: false,
	imgKeyWithExtension: false,
	accountInfo: {},
	displayKey: "",
	_isConvert: false
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
	_isConvert: PropTypes.bool,
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
