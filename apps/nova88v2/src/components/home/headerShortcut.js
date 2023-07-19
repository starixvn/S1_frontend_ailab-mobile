import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "../../route/link";
import path from "../../path";
import { userInfoContext } from "../common/context";
import { defCurrenyId } from "../common/common";

const HeaderShortcut = ({ i18n }) => {
	const { userInfo } = useContext(userInfoContext);

	return (
		<div className="submenu">
			<div className="thBar">
				<Link to={path.deposit.root}>
					<i className="icon icon-deposit" />
					<span>{i18n.lbl_Deposit}</span>
				</Link>
				<Link to={path.transfer.root}>
					<i className="icon icon-transfer" />
					<span>{i18n.lbl_Transfer}</span>
				</Link>
				<Link
					to={
						userInfo.currencyId === defCurrenyId.BDT
							? path.eWalletWithdrawal.root
							: path.withdrawal.root
					}>
					<i className="icon icon-withdrawal" />
					<span>{i18n.lbl_Withdrawal}</span>
				</Link>
				<Link to={path.promotion.root}>
					<i className="icon icon-gift" />
					<span>{i18n.lbl_Promotion}</span>
				</Link>
				<Link to={path.statement.root}>
					<i className="icon icon-history" />
					<span>{i18n.lbl_Statement}</span>
				</Link>
			</div>
		</div>
	);
};

HeaderShortcut.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

export default HeaderShortcut;
