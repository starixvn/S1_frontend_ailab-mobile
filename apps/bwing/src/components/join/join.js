// import React, { useEffect, useState, useContext, useRef } from "react";
// import { useMatch, useNavigate } from "@reach/router";
// import Inputbox from "../common/inputbox";
// import InputboxPWD from "../common/inputbox.password";
// import Dropdown from "../common/dropdown";
// import Checkbox from "../common/checkbox";
// import Tips from "./tips";
// import {
// 	api_ExistsUserName,
// 	api_GetSiteCurrencyList,
// 	api_GetBanner,
// 	api_site_Signup,
// 	api_site_ExistsPhoneNo,
// 	api_site_GetAffiliateAgent
// } from "../../service/api/site";
// import { api_GetCustProfile } from "../../service/api/accountStrict";
// import { getUrlParameter, readCookie, passwordCheck } from "../common/common";
// import {
// 	userInfoContext,
// 	i18nContext,
// 	navContext,
// 	defNavPanel,
// 	popBoxContext
// } from "../common/context";
// import TandC from "../../service/t_and_c";
// import path from "../../path";
// import config from "../../config";
// import PromoPopup from "./join.promotion";
// import Logo from "../img/logo";
// import areaCode from "../../datas/areaCode";

// const colName = ["UserName", "Password", "Currency", "Phone"];

// const defColName = {
// 	UserName: "UserName",
// 	Password: "Password",
// 	Currency: "Currency",
// 	Phone: "Phone"
// };

// const initState = {
// 	UserName: "",
// 	Password: "",
// 	Phone: "",
// 	Currency: null,
// 	AffiliateId: "",
// 	SpecialBonusCode: ""
// };

// const initWarningState = {
// 	UserName: {
// 		status: false,
// 		msg: ""
// 	},
// 	Password: {
// 		status: false,
// 		msg: ""
// 	},
// 	Currency: {
// 		status: false
// 	},
// 	AffiliateId: {
// 		status: false,
// 		msg: ""
// 	},
// 	Checkbox: {
// 		status: false,
// 		msg: ""
// 	},
// 	Phone: {
// 		status: false,
// 		msg: ""
// 	},
// 	SpecialBonusCode: {
// 		checked: null,
// 		msg: ""
// 	}
// };

// const initCheckboxVal = {
// 	termsCheck: false,
// 	ageCheck: false
// };

// const initChecklistState = {
// 	UserName: false,
// 	Password: false
// };

// const currencyToAreacode = {
// 	2: "MY",
// 	4: "TH",
// 	13: "CS",
// 	15: "ID",
// 	51: "VN"
// };

// const currencyDefaultSelectIdx = 0;

// const Join = () => {
// 	const navigate = useNavigate();
// 	const { i18n } = useContext(i18nContext);
// 	const { userInfo, setUserInfo } = useContext(userInfoContext);
// 	const { setPopBox } = useContext(popBoxContext);
// 	const { nav, setNav } = useContext(navContext);
// 	const [userValueState, setUserValueState] = useState(initState);
// 	const [siteCurrencyState, setSiteCurrencyState] = useState([]);
// 	const [warningState, setWarningState] = useState(initWarningState);
// 	const [pswState, setPswState] = useState(false);
// 	const [checkboxState, setCheckboxState] = useState(initCheckboxVal);
// 	const [banner, setBanner] = useState([]);
// 	const [affiliateidExist, setAffiliateidExist] = useState("");
// 	const [showTipsState, setShowTipsState] = useState({
// 		UserName: false,
// 		Password: false,
// 		AffiliateId: false,
// 		Currency: false,
// 		Phone: false
// 	});
// 	const [checklistState, setChecklistState] = useState(initChecklistState);
// 	const [promoPopup, setPromoPopup] = useState(false);
// 	const [currencyState, setcurrencyState] = useState(
// 		currencyDefaultSelectIdx
// 	);

// 	const currencyToCountryCode = currencyToAreacode[51];

// 	const _areaCode =
// 		currencyToCountryCode !== null
// 			? areaCode[currencyToCountryCode]?.AreaCode
// 			: null;

