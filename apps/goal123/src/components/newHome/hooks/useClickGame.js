import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { defTpGameType } from "@ailab-mobile/common";
import { useGetMaintenanceQuery } from "@ailab-mobile/service";
import { popBoxContext } from "../../common/context";
import { useMenu } from "../../hook/useMenu";

const useClickGame = () => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const { onClickProductItem } = useMenu();
	const { data: { data: tpMaintainList = [] } = {} } = useGetMaintenanceQuery(
		null
	);

	const onclickStaticProduct = async product => {
		if (!product) return;

		const isStaticProductMaintain = tpMaintainList.some(
			item =>
				item.tpId === product.tpId &&
				(item.tpGameType === product.tpGameType ||
					item.tpGameType === defTpGameType.All) // * 0 指全部
		);

		if (isStaticProductMaintain || product?.isInMaintain) {
			setPopBox({
				isOpen: true,
				title: t("lbl_ImportantNote"),
				content: t("lbl_underMaintenance")
			});
			return;
		}
		await onClickProductItem(product);
	};

	return { onclickStaticProduct };
};

export default useClickGame;
