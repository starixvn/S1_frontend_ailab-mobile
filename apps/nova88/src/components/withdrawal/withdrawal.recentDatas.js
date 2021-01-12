import React, { useContext, useState } from "react";
import { i18nContext, userInfoContext } from "Context";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
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
					ClickCancel={props.ClickCancel}
				/>
			);
		});

	return (
		<>
			<div className="btn-group">
				<button className="orange switch" onClick={HandleOpen}>
					{i18n.lbl_RecentTransactions}
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
							<div className="smallTitle">
								<i className="icon icon-history">
									{i18n.lbl_RecentTransactions}
								</i>
							</div>
							<ReloadSpin func={props.ReloadFunc} />
						</div>
						{rows}
					</div>
					{isOpen ? (
						<div className="btn-group">
							<Link
								to={path.withdrawal.sub.history.root}
								className="orange recentBtn">
								{i18n.lbl_AllTranscations}
							</Link>
						</div>
					) : null}
				</>
			) : isOpen ? (
				<div className="nodata icon icon-nodata">
					<div className="txt-white">{i18n.msg_NoData}</div>
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
	ClickCancel: PropTypes.func.isRequired,
	ReloadFunc: PropTypes.func.isRequired
};

export default RecentDatas;
