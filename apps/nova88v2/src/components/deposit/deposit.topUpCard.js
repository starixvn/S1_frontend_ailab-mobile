import PropTypes from "prop-types";
import React, { useState, useEffect, useContext } from "react";
import { i18nContext, popBoxContext, userInfoContext } from "../common/context";
import api from "../../service/api";
import Inputbox from "../common/inputbox.copyBtn";
import { useHandleAmount } from "../hook/useHandleAmount";
import { debounce, isConvert, number_format } from "../common/common";
import config, { cloudBannerImgURL, paymentImgURL } from "../../config";
import PromoList from "./promoList";
import GroupList from "./deposit.groupList";
import AmountInput from "./deposit.amountInput";

const initCardDataStatus = {
	cardCode: { checked: null, msg: "" },
	cardSerial: { checked: null, msg: "" }
};

const Payment = ({
	payType,
	promoList,
	paymentList,
	userPaymentData,
	handleUserPaymentData,
	checkDepositSpecialCode,
	asyncPromotionConfirmPopBox
}) => {
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

	const _isConvert = isConvert(userInfo.currencyId);

	const {
		amount,
		warning,
		EditAmount,
		VaildAmount,
		SelectAmount
	} = useHandleAmount({
		currencyId: userInfo.currencyId,
		minAmount: selChannel?.minAmount,
		maxAmount: selChannel?.maxAmount,
		i18n,
		digits: 0,
		lastAmount: userPaymentData?.amount
	});

	const checkValue = ({ col, val }) => {
		let checked = true;
		let msg = "";

		if (!val) {
			checked = false;
			msg =
				col === "cardCode"
					? i18n.msg_PleaseEnterCardCode
					: i18n.msg_PleaseEnterCardSerial;
		}

		setCardDataStatus(prev => ({
			...prev,
			[col]: { checked, msg }
		}));

		return checked;
	};

	const selectGroup = async (groupData, { init }) => {
		// if init (data from useEffect not having groupInfo )
		const { groupId } = init ? groupData : groupData?.groupInfo;

		try {
			const res = await api.payment.GetLoadCardPayInfoList(groupId);
			const { data, message, errorCode } = res.data;

			if (errorCode === 0) {
				setSelChannel(data?.[0]);
			} else {
				setPopBox({
					isOpen: true,
					content: `[${errorCode}] ${message}`
				});
			}
		} catch (error) {}
	};

	const editField = (e, { col, value }) => {
		const val = value ?? e.target.value;
		setCardData(prev => ({
			...prev,
			[col]: val
		}));
	};

	const clickInfo = ({ col }) => {
		if (col === "cardCode" || col === "cardSerial") {
			const img = (
				<img
					src={`${cloudBannerImgURL}/h5/img/cardinfo.png`}
					alt={col}
				/>
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

	const handleSubmit = async () => {
		const real_amount = _isConvert ? Number(amount) * 1000 : Number(amount);

		const checked =
			checkValue({ col: "cardCode", val: cardData.cardCode }) &&
			checkValue({ col: "cardSerial", val: cardData.cardSerial }) &&
			VaildAmount({ _amount: amount });

		if (checked) {
			if (
				userInfo.phoneVerified &&
				depositPromo.requiredAmount &&
				real_amount < depositPromo.requiredAmount
			) {
				const success = await asyncPromotionConfirmPopBox();
				if (!success) return;
			}

			let { bonusCode } = depositPromo;
			if (depositPromo.specialCode) {
				bonusCode = await checkDepositSpecialCode(
					depositPromo.specialCode
				);
				if (!bonusCode) return;
			}

			const redirectToNext = debounce(async () => {
				setPopBox(prevState => ({
					...prevState,
					isOpen: false
				}));

				const { mode, channelId } = selChannel;

				const payload = {
					channelId,
					code: cardData.cardCode,
					serial: cardData.cardSerial,
					amount: real_amount,
					bonusCode
				};

				const refreshPage = () => window.location.reload();

				if (mode === 3) {
					try {
						const res = await api.cashier.DepositReqLoadCardPay({
							langId: userInfo.langId,
							...payload
						});
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
											className="lightBlue"
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

							const userData = {
								payType,
								amount: real_amount,
								groupId: selChannel?.groupId,
								channelId: selChannel?.channelId
							};
							handleUserPaymentData({ userData });
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
					} catch (error) {
						setPopBox({
							isOpen: true,
							content: i18n.msg_ApiServerError
						});
					}
				} else {
					const mainUrl = `${config.openURL}/${userInfo.langId}/Cashier/DepositReqLoadCardPay`;
					const paramUrl = [
						`ChannelId=${channelId}`,
						`Code=${cardData.cardCode}`,
						`Serial=${cardData.cardSerial}`,
						`Amount=${real_amount}`,
						bonusCode && `BonusCode=${depositPromo.bonusCode}`
					]
						.filter(Boolean)
						.join("&");

					window.open(`${mainUrl}?${paramUrl}`);

					setPopBox(prevState => ({
						...prevState,
						isOpen: false
					}));

					const userData = {
						payType,
						amount: real_amount,
						groupId: selChannel?.groupId,
						channelId: selChannel?.channelId
					};

					handleUserPaymentData({ userData });

					refreshPage();
				}
			}, 1000);

			setPopBox({
				isOpen: true,
				title: i18n.lbl_ImportantNote,
				content: (
					<>
						<p>{i18n.lbl_ConfirmDeposit}</p>
						<img
							src={`${paymentImgURL}/${selChannel.groupName?.toLowerCase()}.png`}
							alt={selChannel.channelName}
						/>
						<div className="tip">
							<span>{i18n.lbl_CardCode} :</span>{" "}
							{cardData.cardCode}
							<br />
							<span>{i18n.lbl_CardSerial} :</span>{" "}
							{cardData.cardSerial}
							<br />
							<span>{i18n.lbl_CardValue} :</span>{" "}
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
						<button className="lightBlue" onClick={redirectToNext}>
							{i18n.lbl_Submit}
						</button>
					</div>
				)
			});
		}
	};

	useEffect(() => {
		if (paymentList.length > 0) {
			selectGroup(paymentList[0], { init: true });
		}
	}, [paymentList.length]);

	return (
		<>
			<GroupList
				mainKey={`deposit-full-${payType}-groupList`}
				dataList={paymentList}
				SelectPayment={data => selectGroup(data, { init: false })}
				selected={selChannel?.groupId}
				title={i18n.lbl_PaymentModes}
				imgKey="groupName"
				idKey="groupId"
				prefixImgUrl={`${paymentImgURL}/`}
				i18n={i18n}
				displayKey="groupName"
				showMinMaxHint={true}
				_isConvert={_isConvert}
				bindFullObj={true}
			/>
			<Inputbox
				tip={cardDataStatus.cardCode.msg}
				value={cardData.cardCode}
				title={i18n.lbl_CardCode}
				pasteCol="cardCode"
				btnStatus={cardDataStatus.cardCode.checked}
				isShowPaste={true}
				placeholder={i18n.msg_PleaseEnterCardCode}
				onBlur={() => {
					checkValue({ col: "cardCode", val: cardData.cardCode });
				}}
				onChange={e => {
					editField(e, { col: "cardCode" });
				}}
				clickInfo={clickInfo.bind(this, { col: "cardCode" })}
				editFieldPaste={editField}
			/>
			<Inputbox
				tip={cardDataStatus.cardSerial.msg}
				value={cardData.cardSerial}
				title={i18n.lbl_CardSerial}
				pasteCol="cardSerial"
				btnStatus={cardDataStatus.cardSerial.checked}
				isShowPaste={true}
				placeholder={i18n.msg_PleaseEnterCardSerial}
				onBlur={() => {
					checkValue({ col: "cardSerial", val: cardData.cardSerial });
				}}
				onChange={e => {
					editField(e, { col: "cardSerial" });
				}}
				clickInfo={clickInfo.bind(this, { col: "cardSerial" })}
				editFieldPaste={editField}
			/>
			<AmountInput
				title={i18n.lbl_DepositAmount}
				channel={selChannel}
				i18n={i18n}
				_isConvert={_isConvert}
				amount={amount}
				SelectAmount={SelectAmount}
				EditAmount={EditAmount}
				payType={payType}
				msg={warning.msg}
				status={warning.status}
				tip={i18n.lbl_AmountTooltip?.replace(
					"{{0}}",
					selChannel?.minAmount
						? number_format(selChannel?.minAmount, _isConvert, 0)
						: 1
				)}
				currencyId={userInfo.currencyId}
				isNote={true}
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
				<button className="orange" onClick={handleSubmit}>
					{i18n.lbl_Submit}
				</button>
			</div>
		</>
	);
};

Payment.defaultProps = {
	promoList: [],
	userPaymentData: {},
	handleUserPaymentData: () => null,
	asyncPromotionConfirmPopBox: () => null
};

Payment.propTypes = {
	payType: PropTypes.string.isRequired,
	promoList: PropTypes.arrayOf(PropTypes.object),
	paymentList: PropTypes.arrayOf(PropTypes.object).isRequired,
	userPaymentData: PropTypes.objectOf(PropTypes.any),
	handleUserPaymentData: PropTypes.func,
	checkDepositSpecialCode: PropTypes.func.isRequired,
	asyncPromotionConfirmPopBox: PropTypes.func
};

export default Payment;
