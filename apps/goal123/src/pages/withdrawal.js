import React, { useContext, useEffect } from "react";
import { useNavigate } from "@reach/router";
import TabPage from "../components/common/tabPage";
import path from "../path";
import Layout from "../components/common/layout";
import {
	i18nContext,
	eWalletContext,
	withdrawalBlockSettingContext
} from "../components/common/context";
import { defWithdrawalSettingType } from "../components/common/common";

const defTabs = {
	default: {
		to: `${path.withdrawal.root}`,
		displayKey: "lbl_Withdrawal",
		excludeMath: path.withdrawal.sub.history.root,
		type: defWithdrawalSettingType.bankInfo
	},
	History: {
		to: path.withdrawal.sub.history.root,
		displayKey: "lbl_WithdrawalHistory"
	},
	eWallet: {
		to: path.withdrawal.sub.eWalletWithdrawal.root,
		displayKey: "lbl_EWalletWithdrawal",
		type: defWithdrawalSettingType.eWallet
	},
	Crypto: {
		to: path.withdrawal.sub.cryptoWithdrawal.root,
		displayKey: "lbl_CryptoWithdrawal",
		type: defWithdrawalSettingType.cryptoWallet
	}
};

const IndexPage = props => {
	const navigate = useNavigate();
	const { i18n } = useContext(i18nContext);
	const { isShowEWallet } = useContext(eWalletContext);
	const { withdrawalSettingTypeList } = useContext(
		withdrawalBlockSettingContext
	);

	const filteredDefTabs = () => {
		if (!isShowEWallet) {
			const { eWallet, ...restTabs } = defTabs;
			return restTabs;
		}

		return defTabs;
	};

	// * 這裡的篩選是從後台 payment Gateway --> Withdrawal Option Status
	// * 因有多個參數控制同個元件的情形 ex:isShowEWallet 所以這裡分開寫

	const filteredSettingTabs = Object.entries(filteredDefTabs())
		.filter(([_, tabs]) => {
			if (!tabs.type) return true;
			const result = withdrawalSettingTypeList?.find(typeEnum => {
				return typeEnum.type === tabs.type;
			})?.status;
			return result;
		})
		?.reduce((acc, cur) => {
			return { ...acc, [cur[0]]: { ...cur[1] } };
		}, {});

	useEffect(() => {
		const validWithdrawlType = withdrawalSettingTypeList.find(
			({ status }) => status
		)?.type;

		let withdrawalPath = "";

		switch (validWithdrawlType) {
			case defWithdrawalSettingType.bankInfo:
				withdrawalPath = path.withdrawal.root;
				break;
			case defWithdrawalSettingType.cryptoWallet:
				withdrawalPath = `${path.withdrawal.root}/${path.withdrawal.sub.cryptoWithdrawal.root}`;
				break;
			case defWithdrawalSettingType.eWallet:
				withdrawalPath = `${path.withdrawal.root}/${path.withdrawal.sub.eWalletWithdrawal.root}`;
				break;
			default:
				withdrawalPath = `${path.withdrawal.root}/${path.withdrawal.sub.history.root}`;
				break;
		}

		navigate(`/${withdrawalPath}`);
	}, [withdrawalSettingTypeList.length]);

	return (
		<Layout title={i18n.lbl_Withdrawal}>
			<TabPage
				defTabs={filteredSettingTabs}
				multipleExclude={true}
				showScroll={true}>
				{props.children}
			</TabPage>
		</Layout>
	);
};

export default IndexPage;
