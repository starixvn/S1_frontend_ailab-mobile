import React from "react";
import PropTypes from "prop-types";

const ImportantNote = ({ langId, i18n }) => {
	let content = null;
	if (
		langId === "en" ||
		langId === "th_en" ||
		langId === "id_en" ||
		langId === "hi_en"
	)
		content = <EN />;
	if (langId === "cs") content = <CS />;
	if (langId === "th") content = <TH />;
	if (langId === "id") content = <ID />;
	if (langId === "hi") content = <HI />;

	if (langId) {
		return (
			<div className="important">
				<div className="title">
					<span className="icon icon-information" />
					{i18n.lbl_ImportantNotice?.toUpperCase()}
				</div>
				{content}
			</div>
		);
	}

	return null;
};

const EN = () => (
	<ul>
		<li>
			Kindly please check for the latest active deposit bank details
			before you making a deposit.
		</li>
		<li>
			For using <span>&quot;Local Bank Transfer&quot;</span> deposit
			option, please make the transfer done before submit the transaction
			to avoid the transaction delay.
		</li>
		<li>
			Depositor&apos;s <span>ACCOUNT NAME</span> must match with your
			registered full name. We do not encourage transaction made using 3rd
			party/company account.
		</li>
		<li>
			Please <span>DO NOT</span> fill in <span>&quot;NOVA88&quot;</span>{" "}
			or any sensitive words related to gambling as reference/remark in
			your online transaction.
		</li>
		<li>
			Please take noted that will be 1x rollover required for all deposit
			made before any withdrawal can be processed.
		</li>
		<li>
			Kindly please contact our{" "}
			<a
				rel="noreferrer"
				target="_blank"
				href="https://direct.lc.chat/11638088/">
				24/7 LIVECHAT
			</a>{" "}
			if your transaction is still pending for more than 5 minutes.
		</li>
	</ul>
);

const CS = () => (
	<ul>
		<li>务必检查当前最新活跃的存款帐户，再进行存款。</li>
		<li>
			使用 <span>&quot;银行转账&quot;</span>{" "}
			选项的用户，请先完成转帐充值再提交存款申请，以避免存款延迟。
		</li>
		<li>
			存款<span>帐户全名</span>
			必须与注册名字匹配，本司不接受第三方/公司账号存款。
		</li>
		<li>
			转账时<span>请勿</span>填写 <span>&quot;NOVA88&quot;</span>{" "}
			或任何与博彩有关联的敏感信息。
		</li>
		<li>
			所有存款金额统一必须完成<span>1倍流水</span>需求方可进行提款。
		</li>
		<li>
			如您的存款申请时长超过5分钟或以上，请联系
			<a
				rel="noreferrer"
				target="_blank"
				href="https://direct.lc.chat/11638088/">
				24/7在線客服
			</a>{" "}
			以寻求帮助。
		</li>
	</ul>
);

const TH = () => (
	<ul>
		<li>โปรดตรวจสอบรายละเอียดธนาคารเงินฝากล่าสุดก่อนทำการฝากเงิน</li>
		<li>
			สำหรับการใช้ตัวเลือกการฝากแบบ{" "}
			<span>&quot;โอนเงินผ่านธนาคารในประเทศ&quot;</span>{" "}
			โปรดทำการโอนเงินก่อนส่งธุรกรรมเพื่อหลีกเลี่ยงความล่าช้าในการทำธุรกรรม
		</li>
		<li>
			ชื่อบัญชีของผู้ฝากต้องตรงกับ <span>ชื่อ นามสกุล</span>{" "}
			ที่คุณลงทะเบียนไว้
			เราไม่สนับสนุนให้ทำธุรกรรมโดยใช้บัญชีบุคคลที่สาม/บริษัท
		</li>
		<li>
			โปรดอย่ากรอก <span>&quot;NOVA88&quot;</span> หรือคำที่ละเอียดอ่อนใดๆ
			ที่เกี่ยวข้องกับการพนันเพื่อเป็นข้อมูลอ้างอิง/อ้างถึงในการทำธุรกรรมออนไลน์ของคุณ
		</li>
		<li>
			โปรดทราบว่าจะต้องมีการโรลโอเวอร์ 1x สำหรับการฝากเงินทั้งหมด
			ก่อนที่จะสามารถดำเนินการถอนได้
		</li>
		<li>
			กรุณาติดต่อเราที่{" "}
			<a
				rel="noreferrer"
				target="_blank"
				href="https://direct.lc.chat/11638088/">
				แชทสดตลอด 24/7
			</a>{" "}
			หากธุรกรรมของคุณยังคงรอดำเนินการนานกว่า 5 นาที
		</li>
	</ul>
);

