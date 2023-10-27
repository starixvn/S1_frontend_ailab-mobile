import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import api from "../../service/api";
import { paymentImgURL } from "../../config";
import Inputbox from "../common/inputbox.hint";
import Dropdown from "../common/dropdown.image";
import { defIptStatus } from "../common/inputStatus";
import useTip from "../hook/useTip";
import { defCurrenyId } from "../common/common";

const initWarning = {
	RealName: {
		status: defIptStatus.default,
		msg: ""
	},
	BankAccount: {
		status: defIptStatus.default,
		msg: ""
	},
	IFSCCode: {
		status: defIptStatus.default,
		msg: ""
	}
};

const AddBankPanel = ({
	accountName,
	setCurrentPanel,
	i18n,
	setPopBox,
	GetCustBankInfo,
	setLoading,
	currencyId,
	custBankInfo
}) => {
	const [siteBankInfoState, setSiteBankInfoState] = useState([]);
	const [bankSelectedIdx, setBankSelectedIdx] = useState(0);
	const [userValue, setUserValue] = useState({});
	const [warning, setWarning] = useState(initWarning);
	const { showTips, showTipHandler } = useTip();
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		setLoading(true);
		api.payment.GetBankInfoSysList().then(
			res => {
				if (isMountedRef.current) {
					const { data, errorCode, message } = res.data;
					if (errorCode === 0) {
						const bankInfoArr = data.map(i => {
							return {
								id: i.sysId,
								sysId: i.sysId,
								bankName: i.bankName,
								image: i.bankLogo,
								displayText: i.bankName
							};
						});
						setSiteBankInfoState(() => bankInfoArr);
						setBankSelectedIdx(0);
						setWarning(initWarning);
						setUserValue({});
					} else {
						setPopBox({
							isOpen: true,
							content: `[${errorCode}] ${message}`
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
	}, [setLoading, i18n, setPopBox]);

	const dropdownStateHandler = i => {
		setBankSelectedIdx(i);
	};

	const checkInputbox = ({ col, val }) => {
		let checked = true;
		let message = "";

		const isDuplicateBank = custBankInfo?.find(
			_selectBank =>
				_selectBank.SysId ===
					siteBankInfoState[bankSelectedIdx].sysId &&
				_selectBank.accountNo === val
		);

		if (!val) {
			checked = false;
			if (col === "RealName") {
				message = i18n.msg_EnterRealName;
			} else if (col === "BankAccount") {
				message = i18n.msg_NeedAccountNo;
			} else {
				message = i18n.msg_NeedIFSCCode;
			}
		} else if (col === "IFSCCode" && val.length !== 11) {
			checked = false;
			message = i18n.msg_IFSCCodeLength;
		} else if (col === "BankAccount" && isDuplicateBank) {
			checked = false;
			message = i18n.lbl_Prohibited_Duplicate_Bank_Account;
		}
		setWarning(prev => ({
			...prev,
			[col]: {
				status: checked ? defIptStatus.verified : defIptStatus.warning,
				msg: message
			}
		}));

		return { checked };
	};

	const EditField = (col, e) => {
		let val = e.target.value;

		if (col === "BankAccount") {
			// * 使用者反應有銀行的開頭為 T,eg: T0793686868，因此從原本只限數字改為開放數字及英文
			val = val.replace(/[^a-zA-Z0-9]+/g, "");
		} else if (col === "IFSCCode") {
			val = val.replace(/[\W]/g, "");
		}

		setUserValue(prev => ({
			...prev,
			[col]: val
		}));
	};

	const toShowBankAccount = () => {
		setCurrentPanel("showBankPanel");
	};

	const clickSubmit = () => {
		let checked = true;

		const SetCustBankInfo = (_checked, hidePopBox) => {
			if (hidePopBox) {
				setPopBox({ isOpen: false });
			}

			if (_checked) {
				setLoading(true);
				const bankInfoData = {
					AccountName: accountName ?? userValue.RealName,
					AccountNo: userValue.BankAccount,
					SysId: siteBankInfoState[bankSelectedIdx].id,
					IFSCCode: userValue?.IFSCCode ?? null
				};
				api.accountStrict.SetCustBankInfo(bankInfoData).then(
					response => {
						if (isMountedRef.current) {
							const { errorCode, message } = response.data;
							if (errorCode === 0) {
								GetCustBankInfo();
								setCurrentPanel("showBankPanel");
							} else if (errorCode === -4) {
								setPopBox({
									isOpen: true,
									title: i18n.lbl_ImportantNote,
									content: i18n.lbl_DuplicateAddress
								});
							} else {
								setPopBox({
									isOpen: true,
									content: `[${errorCode}] ${message}`
								});
							}
							setLoading(false);
						}
					},
					() => {
						if (isMountedRef.current) {
							setPopBox({
								isOpen: true,
								content: i18n.msg_ApiServerErrors
							});
							setLoading(false);
						}
					}
				);
			}
		};

		if (!accountName) {
			checked =
				checkInputbox({ col: "RealName", val: userValue.RealName })
					.checked &&
				checkInputbox({
					col: "BankAccount",
					val: userValue.BankAccount
				}).checked;

			if (currencyId === defCurrenyId.INR) {
				checked = checkInputbox({
					col: "IFSCCode",
					val: userValue.IFSCCode
				}).checked;
			}

			const closePopbox = () => {
				setPopBox({ isOpen: false });
			};

			if (checked) {
				setPopBox({
					isOpen: true,
					title: i18n.lbl_ImportantNote,
					content: i18n.msg_ConfirmRealNameAlert,
					hasBtn: true,
					btnBar: (
						<div className="btn-group">
							<button className="white" onClick={closePopbox}>
								{i18n.lbl_Cancel}
							</button>
							<button
								className="orange"
								onClick={SetCustBankInfo.bind(
									this,
									checked,
									true
								)}>
								{i18n.lbl_Submit}
							</button>
						</div>
					)
				});
			}
		} else {
			checked = checkInputbox({
				col: "BankAccount",
				val: userValue.BankAccount
			}).checked;
			if (currencyId === defCurrenyId.INR) {
				checked = checkInputbox({
					col: "IFSCCode",
					val: userValue.IFSCCode
				}).checked;
			}
			SetCustBankInfo(checked, false);
		}
	};

	return (
		<>
			<div className="infoModule">
				<Dropdown
					mainKey="bankInfo-bankList"
					options={siteBankInfoState}
					colName="getBankInfo"
					className="bankLogo"
					ImgURL={`${paymentImgURL}/square/`}
					selectedIdx={bankSelectedIdx}
					onSelectItem={dropdownStateHandler}
					testAttr="bankList"
				/>
			</div>

			{!accountName ? (
				<Inputbox
					icon="icon-member"
					inputType="text"
					value={userValue?.RealName}
					placeholder={i18n.lbl_RealName}
					onBlur={checkInputbox.bind(this, {
						col: "RealName",
						val: userValue.RealName
					})}
					onChange={EditField.bind(this, "RealName")}
					btnStatus={warning.RealName.status}
					warningMsg={warning.RealName.msg}
					showTips={showTips.includes("RealName")}
					infoText={i18n.msg_ConfirmRealNameAlert}
					clickInfo={() => showTipHandler("RealName")}
					testAttr="RealName"
				/>
			) : null}

			<Inputbox
				icon="icon-newspaper"
				inputType="tel"
				value={userValue?.BankAccount}
				placeholder={i18n.lbl_BankNumber}
				onBlur={checkInputbox.bind(this, {
					col: "BankAccount",
					val: userValue.BankAccount
				})}
				onChange={EditField.bind(null, "BankAccount")}
				btnStatus={warning.BankAccount.status}
				warningMsg={warning.BankAccount.msg}
				showTips={showTips.includes("BankAccount")}
				infoText={i18n.msg_NeedAccountNo}
				clickInfo={() => showTipHandler("BankAccount")}
				testAttr="BankAccount"
			/>

			{currencyId === defCurrenyId.INR ? (
				<Inputbox
					icon="icon-newspaper"
					value={userValue?.IFSCCode}
					placeholder={i18n.lbl_IFSCCode}
					onBlur={checkInputbox.bind(this, {
						col: "IFSCCode",
						val: userValue.IFSCCode
					})}
					onChange={EditField.bind(null, "IFSCCode")}
					btnStatus={warning.IFSCCode.status}
					warningMsg={warning.IFSCCode.msg}
					showTips={showTips.includes("IFSCCode")}
					infoText={i18n.msg_NeedIFSCCode}
					clickInfo={() => showTipHandler("IFSCCode")}
					maxLength={11}
				/>
			) : null}

			<div className="btn-group" data-testid="btnGroup">
				<button className="white" onClick={toShowBankAccount}>
					{i18n.lbl_Cancel}
				</button>
				<button className="orange" onClick={clickSubmit}>
					{i18n.lbl_Submit}
				</button>
			</div>
		</>
	);
};

AddBankPanel.defaultProps = {
	accountName: ""
};

AddBankPanel.propTypes = {
	accountName: PropTypes.string,
	setCurrentPanel: PropTypes.func.isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	setPopBox: PropTypes.func.isRequired,
	GetCustBankInfo: PropTypes.func.isRequired,
	setLoading: PropTypes.func.isRequired,
	currencyId: PropTypes.number.isRequired,
	custBankInfo: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default AddBankPanel;
