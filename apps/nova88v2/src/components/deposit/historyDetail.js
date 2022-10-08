import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { number_format, currencyIdToTimeZone } from "../common/common";

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
	thirdId,
	currencyId
}) => {
	let btnGroup = null;
	if (depositType === 3 && (status === 1 || status === 7)) {
		btnGroup = (
			<div className="btn-group">
				<button className="white" onClick={ClickCancel}>
					{i18n.lbl_Cancel}
				</button>
				<button className="orange openPopup" onClick={SubmitProof}>
					{i18n.lbl_SubmitProof}
				</button>
			</div>
		);
	}
	// const ipt = createRef();
	// const OnCopy = () => {
	// 	ipt.current.select();
	// 	navigator.clipboard.writeText(ipt.current.value);
	// };
	const timeZone = currencyIdToTimeZone?.[currencyId];

	return (
		<div className="info">
			<ul>
				<li>
					<span className="title">
						{i18n.lbl_Date} ({timeZone})
					</span>
					<span>
						{timeZone &&
							moment(createTime, "YYYY-MM-DDThh:mm:ssZ")
								?.zone(timeZone)
								.format("MM/DD/YYYY")}
					</span>
				</li>
				<li>
					<span className="title">
						{i18n.lbl_Time} ({timeZone})
					</span>
					<span>
						{timeZone &&
							moment(createTime, "YYYY-MM-DDThh:mm:ssZ")
								.zone(timeZone)
								.format("hh:mm:ss A")}
					</span>
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

			{thirdId && (
				<div>
					<div className="title">{i18n.lbl_Action}</div>
					<div>{thirdId}</div>
					{/* <input
						type="hidden"
						readOnly={true}
						defaultValue={thirdId}
						ref={ipt}
					/>
					<button
						className="icon icon-files-empty"
						value={thirdId}
						onClick={OnCopy}
					/> */}
				</div>
			)}

			{btnGroup}
		</div>
	);
};

Detail.defaultProps = {
	_isConvert: false,
	thirdId: null,
	currencyId: null
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
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	thirdId: PropTypes.string,
	currencyId: PropTypes.number
};

export default Detail;
