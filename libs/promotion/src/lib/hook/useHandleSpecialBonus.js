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
			const getDataRes = await api.promotion.GetSpecialBonusListV2({
				SpecialCode,
				langId
			});
			if (getDataRes.data.errorCode === 0) {
				setSpecialBonusDatas(getDataRes.data.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return {
		onChangeSpecialCode,
		specialCode,
		onSubmitSpecialCode,
		specialBonusDatas,
		GetSpecialBonusList
	};
};
