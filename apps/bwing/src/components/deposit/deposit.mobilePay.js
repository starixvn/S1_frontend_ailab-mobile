import React, { useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	loadingContext
} from "../common/context";
import config from "../../config";
import { isConvert, number_format, getWindowOpenUrl } from "../common/common";
import GroupList from "./deposit.groupList";
import AmountInput from "./deposit.amountInput";
import { useHandleAmount } from "./hook/useHandleAmount";
import { api_GetMobilePayInfoList } from "../../service/api/payment";
import PromoList from "./promoList";

const payType = "MobilePay";

const Payment = props => {
	const {
		paymentList,
		creditTimeKey,
		promoList,
		checkDepositSpecialCode
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
			number_format(selChannel?.minAmount, _isConvert, 0)
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
			api_GetMobilePayInfoList(groupId).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							setChannelList(res.data.data);
							SelectChannel(res.data.data?.[0]);
						} else {
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
								content: res.data.message
							});
						}
						setLoading(false);
					}
				},
				() => {
					if (isMountedRef.current) {
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

			const RedirectToNext = real_amount => {
				const mainUrl = `${config.openURL}/${userInfo.langId}/Cashier/DepositReqMobilePay`;
				const param = {
					ChannelId: selChannel.channelId,
					Amount: real_amount,
					BonusCode: bonusCode
				};
				const windowOpenUrl = getWindowOpenUrl({ mainUrl, param });
				window.open(windowOpenUrl);

				setPopBox(prevState => ({
					...prevState,
					isOpen: false
				}));
				window.location.reload();
			};

			const real_amount = _isConvert ? amount * 1000 : amount;
			setPopBox({
				isOpen: true,
				title: i18n.lbl_ImportantNote,
				content: (
					<>
						<p>{i18n.lbl_ConfirmDeposit}</p>
						<img
							src={`${
								config.imgUrl
							}/common/images/MobilePay/${selChannel.groupName?.toLowerCase()}.png`}
							alt={selChannel.groupName}
						/>
						<div>
							<ul>
								<li className="text-lightBlue">
									{i18n.lbl_DepositAmount} :
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

	return (
		<div className="depositModule_mobile open">
			<div className="title text-org">{`${i18n.lbl_CreditTime}: ${i18n[creditTimeKey]}`}</div>

			<GroupList
				title={i18n.lbl_PaymentModes}
				dataList={paymentList}
				SelectPayment={SelectPayment}
				selected={selGroupId}
				mainKey={`deposit-full-${payType}-groupList`}
				imgKey="groupName"
				idKey="groupId"
				prefixImgUrl={`${config.imgUrl}/common/images/MobilePay/`}
				i18n={i18n}
				displayKey="channelName"
				showMinMaxHint={true}
				_isConvert={_isConvert}
			/>
			{channelList?.length > 1 && (
				<GroupList
					title={i18n.lbl_SelectChannel}
					dataList={channelList}
					SelectPayment={SelectChannel}
					selected={selChannel?.channelId}
					mainKey={`deposit-full-${payType}-channelList`}
					imgKey="groupName"
					idKey="channelId"
					bindFullObj={true}
					prefixImgUrl={`${config.imgUrl}/common/images/MobilePay/`}
					i18n={i18n}
					displayKey="channelName"
					showMinMaxHint={true}
					_isConvert={_isConvert}
				/>
			)}
			<AmountInput
				title={i18n.lbl_DepositAmount}
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
				<button className="blue" onClick={ClickSubmit}>
					{i18n.lbl_Submit}
				</button>
			</div>
		</div>
	);
};

Payment.defaultProps = {
	promoList: []
};

Payment.propTypes = {
	paymentList: PropTypes.arrayOf(PropTypes.object).isRequired,
	creditTimeKey: PropTypes.string.isRequired,
	promoList: PropTypes.arrayOf(PropTypes.objectOf),
	checkDepositSpecialCode: PropTypes.func.isRequired
};

export default Payment;
