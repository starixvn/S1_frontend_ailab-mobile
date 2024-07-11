import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { bannerImgUrl } from "../../config";
import { numFormatToDigits } from "../common/common";
import { rankMap } from "./def";

const TopWinner = ({ leaderBoardList }) => {
	const { t } = useTranslation();

	return (
		<>
			<div className="home-title row-align-center txt-bigger txt-center mb-4">
				{t("lbl_Top_Winner_Description")}
			</div>
			<div className="home-topwinner mb-4">
				<div className="title">{t("lbl_Top10winners")}</div>
				<div className="home-topwinner-content">
					{leaderBoardList.map(
						({ userName, wTurnover, custId }, index) => (
							<div key={custId} className="home-topwinner-item">
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
								<div>{numFormatToDigits(wTurnover, 0)}</div>
							</div>
						)
					)}
				</div>
			</div>
		</>
	);
};

TopWinner.defaultProps = {
	leaderBoardList: []
};

TopWinner.propTypes = {
	leaderBoardList: PropTypes.arrayOf(PropTypes.any)
};

export default TopWinner;
