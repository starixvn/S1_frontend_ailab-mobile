import React from "react";
import PropTypes from "prop-types";

const ImportantNote = ({ langId, i18n }) => {
	let content = null;
	if (langId === "en") content = <EN />;
	if (langId === "vn") content = <VN />;

	if (langId) {
		return (
			<div className="importantNote">
				<div className="title">
					<i className="icon icon-information-solid" />{" "}
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
			Please <span>DO NOT</span> fill in <span>&quot;GOAL123&quot;</span>{" "}
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
				href="https://direct.lc.chat/12171870/">
				24/7 LIVECHAT
			</a>{" "}
			if your transaction is still pending for more than 5 minutes.
		</li>
	</ul>
);

const VN = () => (
	<ul>
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
			<span>TÊN TÀI KHOẢN</span> người gửi phải trùng với họ tên đăng ký.
			Chúng tôi không khuyến khích thực hiện giao dịch bằng bên/công ty
			thứ ba.
		</li>
		<li>
			Vui lòng <span>KHÔNG</span> điền <span>&quot;GOAL123&quot;</span>{" "}
			hoặc bất cứ từ nhạy cảm nào liên quan đến cá cược trong phần nội
			dung giao dịch.
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
				href="https://direct.lc.chat/12171870/">
				LIVECHAT 24/7
			</a>{" "}
			nếu lệnh gửi chậm trễ quá 5 phút.
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
