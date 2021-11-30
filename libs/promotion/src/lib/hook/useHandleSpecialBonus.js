import { useEffect, useState } from "react";
import { defFilterType } from "../common/def";
import { useHandlePopBox } from "./useHandlePopBox";

export const useHandleSpecialBonus = ({ api, langId, filterType }) => {
	const [specialBonusDatas, setSpecialBonusDatas] = useState([]);
	const [specialCode, setSpecialCode] = useState("");
	const { handleErrorPopBox } = useHandlePopBox();

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
					handleErrorPopBox({
						message: res.data.message,
						errorCode: res.data.errorCode
					});
				}
				GetSpecialBonusList(specialCode);
			}
		} catch (error) {
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
				setSpecialBonusDatas(() =>
					getDataRes.data?.data?.map(promo => ({
						...promo,
						filterType: defFilterType.specialBonus
					}))
				);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const refreshProcessBar = ({ bonusCode, tpId, categoryId }) => {
		api.account
			.GetCustSpecificBonus({
				BonusCode: bonusCode,
				TpId: tpId,
				PromoCategoryId: categoryId
			})
			.then(({ data: { data, errorCode } }) => {
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
