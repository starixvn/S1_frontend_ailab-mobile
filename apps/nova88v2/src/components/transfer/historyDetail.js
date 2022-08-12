import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { number_format, currencyIdToTimeZone } from "../common/common";

const Detail = ({
	i18n,
	startWallet,
	endWallet,
	memo,
	transId,
	createTime,
	amount,
	_isConvert,
	status,
	currencyId
}) => {
	const _status = status === 0 ? i18n.lbl_Success : i18n.lbl_Fail;
	const timeZone = currencyIdToTimeZone[currencyId];

	return (
		currencyId && (
			<div className="info transfer">
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
							{endWallet === i18n.lbl_Adjustment ? (
								<i>&nbsp;&nbsp;</i>
							) : (
								<i className="icon icon-keyboard_arrow_right1" />
							)}
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
		)
	);
};

Detail.defaultProps = {
	_isConvert: false,
	startWallet: "",
	endWallet: "",
	memo: "",
	status: null,
	currencyId: null
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
	status: PropTypes.number,
	currencyId: PropTypes.number
};

export default Detail;
