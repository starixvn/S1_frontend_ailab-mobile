import React, { useState, useEffect } from "react";
import { api_events_GetLeaderboardListV2 } from "../../service/api/events";

import no1 from "../../styles/img/top10/no1.png";
import no2 from "../../styles/img/top10/no2.png";
import no3 from "../../styles/img/top10/no3.png";
import no4 from "../../styles/img/top10/no4.png";
import no5 from "../../styles/img/top10/no5.png";
import no6 from "../../styles/img/top10/no6.png";
import no7 from "../../styles/img/top10/no7.png";
import no8 from "../../styles/img/top10/no8.png";
import no9 from "../../styles/img/top10/no9.png";
import no10 from "../../styles/img/top10/no10.png";
import money from "../../styles/img/top10/money.png";
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
		<div className="top10win">
			<div className="topImg" />
			<div className="title">{i18n.lbl_Top10winners}</div>
			<div className="top10Box">
				<div>
					{rank.map((el, index) => (
						<div key={el.custId}>
							<div className="cap">
								<img src={numMap[index + 1]} alt="number" />
								<p>{el.userName}</p>
							</div>
							<div className="money">
								<img src={money} alt="money" />
								<p>{number_format(el.wTurnover)}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Top10winner;
