import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "@reach/router";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	withdrawalBlockSettingContext
} from "../common/context";
import { defPopBoxType } from "../common/popbox";
import path from "../../path";
import api from "../../service/api";
import { WITHDRAWAL_BLOCK_SETTING_TYPE } from "../../datas/withdrawalSetting";

const CryptoWallet = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { withdrawalSettingTypeList } = useContext(
		withdrawalBlockSettingContext
	);
	const [walletInfo, setWalletInfo] = useState([]);
	const navigate = useNavigate();
	const isMountedRef = useRef(null);

	const displayCrypto =
		withdrawalSettingTypeList?.find(
			item => item.type === WITHDRAWAL_BLOCK_SETTING_TYPE.Crypto
		)?.status ?? true;

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
	};

	const closePopbox = url => {
		if (typeof url === "string") navigate(url);
		setPopBox({ isOpen: false });
	};

	const delUSDTwallet = ({ address, nickName, currencyId, network }) => {
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
								address,
								nickName,
								currencyId,
								network
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

	const removeAccount = ({ address, nickName, currencyId, network }) => {
		api.accountStrict
			.DelCustCryptoWallet({
				address,
				nickName,
				currencyId,
				network
			})
			.then(res => {
				if (res.data.errorCode === 0) {
					GetCustBankInfo();
					setPopBox({ isOpen: false });
				} else {
					setPopBox({
						isOpen: true,
						content: `[${res.data.errorCode}] ${res.data.message}`
					});
				}
			})
			.catch(() => {
				setPopBox({
					isOpen: true,
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
			api.accountStrict.GetCustProfile().then(
				res_custInfo => {
					if (
						res_custInfo.data.errorCode === 0 &&
						isMountedRef.current
					) {
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
					} else if (res_custInfo.data.errorCode !== 0) {
						setPopBox({
							isOpen: true,
							content: `[${res_custInfo.data.errorCode}] ${res_custInfo.data.message}`
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

	useEffect(() => {
		GetCustBankInfo();
	}, []);

	const wallets = walletInfo?.map(item => (
		<div key={item.usdtAddress} className="account">
			<div className="nickName">{item.nickName}</div>
			<div className="nickName">
				{item.currencyName === item.network
					? item.currencyName
					: `${item.currencyName}-${item.network}`}
			</div>
			<div className="icon icon-BTC">{item.usdtAddress}</div>

			{/* * 暫時隱藏 delete crypto wallet 按鈕，以防止有用戶重複新增刪除帳號來套利，當 risk 評估覺得可以的話有機會再打開 */}
			{/* <button
				onClick={() =>
					delUSDTwallet({
						address: item.usdtAddress,
						nickName: item.nickName,
						currencyId: item.currencyId,
						network: item.network
					})
				}
				className="icon icon-bin clickBtn"
			/> */}
		</div>
	));

	if (!displayCrypto) return null;

	return (
		<>
			{userInfo.accountName && (
				<>
					<div className="icon icon-member" />
					<div className="name">{userInfo.accountName}</div>
					<div className="text-center text-gray">
						{i18n.lbl_Crypto_Wallet_Submit_Note}
					</div>
				</>
			)}
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
