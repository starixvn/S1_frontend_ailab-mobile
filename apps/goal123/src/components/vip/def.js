import vipBanner1_en from "../../styles/img/vip/en/banner_vip1.jpg";
import vipBanner2_en from "../../styles/img/vip/en/banner_vip2.jpg";
import vipBanner3_en from "../../styles/img/vip/en/banner_vip3.jpg";
import vipBanner4_en from "../../styles/img/vip/en/banner_vip4.jpg";
import vipBanner5_en from "../../styles/img/vip/en/banner_vip5.jpg";
import vipBanner6_en from "../../styles/img/vip/en/banner_vip6.jpg";

import vipClub1 from "../../styles/img/vip/vip1.png";
import vipClub2 from "../../styles/img/vip/vip2.png";
import vipClub3 from "../../styles/img/vip/vip3.png";
import vipClub4 from "../../styles/img/vip/vip4.png";
import vipClub5 from "../../styles/img/vip/vip5.png";
import vipClub6 from "../../styles/img/vip/vip6.png";

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
			: [
					vipBanner1_en,
					vipBanner1_en,
					vipBanner1_en,
					vipBanner1_en,
					vipBanner1_en,
					vipBanner1_en
			  ];
	return imgArr;
};

export const defLevelList = [
	{
		imgUrl: vipClub1,
		levelName: "lbl_Vintage_Club"
	},
	{
		imgUrl: vipClub2,
		levelName: "lbl_Silver_Club"
	},
	{
		imgUrl: vipClub3,
		levelName: "lbl_Gold_Club"
	},
	{
		imgUrl: vipClub4,
		levelName: "lbl_Titanium_Club"
	},
	{
		imgUrl: vipClub5,
		levelName: "lbl_Diamond_Club"
	},
	{
		imgUrl: vipClub6,
		levelName_col1: "GOAL",
		levelName_col2: "123",
		levelName_col3: "VIP"
	}
];
