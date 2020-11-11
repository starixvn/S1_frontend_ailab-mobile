import React, { useContext } from "react";
import {
	i18nContext,
	navContext,
	defNavPanel,
	userInfoContext
} from "../common/context";
import { Link } from "@reach/router";
import path from "../../path";

const ShortcutBar = () => {
	const { i18n } = useContext(i18nContext);
	const { setNav } = useContext(navContext);
	const { userInfo } = useContext(userInfoContext);

	const ShowLogin = () => {
		setNav(defNavPanel.login);
	};

	const NavLink = props => {
		let { checkProfile, redirectPath, checkBankInfo, ...passProps } = props;
		if (userInfo.isLogin === false) {
			passProps = { ...passProps, to: "/", onClick: ShowLogin };
		}

		return <Link {...passProps} onClick={() => setNav(null)} />;
	};

	return (
		<div className="depositArea">
			<NavLink to={`/${path.deposit.root}`} checkProfile={true}>
				{i18n.lbl_Deposit}
			</NavLink>
			<NavLink to={`/${path.transfer.root}`}>{i18n.lbl_Transfer}</NavLink>
			<NavLink to={`/${path.statement.root}`}>
				{i18n.lbl_Statement}
			</NavLink>
			<NavLink to={`/${path.withdrawal.root}`} checkProfile={true}>
				{i18n.lbl_Withdrawal}
			</NavLink>
		</div>
	);
};

export default ShortcutBar;
