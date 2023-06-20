import React from "react";

export const Info = ({ langId }) => {
	let _info;
	switch (langId) {
		case "cs":
			_info = <CSInfo />;
			break;
		case "my":
			_info = <MYInfo />;
			break;
		case "th":
			_info = <THInfo />;
			break;
		case "id":
			_info = <IDInfo />;
			break;
		case "hi":
			_info = <HIInfo />;
			break;
		case "bd":
			_info = <BDInfo />;
			break;
		default:
			_info = <ENInfo />;
			break;
	}

	return _info;
};

const ENInfo = () => {
	return (
		<>
			<div className="vipTitle">VIP Programme</div>
			Nova88 has launched its VIP rewards program so that members could
			indulge in good services, more rewards, and a better experience.
			Discover greater perks and entitlements when your tier upgraded.
			We&apos;re waiting for you!
			<div className="vipTitle">Overview</div>
			We have classified the membership tiers to Vintage Club, Silver
			Club, Gold Club, Titanium Club, Diamond Club and Nova Club. Enjoy
			all our privilege products and services when you achieve higher
			tier.
			<div className="vipTitle">
				Enjoy the benefits and privileges with difference membership
				tier.
			</div>
		</>
	);
};

const CSInfo = () => {
	return (
		<>
			<div className="vipTitle">VIP计划</div>
			欧亚体育贵族体系已正式推出！会员现可尊享更优质服务，更多福利回馈及更完善游戏体验。解锁贵族等级一探更多福利等您领取
			<div className="vipTitle">概观</div>
			贵族等级分为古铜俱乐部，白银俱乐部，黄金俱乐部，钛金俱乐部，钻石俱乐部和欧亚俱乐部。解锁贵族等级以享有更多尊贵福利与独享服务。
			<div className="vipTitle">不同等级享有各种豪爽福利</div>
		</>
	);
};

const MYInfo = () => {
	return (
		<>
			<div className="vipTitle">Program VIP</div>
			Nova88 telah melancarkan program ganjaran VIP supaya ahli boleh
			menikmati perkhidmatan yang lebih baik, dapat lebih banyak ganjaran
			dan pengalaman yang lagi unggul. Nikmati faedah dan layanan yang
			lebih hebat apabila anda naik taraf. Kami tunggu ketibaan anda!
			<div className="vipTitle">Rumusan</div>
			Kami telah mengklasifikasikan peringkat keahlian kepada Kelab
			Vintage, Kelab Perak, Kelab Emas, Kelab Titanium, Kelab Berlian dan
			Kelab Nova. Nikmati semua produk dan perkhidmatan keistimewaan kami
			apabila anda mencapai taraf yang lebih tinggi.
			<div className="vipTitle">
				Nikmati kebaikan dan keistimewaan dengan taraf keahlian yang
				berbeza
			</div>
		</>
	);
};

const THInfo = () => {
	return (
		<>
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
		</>
	);
};

const IDInfo = () => {
	return (
		<>
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
		</>
	);
};

const HIInfo = () => {
	return (
		<>
			<div className="vipTitle">वीआईपी कार्यक्रम</div>
			Nova88 ने अपना वीआईपी पुरस्कार कार्यक्रम शुरू किया है ताकि सदस्य
			अच्छी सेवाओं, अधिक पुरस्कारों और बेहतर अनुभव प्राप्त कर सकें। जब
			आपका टियर अपग्रेड हो जाए तो अधिक से अधिक अनुलाभों और पात्रताओं की
			खोज करें। हम आपका इंतज़ार कर रहे हैं!
			<div className="vipTitle">अवलोकन</div>
			हमने सदस्यता स्तरों को विंटेज क्लब, सिल्वर क्लब, गोल्ड क्लब,
			टाइटेनियम क्लब, डायमंड क्लब और नोवा क्लब में वर्गीकृत किया है। जब आप
			उच्च स्तर प्राप्त करते हैं तो हमारे सभी विशेषाधिकार उत्पादों और
			सेवाओं का आनंद लें।
			<div className="vipTitle">
				भिन्न सदस्यता स्तर के साथ लाभों और विशेषाधिकारों का आनंद लें
			</div>
		</>
	);
};

const BDInfo = () => {
	return (
		<>
			<div className="vipTitle">ভিআইপি কার্যক্রম</div>
			Nova88 ভিআইপি পুরষ্কার কার্যক্রম চালু করেছে যেন সদস্যরা ভালো
			পরিষেবা, বেশি পুরষ্কার এবং আরও ভালো অভিজ্ঞতা লাভ করতে পারেন। আপনার
			স্তর আপগ্রেড হলে আরও বেশি সুবিধা এবং সুজোগ খুঁজে পাবেন। আমরা আপনার
			জন্য অপেক্ষা করছি!
			<div className="vipTitle">পরিদর্শন</div>
			আমরা ভিনটেজ ক্লাব, সিলভার ক্লাব, গোল্ড ক্লাব, টাইটানিয়াম ক্লাব,
			ডায়মন্ড ক্লাব এবং নোভা ক্লাবে সদস্যপদ শ্রেণীবদ্ধ করেছি। আপনি যখন
			উচ্চতর স্তরে পৌঁছান তখন আমাদের সমস্ত বিশেষাধিকার পণ্য এবং পরিষেবা
			উপভোগ করুন।
			<div className="vipTitle">
				ভিন্ন ভিন্ন সদস্যপদের জন্য ভিন্ন ভিন্ন সুযোগ সুবিধা উপভোগ করুন।
			</div>
		</>
	);
};
