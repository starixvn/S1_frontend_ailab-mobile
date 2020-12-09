import React, { useContext } from "react";
import { userInfoContext } from "../components/common/context";
import img1 from "../styles/img/HowDeposit/img1.png";
import img2 from "../styles/img/HowDeposit/img2.png";
import img3 from "../styles/img/HowDeposit/img3.png";
import deMO1 from "../styles/img/HowDeposit/deMo1.png";
import deMO2 from "../styles/img/HowDeposit/deMo2.png";
import deMO3 from "../styles/img/HowDeposit/deMo3.png";
import deMO4 from "../styles/img/HowDeposit/deMo4.png";
import deMO5 from "../styles/img/HowDeposit/deMo5.png";
import imgall1 from "../styles/img/HowDeposit/imgall1.png";
import deOn1 from "../styles/img/HowDeposit/deOn1.png";
import deOn2 from "../styles/img/HowDeposit/deOn2.png";
import deOn3 from "../styles/img/HowDeposit/deOn3.png";
import deOn4 from "../styles/img/HowDeposit/deOn4.png";
import imgall2 from "../styles/img/HowDeposit/imgall2.png";
import deLo1 from "../styles/img/HowDeposit/deLo1.png";
import deLo2 from "../styles/img/HowDeposit/deLo2.png";
import deLo3 from "../styles/img/HowDeposit/deLo3.png";
import deLo4 from "../styles/img/HowDeposit/deLo4.png";
import deLo5 from "../styles/img/HowDeposit/deLo5.png";
import deLo6 from "../styles/img/HowDeposit/deLo6.png";
import img1_vn from "../styles/img/HowDeposit/img-vn1.png";
import img2_vn from "../styles/img/HowDeposit/img-vn2.png";
import img3_vn from "../styles/img/HowDeposit/img-vn3.png";
import deMO1_vn from "../styles/img/HowDeposit/deMo-vn1.png";
import deMO2_vn from "../styles/img/HowDeposit/deMo-vn2.png";
import deMO3_vn from "../styles/img/HowDeposit/deMo-vn3.png";
import deMO4_vn from "../styles/img/HowDeposit/deMo-vn4.png";
import deMO5_vn from "../styles/img/HowDeposit/deMo-vn5.png";
import deOn1_vn from "../styles/img/HowDeposit/deOn-vn1.png";
import deOn2_vn from "../styles/img/HowDeposit/deOn-vn2.png";
import deOn3_vn from "../styles/img/HowDeposit/deOn-vn3.png";
import deOn4_vn from "../styles/img/HowDeposit/deOn-vn4.png";
import deLo1_vn from "../styles/img/HowDeposit/deLo-vn1.png";
import deLo2_vn from "../styles/img/HowDeposit/deLo-vn2.png";
import deLo3_vn from "../styles/img/HowDeposit/deLo-vn3.png";
import deLo4_vn from "../styles/img/HowDeposit/deLo-vn4.png";
import deLo5_vn from "../styles/img/HowDeposit/deLo-vn5.png";
import deLo6_vn from "../styles/img/HowDeposit/deLo-vn6.png";

