import React from "react";
import { useTranslation } from "react-i18next";
import { REWARD_ITEMS } from "./def";
import { bannerImgUrl } from "../../config";

const Directions = () => {
	const { t } = useTranslation();
	const numbers = Array.from({ length: 10 }, (_, index) => index + 1);

	return (
		<div className="bottom-wrapper">
			<div className="bottom-title">{t("lbl_CupEvent_RewardItem")}</div>
			<div className="reward">
				{REWARD_ITEMS.map(
					({ key, displayKey, prize, count, imgName, winners }) => (
						<div className="reward-item" key={key}>
							<div className="reward-title">
								{t(displayKey)}
								{key === 1 && (
									<img
										src={`${bannerImgUrl}/h5/img/event/eurocup/crown.png`}
										alt="crown"
									/>
								)}
							</div>
							<div className="prize">
								<div className="prize-item">
									<div className="prize-item-text">
										<span>
											{t("lbl_CupEvent_CashPrize")}
										</span>
										<span>{prize}</span>
									</div>
									{count > 1 && (
										<div className="prize-item-text">
											<span>
												{t("lbl_CupEvent_PrizeCount")}
											</span>
											<span>{count}</span>
										</div>
									)}
								</div>
								<img
									src={`${bannerImgUrl}/h5/img/event/eurocup/${imgName}.png`}
									alt={imgName}
								/>
							</div>
							{/* 宣布贏家後winner加上active  */}
							<div className="winner ">
								<span>
									{t("lbl_CupEvent_Winners")}{" "}
									{t("lbl_CupEvent_DrawnOutOn")}
								</span>
							</div>
						</div>
					)
				)}
			</div>
			<div className="bottom-title">{t("lbl_TermsConditions")}</div>
			<ul className="bottom-info">
				{numbers.map(number => (
					<li key={number}>
						{t(`lbl_CupEvent_Terms_And_Conditions_${number}`)}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Directions;
