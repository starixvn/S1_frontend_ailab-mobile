import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import { i18nContext } from "../common/context";
import { TransactionHistory } from "./transfer.history";
import { number_format } from "../common/common";
import ReloadSpin from "../common/reloadSpin";
import path from "../../path";

const ReacentDatas = props => {
	const { i18n } = useContext(i18nContext);
	const [isOpen, setOpen] = useState(false);

	const HandleOpen = () => {
		setOpen(prevState => !prevState);
	};

	const transferDirection = (
		direction,
		displayMainWallet,
		displayAdjustment,
		isAdjustment,
		tpName
	) => {
		let startWallet = "";
		let endWallet = "";
		if (direction === 1) {
			if (isAdjustment) {
				startWallet = tpName;
				endWallet = displayAdjustment;
			} else {
				startWallet = displayMainWallet;
				endWallet = tpName;
			}
		} else if (isAdjustment) {
			startWallet = tpName;
			endWallet = displayAdjustment;
		} else {
			startWallet = tpName;
			endWallet = displayMainWallet;
		}
		return { startWallet, endWallet };
	};

	const hasData = props.datas && props.datas.length > 0;
	const arr =
		hasData &&
		props.datas?.map(item => {
			const _transferDirection = transferDirection(
				item.direction,
				i18n.lbl_MainWallet,
				i18n.lbl_Adjustment,
				item.isAdjustment,
				item.tpName
			);
			return (
				<TransactionHistory
					key={`transferRecent-${item.transId}`}
					createTime={item.createTime}
					transId={item.transId}
					amount={number_format(item.amount, false)}
					startWallet={_transferDirection.startWallet}
					endWallet={_transferDirection.endWallet}
					i18n={i18n}
					className="info infoBlack transfer"
					status={item.status}
				/>
			);
		});

	let content = null;
	if (hasData) {
		content = (
			<>
				<div className={`recent${isOpen ? " open" : ""}`}>
					<div className="recentTransactions">
						<ReloadSpin func={props.GetRecentDatas} />
					</div>
					<div className="txt-blue2">{i18n.msg_AmountFormatTip}</div>
					<div className="infoList">{arr}</div>
				</div>
				{isOpen ? (
					<div className="btn-group">
						<Link
							to={path.transfer.sub.history.root}
							className="blue recentBtn">
							{i18n.lbl_AllTranscations}
						</Link>
					</div>
				) : null}
			</>
		);
	} else if (isOpen) {
		content = (
			<div className="not-found">
				<i className="icon icon-warning" />
				<p>{i18n.msg_NoData}</p>
			</div>
		);
	}

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

			{content}
		</>
	);
};

ReacentDatas.defaultProps = {
	datas: null,
	GetRecentDatas: () => null
};

ReacentDatas.propTypes = {
	datas: PropTypes.arrayOf(PropTypes.object),
	GetRecentDatas: PropTypes.func
};

export default ReacentDatas;
