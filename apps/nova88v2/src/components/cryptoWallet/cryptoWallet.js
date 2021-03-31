import React, { useContext, useEffect, useState } from "react";
import { i18nContext, userInfoContext, popBoxContext } from "../common/context";
import api from "../../service/api";

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
	const onSubmit = () => {
		api.accountStrict
			.SetCustUSDTInfo(form)
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
				setPopBox({
					isOpen: true,
					title: i18n.lbl_ImportantNote,
					content: err,
					hideCloseBtn: false
				});
			});
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
			{/* {showAddWallet && (
				<> */}
			<div className="infoModule">
				<div className="inputInfo">xxxxxx</div>
				<div className="inputBox">
					<i className="icon icon-member" />
					<input
						onChange={e =>
							onChange({ e, col: "NickName", index: 0 })
						}
						placeholder={i18n.lbl_CryptoWalletNickName}
					/>
				</div>
			</div>
			<div className="infoModule">
				<div className="inputInfo">xxxxxx</div>
				<div className="inputBox">
					<i className="icon icon-newspaper" />
					<input
						onChange={e =>
							onChange({ e, col: "USDTAddress", index: 0 })
						}
						placeholder={i18n.lbl_CryptoWalletAddress}
					/>
				</div>
			</div>
			<div className="infoModule">
				<div className="inputInfo">xxxxxx</div>
				<div className="inputBox">
					<i className="icon icon-member" />
					<input
						onChange={e =>
							onChange({ e, col: "NickName", index: 1 })
						}
						placeholder={i18n.lbl_CryptoWalletNickName}
					/>
				</div>
			</div>
			<div className="infoModule">
				<div className="inputInfo">xxxxxx</div>
				<div className="inputBox">
					<i className="icon icon-newspaper" />
					<input
						onChange={e =>
							onChange({ e, col: "USDTAddress", index: 1 })
						}
						placeholder={i18n.lbl_CryptoWalletAddress}
					/>
				</div>
			</div>
			<div className="infoModule">
				<div className="inputInfo">xxxxxx</div>
				<div className="inputBox">
					<i className="icon icon-member" />
					<input
						onChange={e =>
							onChange({ e, col: "NickName", index: 2 })
						}
						placeholder={i18n.lbl_CryptoWalletNickName}
					/>
				</div>
			</div>
			<div className="infoModule">
				<div className="inputInfo">xxxxxx</div>
				<div className="inputBox">
					<i className="icon icon-newspaper" />
					<input
						onChange={e =>
							onChange({ e, col: "USDTAddress", index: 2 })
						}
						placeholder={i18n.lbl_CryptoWalletAddress}
					/>
				</div>
			</div>
			<div className="text">{i18n.lbl_CryptoWalletTip2}</div>
			{/* </>
			)} */}

			<div className="btn-group">
				{/* {walletInfo?.length === 0 && showAddWallet && (
					<> */}
				<button
					className="cancel"
					onClick={() => setShowAddWallet(false)}>
					{i18n.lbl_Cancel}
				</button>
				<button className="submit" onClick={onSubmit}>
					{i18n.lbl_Submit}
				</button>
				{/* </>
				)} */}
			</div>
		</>
	);
};

export default CryptoWallet;
