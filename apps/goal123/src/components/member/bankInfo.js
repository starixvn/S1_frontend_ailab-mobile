import React, { useState, useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	loadingContext,
	withdrawalBlockSettingContext
} from "../common/context";
import { api_GetBankInfoSysList } from "../../service/api/payment";
import {
	api_SetCustBankInfo,
	api_DelCustBankInfo
} from "../../service/api/accountStrict";
import { api_GetCustBankInfo } from "../../service/api/account";
import Inputbox from "../common/inputbox.info";
import Dropdown from "../common/dropdown.image";
import { paymentImgUrl } from "../../config";
import { WITHDRAWAL_BLOCK_SETTING_TYPE } from "../../datas/withdrawalSetting";

const panel = { bankList: "bankList", addBank: "addBank" };
const initStatus = {
	RealName: { checked: null, msg: "" },
	BankAccount: { checked: null, msg: "" }
};

const BankInfo = () => {
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { i18n } = useContext(i18nContext);
	const { setLoading } = useContext(loadingContext);
	const { withdrawalSettingTypeList } = useContext(
		withdrawalBlockSettingContext
	);
	const [siteBankList, setSiteBankList] = useState([]);
	const [custBankInfo, setCustBankInfo] = useState([]);
	const [currentPanel, setCurrentPanel] = useState(panel.bankList);
	const [bankSelectedIdx, setBankSelectedIdx] = useState(0);
	const [inputStatus, setInputStatus] = useState(initStatus);

	const initValue = {
		RealName: userInfo?.accountName ?? "",
		BankAccount: ""
	};
	const [userValue, setUserValue] = useState(initValue);
	const isMountedRef = useRef(null);

	const displayBankCard =
		withdrawalSettingTypeList?.find(
			item => item.type === WITHDRAWAL_BLOCK_SETTING_TYPE.BankCard
		)?.status ?? true;

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (userInfo.isLogin) {
			GetCustBankInfo();
		}
	}, [userInfo.isLogin]);

	const toAddBankAccount = () => {
		setLoading(true);
		api_GetBankInfoSysList().then(
			res => {
				if (isMountedRef.current) {
					const { errorCode, data, message } = res.data;
					if (errorCode === 0) {
						const bankInfoArr = data.map(i => {
							return {
								id: i.sysId,
								sysId: i.sysId,
								bankName: i.bankName,
								image: i.bankLogo?.toLowerCase(),
								displayText: i.bankName
							};
						});
						setSiteBankList(() => bankInfoArr);
						setCurrentPanel(currentPanel.bankList);
						setBankSelectedIdx(0);
						setInputStatus(initStatus);
						setUserValue(initValue);
					} else {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
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
	};

	const toShowBankAccount = () => {
		setLoading(false);
		setCurrentPanel(panel.bankList);
		setPopBox({ isOpen: false });
	};

	const dropdownStateHandler = i => {
		setBankSelectedIdx(i);
	};

	const checkValue = ({ col }, e) => {
		const val = e.target.value;
		let result = { checked: true, msg: "" };

		if (col === "RealName") {
			result = realNameCheck({ val });
		} else if (col === "BankAccount") {
			result = bankAccountCheck({ val });
		}

		setInputStatus(prev => ({
			...prev,
			[col]: result
		}));
	};

	const EditField = ({ col }, e) => {
		let setValue = true;
		const val = e.target.value;
		if (col === "BankAccount") {
			const regex = /^[0-9]*$/;
			setValue = regex.test(val);
		}

		if (setValue) {
			setUserValue(prev => ({
				...prev,
				[col]: val
			}));
		}
	};

	const GetCustBankInfo = () => {
		setLoading(true);

		api_GetCustBankInfo().then(
			res => {
				if (isMountedRef.current) {
					const { data, errorCode, message } = res.data;
					if (errorCode === 0) {
						if (data !== null) {
							const bankInfoDetail = data.bankInfoDetail ?? [];
							const getBankInfoArr = bankInfoDetail.map(i => {
								return {
									bankName: i.bankName,
									image: i.bankLogo,
									accountNo: i.accountNo,
									SysId: i.sysId
								};
							});
							setCustBankInfo(() => getBankInfoArr);
							setLoading(false);
						}
					} else {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
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
						title: i18n.lbl_ImportantNote,
						content: i18n.msg_ApiServerError
					});
					setLoading(false);
				}
			}
		);
	};

	const removeAccountHandler = ({ account }) => {
		const removeAccount = () => {
			const removeAccountData = {
				AccountName: userInfo.accountName,
				AccountNo: account.accountNo,
				SysId: account.SysId
			};
			setPopBox({ isOpen: false });
			setLoading(true);

			api_DelCustBankInfo(removeAccountData).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							GetCustBankInfo();
						} else {
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
								content: `[${res.data.errorCode}] ${res.data.message}`
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
		};

		setPopBox({
			isOpen: true,
			title: i18n.lbl_ImportantNote,
			content: i18n.lbl_CheckConfirm,
			hasBtn: true,
			btnBar: (
				<div className="btn-group">
					<button className="darkGray" onClick={toShowBankAccount}>
						{i18n.lbl_Cancel}
					</button>
					<button className="lightBlue" onClick={removeAccount}>
						{i18n.lbl_Submit}
					</button>
				</div>
			)
		});
	};

	const realNameCheck = ({ val }) => {
		let checked = true;
		let msg = "";
		if (!val) {
			checked = false;
			msg = i18n.msg_EnterRealName;
		}
		return { checked, msg };
	};

	const bankAccountCheck = ({ val }) => {
		let checked = true;
		let msg = "";

		const isDuplicateBank = custBankInfo?.find(
			_selectBank =>
				_selectBank.SysId === siteBankList[bankSelectedIdx].sysId &&
				_selectBank.accountNo === val
		);
		if (!val) {
			checked = false;
			msg = i18n.msg_NeedAccountNo;
		} else if (isDuplicateBank) {
			checked = false;
			msg = i18n.lbl_Prohibited_Duplicate_Bank_Account;
		}
		return { checked, msg };
	};

	const clickInfo = ({ col, info }) => {
		const _info = inputStatus[col].msg === "" ? i18n[info] : "";
		setInputStatus(prev => ({
			...prev,
			[col]: { checked: null, msg: _info }
		}));
	};

	const clickSubmit = () => {
		const RealNameCheck = realNameCheck({
			val: userInfo?.accountName ?? userValue.RealName
		});
		const BankAccountCheck = bankAccountCheck({
			val: userValue.BankAccount
		});
		const checked = RealNameCheck.checked && BankAccountCheck.checked;

		const SetCustBankInfo = () => {
			setPopBox({ isOpen: false });
			const bankInfoData = {
				AccountName: userInfo.accountName ?? userValue.RealName,
				AccountNo: userValue.BankAccount,
				SysId: siteBankList[bankSelectedIdx].id
			};

			setLoading(true);
			api_SetCustBankInfo(bankInfoData).then(
				response => {
					if (isMountedRef.current) {
						const { errorCode, message } = response.data;
						if (errorCode !== 0) {
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
								content: `[${errorCode}] ${message}`
							});
						} else {
							if (!userInfo.accountName) {
								setUserInfo(prev => ({
									...prev,
									accountName: userValue.RealName
								}));
							}
							GetCustBankInfo();
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
			setCurrentPanel(panel.bankList);
		};

		if (checked) {
			if (!userInfo.accountName) {
				const closePopbox = () => {
					setPopBox({ isOpen: false });
				};
				setPopBox({
					isOpen: true,
					title: i18n.lbl_ImportantNote,
					content: i18n.msg_ConfirmRealNameAlert,
					hasBtn: true,
					btnBar: (
						<div className="btn-group">
							<button className="darkGray" onClick={closePopbox}>
								{i18n.lbl_Cancel}
							</button>
							<button
								className="lightBlue"
								onClick={SetCustBankInfo}>
								{i18n.lbl_Submit}
							</button>
						</div>
					)
				});
			} else {
				SetCustBankInfo();
			}
		} else {
			setInputStatus({
				RealName: RealNameCheck,
				BankAccount: BankAccountCheck
			});
		}
	};

	const arr = custBankInfo.map(item => {
		return (
			<BankAccountItem
				key={`bankAccount-${item.accountNo}`}
				title={item.bankName}
				accountNo={item.accountNo}
				removeAccountHandler={removeAccountHandler.bind(null, {
					account: item
				})}
				image={`${paymentImgUrl}/${item.image?.toLowerCase()}`}
				className="bankLogo"
			/>
		);
	});

	if (!displayBankCard) return null;

	return (
		<>
			<div className="avatar" />
			<div className="name" data-testid="accountName">
				{userInfo.accountName}
			</div>
			{currentPanel === panel.bankList ? (
				<>
					{userInfo.accountName ? (
						<div className="text-org" data-testid="accountNameTip">
							{i18n.lbl_BankAccountHint}
						</div>
					) : null}
					{custBankInfo && custBankInfo.length < 3 ? (
						<div className="btn-group" data-testid="addAccountBtn">
							<button
								className="orange"
								onClick={toAddBankAccount}>
								<i className="icon icon-user-plus" />
								{i18n.lbl_AddNewAccount}
							</button>
						</div>
					) : null}
					{custBankInfo && custBankInfo.length > 0 ? (
						<div
							className="smallTitle"
							data-testid="accountListTitle">
							<i className="icon icon-library" />
							{i18n.lbl_BankAccount}
						</div>
					) : null}
					<div className="bankAccount" data-testid="accountList">
						{arr}
					</div>
				</>
			) : (
				<>
					<div className="inputBox">
						<Dropdown
							mainKey="custBankInfo-bankList"
							options={siteBankList}
							colName="custBankInfo"
							className="bankLogo"
							ImgURL={`${paymentImgUrl}/`}
							selectedIdx={bankSelectedIdx}
							onSelectItem={dropdownStateHandler}
							testAttr="bankList"
						/>
					</div>
					{!userInfo.accountName ? (
						<Inputbox
							icon="icon icon-member"
							value={userValue.RealName}
							placeholder={i18n.lbl_RealName}
							onBlur={checkValue.bind(null, { col: "RealName" })}
							onChange={EditField.bind(null, { col: "RealName" })}
							btnStatus={inputStatus.RealName.checked}
							tip={inputStatus.RealName.msg}
							clickInfo={clickInfo.bind(this, {
								col: "RealName",
								info: "msg_ConfirmRealNameAlert"
							})}
							testAttr="accountName"
						/>
					) : null}
					<Inputbox
						icon="icon icon-newspaper"
						inputType="tel"
						value={userValue.BankAccount}
						placeholder={i18n.lbl_BankNumber}
						onBlur={checkValue.bind(null, { col: "BankAccount" })}
						onChange={EditField.bind(null, { col: "BankAccount" })}
						btnStatus={inputStatus.BankAccount.checked}
						tip={inputStatus.BankAccount.msg}
						clickInfo={clickInfo.bind(this, {
							col: "BankAccount",
							info: "lbl_EnterAccountNumber"
						})}
						testAttr="account"
					/>
					<div className="btn-group" data-testid="addPanelBtn">
						<button
							className="darkGray"
							onClick={toShowBankAccount}>
							{i18n.lbl_Cancel}
						</button>
						<button className="lightBlue" onClick={clickSubmit}>
							{i18n.lbl_Submit}
						</button>
					</div>
				</>
			)}
		</>
	);
};

const BankAccountItem = props => {
	return (
		<div className="account" data-testid="account">
			<div className={props.className}>
				<img src={props.image} alt="" />
			</div>
			<div className="info">
				<ul>
					<li>
						<span className="title">{props.title}</span>
						<span>{props.accountNo}</span>
					</li>
				</ul>
			</div>
			<button
				className="icon icon-bin clickBtn"
				onClick={props.removeAccountHandler}
			/>
		</div>
	);
};

BankAccountItem.defaultProps = {
	className: ""
};

BankAccountItem.propTypes = {
	className: PropTypes.string,
	image: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	accountNo: PropTypes.string.isRequired,
	removeAccountHandler: PropTypes.func.isRequired
};

export default BankInfo;
