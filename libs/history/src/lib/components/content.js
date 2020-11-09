import React from "react";
import { ReloadSpin } from "@ailab-mobile/common";
import { Link } from "@reach/router";

export const Content = ({
	i18n,
	isRecentDatas,
	HandleOpen,
	isOpen,
	submitHandler,
	filterData,
	getHistoryState,
	arr,
	ReloadFunc,
	_path
}) => {
	let _reloadFunc = isRecentDatas
		? ReloadFunc
		: submitHandler.bind(
				this,
				filterData?.StartDate,
				filterData?.EndDate,
				true
		  );

	return (
		<>
			{isRecentDatas ? (
				<div className="btn-group">
					<button className="orange switch" onClick={HandleOpen}>
						{i18n.lbl_RecentTransactions}
						<i
							className={
								"icon icon-circle-right" +
								(isOpen ? " open" : "")
							}></i>
					</button>
				</div>
			) : null}

			{getHistoryState ? (
				<>
					<div
						className={`recent${
							!isRecentDatas || isOpen ? " open" : ""
						}`}>
						<div className="recentTransactions">
							<div className="smallTitle">
								<i className="icon icon-history"></i>
								{i18n["lbl_TransactionHistory"]}
							</div>
							<ReloadSpin func={_reloadFunc} />
						</div>
						{isRecentDatas ? (
							<>{arr}</>
						) : (
							<>
								{getHistoryState.length > 0 ? (
									<div className="infoList">{arr}</div>
								) : (
									<div className="not-found">
										{i18n["msg_NoData"]}
									</div>
								)}
							</>
						)}
					</div>
					{isRecentDatas && isOpen ? (
						<div className="btn-group">
							<Link to={_path} className="orange recentBtn">
								{i18n.lbl_AllTranscations}
							</Link>
						</div>
					) : null}
				</>
			) : isRecentDatas && isOpen ? (
				<div className="not-found">{i18n["msg_NoData"]}</div>
			) : null}
		</>
	);
};
