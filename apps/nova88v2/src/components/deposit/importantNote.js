import React from "react";
import PropTypes from "prop-types";

const ImportantNote = ({ langId, i18n }) => {
	let content = null;
	if (
		langId === "en" ||
		langId === "th_en" ||
		langId === "id_en" ||
		langId === "hi_en" ||
		langId === "bd_en"
	)
		content = <EN />;
	if (langId === "cs") content = <CS />;
	if (langId === "my") content = <MY />;
	if (langId === "th") content = <TH />;
	if (langId === "id") content = <ID />;
	if (langId === "hi") content = <HI />;
	if (langId === "bd") content = <BD />;
	if (langId === "kh") content = <KH />;

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
			For using <span>&quot;Bank Transfer&quot;</span> deposit option,
			please make the transfer done before submit the transaction to avoid
			the transaction delay.
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
				24/7在线客服
			</a>{" "}
			以寻求帮助。
		</li>
	</ul>
);

const MY = () => (
	<ul>
		<li>
			Sila semak butiran akaun bank deposit aktif yang terkini sebelum
			buat deposit.
		</li>
		<li>
			Untuk guna kaedah deposit <span>&quot;Pemindahan Bank&quot;</span> ,
			sila buat pemindahan dan serahkan rekod transaksi untuk mengelakkan
			kelewatan pada deposit.
		</li>
		<li>
			<span>NAMA AKAUN</span> pendeposit mesti padan dengan nama penuh
			anda yang didaftarkan. Kami tidak menggalakkan transaksi yang dibuat
			menggunakan akaun pihak ke-3/syarikat.
		</li>
		<li>
			<span>JANGAN</span> isi <span>&quot;NOVA88&quot;</span> atau
			sebarang perkataan sensitif yang berkaitan dengan perjudian sebagai
			rujukan/nota dalam transaksi dalam talian anda.
		</li>
		<li>
			Sila ambil perhatian bahawa 1x rollover diperlukan untuk semua
			deposit yang dibuat sebelum sebarang pengeluaran boleh diproses.
		</li>
		<li>
			Sila hubungi{" "}
			<a
				rel="noreferrer"
				target="_blank"
				href="https://direct.lc.chat/11638088/">
				LIVECHAT 24/7
			</a>{" "}
			kami jika transaksi anda masih belum diproses lebih daripada 5
			minit.
		</li>
	</ul>
);

const TH = () => (
	<ul>
		<li>โปรดตรวจสอบรายละเอียดธนาคารเงินฝากล่าสุดก่อนทำการฝากเงิน</li>
		<li>
			สำหรับการใช้ตัวเลือกการฝากแบบ{" "}
			<span>&quot;โอนผ่านแอปธนาคาร&quot;</span>{" "}
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
			<span>&quot;Transfer Bank&quot;</span>, harap lakukan transfer
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

const BD = () => (
	<ul>
		<li>
			অনুগ্রহ করে আপনি একটি আমানত করার আগে সর্বশেষ সক্রিয় আমানত ব্যাংকের
			বিবরণ পরীক্ষা করুন৷
		</li>
		<li>
			<span>&quot;স্থানীয় ব্যাংক&quot;</span> আমানত অপশন ব্যবহার করার
			জন্য, লেনদেনের বিলম্ব এড়াতে লেনদেন জমা দেওয়ার আগে দয়া করে
			স্থানান্তরটি সম্পন্ন করুন৷
		</li>
		<li>
			আমানতকারীর অ্যাকাউন্টের <span>নাম</span> অবশ্যই আপনার নিবন্ধিত পুরো
			নামের সাথে মিলতে হবে। আমরা ৩য় পক্ষ/কোম্পানীর অ্যাকাউন্ট ব্যবহার করে
			করা লেনদেনকে উৎসাহিত করি না।
		</li>
		<li>
			অনুগ্রহ করে আপনার অনলাইন লেনদেনে রেফারেন্স/মন্তব্য হিসাবে
			<span>&quot;NOVA88&quot;</span> বা জুয়া সম্পর্কিত কোনো সংবেদনশীল
			শব্দ পূরণ করবেন না।
		</li>
		<li>
			অনুগ্রহ করে মনে রাখবেন যে কোনও উত্তোলন প্রক্রিয়া করার আগে করা সমস্ত
			আমানত জন্য ১x রোলওভার প্রয়োজন।
		</li>
		<li>
			অনুগ্রহ করে আমাদের{" "}
			<a
				rel="noreferrer"
				target="_blank"
				href="https://direct.lc.chat/11638088/">
				২৪/৭ সরাসরি কথোপকথন করুন
			</a>{" "}
			যদি আপনার লেনদেনটি এখনও ৫ মিনিটের বেশি সময় বাকি থাকে।
		</li>
	</ul>
);

const KH = () => (
	<ul>
		<li>
			សូមពិនិត្យមើលព័ត៌មានលម្អិតអំពីធនាគារដាក់ប្រាក់សកម្មចុងក្រោយបំផុត
			មុនពេលអ្នកធ្វើការដាក់ប្រាក់។.
		</li>
		<li>
			សម្រាប់ការប្រើប្រាស់ជម្រើសដាក់ប្រាក់ដោយ{" "}
			<span>&quot;ការផ្ទេរប្រាក់តាមធនាគារក្នុងស្រុក&quot;</span>{" "}
			សូមធ្វើការផ្ទេរប្រាក់ឱ្យរួចរាល់ជាមុនសិន មុននឹងបញ្ជូនប្រតិបត្តិការ
			ដើម្បីជៀសវាងការពន្យារពេលប្រតិបត្តិការ។.
		</li>
		<li>
			ឈ្មោះគណនីរបស់អ្នកដាក់ប្រាក់
			ត្រូវតែដូចគ្នាជាមួយនឹងឈ្មោះពេញរបស់អ្នកដែលបានចុះឈ្មោះ។
			យើងមិនលើកទឹកចិត្តឱ្យធ្វើប្រតិបត្តិការដោយប្រើគណនីភាគីទីបី/ក្រុមហ៊ុនទេ។.
		</li>
		<li>
			<span>សូមកុំបំពេញពាក្យ</span> <span>&quot;NOVA88&quot;</span> e
			ឬពាក្យរសើបណាមួយទាក់ទងនឹងការលេងល្បែងសម្រាប់យោង/កំណត់សម្គាល់ក្នុងប្រតិបត្តិការអនឡាញរបស់អ្នក។.
		</li>
		<li>
			សូមចំណាំថាត្រូវមានការភ្នាល់ប្រាក់វិលជុំចំនួន 1x
			សម្រាប់ការដាក់ប្រាក់ទាំងអស់ដែលធ្វើឡើងមុនពេលការដកប្រាក់ណាមួយអាចត្រូវបានដំណើរការ។
		</li>
		<li>
			សូមទាក់ទងផ្នែក{" "}
			<a
				rel="noreferrer"
				target="_blank"
				href="https://direct.lc.chat/11638088/">
				ជជែកបន្តផ្ទាល់ ២៤ ម៉/៧ ថ្ងៃ
			</a>{" "}
			របស់យើង ប្រសិនបើប្រតិបត្តិការរបស់អ្នកនៅតែរង់ចាំលើសពី ៥ នាទី។
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
