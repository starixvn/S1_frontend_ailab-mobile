import React from "react";
import { useTranslation } from "react-i18next";
import { useGetCustVIPProgressQuery } from "@ailab-mobile/service";
import { bannerImgUrl } from "apps/goal123/src/config";
import { number_format } from "../../newHome/utils/homeFormatter";

export const MemberVipInfo = () => {
	const { t } = useTranslation();

	const defPageClubImg = [
		{
			img: `${bannerImgUrl}/desktop/img/vip/vip1.png`,
			displayKey: "lbl_Vintage_Club",
			alt: "vip01",
			className: "bronze"
		},
		{
			img: `${bannerImgUrl}/desktop/img/vip/vip2.png`,
			displayKey: "lbl_Silver_Club",
			alt: "vip02",
			className: "silver"
		},
		{
			img: `${bannerImgUrl}/desktop/img/vip/vip3.png`,
			displayKey: "lbl_Gold_Club",
			alt: "vip03",
			className: "gold"
		},
		{
			img: `${bannerImgUrl}/desktop/img/vip/vip4.png`,
			displayKey: "lbl_Titanium_Club",
			alt: "vip04",
			className: "titanium"
		},
		{
			img: `${bannerImgUrl}/desktop/img/vip/vip5.png`,
			displayKey: "lbl_Diamond_Club",
			alt: "vip05",
			className: "diamond"
		},
		{
			img: `${bannerImgUrl}/desktop/img/vip/vip6.png`,
			displayKey: "lbl_GOAL123_Club",
			alt: "vip06",
			className: "goal123"
		}
	];

	const {
		data: { data: custVIPProgress } = {}
	} = useGetCustVIPProgressQuery(null, { refetchOnMountOrArgChange: true });

	const isVipLevelHighest = custVIPProgress?.upDeposit === null;

	const {
		displayKey: currentVipDisplayKey,
		className: currentVipClassName,
		img: currentVipImg,
		alt: currentVipAlt
	} = custVIPProgress
		? defPageClubImg[custVIPProgress?.currentVipLevel - 1]
		: {};

	const {
		displayKey: nextVipDisplayKey,
		className: nextVipClassName,
		img: nextVipImg,
		alt: nextVipAlt
	} =
		custVIPProgress && !isVipLevelHighest
			? defPageClubImg[custVIPProgress?.currentVipLevel]
			: {};

	const vipProgress = Math.floor(
		(custVIPProgress?.actualDeposit / custVIPProgress?.upDeposit) * 100
	);

	return custVIPProgress ? (
		<div className="member-vip">
			<div className="vip-top">
				<div className={`vip-current ${currentVipClassName}`}>
					{t("Label_Menu_Current")}:{" "}
					<span>{t(currentVipDisplayKey)}</span>
				</div>

				{!isVipLevelHighest && (
					<div className="vip-next">
						{t("lbl_Next")}: <span>{t(nextVipDisplayKey)}</span>
					</div>
				)}
			</div>

			<div className="vip-bottom">
				{isVipLevelHighest ? (
					<div className="vip-extra">
						<img
							className="goal123"
							src={defPageClubImg[defPageClubImg.length - 1].img}
							alt="vip06"
						/>
						<p>{t("lbl_WaitForInvitation")}</p>
					</div>
				) : (
					<>
						<div className="vip-badge">
							<img
								className={currentVipClassName}
								src={currentVipImg}
								alt={currentVipAlt}
							/>
							<div className="progress">
								<div
									className="progress-bar"
									style={{
										width: `${Math.min(vipProgress, 100)}%`
									}}
								/>
							</div>
							<img
								className={nextVipClassName}
								src={nextVipImg}
								alt={nextVipAlt}
							/>
						</div>
						<div className="progress-number">
							<span>
								{number_format({
									number: custVIPProgress?.actualDeposit,
									formatRequired: true,
									digits: 0
								})}
							</span>
							/
							{number_format({
								number: custVIPProgress?.upDeposit,
								formatRequired: true,
								digits: 0
							})}
						</div>
					</>
				)}
			</div>
		</div>
	) : null;
};

export default MemberVipInfo;
