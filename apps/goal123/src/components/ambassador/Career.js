import React from "react";
import { useTranslation } from "react-i18next";
import { bannerImgUrl } from "../../config"; // 導入配置文件中的變數

// Ambassador Career Section
// lbl_Ambassador_Professional_Career: "Professional Career",
// lbl_Ambassador_Chemnitzer_FC: "Chemnitzer FC",
// lbl_Ambassador_FC_Kaiserslautern: "FC Kaiserslautern",
// lbl_Ambassador_Bayer_Leverkusen: "Bayer Leverkusen",
// lbl_Ambassador_Bayern_Munich: "Bayern Munich",
// lbl_Ambassador_Chelsea: "Chelsea",
// lbl_Ambassador_Total_Appearances: "Total Appearances",
// lbl_Ambassador_Total_Goals: "Total Goals"

const Career = () => {
	const { t } = useTranslation();
	return (
		<div className="ambassador-career">
			<div className="title">
				{t("lbl_Ambassador_Professional_Career")}
			</div>
			<div className="ambassador-career-block">
				<div className="ambassador-career-item">
					<img
						src={`${bannerImgUrl}/h5/img/ambassador/career-logo-1.png`} // 使用 bannerImgUrl 變數
						alt=""
					/>
					<div>
						1995-1997
						<span> {t("lbl_Ambassador_Chemnitzer_FC")}</span>
					</div>
				</div>
				<div className="ambassador-career-item">
					<img
						src={`${bannerImgUrl}/h5/img/ambassador/career-logo-2.png`} // 使用 bannerImgUrl 變數
						alt=""
					/>
					<div>
						1997-1999
						<span>{t("lbl_Ambassador_FC_Kaiserslautern")}</span>
					</div>
				</div>
				<div className="ambassador-career-item">
					<img
						src={`${bannerImgUrl}/h5/img/ambassador/career-logo-3.png`} // 使用 bannerImgUrl 變數
						alt=""
					/>
					<div>
						1999-2002
						<span>{t("lbl_Ambassador_Bayer_Leverkusen")}</span>
					</div>
				</div>
				<div className="ambassador-career-item">
					<img
						src={`${bannerImgUrl}/h5/img/ambassador/career-logo-4.png`} // 使用 bannerImgUrl 變數
						alt=""
					/>
					<div>
						2002-2006
						<span> {t("lbl_Ambassador_Bayern_Munich")}</span>
					</div>
				</div>
				<div className="ambassador-career-item">
					<img
						src={`${bannerImgUrl}/h5/img/ambassador/career-logo-5.png`} // 使用 bannerImgUrl 變數
						alt=""
					/>
					<div>
						2006-2010
						<span>{t("lbl_Ambassador_Chelsea")}</span>
					</div>
				</div>
				<div className="ambassador-career-item">
					<img
						src={`${bannerImgUrl}/h5/img/ambassador/career-logo-6.png`} // 使用 bannerImgUrl 變數
						alt=""
					/>
					<div>
						2010-2012
						<span>{t("lbl_Ambassador_Bayer_Leverkusen")}</span>
					</div>
				</div>
			</div>
			<div className="ambassador-career-block bottom">
				<div className="ambassador-career-item">
					<div>
						{t("lbl_Ambassador_Total_Appearances")}
						<span>456</span>
					</div>
				</div>
				<div className="ambassador-career-item">
					<div>
						{t("lbl_Ambassador_Total_Goals")}
						<span>117</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Career;
