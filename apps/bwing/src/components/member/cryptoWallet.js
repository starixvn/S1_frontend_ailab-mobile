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
import { api_DelCustCryptoWallet } from "../../service/api/accountStrict";
import { api_GetCustBankInfo } from "../../service/api/account";
import { defLevelList } from "../vip/def";
import { WITHDRAWAL_BLOCK_SETTING_TYPE } from "../../datas/withdrawalSetting";

const CryptoWallet = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { withdrawalSettingTypeList } = useContext(
		withdrawalBlockSettingContext
	);
	const [tip, setTip] = useState(false);
	const levelInfo = userInfo.userLevel
		? defLevelList[Number(userInfo.userLevel) - 1]
		: {};
	const levelName = i18n[levelInfo?.levelName];
	const { setPopBox } = useContext(popBoxContext);
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

	const delUSDTwallet = ({ currencyId, network, address, nickName }) => {
		setPopBox({
			isOpen: true,
			title: i18n.lbl_ImportantNote,
			content: i18n.lbl_CheckConfirm,
			hasBtn: true,
			btnBar: (
				<div className="btn-group">
					<button
						className="Cancel"
						onClick={() =>
							removeAccount({
								currencyId,
								network,
								address,
								nickName
							})
						}>
						{i18n.lbl_Yes}
					</button>
					<button
						className="blue"
						onClick={() => setPopBox({ isOpen: false })}>
						{i18n.lbl_No}
					</button>
				</div>
			)
		});
	};

	const removeAccount = ({ currencyId, network, address, nickName }) => {
		api_DelCustCryptoWallet({ currencyId, network, address, nickName })
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
							className="blue"
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
				className: "addCryptoPop active"
			});
		}
	};

	useEffect(() => {
		GetCustBankInfo();
	}, []);

	const wallets = walletInfo?.map(item => (
		<div key={item.usdtAddress} className="cryptoCard">
			<div className="cryptoName">
				<div className="icon icon-USDT">
					<span>{item.nickName}</span>
					<span>
						{item.currencyName === item.network
							? item.currencyName
							: `${item.currencyName}-${item.network}`}
					</span>
				</div>
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
			<div>{item.usdtAddress}</div>
		</div>
	));

	if (!displayCrypto) return null;

	return (
		<section className="cryptoBox">
			<div className="porfileVip">
				<img src={levelInfo.imgUrl} alt={levelInfo.levelName} />
				<button>{levelName}</button>
			</div>
			{userInfo.accountName && (
				<div className="cryptoInBox">
					<div className="textFlex textArea">
						<p>
							{" "}
							<span className="icon icon-icon32px_Profile" />
							{i18n.lbl_BankAccountName}
						</p>
						<p>
							{userInfo.accountName}
							<span
								onClick={() => setTip(prev => !prev)}
								className="icon icon-information-solid"
							/>
						</p>
					</div>
				</div>
			)}

			{tip && (
				<div data-testid="accountNameTip">
					{i18n.lbl_Crypto_Wallet_Submit_Note}
				</div>
			)}

			{(wallets?.length < 3 || !wallets) && (
				<div className="btn-group">
					<button
						className="blue recentBtn"
						onClick={addCryptoWallet}>
						<i className="icon icon-plus" />
						{i18n.lbl_Add_Crypto_Wallet}
					</button>
				</div>
			)}
			{wallets?.length > 0 && (
				<>
					<div className="depositTitle textLeft borderTop">
						<h1>{i18n.lbl_CryptoWallet}</h1>
						<p>{`${i18n.lbl_Number_Of_Wallet}: ${walletInfo?.length}/3`}</p>
					</div>
					{wallets}
				</>
			)}
		</section>
	);
};

export default CryptoWallet;
