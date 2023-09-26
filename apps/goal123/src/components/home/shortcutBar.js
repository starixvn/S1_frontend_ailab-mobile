import React, { useContext } from "react";
import { Link } from "@reach/router";
import {
	i18nContext,
	navContext,
	defNavPanel,
	userInfoContext
} from "../common/context";
import path from "../../path";

const ShortcutBar = () => {
	const { i18n } = useContext(i18nContext);
	const { setNav } = useContext(navContext);
	const { userInfo } = useContext(userInfoContext);

	const ShowLogin = () => {
		setNav(defNavPanel.login);
	};

	const NavLink = ({
		checkProfile,
		redirectPath,
		checkBankInfo,
		...passProps
	}) => {
		let _passProps = passProps;
		if (userInfo.isLogin === false) {
			_passProps = { ...passProps, to: "/", onClick: ShowLogin };
		}

		const onClick = () => {
			setNav(() => null);
		};

		return <Link {..._passProps} onClick={onClick} />;
	};

	return (
		<div className="thBar">
			<NavLink
				to={`/${path.deposit.root}`}
				className="icon icon-deposit"
				checkProfile={true}>
				<span>{i18n.lbl_Deposit}</span>
			</NavLink>
			{/* <NavLink
				to={`/${path.transfer.root}`}
				className="icon icon-transfer">
				<span>{i18n.lbl_Transfer}</span>
			</NavLink> */}
			<NavLink
				to={`/${path.withdrawal.root}`}
				className="icon icon-withdrawal"
				checkProfile={true}>
				<span>{i18n.lbl_Withdrawal}</span>
			</NavLink>
		</div>
	);
};

export default ShortcutBar;
