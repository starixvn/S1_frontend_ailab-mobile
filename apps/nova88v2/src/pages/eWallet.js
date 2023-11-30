import React, { useContext } from "react";
import Layout from "../components/common/layout";
import TabPage, { getMainClass } from "../components/common/tabPage";
import { myWallet } from "../datas/defTabs";
import EWallet from "../components/eWallet/eWallet";
import { withdrawalBlockSettingContext } from "../components/common/context";

const IndexPage = props => {
	const { withdrawalSettingTypeList } = useContext(
		withdrawalBlockSettingContext
	);

	const defTabs = myWallet;

	// * 這裡的篩選是從後台 payment Gateway --> Withdrawal Option Status
	// * 因有多個參數控制同個元件的情形 ex:isShowEWallet 所以這裡分開寫
	const filteredSettingTabs = () => {
		const defTab = JSON.parse(JSON.stringify(defTabs));
		const subTabs = Object.fromEntries(
			Object.entries(defTabs.bankInfo.subTabs).filter(([_, tabs]) => {
				if (!tabs.type) return true;
				const result = withdrawalSettingTypeList?.find(typeEnum => {
					return typeEnum.type === tabs.type;
				})?.status;

				return result;
			})
		);

		defTab.bankInfo.subTabs = subTabs;

		return defTab;
	};

	const header = <TabPage defTabs={filteredSettingTabs()} />;

	return (
		<Layout
			header={header}
			mainClass={getMainClass({
				defTabs: filteredSettingTabs(),
				location: props
			})}>
			<EWallet />
		</Layout>
	);
};

export default IndexPage;
