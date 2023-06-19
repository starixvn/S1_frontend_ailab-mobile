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
			Depositor&apos;s name must meet the verification criteria, including
			register name or reference number in slip.
		</li>
		<li>
			Please <span>DO NOT</span> fill in{" "}
			<span>&quot;IVORYSPORT&quot;</span> or any sensitive words related
			to gambling as reference/remark in your online transaction.
		</li>
		<li>
			Please take noted that will be 1x rollover required for all deposit
			made before any withdrawal can be processed.
		</li>
		<li>
			Kindly please contact our <span>support247@ivorysport.com</span> if
			your transaction is still pending for more than 5 minutes.
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
		<li>存款人姓名需符合核实标准，包括注册姓名，存款凭据序号等信息</li>
		<li>
			转账时<span>请勿</span>填写 <span>&quot;IVORYSPORT&quot;</span>{" "}
			或任何与博彩有关联的敏感信息。
		</li>
		<li>
			所有存款金额统一必须完成<span>1倍流水</span>需求方可进行提款。
		</li>
		<li>
			如您的存款申请时长超过5分钟或以上，请联系
			<span>support247@ivorysport.com</span> 以寻求帮助。
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
			Nama pendeposit mesti memenuhi kriteria pengesahan, termasuk nama
			daftar atau nombor rujukan dalam slip.
		</li>
		<li>
			<span>JANGAN</span> isi <span>&quot;IVORYSPORT&quot;</span> atau
			sebarang perkataan sensitif yang berkaitan dengan perjudian sebagai
			rujukan/nota dalam transaksi dalam talian anda.
		</li>
		<li>
			Sila ambil perhatian bahawa 1x rollover diperlukan untuk semua
			deposit yang dibuat sebelum sebarang pengeluaran boleh diproses.
		</li>
		<li>
			Sila hubungi <span>support247@ivorysport.com</span> kami jika
			transaksi anda masih belum diproses lebih daripada 5 minit.
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
		<li>ชื่อผู้ฝากต้องตรงกับที่ลงทะเบียนหรือหมายเลขธุรกรรมในสลิปโอนเงิน</li>
		<li>
			โปรดอย่ากรอก <span>&quot;IVORYSPORT&quot;</span>{" "}
			หรือคำที่ละเอียดอ่อนใดๆ
			ที่เกี่ยวข้องกับการพนันเพื่อเป็นข้อมูลอ้างอิง/อ้างถึงในการทำธุรกรรมออนไลน์ของคุณ
		</li>
		<li>
			โปรดทราบว่าจะต้องมีการโรลโอเวอร์ 1x สำหรับการฝากเงินทั้งหมด
			ก่อนที่จะสามารถดำเนินการถอนได้
		</li>
		<li>
			กรุณาติดต่อเราที่ <span>support247@ivorysport.com</span>{" "}
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
			Nama penyetor harus memenuhi kriteria verifikasi, termasuk nama
			terdaftar atau nomor referensi dalam slip.
		</li>
		<li>
			Mohon <span>TIDAK</span> mengisi <span>&quot;IVORYSPORT&quot;</span>{" "}
			atau kata-kata sensitif terkait perjudian sebagai referensi /
			catatan dalam transaksi online Anda.
		</li>
		<li>
			Harap perhatikan bahwa akan diperlukan 1x turnover untuk semua
			deposit yang dilakukan sebelum penarikan dapat diproses.
		</li>
		<li>
			Silakan hubungi <span>support247@ivorysport.com</span> kami jika
			transaksi Anda masih tertunda selama lebih dari 5 menit.
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
			जमाकर्ता का नाम पंजीकरण नाम या पर्ची में संदर्भ संख्या सहित सत्यापन
			मानदंडों को पूरा करना चाहिए।
		</li>
		<li>
			कृपया अपने ऑनलाइन लेनदेन में संदर्भ/टिप्पणी के रूप में
			<span>&quot;IVORYSPORT&quot;</span> या जुए से संबंधित कोई भी
			संवेदनशील शब्द न भरें।
		</li>
		<li>
			कृपया ध्यान दें कि किसी भी निकासी को संसाधित करने से पहले किए गए सभी
			जमाओं के लिए 1x रोलओवर आवश्यक होगा।
		</li>
		<li>
			यदि आपका लेनदेन अभी भी 5 मिनट से अधिक समय से लंबित है तो कृपया हमारे{" "}
			<span>support247@ivorysport.com</span> से संपर्क करें।
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
			আমানতকারীর নাম অবশ্যই যাচাইয়ের মানদণ্ড পূরণ করতে হবে, যার মধ্যে
			রেজিস্টার নাম বা স্লিপে রেফারেন্স নম্বর রয়েছে।
		</li>
		<li>
			অনুগ্রহ করে আপনার অনলাইন লেনদেনে রেফারেন্স/মন্তব্য হিসাবে
			<span>&quot;IVORYSPORT&quot;</span> বা জুয়া সম্পর্কিত কোনো
			সংবেদনশীল শব্দ পূরণ করবেন না।
		</li>
		<li>
			অনুগ্রহ করে মনে রাখবেন যে কোনও উত্তোলন প্রক্রিয়া করার আগে করা সমস্ত
			আমানত জন্য ১x রোলওভার প্রয়োজন।
		</li>
		<li>
			অনুগ্রহ করে আমাদের{" "}
			<a rel="noreferrer" target="_blank" href="https://direct.lc.chat/">
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
			ឈឈ្មោះអ្នកដាក់ប្រាក់ត្រូវតែបំពេញតាមលក្ខណៈវិនិច្ឆ័យនៃការផ្ទៀងផ្ទាត់
			រួមទាំងឈ្មោះចុះឈ្មោះ ឬលេខយោងនៅក្នុងប័ណ្ណ។
		</li>
		<li>
			<span>សូមកុំបំពេញពាក្យ</span> <span>&quot;IVORYSPORT&quot;</span> e
			ឬពាក្យរសើបណាមួយទាក់ទងនឹងការលេងល្បែងសម្រាប់យោង/កំណត់សម្គាល់ក្នុងប្រតិបត្តិការអនឡាញរបស់អ្នក។.
		</li>
		<li>
			សូមចំណាំថាត្រូវមានការភ្នាល់ប្រាក់វិលជុំចំនួន 1x
			សម្រាប់ការដាក់ប្រាក់ទាំងអស់ដែលធ្វើឡើងមុនពេលការដកប្រាក់ណាមួយអាចត្រូវបានដំណើរការ។
		</li>
		<li>
			សូមទាក់ទងផ្នែក{" "}
			<a rel="noreferrer" target="_blank" href="https://direct.lc.chat/">
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
