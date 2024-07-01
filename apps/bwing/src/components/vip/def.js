import { bannerImgUrl } from "../../config";

export const defBannersUrl = ({ langId }) => {
	const imgArr =
		langId === "en"
			? [
					`${bannerImgUrl}/h5/img/4.0/vip/en/vip-1.jpg`,
					`${bannerImgUrl}/h5/img/4.0/vip/en/vip-2.jpg`,
					`${bannerImgUrl}/h5/img/4.0/vip/en/vip-3.jpg`,
					`${bannerImgUrl}/h5/img/4.0/vip/en/vip-4.jpg`,
					`${bannerImgUrl}/h5/img/4.0/vip/en/vip-5.jpg`,
					`${bannerImgUrl}/h5/img/4.0/vip/en/vip-6.jpg`
			  ]
			: [
					`${bannerImgUrl}/h5/img/4.0/vip/vn/vip-1.jpg`,
					`${bannerImgUrl}/h5/img/4.0/vip/vn/vip-2.jpg`,
					`${bannerImgUrl}/h5/img/4.0/vip/vn/vip-3.jpg`,
					`${bannerImgUrl}/h5/img/4.0/vip/vn/vip-4.jpg`,
					`${bannerImgUrl}/h5/img/4.0/vip/vn/vip-5.jpg`,
					`${bannerImgUrl}/h5/img/4.0/vip/vn/vip-6.jpg`
			  ];
	return imgArr;
};

export const defLevelList = [
	{
		imgUrl: `${bannerImgUrl}/h5/img/4.0/vip/vip1.png`,
		levelName: "lbl_Vintage_Club"
	},
	{
		imgUrl: `${bannerImgUrl}/h5/img/4.0/vip/vip2.png`,
		levelName: "lbl_Silver_Club"
	},
	{
		imgUrl: `${bannerImgUrl}/h5/img/4.0/vip/vip3.png`,
		levelName: "lbl_Gold_Club"
	},
	{
		imgUrl: `${bannerImgUrl}/h5/img/4.0/vip/vip4.png`,
		levelName: "lbl_Titanium_Club"
	},
	{
		imgUrl: `${bannerImgUrl}/h5/img/4.0/vip/vip5.png`,
		levelName: "lbl_Diamond_Club"
	},
	{
		imgUrl: `${bannerImgUrl}/h5/img/4.0/vip/vip6.png`,
		levelName: "lbl_BWING_Club"
	}
];

export const VIP_SPECIAL_REBATE = {
	sport: 1,
	liveCasino: 3,
	casino: 2,
	virtualSports: 7
};

/**
 * 回饋類表，避免魔術數字
 * @Sports 體育
 * @Casino 賭場
 * @LiveCasino 真人賭場
 * @VirtualSports 虛擬體育
 * @ESports 電子競技
 */
export const RebateCategory = Object.freeze({
	Sports: 0,
	Casino: 1,
	LiveCasino: 2,
	VirtualSports: 3,
	ESports: 4
});
