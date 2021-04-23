import React from "react";
import PropTypes from "prop-types";

const FeaturePanel = ({ langId }) => {
	if (langId === "cs") return <CS />;
	if (langId === "th") return <TH />;
	if (langId === "id") return <ID />;
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
			<div className="title">MEMBERS BENEFITS</div>
			<ul>
				<li>
					<span>126%</span> SPORTSBOOK WELCOME BONUS
				</li>
				<li>
					<span>100%</span> LIVE CASINO WELCOME BONUS
				</li>
				<li>
					<span>100%</span> SLOTS WELCOME BONUSACCOUNT NAME
				</li>
				<li>
					DAILY REDEPOSIT BONUS UP TO <span>20%</span>
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
					<span>126%</span> 体育欢迎红利
				</li>
				<li>
					<span>100%</span> 真人娱乐欢迎红利
				</li>
				<li>
					<span>100%</span> 老虎机欢迎红利
				</li>
				<li>
					每周续存红利高达 <span>20%</span>
				</li>
			</ul>
			<div className="title">豪享欧亚体育尊贵优惠红利与返水</div>
			<ul>
				<li>多样化产品平台配上超划算赔率以及完整游戏体验。</li>
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
					<span>126%</span> สปอร์ตบุ๊ค โบนัสต้อนรับ
				</li>
				<li>
					โบนัสต้อนรับคาสิโนสด <span>100%</span>
				</li>
				<li>
					โบนัสต้อนรับสล็อต <span>100%</span>
				</li>
				<li>
					โบนัสเงินฝากทุกวันมากถึง <span>20%</span>
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
					WELCOME BONUS <span>126%</span> SPORTSBOOK
				</li>
				<li>
					WELCOME BONUS <span>100%</span> LIVE CASINO
				</li>
				<li>
					WELCOME BONUS <span>100%</span> SLOT MESIN
				</li>
				<li>
					BONUS REDEPOSIT HARIAN HINGGA <span>20%</span>
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
