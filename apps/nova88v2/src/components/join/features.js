import React from "react";
import PropTypes from "prop-types";

const FeaturePanel = ({ langId }) => {
	if (langId === "cs") return <CS />;
	if (langId === "th") return <TH />;
	if (langId === "id") return <ID />;
	if (langId === "hi") return <HI />;
	return <EN />;
};

FeaturePanel.propTypes = {
	langId: PropTypes.string.isRequired
};

export default FeaturePanel;

const EN = () => {
	return (
		<div className="features">
			<div className="title">
				<span className="icon icon-star-full" />
				FEATURES
			</div>
			<div className="title">MEMBER BENEFITS</div>
			<ul>
				<li>
					<span>68%</span> LIVE CASINO WELCOME BONUS
				</li>
				<li>
					<span>100%</span> SLOTS WELCOME BONUS
				</li>
				<li>
					DAILY REDEPOSIT BONUS UP TO <span>20%</span>
				</li>
				<li>
					DAILY CASH REBATE UP TO <span>1.20%</span>
				</li>
			</ul>
			<div className="title">
				ENJOY NOVA88 VIP EXCLUSIVE BONUS & REBATES
			</div>
			<ul>
				<li>
					Multiple product platforms with better odds and full
					gameplay experience.
				</li>
				<li>
					Speedy deposit and withdrawal with multiple deposit option.
				</li>
			</ul>
		</div>
	);
};

const CS = () => {
	return (
		<div className="features">
			<div className="title">
				<span className="icon icon-star-full" />
				特征
			</div>
			<div className="title">会员福利</div>
			<ul>
				<li>
					<span>68%</span> 真人娱乐欢迎红利
				</li>
				<li>
					<span>100%</span> 老虎机欢迎红利
				</li>
				<li>
					每日再存红利高达 <span>20%</span>
				</li>
				<li>
					每日现金返水 高达 <span>1.2%</span>
				</li>
			</ul>
			<div className="title">豪享NOVA88尊贵优惠红利与返水</div>
			<ul>
				<li>多样化产品平台配上超划赔率以及完整游戏体验。</li>
				<li>多项支付方式且火速存/提款交易。</li>
			</ul>
		</div>
	);
};

const TH = () => {
	return (
		<div className="features">
			<div className="title">
				<span className="icon icon-star-full" />
				คุณสมบัติ
			</div>
			<div className="title">สิทธิประโยชน์ของสมาชิก</div>
			<ul>
				<li>
					โบนัสต้อนรับคาสิโนสด <span>100%</span>
				</li>
				<li>
					โบนัสต้อนรับสล็อต <span>100%</span>
				</li>
				<li>
					โบนัสเงินฝากทุกวันมากถึง <span>20%</span>
				</li>
				<li>
					โบนัสคืนเงินรายวันสูงถึง <span>1.20%</span>
				</li>
			</ul>
			<div className="title">
				เพลิดเพลินไปกับ NOVA88 โบนัสและเงินคืนพิเศษ
			</div>
			<ul>
				<li>
					แพลตฟอร์มเกมที่หลากหลายพร้อมโอกาสที่ดีกว่าและประสบการณ์การเล่นเกมเต็มรูปแบบ
				</li>
				<li>ฝากและถอนอย่างรวดเร็วด้วยตัวเลือกการฝากที่หลากหลาย</li>
			</ul>
		</div>
	);
};

const ID = () => {
	return (
		<div className="features">
			<div className="title">
				<span className="icon icon-star-full" />
				FITUR
			</div>
			<div className="title">MANFAAT MEMBER</div>
			<ul>
				<li>
					WELCOME BONUS <span>150%</span> LIVE CASINO
				</li>
				<li>
					WELCOME BONUS <span>100%</span> SLOT MESIN
				</li>
				<li>
					BONUS REDEPOSIT HARIAN HINGGA <span>20%</span>
				</li>
				<li>
					REBATE CASH HARIAN HINGGA <span>1.2%</span>
				</li>
			</ul>
			<div className="title">
				NIKMATI BONUS & REBATE EKSKLUSIF NOVA88 VIP
			</div>
			<ul>
				<li>
					Berbagai produk dengan odds terbaik dan sensasi permainan
					yang lengkap.
				</li>
				<li>Deposit dan penarikan cepat dengan berbagai pilihan.</li>
			</ul>
		</div>
	);
};

const HI = () => {
	return (
		<div className="features">
			<div className="title">
				<span className="icon icon-star-full" />
				FEATURES
			</div>
			<div className="title">MEMBER BENEFITS</div>
			<ul>
				<li>
					<span>55%</span> NOVA88 स्टार्टर पैक
				</li>
				<li>
					<span>68%</span> लाइव कैसीनो स्वागत बोनस
				</li>
				<li>
					<span>100%</span> स्लॉट्स स्वागत बोनस
				</li>
				<li>
					दैनिक पुनर्वितरण बोनस <span>20%</span> तक
				</li>
			</ul>
			<div className="title">
				NOVA88 वीआईपी विशेष बोनस और छूट का आनंद लें
			</div>
			<ul>
				<li>
					बेहतर ऑड्स और पूर्ण गेमप्ले अनुभव के साथ कई उत्पाद
					प्लेटफॉर्म।
				</li>
				<li>कई जमा विकल्पों के साथ शीघ्र जमा और निकासी।</li>
			</ul>
		</div>
	);
};
