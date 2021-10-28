import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Dropdown from "../common/dropdown";
import api from "../../service/api";
import { isConvert, number_format } from "../common/common";

const PromoList = ({
	i18n,
	amount,
	phoneVerified,
	currencyId,
	promoList,
	setDepositPromo
}) => {
	const [selectedIdx, setSelectedIdx] = useState(0);

	const selectPromo = i => {
		if (i !== selectedIdx) {
			setSelectedIdx(i);
			setDepositPromo(promoList[i]);
		}
	};

	return (
		<>
			<div className="title">{i18n.lbl_Nova_Select_Bonus}</div>
			<div className="selectModule">
				<Dropdown
					mainKey="deposit-promo-list"
					options={promoList}
					selectedIdx={selectedIdx}
					onSelectItem={selectPromo}
					hideInfo={true}
				/>
			</div>

			<DepositPromoTip
				i18n={i18n}
				amount={amount}
				phoneVerified={phoneVerified}
				currencyId={currencyId}
				requiredAmount={promoList[selectedIdx]?.requiredAmount}
			/>
		</>
	);
};

PromoList.defaultProps = {
	promoList: [],
	amount: null,
	phoneVerified: true,
	currencyId: null
};

PromoList.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	amount: PropTypes.number,
	phoneVerified: PropTypes.bool,
	currencyId: PropTypes.number,
	promoList: PropTypes.arrayOf(PropTypes.objectOf),
	setDepositPromo: PropTypes.func.isRequired
};

const DepositPromoTip = ({
	i18n,
	amount,
	phoneVerified,
	currencyId,
	requiredAmount
}) => {
	const _isConvert = isConvert(currencyId);
	const real_amount = _isConvert ? amount * 1000 : amount;

	const depositPromoMsgActive = !phoneVerified || requiredAmount;

	const depositPromoMsgClass = ["tip", depositPromoMsgActive && "active"]
		.filter(Boolean)
		.join(" ");

	const tip = () => {
		if (!phoneVerified) return i18n.lbl_Nova_DepositPromoMsg1;

		if (!requiredAmount) return null;

		if (real_amount < requiredAmount)
			return `${i18n.lbl_Nova_DepositPromoMsg2} ${
				i18n[`Currency_${currencyId}`]
			} ${number_format(requiredAmount, _isConvert, 0)}`;

		return null;
	};

	return <div className={depositPromoMsgClass}>{tip()}</div>;
};

DepositPromoTip.defaultProps = {
	phoneVerified: false,
	currencyId: null,
	requiredAmount: null
};

DepositPromoTip.propTypes = {
	i18n: PropTypes.func.isRequired,
	amount: PropTypes.number.isRequired,
	phoneVerified: PropTypes.bool,
	currencyId: PropTypes.number,
	requiredAmount: PropTypes.number
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
		api.promotion
			.SetDepositPromotionQueue({ langId, TransId, BonusCode })
			.then(
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
		api.promotion.GetDepositPromotionList({ langId }).then(res => {
			const { errorCode, data } = res.data;
			if (isMountedRef.current && errorCode === 0) {
				const _promoList = data?.map((promo, i) => ({
					id: i,
					displayText: promo.title,
					bonusCode: promo.bonusCode,
					requiredAmount: promo.requiredAmount
				}));

				const none = {
					id: data.length,
					displayText: i18n.lbl_None,
					bonusCode: null,
					requiredAmount: null
				};

				setPromoList([none, ..._promoList]);
			}
		});
	}, [langId, i18n]);

	return { promoList };
};

export default PromoList;
