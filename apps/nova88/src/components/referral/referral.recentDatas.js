import React, { useState, useContext } from "react";
import { i18nContext, userInfoContext } from "Context";
import Detail from "./referral.history.detail";
import { isConvert, number_format } from "../common/common";
import ReloadSpin from "../common/reloadSpin";
import { Link } from "@reach/router";
import path from "../../path";

const fakeDatas = [
	{
		friendName: "Yuna",
		registerDate: "3/13/2020 (+08:00)",
		currency: "MYR",
		totalDeposit: "50/50",
		totalBet: "888.00/888.00",
		bonusAmount: "88.00",
		status: "Success"
	}
];

const ReacentDatas = () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const _isConvert = isConvert(userInfo.currencyId);
	const [isOpen, setOpen] = useState(false);
	const [datas, setDatas] = useState(fakeDatas);

	const HandleOpen = () => {
		setOpen(prevState => !prevState);
	};

	let hasData = datas && datas.length > 0;
	let arr =
		hasData &&
		datas?.map(item => {
			return (
				<Detail
					key={`referral-recent-${item.transId}`}
					friendName={item.friendName}
					registerDate={item.registerDate}
					currency={item.currency}
					totalDeposit={item.totalDeposit}
					totalBet={item.totalBet}
					bonusAmount={item.bonusAmount}
					status={item.status}
					i18n={i18n}
				/>
			);
		});

	return (
		<>
			<div className="btn-group">
				<button className="orange switch" onClick={HandleOpen}>
					{i18n["lbl_RecentTransactions"]}
					<i
						className={`icon icon-circle-right${
							isOpen ? " open" : ""
						}`}></i>
				</button>
			</div>

			{hasData ? (
				<>
					<div className={`recent${isOpen ? " open" : ""}`}>
						<div className="recentTransactions">
							<div className="smallTitle">
								<i className="icon icon-history">
									{i18n["lbl_RecentTransactions"]}
								</i>
							</div>
							{/* <ReloadSpin func={props.ReloadFunc} /> */}
						</div>
						<div className="infoList">{arr}</div>
					</div>
					{isOpen ? (
						<div className="btn-group">
							<Link
								to={path.referral.sub.history.root}
								className="orange recentBtn">
								{i18n["lbl_ReferralHistory"]}
							</Link>
						</div>
					) : null}
				</>
			) : isOpen ? (
				<div className="nodata icon icon-nodata">
					<div className="txt-white">{i18n["msg_NoData"]}</div>
				</div>
			) : null}
		</>
	);
};

export default ReacentDatas;
