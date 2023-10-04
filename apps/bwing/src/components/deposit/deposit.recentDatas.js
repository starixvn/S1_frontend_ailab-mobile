import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import { isConvert } from "../common/common";
import { i18nContext, userInfoContext } from "../common/context";
import { TransactionHistory } from "./deposit.history";
import ReloadSpin from "../common/reloadSpin";
import path from "../../path";

const RecentDatas = props => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const [isOpen, setOpen] = useState(false);
	const _isConvert = isConvert(userInfo.currencyId);

	const HandleOpen = () => {
		setOpen(prevState => !prevState);
	};

	const hasData = props.Datas && props.Datas.length > 0;
	const rows =
		hasData &&
		props.Datas.map(d => {
			return (
				<TransactionHistory
					key={`deposit-recent-${d.transId}`}
					{...d}
					className="info infoBlack"
					_isConvert={_isConvert}
					SubmitProof={props.SubmitProof.bind(
						this,
						d.bankInfo,
						d.depositRep,
						d.amount,
						d.transId,
						d.picFileName,
						d.depositReceipt,
						d.refId
					)}
					ClickCancel={props.ClickCancel.bind(this, d.transId)}
					depositMessageDetail={d.depositMessageDetail}
				/>
			);
		});

	return (
		<>
			<div className="btn-group">
				<button className="switch" onClick={HandleOpen}>
					{i18n.lbl_RecentTransactions.toUpperCase()}
					<i
						className={`icon icon-circle-right${
							isOpen ? " open" : ""
						}`}
					/>
				</button>
			</div>
			{hasData ? (
				<>
					<div className={`recent${isOpen ? " open" : ""}`}>
						<div className="recentTransactions">
							<ReloadSpin func={props.GetDepositInfoRecent} />
						</div>
						<div className="txt-blue2">
							{i18n.msg_AmountFormatTip}
						</div>
						{rows}
					</div>
					{isOpen ? (
						<div className="btn-group">
							<Link
								to={path.depositHistory.root}
								className="blue recentBtn">
								{i18n.lbl_AllTranscations}
							</Link>
						</div>
					) : null}
				</>
			) : isOpen ? (
				<div className="not-found">
					<i className="icon icon-warning" />
					<p>{i18n.msg_NoData}</p>
				</div>
			) : null}
		</>
	);
};

RecentDatas.defaultProps = {
	Datas: []
};

RecentDatas.propTypes = {
	Datas: PropTypes.arrayOf(PropTypes.object),
	SubmitProof: PropTypes.func.isRequired,
	ClickCancel: PropTypes.func.isRequired,
	GetDepositInfoRecent: PropTypes.func.isRequired
};

export default RecentDatas;
