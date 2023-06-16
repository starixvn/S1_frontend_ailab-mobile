import React from "react";
import PropTypes from "prop-types";
import { Link } from "../../route/link";
import path from "../../path";

const HeaderShortcut = ({ i18n }) => {
	return (
		<div className="submenu">
			<div className="thBar">
				<Link to={path.deposit.root}>
					<i className="icon icon-deposit" />
					<span>{i18n.lbl_Deposit}</span>
				</Link>

				<Link to={path.withdrawal.root}>
					<i className="icon icon-withdrawal" />
					<span>{i18n.lbl_Withdrawal}</span>
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
