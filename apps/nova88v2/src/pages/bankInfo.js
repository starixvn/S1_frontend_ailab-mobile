import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "@reach/router";
import {
	userInfoContext,
	withdrawalBlockSettingContext
} from "../components/common/context";
import BankInfo from "../components/profile/bankInfo";
import Layout from "../components/common/layout";
import { myWallet } from "../datas/defTabs";
import TabPage, { getMainClass } from "../components/common/tabPage";
import CryptoWallet from "../components/cryptoWallet/cryptoWallet";
import path from "../path";
import allowedCurrencyList from "../datas/allowedCurrencyList";

const IndexPage = props => {
	const navigate = useNavigate();
	const { userInfo } = useContext(userInfoContext);
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

	useEffect(() => {
		if (!allowedCurrencyList.bankCard.includes(userInfo.currencyId)) {
			navigate(`/${userInfo.langId}/${path.cryptoWallet.root}`);
		}
	}, []);

	const header = <TabPage defTabs={filteredSettingTabs()} />;
	const { prevPage } = props?.location?.state || "";

	return (
		<Layout
			header={header}
			mainClass={getMainClass({
				defTabs: filteredSettingTabs(),
				location: props
			})}>
			{!allowedCurrencyList.bankCard.includes(userInfo.currencyId) ? (
				<CryptoWallet />
			) : (
				<BankInfo prevPage={prevPage} />
			)}
		</Layout>
	);
};
IndexPage.defaultProps = {
	location: {}
};

IndexPage.propTypes = {
	location: PropTypes.objectOf(PropTypes.any)
};

export default IndexPage;
