import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { number_format } from "../common/common";

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

const Detail = ({
	status,
	ClickCancel,
	transId,
	createTime,
	amount,
	_isConvert,
	i18n
}) => {
	let btnGroup = null;
	if (status === 1) {
		const handleCancel = () => ClickCancel(transId);
		btnGroup = (
			<div className="btn-group">
				<button className="blue" onClick={handleCancel}>
					{i18n.lbl_Cancel}
				</button>
			</div>
		);
	}
	return (
		<div className="info">
			<ul>
				<li>
					<span className="title">{i18n.lbl_Date}</span>
					<span>{moment(createTime).format("MM/DD/YYYY(Z)")}</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_Time}</span>
					<span>{moment(createTime).format("hh:mm:ss A")}</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_ID}</span>
					<span>{transId}</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_Amount}</span>
					<span>{number_format(amount, _isConvert)}</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_Status}</span>
					<span className={defIconStatus[status]}>
						{i18n[`lbl_WithdrawalStatus${status}`]}
					</span>
				</li>
			</ul>
			{btnGroup}
		</div>
	);
};

Detail.defaultProps = {
	_isConvert: false
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
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

export default Detail;
