import React from "react";
import PropTypes from "prop-types";

const ImportantNote = ({ langId, i18n }) => {
	let content = null;
	if (langId === "en") content = <EN />;
	if (langId === "vn") content = <VN />;

	if (langId) {
		return (
			<div className="importantBox">
				<h1 className="icon icon-information-solid">
					{i18n.lbl_ImportantNotice?.toUpperCase()}
				</h1>
				{content}
			</div>
		);
	}

	return null;
};

const EN = () => (
	<ol type="1">
		<li>
			Kindly check with our{" "}
			<a
				rel="noreferrer"
				target="_blank"
				href="https://direct.lc.chat/12145020/">
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
			<a
				rel="noreferrer"
				target="_blank"
				href="https://direct.lc.chat/12145020/">
				24/7 LIVE CHAT
			</a>
			. Thank you.
		</li>
	</ol>
);

const VN = () => (
	<ol type="1">
		<li>
			Vui lòng liên hệ bộ phận{" "}
			<a
				rel="noreferrer"
				target="_blank"
				href="https://direct.lc.chat/12145020/">
				LIVECHAT 24/7
			</a>{" "}
			nếu lệnh rút bị chậm trễ quá 10 phút.
		</li>
		<li>
			Tên tài khoản rút tiền phải trùng với họ tên đăng ký, thành viên
			không được phép rút tiền vào tài khoản bên thứ ba.
		</li>
		<li>
			Một số nhà phát hành game yêu cầu thời gian đồng bộ 15 - 30 phút,
			vui lòng chờ trong thời gian trên.
		</li>
		<li>
			Vui lòng hoàn thành yêu cầu doanh thu cược 30 phút trước khi thực
			hiện lệnh rút để tránh bị hệ thống tự động từ chối.
		</li>
		<li>
			Nếu có vấn đề phát sinh hoặc cần được hỗ trợ thêm về vấn đề rút
			tiền, vui lòng liên hệ bộ phận{" "}
			<a
				rel="noreferrer"
				target="_blank"
				href="https://direct.lc.chat/12145020/">
				LIVECHAT 24/7
			</a>
			. Xin cám ơn.
		</li>
	</ol>
);

ImportantNote.defaultProps = {
	langId: null
};

ImportantNote.propTypes = {
	langId: PropTypes.string,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

export default ImportantNote;
