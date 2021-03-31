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
import { useHandleAmount } from "../hook/useHandleAmount";
import api from "../../service/api";

const payType = "localBank";

const Payment = props => {
	const { paymentList, creditTimeKey } = props;

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
		digits: 0
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
		api.payment.GetLocalBankInfo({ sysId: bankInfo.sysId }).then(
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
			hideSubmit: true
		}));
	};

	const ClickSubmit = () => {
		const result =
			selBank.sysId && amount !== "" && VaildAmount({ amount });
		if (result && !processing) {
			const RedirectToNext = (real_amount, sysId) => {
				setLoading(true);
				setPopBox(prevState => ({
					...prevState,
					isOpen: false
				}));

				api.payment
					.DepositReqWireTransfer({
						amount: real_amount,
						sysId
					})
					.then(
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

												const resUploadReceipt = await api.payment.UploadReceipt(
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
							{number_format(real_amount, _isConvert, 0)}
						</div>
					</>
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
	const reciptIsRequired =
		userInfo.currencyId === 4 ? bankSlipPopBox.receipt ?? false : true;
	const canSubmit =
		selBank.sysId &&
		amount !== "" &&
		VaildAmount({ amount, displayWarning: false }) &&
		reciptIsRequired;

	return (
		<div className="depositModule active">
			<div className="title text-org icon icon-credit-card">
				{`${i18n.lbl_CreditTime}: ${i18n[creditTimeKey]}`}
			</div>
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
				displayKey="bankName"
				_isConvert={_isConvert}
			/>
			<AmountInput
				title={i18n.lbl_DepositAmount}
				channel={selBank}
				i18n={i18n}
				_isConvert={_isConvert}
				amount={amount}
				SelectAmount={SelectAmount}
				EditAmount={EditAmount}
				payType={payType}
				tip={i18n.lbl_AmountTooltip?.replace(
					"{{0}}",
					selBank?.minAmount
						? number_format(selBank?.minAmount, _isConvert, 0)
						: 1
				)}
				msg={warning.msg}
				status={warning.status}
			/>
			<div className="btn-group">
				<button
					className={canSubmit ? "orange" : "gray"}
					disabled={!canSubmit}
					onClick={ClickSubmit}>
					{i18n.lbl_Submit}
				</button>
				<button onClick={SubmitProof.bind(this, selBank, accountInfo)}>
					{i18n.lbl_UploadReceipt}
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
	_isConvert
}) => {
	const { i18n } = useContext(i18nContext);
	const rows = dataList?.map(data => {
		const _mainKey = `${mainKey}-${data[idKey]}`;
		const isSelect = selected === data[idKey];
		return isSelect ? (
			<div className="info infoAccount" key={_mainKey}>
				<ul>
					<li>
						<div className="bankName active">
							<img
								key={`${_mainKey}-img`}
								src={`${prefixImgUrl}${
									imgKeyWithExtension
										? data[imgKey]
										: `${data[imgKey]}.png`
								}`}
								alt={data[imgKey] ?? ""}
							/>
							<i className="icon icon-icon32px_check" />
						</div>
						<a
							href={accountInfo.bankSite}
							target="_blank"
							rel="noreferrer">
							<button className="icon icon-new-tab clickBtn" />
						</a>
					</li>
					<CopyBtn value={accountInfo.accountName} />
					<CopyBtn value={accountInfo.accountNo} />
				</ul>
			</div>
		) : (
			<div className="info infoAccount" key={_mainKey}>
				<ul>
					<li>
						<div
							className="bankName"
							onClick={SelectPayment.bind(
								this,
								bindFullObj ? data : data[idKey]
							)}>
							<img
								key={`${_mainKey}-img`}
								src={`${prefixImgUrl}${
									imgKeyWithExtension
										? data[imgKey]
										: `${data[imgKey]}.png`
								}`}
								alt={data[imgKey] ?? ""}
							/>
							<i className="icon icon-icon32px_check" />
							<div className="bank">
								<div>{data[displayKey]}</div>

								<div>
									{data?.minAmount && data?.maxAmount
										? `${
												i18n.lbl_MinMaxAmount
										  }: ${number_format(
												data.minAmount,
												_isConvert,
												0
										  )} / ${number_format(
												data.maxAmount,
												_isConvert,
												0
										  )}`
										: ""}
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
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
	accountInfo: {}
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
	displayKey: PropTypes.string.isRequired,
	_isConvert: PropTypes.bool.isRequired
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
