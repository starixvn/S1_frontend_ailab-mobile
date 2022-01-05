import { useEffect, useState, useContext } from "react";
import { defFilterType } from "../common/def";
import { popBoxContext, i18nContext } from "../../common/context";
import api from "../../../service/api";

export const useHandleSpecialBonus = ({ langId, filterType }) => {
	const { setPopBox } = useContext(popBoxContext);
	const { i18n } = useContext(i18nContext);
	const [specialBonusDatas, setSpecialBonusDatas] = useState([]);
	const [specialCode, setSpecialCode] = useState("");

	useEffect(() => {
		if (filterType === defFilterType.specialBonus) {
			GetSpecialBonusList();
		}
	}, [filterType]);

	const onChangeSpecialCode = e => {
		setSpecialCode(e.target.value);
	};

	const onSubmitSpecialCode = async () => {
		try {
			if (specialCode !== "") {
				const res = await api.promotion.SetSpecialCode({
					SpecialCode: specialCode,
					langId
				});

				if (res.data.errorCode === 0) {
					setSpecialCode("");
				} else {
					setPopBox({
						isOpen: true,
						content: `[${res.data.errorCode}] ${res.data.message}`
					});
				}
				GetSpecialBonusList(specialCode);
			}
		} catch (error) {
			setPopBox({
				isOpen: true,
				content: i18n.msg_ApiServerError
			});
			setSpecialCode("");
		}
	};

	const GetSpecialBonusList = async SpecialCode => {
		try {
			const getDataRes = await api.promotion.GetSpecialPromotionList({
				SpecialCode,
				langId
			});
			if (getDataRes.data.errorCode === 0) {
				setSpecialBonusDatas(getDataRes.data.data);
			} else {
				setPopBox({
					isOpen: true,
					content: `[${getDataRes.data.errorCode}] ${getDataRes.data.message}`
				});
			}
		} catch (error) {
			setPopBox({
				isOpen: true,
				content: i18n.msg_ApiServerError
			});
		}
	};

	const refreshProcessBar = ({ bonusCode, tpId, categoryId }) => {
		api.account
			.GetCustSpecificBonus({
				BonusCode: bonusCode,
				TpId: tpId,
				PromoCategoryId: categoryId
			})
			.then(({ data: { data, errorCode, message } }) => {
				const success = errorCode === 0;
				if (success) {
					let idx = null;
					let newPromoList = [];

					idx = specialBonusDatas.findIndex(
						x =>
							x.bonusCode === bonusCode &&
							x.tpId === tpId &&
							x.categoryId === categoryId
					);
					if (idx !== -1) {
						newPromoList = [...specialBonusDatas];
						if (data) {
							newPromoList[idx].custRollOver = data.rollover;
							newPromoList[idx].custTurnOver = data.turnover;
						}
					}

					setSpecialBonusDatas(newPromoList);
				} else {
					setPopBox({
						isOpen: true,
						content: `[${errorCode}] ${message}`
					});
				}
			});
	};

	return {
		onChangeSpecialCode,
		specialCode,
		onSubmitSpecialCode,
		specialBonusDatas,
		GetSpecialBonusList,
		refreshProcessBar
	};
};
