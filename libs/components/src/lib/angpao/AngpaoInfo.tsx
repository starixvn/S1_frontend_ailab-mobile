import React from "react";
import i18next from "i18next";
import { CurrenciesEnum, staticPagesUrl } from "@ailab-mobile/common";
import { Trans, useTranslation } from "react-i18next";

interface IAngpaoInfoProps {
	currencyId: number;
}

const AngpaoInfo = ({ currencyId }: IAngpaoInfoProps) => {
	const { t } = useTranslation();
	return (
		<>
			<div className="title">{t("Label_SignificantConditions")}</div>
			<ul>
				<li>{t("Label_AngpaoInfoA")}</li>
				<li>{t("Label_AngpaoInfoB")}</li>
				<li>
					{t("Label_AngpaoInfoC", {
						currency: t(`Label_Currency_${currencyId}`),
						amount: {
							[CurrenciesEnum.MY]: "200",
							[CurrenciesEnum.TH]: "1,800",
							[CurrenciesEnum.VN]: "1,000,000"
						}[currencyId]
					})}
				</li>
				<li>
					{t("Label_AngpaoInfoD", {
						siteName: process.env.REACT_APP_SITE_NAME
					})}
				</li>
				<li>
					{t("Label_AngpaoInfoE", {
						amount: {
							[CurrenciesEnum.MY]: "350",
							[CurrenciesEnum.TH]: "2,800",
							[CurrenciesEnum.VN]: "2,000,000"
						}[currencyId]
					})}
				</li>
				<li>{t("Label_AngpaoInfoF")}</li>
				<li>{t("Label_AngpaoInfoG")}</li>
				<li>
					{t("Label_AngpaoInfoH", {
						siteName: process.env.REACT_APP_SITE_NAME
					})}
				</li>
				<li>
					{t("Label_AngpaoInfoI", {
						siteName: process.env.REACT_APP_SITE_NAME
					})}
				</li>
				<li>
					{t("Label_AngpaoInfoJ", {
						siteName: process.env.REACT_APP_SITE_NAME
					})}
				</li>

				<li>
					<Trans
						i18nKey="Label_AngpaoInfoK"
						values={{ siteName: process.env.REACT_APP_SITE_NAME }}
						components={{
							a: (
								<a
									href={
										staticPagesUrl(i18next.language)
											.termsConditions
									}
									rel="noreferrer"
									target="_blank"
								/>
							)
						}}
					/>
				</li>
			</ul>
		</>
	);
};

export default AngpaoInfo;
