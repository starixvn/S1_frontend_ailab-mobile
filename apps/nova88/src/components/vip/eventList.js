import React from "react";
import THBList from "./eventListTHB";

const langToCurrency = {
	en: "MYR",
	cs: "MYR",
	th: "THB",
	id: "IDR"
};

export const EventList = ({ langId }) => {
	return (
		<div className="vipPage">
			<table className="eventList">
				<tbody>
					<tr className="title">
						<td colSpan="7" className="icon icon-nova88">
							Service Support
						</td>
					</tr>
					<tr>
						<td colSpan="7">DEPOSIT PRIORITY</td>
					</tr>
					<tr>
						<td>
							<i className="icon icon-checkmark" />
						</td>
						<td>
							<i className="icon icon-checkmark" />
						</td>
						<td>
							<i className="icon icon-checkmark" />
							High
						</td>
						<td>
							<i className="icon icon-checkmark" />
							High
						</td>
						<td>
							<i className="icon icon-checkmark" />
							High
						</td>
						<td>
							<i className="icon icon-checkmark" />
							High
						</td>
					</tr>
					<tr>
						<td colSpan="7">WITHDRAWAL PRIORITY</td>
					</tr>
					<tr>
						<td>
							<i className="icon icon-checkmark" />
						</td>
						<td>
							<i className="icon icon-checkmark" />
						</td>
						<td>
							<i className="icon icon-checkmark" />
							High
						</td>
						<td>
							<i className="icon icon-checkmark" />
							High
						</td>
						<td>
							<i className="icon icon-checkmark" />
							High
						</td>
						<td>
							<i className="icon icon-checkmark" />
							High
						</td>
					</tr>
					<tr>
						<td colSpan="7">24/7 SERVICE SUPPORT</td>
					</tr>
					<tr>
						<td>
							<i className="icon icon-checkmark" />
						</td>
						<td>
							<i className="icon icon-checkmark" />
						</td>
						<td>
							<i className="icon icon-checkmark" />
							High
						</td>
						<td>
							<i className="icon icon-checkmark" />
							High
						</td>
						<td>
							<i className="icon icon-checkmark" />
							High
						</td>
						<td>
							<i className="icon icon-checkmark" />
							High
						</td>
					</tr>
					<tr>
						<td colSpan="7">DESIGNATED ACCOUNT MANAGER</td>
					</tr>
					<tr>
						<td />
						<td />
						<td />
						<td>
							<i className="icon icon-checkmark" />
						</td>
						<td>
							<i className="icon icon-checkmark" />
						</td>
						<td>
							<i className="icon icon-checkmark" />
						</td>
					</tr>
					<tr>
						<td colSpan="7">UNLIMITED WITHDRAWAL AMOUNT</td>
					</tr>
					<tr>
						<td>Pending</td>
						<td>Pending</td>
						<td>Pending</td>
						<td>Pending</td>
						<td>Pending</td>
						<td>Pending</td>
					</tr>
					<tr className="title">
						<td colSpan="7" className="icon icon-nova88">
							Exclusive Bonus
							<span className="text-org">(langId)</span>
						</td>
					</tr>
					<tr>
						<td colSpan="7">TIER UPGRADE BONUS</td>
					</tr>
					<tr>
						<td />
						<td>200</td>
						<td>300</td>
						<td>600</td>
						<td>1200</td>
						<td>Invisible</td>
					</tr>
					<tr className="title">
						<td colSpan="7" className="icon icon-nova88">
							Special Rebate
						</td>
					</tr>
					<tr>
						<td colSpan="7">SPORT REBATE</td>
					</tr>
					<tr>
						<td>0.5%</td>
						<td>0.6%</td>
						<td>0.7%</td>
						<td>0.8%</td>
						<td>0.9%</td>
						<td>1%</td>
					</tr>
					<tr>
						<td colSpan="7">LIVE CASINO REBATE</td>
					</tr>
					<tr>
						<td>0.5%</td>
						<td>0.6%</td>
						<td>0.7%</td>
						<td>0.8%</td>
						<td>0.9%</td>
						<td>1%</td>
					</tr>
					<tr>
						<td colSpan="7">SLOT & FISHING REBATE</td>
					</tr>
					<tr>
						<td>0.8%</td>
						<td>0.9%</td>
						<td>1.1%</td>
						<td>1.3%</td>
						<td>1.5%</td>
						<td>1.7%</td>
					</tr>
					<tr>
						<td colSpan="7">VIRTUAL SPORT REBATE</td>
					</tr>
					<tr>
						<td>0.8%</td>
						<td>0.9%</td>
						<td>1.1%</td>
						<td>1.3%</td>
						<td>1.5%</td>
						<td>1.7%</td>
					</tr>
					<tr className="title">
						<td colSpan="7" className="icon icon-nova88">
							Referral Bonus Program
						</td>
					</tr>
					<tr>
						<td colSpan="7">REFERRAL BONUS</td>
					</tr>
					<tr>
						<td>
							<i className="icon icon-checkmark" />
						</td>
						<td>
							<i className="icon icon-checkmark" />
						</td>
						<td>
							<i className="icon icon-checkmark" />
						</td>
						<td>
							<i className="icon icon-checkmark" />
						</td>
						<td>
							<i className="icon icon-checkmark" />
						</td>
						<td>
							<i className="icon icon-checkmark" />
						</td>
					</tr>
					<tr className="title">
						<td colSpan="7" className="icon icon-nova88">
							Tier Upgrade Requirement
							<span className="text-org">(MYR)</span>
						</td>
					</tr>
					<tr>
						<td colSpan="7">MONTHLY MINIMUM DEPOSIT</td>
					</tr>
					<tr>
						<td />
						<td>50000</td>
						<td>150000</td>
						<td>450000</td>
						<td>800000</td>
						<td>Invisible</td>
					</tr>
					<tr className="title">
						<td colSpan="7" className="icon icon-nova88">
							Tier Maintenance Requirement
							<span className="text-org">(langId)</span>
						</td>
					</tr>
					<tr>
						<td colSpan="7">
							MINIMUM DEPOSIT WITHIN VALIDITY PERIOD
						</td>
					</tr>
					<tr>
						<td />
						<td />
						<td>25000</td>
						<td>150000</td>
						<td>300000</td>
						<td>Invisible</td>
					</tr>
					<tr>
						<td colSpan="7">
							MINIMUM TURNOVER WITHIN VALIDITY PERIOD
						</td>
					</tr>
					<tr>
						<td />
						<td />
						<td>250000</td>
						<td>1500000</td>
						<td>3000000</td>
						<td>Invisible</td>
					</tr>
					<tr>
						<td colSpan="7">RANKING VALIDITY MEMBERSHIP RENEWAL</td>
					</tr>
					<tr className="lastTd">
						<td>Normal</td>
						<td>Lifetime</td>
						<td>3 Months</td>
						<td>3 Months</td>
						<td>3 Months</td>
						<td>3 Months</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};
