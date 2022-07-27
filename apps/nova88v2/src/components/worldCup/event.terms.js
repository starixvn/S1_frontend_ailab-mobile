import React, { useContext } from "react";
import PropTypes from "prop-types";
import { i18nContext, worldCupPopBox } from "../common/context";
import { PromoPopBox } from "./promoPopbox";
import api from "../../service/api";

const BonusCode = "N88FIFAWC2022";

const Terms = ({ langId }) => {
	const { i18n } = useContext(i18nContext);
	const { setWorldCupBox } = useContext(worldCupPopBox);

	const terms = {
		en: <TermsEN />,
		cs: <TermsCS />,
		my: <TermsMY />,
		th: <TermsTH />,
		th_en: <TermsEN />,
		id: <TermsID />,
		id_en: <TermsEN />,
		hi: <TermsHI />,
		hi_en: <TermsEN />,
		bd: <TermsEN />
	}[langId];

	const getPromoDetail = async () => {
		const res = await api.promotion.GetPromotionDetail({
			langId,
			BonusCode
		});
		const { errorCode, data, message } = res.data;

		if (errorCode === 0) {
			setWorldCupBox({
				isOpen: true,
				content: <PromoPopBox data={data} />
			});
		} else {
			setPopBox({
				isOpen: true,
				content: `[${errorCode}] ${message}`
			});
		}
	};

	return (
		<>
			<div className="title">{i18n.lbl_TermsAndConditions}</div>
			<div className="info">
				<div className="subtitle">{i18n.lbl_Date}</div>
				<div className="content">
					<span>{i18n.lbl_FIFAWorldCup}</span> <br />
					{i18n.msg_WorldCupStartsFrom}{" "}
					<span>{i18n.msg_WorldCupStartsTime}</span>{" "}
					{i18n.msg_WorldCupTo}{" "}
					<span>{i18n.msg_WorldCupEndTime}</span>
				</div>
				<div className="subtitle">{i18n.lbl_significantConditions}</div>
				<div className="content">{terms}</div>
				<button onClick={getPromoDetail} className="btn-event">
					{i18n.lbl_MoreDetails}
				</button>
			</div>
		</>
	);
};

Terms.defaultProps = {
	langId: null
};

Terms.propTypes = {
	langId: PropTypes.string
};

export default Terms;

const TermsEN = () => (
	<ol>
		<li>
			This <span>World Cup Prediction Campaign</span> will accumulate
			member&apos;s deposit to redeem up to max three (<span>3</span>)
			prediction tickets for <span>FIFA WORLD CUP Qatar 2022</span>{" "}
			automatically given by Nova88.
		</li>
		<li>
			Event will start by the following date above according to each
			country Local Time.
			<br /> Such as:{" "}
			<span>Malaysia, Thailand, Indonesia &amp; India</span> only.
		</li>
		<li>
			Deposit accumulate will be calculate from <span>01 August</span> to{" "}
			<span>31 October 2022</span> only. Please use the availability
			tickets to Predict Your Favorite Country Football Team by{" "}
			<span>01 November</span> until <span>20 November 2022</span>. (All
			availability tickets will be revoked by{" "}
			<span>21 November 2022</span> Local Time <span>00:00:00</span> )
		</li>
		<li>
			Nova88 reserves the right to amend or withdraw the Promotion at any
			time.
		</li>
		<li>
			Nova88 is the sole arbiter of the Promotion and its decision is
			final.
		</li>
		<li>Nova88 Standard Terms &amp; Conditions apply.</li>
	</ol>
);

const TermsCS = () => (
	<ol>
		<li>
			此<span>世界杯预测活动</span>将累计会员存款金额并兑换
			<span>最多 3张</span> 由 Nova88 自动派发
			<span>卡塔尔2022国际足协世界杯预测的兑换票</span>
		</li>
		<li>
			活动开跑将依据以上各国当地时区。
			<br /> 比如: <span>马来西亚，泰国，印度尼西亚 和 印度</span> 。
		</li>
		<li>
			存款积累仅计算从 <span>8月 1日 2022年</span> 至{" "}
			<span>10月 31日 2022年</span> 期间的存款金额。恳请于{" "}
			<span>11月 1日 2022年</span> 至 <span>11月 20日 2022年</span>
			期间使用有效票预测您喜爱的国家足球队伍 (所有有效票将于{" "}
			<span>11月 21日 2022年</span> ，当地时区： <span>00:00:00</span>{" "}
			逾时失效)
		</li>
		<li>Nova88 有权随时中止或取消本优惠。</li>
		<li>Nova88 保留对本优惠的最终解释权。</li>
		<li>Nova88 标准规则和条款适用。</li>
	</ol>
);

const TermsMY = () => (
	<ol>
		<li>
			Kempen Ramalan <span>Piala Dunia</span> ini akan mengumpul deposit
			ahli untuk menebus sehingga <span>Maksimum Tiga(3)</span> Tiket
			Ramalan <span>FIFA WORLD CUP QATAR 2022</span> yang diberikan secara
			automatik oleh Nova88.
		</li>
		<li>
			Acara akan bermula pada tarikh di atas mengikut waktu tempatan
			setiap negara sahaja.
			<br /> Seperti:{" "}
			<span>Malaysia, Thailand, Indonesia &amp; India</span>.
		</li>
		<li>
			Deposit terkumpul akan dikira dari{" "}
			<span>1 Ogos hingga 31 Oktober 2022</span> sahaja. Sila gunakan
			tiket yang tersedia untuk{" "}
			<span>Ramalkan Pasukan Bola Sepak Negara Kegemaran Anda</span>{" "}
			sebelum <span>1 November hingga 20 November 2022</span>. (Semua
			tiket yang tersedia akan dibatalkan pada{" "}
			<span>21 November 2022 Waktu Tempatan: </span>00:00:00).
		</li>
		<li>
			Nova88 berhak untuk meminda atau menarik balik Promosi pada
			bila-bila masa.
		</li>
		<li>
			Nova88 ialah penimbang tara tunggal Promosi dan keputusannya adalah
			muktamad.
		</li>
		<li>Terma & Syarat Standard Nova88 dikenakan.</li>
	</ol>
);

