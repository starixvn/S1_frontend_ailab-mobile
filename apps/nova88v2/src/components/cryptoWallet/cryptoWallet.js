import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "@reach/router";
import { i18nContext, userInfoContext, popBoxContext } from "../common/context";
import { defPopBoxType } from "../common/popbox";
import path from "../../path";
import api from "../../service/api";

const CryptoWallet = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const [walletInfo, setWalletInfo] = useState([]);
	const navigate = useNavigate();
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const GetCustBankInfo = () => {
		api.account.GetCustBankInfo().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						const resData = res.data?.data;
						if (resData) {
							setUserInfo(prev => ({
								...prev,
								accountName: resData.accountName
							}));
							setWalletInfo(resData.uSDTDetail);
						}
					} else {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: i18n.msg_ApiServerError
						});
					}
				}
			},
			() => {
				if (isMountedRef.current) {
					setPopBox({
						isOpen: true,
						title: i18n.lbl_ImportantNote,
						content: i18n.msg_ApiServerError
					});
				}
			}
		);
	};

	const closePopbox = url => {
		if (typeof url === "string") navigate(url);
		setPopBox({ isOpen: false });
	};

	const delUSDTwallet = ({ USDTAddress, NickName, AccountName }) => {
		setPopBox({
			isOpen: true,
			title: i18n.lbl_ImportantNote,
			content: i18n.lbl_CheckConfirm,
			hasBtn: true,
			btnBar: (
				<div className="btn-group">
					<button
						className="white"
						onClick={() =>
							removeAccount({
								USDTAddress,
								NickName,
								AccountName
							})
						}>
						{i18n.lbl_Yes}
					</button>
					<button className="orange" onClick={closePopbox}>
						{i18n.lbl_No}
					</button>
				</div>
			)
		});
	};

	const removeAccount = ({ USDTAddress, NickName, AccountName }) => {
		api.accountStrict
			.DelCustUSDTInfo({ USDTAddress, NickName, AccountName })
			.then(res => {
				if (res.data.errorCode === 0) {
					GetCustBankInfo();
					setPopBox({ isOpen: false });
				} else {
					setPopBox({
						isOpen: true,
						title: i18n.lbl_ImportantNote,
						content: res.data.message
					});
				}
			})
			.catch(() => {
				setPopBox({
					isOpen: true,
					title: i18n.lbl_ImportantNote,
					content: i18n.msg_ApiServerError
				});
			});
	};

	const addCryptoWallet = () => {
		if (userInfo.isLogin) {
			if (!userInfo.phoneVerified) {
				setPopBox({
					isOpen: true,
					title: i18n.lbl_ImportantNote,
					content: i18n.lbl_Crypto_OTP,
					hasBtn: true,
					hideCloseBtn: true,
					btnBar: (
						<div className="btn-group">
							<button
								onClick={() =>
									closePopbox(
										`/${userInfo.langId}/${path.profile.root}`
									)
								}>
								{i18n.lbl_UpdatePersonalDetail}
							</button>
						</div>
					)
				});
			} else {
				setPopBox({
					title: i18n.lbl_Add_Crypto_Wallet,
					isOpen: true,
					popBoxType: defPopBoxType.AddCryptoWallet,
					GetCustBankInfo
				});
			}
		} else {
			api.accountStrict.GetCustProfile().then(res_custInfo => {
				if (res_custInfo.data.errorCode === 0 && isMountedRef.current) {
					const { data } = res_custInfo.data;
					if (!data.phoneVerified) {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: i18n.lbl_Crypto_OTP,
							hasBtn: true,
							hideCloseBtn: true,
							btnBar: (
								<div className="btn-group">
									<button
										onClick={() =>
											closePopbox(
												`/${userInfo.langId}/${path.profile.root}`
											)
										}>
										{i18n.lbl_UpdatePersonalDetail}
									</button>
								</div>
							)
						});
					} else {
						setPopBox({
							title: i18n.lbl_Add_Crypto_Wallet,
							isOpen: true,
							popBoxType: defPopBoxType.AddCryptoWallet,
							GetCustBankInfo
						});
					}
				}
			});
		}
	};

	useEffect(() => {
		GetCustBankInfo();
	}, []);

	const wallets = walletInfo?.map(item => (
		<div key={item.usdtAddress} className="account">
			<div className="nickName">{item.nickName}</div>
			<div className="icon icon-BTC">{item.usdtAddress}</div>
			<button
				onClick={() =>
					delUSDTwallet({
						USDTAddress: item.usdtAddress,
						NickName: item.nickName,
						AccountName: userInfo.accountName
					})
				}
				className="icon icon-bin clickBtn"
			/>
		</div>
	));
	return (
		<>
			<>
				<div className="icon icon-member">
					<div className="circleAnimation" />
				</div>
				<div className="name">{userInfo.userName}</div>
				<div className="text-center text-gray">
					{i18n.lbl_CryptoWalletTip1}
				</div>
			</>
			{(wallets?.length < 3 || !wallets) && (
				<div className="btn-group">
					<button
						className="icon icon-plus"
						onClick={addCryptoWallet}>
						{i18n.lbl_Add_Crypto_Wallet}
					</button>
				</div>
			)}
			<div className="bankAccount">{wallets}</div>
		</>
	);
};

export default CryptoWallet;
