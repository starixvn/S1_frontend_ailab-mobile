import React, { useContext } from "react";
import { i18nContext } from "../common/context";

export const Info = ({ langId }) => {
	const _info = langId === "en" ? <ENInfo /> : <VNInfo />;
	return _info;
};

const ENInfo = () => {
	const { i18n } = useContext(i18nContext);
	return (
		<div className="vipInfo">
			<div className="vipTitle">VIP Program</div>
			GOAL123 has launched the VIP rewards program so that members could
			indulge in good services, more rewards, and a better experience.
			Discover greater perks and entitlements when your tier upgraded.
			We're waiting for you!
			<div className="vipTitle">Overview</div>
			We have classified the membership tiers to BRONZE, SILVER, GOLD,
			TITANIUM, DIAMOND and GOAL123 CLUB. Enjoy all our privillege
			products and services when you achieve higher tier.
			<div className="vipTitle">
				Enjoy the benefits and privileges with difference membership
				tier
			</div>
			{i18n.lbl_LastUpdated} : 17/05/2021
		</div>
	);
};

const VNInfo = () => {
	const { i18n } = useContext(i18nContext);
	return (
		<div className="vipInfo">
			<div className="vipTitle">Đặc quyền VIP</div>
			GOAL123 vừa ra mắt chương trình thưởng Đặc quyền VIP với những ưu
			đãi chưa từng có: dịch vụ đặc biệt, quà tặng hoành tráng, và trải
			nghiệm khách hàng đỉnh cao. Hạng càng cao đặc quyền càng hấp dẫn.
			Đăng ký ngay hôm nay, quà tặng hấp dẫn đang chờ bạn!
			<div className="vipTitle">Giới thiệu</div>
			Hành trình vươn lên đỉnh cao VIP gồm các hạng ĐỒNG, BẠC, VÀNG, BẠCH
			KIM, KIM CƯƠNG, và GOAL123 CLUB. Thứ hạng càng cao, sản phẩm và dịch
			vụ càng đặc biệt.
			<div className="vipTitle">
				Trải nghiệm quyền lợi dành riêng cho từng hạng thành viên.
			</div>
			{i18n.lbl_LastUpdated} : 17/05/2021
		</div>
	);
};
