import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import {
	currencyIdToTimeZone,
	isConvert,
	number_format
} from "../common/common";
import { userInfoContext } from "../common/context";
import GoTopBtn from "../common/goTopBtn";

export const ReferralHistoryList = ({ history, onRefFriendDetail }) => {
	const { userInfo } = useContext(userInfoContext);
	const { t } = useTranslation();
	const _isConvert = isConvert(userInfo.currencyId);
	const timeZone = currencyIdToTimeZone[userInfo.currencyId];

	return (
		<div className="infoList">
			{history?.map(
				({ settledDate, totalDeposit, rewardAmount }, index) => (
					<div className="info" key={settledDate}>
						<ul>
							<li>
								<span className="title">No.</span>
								<span>{index + 1}</span>
							</li>
							<li>
								<span className="title">
									{t("lbl_Date")} ({timeZone})
								</span>
								<span>
									{moment(settledDate).format("MM/DD/YYYY")}
								</span>
							</li>
							<li>
								<span className="title">
									{t("lbl_TotalDeposit")}
								</span>
								<span>
									{number_format(totalDeposit, _isConvert)}
								</span>
							</li>
							<li>
								<span className="title">
									{t("lbl_RewardAmount")}
								</span>

								<span>
									{number_format(rewardAmount, _isConvert)}
								</span>
							</li>
							<li>
								<span className="title">{t("lbl_Status")}</span>
							</li>
							<div className="btn-group">
								<a
									onClick={async () => {
										const payload = {
											startDate: moment(
												settledDate
											).unix(),
											endDate: moment(settledDate)
												.endOf("day")
												.unix(),
											pageNumber: 1,
											pageSize: 10
										};

										await onRefFriendDetail(payload);
									}}>
									{t("lbl_Details")}
								</a>
							</div>
						</ul>
					</div>
				)
			)}

			{history.length > 2 && <GoTopBtn />}
		</div>
	);
};

export default ReferralHistoryList;
