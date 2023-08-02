import React from "react";
import PropTypes from "prop-types";
import { Link } from "../../route/link";
import path from "../../path";
import { defCurrenyId } from "../common/common";
import allowedCurrencyList from "../../datas/allowedCurrencyList";

const HeaderShortcut = ({ i18n, currencyId }) => {
	return (
		<div className="submenu">
			<div className="thBar">
				<Link to={path.deposit.root}>
					<i className="icon icon-deposit" />
					<span>{i18n.lbl_Deposit}</span>
				</Link>
				{allowedCurrencyList.transferFunds.includes(currencyId) && (
					<Link to={path.transfer.root}>
						<i className="icon icon-transfer" />
						<span>{i18n.lbl_Transfer}</span>
					</Link>
				)}
				<Link
					to={
						currencyId === defCurrenyId.BDT
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
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	currencyId: PropTypes.number.isRequired
};

export default HeaderShortcut;
