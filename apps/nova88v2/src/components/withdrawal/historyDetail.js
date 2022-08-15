import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import {
	number_format,
	currencyIdToTimeZone,
	defCurrenyId
} from "../common/common";

const defIconStatus = {
	1: "pending",
	2: "pending",
	3: "pending",
	4: "pending",
	5: "cancelled",
	6: "approved",
	7: "reject",
	8: "pending"
};

const withdrawalStatus = {
	pending: 1,
	onHold: 2,
	verify: 3,
	process: 4,
	cancelled: 5,
	approved: 6,
	rejected: 7,
	toKyc: 8
};

const Detail = ({
	status,
	ClickCancel,
	transId,
	createTime,
	amount,
	_isConvert,
	i18n,
	currencyId,
	canCancel
}) => {
	const timeZone = currencyIdToTimeZone[currencyId ?? defCurrenyId.MYR];
	let btnGroup = null;

	if (
		canCancel !== false &&
		(status === withdrawalStatus.pending ||
			status === withdrawalStatus.toKyc)
	) {
		const handleCancel = () => ClickCancel(transId);
		btnGroup = (
			<div className="btn-group">
				<button
					className="white"
					onClick={handleCancel}
					data-testid="history-cancel-btn">
					{i18n.lbl_Cancel}
				</button>
			</div>
		);
	}

	return (
		<div className="info">
			<ul>
				<li>
					<span className="title">
						{i18n.lbl_Date} ({timeZone})
					</span>
					<span>
						{moment(createTime, "YYYY-MM-DDThh:mm:ssZ")
							.zone(timeZone)
							.format("MM/DD/YYYY")}
					</span>
				</li>
				<li>
					<span className="title">
						{i18n.lbl_Time} ({timeZone})
					</span>
					<span>
						{moment(createTime, "YYYY-MM-DDThh:mm:ssZ")
							.zone(timeZone)
							.format("hh:mm:ss A")}
					</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_ID}</span>
					<span data-testid="transId">{transId}</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_Amount}</span>
					<span>{number_format(amount, _isConvert)}</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_Status}</span>
					<span
						className={defIconStatus[status]}
						data-testid="historyStatus">
						{i18n[`lbl_WithdrawalStatus${status}`]}
					</span>
				</li>
			</ul>
			{btnGroup}
		</div>
	);
};

Detail.defaultProps = {
	_isConvert: false,
	currencyId: null,
	canCancel: null
};

Detail.propTypes = {
	status: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
		.isRequired,
	ClickCancel: PropTypes.func.isRequired,
	transId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
		.isRequired,
	createTime: PropTypes.string.isRequired,
	amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
		.isRequired,
	_isConvert: PropTypes.bool,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	currencyId: PropTypes.number,
	canCancel: PropTypes.bool
};

export default Detail;
