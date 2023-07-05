import { cloudBannerImgURL } from "../../config";

export const VIP_LEVEL = {
	VIP_LEVEL_VINTAGE: 1,
	VIP_LEVEL_SILVER: 2,
	VIP_LEVEL_GOLD: 3,
	VIP_LEVEL_TITANIUM: 4,
	VIP_LEVEL_DIAMOND: 5,
	VIP_LEVEL_NOVA: 6
};

export const defbanner = langId => [
	{
		url: `${cloudBannerImgURL}/h5/img/vintage${
			langId ? `-${langId}` : langId
		}.png`,
		level: VIP_LEVEL.VIP_LEVEL_VINTAGE,
		levelText: "vintage"
	},
	{
		url: `${cloudBannerImgURL}/h5/img/silver${
			langId ? `-${langId}` : langId
		}.png`,
		level: VIP_LEVEL.VIP_LEVEL_SILVER,
		levelText: "silver"
	},
	{
		url: `${cloudBannerImgURL}/h5/img/gold${
			langId ? `-${langId}` : langId
		}.png`,
		level: VIP_LEVEL.VIP_LEVEL_GOLD,
		levelText: "gold"
	},
	{
		url: `${cloudBannerImgURL}/h5/img/titanium${
			langId ? `-${langId}` : langId
		}.png`,
		level: VIP_LEVEL.VIP_LEVEL_TITANIUM,
		levelText: "titanium"
	},
	{
		url: `${cloudBannerImgURL}/h5/img/diamond${
			langId ? `-${langId}` : langId
		}.png`,
		level: VIP_LEVEL.VIP_LEVEL_DIAMOND,
		levelText: "diamond"
	},
	{
		url: `${cloudBannerImgURL}/h5/img/nova${
			langId ? `-${langId}` : langId
		}.png`,
		level: VIP_LEVEL.VIP_LEVEL_NOVA,
		levelText: "nova"
	}
];

export const defLevelList = [
	{
		imgUrl: "https://banner.0814media.net/h5/img/vip1.png",
		levelClubName: "lbl_Vintage_Club",
		levelName: "lbl_VIP_Vintage",
		levelTabsName: "vintage",
		level: VIP_LEVEL.VIP_LEVEL_VINTAGE
	},
	{
		imgUrl: "https://banner.0814media.net/h5/img/vip2.png",
		levelClubName: "lbl_Silver_Club",
		levelName: "lbl_VIP_Silver",
		levelTabsName: "silver",
		level: VIP_LEVEL.VIP_LEVEL_SILVER
	},
	{
		imgUrl: "https://banner.0814media.net/h5/img/vip3.png",
		levelClubName: "lbl_Gold_Club",
		levelName: "lbl_VIP_Gold",
		levelTabsName: "gold",
		level: VIP_LEVEL.VIP_LEVEL_GOLD
	},
	{
		imgUrl: "https://banner.0814media.net/h5/img/vip4.png",
		levelClubName: "lbl_Titanium_Club",
		levelName: "lbl_VIP_Titanium",
		levelTabsName: "titanium",
		level: VIP_LEVEL.VIP_LEVEL_TITANIUM
	},
	{
		imgUrl: "https://banner.0814media.net/h5/img/vip5.png",
		levelClubName: "lbl_Diamond_Club",
		levelName: "lbl_VIP_Diamond",
		levelTabsName: "diamond",
		level: VIP_LEVEL.VIP_LEVEL_DIAMOND
	},
	{
		imgUrl: "https://banner.0814media.net/h5/img/vip6.png",
		levelClubName: "lbl_Nova_Club",
		levelName: "lbl_VIP_Nova",
		levelTabsName: "nova",
		level: VIP_LEVEL.VIP_LEVEL_NOVA
	}
];
