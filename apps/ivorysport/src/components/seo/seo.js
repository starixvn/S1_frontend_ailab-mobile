import React, { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet";
import { defMetaData } from "./def";
import api from "../../service/api";
import { popBoxContext, userInfoContext } from "../common/context";
import { cloudBannerImgURL } from "../../config";

const url = "https://m.ivorysport.net/";

const metaData = defMetaData["/"];
const defSEOData = metaData.en;

export const useGetSEODatas = () => {
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const [SEODatas, setSEODatas] = useState(defSEOData);

	const lang = userInfo?.langId;

	let location = "";
	if (typeof window !== "undefined") {
		location = window.location.pathname;
	}
	const pathArr = location?.split("/").filter(p => p !== "");

	useEffect(() => {
		GetDatas();

		if (pathArr.length >= 2 && defMetaData[pathArr[1]]) {
			const allData = {
				title:
					defMetaData[pathArr[1]]?.[lang]?.title ??
					defMetaData[pathArr[1]]?.en?.title,
				keyword:
					defMetaData[pathArr[1]]?.[lang]?.keyword ??
					defMetaData[pathArr[1]]?.en?.keyword,
				description:
					defMetaData[pathArr[1]]?.[lang]?.description ??
					defMetaData[pathArr[1]]?.en?.description,
				links:
					defMetaData[pathArr[1]]?.[lang]?.links ??
					defMetaData[pathArr[1]]?.en?.links
			};
			setSEODatas({ ...SEODatas, ...allData } ?? {});
		}
	}, [location]);

	const GetDatas = async () => {
		try {
			const res = await api.site.Seo();
			const { errorCode, data, message } = res.data;
			if (errorCode === 0) {
				if (pathArr.length < 2) {
					const allData = {
						...data,
						title: data?.title,
						keyword: data?.keyword,
						description: data?.meta,
						links: metaData?.[lang]?.links
					};

					setSEODatas(allData ?? {});
				}
			} else {
				setPopBox({
					isOpen: true,
					content: `[${errorCode}] ${message}`
				});
			}
		} catch (err) {}
	};

	return { SEODatas };
};

function SEO() {
	const { SEODatas } = useGetSEODatas();
	const { userInfo } = useContext(userInfoContext);
	const lang = userInfo?.langId === "my" ? "en" : userInfo?.langId;

	return (
		<Helmet
			htmlAttributes={{
				lang,
				class: "newIndex"
			}}
			title={SEODatas.title ?? defSEOData.title}
			link={[
				...(SEODatas?.links ?? []),
				{
					rel: "icon",
					type: "image/x-icon",
					href: `${cloudBannerImgURL}/desktop/img/favicon.ico`
				}
			]}
			meta={[
				{
					name: `description`,
					content: SEODatas.description
				},
				{
					name: `keyword`,
					content: SEODatas.keyword
				},
				{
					property: `og:url`,
					content: url
				},
				{
					property: `og:type`,
					content: `website`
				},
				{
					property: `og:title`,
					content: SEODatas.title
				},
				{
					property: `og:description`,
					content: SEODatas.description
				},
				{
					property: `og:image`,
					content: `${cloudBannerImgURL}/img/thumbnail/thumbnail_001.jpg`
				},
				{
					name: `twitter:card`,
					content: `summary_large_image`
				},
				{
					name: `twitter:domain`,
					content: `ivorysport.net`
				},
				{
					name: `twitter:url`,
					content: url
				},
				{
					name: `twitter:title`,
					content: SEODatas.title
				},
				{
					name: `twitter:description`,
					content: SEODatas.description
				},
				{
					name: `twitter:image`,
					content: `${cloudBannerImgURL}/img/thumbnail/thumbnail_001.jpg`
				}
			]}
		/>
	);
}

export default SEO;
