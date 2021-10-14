import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import * as reach from "@reach/router";
import * as api_site from "../../../service/api/site";
import * as api_account from "../../../service/api/account";
import * as api_accountStrict from "../../../service/api/accountStrict";
import { Wrapper } from "../../common/wrapper";
import Casino from "../../../pages/casino";
import * as ct from "../../common/context";

jest.spyOn(reach, "useLocation");
const mock = jest.spyOn(reach, "useNavigate");
jest.spyOn(api_account, "api_GetMsgCount");
jest.spyOn(api_account, "api_GetBalnace");
jest.spyOn(api_accountStrict, "api_GetCustProfile");
jest.spyOn(api_site, "api_CheckSignIn");
jest.spyOn(api_site, "api_Site_GetGameListByDevice");
jest.spyOn(api_site, "api_GetTpIds");
jest.spyOn(api_site, "api_site_GetBannerV3");
jest.spyOn(api_account, "api_GetFavoriteGame");
jest.spyOn(api_site, "api_site_GetTpMaintainList");
jest.spyOn(api_account, "api_SetFavoriteGame");

const preset = () => {
	reach.useLocation.mockImplementation(() => ({
		state: { fromHeader: false }
	}));
	api_accountStrict.api_GetCustProfile.mockImplementation(() =>
		Promise.resolve({
			data: {
				errorCode: -1,
				message: null,
				rawErrorCode: "",
				rawMessage: ""
			}
		})
	);

	api_site.api_CheckSignIn.mockImplementation(() =>
		Promise.resolve({
			data: {
				errorCode: 0,
				message: null,
				rawErrorCode: "",
				rawMessage: ""
			}
		})
	);
	api_account.api_GetMsgCount.mockImplementation(() =>
		Promise.resolve({
			data: {
				errorCode: -1,
				message: null,
				rawErrorCode: "",
				rawMessage: ""
			}
		})
	);
	api_account.api_GetBalnace.mockImplementation(() =>
		Promise.resolve({
			data: {
				errorCode: -1,
				message: null,
				rawErrorCode: "",
				rawMessage: ""
			}
		})
	);

	api_account.api_GetFavoriteGame.mockImplementation(() =>
		Promise.resolve({
			data: {
				errorCode: -1,
				message: null,
				rawErrorCode: "",
				rawMessage: ""
			}
		})
	);

	api_site.api_Site_GetGameListByDevice.mockImplementation(() =>
		Promise.resolve({
			data: {
				data: {
					imgUrl: "https://img.n88media.com",
					providerList: [
						{
							value: 5,
							name: "PP",
							displayText: "PP",
							playFree: false,
							gameList: {
								imgUrl: "",
								data: [
									{
										name: {
											cs: "三星报喜",
											en: "Three Star Fortune",
											id: "Keberuntungan Tiga Bintang",
											th: "ทรีสตาร์ ฟอร์จูน",
											vn: "Ba Ngôi Sao May Mắn",
											ch: "三星報喜"
										},
										appId: "vs10threestar",
										gameId: "vs10threestar",
										category1: "Slots",
										paylines: "10",
										rtp: "96.27%",
										reels: "5",
										imgName: {
											cs: "three-star-fortune-cs.jpg",
											en: "three-star-fortune-en.jpg",
											id: "three-star-fortune-id.jpg",
											th: "three-star-fortune-th.jpg",
											vn: "three-star-fortune-vn.jpg",
											ch: "three-star-fortune-ch.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: true,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "巨大犀牛Megaways",
											cs: "巨大犀牛Megaways",
											en: "Great Rhino Megaways",
											id: "Megaways Badak Besar",
											th: "เกรตไรโน Megaways",
											vn: "Tê giác Khổng lồ Megaways"
										},
										appId: "vswaysrhino",
										gameId: "vswaysrhino",
										category1: "Slots",
										paylines: "200704",
										rtp: "96.50%",
										reels: "6",
										imgName: {
											ch: "great-rhino-megaways-ch.jpg",
											cs: "great-rhino-megaways-cs.jpg",
											en: "great-rhino-megaways-en.jpg",
											id: "great-rhino-megaways-id.jpg",
											th: "great-rhino-megaways-th.jpg",
											vn: "great-rhino-megaways-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: true,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: true,
										playFree: true
									},
									{
										name: {
											cs: "热火燃烧",
											vn: "Nóng Bỏng",
											th: "ฮ็อตทูเบิร์น",
											id: "Panas hingga Terbakar",
											en: "Hot to Burn",
											ch: "熱火燃燒"
										},
										appId: "vs5hotburn",
										gameId: "vs5hotburn",
										category1: "Slots",
										paylines: "5",
										rtp: "96.71%",
										reels: "5",
										imgName: {
											cs: "hot-to-burn-cs.jpg",
											vn: "hot-to-burn-vn.jpg",
											th: "hot-to-burn-th.jpg",
											id: "hot-to-burn-id.jpg",
											en: "hot-to-burn-en.jpg",
											ch: "hot-to-burn-ch.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: true,
										playFree: true
									},
									{
										name: {
											cs: "跳舞趴",
											en: "Dance Party",
											id: "Pesta Dansa",
											th: "แดนซ์ปาร์ตี้",
											vn: "Bữa Tiệc Khiêu Vũ"
										},
										appId: "vs243dancingpar",
										gameId: "vs243dancingpar",
										category1: "Slots",
										paylines: "243",
										rtp: "96.50%",
										reels: "5",
										imgName: {
											cs: "dance-party-cs.jpg",
											en: "dance-party-en.jpg",
											id: "dance-party-id.jpg",
											th: "dance-party-th.jpg",
											vn: "dance-party-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											en: "Wild West Gold",
											vn: "Vàng Miền Tây Hoang Dã",
											th: "ไวลด์เวสต์โกลด์",
											id: "Emas dari Wild West",
											cs: "西部牛仔黄金地段"
										},
										appId: "vs40wildwest",
										gameId: "vs40wildwest",
										category1: "Slots",
										paylines: "40",
										rtp: "96.51%",
										reels: "5",
										imgName: {
											en: "wild-west-gold-en.jpg",
											vn: "wild-west-gold-vn.jpg",
											th: "wild-west-gold-th.jpg",
											id: "wild-west-gold-id.jpg",
											cs: "wild-west-gold-cs.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: true,
										playFree: true
									},
									{
										name: {
											cs: "金龙吐珠",
											en: "Lucky Dragon Ball",
											id: "Bola Naga Beruntung",
											th: "ลัคกี้ ดราก้อนบอล",
											vn: "Ngọc Rồng May Mắn",
											ch: "金龍吐珠"
										},
										appId: "vs1ball",
										gameId: "vs1ball",
										category1: "Slots",
										paylines: "1",
										rtp: "96.51%",
										reels: "5",
										imgName: {
											cs: "lucky-dragon-ball-cs.jpg",
											en: "lucky-dragon-ball-en.jpg",
											id: "lucky-dragon-ball-id.jpg",
											th: "lucky-dragon-ball-th.jpg",
											vn: "lucky-dragon-ball-vn.jpg",
											ch: "lucky-dragon-ball-ch.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											id: "Pelangi Buah",
											vn: "Cầu Vồng Trái Cây",
											th: "ฟรุตเรนโบว์",
											en: "Fruit Rainbow",
											cs: "彩虹水果",
											ch: "彩虹水果"
										},
										appId: "vs40frrainbow",
										gameId: "vs40frrainbow",
										category1: "Slots",
										paylines: "40",
										rtp: "96.53%",
										reels: "5",
										imgName: {
											id: "fruit-rainbow-id.jpg",
											vn: "fruit-rainbow-vn.jpg",
											th: "fruit-rainbow-th.jpg",
											en: "fruit-rainbow-en.jpg",
											cs: "fruit-rainbow-cs.jpg",
											ch: "fruit-rainbow-ch.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "瘋狂機器",
											cs: "疯狂机器",
											en: "The Wild Machine",
											id: "Mesin Liar",
											th: "เดอะไวลด์แมชชีน",
											vn: "Cỗ Máy Wild"
										},
										appId: "vs40madwheel",
										gameId: "vs40madwheel",
										category1: "Slots",
										paylines: "40",
										rtp: "96.52%",
										reels: "5",
										imgName: {
											ch: "the-wild-machine-ch.jpg",
											cs: "the-wild-machine-cs.jpg",
											en: "the-wild-machine-en.jpg",
											id: "the-wild-machine-id.jpg",
											th: "the-wild-machine-th.jpg",
											vn: "the-wild-machine-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											id: "Sumber Kemakmuran Aztec",
											th: "แอซเท็กโบนันซ่า",
											vn: "Đá quý của Người Aztec",
											cs: "阿兹特克获利之道",
											ch: "阿茲特克獲利之道",
											en: "Aztec Bonanza"
										},
										appId: "vs7776aztec",
										gameId: "vs7776aztec",
										category1: "Slots",
										paylines: "7776",
										rtp: "96.53%",
										reels: "6",
										imgName: {
											id: "aztec-bonanza-id.jpg",
											th: "aztec-bonanza-th.jpg",
											vn: "aztec-bonanza-vn.jpg",
											cs: "aztec-bonanza-cs.jpg",
											ch: "aztec-bonanza-ch.jpg",
											en: "aztec-bonanza-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: true,
										playFree: true
									},
									{
										name: {
											ch: "神秘之城",
											cs: "神秘之城",
											en: "Mysterious",
											id: "Misterius",
											th: "มิสทีเรียส",
											vn: "Thần bí"
										},
										appId: "vs4096mystery",
										gameId: "vs4096mystery",
										category1: "Slots",
										paylines: "4096",
										rtp: "96.50%",
										reels: "4",
										imgName: {
											ch: "mysterious-ch.jpg",
											cs: "mysterious-cs.jpg",
											en: "mysterious-en.jpg",
											id: "mysterious-id.jpg",
											th: "mysterious-th.jpg",
											vn: "mysterious-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: true,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											id: "Joker Master",
											vn: "Ông chủ Joker",
											th: "มาสเตอร์โจ๊กเกอร์",
											en: "Master Joker",
											cs: "杰克大师",
											ch: "杰克大師"
										},
										appId: "vs1masterjoker",
										gameId: "vs1masterjoker",
										category1: "Slots",
										paylines: "1",
										rtp: "96.51%",
										reels: "5",
										imgName: {
											id: "master-joker-id.jpg",
											vn: "master-joker-vn.jpg",
											th: "master-joker-th.jpg",
											en: "master-joker-en.jpg",
											cs: "master-joker-cs.jpg",
											ch: "master-joker-ch.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "超級7s",
											cs: "超级7s",
											en: "Super 7s ",
											id: "7s Super",
											th: "ซูเปอร์เซเว่น",
											vn: "Siêu 7s"
										},
										appId: "vs5super7",
										gameId: "vs5super7",
										category1: "Slots",
										paylines: "5",
										rtp: "96.50%",
										reels: "5",
										imgName: {
											ch: "super-7s-ch.jpg",
											cs: "super-7s-cs.jpg",
											en: "super-7s-en.jpg",
											id: "super-7s-id.jpg",
											th: "super-7s-th.jpg",
											vn: "super-7s-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											vn: "Giải Phóng Kraken",
											th: "ปล่อยคราเคน",
											id: "Bebaskan Kraken",
											cs: "解放大海怪",
											ch: "解放大海怪",
											en: "Release the Kraken"
										},
										appId: "vs20kraken",
										gameId: "vs20kraken",
										category1: "Slots",
										paylines: "20",
										rtp: "96.50%",
										reels: "5",
										imgName: {
											vn: "release-the-kraken-vn.jpg",
											th: "release-the-kraken-th.jpg",
											id: "release-the-kraken-id.jpg",
											cs: "release-the-kraken-cs.jpg",
											ch: "release-the-kraken-ch.jpg",
											en: "release-the-kraken-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: true,
										playFree: true
									},
									{
										name: {
											ch: "王者野牛",
											cs: "王者野牛",
											en: "Buffalo King",
											id: "Raja Banteng",
											th: "ราชาควาย",
											vn: "Vua Trâu"
										},
										appId: "vs4096bufking",
										gameId: "vs4096bufking",
										category1: "Slots",
										paylines: "4096",
										rtp: "96.06%",
										reels: "6",
										imgName: {
											ch: "buffalo-king-ch.jpg",
											cs: "buffalo-king-cs.jpg",
											en: "buffalo-king-en.jpg",
											id: "buffalo-king-id.jpg",
											th: "buffalo-king-th.jpg",
											vn: "buffalo-king-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											vn: "Hành Trình Kỳ Diệu",
											th: "การเดินทางด้วยอาคม",
											id: "Perjalanan Ajaib",
											cs: "西游争霸",
											ch: "西游爭霸",
											en: "Magic Journey"
										},
										appId: "vs8magicjourn",
										gameId: "vs8magicjourn",
										category1: "Slots",
										paylines: "8",
										rtp: "96.54%",
										reels: "5",
										imgName: {
											vn: "magic-journey-vn.jpg",
											th: "magic-journey-th.jpg",
											id: "magic-journey-id.jpg",
											cs: "magic-journey-cs.jpg",
											ch: "magic-journey-ch.jpg",
											en: "magic-journey-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "招财鼠",
											en: "Money Mouse",
											id: "Tikus Uang ",
											th: "มันนี่เมาส์",
											vn: "Chuột Kim Tiền"
										},
										appId: "vs25mmouse",
										gameId: "vs25mmouse",
										category1: "Slots",
										paylines: "25",
										rtp: "96.01%",
										reels: "5",
										imgName: {
											cs: "money-mouse-cs.jpg",
											en: "money-mouse-en.jpg",
											id: "money-mouse-id.jpg",
											th: "money-mouse-th.jpg",
											vn: "money-mouse-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "阿拉丁和巫師",
											vn: "Alladin và Lão Phù Thủy",
											th: "อะลาดินกับผู้วิเศษ",
											id: "Aladin dan Penyihir",
											en: "Aladdin and the Sorcerer",
											cs: "阿拉丁和巫师"
										},
										appId: "vs20aladdinsorc",
										gameId: "vs20aladdinsorc",
										category1: "Slots",
										paylines: "20",
										rtp: "96.23%",
										reels: "5",
										imgName: {
											ch:
												"aladdin-and-the-sorcerer-ch.jpg",
											vn:
												"aladdin-and-the-sorcerer-vn.jpg",
											th:
												"aladdin-and-the-sorcerer-th.jpg",
											id:
												"aladdin-and-the-sorcerer-id.jpg",
											en:
												"aladdin-and-the-sorcerer-en.jpg",
											cs:
												"aladdin-and-the-sorcerer-cs.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											th: "เทพเจ้ากรีก",
											vn: "Các Vị Thần Hy Lạp",
											id: "Dewa Yunani",
											en: "Greek Gods",
											ch: "希臘眾神",
											cs: "希腊众神"
										},
										appId: "vs243fortseren",
										gameId: "vs243fortseren",
										category1: "Slots",
										paylines: "243",
										rtp: "96.50%",
										reels: "5",
										imgName: {
											th: "greek-gods-th.jpg",
											vn: "greek-gods-vn.jpg",
											id: "greek-gods-id.jpg",
											en: "greek-gods-en.jpg",
											ch: "greek-gods-ch.jpg",
											cs: "greek-gods-cs.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "甜心盛宴圣诞",
											vn: "Giáng Sinh May Mắn Ngọt Ngào",
											th: "สวีตโบนันซ่า คริสต์มาส",
											en: "Sweet Bonanza Xmas",
											id: "Natal Bonanza nan Indah"
										},
										appId: "vs20sbxmas",
										gameId: "vs20sbxmas",
										category1: "Slots",
										paylines: "20",
										rtp: "96.48%",
										reels: "5",
										imgName: {
											cs: "sweet-bonanza-xmas-cs.jpg",
											vn: "sweet-bonanza-xmas-vn.jpg",
											th: "sweet-bonanza-xmas-th.jpg",
											en: "sweet-bonanza-xmas-en.jpg",
											id: "sweet-bonanza-xmas-id.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: true,
										playFree: true
									},
									{
										name: {
											ch: "大力神和飛馬",
											cs: "大力神和飞马",
											en: "Hercules and Pegasus",
											id: "Herucles dan Pegasus",
											th: "เฮอร์คิวลีสกับเปกาซัส",
											vn: "HERCULES VÀ PEGASUS"
										},
										appId: "vs20hercpeg",
										gameId: "vs20hercpeg",
										category1: "Slots",
										paylines: "20",
										rtp: "96.50%",
										reels: "5",
										imgName: {
											ch: "hercules-and-pegasus-ch.jpg",
											cs: "hercules-and-pegasus-cs.jpg",
											en: "hercules-and-pegasus-en.jpg",
											id: "hercules-and-pegasus-id.jpg",
											th: "hercules-and-pegasus-th.jpg",
											vn: "hercules-and-pegasus-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											th: "เพลิงจู่โจม",
											vn: "Biển Lửa",
											id: "Serangan Api",
											en: "Fire Strike",
											cs: "红火暴击"
										},
										appId: "vs10firestrike",
										gameId: "vs10firestrike",
										category1: "Slots",
										paylines: "10",
										rtp: "96.50%",
										reels: "5",
										imgName: {
											th: "fire-strike-th.jpg",
											vn: "fire-strike-vn.jpg",
											id: "fire-strike-id.jpg",
											en: "fire-strike-en.jpg",
											cs: "fire-strike-cs.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: true,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: true,
										playFree: true
									},
									{
										name: {
											ch: "甜蜜蜜",
											cs: "甜蜜蜜",
											en: "Honey Honey Honey",
											id: "Madu Madu Madu",
											th: "ฮันนี่ ฮันนี่ ฮันนี่",
											vn: "Mật Mật Mật"
										},
										appId: "vs20honey",
										gameId: "vs20honey",
										category1: "Slots",
										paylines: "20",
										rtp: "96.50%",
										reels: "5",
										imgName: {
											ch: "honey-honey-honey-ch.jpg",
											cs: "honey-honey-honey-cs.jpg",
											en: "honey-honey-honey-en.jpg",
											id: "honey-honey-honey-id.jpg",
											th: "honey-honey-honey-th.jpg",
											vn: "honey-honey-honey-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											th: "ซูเปอร์โจ๊กเกอร์",
											vn: "Siêu Joker",
											id: "Joker Super",
											cs: "超炫小丑",
											ch: "超炫小丑",
											en: "Super Joker"
										},
										appId: "vs5spjoker",
										gameId: "vs5spjoker",
										category1: "Slots",
										paylines: "5",
										rtp: "96.52%",
										reels: "3",
										imgName: {
											th: "super-joker-th.jpg",
											vn: "super-joker-vn.jpg",
											id: "super-joker-id.jpg",
											cs: "super-joker-cs.jpg",
											ch: "super-joker-ch.jpg",
											en: "super-joker-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "金龜子女王",
											cs: "金龟子女王",
											en:
												"John Hunter and the Tomb of the Scarab Queen",
											id:
												"John Hunter dan Pemburu Makam Ratu Kumbang",
											th:
												"จอห์น ฮันเทอร์ กับสุสานราชินีสคารับ",
											vn:
												"John Hunter và Lăng Mộ của Nữ Hoàng Scarab"
										},
										appId: "vs25scarabqueen",
										gameId: "vs25scarabqueen",
										category1: "Slots",
										paylines: "25",
										rtp: "96.50%",
										reels: "5",
										imgName: {
											ch:
												"john-hunter-and-the-tomb-of-the-scarab-queen-ch.jpg",
											cs:
												"john-hunter-and-the-tomb-of-the-scarab-queen-cs.jpg",
											en:
												"john-hunter-and-the-tomb-of-the-scarab-queen-en.jpg",
											id:
												"john-hunter-and-the-tomb-of-the-scarab-queen-id.jpg",
											th:
												"john-hunter-and-the-tomb-of-the-scarab-queen-th.jpg",
											vn:
												"john-hunter-and-the-tomb-of-the-scarab-queen-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: true,
										playFree: true
									},
									{
										name: {
											id: "Pohon Kekayaan",
											vn: "Cây Tài Phú",
											th: "ต้นไม้แห่งความมั่งคั่ง",
											en: "Tree of Riches",
											cs: "发发树",
											ch: "發發樹"
										},
										appId: "vs1fortunetree",
										gameId: "vs1fortunetree",
										category1: "Slots",
										paylines: "1",
										rtp: "96.50%",
										reels: "3",
										imgName: {
											id: "tree-of-riches-id.jpg",
											vn: "tree-of-riches-vn.jpg",
											th: "tree-of-riches-th.jpg",
											en: "tree-of-riches-en.jpg",
											cs: "tree-of-riches-cs.jpg",
											ch: "tree-of-riches-ch.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "小雞大逃亡",
											cs: "小鸡大逃亡",
											en: "The Great Chicken Escape",
											id: "Kaburnya Ayam Terbaik",
											th: "แผนหนีตายครั้งใหญ่ของเจ้าไก่",
											vn: "Cuộc Tẩu Thoát Vĩ Đại Của Gà"
										},
										appId: "vs20chicken",
										gameId: "vs20chicken",
										category1: "Slots",
										paylines: "20",
										rtp: "96.50%",
										reels: "5",
										imgName: {
											ch:
												"the-great-chicken-escape-ch.jpg",
											cs:
												"the-great-chicken-escape-cs.jpg",
											en:
												"the-great-chicken-escape-en.jpg",
											id:
												"the-great-chicken-escape-id.jpg",
											th:
												"the-great-chicken-escape-th.jpg",
											vn:
												"the-great-chicken-escape-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											vn: "Ma Cà Rồng vs Sói",
											th: "แวมไพร์ปะทะหมาป่า",
											id: "Vampir lawan Serigala",
											cs: "吸血鬼vs狼",
											ch: "吸血鬼vs狼",
											en: "Vampires VS Wolves"
										},
										appId: "vs10vampwolf",
										gameId: "vs10vampwolf",
										category1: "Slots",
										paylines: "10",
										rtp: "96.49%",
										reels: "5",
										imgName: {
											vn: "vampires-vs-wolves-vn.jpg",
											th: "vampires-vs-wolves-th.jpg",
											id: "vampires-vs-wolves-id.jpg",
											cs: "vampires-vs-wolves-cs.jpg",
											ch: "vampires-vs-wolves-ch.jpg",
											en: "vampires-vs-wolves-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "超級辣",
											cs: "超级辣",
											en: "Hot Chilli",
											id: "Cabe Pedas\u00A0",
											th: "พริกเผ็ดจี๊ด",
											vn: "Ớt Cay"
										},
										appId: "vs9hotroll",
										gameId: "vs9hotroll",
										category1: "Slots",
										paylines: "9",
										rtp: "96.52%",
										reels: "3",
										imgName: {
											ch: "hot-chilli-ch.jpg",
											cs: "hot-chilli-cs.jpg",
											en: "hot-chilli-en.jpg",
											id: "hot-chilli-id.jpg",
											th: "hot-chilli-th.jpg",
											vn: "hot-chilli-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											id:
												"John Hunter dan Harta Karun Aztec",
											vn: "John Hunter và Kho Báu Aztec",
											th:
												"จอห์น ฮันเตอร์ กับขุมทรัพย์แห่งแอซเท็ค",
											en: "Aztec Treasure",
											cs: "阿兹特克秘宝",
											ch: "阿茲特克秘寶"
										},
										appId: "vs7776secrets",
										gameId: "vs7776secrets",
										category1: "Slots",
										paylines: "7776",
										rtp: "96.50%",
										reels: "5",
										imgName: {
											id: "aztec-treasure-id.jpg",
											vn: "aztec-treasure-vn.jpg",
											th: "aztec-treasure-th.jpg",
											en: "aztec-treasure-en.jpg",
											cs: "aztec-treasure-cs.jpg",
											ch: "aztec-treasure-ch.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "酷猴戰士",
											cs: "酷猴战士",
											en: "Monkey Warrior",
											id: "Pejuang Monyet",
											th: "นักรบลิง",
											vn: "Chiến Binh Khỉ"
										},
										appId: "vs243mwarrior",
										gameId: "vs243mwarrior",
										category1: "Slots",
										paylines: "243",
										rtp: "96.50%",
										reels: "5",
										imgName: {
											ch: "monkey-warrior-ch.jpg",
											cs: "monkey-warrior-cs.jpg",
											en: "monkey-warrior-en.jpg",
											id: "monkey-warrior-id.jpg",
											th: "monkey-warrior-th.jpg",
											vn: "monkey-warrior-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											th: "ทริปเปิลโจ๊กเกอร์",
											vn: "Bộ Ba Joker",
											id: "Joker Bertiga",
											cs: "3倍小丑",
											ch: "3倍小丑",
											en: "Triple Jokers"
										},
										appId: "vs5trjokers",
										gameId: "vs5trjokers",
										category1: "Slots",
										paylines: "5",
										rtp: "96.51%",
										reels: "3",
										imgName: {
											th: "triple-jokers-th.jpg",
											vn: "triple-jokers-vn.jpg",
											id: "triple-jokers-id.jpg",
											cs: "triple-jokers-cs.jpg",
											ch: "triple-jokers-ch.jpg",
											en: "triple-jokers-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "5金狮",
											en: "5 Lions Gold",
											id: "Emas\u00A05 Singa",
											th: "5 สิงโตทองคำ",
											vn: "5 Sư Tử Vàng"
										},
										appId: "vs243lionsgold",
										gameId: "vs243lionsgold",
										category1: "Slots",
										paylines: "243",
										rtp: "96.50%",
										reels: "3",
										imgName: {
											cs: "5-lions-gold-cs.jpg",
											en: "5-lions-gold-en.jpg",
											id: "5-lions-gold-id.jpg",
											th: "5-lions-gold-th.jpg",
											vn: "5-lions-gold-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											vn: "Các Nàng tiên Hoang dã",
											th: "ไวลด์พิกซี่",
											id: "Pari Liar",
											en: "Wild Pixies",
											cs: "野精灵",
											ch: "野精靈"
										},
										appId: "vs20wildpix",
										gameId: "vs20wildpix",
										category1: "Slots",
										paylines: "20",
										rtp: "96.50%",
										reels: "5",
										imgName: {
											vn: "wild-pixies-vn.jpg",
											th: "wild-pixies-th.jpg",
											id: "wild-pixies-id.jpg",
											en: "wild-pixies-en.jpg",
											cs: "wild-pixies-cs.jpg",
											ch: "wild-pixies-ch.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "甜入心扉",
											en: "Sweet Bonanza",
											id: "Bonanza Manis",
											th: "สวีตโบนันซ่า",
											vn: "Vận May Ngọt Ngào"
										},
										appId: "vs20fruitsw",
										gameId: "vs20fruitsw",
										category1: "Slots",
										paylines: "20",
										rtp: "96.50%",
										reels: "6",
										imgName: {
											cs: "sweet-bonanza-cs.jpg",
											en: "sweet-bonanza-en.jpg",
											id: "sweet-bonanza-id.jpg",
											th: "sweet-bonanza-th.jpg",
											vn: "sweet-bonanza-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: true,
										playFree: true
									},
									{
										name: {
											ch: "財神運財",
											cs: "财神运财",
											en: "Caishens Cash",
											id: "Uang Tunai Caishen",
											th: "รับทรัพย์กับไฉ่ซิงเอี้ย",
											vn: "Tiền của Caishen"
										},
										appId: "vs243caishien",
										gameId: "vs243caishien",
										category1: "Slots",
										paylines: "243",
										rtp: "96.50%",
										reels: "5",
										imgName: {
											ch: "caishens-cash-ch.jpg",
											cs: "caishens-cash-cs.jpg",
											en: "caishens-cash-en.jpg",
											id: "caishens-cash-id.jpg",
											th: "caishens-cash-th.jpg",
											vn: "caishens-cash-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											id: "Emas Lanun",
											vn: "Vàng Hải Tặc",
											th: "ทองคำโจรสลัด",
											en: "Pirate Gold",
											ch: "奪金海賊",
											cs: "夺金海贼"
										},
										appId: "vs40pirate",
										gameId: "vs40pirate",
										category1: "Slots",
										paylines: "40",
										rtp: "96.50%",
										reels: "5",
										imgName: {
											id: "pirate-gold-id.jpg",
											vn: "pirate-gold-vn.jpg",
											th: "pirate-gold-th.jpg",
											en: "pirate-gold-en.jpg",
											ch: "pirate-gold-ch.jpg",
											cs: "pirate-gold-cs.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "汪汪之家",
											en: "The Dog House",
											id: "Rumah Anjing",
											th: "บ้านสุนัข",
											vn: "Nhà Của Chó"
										},
										appId: "vs20doghouse",
										gameId: "vs20doghouse",
										category1: "Slots",
										paylines: "20",
										rtp: "96.51%",
										reels: "5",
										imgName: {
											cs: "the-dog-house-cs.jpg",
											en: "the-dog-house-en.jpg",
											id: "the-dog-house-id.jpg",
											th: "the-dog-house-th.jpg",
											vn: "the-dog-house-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: true,
										playFree: true
									},
									{
										name: {
											ch: "埃及宿命",
											cs: "埃及宿命",
											en: "Egyptian Fortunes",
											id: "Kekayaan Mesir",
											th: "ขุมทรัพย์อียิปต์",
											vn: "Ai Cập Phồn Vinh"
										},
										appId: "vs20egypttrs",
										gameId: "vs20egypttrs",
										category1: "Slots",
										paylines: "20",
										rtp: "96.50%",
										reels: "5",
										imgName: {
											ch: "egyptian-fortunes-ch.jpg",
											cs: "egyptian-fortunes-cs.jpg",
											en: "egyptian-fortunes-en.jpg",
											id: "egyptian-fortunes-id.jpg",
											th: "egyptian-fortunes-th.jpg",
											vn: "egyptian-fortunes-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "额外多汁",
											vn: "Siêu Kỳ Thú",
											th: "เอ็กซ์ตร้าจุซซี่",
											id: "Ekstra Jus",
											en: "Extra Juicy",
											ch: "額外多汁"
										},
										appId: "vs10fruity2",
										gameId: "vs10fruity2",
										category1: "Slots",
										paylines: "10",
										rtp: "96.52%",
										reels: "5",
										imgName: {
											cs: "extra-juicy-cs.jpg",
											vn: "extra-juicy-vn.jpg",
											th: "extra-juicy-th.jpg",
											id: "extra-juicy-id.jpg",
											en: "extra-juicy-en.jpg",
											ch: "extra-juicy-ch.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "狂野角斗士",
											cs: "狂野角斗士",
											en: "Wild Gladiator",
											id: "Gladiator Liar",
											th: "นักสู้แดนเถื่อน",
											vn: "Đấu Sĩ Cừ Khôi"
										},
										appId: "vs25gladiator",
										gameId: "vs25gladiator",
										category1: "Slots",
										paylines: "25",
										rtp: "96.17%",
										reels: "6",
										imgName: {
											ch: "wild-gladiator-ch.jpg",
											cs: "wild-gladiator-cs.jpg",
											en: "wild-gladiator-en.jpg",
											id: "wild-gladiator-id.jpg",
											th: "wild-gladiator-th.jpg",
											vn: "wild-gladiator-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "招财福猪",
											vn: "Chú Heo Vàng",
											th: "หมูทองคำ",
											en: "Golden Pig",
											ch: "招財福豬",
											id: "Babi Emas"
										},
										appId: "vs25goldpig",
										gameId: "vs25goldpig",
										category1: "Slots",
										paylines: "25",
										rtp: "96.00%",
										reels: "5",
										imgName: {
											cs: "golden-pig-cs.jpg",
											vn: "golden-pig-vn.jpg",
											th: "golden-pig-th.jpg",
											en: "golden-pig-en.jpg",
											ch: "golden-pig-ch.jpg",
											id: "golden-pig-id.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "馬上有錢",
											cs: "马上有钱",
											en: "Treasure Horse",
											id: "Kuda Emas",
											th: "รวยทันใจ",
											vn: "Tiền Về Liền Tay"
										},
										appId: "vs18mashang",
										gameId: "vs18mashang",
										category1: "Slots",
										paylines: "18",
										rtp: "96.52%",
										reels: "3",
										imgName: {
											ch: "treasure-horse-ch.jpg",
											cs: "treasure-horse-cs.jpg",
											en: "treasure-horse-en.jpg",
											id: "treasure-horse-id.jpg",
											th: "treasure-horse-th.jpg",
											vn: "treasure-horse-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											id: "Raja Safari",
											vn: "Chúa Tể Muôn Thú",
											th: "ราชาซาฟารี",
											en: "Safari King",
											cs: "狩猎之王",
											ch: "狩獵之王"
										},
										appId: "vs50safariking",
										gameId: "vs50safariking",
										category1: "Slots",
										paylines: "50",
										rtp: "96.49%",
										reels: "5",
										imgName: {
											id: "safari-king-id.jpg",
											vn: "safari-king-vn.jpg",
											th: "safari-king-th.jpg",
											en: "safari-king-en.jpg",
											cs: "safari-king-cs.jpg",
											ch: "safari-king-ch.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "小妖之歌圣誕版",
											cs: "小妖之歌圣诞版",
											en: "Leprechaun Carol",
											id: "Lagu Karol Leprechaun\u00A0",
											th: "บทเพลงแห่งเลพรีคอน",
											vn:
												"Bài hát Giáng sinh của Yêu tinh"
										},
										appId: "vs20leprexmas",
										gameId: "vs20leprexmas",
										category1: "Slots",
										paylines: "20",
										rtp: "96.53%",
										reels: "5",
										imgName: {
											ch: "leprechaun-carol-ch.jpg",
											cs: "leprechaun-carol-cs.jpg",
											en: "leprechaun-carol-en.jpg",
											id: "leprechaun-carol-id.jpg",
											th: "leprechaun-carol-th.jpg",
											vn: "leprechaun-carol-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											th: "ทองคำมัสแตง",
											vn: "Sự giàu có của Ngựa hoang dã",
											id: "Emas Mustang",
											en: "Mustang Gold",
											ch: "黃金野馬",
											cs: "黄金野马"
										},
										appId: "vs25mustang",
										gameId: "vs25mustang",
										category1: "Slots",
										paylines: "25",
										rtp: "96.53%",
										reels: "5",
										imgName: {
											th: "mustang-gold-th.jpg",
											vn: "mustang-gold-vn.jpg",
											id: "mustang-gold-id.jpg",
											en: "mustang-gold-en.jpg",
											ch: "mustang-gold-ch.jpg",
											cs: "mustang-gold-cs.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "龍龍龍",
											cs: "龙龙龙",
											en: "Triple Dragons",
											id: "Naga Bertiga",
											th: "ไตรมังกร",
											vn: "Ba Chú rồng"
										},
										appId: "vs5trdragons",
										gameId: "vs5trdragons",
										category1: "Slots",
										paylines: "5",
										rtp: "96.51%",
										reels: "3",
										imgName: {
											ch: "triple-dragons-ch.jpg",
											cs: "triple-dragons-cs.jpg",
											en: "triple-dragons-en.jpg",
											id: "triple-dragons-id.jpg",
											th: "triple-dragons-th.jpg",
											vn: "triple-dragons-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "古代埃及經典版",
											cs: "古代埃及经典版",
											en: "Ancient Egypt Classic",
											id: "Asgard",
											th: "แอสการ์ด",
											vn: "Ngôi nhà của các vị thần"
										},
										appId: "vs10egyptcls",
										gameId: "vs10egyptcls",
										category1: "Slots",
										paylines: "10",
										rtp: "96.51%",
										reels: "5",
										imgName: {
											ch: "ancient-egypt-classic-ch.jpg",
											cs: "ancient-egypt-classic-cs.jpg",
											en: "ancient-egypt-classic-en.jpg",
											id: "ancient-egypt-classic-id.jpg",
											th: "ancient-egypt-classic-th.jpg",
											vn: "ancient-egypt-classic-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "魔力维加斯",
											vn: "Sức lôi cuốn của Vegas",
											th: "มนตราเวกัส",
											id: "Keajaiban Vegas",
											en: "Vegas Magic"
										},
										appId: "vs20vegasmagic",
										gameId: "vs20vegasmagic",
										category1: "Slots",
										paylines: "20",
										rtp: "96.08%",
										reels: "5",
										imgName: {
											cs: "vegas-magic-cs.jpg",
											vn: "vegas-magic-vn.jpg",
											th: "vegas-magic-th.jpg",
											id: "vegas-magic-id.jpg",
											en: "vegas-magic-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: true,
										playFree: true
									},
									{
										name: {
											ch: "陳師傅的財富",
											cs: "陈师傅的财富",
											en: "Master Chens Fortune",
											id: "Kekayaan Tuan Chen",
											th: "อาจารย์เฉินมหาโชค",
											vn: "Vận mệnh của Master Chen"
										},
										appId: "vs9chen",
										gameId: "vs9chen",
										category1: "Slots",
										paylines: "9",
										rtp: "96.48%",
										reels: "5",
										imgName: {
											ch: "master-chens-fortune-ch.jpg",
											cs: "master-chens-fortune-cs.jpg",
											en: "master-chens-fortune-en.jpg",
											id: "master-chens-fortune-id.jpg",
											th: "master-chens-fortune-th.jpg",
											vn: "master-chens-fortune-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "達芬奇寶藏",
											vn: "Kho báu của DaVinci",
											th: "ขุมทรัพย์ดาวินซี",
											en: "Da Vincis Treasure",
											cs: "达芬奇宝藏",
											id: "Harta DaVinci"
										},
										appId: "vs25davinci",
										gameId: "vs25davinci",
										category1: "Slots",
										paylines: "25",
										rtp: "96.53%",
										reels: "5",
										imgName: {
											ch: "da-vincis-treasure-ch.jpg",
											vn: "da-vincis-treasure-vn.jpg",
											th: "da-vincis-treasure-th.jpg",
											en: "da-vincis-treasure-en.jpg",
											cs: "da-vincis-treasure-cs.jpg",
											id: "da-vincis-treasure-id.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "小妖之歌",
											cs: "小妖之歌",
											en: "Leprechaun Song",
											id: "Lagu Dondang Sayang",
											th: "มนต์เพลงภูต",
											vn: "Bài hát Yêu tinh"
										},
										appId: "vs20leprechaun",
										gameId: "vs20leprechaun",
										category1: "Slots",
										paylines: "20",
										rtp: "96.46%",
										reels: "5",
										imgName: {
											ch: "leprechaun-song-ch.jpg",
											cs: "leprechaun-song-cs.jpg",
											en: "leprechaun-song-en.jpg",
											id: "leprechaun-song-id.jpg",
											th: "leprechaun-song-th.jpg",
											vn: "leprechaun-song-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											en: "Madame Destiny",
											vn: "Vận mệnh Quý bà",
											th: "มาดามเดสตินี",
											id: "Dewi Takdir",
											cs: "命运女士",
											ch: "命運女士"
										},
										appId: "vs10madame",
										gameId: "vs10madame",
										category1: "Slots",
										paylines: "10",
										rtp: "96.50%",
										reels: "5",
										imgName: {
											en: "madame-destiny-en.jpg",
											vn: "madame-destiny-vn.jpg",
											th: "madame-destiny-th.jpg",
											id: "madame-destiny-id.jpg",
											cs: "madame-destiny-cs.jpg",
											ch: "madame-destiny-ch.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "仙宮",
											cs: "仙宫",
											en: "Asgard",
											id: "Asgard",
											th: "\u00A0แอสการ์ด",
											vn: "Ngôi nhà của các vị thần"
										},
										appId: "vs25asgard",
										gameId: "vs25asgard",
										category1: "Slots",
										paylines: "25",
										rtp: "96.48%",
										reels: "5",
										imgName: {
											ch: "asgard-ch.jpg",
											cs: "asgard-cs.jpg",
											en: "asgard-en.jpg",
											id: "asgard-id.jpg",
											th: "asgard-th.jpg",
											vn: "asgard-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											th: "5สิงห์\u00A0",
											vn: "5 Chú sư tử",
											cs: "5雄狮",
											en: "5 Lions",
											id: "5 Singa",
											ch: "5雄獅"
										},
										appId: "vs243lions",
										gameId: "vs243lions",
										category1: "Slots",
										paylines: "243",
										rtp: "96.50%",
										reels: "5",
										imgName: {
											th: "5-lions-th.jpg",
											vn: "5-lions-vn.jpg",
											cs: "5-lions-cs.jpg",
											en: "5-lions-en.jpg",
											id: "5-lions-id.jpg",
											ch: "5-lions-ch.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "冠軍杯",
											cs: "冠军杯",
											en: "The Champions",
											id: "Juara",
											th: "\u00A0แชมเปี้ยน",
											vn: "Nhà vô địch"
										},
										appId: "vs25champ",
										gameId: "vs25champ",
										category1: "Slots",
										paylines: "25",
										rtp: "96.51%",
										reels: "5",
										imgName: {
											ch: "the-champions-ch.jpg",
											cs: "the-champions-cs.jpg",
											en: "the-champions-en.jpg",
											id: "the-champions-id.jpg",
											th: "the-champions-th.jpg",
											vn: "the-champions-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "巨大犀牛",
											en: "Great Rhino",
											id: "Badak Hebat",
											th: "เกรทไรโน",
											vn: "Tê giác Khổng lồ"
										},
										appId: "vs20rhino",
										gameId: "vs20rhino",
										category1: "Slots",
										paylines: "20",
										rtp: "96.53%",
										reels: "5",
										imgName: {
											cs: "great-rhino-cs.jpg",
											en: "great-rhino-en.jpg",
											id: "great-rhino-id.jpg",
											th: "great-rhino-th.jpg",
											vn: "great-rhino-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: true,
										playFree: true
									},
									{
										name: {
											en: "Jokers Jewels",
											vn: "Viên đá quý của Chú hề",
											th: "เพชรโจ๊กเกอร์",
											id: "Permata Joker",
											cs: "小丑珠宝"
										},
										appId: "vs5joker",
										gameId: "vs5joker",
										category1: "Slots",
										paylines: "5",
										rtp: "96.50%",
										reels: "5",
										imgName: {
											en: "jokers-jewels-en.jpg",
											vn: "jokers-jewels-vn.jpg",
											th: "jokers-jewels-th.jpg",
											id: "jokers-jewels-id.jpg",
											cs: "jokers-jewels-cs.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: true,
										playFree: true
									},
									{
										name: {
											ch: "童話財富",
											cs: "童话财富",
											en: "Fairytale Fortune",
											id: "Kekayaan Cerita Dogeng",
											th: "เทพธิดาพาโชค",
											vn: "Vận mệnh Cổ tích"
										},
										appId: "vs15fairytale",
										gameId: "vs15fairytale",
										category1: "Slots",
										paylines: "15",
										rtp: "96.52%",
										reels: "5",
										imgName: {
											ch: "fairytale-fortune-ch.jpg",
											cs: "fairytale-fortune-cs.jpg",
											en: "fairytale-fortune-en.jpg",
											id: "fairytale-fortune-id.jpg",
											th: "fairytale-fortune-th.jpg",
											vn: "fairytale-fortune-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "88火",
											vn: "Ngọn lửa 88",
											th: "เพลิงพาโชค",
											en: "Fire 88",
											ch: "88火",
											id: "Api 88"
										},
										appId: "vs7fire88",
										gameId: "vs7fire88",
										category1: "Slots",
										paylines: "7",
										rtp: "96.45%",
										reels: "3",
										imgName: {
											cs: "fire-88-cs.jpg",
											vn: "fire-88-vn.jpg",
											th: "fire-88-th.jpg",
											en: "fire-88-en.jpg",
											ch: "fire-88-ch.jpg",
											id: "fire-88-id.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: true,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "火辣辣",
											cs: "火辣辣",
											en: "Chilli Heat",
											id: "Pedas Cili",
											th: "ชิลลิฮีต",
											vn: "Ớt cay"
										},
										appId: "vs25chilli",
										gameId: "vs25chilli",
										category1: "Slots",
										paylines: "25",
										rtp: "96.50%",
										reels: "5",
										imgName: {
											ch: "chilli-heat-ch.jpg",
											cs: "chilli-heat-cs.jpg",
											en: "chilli-heat-en.jpg",
											id: "chilli-heat-id.jpg",
											th: "chilli-heat-th.jpg",
											vn: "chilli-heat-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											id: "Permata Aztez",
											vn: "Aztec Gems",
											th: "เพชรแอสเท็ค",
											en: "Aztec Gems",
											cs: "古时代宝石"
										},
										appId: "vs5aztecgems",
										gameId: "vs5aztecgems",
										category1: "Slots",
										paylines: "5",
										rtp: "96.52%",
										reels: "3+1",
										imgName: {
											id: "aztec-gems-id.jpg",
											vn: "aztec-gems-vn.jpg",
											th: "aztec-gems-th.jpg",
											en: "aztec-gems-en.jpg",
											cs: "aztec-gems-cs.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: true,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: true,
										playFree: true
									},
									{
										name: {
											ch: "古代埃及",
											cs: "古代埃及",
											en: "Ancient Egypt",
											id: "Mesir Purba Klasik",
											th: "อียิปต์โบราณคลาสสิก",
											vn: "Ai Cập Cổ đại Cổ điển"
										},
										appId: "vs10egypt",
										gameId: "vs10egypt",
										category1: "Slots",
										paylines: "10",
										rtp: "96.13%",
										reels: "5",
										imgName: {
											ch: "ancient-egypt-ch.jpg",
											cs: "ancient-egypt-cs.jpg",
											en: "ancient-egypt-en.jpg",
											id: "ancient-egypt-id.jpg",
											th: "ancient-egypt-th.jpg",
											vn: "ancient-egypt-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											vn: "Năm mới May mắn",
											th: "โชคดีปีใหม่",
											en: "Lucky New Year",
											cs: "幸运新年",
											ch: "幸運新年",
											id: "Tahun Baru Bertuah"
										},
										appId: "vs25newyear",
										gameId: "vs25newyear",
										category1: "Slots",
										paylines: "25",
										rtp: "96.00%",
										reels: "5",
										imgName: {
											vn: "lucky-new-year-vn.jpg",
											th: "lucky-new-year-th.jpg",
											en: "lucky-new-year-en.jpg",
											cs: "lucky-new-year-cs.jpg",
											ch: "lucky-new-year-ch.jpg",
											id: "lucky-new-year-id.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "三隻老虎",
											cs: "三只老虎",
											en: "Triple Tigers",
											id: "Harimau Bertiga",
											th: "สามพยัคฆ์",
											vn: "Ba Chú Hổ"
										},
										appId: "vs1tigers",
										gameId: "vs1tigers",
										category1: "Slots",
										paylines: "1",
										rtp: "97.52%",
										reels: "3",
										imgName: {
											ch: "triple-tigers-ch.jpg",
											cs: "triple-tigers-cs.jpg",
											en: "triple-tigers-en.jpg",
											id: "triple-tigers-id.jpg",
											th: "triple-tigers-th.jpg",
											vn: "triple-tigers-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											id: "Keedanan Monyet",
											vn: "Chú khỉ Điên cuồng",
											th: "วานรเพี้ยน",
											en: "Monkey Madness",
											cs: "猴子疯狂",
											ch: "猴子瘋狂"
										},
										appId: "vs9madmonkey",
										gameId: "vs9madmonkey",
										category1: "Slots",
										paylines: "9",
										rtp: "96.53%",
										reels: "3",
										imgName: {
											id: "monkey-madness-id.jpg",
											vn: "monkey-madness-vn.jpg",
											th: "monkey-madness-th.jpg",
											en: "monkey-madness-en.jpg",
											cs: "monkey-madness-cs.jpg",
											ch: "monkey-madness-ch.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "淘金熱",
											cs: "淘金热",
											en: "Gold Rush",
											id: "Buruan Emas",
											th: "โกลด์รัช",
											vn: "Cuộc đổ xô đi tìm Vàng"
										},
										appId: "vs25goldrush",
										gameId: "vs25goldrush",
										category1: "Slots",
										paylines: "25",
										rtp: "96.50%",
										reels: "5",
										imgName: {
											ch: "gold-rush-ch.jpg",
											cs: "gold-rush-cs.jpg",
											en: "gold-rush-en.jpg",
											id: "gold-rush-id.jpg",
											th: "gold-rush-th.jpg",
											vn: "gold-rush-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											th: "ซานต้า",
											vn: "Ông già Nôen",
											id: "Santa",
											cs: "圣诞老人",
											ch: "圣誕老人",
											en: "Santa"
										},
										appId: "vs20santa",
										gameId: "vs20santa",
										category1: "Slots",
										paylines: "20",
										rtp: "95.92%",
										reels: "5",
										imgName: {
											th: "santa-th.jpg",
											vn: "santa-vn.jpg",
											id: "santa-id.jpg",
											cs: "santa-cs.jpg",
											ch: "santa-ch.jpg",
											en: "santa-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "熊猫财富",
											en: "Pandas Fortune",
											id: "Kekayaan Panda",
											th: "แพนด้ามหาโชค",
											vn: "Vận may của Gấu trúc"
										},
										appId: "vs25pandagold",
										gameId: "vs25pandagold",
										category1: "Slots",
										paylines: "25",
										rtp: "96.17%",
										reels: "5",
										imgName: {
											cs: "pandas-fortune-cs.jpg",
											en: "pandas-fortune-en.jpg",
											id: "pandas-fortune-id.jpg",
											th: "pandas-fortune-th.jpg",
											vn: "pandas-fortune-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: true,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: true,
										playFree: true
									},
									{
										name: {
											vn: "Cuộn tiền",
											th: "มันนี่โรลล์",
											id: "Gulungan Wang",
											en: "Money Roll",
											cs: "财源滚滚",
											ch: "財源滾滾"
										},
										appId: "cs5moneyroll",
										gameId: "cs5moneyroll",
										category1: "Slots",
										paylines: "5",
										rtp: "96.93%",
										reels: "3",
										imgName: {
											vn: "money-roll-vn.jpg",
											th: "money-roll-th.jpg",
											id: "money-roll-id.jpg",
											en: "money-roll-en.jpg",
											cs: "money-roll-cs.jpg",
											ch: "money-roll-ch.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "7只小豬",
											cs: "7只小猪",
											en: "7 Piggies",
											id: "7 Babi",
											th: "ลูกหมู 7 ตัว",
											vn: "7 Chú lợn con"
										},
										appId: "vs7pigs",
										gameId: "vs7pigs",
										category1: "Slots",
										paylines: "7",
										rtp: "95.99%",
										reels: "5",
										imgName: {
											ch: "7-piggies-ch.jpg",
											cs: "7-piggies-cs.jpg",
											en: "7-piggies-en.jpg",
											id: "7-piggies-id.jpg",
											th: "7-piggies-th.jpg",
											vn: "7-piggies-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "钻石罢工",
											en: "Diamond Strike",
											id: "Serbuan Berlian",
											th: "ไดมอนด์สไตร้ค์",
											vn: "Cuộc chiến giành Kim cương"
										},
										appId: "vs15diamond",
										gameId: "vs15diamond",
										category1: "Slots",
										paylines: "15",
										rtp: "96.96%",
										reels: "5",
										imgName: {
											cs: "diamond-strike-cs.jpg",
											en: "diamond-strike-en.jpg",
											id: "diamond-strike-id.jpg",
											th: "diamond-strike-th.jpg",
											vn: "diamond-strike-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: true,
										playFree: true
									},
									{
										name: {
											th: "เวกัสราตรี",
											vn: "Đêm Vegas",
											en: "Vegas Nights",
											id: "Malam Vegas",
											ch: "維加斯之夜",
											cs: "维加斯之夜"
										},
										appId: "vs25vegas",
										gameId: "vs25vegas",
										category1: "Slots",
										paylines: "25",
										rtp: "96.03%",
										reels: "5",
										imgName: {
											th: "vegas-nights-th.jpg",
											vn: "vegas-nights-vn.jpg",
											en: "vegas-nights-en.jpg",
											id: "vegas-nights-id.jpg",
											ch: "vegas-nights-ch.jpg",
											cs: "vegas-nights-cs.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: true,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "法力无边",
											en: "Wild Spells",
											id: "Mantera Liar",
											th: "ป่าเวทย์มนต์",
											vn: "Câu thần chú Wild"
										},
										appId: "vs25wildspells",
										gameId: "vs25wildspells",
										category1: "Slots",
										paylines: "25",
										rtp: "96.40%",
										reels: "5",
										imgName: {
											cs: "wild-spells-cs.jpg",
											en: "wild-spells-en.jpg",
											id: "wild-spells-id.jpg",
											th: "wild-spells-th.jpg",
											vn: "wild-spells-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: true,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "財神黃金",
											cs: "财神黄金",
											en: "Caishens Gold",
											id: "Emas Caishen",
											th: "ทองคำของไข้วเฉิน",
											vn: "Kho Báu Thần Tài"
										},
										appId: "vs243fortune",
										gameId: "vs243fortune",
										category1: "Slots",
										paylines: "243",
										rtp: "97.08%",
										reels: "5",
										imgName: {
											ch: "caishens-gold-ch.jpg",
											cs: "caishens-gold-cs.jpg",
											en: "caishens-gold-en.jpg",
											id: "caishens-gold-id.jpg",
											th: "caishens-gold-th.jpg",
											vn: "caishens-gold-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "精灵翅膀",
											vn: "Đôi cánh của Nàng tiên",
											th: "ปีกของพิกซี่",
											id: "Sayap Peri",
											en: "Pixie Wings",
											ch: "精靈翅膀"
										},
										appId: "vs50pixie",
										gameId: "vs50pixie",
										category1: "Slots",
										paylines: "50",
										rtp: "96.51%",
										reels: "5",
										imgName: {
											cs: "pixie-wings-cs.jpg",
											vn: "pixie-wings-vn.jpg",
											th: "pixie-wings-th.jpg",
											id: "pixie-wings-id.jpg",
											en: "pixie-wings-en.jpg",
											ch: "pixie-wings-ch.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "黃金列車",
											cs: "黄金列车",
											en: "Gold Train",
											id: "Tren Emas",
											th: "รถไฟทองคำ",
											vn: "Con tàu Vàng"
										},
										appId: "vs3train",
										gameId: "vs3train",
										category1: "Slots",
										paylines: "3",
										rtp: "97.16%",
										reels: "3",
										imgName: {
											ch: "gold-train-ch.jpg",
											cs: "gold-train-cs.jpg",
											en: "gold-train-en.jpg",
											id: "gold-train-id.jpg",
											th: "gold-train-th.jpg",
											vn: "gold-train-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "发发发龙",
											vn: "888 Con rồng",
											th: "มังกร 888",
											en: "888 Dragons",
											id: "888 Naga"
										},
										appId: "vs1dragon8",
										gameId: "vs1dragon8",
										category1: "Slots",
										paylines: "1",
										rtp: "96.84%",
										reels: "3",
										imgName: {
											cs: "888-dragons-cs.jpg",
											vn: "888-dragons-vn.jpg",
											th: "888-dragons-th.jpg",
											en: "888-dragons-en.jpg",
											id: "888-dragons-id.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: true,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: true,
										playFree: true
									},
									{
										name: {
											ch: "侏羅紀巨獸",
											cs: "侏罗纪巨兽",
											en: "Jurassic Giants",
											id: "Gergasi Jurasik",
											th: "ยักษ์จูราสสิค",
											vn: "Động vật khổng lồ Kỷ jura"
										},
										appId: "vs4096jurassic",
										gameId: "vs4096jurassic",
										category1: "Slots",
										paylines: "4096",
										rtp: "96.01%",
										reels: "6",
										imgName: {
											ch: "jurassic-giants-ch.jpg",
											cs: "jurassic-giants-cs.jpg",
											en: "jurassic-giants-en.jpg",
											id: "jurassic-giants-id.jpg",
											th: "jurassic-giants-th.jpg",
											vn: "jurassic-giants-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											id: "8 Naga",
											vn: "8 Con rồng",
											th: "8 มังกร",
											en: "8 Dragons",
											cs: "8条龙",
											ch: "8條龍"
										},
										appId: "vs20eightdragons",
										gameId: "vs20eightdragons",
										category1: "Slots",
										paylines: "20",
										rtp: "96.37%",
										reels: "5",
										imgName: {
											id: "8-dragons-id.jpg",
											vn: "8-dragons-vn.jpg",
											th: "8-dragons-th.jpg",
											en: "8-dragons-en.jpg",
											cs: "8-dragons-cs.jpg",
											ch: "8-dragons-ch.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "三國",
											cs: "三国",
											en:
												"3 Kingdoms Battle of Red Cliffs",
											id:
												"3 Kerajaan - Pertempuran Cenuram Merah",
											th: "สาม อาณาจักร",
											vn: "Tam quốc "
										},
										appId: "vs25kingdoms",
										gameId: "vs25kingdoms",
										category1: "Slots",
										paylines: "25",
										rtp: "96.50%",
										reels: "5",
										imgName: {
											ch:
												"3-kingdoms-battle-of-red-cliffs-ch.jpg",
											cs:
												"3-kingdoms-battle-of-red-cliffs-cs.jpg",
											en:
												"3-kingdoms-battle-of-red-cliffs-en.jpg",
											id:
												"3-kingdoms-battle-of-red-cliffs-id.jpg",
											th:
												"3-kingdoms-battle-of-red-cliffs-th.jpg",
											vn:
												"3-kingdoms-battle-of-red-cliffs-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											vn: "Sói vàng ",
											th: "หมาป่าทองคำ",
											en: "Wolf Gold",
											cs: "野狼黄金",
											id: "Emas Serigala"
										},
										appId: "vs25wolfgold",
										gameId: "vs25wolfgold",
										category1: "Slots",
										paylines: "25",
										rtp: "96.00%",
										reels: "5",
										imgName: {
											vn: "wolf-gold-vn.jpg",
											th: "wolf-gold-th.jpg",
											en: "wolf-gold-en.jpg",
											cs: "wolf-gold-cs.jpg",
											id: "wolf-gold-id.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "黑豹女王",
											cs: "黑豹女王",
											en: "Panther Queen",
											id: "Ratu Harimau Kumbang",
											th: "ราชินีเสือดำ",
											vn: "Nữ hoàng Panther"
										},
										appId: "vs25pantherqueen",
										gameId: "vs25pantherqueen",
										category1: "Slots",
										paylines: "25",
										rtp: "96.50%",
										reels: "5",
										imgName: {
											ch: "panther-queen-ch.jpg",
											cs: "panther-queen-cs.jpg",
											en: "panther-queen-en.jpg",
											id: "panther-queen-id.jpg",
											th: "panther-queen-th.jpg",
											vn: "panther-queen-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											id: "Ratu Atlantis",
											vn: "Nữ hoàng Atlantis",
											th: "ราชินีแอตแลนติส",
											en: "Queen Of Atlantis",
											cs: "亚特兰蒂斯女王",
											ch: "亞特蘭蒂斯女王"
										},
										appId: "vs1024atlantis",
										gameId: "vs1024atlantis",
										category1: "Slots",
										paylines: "1024",
										rtp: "96.41%",
										reels: "5",
										imgName: {
											id: "queen-of-atlantis-id.jpg",
											vn: "queen-of-atlantis-vn.jpg",
											th: "queen-of-atlantis-th.jpg",
											en: "queen-of-atlantis-en.jpg",
											cs: "queen-of-atlantis-cs.jpg",
											ch: "queen-of-atlantis-ch.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "愛爾蘭的魅力",
											cs: "爱尔兰的魅力",
											en: "Irish Charms",
											id: "Pesona Irish",
											th: "สาวงามไอริช",
											vn: "Bùa mê Ai-len"
										},
										appId: "cs3irishcharms",
										gameId: "cs3irishcharms",
										category1: "Slots",
										paylines: "3",
										rtp: "96.96%",
										reels: "3",
										imgName: {
											ch: "irish-charms-ch.jpg",
											cs: "irish-charms-cs.jpg",
											en: "irish-charms-en.jpg",
											id: "irish-charms-id.jpg",
											th: "irish-charms-th.jpg",
											vn: "irish-charms-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											vn: "Nữ hoàng Vàng",
											th: "ราชินีทองคำ",
											id: "Ratu Emas",
											cs: "黄金女王",
											ch: "黃金女王",
											en: "Queen Of Gold"
										},
										appId: "vs25queenofgold",
										gameId: "vs25queenofgold",
										category1: "Slots",
										paylines: "25",
										rtp: "96.50%",
										reels: "5",
										imgName: {
											vn: "queen-of-gold-vn.jpg",
											th: "queen-of-gold-th.jpg",
											id: "queen-of-gold-id.jpg",
											cs: "queen-of-gold-cs.jpg",
											ch: "queen-of-gold-ch.jpg",
											en: "queen-of-gold-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "富贵888",
											en: "888 Gold",
											id: "888 Emas",
											th: "888 ทองคำ",
											vn: "Vàng 888"
										},
										appId: "cs5triple8gold",
										gameId: "cs5triple8gold",
										category1: "Slots",
										paylines: "5",
										rtp: "97.52%",
										reels: "3",
										imgName: {
											cs: "888-gold-cs.jpg",
											en: "888-gold-en.jpg",
											id: "888-gold-id.jpg",
											th: "888-gold-th.jpg",
											vn: "888-gold-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: true,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "永恒鉆石3線",
											vn: "Kim cương Vĩnh cửu 3 Dòng",
											th: "เพชรอมตะ 3 แถว",
											id: "Intan Abadi 3 Garis",
											en: "Diamonds are Forever 3 Lines",
											cs: "永恒钻石3线"
										},
										appId: "cs3w",
										gameId: "cs3w",
										category1: "Slots",
										paylines: "3",
										rtp: "96.96%",
										reels: "3",
										imgName: {
											ch:
												"diamonds-are-forever-3-lines-ch.jpg",
											vn:
												"diamonds-are-forever-3-lines-vn.jpg",
											th:
												"diamonds-are-forever-3-lines-th.jpg",
											id:
												"diamonds-are-forever-3-lines-id.jpg",
											en:
												"diamonds-are-forever-3-lines-en.jpg",
											cs:
												"diamonds-are-forever-3-lines-cs.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "龍之國度",
											vn: "Vương quốc rồng",
											th: "อาณาจักรมังกร",
											id: "Kerajaan Naga",
											en: "Dragon Kingdom",
											cs: "龙之国度"
										},
										appId: "vs25dragonkingdom",
										gameId: "vs25dragonkingdom",
										category1: "Slots",
										paylines: "25",
										rtp: "96.47%",
										reels: "5",
										imgName: {
											ch: "dragon-kingdom-ch.jpg",
											vn: "dragon-kingdom-vn.jpg",
											th: "dragon-kingdom-th.jpg",
											id: "dragon-kingdom-id.jpg",
											en: "dragon-kingdom-en.jpg",
											cs: "dragon-kingdom-cs.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "宙斯之子赫拉克勒斯",
											cs: "宙斯之子赫拉克勒斯",
											en: "Hercules Son Of Zeus",
											id: "Hercules Anak Zeus",
											th: "เฮอร์คิวลิส",
											vn: "Héc Quyn"
										},
										appId: "vs50hercules",
										gameId: "vs50hercules",
										category1: "Slots",
										paylines: "50",
										rtp: "95.19%",
										reels: "5",
										imgName: {
											ch: "hercules-son-of-zeus-ch.jpg",
											cs: "hercules-son-of-zeus-cs.jpg",
											en: "hercules-son-of-zeus-en.jpg",
											id: "hercules-son-of-zeus-id.jpg",
											th: "hercules-son-of-zeus-th.jpg",
											vn: "hercules-son-of-zeus-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											id: "3 Hajat Jin",
											vn: "3 Điều ước của Thần linh",
											th: "3 คำอธิษฐานของจีนี่",
											en: "3 Genie Wishes",
											cs: "3个精灵愿望",
											ch: "3個精靈愿望"
										},
										appId: "vs50aladdin",
										gameId: "vs50aladdin",
										category1: "Slots",
										paylines: "50",
										rtp: "96.53%",
										reels: "5",
										imgName: {
											id: "3-genie-wishes-id.jpg",
											vn: "3-genie-wishes-vn.jpg",
											th: "3-genie-wishes-th.jpg",
											en: "3-genie-wishes-en.jpg",
											cs: "3-genie-wishes-cs.jpg",
											ch: "3-genie-wishes-ch.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "西游記",
											cs: "西游记",
											en: "Journey to the West",
											id: "Kembara ke Barat",
											th: "ไซอิ๋วผจญภัย",
											vn: "Tây Du Ký"
										},
										appId: "vs25journey",
										gameId: "vs25journey",
										category1: "Slots",
										paylines: "25",
										rtp: "96.47%",
										reels: "5",
										imgName: {
											ch: "journey-to-the-west-ch.jpg",
											cs: "journey-to-the-west-cs.jpg",
											en: "journey-to-the-west-en.jpg",
											id: "journey-to-the-west-id.jpg",
											th: "journey-to-the-west-th.jpg",
											vn: "journey-to-the-west-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "貝奧武夫",
											vn: "Beowulf",
											th: "บีโอวูลฟ์",
											id: "Beowulf",
											en: "Beowulf",
											cs: "贝奥武夫"
										},
										appId: "vs40beowulf",
										gameId: "vs40beowulf",
										category1: "Slots",
										paylines: "40",
										rtp: "96.50%",
										reels: "5",
										imgName: {
											ch: "beowulf-ch.jpg",
											vn: "beowulf-vn.jpg",
											th: "beowulf-th.jpg",
											id: "beowulf-id.jpg",
											en: "beowulf-en.jpg",
											cs: "beowulf-cs.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "飛龍在天",
											vn: "Những chú rồng may mắn",
											th: "มังกรโชคลาภ",
											id: "Naga Bertuah",
											en: "Lucky Dragons",
											cs: "飞龙在天"
										},
										appId: "vs50chinesecharms",
										gameId: "vs50chinesecharms",
										category1: "Slots",
										paylines: "50",
										rtp: "95.19%",
										reels: "5",
										imgName: {
											ch: "lucky-dragons-ch.jpg",
											vn: "lucky-dragons-vn.jpg",
											th: "lucky-dragons-th.jpg",
											id: "lucky-dragons-id.jpg",
											en: "lucky-dragons-en.jpg",
											cs: "lucky-dragons-cs.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "矮人黃金豪華版",
											cs: "矮人黄金豪华版",
											en: "Dwarven Gold Deluxe",
											id: "Emas Kerdil Deluxe",
											th: "ทองคำคนแคระดีลักซ์",
											vn: "Vàng của Người lùn Cao cấp"
										},
										appId: "vs25dwarves_new",
										gameId: "vs25dwarves_new",
										category1: "Slots",
										paylines: "25",
										rtp: "96.47%",
										reels: "5",
										imgName: {
											ch: "dwarven-gold-deluxe-ch.jpg",
											cs: "dwarven-gold-deluxe-cs.jpg",
											en: "dwarven-gold-deluxe-en.jpg",
											id: "dwarven-gold-deluxe-id.jpg",
											th: "dwarven-gold-deluxe-th.jpg",
											vn: "dwarven-gold-deluxe-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "野生動物園",
											vn: "Cuộc săn Nóng bỏng",
											th: "ซาฟารีสุดฮ็อต",
											en: "Hot Safari",
											cs: "野生动物园",
											id: "Safari Panas"
										},
										appId: "vs25safari",
										gameId: "vs25safari",
										category1: "Slots",
										paylines: "25",
										rtp: "96.17%",
										reels: "6",
										imgName: {
											ch: "hot-safari-ch.jpg",
											vn: "hot-safari-vn.jpg",
											th: "hot-safari-th.jpg",
											en: "hot-safari-en.jpg",
											cs: "hot-safari-cs.jpg",
											id: "hot-safari-id.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "無敵金剛",
											cs: "无敌金刚",
											en: "Mighty Kong",
											id: "Kong Perkasa",
											th: "ไม้ท์ตี้คอง",
											vn: "King Kong Phi thường"
										},
										appId: "vs50kingkong",
										gameId: "vs50kingkong",
										category1: "Slots",
										paylines: "50",
										rtp: "96.64%",
										reels: "5",
										imgName: {
											ch: "mighty-kong-ch.jpg",
											cs: "mighty-kong-cs.jpg",
											en: "mighty-kong-en.jpg",
											id: "mighty-kong-id.jpg",
											th: "mighty-kong-th.jpg",
											vn: "mighty-kong-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											id: "Lady Godiva",
											vn: "Quý bà Godiva",
											th: "เลดี้โกไดว่า",
											en: "Lady Godiva",
											cs: "女神戈帝梵",
											ch: "女神戈帝梵"
										},
										appId: "vs20godiva",
										gameId: "vs20godiva",
										category1: "Slots",
										paylines: "20",
										rtp: "96.54%",
										reels: "5",
										imgName: {
											id: "lady-godiva-id.jpg",
											vn: "lady-godiva-vn.jpg",
											th: "lady-godiva-th.jpg",
											en: "lady-godiva-en.jpg",
											cs: "lady-godiva-cs.jpg",
											ch: "lady-godiva-ch.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "魔幻水晶",
											cs: "魔幻水晶",
											en: "Magic Crystals",
											id: "Kristal Ajaib",
											th: "คริสตัลเวทมนตร์",
											vn: "Pha lê Kỳ diệu"
										},
										appId: "vs243crystalcave",
										gameId: "vs243crystalcave",
										category1: "Slots",
										paylines: "243",
										rtp: "96.36%",
										reels: "5",
										imgName: {
											ch: "magic-crystals-ch.jpg",
											cs: "magic-crystals-cs.jpg",
											en: "magic-crystals-en.jpg",
											id: "magic-crystals-id.jpg",
											th: "magic-crystals-th.jpg",
											vn: "magic-crystals-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "阿拉丁寶藏",
											vn: "Kho báu của Aladdin",
											th: "ขุมทรัพย์อาละดิน",
											en: "Aladdins Treasure",
											id: "Harta Karun Aladdin",
											cs: "阿拉丁宝藏"
										},
										appId: "vs50amt",
										gameId: "vs50amt",
										category1: "Slots",
										paylines: "50",
										rtp: "96.58%",
										reels: "5",
										imgName: {
											ch: "aladdins-treasure-ch.jpg",
											vn: "aladdins-treasure-vn.jpg",
											th: "aladdins-treasure-th.jpg",
											en: "aladdins-treasure-en.jpg",
											id: "aladdins-treasure-id.jpg",
											cs: "aladdins-treasure-cs.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "月之女神",
											cs: "月之女神",
											en: "Lady Of The Moon",
											id: "Gadis Bulan",
											th: "จันทรานารี",
											vn: "Quý bà Mặt trăng"
										},
										appId: "vs13ladyofmoon",
										gameId: "vs13ladyofmoon",
										category1: "Slots",
										paylines: "13",
										rtp: "96.52%",
										reels: "5",
										imgName: {
											ch: "lady-of-the-moon-ch.jpg",
											cs: "lady-of-the-moon-cs.jpg",
											en: "lady-of-the-moon-en.jpg",
											id: "lady-of-the-moon-id.jpg",
											th: "lady-of-the-moon-th.jpg",
											vn: "lady-of-the-moon-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											th: "ตำนานแห่งอียิปต์",
											vn: "Câu chuyện Ai Cập",
											id: "Kisah Mesir",
											en: "Tales Of Egypt",
											cs: "埃及传说",
											ch: "埃及傳說"
										},
										appId: "vs20egypt",
										gameId: "vs20egypt",
										category1: "Slots",
										paylines: "20",
										rtp: "91.93%",
										reels: "5",
										imgName: {
											th: "tales-of-egypt-th.jpg",
											vn: "tales-of-egypt-vn.jpg",
											id: "tales-of-egypt-id.jpg",
											en: "tales-of-egypt-en.jpg",
											cs: "tales-of-egypt-cs.jpg",
											ch: "tales-of-egypt-ch.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "極速糖果",
											cs: "极速糖果",
											en: "Sugar Rush",
											id: "Serbuan Gula",
											th: "ซูการ์รัช",
											vn: "Đua xe Ô tô"
										},
										appId: "vs20cm",
										gameId: "vs20cm",
										category1: "Slots",
										paylines: "20",
										rtp: "96.52%",
										reels: "5",
										imgName: {
											ch: "sugar-rush-ch.jpg",
											cs: "sugar-rush-cs.jpg",
											en: "sugar-rush-en.jpg",
											id: "sugar-rush-id.jpg",
											th: "sugar-rush-th.jpg",
											vn: "sugar-rush-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											vn: "Rặng san hô Hùng vĩ",
											th: "ปะการังมหัศจรรย์",
											id: "Terumbu Besar",
											cs: "大堡礁",
											ch: "大堡礁",
											en: "Great Reef"
										},
										appId: "vs25sea",
										gameId: "vs25sea",
										category1: "Slots",
										paylines: "25",
										rtp: "96.64%",
										reels: "5",
										imgName: {
											vn: "great-reef-vn.jpg",
											th: "great-reef-th.jpg",
											id: "great-reef-id.jpg",
											cs: "great-reef-cs.jpg",
											ch: "great-reef-ch.jpg",
											en: "great-reef-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "榮耀羅馬",
											cs: "荣耀罗马",
											en: "Glorious Rome",
											id: "Rom Gemilang",
											th: "รุ่งโรจน์โรม",
											vn: "Thành Rome Huy hoàng"
										},
										appId: "vs20rome",
										gameId: "vs20rome",
										category1: "Slots",
										paylines: "20",
										rtp: "94.11%",
										reels: "5",
										imgName: {
											ch: "glorious-rome-ch.jpg",
											cs: "glorious-rome-cs.jpg",
											en: "glorious-rome-en.jpg",
											id: "glorious-rome-id.jpg",
											th: "glorious-rome-th.jpg",
											vn: "glorious-rome-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											id: "Emas Kerdil",
											vn: "Vàng của Người lùn 25 Dòng",
											th: "ทองคำคนแคระ 25 แถว",
											en: "Dwarven Gold",
											cs: "矮人黄金",
											ch: "矮人黃金"
										},
										appId: "vs25dwarves",
										gameId: "vs25dwarves",
										category1: "Slots",
										paylines: "25",
										rtp: "96.64%",
										reels: "5",
										imgName: {
											id: "dwarven-gold-id.jpg",
											vn: "dwarven-gold-vn.jpg",
											th: "dwarven-gold-th.jpg",
											en: "dwarven-gold-en.jpg",
											cs: "dwarven-gold-cs.jpg",
											ch: "dwarven-gold-ch.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "惡魔13",
											cs: "恶魔13",
											en: "Devils 13",
											id: "13 Syaitan",
											th: "13 ปีศาจ",
											vn: "Sự trả thù của quỷ 13"
										},
										appId: "vs13g",
										gameId: "vs13g",
										category1: "Slots",
										paylines: "13",
										rtp: "95.06%",
										reels: "5",
										imgName: {
											ch: "devils-13-ch.jpg",
											cs: "devils-13-cs.jpg",
											en: "devils-13-en.jpg",
											id: "devils-13-id.jpg",
											th: "devils-13-th.jpg",
											vn: "devils-13-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											vn: "Những chú ong Bận rộn",
											th: "ผึ้งงานจอมยุ่ง",
											id: "Lebah Sibuk",
											cs: "勤劳蜜蜂",
											en: "Busy Bees",
											ch: "勤勞蜜蜂"
										},
										appId: "vs20bl",
										gameId: "vs20bl",
										category1: "Slots",
										paylines: "20",
										rtp: "96.00%",
										reels: "5",
										imgName: {
											vn: "busy-bees-vn.jpg",
											th: "busy-bees-th.jpg",
											id: "busy-bees-id.jpg",
											cs: "busy-bees-cs.jpg",
											en: "busy-bees-en.jpg",
											ch: "busy-bees-ch.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "7只猴子",
											vn: "7 Chú khỉ",
											th: "7 วานร",
											en: "7 Monkeys",
											id: "7 Monyet",
											cs: "7只猴子"
										},
										appId: "vs7monkeys",
										gameId: "vs7monkeys",
										category1: "Slots",
										paylines: "7",
										rtp: "92.71%",
										reels: "5",
										imgName: {
											ch: "7-monkeys-ch.jpg",
											vn: "7-monkeys-vn.jpg",
											th: "7-monkeys-th.jpg",
											en: "7-monkeys-en.jpg",
											id: "7-monkeys-id.jpg",
											cs: "7-monkeys-cs.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "水果派对",
											en: "Fruit Party"
										},
										appId: "vs20fruitparty",
										gameId: "vs20fruitparty",
										category1: "Slots",
										paylines: "20",
										rtp: "96.50%",
										reels: "7",
										imgName: {
											cs: "fruit-party-cs.jpg",
											en: "fruit-party-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "深林之猩",
											en: "Jungle Gorilla™"
										},
										appId: "vs20gorilla",
										gameId: "vs20gorilla",
										category1: "Slots",
										paylines: "20",
										rtp: "96.57%",
										reels: "5",
										imgName: {
											cs: "jungle-gorilla-cs.jpg",
											en: "jungle-gorilla-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "狼人的诅咒",
											en:
												"Curse of the Werewolf Megaways™"
										},
										appId: "vswayswerewolf",
										gameId: "vswayswerewolf",
										category1: "Slots",
										paylines: "46656",
										rtp: "96.50%",
										reels: "6",
										imgName: {
											cs:
												"curse-of-the-werewolf-megaways-cs.jpg",
											en:
												"curse-of-the-werewolf-megaways-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "超级持控旋转",
											en: "Ultra Hold and Spin™"
										},
										appId: "vs5ultra",
										gameId: "vs5ultra",
										category1: "Slots",
										paylines: "5",
										rtp: "96.70%",
										reels: "3",
										imgName: {
											cs: "ultra-hold-and-spin-cs.jpg",
											en: "ultra-hold-and-spin-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: true,
										playFree: true
									},
									{
										name: {
											cs: "约翰·亨特之图特书",
											en:
												"John Hunter and the Book of Tut"
										},
										appId: "vs10bookoftut",
										gameId: "vs10bookoftut",
										category1: "Slots",
										paylines: "5",
										rtp: "96.5%",
										reels: "3",
										imgName: {
											cs:
												"john-hunter-and-the-book-of-tut-cs.jpg",
											en:
												"john-hunter-and-the-book-of-tut-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "行星宝石 Megaways",
											en: "Starz Megaways"
										},
										appId: "vs117649starz",
										gameId: "vs117649starz",
										category1: "Slots",
										paylines: null,
										rtp: "96.70%",
										reels: "",
										imgName: {
											cs: "starz-megaways-cs.jpg",
											en: "starz-megaways-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "超级燃烧",
											en: "Ultra Burn"
										},
										appId: "vs5ultrab",
										gameId: "vs5ultrab",
										category1: "Slots",
										paylines: null,
										rtp: "96.62%",
										reels: "",
										imgName: {
											cs: "ultra-burn-cs.jpg",
											en: "ultra-burn-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "钱生钱",
											en: "Money Money Money"
										},
										appId: "vs1money",
										gameId: "vs1money",
										category1: "Slots",
										paylines: null,
										rtp: "97.09%",
										reels: "",
										imgName: {
											cs: "money-money-money-cs.jpg",
											en: "money-money-money-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "王者金字塔",
											en: "Pyramid King"
										},
										appId: "vs25pyramid",
										gameId: "vs25pyramid",
										category1: "Slots",
										paylines: null,
										rtp: "96.5%",
										reels: "",
										imgName: {
											cs: "pyramid-king-cs.jpg",
											en: "pyramid-king-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "福福福",
											en: "Fu Fu Fu"
										},
										appId: "vs1fufufu",
										gameId: "vs1fufufu",
										category1: "Slots",
										paylines: null,
										rtp: "96.84%",
										reels: "",
										imgName: {
											cs: "fu-fu-fu-cs.jpg",
											en: "fu-fu-fu-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											en: "Drago - Jewels of Fortune™",
											cs: "群龙保珠-宝石致富"
										},
										appId: "vs1600drago",
										gameId: "vs1600drago",
										category1: "Slots",
										paylines: null,
										rtp: "96.5%",
										reels: "",
										imgName: {
											en:
												"drago-jewels-of-fortune-en.jpg",
											cs: "drago-jewels-of-fortune-cs.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "街头赛车",
											en: "Street Racer™"
										},
										appId: "vs40streetracer",
										gameId: "vs40streetracer",
										category1: "Slots",
										paylines: null,
										rtp: "96.52%",
										reels: "",
										imgName: {
											cs: "street-racer-cs.jpg",
											en: "street-racer-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "武松打虎",
											en: "The Tiger Warrior™"
										},
										appId: "vs25tigerwar",
										gameId: "vs25tigerwar",
										category1: "Slots",
										paylines: null,
										rtp: "96.01%",
										reels: "",
										imgName: {
											cs: "the-tiger-warrior-cs.jpg",
											en: "the-tiger-warrior-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "巨大犀牛 加强版™",
											en: "Great Rhino Deluxe™"
										},
										appId: "vs20rhinoluxe",
										gameId: "vs20rhinoluxe",
										category1: "Slots",
										paylines: "20",
										rtp: "96.54%",
										reels: "3",
										imgName: {
											cs: "great-rhino-deluxe-cs.jpg",
											en: "great-rhino-deluxe-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "爱尔兰人宝藏™",
											en: "Wild Wild Riches™"
										},
										appId: "vs576treasures",
										gameId: "vs576treasures",
										category1: "Slots",
										paylines: "576",
										rtp: "96.77%",
										reels: "4",
										imgName: {
											cs: "wild-wild-riches-cs.jpg",
											en: "wild-wild-riches-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "汪汪之家 Megaways™",
											en: "The Dog House Megaways™"
										},
										appId: "vswaysdogs",
										gameId: "vswaysdogs",
										category1: "Slots",
										paylines: "11969",
										rtp: "96.55%",
										reels: "7",
										imgName: {
											cs: "the-dog-house-megaways-cs.jpg",
											en: "the-dog-house-megaways-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: true,
										playFree: true
									},
									{
										name: {
											en: "Aztec Gems Deluxe™",
											cs: "古代宝石加强版™"
										},
										appId: "vs9aztecgemsdx",
										gameId: "vs9aztecgemsdx",
										category1: "Slots",
										paylines: "9",
										rtp: "96.50%",
										reels: "3",
										imgName: {
											en: "aztec-gems-deluxe-en.jpg",
											cs: "aztec-gems-deluxe-cs.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: true,
										playFree: true
									},
									{
										name: {
											cs: "恶毒魔法",
											en: "Voodoo Magic"
										},
										appId: "vs40voodoo",
										gameId: "vs40voodoo",
										category1: "Slots",
										paylines: "20",
										rtp: "96.50%",
										reels: "",
										imgName: {
											cs: "voodoo-magic-cs.jpg",
											en: "voodoo-magic-en.jpg"
										},
										launchDate: "2021-05-19T11:32:22-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: false
									},
									{
										name: {
											cs: "古埃及神话",
											en: "Mysterious Egypt"
										},
										appId: "vs10wildtut",
										gameId: "vs10wildtut",
										category1: "Slots",
										paylines: "10",
										rtp: "96.50%",
										reels: "",
										imgName: {
											cs: "mysterious-egypt-cs.jpg",
											en: "mysterious-egypt-en.jpg"
										},
										launchDate: "2021-05-19T11:32:23-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: false
									},
									{
										name: {
											cs: "鸿运你最牛",
											en: "Golden Ox"
										},
										appId: "vs25gldox",
										gameId: "vs25gldox",
										category1: "Slots",
										paylines: "25",
										rtp: "96.01%",
										reels: "",
										imgName: {
											cs: "golden-ox-cs.jpg",
											en: "golden-ox-en.jpg"
										},
										launchDate: "2021-05-19T11:32:23-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: false
									},
									{
										name: {
											cs: "翡翠之王彩虹道路",
											en: "Emerald King Rainbow Road "
										},
										appId: "vs20ekingrr",
										gameId: "vs20ekingrr",
										category1: "Slots",
										paylines: "20",
										rtp: "96.71%",
										reels: "",
										imgName: {
											cs:
												"emerald-king-rainbow-road-cs.jpg",
											en:
												"emerald-king-rainbow-road-en.jpg"
										},
										launchDate: "2021-05-19T11:32:23-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: false
									},
									{
										name: {
											cs: "刚果财富",
											en: "Congo Cash"
										},
										appId: "vs432congocash",
										gameId: "vs432congocash",
										category1: "Slots",
										paylines: "20",
										rtp: "96.51%",
										reels: "",
										imgName: {
											cs: "congo-cash-cs.jpg",
											en: "congo-cash-en.jpg"
										},
										launchDate: "2021-05-19T11:32:23-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: false
									},
									{
										name: {
											cs: "神龙宝藏雄火之眼",
											en: "Dragon Kingdom - Eyes of Fire"
										},
										appId: "vs5drmystery",
										gameId: "vs5drmystery",
										category1: "Slots",
										paylines: "5",
										rtp: "96.49%",
										reels: "",
										imgName: {
											cs:
												"dragon-kingdom-eyes-of-fire-cs.jpg",
											en:
												"dragon-kingdom-eyes-of-fire-en.jpg"
										},
										launchDate: "2021-05-19T11:32:23-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: false
									},
									{
										name: {
											cs: "命运女巫Megaways",
											en: "Madame Destiny Megaways"
										},
										appId: "vswaysmadame",
										gameId: "vswaysmadame",
										category1: "Slots",
										paylines: "20",
										rtp: "96.56%",
										reels: "",
										imgName: {
											cs:
												"madame-destiny-megaways-cs.jpg",
											en: "madame-destiny-megaways-en.jpg"
										},
										launchDate: "2021-05-19T11:32:23-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: false
									},
									{
										name: {
											cs: "风暴之眼",
											en: "Eye of the Storm"
										},
										appId: "vs10eyestorm",
										gameId: "vs10eyestorm",
										category1: "Slots",
										paylines: "10",
										rtp: "96.71%",
										reels: "",
										imgName: {
											cs: "eye-of-the-storm-cs.jpg",
											en: "eye-of-the-storm-en.jpg"
										},
										launchDate: "2021-05-19T11:32:23-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: false
									},
									{
										name: {
											cs: "迈达斯之手",
											en: "The Hand of Midas"
										},
										appId: "vs20midas",
										gameId: "vs20midas",
										category1: "Slots",
										paylines: "20",
										rtp: "96.54%",
										reels: "",
										imgName: {
											cs: "the-hand-of-midas-cs.jpg",
											en: "the-hand-of-midas-en.jpg"
										},
										launchDate: "2021-05-19T11:32:24-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: false
									},
									{
										name: {
											cs: "小丑王国",
											en: "Joker King"
										},
										appId: "vs25jokerking",
										gameId: "vs25jokerking",
										category1: "Slots",
										paylines: "25",
										rtp: "96.50%",
										reels: "",
										imgName: {
											cs: "joker-king-cs.jpg",
											en: "joker-king-en.jpg"
										},
										launchDate: "2021-05-19T11:32:24-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: false
									},
									{
										name: {
											cs: "热火燃烧 持控旋转",
											en: "Hot to Burn Hold and Spin"
										},
										appId: "vs20hburnhs",
										gameId: "vs20hburnhs",
										category1: "Slots",
										paylines: "20",
										rtp: "96.70%",
										reels: "",
										imgName: {
											cs:
												"hot-to-burn-hold-and-spin-cs.jpg",
											en:
												"hot-to-burn-hold-and-spin-en.jpg"
										},
										launchDate: "2021-05-19T11:32:24-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: false
									},
									{
										name: {
											cs: "奥林匹斯之门",
											en: "Gates of Olympus"
										},
										appId: "vs20olympgate",
										gameId: "vs20olympgate",
										category1: "Slots",
										paylines: "20",
										rtp: "96.50%",
										reels: "",
										imgName: {
											cs: "gates-of-olympus-cs.jpg",
											en: "gates-of-olympus-en.jpg"
										},
										launchDate: "2021-05-19T11:32:24-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: false
									},
									{
										name: {
											en: "Fishin Reels",
											cs: "大鱼奇缘"
										},
										appId: "vs10goldfish",
										gameId: "vs10goldfish",
										category1: "Slots",
										paylines: "10",
										rtp: "96.50%",
										reels: "",
										imgName: {
											en: "fishin-reels-en.jpg",
											cs: "fishin-reels-cs.jpg"
										},
										launchDate: "2021-05-19T11:32:24-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: false
									},
									{
										name: {
											cs: "铁木真宝物",
											en: "Temujin Treasures"
										},
										appId: "vs1024temuj",
										gameId: "vs1024temuj",
										category1: "Slots",
										paylines: "1024 ways",
										rtp: "96.55%",
										reels: "",
										imgName: {
											cs: "temujin-treasures-cs.jpg",
											en: "temujin-treasures-en.jpg"
										},
										launchDate: "2021-05-19T11:32:24-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: false
									},
									{
										name: {
											cs: "多汁水果",
											en: "Juicy Fruits"
										},
										appId: "vs50juicyfr",
										gameId: "vs50juicyfr",
										category1: "Slots",
										paylines: "50",
										rtp: "96.51%",
										reels: "",
										imgName: {
											cs: "juicy-fruits-cs.jpg",
											en: "juicy-fruits-en.jpg"
										},
										launchDate: "2021-05-19T11:32:24-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: false
									},
									{
										name: {
											cs: "百搭加强器",
											en: "Wild Booster"
										},
										appId: "vs20wildboost",
										gameId: "vs20wildboost",
										category1: "Slots",
										paylines: "20",
										rtp: "96.47%",
										reels: "",
										imgName: {
											cs: "wild-booster-cs.jpg",
											en: "wild-booster-en.jpg"
										},
										launchDate: "2021-05-19T11:32:24-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: false
									},
									{
										name: {
											cs: "雷神之锤 Megaways",
											en: "Power of Thor Megaways"
										},
										appId: "vswayshammthor",
										gameId: "vswayshammthor",
										category1: "Slots",
										paylines: "117469 ways",
										rtp: "96.55%",
										reels: "",
										imgName: {
											cs: "power-of-thor-megaways-cs.jpg",
											en: "power-of-thor-megaways-en.jpg"
										},
										launchDate: "2021-05-19T11:32:25-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: false
									},
									{
										name: {
											cs: "狂热嘉年华",
											en: "Hot Fiesta"
										},
										appId: "vs25hotfiesta",
										gameId: "vs25hotfiesta",
										category1: "Slots",
										paylines: "25",
										rtp: "96.50%",
										reels: "",
										imgName: {
											cs: "hot-fiesta-cs.jpg",
											en: "hot-fiesta-en.jpg"
										},
										launchDate: "2021-05-19T11:32:25-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: false
									},
									{
										name: {
											cs: "王者野牛 Megaways",
											en: "Buffalo King Megaways"
										},
										appId: "vswaysbufking",
										gameId: "vswaysbufking",
										category1: "Slots",
										paylines: "200704 ways",
										rtp: "95.55%",
										reels: "",
										imgName: {
											cs: "buffalo-king-megaways-cs.jpg",
											en: "buffalo-king-megaways-en.jpg"
										},
										launchDate: "2021-05-19T11:32:25-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: false
									},
									{
										name: {
											cs: "鱼跃龙门 持控旋转",
											en: "Floating Dragon"
										},
										appId: "vs10floatdrg",
										gameId: "vs10floatdrg",
										category1: "Slots",
										paylines: "10",
										rtp: "96.71%",
										reels: "",
										imgName: {
											cs: "floating-dragon-cs.jpg",
											en: "floating-dragon-en.jpg"
										},
										launchDate: "2021-05-19T11:32:25-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: false
									},
									{
										name: {
											ch: "龍虎斗",
											cs: "龙虎斗",
											en: "Dragon Tiger",
											id: "Naga Harimau",
											th: "พยัคฆ์มังกร ",
											vn: "Long Hổ"
										},
										appId: "bndt",
										gameId: "bndt",
										category1: "Table",
										paylines: "--",
										rtp: "96.26%",
										reels: "--",
										imgName: {
											ch: "dragon-tiger-ch.jpg",
											cs: "dragon-tiger-cs.jpg",
											en: "dragon-tiger-en.jpg",
											id: "dragon-tiger-id.jpg",
											th: "dragon-tiger-th.jpg",
											vn: "dragon-tiger-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											id: "Baccarat Bonus Naga\u00A0",
											vn: "Baccarat Thưởng Rồng",
											th: "ไพ่บาคาร่าโบนัสมังกร",
											en: "Dragon Bonus Baccarat",
											cs: "龙宝百家乐",
											ch: "龍寶百家樂"
										},
										appId: "bnadvanced",
										gameId: "bnadvanced",
										category1: "Table",
										paylines: "--",
										rtp: "98.94%",
										reels: "--",
										imgName: {
											id: "dragon-bonus-baccarat-id.jpg",
											vn: "dragon-bonus-baccarat-vn.jpg",
											th: "dragon-bonus-baccarat-th.jpg",
											en: "dragon-bonus-baccarat-en.jpg",
											cs: "dragon-bonus-baccarat-cs.jpg",
											ch: "dragon-bonus-baccarat-ch.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "百家樂",
											cs: "百家乐",
											en: "Baccarat",
											id: "Baccarat",
											th: "บาคาร่า",
											vn: "Bài cào"
										},
										appId: "bca",
										gameId: "bca",
										category1: "Table",
										paylines: "--",
										rtp: "98.76%",
										reels: "--",
										imgName: {
											ch: "baccarat-ch.jpg",
											cs: "baccarat-cs.jpg",
											en: "baccarat-en.jpg",
											id: "baccarat-id.jpg",
											th: "baccarat-th.jpg",
											vn: "baccarat-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											vn: "Ai Cập Cổ đại",
											th: "อียิปต์โบราณ",
											en: "American Blackjack",
											cs: "美式二十一点",
											id: "Mesir Purba",
											ch: "美式二十一點"
										},
										appId: "bjmb",
										gameId: "bjmb",
										category1: "Table",
										paylines: "--",
										rtp: "99.60%",
										reels: "",
										imgName: {
											vn: "american-blackjack-vn.jpg",
											th: "american-blackjack-th.jpg",
											en: "american-blackjack-en.jpg",
											cs: "american-blackjack-cs.jpg",
											id: "american-blackjack-id.jpg",
											ch: "american-blackjack-ch.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "21點之富貴臨門",
											cs: "21点之富贵临门",
											en: "Multihand Blackjack",
											id: "Blackjack Multitangan",
											th: "มัลติแฮนด์แบล็คแจ็ค",
											vn: "Blackjack Nhiều tay"
										},
										appId: "bjma",
										gameId: "bjma",
										category1: "Table",
										paylines: "--",
										rtp: "99.62%",
										reels: "",
										imgName: {
											ch: "multihand-blackjack-ch.jpg",
											cs: "multihand-blackjack-cs.jpg",
											en: "multihand-blackjack-en.jpg",
											id: "multihand-blackjack-id.jpg",
											th: "multihand-blackjack-th.jpg",
											vn: "multihand-blackjack-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "輪盤",
											cs: "轮盘",
											en: "Roulette",
											id: "Rolet",
											th: "รูเล็ต",
											vn: "Cò quay"
										},
										appId: "rla",
										gameId: "rla",
										category1: "Table",
										paylines: "--",
										rtp: "97.30%",
										reels: "",
										imgName: {
											ch: "roulette-ch.jpg",
											cs: "roulette-cs.jpg",
											en: "roulette-en.jpg",
											id: "roulette-id.jpg",
											th: "roulette-th.jpg",
											vn: "roulette-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "野生动物园 75,000",
											vn: "Cuộc săn Nóng bỏng 75,000",
											th: "ซาฟารีสุดฮ็อต 75,000",
											id: "Safari Panas 75,000",
											en: "Hot Safari 75,000",
											ch: "野生動物園 75,000"
										},
										appId: "scsafariai",
										gameId: "scsafariai",
										category1: "ScratchCard",
										paylines: null,
										rtp: null,
										reels: "",
										imgName: {
											cs: "hot-safari-75000-cs.jpg",
											vn: "hot-safari-75000-vn.jpg",
											th: "hot-safari-75000-th.jpg",
											id: "hot-safari-75000-id.jpg",
											en: "hot-safari-75000-en.jpg",
											ch: "hot-safari-75000-ch.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: false
									},
									{
										name: {
											ch: "黃金女王 100,000",
											cs: "黄金女王 100,000",
											en: "Queen of Gold 100,000",
											id: "Ratu Emas 100,000",
											th: "ราชินีทองคำ 100,000",
											vn: "Nữ hoàng Vàng 100,000"
										},
										appId: "scqogai",
										gameId: "scqogai",
										category1: "ScratchCard",
										paylines: null,
										rtp: null,
										reels: "",
										imgName: {
											ch: "queen-of-gold-100000-ch.jpg",
											cs: "queen-of-gold-100000-cs.jpg",
											en: "queen-of-gold-100000-en.jpg",
											id: "queen-of-gold-100000-id.jpg",
											th: "queen-of-gold-100000-th.jpg",
											vn: "queen-of-gold-100000-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: false
									},
									{
										name: {
											ch: "熊貓財富 50,000",
											vn: "Vận may của Gấu trúc 50,000",
											th: "แพนด้ามหาโชค 50,000",
											en: "Panda Gold 50,000",
											cs: "熊猫财富 50,000",
											id: "Kekayaan Panda 50,000"
										},
										appId: "scpandai",
										gameId: "scpandai",
										category1: "ScratchCard",
										paylines: null,
										rtp: null,
										reels: "",
										imgName: {
											ch: "panda-gold-50000-ch.jpg",
											vn: "panda-gold-50000-vn.jpg",
											th: "panda-gold-50000-th.jpg",
											en: "panda-gold-50000-en.jpg",
											cs: "panda-gold-50000-cs.jpg",
											id: "panda-gold-50000-id.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: false
									},
									{
										name: {
											ch: "7只小豬 25,000",
											cs: "7只小猪 25,000",
											en: "7 Piggies 25,000",
											id: "7 Babi 25,000",
											th: "ลูกหมู 7 ตัว 25,000",
											vn: "7 Chú lợn con 25,000"
										},
										appId: "sc7piggiesai",
										gameId: "sc7piggiesai",
										category1: "ScratchCard",
										paylines: null,
										rtp: null,
										reels: "",
										imgName: {
											ch: "7-piggies-25000-ch.jpg",
											cs: "7-piggies-25000-cs.jpg",
											en: "7-piggies-25000-en.jpg",
											id: "7-piggies-25000-id.jpg",
											th: "7-piggies-25000-th.jpg",
											vn: "7-piggies-25000-vn.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: false
									}
								]
							},
							displayKey: null
						},
						{
							value: 6,
							name: "GPI",
							displayText: "GPI",
							playFree: false,
							gameList: {
								imgUrl: "",
								data: [
									{
										name: {
											cs: "四大神兽",
											en: "4 Guardians"
										},
										appId: "fourguardians",
										gameId: "fourguardians",
										category1: "Slots",
										paylines: "20",
										rtp: "96.99",
										reels: "",
										imgName: {
											cs: "4-guardians-cs.jpg",
											en: "4-guardians-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: true,
										playFree: true
									},
									{
										name: {
											ch: "福祿娃",
											en: "7 Brothers",
											cs: "福禄娃"
										},
										appId: "sevenbrothers",
										gameId: "sevenbrothers",
										category1: "Slots",
										paylines: "25",
										rtp: "94.93",
										reels: "",
										imgName: {
											ch: "7-brothers-ch.jpg",
											en: "7-brothers-en.jpg",
											cs: "7-brothers-cs.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "七大奇觀",
											cs: "七大奇观",
											en: "7 Wonders"
										},
										appId: "sevenwonders",
										gameId: "sevenwonders",
										category1: "Slots",
										paylines: "20",
										rtp: "95.16",
										reels: "",
										imgName: {
											ch: "7-wonders-ch.jpg",
											cs: "7-wonders-cs.jpg",
											en: "7-wonders-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "777 幸運大轉盤",
											cs: "777 幸运大转盘",
											en: "777 Golden Wheel"
										},
										appId: "goldenwheel",
										gameId: "goldenwheel",
										category1: "Slots",
										paylines: "20",
										rtp: "95.06",
										reels: "",
										imgName: {
											ch: "777-golden-wheel-ch.jpg",
											cs: "777-golden-wheel-cs.jpg",
											en: "777-golden-wheel-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: true,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: true,
										playFree: true
									},
									{
										name: {
											en: "Alchemists Spell",
											cs: "魔幻炼金",
											ch: "魔幻煉金"
										},
										appId: "alchemistsspell",
										gameId: "alchemistsspell",
										category1: "Slots",
										paylines: "125 ways",
										rtp: "96.52",
										reels: "",
										imgName: {
											en: "alchemists-spell-en.jpg",
											cs: "alchemists-spell-cs.jpg",
											ch: "alchemists-spell-ch.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "熱血棒球",
											en: "Baseball",
											cs: "热血棒球"
										},
										appId: "baseball",
										gameId: "baseball",
										category1: "Slots",
										paylines: "30",
										rtp: "95.36",
										reels: "",
										imgName: {
											ch: "baseball-ch.jpg",
											en: "baseball-en.jpg",
											cs: "baseball-cs.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "沙灘比基尼",
											cs: "沙滩比基尼",
											en: "Bikini Beach"
										},
										appId: "bikinibeach",
										gameId: "bikinibeach",
										category1: "Slots",
										paylines: "30",
										rtp: "97.00",
										reels: "",
										imgName: {
											ch: "bikini-beach-ch.jpg",
											cs: "bikini-beach-cs.jpg",
											en: "bikini-beach-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "桃源秘境",
											en: "Blossom Garden"
										},
										appId: "blossomgarden",
										gameId: "blossomgarden",
										category1: "Slots",
										paylines: "30",
										rtp: "96.50",
										reels: "",
										imgName: {
											cs: "blossom-garden-cs.jpg",
											en: "blossom-garden-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: true,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: true,
										playFree: true
									},
									{
										name: {
											ch: "拳擊",
											cs: "拳击",
											en: "Boxing"
										},
										appId: "boxing",
										gameId: "boxing",
										category1: "Slots",
										paylines: "15",
										rtp: "95.30",
										reels: "",
										imgName: {
											ch: "boxing-ch.jpg",
											cs: "boxing-cs.jpg",
											en: "boxing-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											en: "Candylicious",
											cs: "甜蜜蜜",
											ch: "甜蜜蜜"
										},
										appId: "candylicious",
										gameId: "candylicious",
										category1: "Slots",
										paylines: "9",
										rtp: "96.82",
										reels: "",
										imgName: {
											en: "candylicious-en.jpg",
											cs: "candylicious-cs.jpg",
											ch: "candylicious-ch.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "寶兔隊長",
											cs: "宝兔队长",
											en: "Captain Rabbit"
										},
										appId: "captainrabbit",
										gameId: "captainrabbit",
										category1: "Slots",
										paylines: "25",
										rtp: "96.49%",
										reels: "",
										imgName: {
											ch: "captain-rabbit-ch.jpg",
											cs: "captain-rabbit-cs.jpg",
											en: "captain-rabbit-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "皇家賭場",
											cs: "皇家赌场",
											en: "Casino Royale"
										},
										appId: "casinoroyale",
										gameId: "casinoroyale",
										category1: "Slots",
										paylines: "30",
										rtp: "92.41",
										reels: "",
										imgName: {
											ch: "casino-royale-ch.jpg",
											cs: "casino-royale-cs.jpg",
											en: "casino-royale-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "至尊棋王",
											cs: "至尊棋王",
											en: "Chess Royale"
										},
										appId: "chessroyale",
										gameId: "chessroyale",
										category1: "Slots",
										paylines: "10",
										rtp: "96.08",
										reels: "",
										imgName: {
											ch: "chess-royale-ch.jpg",
											cs: "chess-royale-cs.jpg",
											en: "chess-royale-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											en: "Cleopatra",
											cs: "埃及艳后",
											ch: "埃及艷后"
										},
										appId: "cleopatra",
										gameId: "cleopatra",
										category1: "Slots",
										paylines: "50",
										rtp: "97.01",
										reels: "",
										imgName: {
											en: "cleopatra-en.jpg",
											cs: "cleopatra-cs.jpg",
											ch: "cleopatra-ch.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "沙漠綠洲",
											cs: "沙漠绿洲",
											en: "Desert Oasis"
										},
										appId: "desertoasis",
										gameId: "desertoasis",
										category1: "Slots",
										paylines: "20",
										rtp: "95.15",
										reels: "",
										imgName: {
											ch: "desert-oasis-ch.jpg",
											cs: "desert-oasis-cs.jpg",
											en: "desert-oasis-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "舌尖上的點心",
											cs: "舌尖上的点心",
											en: "Dimsumlicious"
										},
										appId: "dimsumlicious",
										gameId: "dimsumlicious",
										category1: "Slots",
										paylines: "8",
										rtp: "95.04",
										reels: "",
										imgName: {
											ch: "dimsumlicious-ch.jpg",
											cs: "dimsumlicious-cs.jpg",
											en: "dimsumlicious-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "恐龍時代",
											cs: "恐龙时代",
											en: "Dino Age"
										},
										appId: "dinoage",
										gameId: "dinoage",
										category1: "Slots",
										paylines: "9",
										rtp: "97.00%",
										reels: "",
										imgName: {
											ch: "dino-age-ch.jpg",
											cs: "dino-age-cs.jpg",
											en: "dino-age-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: true,
										playFree: true
									},
									{
										name: {
											cs: "发发猪",
											en: "Fa Fa Zhu"
										},
										appId: "fafazhu",
										gameId: "fafazhu",
										category1: "Slots",
										paylines: "9",
										rtp: "96.50%",
										reels: "",
										imgName: {
											cs: "fa-fa-zhu-cs.jpg",
											en: "fa-fa-zhu-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: true,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: true,
										playFree: true
									},
									{
										name: {
											ch: "秘密花園",
											en: "Floras Secret",
											cs: "秘密花园"
										},
										appId: "florassecret",
										gameId: "florassecret",
										category1: "Slots",
										paylines: "20",
										rtp: "95.00",
										reels: "",
										imgName: {
											ch: "floras-secret-ch.jpg",
											en: "floras-secret-en.jpg",
											cs: "floras-secret-cs.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "金瓶梅",
											cs: "金瓶梅",
											en: "Forbidden Chamber"
										},
										appId: "forbiddenchamber",
										gameId: "forbiddenchamber",
										category1: "Slots",
										paylines: "30",
										rtp: "95.17",
										reels: "",
										imgName: {
											ch: "forbidden-chamber-ch.jpg",
											cs: "forbidden-chamber-cs.jpg",
											en: "forbidden-chamber-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "招財貓",
											cs: "招财猫",
											en: "Fortune Cat"
										},
										appId: "fortunecat",
										gameId: "fortunecat",
										category1: "Slots",
										paylines: "8",
										rtp: "96.00",
										reels: "",
										imgName: {
											ch: "fortune-cat-ch.jpg",
											cs: "fortune-cat-cs.jpg",
											en: "fortune-cat-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "幸運骰子",
											cs: "幸运骰子",
											en: "Fortune Dice"
										},
										appId: "fortunedice",
										gameId: "fortunedice",
										category1: "Slots",
										paylines: "50",
										rtp: "96.80",
										reels: "",
										imgName: {
											ch: "fortune-dice-ch.jpg",
											cs: "fortune-dice-cs.jpg",
											en: "fortune-dice-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											en: "Fortune Hong Bao",
											ch: "旺旺紅包",
											cs: "旺旺红包"
										},
										appId: "fortunehongbao",
										gameId: "fortunehongbao",
										category1: "Slots",
										paylines: "8",
										rtp: "97.03%",
										reels: "",
										imgName: {
											en: "fortune-hong-bao-en.jpg",
											ch: "fortune-hong-bao-ch.jpg",
											cs: "fortune-hong-bao-cs.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: true,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: true,
										playFree: true
									},
									{
										name: {
											ch: "錦鯉納福",
											en: "Fortune Koi",
											cs: "锦鲤纳福"
										},
										appId: "fortunekoi",
										gameId: "fortunekoi",
										category1: "Slots",
										paylines: "10",
										rtp: "96.00",
										reels: "",
										imgName: {
											ch: "fortune-koi-ch.jpg",
											en: "fortune-koi-en.jpg",
											cs: "fortune-koi-cs.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "財富之泉",
											en: "Fountain of Fortune",
											cs: "财富之泉"
										},
										appId: "fountainoffortune",
										gameId: "fountainoffortune",
										category1: "Slots",
										paylines: "9",
										rtp: "97%",
										reels: "",
										imgName: {
											ch: "fountain-of-fortune-ch.jpg",
											en: "fountain-of-fortune-en.jpg",
											cs: "fountain-of-fortune-cs.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "四大美人",
											en: "Four Beauties"
										},
										appId: "fourbeauties",
										gameId: "fourbeauties",
										category1: "Slots",
										paylines: "30",
										rtp: "96.09",
										reels: "",
										imgName: {
											cs: "four-beauties-cs.jpg",
											en: "four-beauties-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: true,
										playFree: true
									},
									{
										name: {
											ch: "冰雪藏龍",
											en: "Frost Dragon",
											cs: "冰雪藏龙"
										},
										appId: "frostdragon",
										gameId: "frostdragon",
										category1: "Slots",
										paylines: "20",
										rtp: "96.49",
										reels: "",
										imgName: {
											ch: "frost-dragon-ch.jpg",
											en: "frost-dragon-en.jpg",
											cs: "frost-dragon-cs.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "水果樂園",
											en: "Fruitilicious",
											cs: "水果乐园"
										},
										appId: "fruitilicious",
										gameId: "fruitilicious",
										category1: "Slots",
										paylines: "8",
										rtp: "95.04",
										reels: "",
										imgName: {
											ch: "fruitilicious-ch.jpg",
											en: "fruitilicious-en.jpg",
											cs: "fruitilicious-cs.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: true,
										playFree: true
									},
									{
										name: {
											ch: "福祿壽",
											cs: "福禄寿",
											en: "Fu Lu Shou"
										},
										appId: "fulushou",
										gameId: "fulushou",
										category1: "Slots",
										paylines: "20",
										rtp: "95.16",
										reels: "",
										imgName: {
											ch: "fu-lu-shou-ch.jpg",
											cs: "fu-lu-shou-cs.jpg",
											en: "fu-lu-shou-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "寶石贏家",
											cs: "宝石赢家",
											en: "Gem Forest"
										},
										appId: "gemforest",
										gameId: "gemforest",
										category1: "Slots",
										paylines: "27 ways",
										rtp: "96.07",
										reels: "",
										imgName: {
											ch: "gem-forest-ch.jpg",
											cs: "gem-forest-cs.jpg",
											en: "gem-forest-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "财神到",
											en: "God of Fortune"
										},
										appId: "godoffortune",
										gameId: "godoffortune",
										category1: "Slots",
										paylines: "8",
										rtp: "97.03",
										reels: "",
										imgName: {
											cs: "god-of-fortune-cs.jpg",
											en: "god-of-fortune-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: true,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: true,
										playFree: true
									},
									{
										name: {
											ch: "賭神",
											en: "God of Gamblers",
											cs: "赌神"
										},
										appId: "godofgamblers",
										gameId: "godofgamblers",
										category1: "Slots",
										paylines: "25",
										rtp: "94.99",
										reels: "",
										imgName: {
											ch: "god-of-gamblers-ch.jpg",
											en: "god-of-gamblers-en.jpg",
											cs: "god-of-gamblers-cs.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "金蛋鵝",
											cs: "金蛋鹅",
											en: "Golden Eggs"
										},
										appId: "goldeneggs",
										gameId: "goldeneggs",
										category1: "Slots",
										paylines: "25",
										rtp: "94.99",
										reels: "",
										imgName: {
											ch: "golden-eggs-ch.jpg",
											cs: "golden-eggs-cs.jpg",
											en: "golden-eggs-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "花夏女孩",
											cs: "花夏女孩",
											en: "Hula Girl"
										},
										appId: "hulagirl",
										gameId: "hulagirl",
										category1: "Slots",
										paylines: "20",
										rtp: "96.10",
										reels: "",
										imgName: {
											ch: "hula-girl-ch.jpg",
											cs: "hula-girl-cs.jpg",
											en: "hula-girl-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											en: "Jewel Land",
											ch: "取寶樂園",
											cs: "取宝乐园"
										},
										appId: "jewelland",
										gameId: "jewelland",
										category1: "Slots",
										paylines: "5",
										rtp: "96.49",
										reels: "",
										imgName: {
											en: "jewel-land-en.jpg",
											ch: "jewel-land-ch.jpg",
											cs: "jewel-land-cs.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "經典老虎機",
											cs: "经典老虎机",
											en: "KlassiK"
										},
										appId: "klassik",
										gameId: "klassik",
										category1: "Slots",
										paylines: "9",
										rtp: "97.00",
										reels: "",
										imgName: {
											ch: "klassik-ch.jpg",
											cs: "klassik-cs.jpg",
											en: "klassik-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "貓犬之爭",
											cs: "猫犬之争",
											en: "Kung Fu Furry"
										},
										appId: "kungfufurry",
										gameId: "kungfufurry",
										category1: "Slots",
										paylines: "16",
										rtp: "96.53",
										reels: "",
										imgName: {
											ch: "kung-fu-furry-ch.jpg",
											cs: "kung-fu-furry-cs.jpg",
											en: "kung-fu-furry-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "財富女神",
											cs: "财富女神",
											en: "Lady Fortune"
										},
										appId: "ladyfortune",
										gameId: "ladyfortune",
										category1: "Slots",
										paylines: "1",
										rtp: "97.46",
										reels: "",
										imgName: {
											ch: "lady-fortune-ch.jpg",
											cs: "lady-fortune-cs.jpg",
											en: "lady-fortune-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "闹花灯",
											en: "Lantern Festival",
											ch: "鬧花燈"
										},
										appId: "lanternfestival",
										gameId: "lanternfestival",
										category1: "Slots",
										paylines: "30",
										rtp: "95.36",
										reels: "",
										imgName: {
											cs: "lantern-festival-cs.jpg",
											en: "lantern-festival-en.jpg",
											ch: "lantern-festival-ch.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "哪吒鬧海",
											cs: "哪吒闹海",
											en: "Legend of Nezha"
										},
										appId: "legendofnezha",
										gameId: "legendofnezha",
										category1: "Slots",
										paylines: "30",
										rtp: "97.00",
										reels: "",
										imgName: {
											ch: "legend-of-nezha-ch.jpg",
											cs: "legend-of-nezha-cs.jpg",
											en: "legend-of-nezha-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "頑皮小怪獸",
											cs: "顽皮小怪兽",
											en: "Little Monsters"
										},
										appId: "littlemonsters",
										gameId: "littlemonsters",
										category1: "Slots",
										paylines: "25",
										rtp: "94.99",
										reels: "",
										imgName: {
											ch: "little-monsters-ch.jpg",
											cs: "little-monsters-cs.jpg",
											en: "little-monsters-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "至尊撲克",
											cs: "至尊扑克",
											en: "Lucky Royale"
										},
										appId: "luckyroyale",
										gameId: "luckyroyale",
										category1: "Slots",
										paylines: "20",
										rtp: "96.99",
										reels: "",
										imgName: {
											ch: "lucky-royale-ch.jpg",
											cs: "lucky-royale-cs.jpg",
											en: "lucky-royale-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "吉星塔罗",
											en: "Lucky Tarot"
										},
										appId: "luckytarot",
										gameId: "luckytarot",
										category1: "Slots",
										paylines: "30",
										rtp: "97.04%",
										reels: "",
										imgName: {
											cs: "lucky-tarot-cs.jpg",
											en: "lucky-tarot-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: true,
										playFree: true
									},
									{
										name: {
											ch: "月光傳奇",
											en: "Lunar Legends",
											cs: "月光传奇"
										},
										appId: "lunarlegends",
										gameId: "lunarlegends",
										category1: "Slots",
										paylines: "250",
										rtp: "96.46%",
										reels: "",
										imgName: {
											ch: "lunar-legends-ch.jpg",
											en: "lunar-legends-en.jpg",
											cs: "lunar-legends-cs.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: true,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: true,
										playFree: true
									},
									{
										name: {
											ch: "黑手黨",
											cs: "黑手党",
											en: "Mafia"
										},
										appId: "mafia",
										gameId: "mafia",
										category1: "Slots",
										paylines: "30",
										rtp: "95.36",
										reels: "",
										imgName: {
											ch: "mafia-ch.jpg",
											cs: "mafia-cs.jpg",
											en: "mafia-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "神奇折纸",
											en: "Magic Paper"
										},
										appId: "magicpaper",
										gameId: "magicpaper",
										category1: "Slots",
										paylines: "1",
										rtp: "96.82%",
										reels: "",
										imgName: {
											cs: "magic-paper-cs.jpg",
											en: "magic-paper-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: true,
										playFree: true
									},
									{
										name: {
											ch: "鐵錘金猩",
											cs: "铁锤金猩",
											en: "Money Monkey"
										},
										appId: "moneymonkey",
										gameId: "moneymonkey",
										category1: "Slots",
										paylines: "243 ways",
										rtp: "96.33",
										reels: "",
										imgName: {
											ch: "money-monkey-ch.jpg",
											cs: "money-monkey-cs.jpg",
											en: "money-monkey-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											en: "Monkey King",
											cs: "齐天大圣",
											ch: "齊天大圣"
										},
										appId: "monkeyking",
										gameId: "monkeyking",
										category1: "Slots",
										paylines: "30",
										rtp: "95.36",
										reels: "",
										imgName: {
											en: "monkey-king-en.jpg",
											cs: "monkey-king-cs.jpg",
											ch: "monkey-king-ch.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "魔物賞金",
											cs: "魔物赏金",
											en: "Monsters Cash"
										},
										appId: "monsterscash",
										gameId: "monsterscash",
										category1: "Slots",
										paylines: "10",
										rtp: "96.97",
										reels: "",
										imgName: {
											ch: "monsters-cash-ch.jpg",
											cs: "monsters-cash-cs.jpg",
											en: "monsters-cash-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "月光寶兔",
											cs: "月光宝兔",
											en: "Moon Rabbit"
										},
										appId: "moonrabbit",
										gameId: "moonrabbit",
										category1: "Slots",
										paylines: "8",
										rtp: "96.64",
										reels: "",
										imgName: {
											ch: "moon-rabbit-ch.jpg",
											cs: "moon-rabbit-cs.jpg",
											en: "moon-rabbit-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "快樂國度 - 雙贏",
											cs: "快乐国度 - 双赢",
											en: "Nation - Double Play"
										},
										appId: "nationdoubleplay",
										gameId: "nationdoubleplay",
										category1: "Slots",
										paylines: "30",
										rtp: "96.64%",
										reels: "",
										imgName: {
											ch: "nation-double-play-ch.jpg",
											cs: "nation-double-play-cs.jpg",
											en: "nation-double-play-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "女娲与五行",
											en: "Nuwa and the Five Elements"
										},
										appId: "nuwaandthefiveelements",
										gameId: "nuwaandthefiveelements",
										category1: "Slots",
										paylines: "77",
										rtp: "96.50%",
										reels: "",
										imgName: {
											cs:
												"nuwa-and-the-five-elements-cs.jpg",
											en:
												"nuwa-and-the-five-elements-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: true,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "熊貓萌萌噠",
											cs: "熊猫萌萌哒",
											en: "Panda"
										},
										appId: "panda",
										gameId: "panda",
										category1: "Slots",
										paylines: "1",
										rtp: "96.82",
										reels: "",
										imgName: {
											ch: "panda-ch.jpg",
											cs: "panda-cs.jpg",
											en: "panda-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: true,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "幻影神偷",
											cs: "幻影神偷",
											en: "Phantom Thief"
										},
										appId: "phantomthief",
										gameId: "phantomthief",
										category1: "Slots",
										paylines: "30",
										rtp: "96.36",
										reels: "",
										imgName: {
											ch: "phantom-thief-ch.jpg",
											cs: "phantom-thief-cs.jpg",
											en: "phantom-thief-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "法老王",
											cs: "法老王",
											en: "Pharaoh"
										},
										appId: "pharaoh",
										gameId: "pharaoh",
										category1: "Slots",
										paylines: "20",
										rtp: "95.57",
										reels: "",
										imgName: {
											ch: "pharaoh-ch.jpg",
											cs: "pharaoh-cs.jpg",
											en: "pharaoh-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "神火凤凰",
											en: "Phoenix",
											ch: "神火鳳凰"
										},
										appId: "phoenix",
										gameId: "phoenix",
										category1: "Slots",
										paylines: "30",
										rtp: "96.98",
										reels: "",
										imgName: {
											cs: "phoenix-cs.jpg",
											en: "phoenix-en.jpg",
											ch: "phoenix-ch.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "七夕情緣",
											cs: "七夕情缘",
											en: "Qi Xi"
										},
										appId: "qixi",
										gameId: "qixi",
										category1: "Slots",
										paylines: "9",
										rtp: "96.00",
										reels: "",
										imgName: {
											ch: "qi-xi-ch.jpg",
											cs: "qi-xi-cs.jpg",
											en: "qi-xi-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "蜜花園",
											cs: "蜜花园",
											en: "Queen Bee"
										},
										appId: "queenbee",
										gameId: "queenbee",
										category1: "Slots",
										paylines: "9",
										rtp: "96.00",
										reels: "",
										imgName: {
											ch: "queen-bee-ch.jpg",
											cs: "queen-bee-cs.jpg",
											en: "queen-bee-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "紅樓夢",
											cs: "红楼梦",
											en: "Red Chamber"
										},
										appId: "redchamber",
										gameId: "redchamber",
										category1: "Slots",
										paylines: "25",
										rtp: "95.50",
										reels: "",
										imgName: {
											ch: "red-chamber-ch.jpg",
											cs: "red-chamber-cs.jpg",
											en: "red-chamber-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											en: "Roman Empire",
											ch: "羅馬帝國",
											cs: "罗马帝国"
										},
										appId: "romanempire",
										gameId: "romanempire",
										category1: "Slots",
										paylines: "30",
										rtp: "92.31",
										reels: "",
										imgName: {
											en: "roman-empire-en.jpg",
											ch: "roman-empire-ch.jpg",
											cs: "roman-empire-cs.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "寿司武士",
											ch: "壽司武士",
											en: "Samurai Sushi"
										},
										appId: "samuraisushi",
										gameId: "samuraisushi",
										category1: "Slots",
										paylines: "50",
										rtp: "97.01",
										reels: "",
										imgName: {
											cs: "samurai-sushi-cs.jpg",
											ch: "samurai-sushi-ch.jpg",
											en: "samurai-sushi-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "致命雄鷹",
											cs: "致命雄鹰",
											en: "Sky Strikers"
										},
										appId: "skystrikers",
										gameId: "skystrikers",
										category1: "Slots",
										paylines: "20",
										rtp: "97.33",
										reels: "",
										imgName: {
											ch: "sky-strikers-ch.jpg",
											cs: "sky-strikers-cs.jpg",
											en: "sky-strikers-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "霓虹空间",
											en: "Space Neon"
										},
										appId: "spaceneon",
										gameId: "spaceneon",
										category1: "Slots",
										paylines: "9",
										rtp: "96.94%",
										reels: "",
										imgName: {
											cs: "space-neon-cs.jpg",
											en: "space-neon-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "脫金俱樂部",
											cs: "脱金俱乐部",
											en: "Strip n Roll"
										},
										appId: "stripnroll",
										gameId: "stripnroll",
										category1: "Slots",
										paylines: "20",
										rtp: "96.99%",
										reels: "",
										imgName: {
											ch: "strip-n-roll-ch.jpg",
											cs: "strip-n-roll-cs.jpg",
											en: "strip-n-roll-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											en: "Sweet Treats",
											cs: "甜蜜相待",
											ch: "甜蜜相待"
										},
										appId: "sweettreats",
										gameId: "sweettreats",
										category1: "Slots",
										paylines: "8",
										rtp: "96.67",
										reels: "",
										imgName: {
											en: "sweet-treats-en.jpg",
											cs: "sweet-treats-cs.jpg",
											ch: "sweet-treats-ch.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: true,
										playFree: true
									},
									{
										name: {
											ch: "胡桃夾歡樂夜",
											cs: "胡桃夹欢乐夜",
											en: "The Nutcracker"
										},
										appId: "nutcracker",
										gameId: "nutcracker",
										category1: "Slots",
										paylines: "5",
										rtp: "95.00",
										reels: "",
										imgName: {
											ch: "the-nutcracker-ch.jpg",
											cs: "the-nutcracker-cs.jpg",
											en: "the-nutcracker-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "桃花三仙",
											cs: "桃花三仙",
											en: "Three Beauties"
										},
										appId: "threebeauties",
										gameId: "threebeauties",
										category1: "Slots",
										paylines: "1",
										rtp: "96.82%",
										reels: "",
										imgName: {
											ch: "three-beauties-ch.jpg",
											cs: "three-beauties-cs.jpg",
											en: "three-beauties-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "轉三國",
											cs: "转三国",
											en: "Three Kingdoms"
										},
										appId: "threekingdoms",
										gameId: "threekingdoms",
										category1: "Slots",
										paylines: "30",
										rtp: "96.09",
										reels: "",
										imgName: {
											ch: "three-kingdoms-ch.jpg",
											cs: "three-kingdoms-cs.jpg",
											en: "three-kingdoms-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											en: "Tokyo Hunter",
											cs: "东京猎人",
											ch: "東京獵人"
										},
										appId: "tokyohunter",
										gameId: "tokyohunter",
										category1: "Slots",
										paylines: "25",
										rtp: "95.00",
										reels: "",
										imgName: {
											en: "tokyo-hunter-en.jpg",
											cs: "tokyo-hunter-cs.jpg",
											ch: "tokyo-hunter-ch.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "萬圣驚魂夜",
											cs: "万圣惊魂夜",
											en: "Trick or Treat"
										},
										appId: "trickortreat",
										gameId: "trickortreat",
										category1: "Slots",
										paylines: "20",
										rtp: "97.02",
										reels: "",
										imgName: {
											ch: "trick-or-treat-ch.jpg",
											cs: "trick-or-treat-cs.jpg",
											en: "trick-or-treat-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "海底世界",
											cs: "海底世界",
											en: "Under Water World"
										},
										appId: "underwaterworld",
										gameId: "underwaterworld",
										category1: "Slots",
										paylines: "15",
										rtp: "95.30",
										reels: "",
										imgName: {
											ch: "under-water-world-ch.jpg",
											cs: "under-water-world-cs.jpg",
											en: "under-water-world-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "萬金: 百萬大輪",
											cs: "万金: 百万大轮",
											en: "Vikings Mega Reels"
										},
										appId: "vikingsmegareels",
										gameId: "vikingsmegareels",
										category1: "Slots",
										paylines: "250",
										rtp: "96.02%",
										reels: "",
										imgName: {
											ch: "vikings-mega-reels-ch.jpg",
											cs: "vikings-mega-reels-cs.jpg",
											en: "vikings-mega-reels-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											en: "Wilds and the Beanstalk",
											cs: "疯狂豌豆",
											ch: "瘋狂豌豆"
										},
										appId: "wildsandthebeanstalk",
										gameId: "wildsandthebeanstalk",
										category1: "Slots",
										paylines: "20",
										rtp: "96.53",
										reels: "",
										imgName: {
											en:
												"wilds-and-the-beanstalk-en.jpg",
											cs:
												"wilds-and-the-beanstalk-cs.jpg",
											ch: "wilds-and-the-beanstalk-ch.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "风中奇铃",
											en: "Wind Chimes"
										},
										appId: "windchimes",
										gameId: "windchimes",
										category1: "Slots",
										paylines: "30",
										rtp: "96.50%",
										reels: "",
										imgName: {
											cs: "wind-chimes-cs.jpg",
											en: "wind-chimes-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: true,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "英雄崛起",
											cs: "英雄崛起",
											en: "World of Warlords"
										},
										appId: "worldofwarlords",
										gameId: "worldofwarlords",
										category1: "Slots",
										paylines: "30",
										rtp: "95.17",
										reels: "",
										imgName: {
											ch: "world-of-warlords-ch.jpg",
											cs: "world-of-warlords-cs.jpg",
											en: "world-of-warlords-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "世界足球老虎機",
											cs: "世界足球老虎机",
											en: "World Soccer Slot"
										},
										appId: "soccer",
										gameId: "soccer",
										category1: "Slots",
										paylines: "243 ways",
										rtp: "96.49",
										reels: "",
										imgName: {
											ch: "world-soccer-slot-ch.jpg",
											cs: "world-soccer-slot-cs.jpg",
											en: "world-soccer-slot-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											cs: "武俠公主 百万大轮",
											en: "Wuxia Princess Mega Reels"
										},
										appId: "wuxiaprincessmegareels",
										gameId: "wuxiaprincessmegareels",
										category1: "Slots",
										paylines: "250",
										rtp: "96.46",
										reels: "",
										imgName: {
											cs:
												"wuxia-princess-mega-reels-cs.jpg",
											en:
												"wuxia-princess-mega-reels-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: true,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: true,
										playFree: true
									},
									{
										name: {
											en: "Xuan Wu Blessing",
											cs: "玄武赐福"
										},
										appId: "xuanwublessing",
										gameId: "xuanwublessing",
										category1: "Slots",
										paylines: "20",
										rtp: "97.00%",
										reels: "",
										imgName: {
											en: "xuan-wu-blessing-en.jpg",
											cs: "xuan-wu-blessing-cs.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: true,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									},
									{
										name: {
											ch: "宙斯 - 眾神之王",
											en: "Zeus",
											cs: "宙斯 - 众神之王"
										},
										appId: "zeus",
										gameId: "zeus",
										category1: "Slots",
										paylines: "20",
										rtp: "95.16",
										reels: "",
										imgName: {
											ch: "zeus-ch.jpg",
											en: "zeus-en.jpg",
											cs: "zeus-cs.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: true,
										playFree: true
									},
									{
										name: {
											ch: "十二生肖",
											cs: "十二生肖",
											en: "Zodiac"
										},
										appId: "zodiac",
										gameId: "zodiac",
										category1: "Slots",
										paylines: "30",
										rtp: "97.03",
										reels: "",
										imgName: {
											ch: "zodiac-ch.jpg",
											cs: "zodiac-cs.jpg",
											en: "zodiac-en.jpg"
										},
										launchDate: "2020-11-30T20:00:00-04:00",
										hot: false,
										new: false,
										imageExist: true,
										promotion: 0,
										featured: false,
										playFree: true
									}
								]
							},
							displayKey: null
						}
					]
				},
				errorCode: 0,
				message: null,
				rawErrorCode: "",
				rawMessage: ""
			}
		})
	);

	api_site.api_GetTpIds.mockImplementation(() =>
		Promise.resolve({
			data: {
				data: [
					1,
					2,
					3,
					4,
					5,
					6,
					7,
					8,
					9,
					10,
					11,
					12,
					13,
					14,
					15,
					16,
					18,
					20,
					23,
					24,
					25,
					27,
					28,
					29,
					30,
					31,
					32,
					34
				],
				errorCode: 0,
				message: "",
				rawErrorCode: "",
				rawMessage: ""
			}
		})
	);

	api_site.api_site_GetTpMaintainList.mockImplementation(() =>
		Promise.resolve({
			data: {
				data: [
					{
						siteId: 1,
						tpId: 8,
						tpCategoryId: 0,
						beginDate: "2022-07-28T02:34:00",
						endDate: "2022-07-30T02:32:00",
						maintainType: 0,
						typeValue: 0,
						beginTime: null,
						endTime: null
					}
				],
				errorCode: -1,
				message: "UtcNow is 2021/07/15 09:11:03",
				rawErrorCode: "",
				rawMessage: ""
			}
		})
	);

	api_site.api_site_GetBannerV3.mockImplementation(() =>
		Promise.resolve({
			data: {
				data: [
					{
						bannerName: "PP",
						bannerType: 3,
						actionMode: 4,
						bonusCode: null,
						matchId: "0",
						tpId: "0",
						gameId: null,
						urlRouter: null,
						sportBattleDateTime: null,
						leaguesId: null,
						sportLeaguesId: null,
						sportTeamsHome: null,
						sportTeamsHomePic: null,
						sportTeamsAway: null,
						sportTeamsAwayPic: null,
						details: null,
						bannerLink:
							"https://pp88.asia/daily-wins-euro-cup-edition/",
						bannerPCUrl:
							"https://image.n88media.com/Promotion/en/nova88_MYR.jpg",
						bannerMobileUrl:
							"https://image.n88media.com/Promotion/en/nova88_MYR.jpg",
						homeOdds: null,
						awayOdds: null,
						handicap: null,
						logo: null,
						backgroundPic: null
					},
					{
						bannerName: "Joker",
						bannerType: 3,
						actionMode: 6,
						bonusCode: null,
						matchId: "0",
						tpId: "9",
						gameId: null,
						urlRouter: "casino",
						sportBattleDateTime: null,
						leaguesId: null,
						sportLeaguesId: null,
						sportTeamsHome: null,
						sportTeamsHomePic: null,
						sportTeamsAway: null,
						sportTeamsAwayPic: null,
						details: null,
						bannerLink: "",
						bannerPCUrl:
							"https://image.n88media.com/SiteSkin/img/banner-joker.jpg",
						bannerMobileUrl:
							"https://image.n88media.com/SiteSkin/img/banner-joker.jpg",
						homeOdds: null,
						awayOdds: null,
						handicap: null,
						logo: null,
						backgroundPic: null
					},
					{
						bannerName: "Casino",
						bannerType: 3,
						actionMode: 1,
						bonusCode: null,
						matchId: "0",
						tpId: "0",
						gameId: null,
						urlRouter: null,
						sportBattleDateTime: null,
						leaguesId: null,
						sportLeaguesId: null,
						sportTeamsHome: null,
						sportTeamsHomePic: null,
						sportTeamsAway: null,
						sportTeamsAwayPic: null,
						details: null,
						bannerLink: "",
						bannerPCUrl:
							"https://www.nova88.net/CMS/Nova88/Casino/en/Casino.jpg",
						bannerMobileUrl:
							"https://m.nova88.net/CMS/Nova88/Casino/en/Casino.jpg",
						homeOdds: null,
						awayOdds: null,
						handicap: null,
						logo: null,
						backgroundPic: null
					}
				],
				errorCode: 0,
				message: "",
				rawErrorCode: "",
				rawMessage: ""
			}
		})
	);
};
describe("Logged in casino tests", () => {
	let tree;
	const history = reach.createHistory(window);
	const setPopBox = jest.fn();
	const wrapperFakeData = {
		path: {
			member: {
				root: "member"
			},
			promotionInfo: {
				root: "promotionInfo"
			},
			deposit: {
				root: "deposit"
			},
			login: {
				root: "login"
			}
		},
		i18n: {},
		config: {}
	};

	beforeEach(async () => {
		preset();

		await waitFor(async () => {
			tree = render(
				<reach.LocationProvider history={history}>
					<Wrapper {...wrapperFakeData}>
						<ct.popBoxContext.Provider
							value={{
								setPopBox
							}}>
							<ct.userInfoContext.Provider
								value={{
									userInfo: {
										langId: "en",
										isLogin: true,
										currencyId: 2,
										accountName: "qatest01",
										phoneNo: 657324366
									},
									setUserInfo: jest.fn()
								}}>
								<Casino tpId={6} />
							</ct.userInfoContext.Provider>
						</ct.popBoxContext.Provider>
					</Wrapper>
				</reach.LocationProvider>
			);
		});
	});
	it("Casino renders correctly", () => {
		const searchBox = tree.getByTestId("searchBox");
		fireEvent.change(searchBox, { target: { value: "bas" } });
		fireEvent.blur(searchBox);
		expect(tree).toMatchSnapshot();
	});

	/* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: true}}] */
	it(`Click provider in partnerSelect`, () => {
		const provider5 = tree.getByTestId("gameProvider_5");
		const provider6 = tree.getByTestId("gameProvider_6");
		let providerName = tree.getAllByTestId("providerName")[0];
		waitFor(() => {
			fireEvent.click(provider5);
			expect(provider5.classList.contains("active")).toEqual(true);
			expect(providerName.textContent).toEqual("PP");
		});

		waitFor(() => {
			fireEvent.click(provider6);
			providerName = tree.getAllByTestId("providerName")[0];
			expect(provider6.classList.contains("active")).toEqual(true);
			expect(provider5.classList.contains("active")).toEqual(false);
			expect(providerName.textContent).toEqual("GPI");
		});
	});

	it(`Click nav buttons`, () => {
		const nav_Jackpot = tree.getByTestId("nav_PROMO");
		const nav_All = tree.getByTestId("nav_ALLGAMES");

		fireEvent.click(nav_Jackpot);

		expect(nav_Jackpot.classList.contains("open")).toEqual(true);

		fireEvent.click(nav_All);

		expect(nav_All.classList.contains("open")).toEqual(true);
	});

	it(`Search input changes`, () => {
		const searchBox = tree.getByTestId("searchBox");
		fireEvent.change(searchBox, { target: { value: "sa" } });
		fireEvent.blur(searchBox);
		const gameImg = tree.getByTestId("gameImg");

		expect(gameImg.alt).toEqual("Samurai Sushi");
	});

	it(`Click dropdown items`, () => {
		const [dpAll, dpTable] = tree.getAllByTestId("dp-item");
		fireEvent.click(dpTable);
		const noData = tree.getByTestId("not-found");
		expect(noData).not.toEqual(null);

		fireEvent.click(dpAll);
		const gameImg = tree.getAllByTestId("gameImg")[0];
		expect(gameImg).not.toEqual(null);
	});

	it(`Click free play ( window.open )`, () => {
		const gameImg = tree.getAllByTestId("gameImg")[0];
		fireEvent.click(gameImg);
		global.open = jest.fn();
		const clickFreePlay = tree.getByTestId("clickFreePlay");
		fireEvent.click(clickFreePlay);
		expect(global.open).toBeCalled();
	});
	it(`Click play ( window.open )`, () => {
		const gameImg = tree.getAllByTestId("gameImg")[0];
		fireEvent.click(gameImg);
		global.open = jest.fn();
		const clickFreePlay = tree.getByTestId("clickPlay");
		fireEvent.click(clickFreePlay);
		expect(global.open).toBeCalled();
	});
	it(`Show favorite games`, () => {
		const nav_fav = tree.getByTestId("nav_FAVOURITE");
		fireEvent.click(nav_fav);
		waitFor(() => {
			const favGame1 = tree.getAllByTestId("gameImg")[0];
			const favGame2 = tree.getAllByTestId("gameImg")[1];
			expect(favGame1.alt).toEqual("Sky Strikers");
			expect(favGame2.alt).toEqual("Lantern Festival");
		});
	});

	it(`Remove favorite games`, async () => {
		const nav_fav = tree.getByTestId("nav_FAVOURITE");
		fireEvent.click(nav_fav);
		waitFor(() => {
			const removeFavBtn = tree.getAllByTestId("favBtn")[0];
			fireEvent.click(removeFavBtn);
			expect(tree.getAllByTestId("gameImg").length).toEqual(1);
		});
	});

	it(`Set favorite games`, () => {
		const gameImg = tree.getAllByTestId("gameImg")[0];
		const favBtn = tree.getAllByTestId("favBtn")[0];
		const nav_fav = tree.getByTestId("nav_FAVOURITE");
		fireEvent.click(favBtn);
		fireEvent.click(nav_fav);
		waitFor(() => {
			const favGame1 = tree.getAllByTestId("gameImg")[0];
			expect(favGame1.alt).toEqual(gameImg.alt);
		});
	});
});

describe("No tpId in url test ( logged in )", () => {
	let tree;
	const history = reach.createHistory(window);
	const setPopBox = jest.fn();
	const wrapperFakeData = {
		path: {
			member: {
				root: "member"
			},
			promotionInfo: {
				root: "promotionInfo"
			},
			deposit: {
				root: "deposit"
			},
			login: {
				root: "login"
			}
		},
		i18n: {},
		config: {}
	};

	beforeEach(async () => {
		preset();

		await waitFor(async () => {
			tree = render(
				<reach.LocationProvider history={history}>
					<Wrapper {...wrapperFakeData}>
						<ct.popBoxContext.Provider
							value={{
								setPopBox
							}}>
							<ct.userInfoContext.Provider
								value={{
									userInfo: {
										langId: "en",
										isLogin: true,
										currencyId: 2,
										accountName: "qatest01",
										phoneNo: 657324366
									},
									setUserInfo: jest.fn()
								}}>
								<Casino tpId="" />
							</ct.userInfoContext.Provider>
						</ct.popBoxContext.Provider>
					</Wrapper>
				</reach.LocationProvider>
			);
		});
	});

	it(`No tpId in url`, () => {
		const searchBox = tree.getByTestId("searchBox");
		fireEvent.change(searchBox, { target: { value: "bas" } });
		fireEvent.blur(searchBox);
		expect(tree).toMatchSnapshot();
	});
});

describe("Visitor casino tests", () => {
	let tree;
	const history = reach.createHistory(window);
	const setPopBox = jest.fn();
	const wrapperFakeData = {
		path: {
			member: {
				root: "member"
			},
			promotionInfo: {
				root: "promotionInfo"
			},
			deposit: {
				root: "deposit"
			},
			login: {
				root: "login"
			}
		},
		i18n: {},
		config: {}
	};
	beforeEach(async () => {
		preset();

		await waitFor(async () => {
			tree = render(
				<reach.LocationProvider history={history}>
					<Wrapper {...wrapperFakeData}>
						<ct.popBoxContext.Provider
							value={{
								setPopBox
							}}>
							<ct.userInfoContext.Provider
								value={{
									userInfo: {
										langId: "en",
										isLogin: false,
										currencyId: 2,
										accountName: "qatest01",
										phoneNo: 657324366
									},
									setUserInfo: jest.fn()
								}}>
								<Casino tpId={6} />
							</ct.userInfoContext.Provider>
						</ct.popBoxContext.Provider>
					</Wrapper>
				</reach.LocationProvider>
			);
		});
	});
	it(`Visitor click play`, async () => {
		let b = {};
		mock.mockImplementation(() => {
			b = jest.fn();
			return b;
		});

		const gameImg = tree.getAllByTestId("gameImg")[0];
		fireEvent.click(gameImg);

		const clickFreePlay = tree.getByTestId("clickPlay");
		waitFor(() => {
			fireEvent.click(clickFreePlay);
			expect(b).toBeCalled();
		});
	});

	it(`Visitor set favorite games`, async () => {
		const gameImg = tree.getAllByTestId("gameImg")[0];
		const favBtn = tree.getAllByTestId("favBtn")[0];
		const nav_fav = tree.getByTestId("nav_FAVOURITE");
		waitFor(() => {
			fireEvent.click(favBtn);
			fireEvent.click(nav_fav);
		});
		const favGame1 = tree.getAllByTestId("gameImg")[0];
		expect(favGame1.alt).toEqual(gameImg.alt);
	});

	it(`Visitor remove favorite games`, async () => {
		const [favBtn1, favBtn2] = tree.getAllByTestId("favBtn");
		const nav_fav = tree.getByTestId("nav_FAVOURITE");
		await waitFor(() => {
			fireEvent.click(favBtn1);
		});
		await waitFor(() => {
			fireEvent.click(favBtn2);
			fireEvent.click(nav_fav);
		});
		const removeFavBtn = tree.getAllByTestId("favBtn")[0];

		waitFor(() => {
			fireEvent.click(removeFavBtn);
		});
		expect(tree.getAllByTestId("gameImg").length).toEqual(1);
	});
});
