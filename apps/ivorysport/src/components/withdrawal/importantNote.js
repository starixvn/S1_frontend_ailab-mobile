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
			Kindly check with our{" "}
			<a rel="noreferrer" target="_blank" href="https://direct.lc.chat/">
				24/7 LIVE CHAT
			</a>{" "}
			if your transaction is pending for more than 10 minutes.
		</li>
		<li>
			Withdrawal bank account name must match with registered full name,
			member is not allow withdrawal to 3rd party bank account.
		</li>
		<li>
			Some game provider requires 15 till 30 minutes of report sync time,
			kindly bear with us during the required sync time
		</li>
		<li>
			Please make sure your required turnover is achieve, and submit the
			withdrawal transaction after 30 minutes to avoid system auto reject.
		</li>
		<li>
			If there is any discrepancy or you may have any other further
			withdrawal inquiries, kindly contact our{" "}
			<a rel="noreferrer" target="_blank" href="https://direct.lc.chat/">
				24/7 LIVE CHAT
			</a>
			. Thank you.
		</li>
	</ul>
);

const CS = () => (
	<ul>
		<li>
			如果您的交易超过10分钟还未完成, 请与我们的{" "}
			<a rel="noreferrer" target="_blank" href="https://direct.lc.chat/">
				24/7在线客服
			</a>{" "}
			联系。
		</li>
		<li>
			提款银行户口名称必须与注册的全名匹配，会员不允许提款到第三方的银行帐户。
		</li>
		<li>一些游戏平台需要15至30分钟的报告同步时间，不便之处请多多包含。</li>
		<li>
			请在达到所需求的流水量的30分钟后，提交提款申请，以避免系统自动拒绝。
		</li>
		<li>
			如果您有任何提款疑问或查询, 请与我们的{" "}
			<a rel="noreferrer" target="_blank" href="https://direct.lc.chat/">
				24/7在线客服
			</a>{" "}
			联系。谢谢。
		</li>
	</ul>
);

const MY = () => (
	<ul>
		<li>
			Sila semak dengan{" "}
			<a rel="noreferrer" target="_blank" href="https://direct.lc.chat/">
				LIVE CHAT 24/7
			</a>{" "}
			kami jika transaksi anda belum diproses lebih daripada 10 minit.
		</li>
		<li>
			Nama akaun bank pengeluaran mesti padan dengan nama penuh yang
			didaftarkan, ahli tidak dibenar buat pengeluaran ke akaun bank pihak
			ketiga.
		</li>
		<li>
			Sesetengah pembekal permainan memerlukan 15 hingga 30 minit masa
			untuk masa penyegerakan laporan, sila bersabar semasa proses
			penyegerakan
		</li>
		<li>
			Sila pastikan anda sudah mencapai turnover yang diperlukan, dan
			hantar transaksi pengeluaran selepas 30 minit untuk elak ditolak
			oleh sistem secara automatik.
		</li>
		<li>
			Jika ada sebarang percanggahan atau mempunyai sebarang pertanyaan
			pengeluaran yang lanjut, sila hubungi{" "}
			<a rel="noreferrer" target="_blank" href="https://direct.lc.chat/">
				LIVECHAT 24/7
			</a>{" "}
			kami. Terima kasih.
		</li>
	</ul>
);

