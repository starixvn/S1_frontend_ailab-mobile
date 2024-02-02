import React, { useContext } from "react";
import { popBoxContext, i18nContext } from "../common/context";
import { bannerImgUrl } from "../../config";
import { useMenu } from "../hook/useMenu";
import defPlatform from "./defPlatform";

const Platform = () => {
	const { menuList = [], onClickProductItem } = useMenu();
	const { setPopBox } = useContext(popBoxContext);
	const { i18n } = useContext(i18nContext);

	const platFormProducts = menuList.flatMap(mainMenuItem => {
		const { data } = mainMenuItem || {};

		return data?.flatMap(subMenuItem => {
			const defProduct = defPlatform.find(
				product => product.tpGameIdNo === subMenuItem.tpGameIdNo
			);
			if (defProduct) {
				return {
					...subMenuItem,
					...defProduct
				};
			}

			return [];
		});
	});

	// * 顯示 maintenance 彈窗
	const handleClickPlatFormItem = async product => {
		const { isInMaintain } = product || {};

		if (isInMaintain) {
			setPopBox({
				isOpen: true,
				title: i18n.lbl_ImportantNote,
				content: i18n.lbl_underMaintenance
			});
			return;
		}
		await onClickProductItem(product);
	};

	return (
		<div className="partner-bar">
			{platFormProducts.map(subMenuItem => {
				const { tpGameIdNo, imgName, otherPlatformImg } =
					subMenuItem || {};
				return (
					imgName && (
						<button
							key={tpGameIdNo}
							onClick={() =>
								handleClickPlatFormItem(subMenuItem)
							}>
							<img
								alt={imgName}
								src={`${bannerImgUrl}/h5/img/footer/${
									otherPlatformImg ?? imgName
								}.png`}
							/>
						</button>
					)
				);
			})}
		</div>
	);
};

export default Platform;
