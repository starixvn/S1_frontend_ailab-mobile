import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "@reach/router";
import { i18nContext, userInfoContext, popBoxContext } from "../common/context";
import { defPopBoxType } from "../common/popbox";
import path from "../../path";
import { api_DelCustUSDTInfo } from "../../service/api/accountStrict";
import { api_GetCustBankInfo } from "../../service/api/account";
import Member from "../../pages/member";

export default () => (
	<Member>
		<CryptoWallet />
	</Member>
);

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
		api_GetCustBankInfo().then(
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

	const delUSDTwallet = ({
		USDTAddress,
		NickName,
		AccountName,
		CurrencyId
	}) => {
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
								AccountName,
								CurrencyId
							})
						}>
						{i18n.lbl_Yes}
					</button>
					<button
						className="orange"
						onClick={() => setPopBox({ isOpen: false })}>
						{i18n.lbl_No}
					</button>
				</div>
			)
		});
	};

	const removeAccount = ({
		USDTAddress,
		NickName,
		AccountName,
		CurrencyId
	}) => {
		api_DelCustUSDTInfo({ USDTAddress, NickName, AccountName, CurrencyId })
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
		const closePopbox = url => {
			if (typeof url === "string") navigate(url);
			setPopBox({ isOpen: false });
		};
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
							className="orange"
							onClick={() => closePopbox(`/${path.member.root}`)}>
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
				GetCustBankInfo,
				className: "cryptoAddpop active"
			});
		}
	};

	useEffect(() => {
		GetCustBankInfo();
	}, []);

	const wallets = walletInfo?.map(item => (
		<div key={item.usdtAddress} className="account">
			<div className="nickname">{item.nickName}</div>
			<div className="nickname">
				{item.currencyName === item.network
					? item.currencyName
					: `${item.currencyName}-${item.network}`}
			</div>
			<div className="icon icon-crypto">{item.usdtAddress}</div>
			<button
				onClick={() =>
					delUSDTwallet({
						USDTAddress: item.usdtAddress,
						NickName: item.nickName,
						AccountName: userInfo.accountName,
						CurrencyId: item.currencyId
					})
				}
				className="icon icon-bin clickBtn"
			/>
		</div>
	));
	return (
		<>
			<div className="avatar" />
			<div className="name">{userInfo.accountName}</div>
			{userInfo.accountName ? (
				<div className="text-org" data-testid="accountNameTip">
					{i18n.lbl_ContactCSD}
				</div>
			) : null}
			{/* <div className="text-center text-gray">
				{i18n.lbl_CryptoWalletTip1}
			</div> */}

			{(wallets?.length < 3 || !wallets) && (
				<div className="btn-group">
					<button className="orange" onClick={addCryptoWallet}>
						<i className="icon icon-user-plus" />
						{i18n.lbl_Add_Crypto_Wallet}
					</button>
				</div>
			)}
			{wallets?.length > 0 && (
				<>
					<div className="smallTitle">
						<i className="icon icon-library" />
						{i18n.lbl_BankAccount}
					</div>
					<div className="bankAccount">{wallets}</div>
				</>
			)}
		</>
	);
};
