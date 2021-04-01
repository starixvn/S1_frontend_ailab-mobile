import React, { useContext, useEffect, useState } from "react";
import WAValidator from "multicoin-address-validator";
import { i18nContext, userInfoContext, popBoxContext } from "../common/context";
import api from "../../service/api";
import InputBox from "../common/inputbox.hint";

const CryptoWallet = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const [showAddWallet, setShowAddWallet] = useState(false);
	const { setPopBox } = useContext(popBoxContext);
	const [walletInfo, setWalletInfo] = useState([]);
	const [form, setForm] = useState({
		AccountName: userInfo.userName,
		USDTInfo: [{}, {}, {}]
	});
	const [disabledSubmit, setSubmitDisabled] = useState(true);
	//	submit的時候檢查是否至少有填一筆address
	//
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
		}
	]);

	const onSubmit = () => {
		api.accountStrict
			.SetCustUSDTInfoBatch(form)
			.then(res => {
				if (res.data.errorCode === 0) {
					setForm({
						AccountName: userInfo.userName,
						USDTInfo: [{}, {}, {}]
					});
					setPopBox({
						isOpen: true,
						title: i18n.lbl_ImportantNote,
						content: res.data.message,
						hideCloseBtn: false
					});
					api.account
						.GetCustBankInfo()
						.then(r => {
							if (r.data.data.uSDTDetail) {
								setWalletInfo(r.data.data.uSDTDetail);
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
				console.log(err);
				setPopBox({
					isOpen: true,
					title: i18n.lbl_ImportantNote,
					content: err,
					hideCloseBtn: false
				});
			});
	};

	const validate = ({ e, col, index }) => {
		const { value } = e.target;
		if (col === "USDTAddress") {
			const valid = WAValidator.validate(value, "usdt");
			setValid(prev => {
				prev[index][col].stat = valid;
				prev[index][col].msg = valid ? "" : i18n.lbl_InvalidAddress;
				return {
					...prev
				};
			});
			setSubmitDisabled(!valid);
		}
	};

	const onChange = ({ e, col, index }) => {
		const { value } = e.target;
		setForm(prev => {
			prev.USDTInfo[index][col] = value;
			return {
				...prev
			};
		});
	};
	useEffect(() => {
		api.account
			.GetCustBankInfo()
			.then(res => {
				if (res.data.data.uSDTDetail) {
					setWalletInfo(res.data.data.uSDTDetail);
				}
			})
			.catch(err => console.error(err));
	}, []);
	// submit時檢查至少要填一個合法的位址
	// 否則醒目提示第一個address input
	//
	const wallets = walletInfo.map(item => (
		<div key={item.usdtAddress} className="account">
			<div className="icon icon-BTC">{item.usdtAddress}</div>
		</div>
	));
	return (
		<>
			<div className="icon icon-member">
				<div className="circleAnimation" />
			</div>
			<div className="name">{userInfo.userName}</div>
			<div className="text-center text-gray">
				{i18n.lbl_CryptoWalletTip1}
			</div>

			<div className="btn-group">
				{walletInfo?.length === 0 && !showAddWallet && (
					<button
						className="icon icon-plus"
						onClick={() => setShowAddWallet(true)}>
						{i18n.lbl_AddNewAccount}
					</button>
				)}
			</div>

			<div className="text-center icon icon-BTC">
				{i18n.lbl_CryptoWallet}
			</div>
			<div className="bankAccount">{wallets}</div>
			{showAddWallet && (
				<>
					<InputBox
						value={form.USDTInfo[0]?.NickName}
						icon="icon-member"
						showInfoIcon={false}
						warningMsg={isValid[0]?.NickName?.msg}
						btnStatus={isValid[0]?.NickName?.stat}
						placeholder={i18n.lbl_CryptoWalletNickName}
						onChange={e =>
							onChange({ e, col: "NickName", index: 0 })
						}
						onBlur={e => validate({ e, col: "NickName", index: 0 })}
					/>
					<InputBox
						value={form.USDTInfo[0]?.USDTAddress}
						icon="icon-newspaper"
						showInfoIcon={false}
						warningMsg={isValid[0]?.USDTAddress?.msg}
						btnStatus={isValid[0]?.USDTAddress?.stat}
						placeholder={i18n.lbl_CryptoWalletAddress}
						onChange={e =>
							onChange({ e, col: "USDTAddress", index: 0 })
						}
						onBlur={e =>
							validate({ e, col: "USDTAddress", index: 0 })
						}
					/>
					<InputBox
						value={form.USDTInfo[1]?.NickName}
						icon="icon-member"
						showInfoIcon={false}
						warningMsg={isValid[1]?.NickName?.msg}
						btnStatus={isValid[1]?.NickName?.stat}
						placeholder={i18n.lbl_CryptoWalletNickName}
						onChange={e =>
							onChange({ e, col: "NickName", index: 1 })
						}
						onBlur={e => validate({ e, col: "NickName", index: 1 })}
					/>
					<InputBox
						value={form.USDTInfo[1]?.USDTAddress}
						icon="icon-newspaper"
						showInfoIcon={false}
						warningMsg={isValid[1]?.USDTAddress?.msg}
						btnStatus={isValid[1]?.USDTAddress?.stat}
						placeholder={i18n.lbl_CryptoWalletAddress}
						onChange={e =>
							onChange({ e, col: "USDTAddress", index: 1 })
						}
						onBlur={e =>
							validate({ e, col: "USDTAddress", index: 1 })
						}
					/>
					<InputBox
						value={form.USDTInfo[2]?.NickName}
						icon="icon-member"
						showInfoIcon={false}
						warningMsg={isValid[2]?.NickName?.msg}
						btnStatus={isValid[2]?.NickName?.stat}
						placeholder={i18n.lbl_CryptoWalletNickName}
						onChange={e =>
							onChange({ e, col: "NickName", index: 2 })
						}
						onBlur={e => validate({ e, col: "NickName", index: 2 })}
					/>
					<InputBox
						value={form.USDTInfo[2]?.USDTAddress}
						icon="icon-newspaper"
						showInfoIcon={false}
						warningMsg={isValid[2]?.USDTAddress?.msg}
						btnStatus={isValid[2]?.USDTAddress?.stat}
						placeholder={i18n.lbl_CryptoWalletAddress}
						onChange={e =>
							onChange({ e, col: "USDTAddress", index: 2 })
						}
						onBlur={e =>
							validate({ e, col: "USDTAddress", index: 2 })
						}
					/>
					<div className="text">{i18n.lbl_CryptoWalletTip2}</div>
				</>
			)}

			<div className="btn-group">
				{walletInfo?.length === 0 && showAddWallet && (
					<>
						<button
							className="cancel"
							onClick={() => setShowAddWallet(false)}>
							{i18n.lbl_Cancel}
						</button>
						<button
							className="submit"
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
