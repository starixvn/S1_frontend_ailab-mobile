import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import api from "../../service/api";
import config from "../../config";
import Inputbox from "../common/inputbox.hint";
import Dropdown from "../common/dropdown.image";
import { defIptStatus } from "../common/inputStatus";
import useTip from "../hook/useTip";

const initWarning = {
	RealName: {
		status: defIptStatus.default,
		msg: ""
	},
	BankAccount: {
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
	setLoading
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
					if (res.data.errorCode === 0) {
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
							title: i18n.lbl_ImportantNote,
							content: `[${errorCode}]${message}`
						});
					}
					setLoading(false);
				}
			},
			() => {
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
	}, [setLoading, i18n, setPopBox]);

	const dropdownStateHandler = i => {
		setBankSelectedIdx(i);
	};

	const checkInputbox = ({ col, val }) => {
		let checked = true;
		let message = "";

		if (!val) {
			checked = false;
			message =
				col === "RealName"
					? i18n.msg_EnterRealName
					: i18n.msg_NeedAccountNo;
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
		const val = e.target.value;
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
					SysId: siteBankInfoState[bankSelectedIdx].id
				};
				api.accountStrict.SetCustBankInfo(bankInfoData).then(
					response => {
						if (isMountedRef.current) {
							const { errorCode, message } = response.data;
							if (errorCode === 0) {
								GetCustBankInfo();
								setCurrentPanel("showBankPanel");
							} else {
								setPopBox({
									isOpen: true,
									title: i18n.lbl_ImportantNote,
									content: `[${errorCode}]${message}`
								});
							}
							setLoading(false);
						}
					},
					() => {
						if (isMountedRef.current) {
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
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
							<button className="blue" onClick={closePopbox}>
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
					ImgURL={`${config.imgUrl}/common/images/BankLogo/`}
					selectedIdx={bankSelectedIdx}
					onSelectItem={dropdownStateHandler}
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
			/>

			<div className="btn-group">
				<button className="blue" onClick={toShowBankAccount}>
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
	setLoading: PropTypes.func.isRequired
};

export default AddBankPanel;
