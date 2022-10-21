import React from "react";

export const Info = ({ langId }) => {
	const _info = langId === "en" ? <ENInfo /> : <VNInfo />;
	return _info;
};

const ENInfo = () => {
	return (
		<div className="vipInfo">
			<div className="vipTitle">VIP Program</div>
			BWING has launched the VIP rewards program so that members could
			indulge in good services, more rewards, and a better experience.
			Discover greater perks and entitlements when your tier upgraded.
			Come join us now at BWING.
			<div className="vipTitle">Overview</div>
			We have classified the membership tiers to BRONZE, SILVER, GOLD,
			TITANIUM, DIAMOND and BWING VVVIP. Enjoy all our privilege products
			and services when you achieve higher tier.
			<div className="vipTitle">
				Enjoy the benefits and privileges with difference membership
				tier
			</div>
		</div>
	);
};

const VNInfo = () => {
	return (
		<div className="vipInfo">
			<div className="vipTitle">Đặc quyền VIP</div>
			BWING vừa ra mắt chương trình thưởng Đặc quyền VIP với những ưu đãi
			chưa từng có: dịch vụ đặc biệt, quà tặng hoành tráng, và trải nghiệm
			khách hàng đỉnh cao. Hạng càng cao đặc quyền càng hấp dẫn. Tham gia
			CLB VIP BWING ngay hôm nay!
			<div className="vipTitle">Giới thiệu</div>
			Hành trình vươn lên đỉnh cao VIP gồm các hạng ĐỒNG, BẠC, VÀNG, BẠCH
			KIM, KIM CƯƠNG, và BWING VVVIP. Thứ hạng càng cao, sản phẩm và dịch
			vụ càng đặc biệt.
			<div className="vipTitle">
				Trải nghiệm quyền lợi dành riêng cho từng hạng thành viên.
			</div>
		</div>
	);
};
