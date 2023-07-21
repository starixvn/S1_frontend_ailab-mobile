import classNames from "classnames";
import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import { number_format } from "../common/common";

const ReferralHistoryDetails = ({
	referralDetail = [],
	active,
	setIsDetailsActive
}) => {
	const { t } = useTranslation();

	return (
		<div id="popup" className={classNames("detailpop", { active })}>
			<div className="popTit">
				{t("lbl_Details")}
				<div
					className="icon icon-close"
					onClick={() => setIsDetailsActive(false)}
				/>
			</div>
			<div className="infoList">
				{referralDetail.map((item, index) => (
					<div className="info" key={item.settledDate}>
						<ul>
							<li>
								<span className="title">NO.</span>
								<span>{index + 1}</span>
							</li>
							<li>
								<span className="title">{t("lbl_Date")}</span>
								<span>
									{moment(
										item.settledDate,
										"YYYY-MM-DDThh:mm:ssZ"
									)
										.zone("+07:00")
										.format("DD/MM/YYYY")}
								</span>
							</li>
							<li>
								<span className="title">
									{t("lbl_Username")}
								</span>
								<span>{item.userName}</span>
							</li>
							<li>
								<span className="title">
									{t("lbl_TotalDeposit")}
								</span>
								<span>
									{number_format(
										item.totalDeposit ?? 0,
										false
									)}
								</span>
							</li>
							<li>
								<span className="title">
									{t("lbl_RewardAmount")}
								</span>
								<span>
									{number_format(
										item.rewardAmount ?? 0,
										false
									)}
								</span>
							</li>
						</ul>
					</div>
				))}
			</div>
		</div>
	);
};

export default ReferralHistoryDetails;
