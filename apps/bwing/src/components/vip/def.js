import { bannerImgUrl } from "../../config";

export const defBannersUrl = ({ langId }) => {
	const imgArr =
		langId === "en"
			? [
					`${bannerImgUrl}/h5/img/vip/en/vip_1.png`,
					`${bannerImgUrl}/h5/img/vip/en/vip_2.png`,
					`${bannerImgUrl}/h5/img/vip/en/vip_3.png`,
					`${bannerImgUrl}/h5/img/vip/en/vip_4.png`,
					`${bannerImgUrl}/h5/img/vip/en/vip_5.png`,
					`${bannerImgUrl}/h5/img/vip/en/vip_6.png`
			  ]
			: [
					`${bannerImgUrl}/h5/img/vip/vn/vip_1.png`,
					`${bannerImgUrl}/h5/img/vip/vn/vip_2.png`,
					`${bannerImgUrl}/h5/img/vip/vn/vip_3.png`,
					`${bannerImgUrl}/h5/img/vip/vn/vip_4.png`,
					`${bannerImgUrl}/h5/img/vip/vn/vip_5.png`,
					`${bannerImgUrl}/h5/img/vip/vn/vip_6.png`
			  ];
	return imgArr;
};

export const defLevelList = [
	{
		imgUrl: `${bannerImgUrl}/h5/img/vip/vip1.png`,
		levelName: "lbl_Vintage_Club"
	},
	{
		imgUrl: `${bannerImgUrl}/h5/img/vip/vip2.png`,
		levelName: "lbl_Silver_Club"
	},
	{
		imgUrl: `${bannerImgUrl}/h5/img/vip/vip3.png`,
		levelName: "lbl_Gold_Club"
	},
	{
		imgUrl: `${bannerImgUrl}/h5/img/vip/vip4.png`,
		levelName: "lbl_Titanium_Club"
	},
	{
		imgUrl: `${bannerImgUrl}/h5/img/vip/vip5.png`,
		levelName: "lbl_Diamond_Club"
	},
	{
		imgUrl: `${bannerImgUrl}/h5/img/vip/vip6.png`,
		levelName: "lbl_BWING_Club"
	}
];

export const VIP_SPECIAL_REBATE = {
	sport: 1,
	liveCasino: 3,
	casino: 2,
	virtualSports: 7
};
