import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "@reach/router";
import { initValue, initWarning, infoList, otpCol } from "./profile.detail.def";
import Inputbox from "../common/inputbox.hint";
import useTip from "../hook/useTip";
import api from "../../service/api";
import { redirectToPrev } from "./profile.redirect";
import { i18nContext, popBoxContext, userInfoContext } from "../common/context";
import { defPopBoxType } from "../common/popbox";

const ProfileAddr = () => {
	const navigate = useNavigate();
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const [userValue, setUserValue] = useState(initValue);
	const [warning, setWarning] = useState(initWarning);
	const isMountedRef = useRef(null);
	const { showTips, showTipHandler } = useTip();
	const { setPopBox } = useContext(popBoxContext);
	const addrList = infoList({ i18n, userInfo }).filter(obj => obj.type);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	}, []);

	useEffect(() => {
		setUserValue(prevState => ({
			...prevState,
			addressLineFirst: userInfo.addressLineFirst,
			addressLineSecond: userInfo.addressLineSecond ?? "",
			addressCity: userInfo.addressCity,
			addressPostCode: userInfo.addressPostCode,
			addressState: userInfo.addressState,
			addressCountry: userInfo.addressCountry
		}));
	}, []);
	const checkHandle = (val, col) => {
		let checked = true;
		let message = "";
		const addrCheckList = [
			"addressLineFirst",
			"addressCity",
			"addressPostCode",
			"addressState",
			"addressCountry"
		];

		if (addrCheckList.includes(col)) {
			checked = !!val;
			message = !val ? i18n.msg_Content_Not_Empty : "";
		}

		setWarning(prevState => ({
			...prevState,
			[col]: {
				checked,
				msg: message
			}
		}));

		return checked;
	};
	const EditField = (col, e) => {
		let val = e.target.value;

		if (col === "addressPostCode") {
			val = val.replace(/\D/g, "");
		}

		setUserValue(prevState => ({
			...prevState,
			[col]: val
		}));
	};

	const clickOtp = col => {
		if (col === otpCol.phone) {
			const ClosePopbox = ({ _redirectPath }) => {
				setPopBox({ isOpen: false });
				if (_redirectPath) {
					navigate(`/${userInfo.langId}/${_redirectPath}`);
				}
			};

			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Otp,
				ClosePopbox
			});
		} else if (col === otpCol.email) {
			api.accountStrict.SendOTPEmail().then(
				res => {
					const { errorCode, message } = res.data;
					if (errorCode === 0) {
						setPopBox({
							isOpen: true,
							content: i18n.lbl_EmailOTPHint,
							hasBtn: true,
							btnBar: (
								<div className="btn-group">
									<button
										className="blue"
										onClick={() => {
											setPopBox({ isOpen: false });
										}}>
										OK
									</button>
								</div>
							)
						});
					} else {
						setPopBox({
							isOpen: true,
							content: `[${errorCode}] ${message}`
						});
					}
				},
				() => {
					setPopBox({
						isOpen: true,
						content: i18n.msg_ApiServerError
					});
				}
			);
		}
	};

	const clickSubmit = () => {
		const noContentList = addrList.filter(
			obj =>
				userValue[obj.infoTitle] === "" &&
				obj.infoTitle !== "addressLineSecond"
		);

		if (noContentList.length === 0) {
			const closePopbox = ({ _redirectPath }) => {
				setPopBox({ isOpen: false });
				if (_redirectPath) {
					navigate(`/${userInfo.langId}/${_redirectPath}`);
				}
			};
			const openOtpHint = () => {
				setPopBox({
					isOpen: true,
					title: i18n.msg_Updatesuccessful,
					content: <div>{i18n.lbl_VertifyContactConfirm}</div>,
					hasBtn: true,
					btnBar: (
						<div className="btn-group">
							<button className="white" onClick={closePopbox}>
								{i18n.lbl_Later}
							</button>
							<button
								className="orange"
								onClick={clickOtp.bind(this, otpCol.phone)}>
								{i18n.lbl_VerifyNow}
							</button>
						</div>
					)
				});
			};
			const setProfile = () => {
				const profileData = {
					AddressCountry:
						userInfo.addressCountry &&
						userInfo.addressCountry !== ""
							? userInfo.addressCountry
							: userValue.addressCountry,
					AddressState:
						userInfo.addressState && userInfo.addressState !== ""
							? userInfo.addressState
							: userValue.addressState,
					AddressPostCode:
						userInfo.addressPostCode &&
						userInfo.addressPostCode !== ""
							? userInfo.addressPostCode
							: userValue.addressPostCode,
					AddressCity:
						userInfo.addressCity && userInfo.addressCity !== ""
							? userInfo.addressCity
							: userValue.addressCity,
					AddressLineFirst:
						userInfo.addressLineFirst &&
						userInfo.addressLineFirst !== ""
							? userInfo.addressLineFirst
							: userValue.addressLineFirst,
					AddressLineSecond:
						userInfo.addressLineSecond &&
						userInfo.addressLineSecond !== ""
							? userInfo.addressLineSecond
							: userValue.addressLineSecond
				};

				api.accountStrict.SetProfileAddress(profileData).then(
					response => {
						if (isMountedRef.current) {
							const { errorCode, message } = response.data;

							if (errorCode === 0) {
								api.accountStrict.GetCustProfile().then(
									res => {
										if (isMountedRef.current) {
											if (res.data.errorCode === 0) {
												setUserInfo(prevState => ({
													...prevState,
													...res.data.data
												}));
												if (!userInfo.phoneVerified) {
													openOtpHint();
												}
											} else {
												setPopBox({
													isOpen: true,
													content: `[${res.data.errorCode}] ${res.data.message}`
												});
											}
										}
									},
									() => {
										if (isMountedRef.current) {
											setPopBox({
												isOpen: true,
												content: i18n.msg_ApiServerError
											});
										}
									}
								);
								redirectToPrev(i18n, setPopBox, closePopbox);
							} else if (errorCode === 21) {
								setWarning(prevState => ({
									...prevState,
									phoneNo: { checked: false, msg: message }
								}));
							} else {
								setPopBox({
									isOpen: true,
									content: `[${errorCode}] ${message}`
								});
							}
						}
					},
					() => {
						if (isMountedRef.current) {
							setPopBox({
								isOpen: true,
								content: i18n.msg_ApiServerError
							});
						}
					}
				);
			};
			setPopBox({
				isOpen: true,
				title: i18n.lbl_ImportantNote,
				content: userInfo.accountName
					? i18n.lbl_ProfileModifyWarning
					: i18n.msg_ConfirmRealNameAlert,
				hasBtn: true,
				btnBar: (
					<div className="btn-group">
						<button className="white" onClick={closePopbox}>
							{i18n.lbl_Cancel}
						</button>
						<button className="orange" onClick={setProfile}>
							{i18n.lbl_Submit}
						</button>
					</div>
				)
			});
		}
	};

	return (
		<div className="addressModule">
			{addrList.map(obj => {
				return (
					<Inputbox
						onBlur={e => checkHandle(e.target.value, obj.infoTitle)}
						onChange={EditField.bind(null, obj.infoTitle)}
						btnStatus={warning[obj.infoTitle].checked}
						warningMsg={warning[obj.infoTitle].msg}
						value={userValue[obj.infoTitle]}
						infoText={obj.infoHint}
						clickInfo={() => showTipHandler(obj.infoTitle)}
						showTips={showTips.includes(obj.infoTitle)}
						testAttr={obj.infoTitle}
						subtitle={obj.colTitle}
					/>
				);
			})}
			<div className="btn-group" data-testid="submitBtn">
				<button onClick={clickSubmit}>{i18n.lbl_Submit}</button>
			</div>
		</div>
	);
};

export default ProfileAddr;
