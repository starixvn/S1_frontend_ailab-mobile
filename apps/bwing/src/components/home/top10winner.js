import React, { useState, useEffect } from "react";
import { api_events_GetLeaderboardList } from "../../service/api/events";
import { bannerImgUrl } from "../../config";
import { number_format } from "../common/common";

const Top10winner = ({ i18n, setPopBox }) => {
	const numMap = {
		1: `${bannerImgUrl}/h5/img/top10/no1.png`,
		2: `${bannerImgUrl}/h5/img/top10/no2.png`,
		3: `${bannerImgUrl}/h5/img/top10/no3.png`,
		4: `${bannerImgUrl}/h5/img/top10/no4.png`,
		5: `${bannerImgUrl}/h5/img/top10/no5.png`,
		6: `${bannerImgUrl}/h5/img/top10/no6.png`,
		7: `${bannerImgUrl}/h5/img/top10/no7.png`,
		8: `${bannerImgUrl}/h5/img/top10/no8.png`,
		9: `${bannerImgUrl}/h5/img/top10/no9.png`,
		10: `${bannerImgUrl}/h5/img/top10/no10.png`
	};
	const [rank, setRank] = useState([]);
	useEffect(() => {
		const getRank = async () => {
			try {
				const res = await api_events_GetLeaderboardList({
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
								<img
									src={`${bannerImgUrl}/h5/img/top10/money.png`}
									alt="money"
								/>
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
