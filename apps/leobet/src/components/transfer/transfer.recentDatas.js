import React, { useState, useContext } from "react";
import { i18nContext, userInfoContext } from "Context";
import PropTypes from "prop-types";
import { Link } from "@Router";
import Detail from "./historyDetail";
import { isConvert, number_format } from "../common/common";
import path from "../../path";

const RecentDatas = ({ datas }) => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const _isConvert = isConvert(userInfo.currencyId);
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

	const hasData = datas && datas.length > 0;
	const arr =
		hasData &&
		datas?.map(item => {
			const _transferDirection = transferDirection(
				item.direction,
				i18n.lbl_MainWallet,
				i18n.lbl_Adjustment,
				item.isAdjustment,
				item.tpName
			);

			return (
				<Detail
					key={`transferRecent-${item.transId}`}
					createTime={item.createTime}
					transId={item.transId}
					amount={number_format(item.amount, _isConvert)}
					startWallet={_transferDirection.startWallet}
					endWallet={_transferDirection.endWallet}
					i18n={i18n}
					memo={item.memo}
					status={item.status}
					currencyId={userInfo.currencyId}
				/>
			);
		});

	let dataContent = null;
	if (hasData) {
		dataContent = (
			<>
				<div className="infoList">{arr}</div>
				<div className="btn-group">
					<Link
						to={path.transferHistory.root}
						className="orange recentBtn">
						{i18n.lbl_AllTranscations}
					</Link>
				</div>
			</>
		);
	} else if (isOpen) {
		dataContent = (
			<div className="nodata icon icon-nodata">
				<div className="txt-white">{i18n.msg_NoData}</div>
			</div>
		);
	}

	return (
		<>
			<div className="btn-group">
				<button className="recentBtn" onClick={HandleOpen}>
					{i18n.lbl_RecentTransactions}
					<i
						className={`icon icon-keyboard_arrow_down${
							isOpen ? " active" : ""
						}`}
					/>
				</button>
			</div>
			<div className={`recent${isOpen ? " active" : ""}`}>
				{dataContent}
			</div>
		</>
	);
};

RecentDatas.defaultProps = {
	datas: []
};

RecentDatas.propTypes = {
	datas: PropTypes.arrayOf(PropTypes.object)
};

export default RecentDatas;
