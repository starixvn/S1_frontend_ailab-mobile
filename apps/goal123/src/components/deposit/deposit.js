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
import {
	api_GetDepositInfoRecent,
	api_GetMobilePayGroupList,
	api_GetBankInfoOffList,
	api_GetOnlinePaymentList,
	api_SetDepositCancel
} from "../../service/api/payment";

import RecentDatas from "./deposit.recentDatas";
import { number_format, isConvert } from "../common/common";

const defPayType = {
	onlineBank: "onlineBank",
	localBank: "localBank",
	mobilePay: "mobilePay"
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

	PageVerify(userInfo, i18n, setPopBox, navigate, setPageVerify, false);

	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
			setLoading(false);
		};
	});

	let content = (
		<MobilePay
			payType={defPayType.mobilePay}
			creditTimeKey={defPayment[defPayType.mobilePay].creditTimeKey}
			paymentList={paymentList[defPayType.mobilePay] ?? []}
		/>
	);

	if (selected === defPayType.localBank) {
		content = (
			<LocalBank
				payType={selected}
				creditTimeKey={defPayment[defPayType.localBank].creditTimeKey}
				paymentList={paymentList[defPayType.localBank] ?? []}
			/>
		);
	} else if (selected === defPayType.onlineBank) {
		content = (
			<OnlineBanking
				payType={selected}
				creditTimeKey={defPayment[defPayType.onlineBank].creditTimeKey}
				paymentList={paymentList[defPayType.onlineBank] ?? []}
			/>
		);
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
					const res = await api_GetMobilePayGroupList();
					payments[defPayType.mobilePay] = getDataListResult(res);

					defaultSelect = setDefaultSelect(
						defaultSelect,
						defPayType.mobilePay,
						payments[defPayType.mobilePay]
					);
				} catch (error) {}

				try {
					const res = await api_GetBankInfoOffList();
					payments[defPayType.localBank] = getDataListResult(res);

					defaultSelect = setDefaultSelect(
						defaultSelect,
						defPayType.localBank,
						payments[defPayType.localBank]
					);
				} catch (error) {}

				try {
					const res = await api_GetOnlinePaymentList();
					payments[defPayType.onlineBank] = getDataListResult(res);

					defaultSelect = setDefaultSelect(
						defaultSelect,
						defPayType.onlineBank,
						payments[defPayType.onlineBank]
					);
				} catch (error) {}

				if (isMountedRef.current) {
					setLoading(false);
					setPaymentList(payments);
					HandleSelect(defaultSelect);
				}
			};

			GetAllPayment();

			api_GetDepositInfoRecent().then(res => {
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
		// if (pageVerify) {
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
			amount: number_format(amount, false, 0),
			picFileName,
			refId,
			disableSubmit: false
		}));
		// }
	};

	const ClickCancel = transId => {
		if (pageVerify) {
			const ClickSubmit = () => {
				setPopBox({ isOpen: false });
				api_SetDepositCancel(transId).then(
					res => {
						if (isMountedRef.current) {
							if (res.data.errorCode === 0) {
								api_GetDepositInfoRecent().then(resRecent => {
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
						<button
							className="darkGray"
							onClick={ClickPopBoxCancel}>
							{i18n.lbl_Cancel}
						</button>
						<button className="lightBlue" onClick={ClickSubmit}>
							{i18n.lbl_Submit}
						</button>
					</div>
				)
			});
		}
	};

	const GetDepositInfoRecent = () => {
		api_GetDepositInfoRecent().then(
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
				GetDepositInfoRecent={GetDepositInfoRecent}
			/>
		</>
	);
};

export default Panel;
