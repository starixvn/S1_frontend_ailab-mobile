import React from "react";
import PropTypes from "prop-types";
import { Link } from "../../route/link";
import { useGetPromotions } from "../hook/useGetPromotions";
import { Autoplay } from "../common/swipperBanner";
import path from "../../path";

const swipperParam = {
	spaceBetween: 5,
	slidesPerView: 2,
	centeredSlides: true,
	autoplay: {
		delay: 1000,
		disableOnInteraction: false
	},
	rebuildOnUpdate: true,
	loop: true,
	containerClass: "promos"
};

const Promos = ({ i18n, userInfo }) => {
	const { langId, isLogin } = userInfo;
	const { promotionList } = useGetPromotions({ langId, isLogin });

	const promoArr = promotionList.map(promo => {
		const { banner, title, description, bonusCode } = promo;
		return (
			<div className="promosModule" key={`promos-${bonusCode}`}>
				<div>
					<img src={banner} alt={title} />
				</div>
				<div>{title}</div>
				<div>{description}</div>
				<div className="btn-group">
					<Link
						className="blue"
						to={`${path.promotionInfo.root}?BonusCode=${bonusCode}`}>
						{i18n.lbl_Details}
					</Link>
				</div>
			</div>
		);
	});

	return promoArr?.length <= 0 ? null : (
		<>
			<div className="moduleTitle icon icon-gift">
				{i18n.lbl_Promotion}
			</div>
			<Autoplay Rows={promoArr} params={swipperParam} />
		</>
	);
};

Promos.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Promos;
