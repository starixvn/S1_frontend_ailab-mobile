import React, { useContext, useState } from "react";
import { Link } from "@reach/router";
import PropTypes from "prop-types";
import { i18nContext, userInfoContext } from "../common/context";
import { isConvert } from "../common/common";
import path from "../../path";
import { TransactionHistory } from "./withdrawal.history";
import ReloadSpin from "../common/reloadSpin";

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
					ClickCancel={props.ClickCancel.bind(this, d.transId)}
					withdrawalMessageDetail={d.withdrawalMessageDetail}
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
							<ReloadSpin func={props.GetRecentDatas} />
						</div>
						<div className="txt-blue2">
							{i18n.msg_AmountFormatTip}
						</div>
						{rows}
					</div>
					{isOpen ? (
						<div className="btn-group">
							<Link
								to={`/${path.withdrawal.root}/${path.withdrawal.sub.history.root}`}
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
	Datas: [],
	GetRecentDatas: () => null
};

RecentDatas.propTypes = {
	Datas: PropTypes.arrayOf(PropTypes.object),
	ClickCancel: PropTypes.func.isRequired,
	GetRecentDatas: PropTypes.func
};

export default RecentDatas;
