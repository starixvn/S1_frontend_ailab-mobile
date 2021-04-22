import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "@reach/router";
import moment from "moment";
import {
	i18nContext,
	userInfoContext,
	loadingContext,
	bankSlipPopBoxContext,
	popBoxContext
} from "../common/context";
import PageVerify from "./deposit.pageVerify";
import MobilePay from "./deposit.mobilePay";
import OnlineBanking from "./deposit.onlineBanking";
import LocalBank from "./deposit.localBank";
import api from "../../service/api";
import RecentDatas from "./deposit.recentDatas";
import { number_format, isConvert } from "../common/common";
import ImportantNote from "./importantNote";
import useGetUserPaymentData from "./userPaymentData";

const defPayType = {
	onlineBank: "onlineBank",
	localBank: "localBank",
	mobilePay: "mobilePay"
};

const defPayment = {
	[defPayType.onlineBank]: {
		displayKey: "lbl_OnlineBanking",
		creditTimeKey: "lbl_Instant"
	},
	[defPayType.localBank]: {
		displayKey: "lbl_WireTransfers",
		creditTimeKey: "lbl_5mins"
	},
	[defPayType.mobilePay]: {
		displayKey: "lbl_MobileDeposit",
		creditTimeKey: "lbl_5mins"
	}
};

const useHandleSelect = defaultSelect => {
	const [selected, setSelected] = useState(defaultSelect ?? "");

	const HandleSelect = value => {
		setSelected(value);
	};

	return { selected, HandleSelect };
};

const Tab = ({ i18n, selected, HandleSelect, paymentList }) => {
	const rows = Object.keys(defPayment)
		.filter(key => paymentList[key]?.length > 0)
		.map(key => {
			const pay = defPayment[key];
			return (
				<div
					key={`deposit-full-${pay.displayKey}`}
					className={selected === key ? "active" : ""}
					onClick={HandleSelect.bind(this, key)}>
					{i18n[pay.displayKey]}
				</div>
			);
		});

	return <div className="switchTag">{rows}</div>;
};

