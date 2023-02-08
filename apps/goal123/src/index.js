import React, { useState, useEffect } from "react";
import { render } from "react-snapshot";
import { Helmet } from "react-helmet";
import App from "./app";
import "./i18n/i18n";
// import * as serviceWorker from "./serviceWorker";
import "./styles/css/style-dark.css";
import "./styles/css/style.css";
import "./styles/css/font.css";
import "./styles/css/swiper.css";
import useShieldCheck, {
	SHIELD_SITE_ID,
	SHIELD_SITE_ID_SCRIPT
} from "./components/hook/useShieldCheck";
import { api_shield_GetEndpoint } from "./service/api/shield";
import { siteId } from "./config";

const Shield = () => {
	const { getShieldData } = useShieldCheck();
	const [endpoint, setEndpoint] = useState("");

	useEffect(() => {
		api_shield_GetEndpoint({ siteId }).then(res => {
			const { errorCode, data } = res.data;
			if (errorCode === 0) {
				const _endpoint = data?.endpoint;
				setEndpoint(_endpoint);
			}
		});
	}, []);

	return (
		<Helmet>
			<script
				language="javascript"
				src={SHIELD_SITE_ID_SCRIPT}
				type="text/javascript"
				async
				charSet="UTF-8"
				onLoad={getShieldData}
			/>
			(
			<noscript>
				{`<iframe
					src="${endpoint}/shield-fp/v1/api/web/noscript?site_id=${SHIELD_SITE_ID}"
					width="0"
					height="0"
					style="display:none"
				/>`}
			</noscript>
			)
		</Helmet>
	);
};

const Content = () => {
	return (
		<React.StrictMode>
			<Shield />
			<App />
		</React.StrictMode>
	);
};

render(<Content />, document.getElementById("root"));

// serviceWorker.register();
