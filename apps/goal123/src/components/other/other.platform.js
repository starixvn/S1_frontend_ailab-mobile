import React from "react";
import { bannerImgUrl } from "../../config";
import defPlatForm from "./defPlatform";
import useClickGame from "../newHome/hooks/useClickGame";

const Platform = () => {
	const { onclickStaticProduct } = useClickGame();

	return (
		<div className="partner-bar">
			{/* Goal 的遊戲跟 PM 討論後為顯示固定的遊戲，不會因為 api 變動 */}
			{defPlatForm.map(subMenuItem => {
				const { tpGameIdNo, imgName } = subMenuItem || {};
				return (
					imgName && (
						<button
							key={tpGameIdNo}
							onClick={() => onclickStaticProduct(subMenuItem)}>
							<img
								alt={imgName}
								src={`${bannerImgUrl}/h5/img/footer/${imgName}.png`}
							/>
						</button>
					)
				);
			})}
		</div>
	);
};

export default Platform;
