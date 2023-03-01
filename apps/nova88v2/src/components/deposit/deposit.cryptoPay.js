import React, { useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "@reach/router";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	loadingContext
} from "Context";
import GroupList from "./deposit.groupList";
import AmountInput from "./deposit.amountInput";
import PageVerify from "./deposit.pageVerify";
import config, { paymentImgURL } from "../../config";
import { isConvert, number_format } from "../common/common";
import { useHandleAmount } from "../hook/useHandleAmount";
import api from "../../service/api";
import { defPopBoxType } from "../common/popbox";
import PromoList from "./promoList";

export const Panel = props => props.children;

const Main = props => {
	const navigate = useNavigate();
	const { setLoading } = useContext(loadingContext);
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const {
		paymentList,
		userPaymentData,
		handleUserPaymentData,
		promoList,
		asyncPromotionConfirmPopBox,
		checkDepositSpecialCode
	} = props;
	const { setPopBox } = useContext(popBoxContext);
	const _isConvert = isConvert(userInfo.currencyId);
	const [selGroup, setSelGroup] = useState({});
	const [selChannel, setSelChannel] = useState({});
	const [pageVerify, setPageVerify] = useState(true);
	const [groupList, setGroupList] = useState([]);
	const [depositPromo, setDepositPromo] = useState({
		bonusCode: null,
		requiredAmount: null,
		specialCode: ""
	});
	const isMountedRef = useRef(null);
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

	const SelectPayment = ({ groupInfo }) => {
		if (selGroup.groupId !== groupInfo?.groupId) {
			setSelGroup(groupInfo);
		}
	};

	const SelectChannel = ({ groupInfo }) => {
		if (selChannel.channelId !== groupInfo?.channelId) {
			setSelChannel(groupInfo);
		}
	};

	const ClickSubmit = async () => {
		if (pageVerify) {
			const confirmAmount =
				selChannel.amountRule === 3 && selChannel.amountList?.length > 0
					? amount / 1000
					: amount;

			const result = VaildAmount({ _amount: confirmAmount });

			if (result) {
				const resultAmount = _isConvert
					? amount * 1000
					: Number(amount);

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

				const RedirectToNext = real_amount => {
					const userData = {
						payType: "cryptoPay",
						amount: real_amount,
						channelId: selChannel?.channelId,
						groupId: selGroup.groupId
					};

					handleUserPaymentData({ userData });

					if (selChannel?.mode === 3) {
						setLoading(true);
						api.cashier
							.DepositReqCryptoPay({
								langId: userInfo.langId,
								channelId: selChannel.channelId,
								real_amount,
								bonusCode
							})
							.then(
								res => {
									if (res.data.errorCode === 0) {
										setLoading(false);
										const { formData } = res.data.data;
										const promoContent = {
											cashbackAmount: null,
											receivedAmount: null,
											PromotionRate: null,
											Promotion: null
										};
										if (formData?.Promotion === "1") {
											promoContent.cashbackAmount =
												formData?.PromotionAmount;
											promoContent.receivedAmount =
												Number(
													formData?.PromotionAmount
												) +
												Number(formData?.DepositAmount);
											promoContent.PromotionRate = `${Number(
												res.data.data.formData
													?.PromotionRate
											).toFixed(2)}%`;

											promoContent.Promotion =
												formData?.Promotion;
										}
										setPopBox({
											isOpen: true,
											title: i18n.lbl_DepositType4,
											className: "dragonPayPop",
											popBoxType: defPopBoxType.PaymentQR,
											amount: real_amount,
											depositAmount:
												formData?.DepositAmount,
											currencyId: userInfo.currencyId,
											cashbackAmount:
												promoContent.cashbackAmount,
											receivedAmount:
												promoContent.receivedAmount,
											PromotionRate:
												promoContent.PromotionRate,
											promoContent:
												promoContent.Promotion,
											QRcodeURL: res.data.data.url,
											currencyName:
												selChannel?.currencyName,
											RequestAmount: Number(
												formData?.RequestAmount
											).toString(),
											Rate: Number(
												formData?.Rate
											).toString(),
											Token: formData?.Token,
											handlePopBox: () => {
												setPopBox(prevState => ({
													...prevState,
													isOpen: false
												}));
												window.location.reload();
											}
										});
									} else {
										setPopBox({
											isOpen: true,
											content: `[${res.data.errorCode}] ${res.data.message}`
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
						setPopBox(prevState => ({
							...prevState,
							isOpen: false
						}));

						const baseUrl = `${config.openURL}/${userInfo.langId}/Cashier/DepositReqCryptoPay`;

						const paramsUrl = [
							`ChannelId=${selChannel.channelId}`,
							`Amount=${real_amount}`,
							bonusCode && `BonusCode=${bonusCode}`
						]
							.filter(Boolean)
							.join("&");

						window.open(`${baseUrl}?${paramsUrl}`);
						window.location.reload();
					}
				};

				const real_amount = _isConvert
					? confirmAmount * 1000
					: confirmAmount;
				setPopBox({
					isOpen: true,
					title: i18n.lbl_ImportantNote,
					content: (
						<>
							<p>{i18n.lbl_ConfirmDeposit}</p>

							<img
								className="bankimg"
								src={`${paymentImgURL}/${selChannel.channelName?.toLowerCase()}.png`}
								alt={selChannel.channelName}
							/>
							<div>
								<ul>
									<li className="text-org">
										{i18n.lbl_DepositAmount} :
									</li>
									<li>
										{number_format(real_amount, _isConvert)}
									</li>
								</ul>
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
									real_amount
								)}>
								{i18n.lbl_Submit}
							</button>
						</div>
					)
				});
			}
		}
	};

	const removeDuplicate = () => {
		const map = {};
		const arr = [];
		for (let i = 0; i < paymentList?.length; i++) {
			const pay = { ...paymentList[i] };
			if (!map[pay.groupId]) map[pay.groupId] = pay;

			const curItem = map[pay.groupId];

			if (pay.minAmount) {
				if (!curItem.groupMin) curItem.groupMin = pay.minAmount;
				curItem.groupMin = Math.min(curItem.groupMin, pay.minAmount);
			}
			if (pay.maxAmount) {
				if (!curItem.groupMax) curItem.groupMax = pay.maxAmount;
				curItem.groupMax = Math.max(curItem.groupMax, pay.maxAmount);
			}
		}
		// eslint-disable-next-line guard-for-in
		for (const key in map) {
			arr.push(map[key]);
		}
		return arr;
	};

	const usePrevious = value => {
		const ref = useRef();
		useEffect(() => {
			ref.current = value;
		});
		return ref.current;
	};
	const prevGroup = usePrevious(selGroup);

	useEffect(() => {
		setGroupList(removeDuplicate());
		let lastGroupIdx = paymentList.findIndex(
			obj => obj.groupId === userPaymentData?.groupId
		);
		lastGroupIdx = lastGroupIdx === -1 ? 0 : lastGroupIdx;
		SelectPayment({ groupInfo: paymentList[lastGroupIdx] });
	}, []);

	useEffect(() => {
		isMountedRef.current = true;
		if (
			Object.keys(selChannel)?.length === 0 ||
			prevGroup?.groupId !== selGroup?.groupId
		) {
			const lastChannel = paymentList.find(
				obj => obj.channelId === userPaymentData?.channelId
			);
			SelectChannel({
				groupInfo:
					lastChannel && lastChannel.groupId === selGroup.groupId
						? lastChannel
						: paymentList.find(
								el => el.groupId === selGroup?.groupId
						  )
			});
		}
		return () => {
			isMountedRef.current = false;
		};
	}, [selGroup]);

	PageVerify(
		userInfo,
		i18n,
		setPopBox,
		navigate,
		setPageVerify,
		props.location.state?.paymentList?.length >= 0
	);

	return (
		<div className="depositModule active">
			<div className="title text-org icon icon-USDT">
				{`${i18n.lbl_CreditTime}: ${i18n[props.creditTimeKey]}`}
			</div>
			<GroupList
				title={i18n.lbl_PaymentModes}
				dataList={groupList}
				SelectPayment={SelectPayment}
				selected={selGroup?.groupId}
				mainKey="deposit-full-cryptoPay-groupList"
				imgKey="payName"
				idKey="groupId"
				prefixImgUrl={`${paymentImgURL}/`}
				displayKey="payName"
				_isConvert={_isConvert}
				isCrypto={true}
				i18n={i18n}
			/>

			<GroupList
				title={i18n.lbl_SelectChannel}
				dataList={paymentList.filter(
					payment => payment.groupId === selGroup.groupId
				)}
				SelectPayment={SelectChannel}
				selected={selChannel?.channelId}
				mainKey="deposit-full-cryptoPay-channelList"
				imgKey="channelName"
				idKey="channelId"
				isCrypto={true}
				prefixImgUrl={`${paymentImgURL}/`}
				displayKey="channelName"
				_isConvert={_isConvert}
				i18n={i18n}
			/>

			<AmountInput
				title={i18n.lbl_DepositAmount}
				channel={selChannel}
				i18n={i18n}
				_isConvert={_isConvert}
				amount={amount}
				msg={warning.msg}
				status={warning.status}
				EditAmount={EditAmount}
				SelectAmount={SelectAmount}
				payType="cryptoPay"
				tip={i18n.lbl_AmountTooltip?.replace(
					"{{0}}",
					selChannel?.minAmount
						? number_format(selChannel?.minAmount, _isConvert, 0)
						: 1
				)}
				currencyId={userInfo.currencyId}
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
				<button className="orange" onClick={ClickSubmit}>
					{i18n.lbl_Submit}
				</button>
			</div>
		</div>
	);
};

Main.defaultProps = {
	location: {},
	userPaymentData: {},
	handleUserPaymentData: () => null,
	promoList: [],
	creditTimeKey: null
};

Main.propTypes = {
	location: PropTypes.objectOf(PropTypes.any),
	paymentList: PropTypes.arrayOf(PropTypes.any).isRequired,
	userPaymentData: PropTypes.objectOf(PropTypes.any),
	handleUserPaymentData: PropTypes.func,
	promoList: PropTypes.arrayOf(PropTypes.objectOf),
	asyncPromotionConfirmPopBox: PropTypes.func.isRequired,
	checkDepositSpecialCode: PropTypes.func.isRequired,
	creditTimeKey: PropTypes.string
};

export default Main;
