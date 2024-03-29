import React from "react";
import { useNavigate } from "@reach/router";
import { useTranslation } from "react-i18next";

const MemberTransaction = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	return (
		<div className="member-transaction">
			<div className="transaction-behavior">
				<button
					className="btn-deposit"
					onClick={() => navigate(`/deposit`)}>
					<i className="icon-sidemenu-deposit" />
					{t("lbl_Deposit")}
				</button>
				<button
					className="btn-withdraw"
					onClick={() => navigate(`/withdrawal`)}>
					<i className="icon-sidemenu-withdraw" />
					{t("lbl_Withdrawal")}
				</button>
			</div>
			<div className="transaction-other">
				<button
					className="btn-statement"
					onClick={() => navigate(`/statement`)}>
					<img
						src="https://banner.goal123.org/h5/img/home-page/icon/sidemenu-statement.svg"
						alt="side-menu-statement"
					/>
					<span>
						{t("lbl_Statement")}
					</span>
				</button>
				<button
					className="btn-financial"
					onClick={() => navigate(`/financialLog`)}>
					<img
						src="https://banner.goal123.org/h5/img/home-page/icon/sidemenu-financial.svg"
						alt="side-menu-financial"
					/>
					<span>
						{t("lbl_Financial")}
					</span>
				</button>
				<button
					className="btn-bankinfo"
					onClick={() => navigate(`/bankinfo`)}>
					<img
						src="https://banner.goal123.org/h5/img/home-page/icon/sidemenu-bank.svg"
						alt="side-menu-bank"
					/>
					<span>
						{t("lbl_BankInfo")}
					</span>
				</button>
				<button
					className="btn-crypto"
					onClick={() => navigate(`/cryptoWallet`)}>
					<img
						src="https://banner.goal123.org/h5/img/home-page/icon/sidemenu-crypto.svg"
						alt="crypto-wallet"
					/>
					<span>
						{t("lbl_CryptoWallet")}
					</span>
				</button>
			</div>
		</div>
	);
};

export default MemberTransaction;