// 	const isMountedRef = useRef(null);
// 	useEffect(() => {
// 		isMountedRef.current = true;
// 		return () => {
// 			isMountedRef.current = false;
// 		};
// 	});

// 	useEffect(() => {
// 		const refId = readCookie("RefId");
// 		const showBylink = window.location.pathname === `/${path.join.root}`;
// 		const openPanel = showBylink || nav === defNavPanel.join;
// 		if (refId && openPanel) {
// 			api_GetBanner("Promotion", refId, userInfo.langId).then(res => {
// 				if (res.data.errorCode === 0 && isMountedRef.current) {
// 					if (res.data.data.length > 0) {
// 						setBanner(res.data.data);
// 						setPromoPopup(true);
// 					}
// 				}
// 			});
// 		}
// 	}, [nav, userInfo.langId]);

// 	const AffId = getUrlParameter("AffId") || readCookie("AffId");
// 	useEffect(() => {
// 		const AffCode = getUrlParameter("AffCode") || readCookie("AffCode");

// 		if (AffId) {
// 			setAffiliateidExist(AffId);
// 			api_site_GetAffiliateAgent({ AffId }).then(
// 				res => {
// 					if (isMountedRef.current) {
// 						if (res.data.errorCode === 0) {
// 							const { currencyId } = res.data.data;
// 							const currencyData = {
// 								id: currencyId,
// 								displayKey: `Currency_${currencyId}`
// 							};
// 							setUserValueState(prev => ({
// 								...prev,
// 								Currency: currencyData
// 							}));
// 							setSiteCurrencyState(() => [currencyData]);
// 						} else {
// 							GetSiteCurrencyList();
// 						}
// 					}
// 				},
// 				() => {
// 					if (isMountedRef.current) {
// 						setPopBox({
// 							isOpen: true,
// 							title: i18n.lbl_ImportantNote,
// 							content: i18n.msg_ApiServerError
// 						});
// 					}
// 				}
// 			);
// 		} else {
// 			if (AffCode) {
// 				setAffiliateidExist(AffCode);
// 			}
// 			GetSiteCurrencyList();
// 		}
// 	}, []);

// 	const GetSiteCurrencyList = () => {
// 		api_GetSiteCurrencyList().then(
// 			res => {
// 				if (isMountedRef.current) {
// 					if (res.data.errorCode === 0) {
// 						const currencyNum = res.data.data;
// 						const currencyArr = currencyNum.map(id => {
// 							return { id, displayKey: `Currency_${id}` };
// 						});
// 						setUserValueState(prevState => ({
// 							...prevState,
// 							Currency: currencyArr[currencyDefaultSelectIdx]
// 						}));
// 						setSiteCurrencyState(() => currencyArr);
// 					} else {
// 						setPopBox({
// 							isOpen: true,
// 							title: i18n.lbl_ImportantNote,
// 							content: res.data.message
// 						});
// 					}
// 				}
// 			},
// 			() => {
// 				if (isMountedRef.current) {
// 					setPopBox({
// 						isOpen: true,
// 						title: i18n.lbl_ImportantNote,
// 						content: i18n.msg_ApiServerError
// 					});
// 				}
// 			}
// 		);
// 	};

// 	const showPswHandler = () => {
// 		setPswState(!pswState);
// 	};

// 	const showTipsHandler = col => {
// 		if (warningState[col].status === true) {
// 			setShowTipsState(prevState => {
// 				Object.keys(prevState).forEach(_col => {
// 					prevState[_col] = false;
// 				});
// 				return {
// 					...prevState
// 				};
// 			});
// 		} else {
// 			setShowTipsState(prevState => {
// 				Object.keys(prevState).forEach(_col => {
// 					prevState[_col] = _col === col;
// 				});
// 				return {
// 					...prevState
// 				};
// 			});
// 		}
// 	};

// 	const usernameCheck = val => {
// 		let checked = false;
// 		let message = "";
// 		if (val === "") {
// 			checked = false;
// 			message = i18n.msg_UsernameReq;
// 		} else if (val != null) {
// 			if (val.length < 6 || val.length > 18) {
// 				checked = false;
// 				message = i18n.msg_UsernameLength;
// 			} else {
// 				checked = true;
// 			}
// 		}
// 		return { checked, message };
// 	};

