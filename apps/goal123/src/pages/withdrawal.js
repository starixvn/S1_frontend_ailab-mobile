import React, { useContext } from "react";
import { useLocation, useNavigate } from "@reach/router";
import TabPage from "../components/common/tabPage";
import path from "../path";
import Layout from "../components/common/layout";
import {
	i18nContext,
	eWalletContext,
	withdrawalBlockSettingContext
} from "../components/common/context";

const defTabs = {
	default: {
		to: `/${path.withdrawal.root}`,
		displayKey: "lbl_Withdrawal",
		excludeMath: path.withdrawal.sub.history.root,
		type: 1
	},
	History: {
		to: path.withdrawal.sub.history.root,
		displayKey: "lbl_WithdrawalHistory"
	},
	eWallet: {
		to: path.withdrawal.sub.eWalletWithdrawal.root,
		displayKey: "lbl_EWalletWithdrawal",
		type: 3
	},
	Crypto: {
		to: path.withdrawal.sub.cryptoWithdrawal.root,
		displayKey: "lbl_CryptoWithdrawal",
		type: 4
	}
};

const IndexPage = props => {
	const navigate = useNavigate();
	const location = useLocation();
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

	const filteredSettingTabs = Object.fromEntries(
		Object.entries(filteredDefTabs()).filter(([_, tabs]) => {
			if (!tabs.type) return true;
			const result = withdrawalSettingTypeList.find(typeEnum => {
				return typeEnum.type === tabs.type;
			})?.status;
			return result;
		})
	);

	// * 因有現在會從後台關閉頁面 但有固定預設進入點 withdrawal(bank card) 頁面會顯示空白頁面
	// * 故在頁面在 withdrawal(bank card) 時且後台關閉 withdrawal(bank card) 做導轉
	if (
		location.pathname.split("/")[2] === path.withdrawal.root &&
		Object.keys(filteredSettingTabs)?.length !== 0 &&
		!Object.hasOwn(filteredSettingTabs, "default")
	) {
		navigate(
			`/${userInfo.langId}/${Object.values(filteredSettingTabs)[0]?.to}`
		);
	}

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
