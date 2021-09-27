import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Dropdown from "../common/dropdown";
import {
	api_GetDepositPromotionList,
	api_SetDepositPromotionQueue
} from "../../service/api/promotion";

const PromoList = ({ i18n, setCustBonusCode, promoList, depositPromoMsg }) => {
	const [selectedIdx, setSelectedIdx] = useState(promoList?.length - 1);

	const selectPromo = i => {
		if (i !== selectedIdx) {
			setSelectedIdx(i);
			setCustBonusCode(promoList[i].bonusCode);
		}
	};

	return (
		<>
			<div className="title">{i18n.lbl_Select_Bonus}</div>
			<div className="inputBox">
				<Dropdown
					options={promoList}
					selectedIdx={selectedIdx}
					onSelectItem={selectPromo}
				/>

				<div className="tip">{depositPromoMsg}</div>
			</div>
		</>
	);
};

PromoList.defaultProps = {
	promoList: []
};

PromoList.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	setCustBonusCode: PropTypes.func.isRequired,
	promoList: PropTypes.arrayOf(PropTypes.objectOf),
	depositPromoMsg: PropTypes.string.isRequired
};

export const setCustPromo = ({
	langId,
	TransId,
	BonusCode,
	setPopBox,
	i18n,
	toNextStep
}) => {
	if (BonusCode) {
		api_SetDepositPromotionQueue({ langId, TransId, BonusCode }).then(
			res => {
				const { errorCode, message } = res.data;
				if (errorCode === 0) {
					toNextStep();
				} else {
					setPopBox({
						isOpen: true,
						title: i18n.lbl_ImportantNote,
						content: `[${errorCode}]${message}`
					});
				}
			},
			() => {
				setPopBox({
					isOpen: true,
					title: i18n.lbl_ImportantNote,
					content: i18n.msg_ApiServerError
				});
			}
		);
	}
};

export const useGetDepositPromotionList = ({ langId, i18n }) => {
	const [promoList, setPromoList] = useState([]);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		api_GetDepositPromotionList({ langId }).then(res => {
			const { errorCode, data } = res.data;
			if (isMountedRef.current && errorCode === 0) {
				const _promoList = data?.map((promo, i) => ({
					id: i,
					displayText: promo.title,
					bonusCode: promo.bonusCode
				}));
				const none = {
					id: data.length,
					displayText: i18n.lbl_None,
					bonusCode: null
				};
				setPromoList([..._promoList, none]);
			}
		});
	}, [langId, i18n]);

	return { promoList };
};

export default PromoList;
