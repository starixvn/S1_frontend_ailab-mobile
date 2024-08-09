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
import useShieldCheck from "./components/hook/useShieldCheck";
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
				src="https://d1cr9zxt7u0sgu.cloudfront.net/shdfp.js?SITE_ID=1bb2dfee53937052b49ec5a57cd755319675209b&TYPE=JS&DE=1&AUTO=0"
				type="text/javascript"
				async
				charSet="UTF-8"
				onLoad={getShieldData}
			/>
			(
			<noscript>
				{`<iframe
					src="${endpoint}/shield-fp /v1/api/web/noscript?site_id=1bb2dfee53937052b49ec5a57cd755319675209b"
					width="0"
					height="0"
					style="display:none"
				/>`}
			</noscript>
			)

			{/* === Facebook－給市場的廣告埋點 fbq('init', 'xxxxxxxxxx') << 此為監測臉書廣告的帳號ID  === */}
			<script
				dangerouslySetInnerHTML={{
					__html: `
						!function(f,b,e,v,n,t,s)
						{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
						n.callMethod.apply(n,arguments):n.queue.push(arguments)};
						if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
						n.queue=[];t=b.createElement(e);t.async=!0;
						t.src=v;s=b.getElementsByTagName(e)[0];
						s.parentNode.insertBefore(t,s)}(window, document,'script',
						'https://connect.facebook.net/en_US/fbevents.js');
						fbq('init', '1494348037871204');
						fbq('track', 'PageView');
						`
				}}
			/>
			<noscript>
				{`<img
					alt=""
					height="1"
					width="1"
					style="display:none"
					src="https://www.facebook.com/tr?id=1494348037871204&ev=PageView&noscript=1"
				/>`}
			</noscript>
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