// 	const phoneCheck = async val => {
// 		let checked = true;
// 		let msg = "";
// 		const regx = /^[0-9\s]*$/;

// 		if (!val) {
// 			checked = false;
// 			msg = "lbl_PhoneRequired";
// 		} else if (val.length < 9 || !regx.test(val)) {
// 			checked = false;
// 			msg = "lbl_PhoneTooltip";
// 		} else {
// 			const res = await api_site_ExistsPhoneNo({
// 				AreaCode: _areaCode,
// 				Phone: val
// 			});

// 			if (res.data.errorCode === 0 && res.data.data === true) {
// 				checked = false;
// 				msg = "msg_PhoneExisted";
// 			}
// 		}

// 		return { checked, msg };
// 	};

// 	const checkUsernameHandler = async (_colName, e) => {
// 		const val = e.target.value;
// 		const result = usernameCheck(val);

// 		if (val !== "") {
// 			if (result.checked) {
// 				setWarningState(prevState => {
// 					return {
// 						...prevState,
// 						[_colName]: {
// 							status: false,
// 							msg: ""
// 						}
// 					};
// 				});

// 				try {
// 					const response = await api_ExistsUserName({
// 						UserName: val
// 					});

// 					if (isMountedRef.current) {
// 						const res = response.data;
// 						if (res.errorCode === 0) {
// 							if (res.data === true) {
// 								setWarningState(prevState => {
// 									return {
// 										...prevState,
// 										UserName: {
// 											status: true,
// 											msg: i18n.msg_UsernameNotAvailable
// 										}
// 									};
// 								});
// 							} else {
// 								setShowTipsState(prevState => {
// 									return {
// 										...prevState,
// 										UserName: false
// 									};
// 								});
// 								setChecklistState(prevState => {
// 									return {
// 										...prevState,
// 										UserName: result.checked
// 									};
// 								});
// 							}
// 						} else {
// 							setPopBox({
// 								isOpen: true,
// 								title: i18n.lbl_ImportantNote,
// 								content: res.data.message
// 							});
// 						}
// 					}
// 				} catch (error) {
// 					if (isMountedRef.current) {
// 						setPopBox({
// 							isOpen: true,
// 							title: i18n.lbl_ImportantNote,
// 							content: i18n.msg_ApiServerError
// 						});
// 					}
// 				}
// 			} else {
// 				setShowTipsState(prevState => {
// 					return { ...prevState, UserName: false };
// 				});
// 				setWarningState(prevState => {
// 					return {
// 						...prevState,
// 						[_colName]: {
// 							status: !result.checked,
// 							msg: result.message
// 						}
// 					};
// 				});
// 			}
// 		}
// 	};

// 	const checkPasswordHandler = (_colName, e) => {
// 		const val = e.target.value;

// 		const result = passwordCheck({ val });
// 		setWarningState(prevState => {
// 			return {
// 				...prevState,
// 				[_colName]: {
// 					status: !result.checked,
// 					msg: i18n[result.message]
// 				}
// 			};
// 		});
// 		setShowTipsState(prevState => {
// 			return { ...prevState, Password: false };
// 		});
// 		setUserValueState(prevState => {
// 			return { ...prevState, Password: val };
// 		});
// 		setChecklistState(prevState => {
// 			return { ...prevState, Password: result.checked };
// 		});
// 	};

// 	const dropdownStateHandler = i => {
// 		setcurrencyState(i);
// 		setShowTipsState(prevState => {
// 			return { ...prevState, Currency: false };
// 		});
// 		setUserValueState(prevState => {
// 			return { ...prevState, Currency: siteCurrencyState[i] };
// 		});
// 	};

// 	const checkValue = async (col, e) => {
// 		const val = e.target.value;
// 		let checked = true;
// 		let msg = "";

// 		if (col === "Phone") {
// 			const result = await phoneCheck(val);
// 			checked = result.checked;
// 			msg = result.msg;
// 		}

// 		setWarningState(prev => ({
// 			...prev,
// 			[col]: {
// 				status: !checked,
// 				msg: msg ? i18n[msg] : ""
// 			}
// 		}));
// 	};

