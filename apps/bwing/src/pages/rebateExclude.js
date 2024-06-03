import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../components/common/context";
import { api_promotion_GetRebateExcludeGameList } from "../service/api/promotion";
import path from "../path";

const RebateExclude = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const [rebateExcludeList, setRebateExcludeList] = useState([]);

	useEffect(() => {
		const getExcludeList = async () => {
			const res = await api_promotion_GetRebateExcludeGameList({
				langId: userInfo.langId,
				currencyId: 51
			});

			const originalList = res.data.data;

			const groupedList = originalList.reduce((acc, curr) => {
				const { tpGameTypeName, gameName } = curr;
				acc[tpGameTypeName] = {
					tpGameTypeName,
					gameName: [
						...(acc[tpGameTypeName]?.gameName ?? []),
						gameName
					]
				};

				return acc;
			}, {});

			const arrayList = Object.values(groupedList);

			setRebateExcludeList(arrayList);
		};
		getExcludeList();
	}, []);

	return (
		<>
			<div className="subheader">
				<div className="subheader__container">
					<a href={path.home.root} />
				</div>
			</div>
			<main className="exclude">
				<div className="exclude__container">
					<div className="exclude__title">
						{t("lbl_RebateExclude_title")}
					</div>
					<div className="exclude__table">
						<div className="exclude__table__item">
							<div>{t("lbl_Product")}</div>
							<div>
								<span>{t("lbl_GameName")}</span>
							</div>
						</div>
						{rebateExcludeList.map(
							({ tpGameTypeName, gameName }) => (
								<div
									key={tpGameTypeName}
									className="exclude__table__item">
									<div>{tpGameTypeName}</div>
									<div>
										{gameName.map(value => (
											<span key={value}>{value}</span>
										))}
									</div>
								</div>
							)
						)}
						<div className="exclude__table__item">
							<div>EVO L.Casino</div>
							<div>
								<span>Stock Market</span>
							</div>
						</div>
					</div>
				</div>
			</main>
			<div className="subcopyright">
				<span className="text">{`© Copyright ${new Date().getFullYear()}. Bwing. All Rights Reserved.`}</span>
			</div>
		</>
	);
};

export default RebateExclude;
