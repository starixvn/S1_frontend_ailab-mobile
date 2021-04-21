import React, { useContext, useEffect, useState } from "react";
import WAValidator from "multicoin-address-validator";
import { i18nContext, userInfoContext, popBoxContext } from "../common/context";
import api from "../../service/api";
import InputBox from "../common/inputbox.hint";
import useTip from "../hook/useTip";

const CryptoWallet = () => {
	const { i18n } = useContext(i18nContext);
	const { setUserInfo } = useContext(userInfoContext);
	const [showAddWallet, setShowAddWallet] = useState(false);
	const { setPopBox } = useContext(popBoxContext);
	const [walletInfo, setWalletInfo] = useState([]);
	const [form, setForm] = useState({
		AccountName: "",
		USDTInfo: []
	});
	const [disabledSubmit, setSubmitDisabled] = useState(true);
	const { showTips, showTipHandler } = useTip([]);
	const [isValid, setValid] = useState([
		{
			NickName: {
				msg: "",
				stat: null
			},
			USDTAddress: {
				msg: "",
				stat: null
			}
		},
		{
			NickName: {
				msg: "",
				stat: null
			},
			USDTAddress: {
				msg: "",
				stat: null
			}
		},
		{
			NickName: {
				msg: "",
				stat: null
			},
			USDTAddress: {
				msg: "",
				stat: null
			}
		},
		{
			AccountName: {
				msg: "",
				stat: null
			}
		}
	]);

	const onSubmit = () => {
		const checkIfDuplicateExists = () => {
			const w = form.USDTInfo.map(el => el.USDTAddress);
			return new Set(w).size !== w.length;
		};
		if (form.USDTInfo?.length > 1 && checkIfDuplicateExists()) {
			setPopBox({
				isOpen: true,
				title: i18n.lbl_ImportantNote,
				content: i18n.lbl_DuplicateAddress,
				hideCloseBtn: false
			});
			return;
		}
		api.accountStrict
			.SetCustUSDTInfoBatch(form)
			.then(res => {
				if (res.data.errorCode === 0) {
					setForm({
						AccountName: "",
						USDTInfo: []
					});
					setShowAddWallet(false);
					setPopBox({
						isOpen: true,
						title: i18n.lbl_ImportantNote,
						content: res.data.message,
						hideCloseBtn: false
					});
					setUserInfo(prevState => ({
						...prevState,
						accountName: form.AccountName
					}));
					api.account
						.GetCustBankInfo()
						.then(r => {
							if (r.data.data) {
								setWalletInfo(r.data.data);
							}
						})
						.catch(err => console.error(err));
				} else {
					setPopBox({
						isOpen: true,
						title: i18n.lbl_ImportantNote,
						content: res.data.message,
						hideCloseBtn: false
					});
				}
			})
			.catch(err => {
				setPopBox({
					isOpen: true,
					title: i18n.lbl_ImportantNote,
					content: err.response.data.title,
					hideCloseBtn: false
				});
			});
	};

	const validate = ({ e, col, index }) => {
		const { value } = e.target;
		if (col === "USDTAddress" && value?.length > 0) {
			const valid = WAValidator.validate(value, "usdt");
			setValid(prev => {
				prev[index][col].stat = valid;
				prev[index][col].msg = valid ? "" : i18n.lbl_NotERC20WalletAddr;
				return {
					...prev
				};
			});
			setSubmitDisabled(!valid);
		} else if (col === "RealName") {
			setSubmitDisabled(!value);
		} else if (col === "USDTAddress" && value?.length === 0) {
			setValid(prev => {
				prev[index][col] = {
					msg: "",
					stat: null
				};
				return {
					...prev
				};
			});
		}
	};

	const onChange = ({ e, col, index }) => {
		const { value } = e.target;
		if (col !== "AccountName") {
			setForm(prev => {
				if (!prev.USDTInfo[index]) {
					prev.USDTInfo[index] = {};
				}
				prev.USDTInfo[index][col] = value;
				prev.USDTInfo = prev.USDTInfo.filter(
					el => el.USDTAddress !== ""
				);
				return {
					...prev
				};
			});
		} else {
			setForm(prev => {
				prev[col] = value;
				return {
					...prev
				};
			});
		}
	};
	useEffect(() => {
		api.account
			.GetCustBankInfo()
			.then(res => {
				if (res.data.data) {
					setWalletInfo(res.data.data);
				}
			})
			.catch(err => console.error(err));
	}, []);
	const wallets = walletInfo?.uSDTDetail?.map(item => (
		<div key={item.usdtAddress} className="account">
			<div className="nickName">{item.nickName}</div>
			<div className="icon icon-BTC">{item.usdtAddress}</div>
		</div>
	));
	return (
		<>
			{walletInfo.accountName && (
				<>
					<div className="icon icon-member">
						<div className="circleAnimation" />
					</div>
					<div className="name">{walletInfo.accountName}</div>
					<div className="text-center text-gray">
						{i18n.lbl_CryptoWalletTip1}
					</div>
				</>
			)}
			<div className="btn-group">
				{!walletInfo?.uSDTDetail && !showAddWallet && (
					<button
						className="icon icon-plus"
						onClick={() => setShowAddWallet(true)}>
						{i18n.lbl_Add_Crypto_Wallet}
					</button>
				)}
			</div>
			<div className="bankAccount">{wallets}</div>
			{showAddWallet && (
				<>
					{!walletInfo?.accountName && (
						<InputBox
							value={form.AccountName}
							icon="icon-member"
							warningMsg={isValid.AccountName?.msg}
							btnStatus={isValid.AccountName?.stat}
							placeholder={i18n.msg_EnterRealName}
							onChange={e => onChange({ e, col: "AccountName" })}
							onBlur={e => validate({ e, col: "AccountName" })}
							clickInfo={() => showTipHandler("RealName")}
							showTips={showTips.includes("RealName")}
							infoText={i18n.lbl_BankAccountNameHint}
						/>
					)}
					<div className="account">
						<InputBox
							value={form.USDTInfo?.[0]?.NickName}
							icon="icon-member"
							warningMsg={isValid[0]?.NickName?.msg}
							btnStatus={isValid[0]?.NickName?.stat}
							placeholder={`${i18n.lbl_CryptoWalletNickName}(${i18n.lbl_Optional})`}
							onChange={e =>
								onChange({ e, col: "NickName", index: 0 })
							}
							onBlur={e =>
								validate({ e, col: "NickName", index: 0 })
							}
							clickInfo={() => showTipHandler("NickName0")}
							showTips={showTips.includes("NickName0")}
							infoText={i18n.lbl_Wallet_Nickname_Tip}
						/>
						<InputBox
							value={form.USDTInfo?.[0]?.USDTAddress}
							icon="icon-newspaper"
							warningMsg={isValid[0]?.USDTAddress?.msg}
							btnStatus={isValid[0]?.USDTAddress?.stat}
							placeholder={i18n.lbl_CryptoWalletAddress}
							onChange={e =>
								onChange({ e, col: "USDTAddress", index: 0 })
							}
							onBlur={e =>
								validate({ e, col: "USDTAddress", index: 0 })
							}
							clickInfo={() => showTipHandler("Address0")}
							showTips={showTips.includes("Address0")}
							infoText={i18n.lbl_Wallet_Address_Tip}
						/>
					</div>
					<div className="account">
						<InputBox
							value={form.USDTInfo?.[1]?.NickName}
							icon="icon-member"
							warningMsg={isValid[1]?.NickName?.msg}
							btnStatus={isValid[1]?.NickName?.stat}
							placeholder={`${i18n.lbl_CryptoWalletNickName}(${i18n.lbl_Optional})`}
							onChange={e =>
								onChange({ e, col: "NickName", index: 1 })
							}
							onBlur={e =>
								validate({ e, col: "NickName", index: 1 })
							}
							clickInfo={() => showTipHandler("NickName1")}
							showTips={showTips.includes("NickName1")}
							infoText={i18n.lbl_Wallet_Nickname_Tip}
						/>
						<InputBox
							value={form.USDTInfo?.[1]?.USDTAddress}
							icon="icon-newspaper"
							warningMsg={isValid[1]?.USDTAddress?.msg}
							btnStatus={isValid[1]?.USDTAddress?.stat}
							placeholder={i18n.lbl_CryptoWalletAddress}
							onChange={e =>
								onChange({ e, col: "USDTAddress", index: 1 })
							}
							onBlur={e =>
								validate({ e, col: "USDTAddress", index: 1 })
							}
							clickInfo={() => showTipHandler("Address1")}
							showTips={showTips.includes("Address1")}
							infoText={i18n.lbl_Wallet_Address_Tip}
						/>
					</div>
					<div className="account">
						<InputBox
							value={form.USDTInfo?.[2]?.NickName}
							icon="icon-member"
							warningMsg={isValid[2]?.NickName?.msg}
							btnStatus={isValid[2]?.NickName?.stat}
							placeholder={`${i18n.lbl_CryptoWalletNickName}(${i18n.lbl_Optional})`}
							onChange={e =>
								onChange({ e, col: "NickName", index: 2 })
							}
							onBlur={e =>
								validate({ e, col: "NickName", index: 2 })
							}
							clickInfo={() => showTipHandler("NickName2")}
							showTips={showTips.includes("NickName2")}
							infoText={i18n.lbl_Wallet_Nickname_Tip}
						/>
						<InputBox
							value={form.USDTInfo?.[2]?.USDTAddress}
							icon="icon-newspaper"
							warningMsg={isValid[2]?.USDTAddress?.msg}
							btnStatus={isValid[2]?.USDTAddress?.stat}
							placeholder={i18n.lbl_CryptoWalletAddress}
							onChange={e =>
								onChange({ e, col: "USDTAddress", index: 2 })
							}
							onBlur={e =>
								validate({ e, col: "USDTAddress", index: 2 })
							}
							clickInfo={() => showTipHandler("Address2")}
							showTips={showTips.includes("Address2")}
							infoText={i18n.lbl_Wallet_Address_Tip}
						/>
					</div>
					<div className="text">
						{i18n.lbl_Crypto_Wallet_Submit_Note}
					</div>
					<div className="text">
						{i18n.lbl_Modification_Please_Contact_CSD}
					</div>
				</>
			)}

			<div className="btn-group">
				{!walletInfo?.uSDTDetail && showAddWallet && (
					<>
						<button
							className="cancel"
							onClick={() => setShowAddWallet(false)}>
							{i18n.lbl_Cancel}
						</button>
						<button
							className={`submit${disabledSubmit ? " gray" : ""}`}
							disabled={disabledSubmit}
							onClick={onSubmit}>
							{i18n.lbl_Submit}
						</button>
					</>
				)}
			</div>
		</>
	);
};

export default CryptoWallet;
