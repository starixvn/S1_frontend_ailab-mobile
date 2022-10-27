import React from "react";
import PropTypes from "prop-types";
import { bannerImgUrl } from "../../config";
import { number_format } from "../common/common";

const Info = ({
	depositAmount,
	availableTickets,
	usedTickets,
	ticketLimit,
	userName,
	i18n
}) => {
	const limitArr = ticketLimit?.map(el => {
		const active = depositAmount >= el;
		return (
			<div
				className={`progress-bar__item${active ? " active" : ""}`}
				key={`amount-${el}`}>
				<div className="progress-bar__number">
					{number_format(el, true, 0)}
				</div>
			</div>
		);
	});

	const percentage = (depositAmount / ticketLimit?.[2]) * 100;

	return (
		<div className="ticket__container">
			<div className="title">Info</div>
			<div className="ticket__info">
				<div className="ticket__user">
					<img
						src={`${bannerImgUrl}/h5/img/event/worldcup/user.svg`}
						alt=""
					/>
					{userName}
				</div>
				<div className="progress-bar">
					<div
						className="progress-bar__value"
						style={{
							width: `${percentage > 100 ? 100 : percentage}%`
						}}
					/>
					{limitArr}
				</div>
				<div className="status">
					<div>
						<div>{i18n.lbl_DepositAmount}</div>
						<div>
							<span>
								VND {number_format(depositAmount, true, 0)}
							</span>
						</div>
					</div>
					<div>
						<div>{i18n.lbl_ticketsAvailable}</div>
						<div>{availableTickets} / 3</div>
					</div>
					<div>
						<div>{i18n.lbl_ticketsUsed}</div>
						<div>
							{usedTickets} / {availableTickets}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

Info.defaultProps = {
	depositAmount: 0,
	availableTickets: 0,
	usedTickets: 0,
	ticketLimit: null,
	userName: null,
	i18n: null
};

Info.propTypes = {
	depositAmount: PropTypes.number,
	availableTickets: PropTypes.number,
	usedTickets: PropTypes.number,
	ticketLimit: PropTypes.arrayOf(PropTypes.number),
	userName: PropTypes.string,
	i18n: PropTypes.objectOf(PropTypes.string)
};

export default Info;
