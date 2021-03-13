import React, { useContext, useState } from "react";
import { i18nContext, userInfoContext } from "Context";
import PropTypes from "prop-types";
import { Link } from "@Router";
import { isConvert } from "../common/common";
import path from "../../path";
import Detail from "./historyDetail";
import ReloadSpin from "../common/reloadSpin";

const RecentDatas = ({ Datas, ClickCancel, ReloadFunc }) => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const [isOpen, setOpen] = useState(false);
	const _isConvert = isConvert(userInfo.currencyId);

	const HandleOpen = () => {
		setOpen(prevState => !prevState);
	};

	const hasData = Datas && Datas.length > 0;
	const rows =
		hasData &&
		Datas.map(d => {
			return (
				<Detail
					key={`deposit-recent-${d.transId}`}
					status={d.status}
					transId={d.transId}
					createTime={d.createTime}
					amount={d.amount}
					className="info"
					_isConvert={_isConvert}
					ClickCancel={ClickCancel}
					i18n={i18n}
				/>
			);
		});

	let dataContent = null;
	if (hasData) {
		dataContent = (
			<>
				<div className="infoList">
					<div className="recentTransactions">
						<ReloadSpin func={ReloadFunc} />
					</div>
					{rows}
				</div>
				<div className="btn-group">
					<Link
						to={path.withdrawalHistory.root}
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
	Datas: []
};

RecentDatas.propTypes = {
	Datas: PropTypes.arrayOf(PropTypes.object),
	ClickCancel: PropTypes.func.isRequired,
	ReloadFunc: PropTypes.func.isRequired
};

export default RecentDatas;
