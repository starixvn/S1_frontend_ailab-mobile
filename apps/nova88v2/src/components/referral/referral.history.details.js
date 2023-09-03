import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import moment from "moment";
import { isConvert, number_format } from "../common/common";
import { userInfoContext } from "../common/context";

const ReferralHistoryDetails = ({
	referralDetail = [],
	active,
	setIsDetailsActive
}) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const _isConvert = isConvert(userInfo.currencyId);

	return (
		<div id="popup" className={classNames("detailpop", { active })}>
			<div className="pop">
				<div className="popTit">
					{t("lbl_Details")}
					<div
						className="icon icon-close"
						onClick={() => setIsDetailsActive(false)}
					/>
				</div>
				<div className="infoList">
					{referralDetail.map((item, index) => (
						// eslint-disable-next-line react/no-array-index-key
						<div className="info" key={item.settledDate}>
							<ul>
								<li>
									<span className="title">No.</span>
									<span>{index + 1}</span>
								</li>
								<li>
									<span className="title">
										{t("lbl_Date")}
									</span>
									<span>
										{moment(
											item.settledDate,
											"YYYY-MM-DDThh:mm:ssZ"
										).format("DD/MM/YYYY")}
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
											_isConvert
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
											_isConvert
										)}
									</span>
								</li>
							</ul>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ReferralHistoryDetails;