const TermsTH = () => (
	<ol>
		<li>
			แคมเปญทายผลฟุตบอลโลกนี้จะสะสมยอดเงินฝากของสมาชิกเพื่อแลกรับตั๋วทายผล
			ฟุตบอลโลก กาตาร์ 2022 สามารถแลกรับได้สูงสุด <span>3</span>{" "}
			ใบโดยอัตโนมัติจาก Nova88
		</li>
		<li>
			กิจกรรมนี้จะเริ่มในวันดังกล่าวตามโซนเวลาท้องถิ่นของแต่ล่ะประเทศ
			ตัวอย่างเช่น มาเลเซีย ไทย อินโดนีเซีย และอินเดีย
		</li>
		<li>
			การสะสมเงินฝากจะคำนวณเฉพาะช่วงเวลาตั้งแต่วันที่{" "}
			<span>1 สิงหาคม 2022 ถึง 31 ตุลาคม 2022</span>{" "}
			กรุณาใช้ตั๋วที่ถูกต้องเพื่อทายผลฟุตบอลทีมชาติที่คุณชื่นชอบระหว่าง{" "}
			<span>1 พฤศจิกายน 2022 ถึง 20 พฤศจิกายน 2022 </span>{" "}
			(ตั๋วที่ถูกต้องทั้งหมดจะหมดอายุในวันที่{" "}
			<span>21 พฤศจิกายน 2022</span>เขตเวลาท้องถิ่น: 00:00:00 น. )
		</li>
		<li>
			Nova88
			มีสิทธิ์ในการยกเลิกหรือเปลี่ยนแปลงเงื่อนไขของโปรโมชั่นนี้ได้ตลอดเวลา
			โดยที่ไม่ต้องมีการแจ้งให้ทราบล่วงหน้า
		</li>
		<li>
			Nova88
			ขอสงวนสิทธิ์ในการพิจารณาการเข้าร่วมโปรโมชั่นของสมาชิกแต่เพียงผู้เดียว
		</li>
		<li>ข้อกำหนดและเงื่อนไขมาตรฐานของ Nova88 มีผลบังคับใช้</li>
	</ol>
);

const TermsID = () => (
	<ol>
		<li>
			<span>Prediksi Piala Dunia</span> ini akan mengakumulasikan deposit
			member untuk ditukarkan dengan{" "}
			<span>
				Maksimal Tiga (3) Tiket Prediksi Piala Dunia FIFA QATAR 2022
			</span>{" "}
			yang akan diberikan secara otomatis oleh Nova88.
		</li>
		<li>
			Acara akan dimulai pada tanggal di atas sesuai dengan waktu setempat
			masing-masing negara.
			<br /> Seperti:{" "}
			<span>Malaysia, Thailand, Indonesia &amp; India</span>.
		</li>
		<li>
			Akumulasi Deposit akan dihitung dari{" "}
			<span>1 Agustus hingga 31 Oktober 2022</span>. Silakan gunakan tiket
			yang tersedia untuk Memprediksi
			<span>Tim Negara Favorit Anda </span> paling lambat{" "}
			<span> 1 November hingga 20 November 2022</span>. (Semua tiket yang
			tersedia akan hangus pada{" "}
			<span>21 November 2022 Waktu Setempat</span> 00:00:00)
		</li>
		<li>
			Nova88 berhak untuk mengubah atau menarik Promosi ini kapan saja.
		</li>
		<li>
			Nova88 adalah penyelenggara tunggal Promosi ini dan keputusannya
			adalah final.
		</li>
		<li>Syarat dan Ketentuan Umum Nova88 berlaku.</li>
	</ol>
);

const TermsHI = () => (
	<ol>
		<li>
			यह विश्व कप भविष्यवाणी अभियान फीफा वर्ल्ड कप कतर 2022 के लिए नोवा88
			द्वारा स्वचालित रूप से दिए गए अधिकतम तीन (<span>3</span>) भविष्यवाणी
			टिकटों को भुनाने के लिए सदस्य की जमा राशि जमा करेगा।
		</li>
		<li>
			घटना प्रत्येक देश के स्थानीय समय के अनुसार उपरोक्त तिथि से शुरू
			होगी।
			<br /> जैसे: <span>मलेशिया, थाईलैंड, इंडोनेशिया और भारत ही।</span>
		</li>
		<li>
			जमा जमा <span>01 अगस्त</span> से <span>31 अक्टूबर 2022 </span>तक ही
			गणना की जाएगी. कृपया <span>01 नवंबर</span> से{" "}
			<span>20 नवंबर 2022</span>तक अपनी पसंदीदा देश फुटबॉल टीम की
			भविष्यवाणी करने के लिए उपलब्धता टिकटों का उपयोग करें। (सभी उपलब्धता
			टिकट <span>21 नवंबर 2022</span> तक स्थानीय समय 00:00:00 द्वारा रद्द
			कर दिए जाएंगे)
		</li>
		<li>
			नोवा88 किसी भी समय प्रमोशन में संशोधन करने या वापस लेने का अधिकार
			सुरक्षित रखता है।
		</li>
		<li>नोवा88 प्रचार का एकमात्र मध्यस्थ है और इसका निर्णय अंतिम है।</li>
		<li>शर्तें88 नोवा मानक</li>
	</ol>
);
