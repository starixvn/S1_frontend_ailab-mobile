import React, { useContext } from "react";
import PropTypes from "prop-types";
import i18nContext from "../common/context";

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
	const { i18n } = useContext(i18nContext);
	return (
		<div className="features">
			<div className="title">
				<span className="icon icon-star-full" />
				{i18n.lbl_Features}
			</div>
			<div className="title">{i18n.lbl_MemberBenefits}</div>
			<ul>
				<li>
					<span>55%</span>
					{i18n.lbl_StarterPack}
				</li>
				<li>
					<span>68%</span>
					{i18n.lbl_WelcomeBonus}
				</li>
				<li>
					<span>100%</span>
					{i18n.lbl_WelcomeBonusSlots}
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
					<span>55%</span> NOVA88 新会员套餐
				</li>
				<li>
					<span>68%</span> 真人娱乐欢迎红利
				</li>
				<li>
					<span>100%</span> 老虎机欢迎红利
				</li>
				<li>
					每周再存红利高达 <span>20%</span>
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
					<span>55%</span> NOVA88 STARTER PACK
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
