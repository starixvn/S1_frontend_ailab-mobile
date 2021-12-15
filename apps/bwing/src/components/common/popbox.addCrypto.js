import React, { useContext, useState, useEffect, useRef } from "react";
import { i18nContext, userInfoContext, popBoxContext } from "Context";
import WAValidator from "multicoin-address-validator";
import DropDown from "./dropdown";
import Inputbox from "./inputbox.info";
import OTPInputbox from "./inputbox";
import { api_payment_GetSupportNetwork } from "../../service/api/payment";
import {
	api_SendOTPSMS,
	api_VerifyOTP,
	api_GetOTPVerifyInfo,
	api_SetCustUSDTInfoBatch
} from "../../service/api/accountStrict";
import { Counter } from "./popbox.otp";

const colType = {
	nickName: "nickName",
	usdtAddress: "usdtAddress",
	OTP: "OTP",
	currencyId: "currencyId"
};

const defStatus = {
	nickName: {
		checked: null,
		msg: ""
	},
	usdtAddress: {
		checked: null,
		msg: ""
	},
	network: {
		checked: null,
		msg: ""
	},
	OTP: {
		checked: null,
		msg: ""
	},
	currencyId: {
		checked: null,
		msg: ""
	}
};

const cryptoCurrency = [{ id: 96, displayKey: "Currency_96" }];

