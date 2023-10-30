import React, { useContext } from "react";
import TabPage from "../components/common/tabPage";
import path from "../path";
import Layout from "../components/common/layout";
import {
	i18nContext,
	withdrawalBlockSettingContext
} from "../components/common/context";

const defTabs = {
	default: {
		to: `/${path.member.root}`,
		displayKey: "lbl_Profile",
		excludeMath: path.member.sub.bankInfo.root
	},
	referral: {
		to: `/${path.referral.root}`,
		displayKey: "lbl_Referral"
	},
	bankInfo: {
		to: `/${path.member.root}/${path.member.sub.bankInfo.root}`,
		displayKey: "lbl_BankInfo",
		type: 1
	},
	eWallet: {
		to: `/${path.eWallet.root}`,
		displayKey: "lbl_EWallet",
		type: 3
	},
	cryptoWallet: {
		to: `/${path.cryptoWallet.root}`,
		displayKey: "lbl_CryptoWallet",
		type: 4
	}
};

const IndexPage = props => {
	const { i18n } = useContext(i18nContext);
	const { withdrawalSettingTypeList } = useContext(
		withdrawalBlockSettingContext
	);

	// * 這裡的篩選是從後台 payment Gateway --> Withdrawal Option Status
	// * 因有多個參數控制同個元件的情形 ex:isShowEWallet 所以這裡分開寫

	const filteredSettingTabs = Object.fromEntries(
		Object.entries(defTabs).filter(([_, tabs]) => {
			if (!tabs.type) return true;
			const result = withdrawalSettingTypeList?.find(typeEnum => {
				return typeEnum.type === tabs.type;
			})?.status;
			return result;
		})
	);

	return (
		<Layout title={i18n.lbl_MyAccount}>
			<TabPage defTabs={filteredSettingTabs}>{props.children}</TabPage>
		</Layout>
	);
};

export default IndexPage;
