import React, { useContext } from "react";
import { Link } from "@reach/router";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import paths from "../../path";
import { userInfoContext } from "../common/context";

const TicketOverview = ({ tickets, onOpen }) => {
	const { userInfo } = useContext(userInfoContext);
	const { t } = useTranslation();

	return (
		<div className="ticket-content">
			<div className="ticket-number">
				<div>
					<span>{t("lbl_CupEvent_TicketTotal")}</span>
					<span>{tickets.availableTickets ?? 0}</span>
				</div>
				<div>
					<span>{t("lbl_CupEvent_Used")}</span>
					<span>{tickets.usedTickets ?? 0}</span>
				</div>
				<div>
					<span>{t("lbl_CupEvent_Unused ")}</span>
					<span>{tickets.unUsedTickets ?? 0}</span>
				</div>
			</div>
			<div className="ticket-btn">
				<button onClick={onOpen}>
					{t("lbl_CupEvent_DepositList")}
				</button>
				<Link
					to={`${
						userInfo.isLogin
							? `/${paths.deposit.root}`
							: `/${paths.login.root}`
					}`}>
					{t("lbl_DepositNow")}
				</Link>
			</div>
		</div>
	);
};

TicketOverview.propTypes = {
	tickets: PropTypes.objectOf(PropTypes.any).isRequired,
	onOpen: PropTypes.func.isRequired
};

export default TicketOverview;
