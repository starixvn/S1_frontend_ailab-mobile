import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../components/common/context";
import api from "../service/api";

const RebateExclude = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const [rebateExcludeList, setRebateExcludeList] = useState([]);

	useEffect(() => {
		const getExcludeList = async () => {
			const res = await api.promotion.GetRebateExcludeGameList({
				langId: userInfo.langId,
				currencyId: userInfo.currencyId
			});
			const originRebateExcludeList = res.data.data;

			const formatRebateExcludeList = originRebateExcludeList.reduce(
				(acc, cur) => {
					const { tpGameType, tpGameTypeName, gameName } = cur;
					const targetObj = acc.find(
						({ tpGameType: accTpGameType }) =>
							accTpGameType === cur.tpGameType
					);
					const newGameName =
						gameName === null ? "All Game" : gameName;

					if (targetObj !== undefined) {
						targetObj.gameName.push(newGameName);
					} else {
						acc.push({
							tpGameType,
							tpGameTypeName,
							gameName: [newGameName]
						});
					}
					return acc;
				},
				[]
			);
			setRebateExcludeList(formatRebateExcludeList);
		};
		getExcludeList();
	}, [userInfo?.currencyId]);

	return (
		<>
			<div className="subheader">
				<div className="subheader__container">
					<a href="https://www.nova88.net/" />
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
								<div className="exclude__table__item">
									<div>{tpGameTypeName}</div>
									<div>
										{gameName.map(value => (
											<span>{value}</span>
										))}
									</div>
								</div>
							)
						)}
					</div>
				</div>
			</main>
			<div className="subcopyright">
				<span className="text">{`© Copyright ${new Date().getFullYear()}. Nova88. All Rights Reserved.`}</span>
			</div>
		</>
	);
};

export default RebateExclude;
