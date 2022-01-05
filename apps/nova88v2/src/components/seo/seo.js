import React, { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet";
import { defMetaData } from "./def";
import api from "../../service/api";
import { popBoxContext, i18nContext } from "../common/context";

export const useGetSEODatas = ({ getFromAPI = false }) => {
	const { setPopBox } = useContext(popBoxContext);
	const { i18n } = useContext(i18nContext);
	const [SEODatas, setSEODatas] = useState(null);
	useEffect(() => {
		const GetDatas = async () => {
			if (getFromAPI && SEODatas === null) {
				try {
					const res = await api.site.Seo();
					if (res.data.errorCode === 0) {
						setSEODatas(res.data.data ?? {});
					} else {
						setPopBox({
							isOpen: true,
							content: `[${res.data.errorCode}] ${res.data.message}`
						});
					}
				} catch (error) {
					setPopBox({
						isOpen: true,
						content: i18n.msg_ApiServerError
					});
				}
			}
		};
		GetDatas();
	}, [getFromAPI, SEODatas]);

	return { SEODatas };
};

export const SEO = ({ path, langId, getFromAPI = false, isLogin }) => {
	const { SEODatas } = useGetSEODatas({ getFromAPI });

	const defaultSEOInfo = defMetaData[path]?.[langId] ?? {};

	const links = defaultSEOInfo.links?.map((el, idx) => {
		return (
			<link
				// eslint-disable-next-line react/no-array-index-key
				key={`seo-${path}-${idx}`}
				href={el.href}
				rel={el.rel}
				hrefLang={el.hrefLang}
			/>
		);
	});

	if (isLogin === null || (getFromAPI && SEODatas === null)) return null;

	return (
		<Helmet
			title={SEODatas?.title ?? defaultSEOInfo.title}
			meta={[
				{
					name: `description`,
					content: SEODatas?.meta ?? defaultSEOInfo.description
				}
			]}
			link={links ? [...links] : []}
		/>
	);
};