const TH = () => (
	<ul>
		<li>
			กรุณาติดต่อทาง{" "}
			<a rel="noreferrer" target="_blank" href="https://direct.lc.chat/">
				แชทสดตลอด 24/7
			</a>{" "}
			ชั่วโมง หากธุรกรรมของท่านได้รับการดำเนินการมากกว่า 10 นาที
		</li>
		<li>
			ชื่อบัญชีธนาคารที่ถอนจะต้องตรงกับชื่อนามสกุลที่ลงทะเบียนสมาชิกไม่อนุญาตให้ถอนไปยังบัญชีธนาคารของบุคคลที่สาม
		</li>
		<li>
			ในบางเกมอาจใช้เวลาประมาณ 15 ถึง 30 นาทีในการตรวจสอบรายการเดิมพัน
			รบกวนรอสำหรับระยะเวลาดังกล่าวในการอัพเดตข้อมูล
		</li>
		<li>
			กรุณาตรวจสอบให้แน่ใจว่าท่านได้ทำยอดเทิร์นสำเร็จตามเงื่อนไข
			และทำการแจ้งถอนหลังการเดิมพันประมาณ 30
			นาทีเพื่อป้องกันการปฎิเสธยอดถอนในระบบอัติโนมัติ
		</li>
		<li>
			หากมีข้อสงสัยหรือข้อมูลสอบถามเพิ่มเติมเกี่ยวกับธุรกรรมการถอน
			โปรดติดต่อ{" "}
			<a rel="noreferrer" target="_blank" href="https://direct.lc.chat/">
				แชทสดตลอด 24/7
			</a>{" "}
			ชั่วโมง ขอบคุณค่ะ
		</li>
	</ul>
);

const ID = () => (
	<ul>
		<li>
			Silakan hubungi{" "}
			<a rel="noreferrer" target="_blank" href="https://direct.lc.chat/">
				LIVE CHAT 24/7
			</a>{" "}
			kami jika transaksi Anda belum selesai lebih dari 10 menit.
		</li>
		<li>
			Nama rekening bank penarikan harus sesuai dengan nama lengkap
			terdaftar, anggota tidak diperbolehkan penarikan ke rekening bank
			pihak ke-3.
		</li>
		<li>
			Beberapa penyedia permainan membutuhkan waktu sinkronisasi laporan
			selama 15 hingga 30 menit, mohon bersabarlah selama waktu
			sinkronisasi yang ditentukan.
		</li>
		<li>
			Pastikan Turnover yang dibutuhkan tercapai, dan ajukan transaksi
			penarikan setelah 30 menit untuk menghindari pembatalan otomatis
			oleh sistem.
		</li>
		<li>
			Jika ada perbedaan atau Anda mungkin memiliki pertanyaan penarikan
			lebih lanjut, silakan hubungi{" "}
			<a rel="noreferrer" target="_blank" href="https://direct.lc.chat/">
				LIVE CHAT 24/7
			</a>{" "}
			kami. Terima kasih.
		</li>
	</ul>
);

const HI = () => (
	<ul>
		<li>
			यदि आपका लेन-देन 10 मिनट से अधिक समय से लंबित है, तो कृपया हमारी{" "}
			<a rel="noreferrer" target="_blank" href="https://direct.lc.chat/">
				24/7 लाइवचैट
			</a>{" "}
			चैट से जांच करें।
		</li>
		<li>
			निकासी बैंक खाते का नाम पंजीकृत पूरे नाम से मेल खाना चाहिए, सदस्य को
			तीसरे पक्ष के बैंक खाते में निकासी की अनुमति नहीं है।
		</li>
		<li>
			कुछ गेम प्रदाता को 15 से 30 मिनट की रिपोर्ट सिंक समय की आवश्यकता
			होती है, कृपया आवश्यक सिंक समय के दौरान हमारे साथ रहें।
		</li>
		<li>
			कृपया सुनिश्चित करें कि आपका आवश्यक टर्नओवर हासिल हो गया है, और
			सिस्टम ऑटो रिजेक्ट से बचने के लिए 30 मिनट के बाद निकासी लेनदेन जमा
			करें।
		</li>
		<li>
			यदि कोई विसंगति है या आपके पास कोई अन्य निकासी पूछताछ हो सकती है, तो
			कृपया हमारे{" "}
			<a rel="noreferrer" target="_blank" href="https://direct.lc.chat/">
				24/7 लाइवचैट
			</a>
			से संपर्क करें। धन्यवाद।
		</li>
	</ul>
);

