import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { number_format } from "../common/common";

const Detail = ({
	i18n,
	startWallet,
	endWallet,
	memo,
	transId,
	createTime,
	amount,
	_isConvert,
	status
}) => {
	const _status = status === 0 ? i18n.lbl_Success : i18n.lbl_Fail;
	return (
		<div className="info transfer">
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
					<span className="title">{i18n.lbl_Status}</span>
					<span>{_status}</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_Amount}</span>
					<span>{number_format(amount, _isConvert)}</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_Direction}</span>
					<span>
						<span>{startWallet}</span>
						<i className="icon icon-keyboard_arrow_right1" />
						<span>{endWallet}</span>
					</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_Memo}</span>
					<span>
						<span>{memo}</span>
					</span>
				</li>
			</ul>
		</div>
	);
};

Detail.defaultProps = {
	_isConvert: false,
	startWallet: "",
	endWallet: "",
	memo: "",
	status: null
};

Detail.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	startWallet: PropTypes.string,
	endWallet: PropTypes.string,
	memo: PropTypes.string,
	transId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
		.isRequired,
	createTime: PropTypes.string.isRequired,
	amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
		.isRequired,
	_isConvert: PropTypes.bool,
	status: PropTypes.number
};

export default Detail;
