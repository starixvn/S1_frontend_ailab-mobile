import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { userInfoContext } from "../components/common/context";
import TabPage from "../components/common/tabPage";
import path from "../path";

const IndexPage = props => {
	const [tabs, setTabs] = useState({
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
			to: path.member.sub.bankInfo.root,
			displayKey: "lbl_BankInfo"
		}
	});

	const { userInfo } = useContext(userInfoContext);

	useEffect(() => {
		if (userInfo.currencyId === 96) {
			setTabs({
				default: {
					to: `/${path.member.root}`,
					displayKey: "lbl_Profile",
					excludeMath: path.member.sub.bankInfo.root
				},
				cryptoWallet: {
					to: `/${path.cryptoWallet.root}`,
					displayKey: "lbl_CryptoWallet"
				}
			});
		}
	}, [userInfo]);

	return <TabPage defTabs={tabs}>{props.children}</TabPage>;
};

IndexPage.propTypes = {
	children: PropTypes.node.isRequired
};

export default IndexPage;
