import React from "react";
import PropTypes from "prop-types";
import { cloudBannerImgURL } from "../../config";
import { GetCurrencyName, number_format } from "../common/common";

const Info = ({
	depositAmount,
	availableTickets,
	usedTickets,
	ticketLimit,
	userName,
	currencyId,
	langId,
	i18n
}) => {
	const limitArr = ticketLimit?.map(el => {
		const active = depositAmount >= el;
		return (
			<div
				className={`progressItem${active ? " active" : ""}`}
				key={`amount-${el}`}>
				<div className="value">{number_format(el, false, 0)}</div>
			</div>
		);
	});

	const percentage = (depositAmount / ticketLimit?.[2]) * 100;

	return (
		<div className="event-content">
			<div className="title">{i18n.lbl_info}</div>
			<div className="event-info">
				<div className="userInfo">
					<img
						src={`${cloudBannerImgURL}/img/worldcup/user.svg`}
						alt=""
					/>
					{userName}
				</div>
				<div className="ticketInfo">
					<div className="progressBar">
						<div
							className="progressValue"
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
									{GetCurrencyName({
										langId,
										currencyId,
										i18n
									})}{" "}
									{number_format(depositAmount, false, 0)}
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
		</div>
	);
};

Info.defaultProps = {
	depositAmount: 0,
	availableTickets: 0,
	usedTickets: 0,
	ticketLimit: null,
	userName: null,
	currencyId: null,
	langId: null,
	i18n: null
};

Info.propTypes = {
	depositAmount: PropTypes.number,
	availableTickets: PropTypes.number,
	usedTickets: PropTypes.number,
	ticketLimit: PropTypes.arrayOf(PropTypes.number),
	userName: PropTypes.string,
	currencyId: PropTypes.number,
	langId: PropTypes.string,
	i18n: PropTypes.objectOf(PropTypes.string)
};

export default Info;
