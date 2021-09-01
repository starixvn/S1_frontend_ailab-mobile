import React, { useContext, useState } from "react";
import { userInfoContext } from "../common/context";
import { number_format, isConvert } from "../common/common";
import ReloadSpin from "../common/reloadSpin";

export default ({ i18n, availableBalance, GetWithdrawalAvailableBalance }) => {
	const { userInfo } = useContext(userInfoContext);
	const [realNameTip, setRealNameTip] = useState("");
	const _isConvert = isConvert(userInfo.currencyId);

	const showRealNameTip = () => {
		const tip = realNameTip === "" ? i18n.lbl_ContactCSD : "";
		setRealNameTip(tip);
	};

	return (
		<div className="walletModule">
			<div className="walletBalanceModule">
				<span className="icon icon-icon32px_money">
					{i18n.lbl_EligibleWithdrawalAmount}
				</span>
				<span>{number_format(availableBalance, _isConvert, 0)}</span>
				<ReloadSpin
					func={GetWithdrawalAvailableBalance}
					btnActive={false}
				/>
			</div>
			{userInfo.accountName ? (
				<>
					<div className="walletBalanceModule">
						<span className="icon icon-icon32px_Profile">
							{i18n.lbl_BankAccountName}
						</span>
						<span>{userInfo?.accountName}</span>
						<button
							className="icon icon-information-solid"
							onClick={showRealNameTip}
						/>
					</div>
					<div className={`tip${realNameTip ? " open" : ""}`}>
						{realNameTip}
					</div>
				</>
			) : null}
		</div>
	);
};
