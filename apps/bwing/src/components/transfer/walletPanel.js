import React from "react";
import { number_format } from "../common/common";
import ReloadSpin from "../common/reloadSpin";

export default ({ i18n, walletInfo, GetBalnace, GetTpWalletBalance }) => {
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
							{i18n[item.displayKey]?.toUpperCase()}
						</p>
						<p>{number_format(item.balance, false)}</p>
					</div>
					<div className="btn-group">
						<ReloadSpin
							func={
								item.id === 0
									? GetBalnace
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
