import React from "react";
import path from "../../path";

export default ({ i18n }) => {
	const defTabs = {
		profile: {
			key: "profile",
			displayKey: "lbl_Profile",
			href: path.member.root
		},
		cryptoWallet: {
			key: "cryptoWallet",
			displayKey: "lbl_CryptoWallet",
			href: path.cryptoWallet.root
		}
	};

	const rows = Object.values(defTabs).map(t => (
		<a
			key={`promo-tab-${t.key}`}
			href={t.href}
			className={t.href === path.cryptoWallet.root ? "open" : ""}>
			{i18n[t.displayKey]}
		</a>
	));
	return <div className="tag">{rows}</div>;
};
