import React from "react";
import { useTranslation } from "react-i18next";
import { REWARD_ITEMS } from "../def";
import { bannerImgUrl } from "../../../config";
import { numFormatToDigits } from "../../common/common";

const RewardItem = () => {
	const { t } = useTranslation();
	return (
		<>
			<div className="reward-title">
				<img
					src={`${bannerImgUrl}/desktop/img/event/eurocup/title-item.png`}
					alt=""
				/>
				<span>{t("lbl_CupEvent_RewardItem")}</span>
			</div>
			{/* className添加active為開獎樣式 */}
			<div className="reward ">
				{REWARD_ITEMS.map(({ key, displayKey, img, amount, count }) => (
					<div className="reward-item" key={key}>
						<div className="title">
							{t(displayKey)}
							{/* 冠軍樣式 */}
							{key === 1 && (
								<img
									src={`${bannerImgUrl}/desktop/img/event/eurocup/crown.png`}
									alt=""
								/>
							)}
						</div>
						<div>
							<div className="reward-item-text">
								<span>{t("lbl_CupEvent_CashPrize")}</span>
								<div>{numFormatToDigits(amount, 0)} VND</div>
							</div>
							<div className="reward-item-text">
								<span>{t("lbl_CupEvent_PrizeCount")}</span>
								<div>{count}</div>
							</div>
						</div>
						<div>
							<span>{t("lbl_CupEvent_Winners")}</span>
							<span>{t("lbl_CupEvent_DrawnOutOn")} 07/15</span>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default RewardItem;
