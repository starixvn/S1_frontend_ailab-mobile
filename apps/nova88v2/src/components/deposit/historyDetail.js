import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { number_format } from "../common/common";

const defIconStatus = {
	0: "pending",
	1: "pending",
	2: "pending",
	3: "approved",
	4: "reject",
	5: "cancelled",
	6: "cancelled",
	7: "pending",
	8: "pending",
	99: "reject"
};
const Detail = ({
	status,
	ClickCancel,
	transId,
	createTime,
	amount,
	_isConvert,
	depositType,
	SubmitProof,
	i18n,
	thirdId
}) => {
	let btnGroup = null;
	if (depositType === 3 && (status === 1 || status === 7)) {
		btnGroup = (
			<div className="btn-group">
				<button className="blue" onClick={ClickCancel}>
					{i18n.lbl_Cancel}
				</button>
				<button className="orange openPopup" onClick={SubmitProof}>
					{i18n.lbl_SubmitProof}
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
					<span className="title">{i18n.lbl_Method}</span>
					<span>{i18n[`lbl_DepositType${depositType}`]}</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_Amount}</span>
					<span>{number_format(amount, _isConvert)}</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_Status}</span>
					<span className={defIconStatus[status]}>
						{i18n[`lbl_DepositStatus${status}`]}
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
	depositType: PropTypes.number.isRequired,
	SubmitProof: PropTypes.func.isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

export default Detail;
