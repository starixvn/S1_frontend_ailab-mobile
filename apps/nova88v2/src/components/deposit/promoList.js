import React, { useState, useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "@reach/router";
import { popBoxContext } from "Context";
import Dropdown from "../common/dropdown";
import api from "../../service/api";
import path from "../../path";

import { isConvert, number_format } from "../common/common";

const NONE_IDX = 0;

const isOTPVerified = ({
	phoneVerified,
	accountName,
	birth_d,
	birth_m,
	birth_y
}) => Boolean(phoneVerified && accountName && birth_d && birth_m && birth_y);

const PromoList = ({
	i18n,
	amount,
	userInfo,
	promoList,
	depositPromo,
	setDepositPromo
}) => {
	const { setPopBox } = useContext(popBoxContext);
	const navigate = useNavigate();

	const [selectedIdx, setSelectedIdx] = useState(0);

	const { phoneVerified, currencyId } = userInfo;

	const closePopbox = () => {
		setPopBox({ isOpen: false });
	};

	const openVerificationPopBox = bonusCode => {
		const RedirectToProfile = () => {
			navigate(
				`/${userInfo.langId}/${path.profile.root}?prevPage=${path.promotionInfo.root}&BonusCode=${bonusCode}`
			);
			closePopbox();
		};

		setPopBox({
			isOpen: true,
			title: i18n.lbl_ImportantNote,
			content: i18n.msg_OTPHint,
			hasBtn: true,
			hideCloseBtn: true,
			btnBar: (
				<div className="btn-group">
					<button className="blue" onClick={closePopbox}>
						{i18n?.lbl_Later}
					</button>
					<button onClick={RedirectToProfile} className="btn-check">
						{i18n.lbl_GoNow}
					</button>
				</div>
			)
		});
	};

	const selectPromo = i => {
		if (i !== selectedIdx) {
			if (!isOTPVerified(userInfo)) {
				openVerificationPopBox(promoList[i].bonusCode);

				return;
			}

			setSelectedIdx(i);
			setDepositPromo(promoList[i]);
		}
	};

	const onChangeInput = e => {
		setSelectedIdx(NONE_IDX);
		setDepositPromo({ specialCode: e.target.value });
	};

	const selectClassName = [depositPromo.specialCode && "active"]
		.filter(Boolean)
		.join(" ");

	const inputClassName = ["inputBox", depositPromo.bonusCode && "readonly"]
		.filter(Boolean)
		.join(" ");

	const input = depositPromo.specialCode ?? "";

	return (
		<>
			<div className="title">{i18n.lbl_Nova_Select_Bonus}</div>
			<div className="selectModule">
				<div className="infoModule">
					<Dropdown
						mainKey="deposit-promo-list"
						options={promoList}
						selectedIdx={selectedIdx}
						onSelectItem={selectPromo}
						hideInfo={true}
						inputBoxClassName={selectClassName}
					/>

					<div className={inputClassName}>
						<input
							value={input}
							placeholder={i18n.lbl_PromoCode}
							onChange={onChangeInput}
						/>
						<i className="icon icon-pencil" />
					</div>

					<DepositPromoTip
						i18n={i18n}
						amount={amount}
						phoneVerified={phoneVerified}
						currencyId={currencyId}
						requiredAmount={promoList[selectedIdx]?.requiredAmount}
					/>
				</div>
			</div>
		</>
	);
};

PromoList.defaultProps = {
	promoList: [],
	amount: null
};

PromoList.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	amount: PropTypes.number,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	promoList: PropTypes.arrayOf(PropTypes.objectOf),
	setDepositPromo: PropTypes.func.isRequired,
	depositPromo: PropTypes.objectOf(PropTypes.any).isRequired
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
		if (phoneVerified === false) return i18n.lbl_Nova_DepositPromoMsg1;

		if (requiredAmount && real_amount < requiredAmount)
			return `${i18n.lbl_Nova_DepositPromoMsg2} ${
				i18n[`Currency_${currencyId}`]
			} ${number_format(requiredAmount, _isConvert, 0)}`;

		return "";
	};

	return <div className={depositPromoMsgClass}>{tip()}</div>;
};

DepositPromoTip.defaultProps = {
	phoneVerified: null,
	currencyId: null,
	requiredAmount: null
};

DepositPromoTip.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
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
							content: `[${errorCode}] ${message}`
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
			const { errorCode, data, message } = res.data;
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
			} else if (errorCode !== 0) {
				setPopBox({
					isOpen: true,
					content: `[${errorCode}] ${message}`
				});
			}
		});
	}, [langId, i18n]);

	return { promoList };
};

export default PromoList;
