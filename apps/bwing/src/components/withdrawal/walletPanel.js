import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { userInfoContext } from "../common/context";
import { number_format, isConvert } from "../common/common";
import ReloadSpin from "../common/reloadSpin";

const WalletPanel = ({
	i18n,
	availableBalance,
	GetWithdrawalAvailableBalance
}) => {
	const { userInfo } = useContext(userInfoContext);
	const [realNameTip, setRealNameTip] = useState("");
	const _isConvert = isConvert(userInfo.currencyId);

	const showRealNameTip = () => {
		const tip = realNameTip === "" ? i18n.lbl_BankAccountHint : "";
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

WalletPanel.defaultProps = {
	i18n: null,
	availableBalance: null,
	GetWithdrawalAvailableBalance: () => null
};

WalletPanel.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string),
	availableBalance: PropTypes.number,
	GetWithdrawalAvailableBalance: PropTypes.func
};

export default WalletPanel;