// 	const EditField = (_colName, e) => {
// 		const val = e.target.value;
// 		let checked = true;
// 		if (_colName === defColName.Phone) {
// 			const regx = /^[0-9\s]*$/;
// 			checked = regx.test(val);
// 		}

// 		if (checked) {
// 			setUserValueState(prevState => ({
// 				...prevState,
// 				[_colName]: val
// 			}));
// 		}
// 	};

// 	const checkboxHandler = col => {
// 		const checked = !checkboxState[col];
// 		setCheckboxState(prev => ({
// 			...prev,
// 			[col]: checked
// 		}));
// 	};

// 	const checkAll = async () => {
// 		try {
// 			const res = await Promise.all([phoneCheck(userValueState.Phone)]);

// 			const _phoneCheck = res[0];
// 			const { checked } = _phoneCheck;

// 			if (!checked) {
// 				setWarningState(prev => ({
// 					...prev,
// 					Phone: {
// 						status: !_phoneCheck.checked,
// 						msg: i18n[_phoneCheck.msg]
// 					}
// 				}));
// 			}

// 			return checked;
// 		} catch (error) {
// 			return false;
// 		}
// 	};

// 	const checklistHandler = async () => {
// 		let checked = true;

// 		const UserName = usernameCheck(userValueState.UserName);
// 		const Password = passwordCheck({ val: userValueState.Password });
// 		const _Checkbox = checkboxState.termsCheck && checkboxState.ageCheck;
// 		const _checkAll = await checkAll();

// 		checked =
// 			UserName.checked && Password.checked && _Checkbox && _checkAll;

// 		for (const i in checklistState) {
// 			if (checklistState[i] === false) {
// 				checked = false;
// 				setWarningState(prevState => {
// 					return {
// 						...prevState,
// 						[i]: {
// 							status: true,
// 							msg: i.message
// 						}
// 					};
// 				});
// 			}
// 		}

// 		if (checked) {
// 			const regData = {
// 				UserName: userValueState.UserName,
// 				Userpwd: userValueState.Password,
// 				CurrencyId: userValueState.Currency.id,
// 				UserLang: userInfo.langId,
// 				PhoneNo: userValueState.Phone,
// 				AreaCode: _areaCode,
// 				PromoCode: userValueState.SpecialBonusCode
// 			};

// 			if (AffId) {
// 				const res = await api_site_GetAffiliateAgent({ AffId });
// 				if (res.data.errorCode === 0) {
// 					regData.AffId =
// 						getUrlParameter("AffId") || getCookie("AffId");
// 				}
// 			}

// 			regData.RefId = getUrlParameter("RefId") || readCookie("RefId");
// 			regData.Aff = getUrlParameter("Aff") || readCookie("Aff");
// 			regData.AffCode =
// 				getUrlParameter("AffCode") ||
// 				readCookie("AffCode") ||
// 				userValueState.AffiliateId;

// 			api_site_Signup(regData, userInfo.langId).then(
// 				response => {
// 					if (isMountedRef.current) {
// 						const { errorCode } = response.data;
// 						const { message } = response.data;
// 						if (errorCode === 0) {
// 							api_GetCustProfile().then(
// 								res_custInfo => {
// 									if (isMountedRef.current) {
// 										let _user = {
// 											isLogin: true,
// 											langId: userInfo.langId,
// 											userName: userValueState.UserName
// 										};
// 										if (res_custInfo.data.errorCode === 0) {
// 											_user = {
// 												..._user,
// 												...res_custInfo.data.data
// 											};
// 										}
// 										setUserInfo(_user);
// 									}
// 								},
// 								() => {
// 									if (isMountedRef.current) {
// 										setPopBox({
// 											isOpen: true,
// 											title: i18n.lbl_ImportantNote,
// 											content: i18n.msg_ApiServerError
// 										});
// 									}
// 								}
// 							);
// 							setNav(null);
// 						} else if (
// 							errorCode === -2 ||
// 							errorCode === -5 ||
// 							errorCode === -19
// 						) {
// 							setWarningState(prevState => ({
// 								...prevState,
// 								UserName: { status: true, msg: message }
// 							}));
// 						} else if (errorCode === -3) {
// 							setWarningState(prevState => ({
// 								...prevState,
// 								Password: { status: true, msg: message }
// 							}));
// 						} else if (errorCode === -7) {
// 							setWarningState(prevState => ({
// 								...prevState,
// 								SpecialBonusCode: { status: true, msg: message }
// 							}));
// 						}
// 					}
// 				},
// 				() => {
// 					if (isMountedRef.current) {
// 						setPopBox({
// 							isOpen: true,
// 							title: i18n.lbl_ImportantNote,
// 							content: i18n.msg_ApiServerError
// 						});
// 					}
// 				}
// 			);
// 		} else {
// 			setWarningState(prev => ({
// 				...prev,
// 				UserName: { status: !UserName.checked, msg: UserName.message },
// 				Password: {
// 					status: !Password.checked,
// 					msg: i18n[Password.message]
// 				},
// 				Checkbox: {
// 					status: !(
// 						checkboxState.termsCheck && checkboxState.ageCheck
// 					),
// 					msg: i18n.lbl_Check18TCTooltip
// 				}
// 			}));
// 		}
// 	};

