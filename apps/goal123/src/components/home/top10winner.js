import React, { useState, useEffect } from "react";
import { api_events_GetLeaderboardListV2 } from "../../service/api/events";
import { bannerImgUrl } from "../../config";
import { number_format } from "../common/common";

const Top10winner = ({ i18n, setPopBox }) => {
	const numMap = {
		1: `${bannerImgUrl}/h5/img/top/first.png`,
		2: `${bannerImgUrl}/h5/img/top/second.png`,
		3: `${bannerImgUrl}/h5/img/top/third.png`,
		4: `${bannerImgUrl}/h5/img/top/four.png`,
		5: `${bannerImgUrl}/h5/img/top/five.png`,
		6: `${bannerImgUrl}/h5/img/top/six.png`,
		7: `${bannerImgUrl}/h5/img/top/seven.png`,
		8: `${bannerImgUrl}/h5/img/top/eight.png`,
		9: `${bannerImgUrl}/h5/img/top/nine.png`,
		10: `${bannerImgUrl}/h5/img/top/ten.png`
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
				<img
					src={`${bannerImgUrl}/h5/img/top/winicon.png`}
					alt="wini"
				/>
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
							<img
								src={`${bannerImgUrl}/h5/img/top/money.png`}
								alt="money"
							/>
							<div>{number_format(el.wTurnover)}</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Top10winner;