const AddCryptoWallet = ({ GetCustBankInfo }) => {
	const { setPopBox } = useContext(popBoxContext);
	const [startUnixTime, setStartUnixTime] = useState(null);
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const [timer, setTimer] = useState(false);
	const [selectedCurrency, setSelCurrency] = useState(0);
	const [selectedNetWork, setSelNetWork] = useState(0);
	const [status, setStatus] = useState(defStatus);
	const [network_opt, set_network_opt] = useState([]);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const [walletDatas, setWalletDatas] = useState({
		nickName: "",
		usdtAddress: "",
		network: "",
		currencyId: 96,
		OTP: ""
	});

	useEffect(() => {
		onSelNetWork(0, "displayText");
	}, [network_opt]);

	useEffect(() => {
		api_payment_GetSupportNetwork()
			.then(res => {
				if (res.data.errorCode === 0 && res.data?.data) {
					const options = res.data.data.map(el => ({
						id: el.network,
						displayText: el.network
					}));
					set_network_opt(options);
				}
			})
			.catch(() => {
				setPopBox({
					isOpen: true,
					title: i18n.lbl_ImportantNote,
					content: i18n.msg_ApiServerError
				});
			});
		api_GetOTPVerifyInfo().then(
			response => {
				if (isMountedRef.current) {
					if (response.data?.data?.startUnixTime) {
						setStartUnixTime(response.data.data.startUnixTime);
						setTimer(true);
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
	}, []);

	const closePopbox = () => {
		setPopBox({ isOpen: false });
	};

	const editField = (_colType, e) => {
		const val = e.target.value;
		setWalletDatas(prev => ({
			...prev,
			[_colType]: val
		}));
	};

	const checkCol = (_colType, _val) => {
		let _status = null;
		let message = "";

		if (_colType === colType.usdtAddress) {
			const isValidAddress =
				WAValidator.validate(_val, "usdt") ||
				WAValidator.validate(_val, "trx");
			if (isValidAddress) {
				_status = true;
			} else {
				message = i18n.lbl_NotERC20WalletAddr;
				_status = false;
			}
		}
		setStatus(prev => ({
			...prev,
			[_colType]: {
				checked: _status,
				msg: message
			}
		}));
		return { _status, message };
	};
	const clickResend = () => {
		api_SendOTPSMS().then(
			response => {
				if (isMountedRef.current) {
					if (response.data.errorCode === 0 && response.data.data) {
						setStartUnixTime(response.data.data?.startUnixTime);
						setTimer(true);
					} else if (response.data.errorCode === 5002) {
						setPopBox({
							isOpen: true,
							content: i18n.msg_OTP_Invalid,
							hasBtn: true,
							btnBar: (
								<div className="btn-group">
									<button
										className="white"
										onClick={closePopbox}>
										{i18n.lbl_Confirm}
									</button>
								</div>
							)
						});
					} else {
						setPopBox({
							isOpen: true,
							content:
								response.data.message ||
								i18n.msg_ApiServerError,
							hasBtn: true,
							btnBar: (
								<div className="btn-group">
									<button
										className="white"
										onClick={closePopbox}>
										{i18n.lbl_Confirm}
									</button>
								</div>
							)
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

	const timeStop = () => {
		setTimer(false);
	};

	const clickSubmit = e => {
		e.preventDefault();

		const payload = {
			AccountName: userInfo.accountName,
			USDTInfo: [walletDatas]
		};
		if (status.usdtAddress.checked) {
			api_VerifyOTP({
				inputOTPcode: walletDatas.OTP
			})
				.then(otp_res => {
					if (otp_res.data.errorCode === 0 && isMountedRef.current) {
						api_SetCustUSDTInfoBatch(payload).then(
							res => {
								if (isMountedRef.current) {
									if (res.data.errorCode === 0) {
										setPopBox({
											isOpen: true,
											title: i18n.lbl_ImportantNote,
											content: i18n.msg_Updatesuccessful
										});
										GetCustBankInfo();
									} else {
										setPopBox({
											isOpen: true,
											content: `[${res.data.errorCode}] ${res.data.message}`,
											hasBtn: true,
											btnBar: (
												<div className="btn-group">
													<button
														className="white"
														onClick={closePopbox}>
														{i18n.lbl_Confirm}
													</button>
												</div>
											)
										});
									}
								}
							},
							() => {
								if (!isMountedRef.current) return;
								setPopBox({
									isOpen: true,
									title: i18n.lbl_ImportantNote,
									content: i18n.msg_ApiServerError
								});
							}
						);
					} else if (otp_res.data.errorCode !== 0) {
						setPopBox({
							isOpen: true,
							content: i18n.msg_OTP_Invalid,
							hasBtn: true,
							btnBar: (
								<div className="btn-group">
									<button
										className="white"
										onClick={closePopbox}>
										{i18n.lbl_Confirm}
									</button>
								</div>
							)
						});
					}
				})
				.catch(() => {
					setPopBox({
						isOpen: true,
						title: i18n.lbl_ImportantNote,
						content: i18n.msg_ApiServerError
					});
				});
		}
	};

	const onSelNetWork = (i, displayText) => {
		setSelNetWork(i);
		setWalletDatas(prev => ({
			...prev,
			network: network_opt[i]?.[displayText]
		}));
	};

	const onSelCurrency = (i, id) => {
		setSelCurrency(i);
		setWalletDatas(prev => ({
			...prev,
			currencyId: cryptoCurrency[i]?.[id]
		}));
	};
	return (
		<div className="popTxt">
			<div className="txt-lightgray">
				{i18n.lbl_UpdateCryptoWalletAddr}
			</div>
			<div className="input-Area">
				<DropDown
					mainKey="crypto-curr"
					colName="id"
					selectedIdx={selectedCurrency}
					options={cryptoCurrency}
					onSelectItem={onSelCurrency}
					i18n={i18n}
					requireIcon={true}
				/>
			</div>
			<div className="input-Area">
				<DropDown
					mainKey="crypto-network"
					colName="displayText"
					selectedIdx={selectedNetWork}
					options={network_opt}
					onSelectItem={onSelNetWork}
					i18n={i18n}
					requireIcon={true}
				/>
			</div>

			<Inputbox
				placeholder={i18n.lbl_CryptoWalletNickName}
				value={walletDatas.nickName}
				onChange={e => editField(colType.nickName, e)}
				hideInfoBtn={true}
			/>

			<Inputbox
				showDot={true}
				_class="input-Area"
				placeholder={i18n.lbl_CryptoWalletAddress}
				value={walletDatas.usdtAddress}
				onChange={e => editField(colType.usdtAddress, e)}
				onBlur={e => checkCol(colType.usdtAddress, e.target.value)}
				btnStatus={status.usdtAddress.checked}
				tip={status.usdtAddress.msg}
				important={true}
				hideInfoBtn={true}
				inputBoxNewClass="start"
			/>

			<div className="crypotOtp">
				<OTPInputbox
					className="input-Area"
					placeholder="OTP"
					value={walletDatas.OTP}
					onChange={e => editField(colType.OTP, e)}
				/>
				<button className="orange">
					{timer ? (
						<span>
							<Counter
								startUnixTime={startUnixTime}
								timeStop={timeStop}
							/>
						</span>
					) : (
						<span onClick={clickResend}>{i18n.lbl_Retransmit}</span>
					)}
				</button>
			</div>

			<div className="btn-group">
				<button className="btn-cancel" onClick={closePopbox}>
					{i18n.lbl_Cancel}
				</button>
				<button
					className={`${
						status.usdtAddress.checked ? "btn-check" : "btn-cancel"
					}`}
					onClick={e => clickSubmit(e)}>
					{i18n.lbl_Submit}
				</button>
			</div>
		</div>
	);
};

export default AddCryptoWallet;
