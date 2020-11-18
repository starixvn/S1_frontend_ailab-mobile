import React from "react";
import { number_format } from "../common/common";
import ReloadSpin from "../common/reloadSpin";

export default ({ i18n, walletInfo, restoreAll, GetWalletInfo }) => {
	let arr = walletInfo.map((item, idx) => {
		return (
			<div className="depositInBox" key={`wallets-${item.id}`}>
				<div className="text">
					<p>
						<span
							className={`icon icon-icon32px_${
								idx === 0 ? "Main-Wallet" : "Sportsbook-Wallet"
							}`}></span>
						{i18n[item.displayKey].toUpperCase()}
					</p>
					<p>{number_format(item.balance, true)}</p>
				</div>
				<div className="btn-group">
					<button
						className="blue"
						onClick={restoreAll.bind(this, idx)}>
						{i18n["lbl_RestoreAll"]}
					</button>
				</div>
			</div>
		);
	});

	return (
		<div className="restoreBox">
			<div className="restoreBox-left">{arr}</div>
			<div className="restoreBox-right">
				<ReloadSpin func={GetWalletInfo} />
			</div>
		</div>
	);
};
