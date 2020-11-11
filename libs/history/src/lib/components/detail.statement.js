import React from "react";
import moment from "moment";
import { number_format } from "@ailab-mobile/common";

export const StatementDetail = ({
	i18n,
	createTime,
	typeName,
	direction,
	changeAmount,
	_isConvert,
	beforeAmount,
	afterAmount,
	refTransId
}) => {
	return (
		<div className="info">
			<ul>
				<li>
					<span className="title">{i18n["lbl_Date"]}</span>
					<span>{moment(createTime).format("MM/DD/YYYY(Z)")}</span>
				</li>
				<li>
					<span className="title">{i18n["lbl_Time"]}</span>
					<span>{moment(createTime).format("hh:mm:ss A")}</span>
				</li>
				<li>
					<span className="title">{i18n["lbl_TypeName"]}</span>
					<span>{typeName}</span>
				</li>
				<li>
					<span className="title">{i18n["lbl_ChangeAmount"]}</span>
					<span>
						{direction}
						{number_format(changeAmount, _isConvert)}
					</span>
				</li>
				<li>
					<span className="title">{i18n["lbl_BeforeAmount"]}</span>
					<span>{number_format(beforeAmount, _isConvert)}</span>
				</li>
				<li>
					<span className="title">{i18n["lbl_AfterAmount"]}</span>
					<span>{number_format(afterAmount, _isConvert)}</span>
				</li>
				<li>
					<span className="title">{i18n["lbl_RefTransId"]}</span>
					<span>{refTransId}</span>
				</li>
			</ul>
			<div className="btn-group"></div>
		</div>
	);
};
