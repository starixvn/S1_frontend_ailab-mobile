import React from "react";
import PropTypes from "prop-types";

const FeaturePanel = ({ langId }) => {
	if (langId === "cs") return <CS />;
	if (langId === "my") return <MY />;
	if (langId === "th") return <TH />;
	if (langId === "th_en") return <TH_EN />;
	if (langId === "id") return <ID />;
	if (langId === "id_en") return <ID_EN />;
	if (langId === "hi") return <HI />;
	if (langId === "hi_en") return <HI_EN />;
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
				<li>SPORTSBOOK WELCOME BONUS</li>
				<li>LIVE CASINO WELCOME BONUS</li>
				<li>SLOT GAME WELCOME BONUS</li>
				<li>DAILY CASH REBATE UP TO 2.1%</li>
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

const TH_EN = () => {
	return (
		<div className="features">
			<div className="title">
				<span className="icon icon-star-full" />
				FEATURES
			</div>
			<div className="title">MEMBER BENEFITS</div>
			<ul>
				<li>SPORTSBOOK WELCOME BONUS</li>
				<li>LIVE CASINO WELCOME BONUS</li>
				<li>SLOT GAME WELCOME BONUS</li>
				<li>DAILY CASH REBATE UP TO 2.1%</li>
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
				<li>体育博彩迎新首存红利</li>
				<li>真人娱乐迎新首存红利</li>
				<li>老虎机迎新首存红利</li>
				<li>每日现金返水 高达 2.1%</li>
			</ul>
			<div className="title">豪享NOVA88尊贵优惠红利与返水</div>
			<ul>
				<li>多样化产品平台配上超划赔率以及完整游戏体验。</li>
				<li>多项支付方式且火速存/提款交易。</li>
			</ul>
		</div>
	);
};

const MY = () => {
	return (
		<div className="features">
			<div className="title">
				<span className="icon icon-star-full" />
				CIRI-CIRI
			</div>
			<div className="title">KELEBIHAN MENJADI AHLI</div>
			<ul>
				<li>PEK PERMULAAN NOVA88</li>
				<li>BONUS KASINO LIVE</li>
				<li>SLOT BONUS SELAMAT DATANG</li>
				<li>BONUS DEPOSIT SEMULA HARIAN MENCECAH 2.1%</li>
			</ul>
			<div className="title">
				NIKMATI BONUS & REBAT EKSKLUSIF AHLI VIP NOVA88
			</div>
			<ul>
				<li>
					Produk platform yang berbilang dengan peluang kemenangan
					yang lebih baik dan pengalaman permainan menyeluruh.
				</li>
				<li>
					Proses deposit dan pengeluaran yang pantas dengan pelbagai
					pilihan deposit.
				</li>
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
				<li>โบนัสต้อนรับสมาชิกใหม่ สปอร์ตบุ๊ค</li>
				<li>โบนัสต้อนรับสมาชิกใหม่ คาสิโนสด</li>
				<li>โบนัสต้อนรับสมาชิกใหม่ เกมสล็อต</li>
				<li>เงินคืนยอดเล่นรายวัน สูงสุด 2.1%</li>
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

const ID_EN = () => {
	return (
		<div className="features">
			<div className="title">
				<span className="icon icon-star-full" />
				FEATURES
			</div>
			<div className="title">MEMBER BENEFITS</div>
			<ul>
				<li>SPORTSBOOK WELCOME BONUS</li>
				<li>LIVE CASINO WELCOME BONUS</li>
				<li>SLOT GAME WELCOME BONUS</li>
				<li>DAILY CASH REBATE UP TO 2.1%</li>
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

const ID = () => {
	return (
		<div className="features">
			<div className="title">
				<span className="icon icon-star-full" />
				FITUR
			</div>
			<div className="title">MANFAAT MEMBER</div>
			<ul>
				<li>BONUS SPORTSBOOK</li>
				<li>BONUS LIVE CASINO</li>
				<li>BONUS SLOT MESIN</li>
				<li>REBATE HARIAN HINGGA 2.1%</li>
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

const HI_EN = () => {
	return (
		<div className="features">
			<div className="title">
				<span className="icon icon-star-full" />
				FEATURES
			</div>
			<div className="title">MEMBER BENEFITS</div>
			<ul>
				<li>SPORTSBOOK WELCOME BONUS</li>
				<li>LIVE CASINO WELCOME BONUS</li>
				<li>SLOT GAME WELCOME BONUS</li>
				<li>DAILY CASH REBATE UP TO 2.1%</li>
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

const HI = () => {
	return (
		<div className="features">
			<div className="title">
				<span className="icon icon-star-full" />
				FEATURES
			</div>
			<div className="title">MEMBER BENEFITS</div>
			<ul>
				<li>स्पोर्ट्सबुक वेलकम बोनस</li>
				<li>लाइव कैसीनो वेलकम बोनस</li>
				<li>स्लॉट्स गेम वेलकम बोनस</li>
				<li>2.1% तक की दैनिक नकद छूट</li>
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
