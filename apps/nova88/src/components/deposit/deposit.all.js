import React, { useContext, useState, useEffect, useRef } from "react";
import {
	i18nContext,
	userInfoContext,
	loadingContext
} from "../common/context";
import MobilePay from "./deposit.all.mobilePay";
import api from "../../service/api";
import RecentDatas from "./deposit.recentDatas";
import { number_format, isConvert } from "../common/common";

const defPayType = {
	onlineBank: "onlineBank",
	localBank: "localBank",
	mobilePay: "mobilePay",
	cryptoPay: "cryptoPay"
};

const defPayment = {
	[defPayType.mobilePay]: {
		displayKey: "lbl_MobileDeposit",
		creditTimeKey: "lbl_5mins"
	},
	[defPayType.localBank]: {
		displayKey: "lbl_WireTransfers",
		creditTimeKey: "lbl_5mins"
	},
	[defPayType.onlineBank]: {
		displayKey: "lbl_OnlineBanking",
		creditTimeKey: "lbl_Instant"
	},
	[defPayType.cryptoPay]: {
		displayKey: "lbl_CryptoPay",
		creditTimeKey: "lbl_Instant"
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
					className={selected === key ? "open" : ""}
					onClick={HandleSelect.bind(this, key)}>
					{i18n[pay.displayKey]}
				</div>
			);
		});

	return <div className="switchTag">{rows}</div>;
};

const Panel = () => {
	const { selected, HandleSelect } = useHandleSelect();
	const { i18n } = useContext(i18nContext);
	const { setLoading } = useContext(loadingContext);
	const { userInfo } = useContext(userInfoContext);

	const [paymentList, setPaymentList] = useState({});
	const [recentDatas, setRecentDatas] = useState([]);
	// const [pageVerify, setPageVerify] = useState(true);

	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	let content = (
		<MobilePay
			creditTimeKey={defPayment[defPayType.onlineBank].creditTimeKey}
			paymentList={paymentList[defPayType.mobilePay] ?? []}
		/>
	);

	if (selected === defPayType.localBank) {
		content = <div />;
	} else if (selected === defPayType.onlineBank) {
		content = <div />;
	} else if (selected === defPayType.cryptoPay) {
		content = <div />;
	}

	useEffect(() => {
		if (userInfo.isLogin) {
			const GetAllPayment = async () => {
				setLoading(true);
				let defaultSelect = "";

				const payments = {
					[defPayType.mobilePay]: [],
					[defPayType.onlineBank]: [],
					[defPayType.localBank]: [],
					[defPayType.cryptoPay]: []
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
					const res = await api.payment.GetMobilePayGroupList();
					payments[defPayType.mobilePay] = getDataListResult(res);

					defaultSelect = setDefaultSelect(
						defaultSelect,
						defPayType.mobilePay,
						payments[defPayType.mobilePay]
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
					const res = await api.payment.GetOnlinePaymentList();
					payments[defPayType.onlineBank] = getDataListResult(res);

					defaultSelect = setDefaultSelect(
						defaultSelect,
						defPayType.onlineBank,
						payments[defPayType.onlineBank]
					);
				} catch (error) {}

				try {
					const res = await api.payment.GetCryptoPayInfoList();
					payments[defPayType.cryptoPay] = getDataListResult(res);

					defaultSelect = setDefaultSelect(
						defaultSelect,
						defPayType.cryptoPay,
						payments[defPayType.cryptoPay]
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
	}, [userInfo.isLogin]);

	const _isConvert = isConvert(userInfo.currencyId);
	const SubmitProof = (
		bankInfo,
		depositRep,
		amount,
		transId,
		picFileName,
		refId
	) => {
		if (pageVerify) {
			const { currencyId, ...restBankInfo } = bankInfo;
			const { accountName, accountNo } = depositRep;
			setbankSlipPopBox(() => ({
				depositTime: `${moment().format(
					"yyyy-MM-DDT"
				)}${moment().format("HH:mm")}`,
				...restBankInfo,
				transId,
				accountNo,
				accountName,
				isOpen: true,
				amount: number_format(amount, _isConvert),
				picFileName,
				refId
			}));
		}
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
					err => {
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
				title: "",
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

	const GetDepositInfoRecent = () => {
		api.payment.GetDepositInfoRecent().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						setRecentDatas(res.data.data);
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
				ReloadFunc={GetDepositInfoRecent}
			/>
		</>
	);
};

export default Panel;
