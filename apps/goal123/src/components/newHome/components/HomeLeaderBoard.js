import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@reach/router";
import { bannerImgUrl } from "../../../config";
import useTopWinnerList from "../hooks/useWinnerList";
import "swiper/swiper.min.css";
import { numFormatToDigits } from "../../common/common";
import path from "../../../path";

const HomeLeaderBoard = () => {
	const { winnerList } = useTopWinnerList();
	const { t } = useTranslation();

	return (
		<div className="home-leaderboard">
			<div className="home-title">
				{t("Label_Leaderboard_TopWinners")}
			</div>
			<Link to={`/${path.leaderBoard.root}`}>
				<div className="winner-total">
					<div className="user-ranking">
						{/* 渲染前三名 Item，會有獎牌，所以前三名跟其他 Item 處理方式不同 */}
						{winnerList.map(({ userName, wTurnover }, index) => (
							<div
								className={
									index < 3 ? "user-list top" : "user-list"
								}
								key={`${userName}${wTurnover}`}>
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
											<div className="order">
												{index + 1}
											</div>
										)}
									</div>
									<div className="user-id">
										{winner.userName}
									</div>
								</div>
								<div className="right">
									<i className="icon-cash" />
									<span>
										{numFormatToDigits(winner.wTurnover)}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</Link>
		</div>
	);
};

export default HomeLeaderBoard;
