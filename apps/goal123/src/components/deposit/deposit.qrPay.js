import React, { useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	loadingContext
} from "../common/context";
import config, { paymentImgUrl } from "../../config";
import { isConvert, number_format, getWindowOpenUrl } from "../common/common";
import GroupList from "./deposit.groupList";
import AmountInput from "./deposit.amountInput";
import { useHandleAmount } from "./hook/useHandleAmount";
import {
	api_GetQRPayInfoList,
	api_payment_DepositReqLocalPay
} from "../../service/api/payment";
import PromoList from "./promoList";
import { defPopBoxType } from "../common/popbox";

const payType = "QRPay";

const Payment = props => {
	const {
		paymentList,
		promoList,
		checkDepositSpecialCode,
		GetAllPayment,
		onSubmit
	} = props;

	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setLoading } = useContext(loadingContext);
	const [selGroupId, setSelGroupId] = useState(null);
	const [selChannel, setChannel] = useState({});
	const [channelList, setChannelList] = useState([]);
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
			SelectPayment(paymentList[0].groupId);
		}
		return () => {
			isMountedRef.current = false;
		};
	}, [paymentList.length]);

	const clickInfo = () => {
		const msg = i18n.lbl_AmountTooltip.replace(
			"{{0}}",
			number_format(selChannel?.minAmount, _isConvert)
		);
		setInputStatus({
			checked: null,
			msg: inputStatus.msg === "" ? msg : ""
		});
	};

	const SelectPayment = groupId => {
		if (selGroupId !== groupId) {
			setSelGroupId(() => groupId);
			setLoading(true);
			api_GetQRPayInfoList(groupId).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							setChannelList(res.data.data);
							SelectChannel(res.data.data?.[0]);
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
		}
	};

	const SelectChannel = channel => {
		setChannel(channel);
	};

	const ClickSubmit = async () => {
		const result = VaildAmount({ _amount: amount });
		const real_amount = _isConvert ? amount * 1000 : amount;
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
			onSubmit();
			// 導至外部
			const RedirectToNext = () => {
				const mainUrl = `${config.openURL}/${userInfo.langId}/Cashier/DepositReqQRPay`;
				const param = {
					ChannelId: selChannel.channelId,
					Amount: real_amount,
					BonusCode: depositPromo.bonusCode
				};
				const windowOpenUrl = getWindowOpenUrl({ mainUrl, param });
				window.open(windowOpenUrl);

				setPopBox(prevState => ({
					...prevState,
					isOpen: false
				}));

				window.location.reload();
			};

			// 彈窗控制
			const handlePopBankQR = async () => {
				try {
					const res = await api_payment_DepositReqLocalPay({
						groupId: selChannel.groupId,
						amount: real_amount,
						bonusCode: bonusCode ?? ""
					});
					const { data, errorCode } = res.data;

					const {
						amount: popBoxAmount,
						bankLogo,
						code,
						returnUrl,
						transId,
						generateQr,
						message
					} = data;

					if (errorCode === 0) {
						setPopBox({
							title: i18n.lbl_DepositType6,
							isOpen: true,
							code,
							transId,
							bankLogo,
							qrCodeUrl: returnUrl,
							amount: popBoxAmount,
							generateQr,
							popBoxType: defPopBoxType.BankQR,
							onClose: () => {
								setPopBox({ isOpen: false });
								GetAllPayment();
							}
						});
					} else {
						// error
						setPopBox({
							isOpen: true,
							content: `[${errorCode}] ${message}`
						});
					}
				} catch (e) {
					setPopBox({
						isOpen: true,
						content: i18n.msg_ApiServerError
					});
				}
			};

			setPopBox({
				isOpen: true,
				title: i18n.lbl_ImportantNote,
				content: (
					<>
						<p>{i18n.lbl_ConfirmDeposit}</p>
						<img
							src={`${paymentImgUrl}/${selChannel.groupName?.toLowerCase()}.png`}
							alt={selChannel.groupName}
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
							onClick={
								// channelId === -1 代表是後端建的假渠道，在原畫面 show QRCode
								selChannel.channelId === -1
									? handlePopBankQR
									: RedirectToNext
							}>
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
				title={i18n.lbl_PaymentModes}
				dataList={paymentList}
				SelectPayment={SelectPayment}
				selected={selGroupId}
				mainKey={`deposit-full-${payType}-groupList`}
				imgKey="groupName"
				idKey="groupId"
				prefixImgUrl={`${paymentImgUrl}/`}
				i18n={i18n}
				displayKey="displayGroupName"
				showMinMaxHint={true}
				_isConvert={_isConvert}
			/>

			<GroupList
				title={i18n.lbl_SelectChannel}
				dataList={channelList}
				SelectPayment={SelectChannel}
				selected={selChannel?.channelId}
				mainKey={`deposit-full-${payType}-channelList`}
				imgKey="channelName"
				idKey="channelId"
				bindFullObj={true}
				prefixImgUrl={`${paymentImgUrl}/`}
				i18n={i18n}
				displayKey="displayChannelName"
				showMinMaxHint={true}
				_isConvert={_isConvert}
			/>

			<AmountInput
				title={i18n.lbl_DepositAmount}
				channel={selChannel}
				i18n={i18n}
				_isConvert={_isConvert}
				amount={amount}
				tip={inputStatus.msg}
				btnStatus={inputStatus.checked}
				SelectAmount={SelectAmount}
				EditAmount={EditAmount}
				payType={payType}
				clickInfo={clickInfo}
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

			<div className="btn-group">
				<button className="lightBlue" onClick={ClickSubmit}>
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
	checkDepositSpecialCode: PropTypes.func.isRequired,
	GetAllPayment: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired
};

export default Payment;
