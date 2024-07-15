import React from "react";
import { useTranslation } from "react-i18next";
import { useLeaderBoard } from "@ailab-mobile/common";
import { Link } from "@reach/router";
import { bannerImgUrl } from "../../config";
import { numFormatToDigits } from "../common/common";
import { rankMap } from "./def";
import path from "../../path";

const TopWinner = () => {
	const { t } = useTranslation();
	const { homeRankList } = useLeaderBoard();
	return (
		<>
			<div className="home-title row-align-center txt-bigger txt-center mb-4">
				{t("lbl_Top_Winner_Description")}
			</div>
			<Link to={`/${path.leaderboard.root}`}>
				<div className="home-topwinner mb-4">
					<div className="title">{t("lbl_Top10winners")}</div>
					<div className="home-topwinner-content">
						{homeRankList &&
							homeRankList.map(
								({ userName, wTurnover }, index) => (
									<div
										key={`${userName}${wTurnover}`}
										className="home-topwinner-item">
										<div>
											{index < 3 ? (
												<img
													src={`${bannerImgUrl}/h5/img/4.0/ranking/${
														rankMap[index + 1]
													}.png`}
													alt=""
												/>
											) : (
												<div>{index + 1}</div>
											)}
										</div>
										<div>{userName}</div>
										<div>
											<div>
												{numFormatToDigits(
													wTurnover,
													0
												)}
											</div>
										</div>
									</div>
								)
							)}
					</div>
				</div>
			</Link>
		</>
	);
};

export default TopWinner;
