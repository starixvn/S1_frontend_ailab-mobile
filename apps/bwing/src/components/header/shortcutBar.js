import React, { useContext } from "react";
import { func } from "prop-types";
import { Link } from "@reach/router";
import {
	i18nContext,
	navContext,
	defNavPanel,
	userInfoContext
} from "../common/context";
import path from "../../path";

const ShortcutBar = ({ closeSubMenu }) => {
	const { i18n } = useContext(i18nContext);
	const { setNav } = useContext(navContext);
	const { userInfo } = useContext(userInfoContext);

	const ShowLogin = () => {
		setNav(defNavPanel.login);
	};

	const NavLink = ({ ...passProps }) => {
		let _passProps = passProps;
		if (userInfo.isLogin === false) {
			_passProps = { ...passProps, to: "/", onClick: ShowLogin };
		}

		return <Link {..._passProps} onClick={closeSubMenu} />;
	};

	return (
		<div className="menu-function">
			<NavLink
				className="icon-deposit"
				to={`/${path.deposit.root}`}
				checkProfile={true}>
				{i18n.lbl_Deposit}
			</NavLink>
			<NavLink
				className="icon-withdrawal"
				to={`/${path.withdrawal.root}`}
				checkProfile={true}>
				{i18n.lbl_Withdrawal}
			</NavLink>
			<NavLink className="icon-statement" to={`/${path.statement.root}`}>
				{i18n.lbl_Statement}
			</NavLink>
			<NavLink
				className="icon-history"
				to={`${path.deposit.root}/${path.depositHistory.root}`}>
				{i18n.lbl_History}
			</NavLink>
		</div>
	);
};

ShortcutBar.propTypes = {
	closeSubMenu: func.isRequired
};

export default ShortcutBar;
