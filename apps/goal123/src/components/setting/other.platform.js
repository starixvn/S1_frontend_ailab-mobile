import React from "react";
import { bannerImgUrl } from "../../config";
import { useMenu } from "../hook/useMenu";
import defPlatform from "./defPlatform";
import useClickGame from "../newHome/hooks/useClickGame";

const Platform = () => {
	const { menuList = [] } = useMenu();
	const { onclickStaticProduct } = useClickGame();

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

	return (
		<div className="partner-bar">
			{platFormProducts.map(subMenuItem => {
				const { tpGameIdNo, imgName, otherPlatformImg } =
					subMenuItem || {};
				return (
					imgName && (
						<button
							key={tpGameIdNo}
							onClick={() => onclickStaticProduct(subMenuItem)}>
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
