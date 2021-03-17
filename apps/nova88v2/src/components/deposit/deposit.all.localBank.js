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
	const [status, setStatus] = useState(null);
	const { setbankSlipPopBox } = useContext(bankSlipPopBoxContext);
	const { setLoading } = useContext(loadingContext);

	const [transID, setTransId] = useState("");
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
			transId: transID,
			accountNo,
			accountName,
			isOpen: true,
			disableSubmit: true
		}));
	};

	const ClickSubmit = () => {
		const result =
			selBank.sysId && amount !== "" && VaildAmount({ amount });

		if (result) {
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
									setTransId(res.data.data.transId);
									setStatus(true);
								} else {
									setPopBox(prevState => ({
										...prevState,
										isOpen: true,
										title: i18n.lbl_ImportantNote,
										content: i18n.msg_WrongAmount
									}));
									setStatus(false);
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
							{number_format(real_amount, _isConvert)}
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
	const canSubmit =
		selBank.sysId &&
		amount !== "" &&
		VaildAmount({ amount, displayWarning: false });

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
				channel={selBank}
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
				tip={i18n.lbl_AmountTooltip0}
				msg={warning}
				status={status}
			/>
			<div className="btn-group">
				<button
					className={canSubmit ? "orange" : "gray"}
					onClick={ClickSubmit}>
					{i18n.lbl_Submit}
				</button>
				<button
					className={transID ? "orange" : "gray"}
					disabled={!transID}
					onClick={SubmitProof.bind(this, selBank, accountInfo)}>
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
	channel,
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
									{channel?.minAmount && channel?.maxAmount
										? `${
												i18n.lbl_MinMaxAmount
										  }: ${number_format(
												channel.minAmount,
												_isConvert
										  )} / ${number_format(
												channel.maxAmount,
												_isConvert
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
	accountInfo: {},
	channel: null
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
	channel: PropTypes.objectOf(PropTypes.any),
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