export default () => {
	const { userInfo } = useContext(userInfoContext);

	return userInfo.langId === "en" ? (
		<section className="essayPage">
			<div className="title">HOW TO DEPOSIT</div>
			<p>Step 1: "LOG IN" at the homepage</p>
			<img src={img1} alt="" />
			<p>
				Step 2: Fill in the registered information and click "LOGIN"
				button.
			</p>
			<img src={img2} alt="" />
			<p>
				Step 3: Choose "Deposit" button at the top of the page, or click
				on the arrow next to your balance and choose "Deposit".
			</p>
			<img src={img3} alt="" />
			<p>
				Step 4: Choose your preferred deposit method among e-wallet,
				internet banking, and domestic bank transfer. After that, choose
				the provider you want.
			</p>
			<img src={deMO1} alt="" />

			<div className="title">Deposit via e-wallet </div>
			<p>
				Step 1: Choose one provider among Momo, ZaloPay, or Viettel Pay.
			</p>
			<img src={deMO2} alt="" />
			<p>Step 2: Choose one of the available accounts.</p>
			<img src={deMO3} alt="" />
			<p>
				Step 3: Input the amount you want to deposit, choose "Submit"
				button. Please note that different gateways have different
				deposit limits.
			</p>
			<img src={deMO4} alt="" />
			<p>Step 4: Choose "Confirm" button. </p>
			<img src={deMO5} alt="" />
			<p>
				Step 5: The system will display the QR code and instruction to
				deposit via Momo. Please open Momo app and scan this QR code to
				deposit.
			</p>
			<img src={imgall1} alt="" />

			<div className="title">Deposit via online banking</div>
			<p>Step 1: Choose one of the appropriate payment gateways</p>
			<img src={deOn1} alt="" />
			<p>Step 2: Choose your preferred bank </p>
			<img src={deOn2} alt="" />
			<p>
				Step 3: Select the bank you want to use and enter the amount to
				be transacted. Please note that different gateways have
				different deposit limits. (by default, the system has 3 zero at
				the end. If you want to deposit 300,000, just enter 300)
			</p>
			<img src={deOn3} alt="" />
			<p>Step 4: Choose "Confirm" button.</p>
			<img src={deOn4} alt="" />
			<p>
				Step 5: Input your account name and password and follow the
				instructions.
			</p>
			<img src={imgall2} alt="" />

			<div className="title">Deposit via local bank transfer</div>
			<p>Step 1: Choose Local bank transfer</p>
			<img src={deLo1} alt="" />
			<p>Step 2: Choose 1 of the available banks. </p>
			<img src={deLo2} alt="" />
			<p>
				Step 3: Fill in your real name as in your ID (if you haven't
				updated in your Profile page) and input the amount you want to
				deposit. The system defaults to 3 zeros at the end. If a member
				wants to deposit 300,000 just enter 300. Choose "Submit" button.
			</p>
			<img src={deLo3} alt="" />
			<p>
				Step 4: In case you haven't updated your name in your profile
				page, please confirm your name as in your ID and your bank
				account to avoid delaying the transaction.
			</p>
			<img src={deLo4} alt="" />
			<p>Step 5: Confirm the amount </p>
			<img src={deLo5} alt="" />
			<p>
				Step 6 (optional): To speed up the verification process, you can
				upload the bank receipt in the image format and fill in the
				reference number on the receipt.
			</p>
			<img src={deLo6} alt="" />
			<p>We will verify and notify you as soon as possible.</p>
		</section>
	) : (
		<section className="essayPage">
			<div className="title">HƯỚNG DẪN NẠP TIỀN</div>
			<p>Bước 1: "ĐĂNG NHẬP" tại trang chủ</p>
			<img src={img1_vn} alt="" />
			<p>Bước 2: Điền thông tin đã đăng ký và nhấp nút "ĐĂNG NHẬP"</p>
			<img src={img2_vn} alt="" />
			<p>
				Bước 3: Nhấp chọn "Nạp tiền" ở đầu trang, hoặc bấm vào mũi tên
				cạnh số tiền trong tài khoản vào chọn "Nạp tiền".
			</p>
			<img src={img3_vn} alt="" />
			<p>
				Bước 4: Chọn phương thức gửi tiền yêu thích. Trong danh sách các
				nhà cung cấp cổng thanh toán ví điện tử, ngân hàng trực tuyến,
				hoặc chuyển khoản trong nước, vui lòng chọn nhà cung cấp bạn
				muốn và làm theo hướng dẫn.
			</p>
			<img src={deMO1_vn} alt="" />

			<div className="title">Nạp tiền qua ví điện tử </div>
			<p>
				Bước 1: Lựa chọn các ví điện tử Momo, Zalo Pay hoặc Viettel Pay.{" "}
			</p>
			<img src={deMO2_vn} alt="" />
			<p>Bước 2: Chọn cổng nạp.</p>
			<img src={deMO3_vn} alt="" />
			<p>
				Bước 3: Nhập số tiền bạn muốn nạp, chọn nút "Nạp tiền". Lưu ý
				mỗi cổng thanh toán có hạn mức nạp khác nhau.
			</p>
			<img src={deMO4_vn} alt="" />
			<p>Bước 4: Chọn nút "Xác nhận".</p>
			<img src={deMO5_vn} alt="" />
			<p>
				Bước 5: Hệ thống sẽ hiển thị mã QR tương ứng và hướng dẫn nạp
				bằng Momo. Vui lòng mở ứng dụng Momo và quét mã QR này để nạp
				tiền.
			</p>
			<img src={imgall1} alt="" />

			<div className="title">Nạp tiền ngân hàng trực tuyến</div>
			<p>Bước 1: Chọn một trong các cổng thanh toán thích hợp.</p>
			<img src={deOn1_vn} alt="" />
			<p>Bước 2: Chọn ngân hàng của bạn </p>
			<img src={deOn2_vn} alt="" />
			<p>
				Bước 3: Nhập số tiền bạn muốn nạp, chọn nút "Nạp tiền". Lưu ý
				mỗi cổng thanh toán có hạn mức nạp khác nhau.
			</p>
			<img src={deOn3_vn} alt="" />
			<p>Bước 4: Chọn nút "Xác nhận".</p>
			<img src={deOn4_vn} alt="" />
			<p>
				Bước 5: Nhập tên tài khoản và mật khẩu internet banking của ngân
				hàng tương ứng và làm theo hướng dẫn.
			</p>
			<img src={imgall2} alt="" />

			<div className="title">Nạp tiền bằng chuyển khoản trong nước</div>
			<p>Bước 1: Chọn chuyển khoản trong nước</p>
			<img src={deLo1_vn} alt="" />
			<p>Bước 2: Chọn 1 trong các ngân hàng có sẵn. </p>
			<img src={deLo2_vn} alt="" />
			<p>
				Bước 3: Điền tên thật như trong CMND của bạn (nếu bạn chưa cập
				nhật trong trang Hồ sơ) và nhập số tiền bạn muốn nạp. Hệ thống
				mặc định 3 số 0 ở cuối. Ví dụ bạn muốn nạp 300,000 chỉ cần điền
				300. Chọn nút "Nạp tiền".
			</p>
			<img src={deLo3_vn} alt="" />
			<p>
				Bước 4: Xác nhận tên của bạn đúng với tên trên CMND và tài khoản
				ngân hàng để tránh bị trì hoãn giao dịch.{" "}
			</p>
			<img src={deLo4_vn} alt="" />
			<p>Bước 5: Xác nhận số tiền </p>
			<img src={deLo5_vn} alt="" />
			<p>
				Bước 6 (không bắt buộc): Để quá trình xác thực nhanh hơn, bạn có
				thể tải lên biên lai ngân hàng bằng định dạng ảnh và điền số
				tham chiếu trên biên lai.
			</p>
			<img src={deLo6_vn} alt="" />
			<p>Hệ thống sẽ xác thực và thông báo nhanh nhất có thể.</p>
		</section>
	);
};
