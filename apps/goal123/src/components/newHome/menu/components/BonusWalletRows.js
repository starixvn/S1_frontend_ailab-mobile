import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { api_account_GetCustBonusWallet } from "apps/goal123/src/service/api/account";

const BonusWalletRows = () => {
	const [bonusWalletss, setBonusWalletss] = useState([]);
	const { t } = useTranslation();

	const GetBonusBalanced = async () => {
		try {
			const res = await api_account_GetCustBonusWallet();
			if (res && res.data && Array.isArray(res.data.data)) {
				setBonusWalletss(res.data.data);
			} else {
				setBonusWalletss([]);
			}
		} catch (error) {
			console.error("Error fetching bonus wallets:", error);
			setBonusWalletss([]);
		}
	};

	useEffect(() => {
		GetBonusBalanced();
	}, []);

	const number_format = ({
		number,
		formatRequired = false,
		isConvertRequired = true,
		digits = 2
	}) => {
		let _number = number;
		if (!isNaN(number)) {
			if (isConvertRequired || formatRequired) {
				_number /= 1000;
			}

			if (digits > 0) {
				// 無條件捨去到第二位，避免四捨五入進位
				_number = (
					Math.floor(_number * Math.pow(10, digits)) /
					Math.pow(10, digits).toFixed(digits)
				).toFixed(digits);
			}
		}

		_number += "";
		const arr = _number.split(".");
		const re = /(\d{1,3})(?=(\d{3})+$)/g;

		return `${arr[0].replace(re, "$1,")}${
			digits > 0 && arr.length === 2 ? `.${arr[1]}` : ""
		}${formatRequired ? " ('000)" : ""}`;
	};

	return (
		<>
			{bonusWalletss.map(item => {
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

export default BonusWalletRows;
