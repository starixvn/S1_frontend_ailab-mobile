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
import config, { paymentImgUrl } from "../../config";
import { debounce, isConvert, number_format } from "../common/common";
import { useHandleAmount } from "./hook/useHandleAmount";
import {
	api_depositReqCryptoPay,
	api_depositReqCryptoLocalPay
} from "../../service/api/cashier";
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

	const clickInfo = ({ col }) => {
		if (col === "amount") {
			const msg = i18n.lbl_AmountTooltip.replace(
				"{{0}}",
				number_format(selChannel?.minAmount, _isConvert, 0)
			);
			setInputStatus({
				checked: null,
				msg: inputStatus.msg === "" ? msg : ""
			});
		}
	};

	const {
		amount,
		inputStatus,
		EditAmount,
		setInputStatus,
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

	const canSubmit =
		amount !== "" &&
		VaildAmount({ _amount: amount, displayWarning: false });

	const SelectPayment = groupId => {
		if (selGroup.groupId !== groupId) {
			setSelGroup({ groupId });
		}
	};

	const SelectChannel = groupInfo => {
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
					const userData = {
						payType: "cryptoPay",
						amount: real_amount,
						channelId: selChannel?.channelId,
						groupId: selGroup.groupId
					};

					handleUserPaymentData({ userData });

					if (selChannel?.mode === 3) {
						setLoading(true);

						// groupId===-1表示是自營的crypto wallet
						if (selChannel.groupId === -1) {
							api_depositReqCryptoLocalPay({
								langId: userInfo.langId,
								channelId: selChannel.channelId,
								real_amount,
								bonusCode: depositPromo.bonusCode
							}).then(
								res => {
									if (res.data.errorCode === 0) {
										setLoading(false);
										const { formData } = res.data.data;
										setPopBox({
											isOpen: true,
											title: i18n.lbl_DepositType8,
											className: "cryptoPay active",
											popBoxType: defPopBoxType.paymentQR,
											amount: real_amount,
											depositAmount:
												formData?.DepositAmount,
											currencyId: userInfo.currencyId,
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
							api_depositReqCryptoPay({
								langId: userInfo.langId,
								channelId: selChannel.channelId,
								real_amount,
								bonusCode: depositPromo.bonusCode
							}).then(
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
											className: "cryptoPay active",
											popBoxType: defPopBoxType.paymentQR,
											amount: real_amount,
											depositAmount:
												formData?.DepositAmount,
											currencyId: userInfo.currencyId,
											cashbackAmount:
												promoContent.cashbackAmount,
											currencyName:
												selChannel?.currencyName,
											receivedAmount:
												promoContent.receivedAmount,
											PromotionRate:
												promoContent.PromotionRate,
											promoContent:
												promoContent.Promotion,
											QRcodeURL: res.data.data.url,
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
						}
					} else {
						setPopBox(prevState => ({
							...prevState,
							isOpen: false
						}));

						const baseUrl = `${config.openURL}/${userInfo.langId}/Cashier/DepositReqCryptoPay`;

						const paramsUrl = [
							`ChannelId=${selChannel.channelId}`,
							`Amount=${real_amount}`,
							depositPromo.bonusCode &&
								`BonusCode=${depositPromo.bonusCode}`
						]
							.filter(Boolean)
							.join("&");

						window.open(`${baseUrl}?${paramsUrl}`);
						window.location.reload();
					}
				}, 1000);

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
								src={`${paymentImgUrl}/${selChannel.channelName?.toLowerCase()}.png`}
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
				if (!curItem.minAmount) curItem.minAmount = pay.minAmount;
				curItem.minAmount = Math.min(curItem.minAmount, pay.minAmount);
			}
			if (pay.maxAmount) {
				if (!curItem.maxAmount) curItem.maxAmount = pay.maxAmount;
				curItem.maxAmount = Math.max(curItem.maxAmount, pay.maxAmount);
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
		SelectPayment(paymentList[lastGroupIdx]?.groupId);
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
			SelectChannel(
				lastChannel && lastChannel.groupId === selGroup.groupId
					? lastChannel
					: paymentList.find(el => el.groupId === selGroup?.groupId)
			);
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
		<>
			<GroupList
				title={i18n.lbl_PaymentModes}
				dataList={groupList}
				SelectPayment={SelectPayment}
				selected={selGroup?.groupId}
				mainKey="deposit-full-cryptoPay-groupList"
				imgKey="payName"
				idKey="groupId"
				prefixImgUrl={`${paymentImgUrl}/`}
				i18n={i18n}
				displayKey="payName"
				_isConvert={_isConvert}
				showMinMaxHint={true}
				bankClassName="checkCrypto"
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
				i18n={i18n}
				prefixImgUrl={`${paymentImgUrl}/`}
				displayKey="channelName"
				_isConvert={_isConvert}
				showMinMaxHint={true}
				bindFullObj={true}
				bankClassName="checkCrypto"
			/>

			<AmountInput
				title={i18n.lbl_DepositAmount}
				channel={selChannel}
				i18n={i18n}
				_isConvert={_isConvert}
				amount={amount}
				btnStatus={inputStatus.checked}
				EditAmount={EditAmount}
				SelectAmount={SelectAmount}
				payType="cryptoPay"
				tip={inputStatus.msg}
				clickInfo={clickInfo.bind(this, { col: "amount" })}
				currencyId={userInfo.currencyId}
				VaildAmount={VaildAmount.bind(this, { _amount: amount })}
			/>

			<PromoList
				amount={Number(amount)}
				i18n={i18n}
				promoList={promoList}
				depositPromo={depositPromo}
				setDepositPromo={setDepositPromo}
				userInfo={userInfo}
			/>

			<div className="btn-group">
				<button
					className={canSubmit ? "orange" : "btn-gray"}
					onClick={ClickSubmit}>
					{i18n.lbl_Submit}
				</button>
			</div>
		</>
	);
};

Main.defaultProps = {
	location: {},
	userPaymentData: {},
	handleUserPaymentData: () => null,
	promoList: []
};

Main.propTypes = {
	location: PropTypes.objectOf(PropTypes.any),
	paymentList: PropTypes.arrayOf(PropTypes.any).isRequired,
	userPaymentData: PropTypes.objectOf(PropTypes.any),
	handleUserPaymentData: PropTypes.func,
	promoList: PropTypes.arrayOf(PropTypes.objectOf),
	checkDepositSpecialCode: PropTypes.func.isRequired
};

export default Main;