// 	const handleJoinPanel = (show, reset, showBylink) => {
// 		if (reset) {
// 			setUserValueState({
// 				...initState,
// 				Currency: siteCurrencyState[currencyDefaultSelectIdx]
// 			});
// 			setWarningState(initWarningState);
// 			setcurrencyState(currencyDefaultSelectIdx);
// 			setCheckboxState(initCheckboxVal);
// 			setChecklistState(initChecklistState);
// 		}

// 		if (showBylink) {
// 			navigate("/");
// 		} else {
// 			setNav(() => {
// 				const newState = show ? null : defNavPanel.join;
// 				return newState;
// 			});
// 		}
// 	};

// 	const showBylink = useMatch(path.join.root);
// 	const openPanel = showBylink || nav === defNavPanel.join;

// 	const ClosePromoPopup = () => {
// 		setPromoPopup(false);
// 	};

// 	return (
// 		<>
// 			<button onClick={handleJoinPanel.bind(this, openPanel)}>
// 				{i18n.lbl_JoinNow.toUpperCase()}
// 			</button>
// 			<div className={`Join${openPanel ? " open" : ""}`}>
// 				<div
// 					className={`close${openPanel ? " open" : ""}`}
// 					onClick={handleJoinPanel.bind(
// 						this,
// 						openPanel,
// 						true,
// 						showBylink
// 					)}>
// 					<span />
// 					<span />
// 					<span />
// 					<span />
// 					<span />
// 					<span />
// 				</div>
// 				<Logo />
// 				<div className="title">{i18n.lbl_JoinNow}</div>

// 				<Inputbox
// 					icon="icon-member"
// 					inputType="text"
// 					placeholder={i18n.lbl_Username}
// 					onFocus={showTipsHandler.bind(null, "UserName")}
// 					onBlur={checkUsernameHandler.bind(null, "UserName")}
// 					onChange={EditField.bind(null, "UserName")}
// 					ClassName="JoinRule"
// 					showTips={showTipsState.UserName}
// 					Tips={i18n.lbl_UsernameTooltip}
// 					Warning={warningState.UserName}
// 					value={userValueState.UserName}
// 				/>

// 				<InputboxPWD
// 					icon="icon-key"
// 					inputType={`${!pswState ? "password" : "text"}`}
// 					placeholder={i18n.lbl_Password}
// 					onFocus={showTipsHandler.bind(null, "Password")}
// 					onBlur={checkPasswordHandler.bind(null, "Password")}
// 					onChange={EditField.bind(null, "Password")}
// 					showPsw={pswState}
// 					showPswHandler={showPswHandler}
// 					ClassName="JoinRule"
// 					showTips={showTipsState.Password}
// 					Tips={i18n.lbl_PasswordTooltip}
// 					Warning={warningState.Password}
// 					value={userValueState.Password}
// 				/>

// 				<div className="inputBox">
// 					<Dropdown
// 						mainKey="join-curr"
// 						colName={colName[3]}
// 						selectedIdx={currencyState}
// 						options={siteCurrencyState}
// 						clickDropdown={showTipsHandler.bind(null, "Currency")}
// 						onSelectItem={dropdownStateHandler}
// 						value={userValueState.Currency}
// 						i18n={i18n}
// 					/>
// 					<Tips
// 						Icon="icon-coin-dollar"
// 						IsOpen={showTipsState.Currency}
// 						ClassName="JoinRule">
// 						{i18n.lbl_PreferredCurrencyToolTip}
// 					</Tips>
// 				</div>

