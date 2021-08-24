import React from "react";
import PropTypes from "prop-types";
import { number_format } from "../common/common";
import ReloadSpin from "../common/reloadSpin";

const WalletPanel = ({ i18n, walletInfo, GetBalance, GetTpWalletBalance }) => {
	const arr = walletInfo
		.filter(wallet => {
			return wallet.balance !== null;
		})
		.map((item, idx) => {
			return (
				<div className="depositInBox" key={`wallets-${item.id}`}>
					<div className="text">
						<p>
							<span
								className={`icon icon-icon32px_${
									idx === 0
										? "Main-Wallet"
										: "Sportsbook-Wallet"
								}`}
							/>
							{item.tpName?.toUpperCase() ??
								i18n[item.displayKey]?.toUpperCase()}
						</p>
						<p>{number_format(item.balance, false)}</p>
					</div>
					<div className="btn-group">
						<ReloadSpin
							func={
								item.id === 0
									? GetBalance
									: GetTpWalletBalance.bind(this, item.id)
							}
							className="blue icon icon-spinner11 clickBtn"
						/>
					</div>
				</div>
			);
		});

	return (
		<div className="restoreBox">
			<div className="restoreBox-left">{arr}</div>
		</div>
	);
};

WalletPanel.defaultProps = {
	i18n: {},
	walletInfo: []
};

WalletPanel.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string),
	walletInfo: PropTypes.arrayOf(PropTypes.object),
	GetBalance: PropTypes.func.isRequired,
	GetTpWalletBalance: PropTypes.func.isRequired
};

export default WalletPanel;
