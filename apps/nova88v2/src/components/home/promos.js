import React from "react";
import moment from "moment";
import Marquee from "react-fast-marquee";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import { useGetPromotions } from "../hook/useGetPromotions";
import { useHandlePromotionInfo } from "../promotion/promotionInfo.popbox";
import path from "../../path";

const Promos = ({ i18n, userInfo }) => {
	const { langId, isLogin, currencyId } = userInfo;
	const { promotionList } = useGetPromotions({ langId, isLogin, currencyId });
	const { getPromotionDetail } = useHandlePromotionInfo({
		showAllPromosBtn: true
	});

	const clickPromotion = bonusCode => {
		getPromotionDetail(langId, bonusCode);
	};

	const promoArr = promotionList.map(promo => {
		const {
			banner,
			title,
			description,
			bonusCode,
			displayFrom,
			displayTo
		} = promo;
		const timezone = moment().format("Z");
		const isDisplay =
			moment.unix(displayFrom).subtract(timezone).diff(moment()) <= 0 &&
			moment.unix(displayTo).subtract(timezone).diff(moment()) >= 0;

		return (
			isDisplay && (
				<div className="promosModule" key={`promos-${bonusCode}`}>
					<div>
						<img src={banner} alt={title} />
					</div>
					<div>{title}</div>
					<div>{description}</div>
					<div className="btn-group">
						<button
							className="blue"
							onClick={clickPromotion.bind(this, bonusCode)}>
							{i18n.lbl_More_Info}
						</button>
					</div>
				</div>
			)
		);
	});

	return promoArr?.length <= 0 ? null : (
		<>
			<div className="moduleTitle">
				{i18n.lbl_Promotion}
				<Link to={`${path.promotion.root}`}>{i18n.lbl_SeeMore}</Link>
			</div>
			<Marquee speed={60} className="promos" gradient={false}>
				{promoArr}
			</Marquee>
		</>
	);
};

Promos.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Promos;
