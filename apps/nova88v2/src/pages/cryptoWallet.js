import React, { useContext, useEffect } from "react";
import { useNavigate } from "@reach/router";
import { Link } from "../route/link";
import Layout from "../components/common/layout";
import { i18nContext, userInfoContext } from "../components/common/context";
import path from "../path";
import Header from "../components/header/header";
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
	const link = (
		<>
			<Link to={path.wallet.root}>{i18n.lbl_Wallet}</Link>
			<Link to={path.cryptoWallet.root} className="active">
				{i18n.lbl_CryptoWallet}
			</Link>
		</>
	);
	const header = (
		<Header
			hideLogo={true}
			title={true}
			link={link}
			titleClass="tag"
			id=""
		/>
	);
	return (
		<Layout header={header} mainClass="main Wallet">
			<CryptoWallet />
		</Layout>
	);
};

export default IndexPage;
