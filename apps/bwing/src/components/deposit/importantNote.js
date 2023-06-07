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
			Please <span>DO NOT</span> fill in <span>&quot;BWING&quot;</span> or
			any sensitive words related to gambling as reference/remark in your
			online transaction.
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
				href="https://direct.lc.chat/12145020/">
				24/7 LIVECHAT
			</a>{" "}
			if your transaction is still pending for more than 5 minutes.
		</li>
	</ol>
);

const VN = () => (
	<ol type="1">
		<li>
			Vui lòng luôn cập nhật thông tin tài khoản ngân hàng đang hoạt động
			trước khi gửi tiền.
		</li>
		<li>
			Nếu chọn <span>&quot;Chuyển khoản&quot;</span>, vui lòng thực hiện
			chuyển khoản trước khi thực hiện lệnh gửi để tránh giao dịch bị
			chậm.
		</li>
		<li>
			Để xác thực, vui lòng gửi kèm biên lai nạp tiền có số tham chiếu.
			Lưu ý tên người nạp tiền nên trùng với tên người đăng ký
		</li>
		<li>
			Vui lòng <span>KHÔNG</span> điền <span>&quot;BWING&quot;</span> hoặc
			bất cứ từ nhạy cảm nào liên quan đến cá cược trong phần nội dung
			giao dịch.
		</li>
		<li>
			Vui lòng lưu ý rằng mọi khoản tiền nạp đều cần hoàn thành doanh thu
			cược 1 lần trước khi được rút.
		</li>
		<li>
			Vui lòng liên hệ bộ phận{" "}
			<a
				rel="noreferrer"
				target="_blank"
				href="https://direct.lc.chat/12145020/">
				LIVECHAT 24/7
			</a>{" "}
			nếu lệnh gửi chậm trễ quá 5 phút.
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
