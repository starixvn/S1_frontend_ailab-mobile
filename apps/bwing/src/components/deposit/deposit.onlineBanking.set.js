import React, { useEffect, useState, useContext, useRef } from "react";
import { i18nContext, userInfoContext, popBoxContext } from "../common/context";
import { Redirect } from "@reach/router";
import {
	api_GetOnlineBankInfoSysList,
	api_GetOnlineBankInfo
} from "../../service/api/payment";
import DropdownIMG from "../common/dropdown.image";
import config from "../../config";
import { number_format, isConvert, checkAmount } from "../common/common";
import InputBox, { defIptStatus } from "../common/inputbox.hint";
import LimitTip from "./limitTip";
import path from "../../path";
import PageVerify from "./deposit.pageVerify";
import Loading from "../common/loading";
import Title, { OneLineTitle } from "./deposit.onlineBanking.title";
import BackBtn from "./backBtn";
import DepositWrapper from "./deposit.wrapper";

const SetPayment = props => {
	const { setPopBox } = useContext(popBoxContext);
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);

	const [redirectPath, setRedirectPath] = useState(null);
	const [bankList, setBankList] = useState([]);
	const [selBank, setSelBank] = useState({
		idx: null,
		bank: null
	});
	const [amount, setAmount] = useState("");
	const [warning, setWarning] = useState({
		status: defIptStatus.default,
		msg: ""
	});
	const _isConvert = isConvert(userInfo.currencyId);

	const [pageVerify, setPageVerify] = useState(true);
	const [loading, setLoading] = useState(true);
	const _selBank = props.location.state?.selBank;

	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	PageVerify(
		userInfo,
		i18n,
		setPopBox,
		setRedirectPath,
		setPageVerify,
		props.location.state !== null
	);

	useEffect(() => {
		if (props.location.state === null) {
			if (isMountedRef.current) {
				setRedirectPath(`/${path.deposit.root}`);
				setLoading(false);
			}
		} else {
			if (userInfo.isLogin && _selBank) {
				setLoading(true);
				api_GetOnlineBankInfoSysList({
					payId: props.location.state.payId
				}).then(
					res => {
						if (res.data.errorCode === 0) {
							let datas = res.data.data.map(b => {
								let { bankLogo, sysId, bankName, ...rest } = b;
								return {
									...rest,
									image: bankLogo,
									id: sysId,
									displayText: bankName
								};
							});

							if (isMountedRef.current) {
								if (datas.length > 0) {
									setBankList(datas);
								} else {
									setRedirectPath(`/${path.deposit.root}`);
								}
							}
						} else {
							if (isMountedRef.current) {
								setPopBox({
									isOpen: true,
									title: i18n.lbl_ImportantNote,
									content: res.data.message
								});
							}
						}

						if (isMountedRef.current) {
							setLoading(false);
						}
					},
					err => {
						if (isMountedRef.current) {
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
								content: i18n.msg_ApiServerError
							});
							setLoading(false);
						}
					}
				);
			}
			setLoading(false);
		}
	}, [
		props.location.state,
		userInfo.isLogin,
		i18n.lbl_ImportantNote,
		setPopBox,
		i18n.msg_ApiServerError
	]);

	const SelectBank = idx => {
		if (pageVerify) {
			api_GetOnlineBankInfo({
				payId: props.location.state.payId,
				sysId: bankList[idx].id
			}).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							setSelBank({
								idx: idx,
								bank: res.data.data
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
		}
	};

	const VaildAmount = _amount => {
		let _mixAmount = _selBank
			? selBank.bank?.minAmount
			: props.location.state.minAmount;
		let _maxAmount = _selBank
			? selBank.bank?.maxAmount
			: props.location.state.maxAmount;

		let result = checkAmount(
			_amount,
			_mixAmount,
			_maxAmount,
			_isConvert,
			i18n
		);
		if (result.status !== 0) {
			setWarning({
				status: defIptStatus.warning,
				msg: result.msg
			});
		} else {
			setWarning({
				status: defIptStatus.verified,
				msg: ""
			});
		}
		return result.status === 0;
	};

	const EditAmount = e => {
		let value = e.target.value;

		if (selBank.bank || _selBank === false) {
			VaildAmount(value);
			setAmount(value);
		} else {
			setWarning({
				status: defIptStatus.warning,
				msg: i18n.lbl_SelectBank
			});
		}
	};

	const ClickSubmit = () => {
		let _sysId = _selBank ? selBank.bank?.sysId : 0;
		let selBankCheck = _selBank ? selBank.idx !== null : true;
		let result = VaildAmount(amount) && selBankCheck;

		if (result) {
			const RedirectToNext = real_amount => {
				window.open(
					`${config.openURL}/${userInfo.langId}/Cashier/DepositReqOnlineBanking` +
						"?sysId=" +
						_sysId +
						"&payId=" +
						props.location.state?.payId +
						"&ChannelId=" +
						props.location.state?.channelId +
						"&Amount=" +
						real_amount
				);
				setPopBox(prevState => ({
					...prevState,
					isOpen: false
				}));
				setRedirectPath(`/${path.deposit.root}`);
			};

			let real_amount = _isConvert ? amount * 1000 : amount;
			setPopBox({
				isOpen: true,
				title: i18n.lbl_ImportantNote,
				content: (
					<>
						<p>{i18n.lbl_ConfirmDeposit}</p>
						{_selBank ? (
							<img
								src={`${config.imgUrl}/common/images/BankLogo/${selBank.bank?.bankLogo}`}
								alt={selBank.bank?.bankName ?? ""}
							/>
						) : null}
						<div>
							<ul>
								<li className="text-lightBlue">
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
							className="cancel"
							onClick={() =>
								setPopBox(prevState => ({
									...prevState,
									isOpen: false
								}))
							}>
							{i18n["lbl_Cancel"]}
						</button>
						<button
							className="submit"
							onClick={RedirectToNext.bind(this, real_amount)}>
							{i18n["lbl_Submit"]}
						</button>
					</div>
				)
			});
		}
	};

	if (loading) {
		return <Loading />;
	} else {
		return redirectPath !== null ? (
			<Redirect to={redirectPath} noThrow />
		) : pageVerify ? (
			<DepositWrapper step={3} i18n={i18n}>
				<div className="depositInBox">
					<Title i18n={i18n} />
					<div className="depositImgArea">
						<div className="bankBox">
							<img
								src={`${config.imgUrl}/common/images/Payment/${props.payName}.png`}
								alt={props.payName}
							/>
							<OneLineTitle i18n={i18n} />
						</div>
					</div>
					<div className="inputBox">
						{_selBank ? (
							<DropdownIMG
								mainKey={"onlineBanking-bankList"}
								onSelectItem={SelectBank}
								options={bankList}
								selectedIdx={selBank?.idx}
								i18n={i18n}
								ImgURL={`${config.imgUrl}/common/images/BankLogo/`}
								className="bankLogo"
							/>
						) : null}
						<LimitTip
							displayTextLimit={i18n.lbl_Limit}
							displayTextUnLimit={i18n.lbl_Unlimited}
							_isConvert={_isConvert}
							minAmount={
								_selBank
									? selBank?.bank?.minAmount
									: props.location.state?.minAmount
							}
							maxAmount={
								_selBank
									? selBank?.bank?.maxAmount
									: props.location.state?.maxAmount
							}
						/>
					</div>
					<InputBox
						title={i18n["lbl_Amount"]}
						value={amount}
						numberConvert={isConvert(userInfo.currencyId)}
						inputType="tel"
						onChange={EditAmount}
						showTips={warning.status}
						tipDisplayText={warning.msg}
						btnStatus={warning.status}
					/>
					<div className="btn-group">
						<button className="submit" onClick={ClickSubmit}>
							{i18n.lbl_Submit}
						</button>
					</div>
				</div>
				<BackBtn i18n={i18n} to={`../`} />
			</DepositWrapper>
		) : null;
	}
};

export default SetPayment;
