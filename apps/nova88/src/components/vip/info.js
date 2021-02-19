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
			membership.
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
			Nova88启动了VIP奖励计划，使会员可以更快，更轻松地享受更好的奖励。升级到更高级别后，发现更大的特权和权利！
			<div className="vipTitle">概观</div>
			我们将会员等级分为复古俱乐部，银俱乐部，金俱乐部，钛俱乐部，钻石俱乐部和新星俱乐部。当您获得更高的会员资格时，请享受我们所有的privillege产品和服务。
			<div className="vipTitle">享受会员级别不同的优惠和特权</div>
		</div>
	);
};

const THInfo = () => {
	return (
		<div className="vipInfo">
			<div className="vipTitle">โปรแกรมวีไอพี</div>
			Nova88 ได้เปิดตัวโปรแกรม VIP Rewards
			เพื่อให้สมาชิกสามารถดื่มด่ำกับรางวัลที่ดีขึ้นเร็วขึ้นและง่ายขึ้น
			ค้นพบสิทธิประโยชน์และสิทธิพิเศษที่มากขึ้นเมื่อคุณอัปเกรดเป็นระดับที่สูงขึ้น!
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
			Nova88 mempersembahkan program hadiah VIP sehingga member dapat
			menikmati hadiah yang lebih banyak, lebih cepat dan lebih mudah.
			Dapatkan keuntungan yang lebih besar saat Anda meningkatkan ke level
			yang lebih tinggi! <div className="vipTitle">Keterangan</div>
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