// 				<div className="inputBox parts">
// 					<span className="countryCode">{_areaCode}</span>
// 					<Inputbox
// 						icon="icon-phone"
// 						inputType="tel"
// 						ClassName="JoinRule"
// 						placeholder={i18n.lbl_Phone}
// 						value={userValueState.Phone}
// 						areaCode={_areaCode}
// 						onFocus={showTipsHandler.bind(null, "Phone")}
// 						onBlur={checkValue.bind(null, "Phone")}
// 						onChange={EditField.bind(null, "Phone")}
// 						error={warningState.Phone.status}
// 					/>
// 					<div
// 						className={`errortip${
// 							warningState.Phone.status || showTipsState.Phone
// 								? " open"
// 								: ""
// 						}`}>
// 						{warningState.Phone.status
// 							? warningState.Phone.msg
// 							: i18n.lbl_PhoneTooltip}
// 					</div>
// 				</div>

// 				{/* <Inputbox
// 					icon="icon-promotion"
// 					ClassName="JoinRule"
// 					placeholder={i18n.lbl_PromoCode}
// 					value={userValueState.SpecialBonusCode}
// 					onChange={EditField.bind(null, "SpecialBonusCode")}
// 					onBlur={checkValue.bind(null, "SpecialBonusCode")}
// 					Warning={warningState.SpecialBonusCode}
// 				/> */}

// 				<Inputbox
// 					icon="icon-affiliate"
// 					ClassName="JoinRule"
// 					placeholder={i18n.lbl_Affiliate_ID}
// 					value={
// 						affiliateidExist !== ""
// 							? affiliateidExist
// 							: userValueState.AffiliateId
// 					}
// 					onFocus={showTipsHandler.bind(null, "AffiliateId")}
// 					onChange={EditField.bind(null, "AffiliateId")}
// 					showTips={showTipsState.AffiliateId}
// 					Tips={i18n.lbl_Please_enter_Affiliate_ID}
// 					Warning={warningState.AffiliateId}
// 					disabled={affiliateidExist}
// 				/>

// 				<div className="Terms">
// 					<Checkbox
// 						checked={checkboxState.termsCheck}
// 						onChange={checkboxHandler.bind(this, "termsCheck")}
// 						id="joinTermsCheck">
// 						{i18n.lbl_Check18TC1} &nbsp;
// 						<a
// 							target="_blank"
// 							rel="noreferrer"
// 							href={TandC(userInfo.langId).terms}>
// 							{i18n.lbl_TermsConditions}
// 						</a>
// 						&nbsp; {i18n.lbl_Check18TC2}&nbsp;
// 						<a
// 							target="_blank"
// 							rel="noreferrer"
// 							href={TandC(userInfo.langId).rule}>
// 							{i18n.lbl_RuleRegulations}
// 						</a>
// 						&nbsp; {i18n.lbl_Check18TC3}&nbsp;{config.siteName}
// 					</Checkbox>
// 					<Checkbox
// 						id="joinAgeCheck"
// 						checked={checkboxState.ageCheck}
// 						onChange={checkboxHandler.bind(this, "ageCheck")}>
// 						{i18n.lbl_Check18TC4}
// 					</Checkbox>
// 					{warningState.Checkbox.status ? (
// 						<div className="JoinRule open">
// 							{i18n.lbl_Check18TCTooltip}
// 						</div>
// 					) : null}
// 				</div>
// 				<div className="btn-group">
// 					<button onClick={checklistHandler}>
// 						{i18n.lbl_JoinNow}
// 					</button>
// 				</div>
// 			</div>
// 			<PromoPopup
// 				banner={banner}
// 				ImgFolder="Promotion"
// 				ClickClose={ClosePromoPopup}
// 				title={i18n.lbl_Welcome}
// 				isOpen={promoPopup}
// 			/>
// 		</>
// 	);
// };

// export default Join;