const ID = () => (
	<ul>
		<li>
			Mohon periksa detail bank simpanan Anda sebelum Anda melakukan
			penyetoran.
		</li>
		<li>
			Untuk menggunakan opsi penyetoran{" "}
			<span>&quot;Transfer Bank Lokal&quot;</span>, harap lakukan transfer
			sebelum mengajukan transaksi untuk menghindari penundaan transaksi.
		</li>
		<li>
			<span>NAMA REKENING</span> penyetor harus sama dengan nama lengkap
			Anda yang terdaftar. Kami tidak rekomen transaksi yang dilakukan
			menggunakan akun pihak ke-3 / perusahaan.
		</li>
		<li>
			Mohon <span>TIDAK</span> mengisi <span>&quot;NOVA88&quot;</span>{" "}
			atau kata-kata sensitif terkait perjudian sebagai referensi /
			catatan dalam transaksi online Anda.
		</li>
		<li>
			Harap perhatikan bahwa akan diperlukan 1x turnover untuk semua
			deposit yang dilakukan sebelum penarikan dapat diproses.
		</li>
		<li>
			Silakan hubungi{" "}
			<a
				rel="noreferrer"
				target="_blank"
				href="https://direct.lc.chat/11638088/">
				LIVE CHAT 24/7
			</a>{" "}
			kami jika transaksi Anda masih tertunda selama lebih dari 5 menit.
		</li>
	</ul>
);

const HI = () => (
	<ul>
		<li>
			कृपया जमा करने से पहले कृपया नवीनतम सक्रिय जमा बैंक विवरण देखें।
		</li>
		<li>
			<span>&quot;स्थानीय बैंक हस्तांतरण&quot;</span> जमा विकल्प का उपयोग
			करने के लिए, कृपया लेनदेन में देरी से बचने के लिए लेनदेन जमा करने से
			पहले हस्तांतरण करें।
		</li>
		<li>
			जमाकर्ता का खाता नाम आपके पंजीकृत पूरे नाम से मेल खाना चाहिए। हम
			तृतीय पक्ष/कंपनी खाते का उपयोग करके किए गए लेनदेन को प्रोत्साहित
			नहीं करते हैं।
		</li>
		<li>
			कृपया अपने ऑनलाइन लेनदेन में संदर्भ/टिप्पणी के रूप में
			<span>&quot;NOVA88&quot;</span> या जुए से संबंधित कोई भी संवेदनशील
			शब्द न भरें।
		</li>
		<li>
			कृपया ध्यान दें कि किसी भी निकासी को संसाधित करने से पहले किए गए सभी
			जमाओं के लिए 1x रोलओवर आवश्यक होगा।
		</li>
		<li>
			यदि आपका लेनदेन अभी भी 5 मिनट से अधिक समय से लंबित है तो कृपया हमारे{" "}
			<a
				rel="noreferrer"
				target="_blank"
				href="https://direct.lc.chat/11638088/">
				24/7 लाइवचैट
			</a>{" "}
			से संपर्क करें।
		</li>
	</ul>
);

ImportantNote.defaultProps = {
	langId: null
};

ImportantNote.propTypes = {
	langId: PropTypes.string,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

export default ImportantNote;
