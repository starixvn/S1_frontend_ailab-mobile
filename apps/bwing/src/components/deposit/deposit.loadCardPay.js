import React, { useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { i18nContext, userInfoContext, popBoxContext } from "../common/context";
import config, { bannerImgUrl, paymentImgUrl } from "../../config";
import {
	isConvert,
	number_format,
	getWindowOpenUrl,
	debounce
} from "../common/common";
import GroupList from "./deposit.groupList";
import AmountInput from "./deposit.amountInput";
import { useHandleAmount } from "./hook/useHandleAmount";
import { api_payment_GetLoadCardPayInfoList } from "../../service/api/payment";
import Inputbox from "../common/inputbox.info";
import { api_cashier_DepositReqLoadCardPay } from "../../service/api/cashier";
import PromoList from "./promoList";

const payType = "LoadCardPay";
const initCardDataStatus = {
	cardCode: { checked: null, msg: "" },
	cardSerial: { checked: null, msg: "" }
};

const Payment = props => {
	const { paymentList, promoList, checkDepositSpecialCode } = props;
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const [selChannel, setSelChannel] = useState({});
	const [cardData, setCardData] = useState({ cardCode: "", cardSerial: "" });
	const [cardDataStatus, setCardDataStatus] = useState(initCardDataStatus);

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
		EditAmount,
		VaildAmount
	} = useHandleAmount({
		currencyId: userInfo.currencyId,
		minAmount: selChannel?.minAmount,
		maxAmount: selChannel?.maxAmount,
		i18n
	});

	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		if (paymentList.length > 0) {
			SelectGroup(paymentList[0].groupId);
		}
		return () => {
			isMountedRef.current = false;
		};
	}, [paymentList.length]);

	const SelectGroup = groupId => {
		api_payment_GetLoadCardPayInfoList({ groupId }).then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						setSelChannel(res.data.data?.[0]);
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

	const clickInfo = ({ col }) => {
		if (col === "cardCode" || col === "cardSerial") {
			const img = (
				<img src={`${bannerImgUrl}/h5/img/cardinfo.png`} alt={col} />
			);
			const _msg = cardDataStatus[col].msg === "" ? img : "";
			setCardDataStatus(prev => ({
				...prev,
				[col]: { checked: null, msg: _msg }
			}));
		} else {
			const msg = i18n.lbl_AmountTooltip.replace(
				"{{0}}",
				number_format(selChannel?.minAmount, _isConvert)
			);
			setInputStatus({
				checked: null,
				msg: inputStatus.msg === "" ? msg : ""
			});
		}
	};

	const EditField = ({ col, value }, e) => {
		const val = value ?? e.target.value;
		setCardData(prev => ({
			...prev,
			[col]: val
		}));
	};

	const checkValue = ({ col, val }) => {
		let checked = true;
		let msg = "";

		if (!val) {
			checked = false;
			if (col === "cardCode") {
				msg = i18n.msg_PleaseEnterCardCode;
			} else {
				msg = i18n.msg_PleaseEnterCardSerial;
			}
		}

		setCardDataStatus(prev => ({
			...prev,
			[col]: { checked, msg }
		}));
		return checked;
	};

	const ClickSubmit = async () => {
		const result =
			checkValue({ col: "cardCode", val: cardData.cardCode }) &&
			checkValue({ col: "cardSerial", val: cardData.cardSerial }) &&
			VaildAmount({ _amount: amount });

		if (result) {
			let { bonusCode } = depositPromo;

			if (depositPromo.specialCode) {
				bonusCode = await checkDepositSpecialCode(
					depositPromo.specialCode
				);

				if (!bonusCode) {
					return;
				}
			}

			const RedirectToNext = debounce(real_amount => {
				setPopBox(prevState => ({
					...prevState,
					isOpen: false
				}));
				const { mode, channelId } = selChannel;
				const param = {
					ChannelId: channelId,
					Code: cardData.cardCode,
					Serial: cardData.cardSerial,
					Amount: real_amount,
					BonusCode: bonusCode
				};

				const refreshPage = () => {
					window.location.reload();
				};

				if (mode === 3) {
					api_cashier_DepositReqLoadCardPay({
						langId: userInfo.langId,
						...param
					}).then(
						res => {
							const { errorCode, data, message } = res.data;
							if (errorCode === 0) {
								setPopBox({
									isOpen: true,
									title: i18n.lbl_ImportantNote,
									content: <p>{data.formData.Message}</p>,
									hasBtn: true,
									btnBar: (
										<div className="btn-group">
											<button
												className="blue"
												onClick={refreshPage}>
												OK
											</button>
										</div>
									),
									handlePopBox: () => {
										setPopBox(prevState => ({
											...prevState,
											isOpen: false
										}));
										refreshPage();
									}
								});
							} else {
								setPopBox({
									isOpen: true,
									content: `[${errorCode}] ${message}`,
									handlePopBox: () => {
										setPopBox(prevState => ({
											...prevState,
											isOpen: false
										}));
										refreshPage();
									}
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
					const mainUrl = `${config.openURL}/${userInfo.langId}/Cashier/DepositReqLoadCardPay`;
					const windowOpenUrl = getWindowOpenUrl({ mainUrl, param });
					window.open(windowOpenUrl);

					setPopBox(prevState => ({
						...prevState,
						isOpen: false
					}));
					refreshPage();
				}
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
							src={`${paymentImgUrl}/${selChannel.groupName?.toLowerCase()}.png`}
							alt={selChannel.channelName}
						/>
						<div>
							<ul>
								<li className="text-lightBlue">
									{i18n.lbl_CardCode} :
								</li>
								<li>{cardData.cardCode}</li>
								<li className="text-lightBlue">
									{i18n.lbl_CardSerial} :
								</li>
								<li>{cardData.cardSerial}</li>
								<li className="text-lightBlue">
									{i18n.lbl_CardValue} :
								</li>
								<li>
									{number_format(real_amount, _isConvert, 0)}
								</li>
							</ul>
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
							onClick={RedirectToNext.bind(this, real_amount)}>
							{i18n.lbl_Submit}
						</button>
					</div>
				)
			});
		}
	};

	const _isConvert = isConvert(userInfo.currencyId);
	const canSubmit =
		cardData.cardCode &&
		cardData.cardSerial &&
		amount !== "" &&
		VaildAmount({ _amount: amount, displayWarning: false });

	return (
		<>
			<GroupList
				title={i18n.lbl_PaymentModes}
				dataList={paymentList}
				SelectPayment={SelectGroup}
				selected={selChannel?.groupId}
				mainKey={`deposit-full-${payType}-groupList`}
				imgKey="groupName"
				idKey="groupId"
				prefixImgUrl={`${paymentImgUrl}/`}
				i18n={i18n}
				displayKey="groupName"
				_isConvert={_isConvert}
				showMinMaxHint={true}
			/>
			<Inputbox
				title={i18n.lbl_CardCode}
				isRequired={true}
				value={cardData.cardCode}
				placeholder={i18n.msg_PleaseEnterCardCode}
				onBlur={checkValue.bind(null, {
					col: "cardCode",
					val: cardData.cardCode
				})}
				onChange={EditField.bind(null, { col: "cardCode" })}
				btnStatus={cardDataStatus.cardCode.checked}
				tip={cardDataStatus.cardCode.msg}
				clickInfo={clickInfo.bind(this, { col: "cardCode" })}
				i18n={i18n}
				isShowPaste={true}
				EditFieldPaste={EditField}
				pasteCol="cardCode"
			/>
			<Inputbox
				title={i18n.lbl_CardSerial}
				isRequired={true}
				value={cardData.cardSerial}
				placeholder={i18n.msg_PleaseEnterCardSerial}
				onBlur={checkValue.bind(null, {
					col: "cardSerial",
					val: cardData.cardSerial
				})}
				onChange={EditField.bind(null, { col: "cardSerial" })}
				btnStatus={cardDataStatus.cardSerial.checked}
				tip={cardDataStatus.cardSerial.msg}
				clickInfo={clickInfo.bind(this, { col: "cardSerial" })}
				i18n={i18n}
				isShowPaste={true}
				EditFieldPaste={EditField}
				pasteCol="cardSerial"
			/>
			<AmountInput
				title={i18n.lbl_CardValue}
				channel={selChannel}
				i18n={i18n}
				_isConvert={_isConvert}
				amount={amount}
				SelectAmount={SelectAmount}
				EditAmount={EditAmount}
				payType={payType}
				tip={inputStatus.msg}
				btnStatus={inputStatus.checked}
				clickInfo={clickInfo}
			/>
			<Note />

			<PromoList
				amount={Number(amount)}
				promoList={promoList}
				i18n={i18n}
				userInfo={userInfo}
				depositPromo={depositPromo}
				setDepositPromo={setDepositPromo}
			/>

			<div className="btn-group">
				<button
					className={canSubmit ? "blue" : "btn-gray"}
					onClick={ClickSubmit}>
					{i18n.lbl_Submit}
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
	checkDepositSpecialCode: PropTypes.func.isRequired
};

const Note = () => {
	const { i18n } = useContext(i18nContext);

	return (
		<div className="note">
			<ol>
				<p>
					<span className="icon icon-warning" />
					{i18n.lbl_ImportantNotes}
				</p>
				<li>* {i18n.lbl_DepositLoadCardNoticeContent1}</li>
				<li>* {i18n.lbl_DepositLoadCardNoticeContent2}</li>
			</ol>
		</div>
	);
};

export default Payment;
