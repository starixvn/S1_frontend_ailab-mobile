import React from "react";
import PropTypes from "prop-types";
import { number_format } from "../common/common";

const Info = ({
	depositAmount,
	availableTickets,
	ticketLimit,
	userName,
	i18n
}) => {
	const limitArr = ticketLimit?.map((el, i) => {
		const active = depositAmount >= el;
		return (
			<div className={`${active ? "active" : ""}`} key={`amount-${el}`}>
				<span>{number_format(el, true, 0)}</span>
				<div className="phase">
					{i + 1} {i18n.lbl_ticket}
				</div>
			</div>
		);
	});

	const percentage = (depositAmount / ticketLimit?.[2]) * 100;

	return (
		<div className="ticketModule">
			<div className="titleBox">
				<div>{userName}</div>
			</div>
			<div className="ticketBar">
				<div className="bar">
					<div
						className="value"
						style={{
							width: `${percentage > 100 ? 100 : percentage}%`
						}}
					/>
					{limitArr}
				</div>
				<div className="amountBox">
					<div className="deposit">
						{i18n.lbl_DepositAmount}
						<div className="amount">
							{`VND ${number_format(
								depositAmount,
								true,
								0
							)} x ${availableTickets}`}
							<span>Ticket</span>
						</div>
					</div>
					<div className="deposit">
						{i18n.lbl_ticketsAvailable}
						<div className="amount">{availableTickets}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

Info.defaultProps = {
	depositAmount: 0,
	availableTickets: 0,
	ticketLimit: null,
	userName: null,
	i18n: null
};

Info.propTypes = {
	depositAmount: PropTypes.number,
	availableTickets: PropTypes.number,
	ticketLimit: PropTypes.arrayOf(PropTypes.number),
	userName: PropTypes.string,
	i18n: PropTypes.objectOf(PropTypes.string)
};

export default Info;
