import vipBanner1_en from "../../styles/img/vip/en/banner_vip1.jpg";
import vipBanner2_en from "../../styles/img/vip/en/banner_vip2.jpg";
import vipBanner3_en from "../../styles/img/vip/en/banner_vip3.jpg";
import vipBanner4_en from "../../styles/img/vip/en/banner_vip4.jpg";
import vipBanner5_en from "../../styles/img/vip/en/banner_vip5.jpg";
import vipBanner6_en from "../../styles/img/vip/en/banner_vip6.jpg";

import vipClub1_en from "../../styles/img/vip/vip1.png";
import vipClub2_en from "../../styles/img/vip/vip2.png";
import vipClub3_en from "../../styles/img/vip/vip3.png";
import vipClub4_en from "../../styles/img/vip/vip4.png";
import vipClub5_en from "../../styles/img/vip/vip5.png";
import vipClub6_en from "../../styles/img/vip/vip6.png";

export const defBannersUrl = ({ langId }) => {
	const imgArr =
		langId === "en"
			? [
					vipBanner1_en,
					vipBanner2_en,
					vipBanner3_en,
					vipBanner4_en,
					vipBanner5_en,
					vipBanner6_en
			  ]
			: [vip1_en, vip2_en, vip3_en, vip4_en, vip5_en, vip6_en];
	return imgArr;
};

export const defLevelList = [
	{
		imgUrl: "https://image.n88media.com/VIP/img/vip01.png",
		levelName: "lbl_Vintage_Club"
	},
	{
		imgUrl: "https://image.n88media.com/VIP/img/vip02.png",
		levelName: "lbl_Silver_Club"
	},
	{
		imgUrl: "https://image.n88media.com/VIP/img/vip03.png",
		levelName: "lbl_Gold_Club"
	},
	{
		imgUrl: "https://image.n88media.com/VIP/img/vip04.png",
		levelName: "lbl_Titanium_Club"
	},
	{
		imgUrl: "https://image.n88media.com/VIP/img/vip05.png",
		levelName: "lbl_Diamond_Club"
	},
	{
		imgUrl: "https://image.n88media.com/VIP/img/vip06.png",
		levelName: "lbl_Nova_Club"
	}
];
