import React, { useContext } from "react";
import { Link } from "@reach/router";
import path from "../../path";
import { i18nContext } from "../common/context";

export const Info = ({ langId }) => {
	const _info = langId === "en" ? <ENInfo /> : <VNInfo />;
	return _info;
};

const ENInfo = () => {
	const { i18n } = useContext(i18nContext);
	return (
		<div className="vip-info">
			<div className="vip-info-title">VIP Program</div>
			<p>
				BWING has launched the VIP rewards program so that members could
				indulge in good services, more rewards, and a better experience.
				Discover greater perks and entitlements when your tier upgraded.
				Come join us now at BWING.
			</p>
			<div className="vip-info-title">Overview</div>
			<p>
				We have classified the membership tiers to BRONZE, SILVER, GOLD,
				TITANIUM, DIAMOND and BWING VVVIP. Enjoy all our privilege
				products and services when you achieve higher tier.
			</p>
			<div className="vip-info-title">
				Enjoy the benefits and privileges with difference membership
				tier
			</div>

			<Link to={`/${path.vip.sub.vipInner.root}`}>
				<span>{`${i18n.lbl_More_Info} >>`}</span>
			</Link>
		</div>
	);
};

const VNInfo = () => {
	const { i18n } = useContext(i18nContext);
	return (
		<div className="vip-info">
			<div className="vip-info-title">Đặc quyền VIP</div>
			<p>
				BWING vừa ra mắt chương trình thưởng Đặc quyền VIP với những ưu
				đãi chưa từng có: dịch vụ đặc biệt, quà tặng hoành tráng, và
				trải nghiệm khách hàng đỉnh cao. Hạng càng cao đặc quyền càng
				hấp dẫn. Tham gia CLB VIP BWING ngay hôm nay!
			</p>
			<div className="vip-info-title">Giới thiệu</div>
			<p>
				Hành trình vươn lên đỉnh cao VIP gồm các hạng ĐỒNG, BẠC, VÀNG,
				BẠCH KIM, KIM CƯƠNG, và BWING VVVIP. Thứ hạng càng cao, sản phẩm
				và dịch vụ càng đặc biệt.
			</p>
			<div className="vip-info-title">
				Trải nghiệm quyền lợi dành riêng cho từng hạng thành viên.
			</div>

			<Link to={`/${path.vip.sub.vipInner.root}`}>
				<span>{`${i18n.lbl_More_Info} >>`}</span>
			</Link>
		</div>
	);
};
