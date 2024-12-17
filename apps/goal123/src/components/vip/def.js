import { bannerImgUrl } from "../../config";

export const defBannersUrl = ({ langId }) => {
	const imgArr =
		langId === "en"
			? [
					`${bannerImgUrl}/h5/img/vip/en/banner_vip1.jpg`,
					`${bannerImgUrl}/h5/img/vip/en/banner_vip2.jpg`,
					`${bannerImgUrl}/h5/img/vip/en/banner_vip3.jpg`,
					`${bannerImgUrl}/h5/img/vip/en/banner_vip4.jpg`,
					`${bannerImgUrl}/h5/img/vip/en/banner_vip5.jpg`
					// // `${bannerImgUrl}/h5/img/vip/en/banner_vip6.jpg`
			  ]
			: [
					`${bannerImgUrl}/h5/img/vip/vn/banner_vip1.jpg`,
					`${bannerImgUrl}/h5/img/vip/vn/banner_vip2.jpg`,
					`${bannerImgUrl}/h5/img/vip/vn/banner_vip3.jpg`,
					`${bannerImgUrl}/h5/img/vip/vn/banner_vip4.jpg`,
					`${bannerImgUrl}/h5/img/vip/vn/banner_vip5.jpg`
					// // `${bannerImgUrl}/h5/img/vip/vn/banner_vip6.jpg`
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
		levelName_col1: "GOAL",
		levelName_col2: "123",
		levelName_col3: "CLUB"
	}
];

/**
 * 回饋類表，避免魔術數字
 * @Sports 體育
 * @Casino 賭場
 * @LiveCasino 真人賭場
 * @VirtualSports 虛擬體育
 * @ESports 電子競技
 */
export const VipSpecialRebate = {
	Sport: 0,
	Casino: 1,
	LiveCasino: 2,
	VirtualSports: 3,
	ESports: 4
};
