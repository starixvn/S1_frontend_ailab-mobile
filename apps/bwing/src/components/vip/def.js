import vipBanner1_en from "../../styles/img/vip/en/vip_1.png";
import vipBanner2_en from "../../styles/img/vip/en/vip_2.png";
import vipBanner3_en from "../../styles/img/vip/en/vip_3.png";
import vipBanner4_en from "../../styles/img/vip/en/vip_4.png";
import vipBanner5_en from "../../styles/img/vip/en/vip_5.png";
import vipBanner6_en from "../../styles/img/vip/en/vip_6.png";

import vipBanner1_vn from "../../styles/img/vip/vn/vip_1.png";
import vipBanner2_vn from "../../styles/img/vip/vn/vip_2.png";
import vipBanner3_vn from "../../styles/img/vip/vn/vip_3.png";
import vipBanner4_vn from "../../styles/img/vip/vn/vip_4.png";
import vipBanner5_vn from "../../styles/img/vip/vn/vip_5.png";
import vipBanner6_vn from "../../styles/img/vip/vn/vip_6.png";

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
					vipBanner1_vn,
					vipBanner2_vn,
					vipBanner3_vn,
					vipBanner4_vn,
					vipBanner5_vn,
					vipBanner6_vn
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
		levelName: "lbl_BWING_Club"
	}
];
