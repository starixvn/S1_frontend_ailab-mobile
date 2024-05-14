import React from "react";
import { useTranslation } from "react-i18next";
import { number_format } from "../utils/homeFormatter";
import { bannerImgUrl } from "../../../config";
import useTopWinnerList from "../hooks/useWinnerList";

import "swiper/swiper.min.css";

const HomeLeaderBoard = () => {
	const { winnerList } = useTopWinnerList();
	const { t } = useTranslation();

	return (
		<div className="home-leaderboard">
			<div className="home-title">
				{t("Label_Leaderboard_TopWinners")}
			</div>
			<div className="winner-total">
				<div className="user-ranking">
					{winnerList.map((winner, index) => (
						<div
							className={
								index < 3 ? "user-list top" : "user-list"
							}
							key={winner.custId}>
							<div className="left">
								<div className="order">
									{index < 3 ? (
										<img
											src={`${bannerImgUrl}/desktop/img/home-page/leaderboard/winner-${
												index + 1
											}.png`}
											alt={`img-top${index + 1}`}
										/>
									) : (
										<div className="order">{index + 1}</div>
									)}
								</div>
								<div className="user-id">{winner.userName}</div>
							</div>
							<div className="right">
								<i className="icon-cash" />
								<span>
									{number_format({
										number: winner.wTurnover
									})}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default HomeLeaderBoard;
