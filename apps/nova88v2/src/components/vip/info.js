import React from "react";

export const Info = ({ langId }) => {
	let _info;
	switch (langId) {
		case "cs":
			_info = <CSInfo />;
			break;
		case "th":
			_info = <THInfo />;
			break;
		case "id":
			_info = <IDInfo />;
			break;
		default:
			_info = <ENInfo />;
			break;
	}

	return _info;
};

const ENInfo = () => {
	return (
		<div className="vipInfo">
			<div className="vipTitle">VIP Programme</div>
			Nova88 has launched its VIP rewards program so that members could
			indulge in good services, more rewards, and a better experience.
			Discover greater perks and entitlements when your tier upgraded.
			We're waiting for you!
			<div className="vipTitle">Overview</div>
			We have classified the membership tiers to Vintage Club, Silver
			Club, Gold Club, Titanium Club, Diamond Club and Nova Club. Enjoy
			all our privillege products and services when you achieve higher
			tier.
			<div className="vipTitle">
				Enjoy the benefits and privileges with difference membership
				tier.
			</div>
		</div>
	);
};

const CSInfo = () => {
	return (
		<div className="vipInfo">
			<div className="vipTitle">VIP计划</div>
			欧亚体育贵族体系已正式推出！会员现可尊享更优质服务，更多福利回馈及更完善游戏体验。解锁贵族等级一探更多福利等您领取
			<div className="vipTitle">概观</div>
			贵族等级分为古铜俱乐部，白银俱乐部，黄金俱乐部，钛金俱乐部，钻石俱乐部和欧亚俱乐部。解锁贵族等级以享有更多尊贵福利与独享服务。
			<div className="vipTitle">不同等级享有各种豪爽福利</div>
		</div>
	);
};

const THInfo = () => {
	return (
		<div className="vipInfo">
			<div className="vipTitle">โปรแกรมวีไอพี</div>
			Nova88 ได้เปิดตัวโปรแกรม VIP Rewards
			เพื่อให้สมาชิกสามารถเพลิดเพลินกับบริการที่ดีกว่าเดิมทั้งรางวัลที่มากยิ่งขี้นและประสบการณ์ที่ดียิ่งกว่า
			พบกับสิทธิประโยชน์สุดพิเศษที่มากยิ่งขึ้นเมื่อท่านอัปเกรดเป็นสมาชิกระดับที่สูงขึ้น
			เรารอคุณอยู่!
			<div className="vipTitle">ภาพรวม</div>
			เราได้จัดระดับสมาชิกเป็น Vintage Club, Silver Club, Gold Club,
			Titanium Club, Diamond Club และ Nova Club
			เพลิดเพลินกับผลิตภัณฑ์และบริการที่เป็นส่วนตัวของเราเมื่อคุณมีสมาชิกสูงขึ้น
			<div className="vipTitle">
				เพลิดเพลินไปกับสิทธิประโยชน์และสิทธิพิเศษในระดับสมาชิกที่แตกต่างกัน
			</div>
		</div>
	);
};

const IDInfo = () => {
	return (
		<div className="vipInfo">
			<div className="vipTitle">Program VIP</div>
			Nova88 telah meluncurkan program hadiah VIP sehingga member dapat
			menikmati layanan dan pengalaman yang lebih baik dan lebih banyak
			hadiah. Temukan keuntungan dan hak yang lebih besar saat level Anda
			ditingkatkan. Nova88 menghargai loyalitas Anda!
			<div className="vipTitle">Keterangan</div>
			Kami telah mengklasifikasikan tingkatan keanggotaan ke Klub Vintage,
			Klub Silver, Klub Gold, Klub Titanium, Klub Diamond dan Klub Nova.
			Nikmati semua produk dan layanan khusus kami saat Anda mencapai
			tingkat yang lebih tinggi.
			<div className="vipTitle">
				Nikmati keuntungan dan keistimewaan dalam tingkatan member
			</div>
		</div>
	);
};
