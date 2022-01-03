import React, { useState, useEffect } from "react";
import { api_events_GetLeaderboardListV2 } from "../../service/api/events";

import no1 from "../../styles/img/top/first.png";
import no2 from "../../styles/img/top/second.png";
import no3 from "../../styles/img/top/third.png";
import no4 from "../../styles/img/top/four.png";
import no5 from "../../styles/img/top/five.png";
import no6 from "../../styles/img/top/six.png";
import no7 from "../../styles/img/top/seven.png";
import no8 from "../../styles/img/top/eight.png";
import no9 from "../../styles/img/top/nine.png";
import no10 from "../../styles/img/top/ten.png";
import winner from "../../styles/img/top/winicon.png";
import money from "../../styles/img/top/money.png";
import { number_format } from "../common/common";

const Top10winner = ({ i18n, setPopBox }) => {
	const numMap = {
		1: no1,
		2: no2,
		3: no3,
		4: no4,
		5: no5,
		6: no6,
		7: no7,
		8: no8,
		9: no9,
		10: no10
	};
	const [rank, setRank] = useState([]);
	useEffect(() => {
		const getRank = async () => {
			try {
				const res = await api_events_GetLeaderboardListV2({
					lBCategoryId: 0,
					TopNum: 10,
					BeforeDays: 0,
					EventCode: "202104"
				});
				if (res.data.errorCode === 0) {
					setRank(res.data.data);
				} else {
					setPopBox({
						isOpen: true,
						content: `[${res.data.errorCode}] ${res.data.message}`
					});
				}
			} catch (error) {
				setPopBox({
					isOpen: true,
					content: i18n.msg_ApiServerError
				});
			}
		};
		getRank();
	}, []);
	return (
		<div className="topWinner">
			<div className="title">
				<img src={winner} alt="wini" />
				{i18n.lbl_Top10winners}
			</div>
			<ul>
				{rank.map((el, index) => (
					<li key={el.custId}>
						<div className="rankOrder">
							<img src={numMap[index + 1]} alt="number" />
							<div>{el.userName}</div>
						</div>
						<div className="rankMoney">
							<img src={money} alt="money" />
							<div>{number_format(el.wTurnover)}</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Top10winner;
