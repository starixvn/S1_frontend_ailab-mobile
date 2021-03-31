import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { number_format } from "../common/common";

const Detail = ({
	i18n,
	createTime,
	typeName,
	direction,
	changeAmount,
	beforeAmount,
	afterAmount,
	_isConvert,
	refTransId
}) => {
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
					<span className="title">{i18n.lbl_TypeName}</span>
					<span>{typeName}</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_ChangeAmount}</span>
					<span>
						{direction}
						{number_format(changeAmount, _isConvert)}
					</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_BeforeAmount}</span>
					<span>{number_format(beforeAmount, _isConvert)}</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_AfterAmount}</span>
					<span>{number_format(afterAmount, _isConvert)}</span>
				</li>
				<li>
					<span className="title">{i18n.lbl_RefTransId}</span>
					<span>{refTransId}</span>
				</li>
			</ul>
			<div className="btn-group" />
		</div>
	);
};

Detail.defaultProps = {
	_isConvert: false
};

Detail.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	createTime: PropTypes.oneOfType([
		PropTypes.instanceOf(Date),
		PropTypes.string
	]).isRequired,
	typeName: PropTypes.string.isRequired,
	direction: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
		.isRequired,
	changeAmount: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
		.isRequired,
	beforeAmount: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
		.isRequired,
	afterAmount: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
		.isRequired,
	_isConvert: PropTypes.bool,
	refTransId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
		.isRequired
};

export default Detail;
