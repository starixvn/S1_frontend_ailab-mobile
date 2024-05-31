import React, { useState, useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "@reach/router";
import { popBoxContext } from "Context";
import Dropdown from "../common/dropdown";
import { isConvert, number_format } from "../common/common";
import path from "../../path";

import {
	api_GetDepositPromotionList,
	api_SetDepositPromotionQueue
} from "../../service/api/promotion";

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
	promoList,
	userInfo,
	depositPromo,
	setDepositPromo
}) => {
	const [selectedIdx, setSelectedIdx] = useState(promoList?.length - 1);

	const { setPopBox } = useContext(popBoxContext);
	const navigate = useNavigate();

	const { phoneVerified, currencyId } = userInfo || {};

	const noneIdx = promoList.length - 1;

	const closePopbox = () => {
		setPopBox({ isOpen: false });
	};

	const openVerificationPopBox = bonusCode => {
		const RedirectToProfile = () => {
			navigate(
				`/${path.member.root}?prevPage=${path.deposit.root}&BonusCode=${bonusCode}`
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
		setSelectedIdx(noneIdx);
		setDepositPromo({ specialCode: e.target.value });
	};

	const selectClassName = ["inputBox", depositPromo?.specialCode && "disable"]
		.filter(Boolean)
		.join(" ");

	const inputClassName = ["inputBox", depositPromo?.bonusCode && "readonly"]
		.filter(Boolean)
		.join(" ");

	const input = depositPromo?.specialCode ?? "";

	return (
		<>
			<div className="title">{i18n.lbl_Select_Bonus}</div>
			<div className={selectClassName}>
				<Dropdown
					options={promoList}
					selectedIdx={selectedIdx}
					onSelectItem={selectPromo}
				/>
			</div>

			<div className={inputClassName}>
				<input
					value={input}
					placeholder={i18n.lbl_PromoCode}
					onChange={onChangeInput}
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
	promoList: []
};

PromoList.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	amount: PropTypes.number.isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	promoList: PropTypes.arrayOf(PropTypes.objectOf),
	depositPromo: PropTypes.objectOf(PropTypes.any).isRequired,
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

	const tip = () => {
		if (phoneVerified === false) return i18n.lbl_DepositPromoMsg1;

		if (requiredAmount && real_amount < requiredAmount)
			return `${i18n.lbl_DepositPromoMsg2} ${
				i18n[`Currency_${currencyId}`]
			} ${number_format(requiredAmount, _isConvert, 0)}`;

		return "";
	};

	return <div className="tip">{tip()}</div>;
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
		api_SetDepositPromotionQueue({ langId, TransId, BonusCode }).then(
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
					content: i18n.msg_ApiServerError
				});
			}
		);
	}
};

export const useGetDepositPromotionList = ({ langId, i18n, setPopBox }) => {
	const [promoList, setPromoList] = useState([]);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		api_GetDepositPromotionList({ langId }).then(
			res => {
				const { errorCode, data, message } = res.data;
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
				} else if (errorCode !== 0) {
					setPopBox({
						isOpen: true,
						content: `[${errorCode}] ${message}`
					});
				}
			},
			() => {
				setPopBox({
					isOpen: true,
					content: i18n.msg_ApiServerError
				});
			}
		);
	}, [langId, i18n]);

	return { promoList };
};

export default PromoList;
