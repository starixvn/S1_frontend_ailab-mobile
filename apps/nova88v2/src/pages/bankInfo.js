import React, { useContext } from "react";
import PropTypes from "prop-types";
import { userInfoContext } from "../components/common/context";
import BankInfo from "../components/profile/bankInfo";
import Layout from "../components/common/layout";
import { myWallet, myWalletPart } from "../datas/defTabs";
import TabPage, { getMainClass } from "../components/common/tabPage";
import CryptoWallet from "../components/cryptoWallet/cryptoWallet";

import { defCurrenyId } from "../components/common/common";

const IndexPage = props => {
	const { userInfo } = useContext(userInfoContext);
	const defTabs =
		userInfo.currencyId === defCurrenyId.IDR ? myWallet : myWalletPart;
	const header = <TabPage defTabs={defTabs} />;
	const { prevPage } = props?.location?.state;

	return (
		<Layout
			header={header}
			mainClass={getMainClass({
				defTabs,
				location: props
			})}>
			{userInfo.currencyId === defCurrenyId.USD ? (
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
