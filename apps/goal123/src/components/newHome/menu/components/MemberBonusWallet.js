import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { api_account_GetCustBonusWallet } from "apps/goal123/src/service/api/account";
import { number_format } from "../../utils/homeFormatter";

const MemberBonusWallet = () => {
	const [bonusWallets, setBonusWallets] = useState([]);
	const { t } = useTranslation();

	const GetBonusBalanced = async () => {
		try {
			const res = await api_account_GetCustBonusWallet();
			if (res && res.data && Array.isArray(res.data.data)) {
				setBonusWallets(res.data.data);
			} else {
				setBonusWallets([]);
			}
		} catch (error) {
			setBonusWallets([]);
		}
	};

	useEffect(() => {
		GetBonusBalanced();
	}, []);

	return (
		<>
			{bonusWallets.map(item => {
				const percentage =
					item.turnover > 0
						? ((item.turnover / item.rollover) * 100).toFixed(2)
						: "0.00";
				const { promoCategoryId, bonus, tpId } = item;

				return (
					<div
						key={`header-bonuswallet-${tpId}`}
						className="wallet-bouns">
						<div className="bouns-data">
							<span className="title">
								{t(`lbl_BonusWallet_${promoCategoryId}`)}
							</span>
							<span className="bouns-cash">
								{number_format({ number: bonus })}
							</span>
						</div>
						<div className="progress">
							<div className="progress-bar">
								<div
									className="bar"
									style={{ width: `${percentage}%` }}
								/>
							</div>
							<div className="percentage">{percentage}%</div>
						</div>
					</div>
				);
			})}
		</>
	);
};

export default MemberBonusWallet;
