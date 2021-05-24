import React from "react";
import { Helmet } from "react-helmet";
import { defMetaData } from "./def";

export const GetMetaDataByPage = ({ path, langId }) => (
	<Helmet>
		{defMetaData[path]?.[langId]?.links.map((el, idx) => {
			return (
				<link
					// eslint-disable-next-line react/no-array-index-key
					key={`seo-${path}-${idx}`}
					href={el.href}
					rel={el.rel}
					hrefLang={el.hrefLang}
				/>
			);
		})}
	</Helmet>
);
