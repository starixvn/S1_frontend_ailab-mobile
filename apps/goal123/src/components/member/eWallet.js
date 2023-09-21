import React, { useState, useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Inputbox from "../common/inputbox.info";
import Dropdown from "../common/dropdown.image";
import { paymentNoSiteImgURL } from "../../config";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	loadingContext,
	withdrawalBlockSettingContext
} from "../common/context";
import { api_payment_GetEWalletInfoSysList } from "../../service/api/payment";
import {
	api_SetCustEWalletInfo,
	api_DelCustEWalletInfo
} from "../../service/api/accountStrict";
import { api_account_GetCustEWalletInfo } from "../../service/api/account";
import Member from "../../pages/member";
import { WITHDRAWAL_BLOCK_SETTING_TYPE } from "../../datas/withdrawalSetting";

const panel = { eWalletList: "eWalletList", addEWallet: "addEWallet" };
const initStatus = {
	RealName: { checked: null, msg: "" },
	EWalletAccount: { checked: null, msg: "" }
};

export default () => (
	<Member>
		<EWalletInfo />
	</Member>
);

const EWalletInfo = () => {
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { i18n } = useContext(i18nContext);
	const { setLoading } = useContext(loadingContext);
	const { withdrawalSettingTypeList } = useContext(
		withdrawalBlockSettingContext
	);
	const [siteBankList, setSiteBankList] = useState([]);
	const [custEWalletInfo, setCustEWalletInfo] = useState([]);
	const [currentPanel, setCurrentPanel] = useState(panel.eWalletList);
	const [eWalletSelectedIdx, setEWalletSelectedIdx] = useState(0);
	const [inputStatus, setInputStatus] = useState(initStatus);

	const initValue = {
		RealName: userInfo?.accountName ?? "",
		EWalletAccount: ""
	};
	const [userValue, setUserValue] = useState(initValue);
	const isMountedRef = useRef(null);

	const displayEWallet =
		withdrawalSettingTypeList?.find(
			item => item.type === WITHDRAWAL_BLOCK_SETTING_TYPE.EWallet
		)?.status ?? true;

	const GetCustEWalletInfo = () => {
		setLoading(true);

		api_account_GetCustEWalletInfo().then(
			res => {
				if (isMountedRef.current) {
					const { data, errorCode } = res.data;
					if (errorCode === 0) {
						if (data !== null) {
							const eWalletInfoDetail = data ?? [];
							const getEWalletInfoArr = eWalletInfoDetail.map(
								i => {
									return {
										bankName: i.eWalletName,
										image: i.eWalletLogo,
										accountNo: i.accountNo,
										SysId: i.sysId
									};
								}
							);
							setCustEWalletInfo(getEWalletInfoArr);
						}
					} else {
						setPopBox({
							isOpen: true,
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
						content: i18n.msg_ApiServerError
					});
					setLoading(false);
				}
			}
		);
	};

	const toAddEWalletAccount = () => {
		setLoading(true);
		api_payment_GetEWalletInfoSysList().then(
			res => {
				if (isMountedRef.current) {
					const { errorCode, data, message } = res.data;
					if (errorCode === 0) {
						const eWalletInfoArr = data.map(i => {
							return {
								id: i.sysId,
								sysId: i.sysId,
								bankName: i.eWalletName,
								image: i.eWalletLogo,
								displayText: i.eWalletName
							};
						});
						setSiteBankList(() => eWalletInfoArr);
						setCurrentPanel(currentPanel.bankList);
						setEWalletSelectedIdx(0);
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

	const removeAccountHandler = val => {
		const removeAccount = () => {
			const removeAccountData = {
				AccountNo: val.accountNo,
				SysId: val.SysId
			};
			setPopBox({ isOpen: false });
			setLoading(true);

			api_DelCustEWalletInfo(removeAccountData).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							GetCustEWalletInfo();
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
					<button className="darkGray" onClick={toShowEWalletAccount}>
						{i18n.lbl_Cancel}
					</button>
					<button className="lightBlue" onClick={removeAccount}>
						{i18n.lbl_Submit}
					</button>
				</div>
			)
		});
	};

	const toShowEWalletAccount = () => {
		setLoading(false);
		setCurrentPanel(panel.eWalletList);
		setPopBox({ isOpen: false });
	};

	const dropdownStateHandler = i => {
		setEWalletSelectedIdx(i);
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

	const EWalletAccountCheck = ({ val }) => {
		let checked = true;
		let msg = "";

		const isDuplicateBank = custEWalletInfo?.find(
			_selectBank =>
				_selectBank.SysId === siteBankList[eWalletSelectedIdx].sysId &&
				_selectBank.accountNo === val
		);
		if (!val) {
			checked = false;
			msg = i18n.msg_NeedAccountNo;
		} else if (isDuplicateBank) {
			checked = false;
			msg = i18n.lbl_Prohibited_Duplicate_EWallet_Account;
		}
		return { checked, msg };
	};

	const checkValue = ({ col }, e) => {
		const val = e.target.value;
		let result = { checked: true, msg: "" };

		if (col === "RealName") {
			result = realNameCheck({ val });
		} else if (col === "EWalletAccount") {
			result = EWalletAccountCheck({ val });
		}

		setInputStatus(prev => ({
			...prev,
			[col]: result
		}));
	};

	const EditField = ({ col }, e) => {
		let setValue = true;
		const val = e.target.value;
		if (col === "EWalletAccount") {
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
		const AccountNoCheck = EWalletAccountCheck({
			val: userValue.EWalletAccount
		});
		const checked = RealNameCheck.checked && AccountNoCheck.checked;

		const SetCustEWalletInfo = () => {
			setPopBox({ isOpen: false });
			const eWalletInfoData = {
				AccountNo: userValue.EWalletAccount,
				SysId: siteBankList[eWalletSelectedIdx].id
			};

			setLoading(true);
			api_SetCustEWalletInfo(eWalletInfoData).then(
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
							GetCustEWalletInfo();
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
			setCurrentPanel(panel.eWalletList);
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
								onClick={SetCustEWalletInfo}>
								{i18n.lbl_Submit}
							</button>
						</div>
					)
				});
			} else {
				SetCustEWalletInfo();
			}
		} else {
			setInputStatus({
				RealName: RealNameCheck,
				EWalletAccount: AccountNoCheck
			});
		}
	};

	const arr = custEWalletInfo.map(item => {
		return (
			<EWalletAccountItem
				key={`eWalletAccount-${item.accountNo}`}
				title={item.bankName}
				accountNo={item.accountNo}
				removeAccountHandler={removeAccountHandler.bind(null, item)}
				image={`${paymentNoSiteImgURL}/square/${item.image?.toLowerCase()}`}
				i18n={i18n}
				ifscCode={item?.ifscCode}
				currencyId={userInfo.currencyId}
			/>
		);
	});

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (userInfo.isLogin) {
			GetCustEWalletInfo();
		}
	}, [userInfo.isLogin]);

	if (!displayEWallet) return null;

	return (
		<>
			<div className="avatar" />
			<div className="name" data-testid="accountName">
				{userInfo.accountName}
			</div>
			{currentPanel === panel.eWalletList ? (
				<>
					{userInfo.accountName ? (
						<div className="text-org" data-testid="accountNameTip">
							{i18n.lbl_EWalletAccountHint}
						</div>
					) : null}
					{custEWalletInfo && custEWalletInfo.length < 3 ? (
						<div className="btn-group" data-testid="addAccountBtn">
							<button
								className="orange"
								onClick={toAddEWalletAccount}>
								<i className="icon icon-user-plus" />
								{i18n.lbl_AddNewAccount}
							</button>
						</div>
					) : null}
					{custEWalletInfo && custEWalletInfo.length > 0 ? (
						<div
							className="smallTitle"
							data-testid="accountListTitle">
							<i className="icon icon-library" />
							{i18n.lbl_EWalletAccount}
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
							ImgURL={`${paymentNoSiteImgURL}/square/`}
							selectedIdx={eWalletSelectedIdx}
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
						value={userValue.EWalletAccount}
						placeholder={i18n.lbl_BankNumber}
						onBlur={checkValue.bind(null, {
							col: "EWalletAccount"
						})}
						onChange={EditField.bind(null, {
							col: "EWalletAccount"
						})}
						btnStatus={inputStatus.EWalletAccount.checked}
						tip={inputStatus.EWalletAccount.msg}
						clickInfo={clickInfo.bind(this, {
							col: "EWalletAccount",
							info: "lbl_EnterAccountNumber"
						})}
						testAttr="account"
					/>
					<div className="btn-group" data-testid="addPanelBtn">
						<button
							className="darkGray"
							onClick={toShowEWalletAccount}>
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

const EWalletAccountItem = props => {
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

EWalletAccountItem.defaultProps = {
	className: ""
};

EWalletAccountItem.propTypes = {
	className: PropTypes.string,
	image: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	accountNo: PropTypes.string.isRequired,
	removeAccountHandler: PropTypes.func.isRequired
};
