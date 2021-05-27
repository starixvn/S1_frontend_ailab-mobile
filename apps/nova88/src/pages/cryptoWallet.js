import React, { useContext } from "react";
import { useNavigate } from "@reach/router";
import Layout from "../components/common/layout";
import { i18nContext, userInfoContext } from "../components/common/context";
import CryptoWallet from "../components/cryptoWallet/cryptoWallet";

const IndexPage = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const navigate = useNavigate();
	// useEffect(() => {
	// 	if (userInfo.currencyId !== 96) {
	// 		navigate(path.home.root);
	// 	}
	// }, [userInfo]);

	return <CryptoWallet />;
};

export default IndexPage;