const Panel = () => {
	const navigate = useNavigate();
	const { selected, HandleSelect } = useHandleSelect();
	const { i18n } = useContext(i18nContext);
	const { setLoading } = useContext(loadingContext);
	const { userInfo } = useContext(userInfoContext);
	const { setbankSlipPopBox } = useContext(bankSlipPopBoxContext);
	const { setPopBox } = useContext(popBoxContext);
	const [paymentList, setPaymentList] = useState({});
	const [recentDatas, setRecentDatas] = useState([]);
	const [pageVerify, setPageVerify] = useState(true);
	const { userPaymentData, handleUserPaymentData } = useGetUserPaymentData({
		userInfo
	});

	PageVerify(userInfo, i18n, setPopBox, navigate, setPageVerify, false);

	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
			setLoading(false);
		};
	});

	const _userPaymentData =
		userPaymentData?.payType === selected ? userPaymentData : {};

	let content = (
		<OnlineBanking
			payType={selected}
			creditTimeKey={defPayment[defPayType.onlineBank].creditTimeKey}
			paymentList={paymentList[defPayType.onlineBank] ?? []}
			userPaymentData={_userPaymentData}
			handleUserPaymentData={handleUserPaymentData}
		/>
	);

	if (selected === defPayType.localBank) {
		content = (
			<LocalBank
				payType={selected}
				creditTimeKey={defPayment[defPayType.localBank].creditTimeKey}
				paymentList={paymentList[defPayType.localBank] ?? []}
				userPaymentData={_userPaymentData}
				handleUserPaymentData={handleUserPaymentData}
			/>
		);
	} else if (selected === defPayType.mobilePay) {
		content = (
			<MobilePay
				payType={defPayType.mobilePay}
				creditTimeKey={defPayment[defPayType.mobilePay].creditTimeKey}
				paymentList={paymentList[defPayType.mobilePay] ?? []}
				userPaymentData={_userPaymentData}
				handleUserPaymentData={handleUserPaymentData}
			/>
		);
	}

	useEffect(() => {
		if (userInfo.isLogin) {
			let defaultSelect = userPaymentData?.payType ?? "";

			const GetAllPayment = async () => {
				setLoading(true);

				const payments = {
					[defPayType.onlineBank]: [],
					[defPayType.localBank]: [],
					[defPayType.mobilePay]: []
				};

				const setDefaultSelect = (currentValue, payType, dataList) =>
					currentValue === "" && dataList.length > 0
						? payType
						: currentValue;

				const getDataListResult = res =>
					res.data.errorCode === 0 && res.data.data?.length > 0
						? res.data.data
						: [];

				try {
					const res = await api.payment.GetOnlinePaymentList();
					payments[defPayType.onlineBank] = getDataListResult(res);

					defaultSelect = setDefaultSelect(
						defaultSelect,
						defPayType.onlineBank,
						payments[defPayType.onlineBank]
					);
				} catch (error) {}

				try {
					const res = await api.payment.GetBankInfoOffList();
					payments[defPayType.localBank] = getDataListResult(res);

					defaultSelect = setDefaultSelect(
						defaultSelect,
						defPayType.localBank,
						payments[defPayType.localBank]
					);
				} catch (error) {}

				try {
					const res = await api.payment.GetMobilePayGroupList();
					payments[defPayType.mobilePay] = getDataListResult(res);

					defaultSelect = setDefaultSelect(
						defaultSelect,
						defPayType.mobilePay,
						payments[defPayType.mobilePay]
					);
				} catch (error) {}

				if (isMountedRef.current) {
					setLoading(false);
					setPaymentList(payments);
					HandleSelect(defaultSelect);
				}
			};

			GetAllPayment();

			api.payment.GetDepositInfoRecent().then(res => {
				if (res.data.errorCode === 0 && isMountedRef.current) {
					setRecentDatas(res.data.data);
				}
			});
		}
	}, [userInfo.isLogin, userPaymentData]);

	const _isConvert = isConvert(userInfo.currencyId);
	const SubmitProof = (
		bankInfo,
		depositRep,
		amount,
		transId,
		picFileName,
		refId
	) => {
		const { currencyId, ...restBankInfo } = bankInfo;
		const { accountName, accountNo } = depositRep;
		setbankSlipPopBox(() => ({
			depositTime: `${moment().format("yyyy-MM-DDT")}${moment().format(
				"HH:mm"
			)}`,
			...restBankInfo,
			transId,
			accountNo,
			accountName,
			isOpen: true,
			amount: number_format(amount, _isConvert),
			real_amount: amount,
			picFileName,
			refId
		}));
	};

	const ClickCancel = transId => {
		if (pageVerify) {
			const ClickSubmit = () => {
				setPopBox({ isOpen: false });
				api.payment.SetDepositCancel(transId).then(
					res => {
						if (isMountedRef.current) {
							if (res.data.errorCode === 0) {
								api.payment
									.GetDepositInfoRecent()
									.then(resRecent => {
										if (resRecent.data.errorCode === 0) {
											setRecentDatas(resRecent.data.data);
										}
									});
							} else {
								setPopBox({
									isOpen: true,
									title: i18n.lbl_ImportantNote,
									content: res.data.message
								});
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

			const ClickPopBoxCancel = () => {
				setPopBox({ isOpen: false });
			};

			setPopBox({
				isOpen: true,
				title: i18n.lbl_ImportantNote,
				content: i18n.lbl_CancelConfirm,
				hasBtn: true,
				btnBar: (
					<div className="btn-group">
						<button className="blue" onClick={ClickPopBoxCancel}>
							{i18n.lbl_Cancel}
						</button>
						<button className="orange" onClick={ClickSubmit}>
							{i18n.lbl_Submit}
						</button>
					</div>
				)
			});
		}
	};

	return (
		<>
			<Tab
				i18n={i18n}
				selected={selected}
				HandleSelect={HandleSelect}
				paymentList={paymentList}
			/>
			{content}
			<RecentDatas
				Datas={recentDatas}
				SubmitProof={SubmitProof}
				ClickCancel={ClickCancel}
			/>
			<ImportantNote i18n={i18n} langId={userInfo.langId} />
		</>
	);
};

export default Panel;