const BD = () => (
	<ul>
		<li>
			দয়া করে আমাদের{" "}
			<a rel="noreferrer" target="_blank" href="https://direct.lc.chat/">
				24/7 লাইভ চ্যাটের
			</a>{" "}
			সাথে চেক করুন যদি আপনার লেনদেন 10 মিনিটের বেশি সময় ধরে মুলতুবি
			থাকে।
		</li>
		<li>
			প্রত্যাহার করা ব্যাঙ্ক অ্যাকাউন্টের নাম অবশ্যই নিবন্ধিত পুরো নামের
			সাথে মিলতে হবে, সদস্যকে তৃতীয় পক্ষের ব্যাঙ্ক অ্যাকাউন্টে তোলার
			অনুমতি দেওয়া হয় না।
		</li>
		<li>
			কিছু গেম প্রদানকারীর রিপোর্ট সিঙ্ক সময় 15 থেকে 30 মিনিটের প্রয়োজন,
			অনুগ্রহ করে প্রয়োজনীয় সিঙ্ক সময় আমাদের সাথে সহ্য করুন।
		</li>
		<li>
			অনুগ্রহ করে নিশ্চিত করুন যে আপনার প্রয়োজনীয় টার্নওভার অর্জন করা
			হয়েছে, এবং সিস্টেম অটো রিজেক্ট এড়াতে 30 মিনিটের পরে প্রত্যাহার
			লেনদেন জমা দিন।
		</li>
		<li>
			যদি কোন অসঙ্গতি থাকে বা আপনার অন্য কোন প্রত্যাহারের অনুসন্ধান থাকতে
			পারে, অনুগ্রহ করে আমাদের{" "}
			<a rel="noreferrer" target="_blank" href="https://direct.lc.chat/">
				24/7 লাইভচ্যাটে
			</a>
			. যোগাযোগ করুন। ধন্যবাদ.
		</li>
	</ul>
);

const KH = () => (
	<ul>
		<li>
			សូមផ្ទៀងផ្ទាត់ជាមួយផ្នែក{" "}
			<a rel="noreferrer" target="_blank" href="https://direct.lc.chat/">
				ជជែកបន្តផ្ទាល់ របស់យើង ២៤ ម៉/៧ ថ្ងៃ
			</a>{" "}
			ប្រសិនបើប្រតិបត្តិការរបស់អ្នកនៅតែរង់ចាំលើសពី ១០ នាទី។.
		</li>
		<li>
			ឈ្មោះគណនីធនាគារដកប្រាក់ត្រូវតែដូចគ្នាជាមួយនឹងឈ្មោះពេញដែលបានចុះ ឈ្មោះ
			- សមាជិកមិនត្រូវបានអនុញ្ញាតឱ្យដកប្រាក់ទៅគណនីធនាគារភាគីទីបីឡើយ។
		</li>
		<li>
			អ្នកផ្តល់សេវាហ្គេមមួយចំនួនត្រូវការរយៈពេលពី ១៥ ទៅ ៣០
			នាទីសម្រាប់ធ្វើសមកាលកម្មរបាយការណ៍
			សូមរង់ចាំដោយអត់ធ្មត់ជាមួយយើងក្នុងអំឡុងពេលសមកាលកម្មដែលបានតម្រូវ។.
		</li>
		<li>
			សូមប្រាកដថា លក្ខខណ្ឌចំណូលរបស់អ្នកត្រូវបានបំពេញតាម
			និងបញ្ជូនប្រតិបត្តិការដកប្រាក់ក្នុងរយៈពេល ៣០ នាទី បន្ទាប់
			ដើម្បីជៀសវាងការបដិសេធដោយស្វ័យប្រវត្តិរបស់ប្រព័ន្ធ។.
		</li>
		<li>
			ឬបើសិនអ្នកធ្វើការសាកសួរអំពីការដកប្រាក់ផ្សេងទៀត សូមទាក់ទងផ្នែ{" "}
			<a rel="noreferrer" target="_blank" href="https://direct.lc.chat/">
				ជជែកបន្តផ្ទាល់ ២៤ ម៉/៧ ថ្ងៃ
			</a>
			ងៃ ។ សូមអរគុណ។
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
