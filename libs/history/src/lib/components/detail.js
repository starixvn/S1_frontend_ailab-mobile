import React from "react";
import moment from "moment";
import { number_format } from "@ailab-mobile/common";
import { defTransactionType } from "../common/def";

export const Detail = ({
	transactionType,
	i18n,
	className,
	_isConvert,
	ClickCancel,
	SubmitProof,
	startWallet,
	endWallet,
	depositType,
	status,
	createTime,
	transId,
	amount,
	memo
}) => {
	let btnGroup = null;
	if (transactionType === defTransactionType.deposit) {
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
	} else if (transactionType === defTransactionType.withdrawal) {
		if (status === 1) {
			btnGroup = (
				<div className="btn-group">
					<button className="blue" onClick={ClickCancel}>
						{i18n.lbl_Cancel}
					</button>
				</div>
			);
		}
	}

	return (
		<div className={className}>
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
					<span className="title">{i18n["lbl_ID"]}</span>
					<span>{transId}</span>
				</li>
				{transactionType === "deposit" ? (
					<li>
						<span className="title">{i18n["lbl_Method"]}</span>
						<span>{i18n[`lbl_DepositType${depositType}`]}</span>
					</li>
				) : null}
				<li>
					<span className="title">{i18n["lbl_Amount"]}</span>
					<span>{number_format(amount, _isConvert)}</span>
				</li>
				{transactionType === defTransactionType.deposit ||
				transactionType === defTransactionType.withdrawal ? (
					<li>
						<span className="title">{i18n["lbl_Status"]}</span>
						<span>{i18n[`lbl_DepositStatus${status}`]}</span>
					</li>
				) : null}
				{transactionType === defTransactionType.transfer ? (
					<>
						<li>
							<span className="title">
								{i18n["lbl_Direction"]}
							</span>
							<span>
								{<span>{startWallet}</span>}&gt;
								{<span>{endWallet}</span>}
							</span>
						</li>
						<li>
							<span className="title">{i18n["lbl_Memo"]}</span>
							<span>
								<span>{memo}</span>
							</span>
						</li>
					</>
				) : null}
			</ul>
			{btnGroup}
		</div>
	);
};
