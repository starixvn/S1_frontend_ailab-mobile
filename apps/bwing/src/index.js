/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { render } from "react-snapshot";
import { Helmet } from "react-helmet";
import App from "./app";
import "./i18n/i18n";
// import * as serviceWorker from "./serviceWorker";
// import "./styles/css/style-dark.css";
import "./styles/css/style.css";
import "./styles/css/font.css";
// import "./styles/css/swiper.css";
import "swiper/swiper-bundle.min.css";
import { siteId } from "./config";
import { api_shield_GetEndpoint } from "./service/api/shield";
import useShieldCheck, {
	SHIELD_SITE_ID
} from "./components/hook/useShieldCheck";

const GTM = () => {
	return (
		<Helmet>
			{/* <!-- Google tag (gtag.js) --> */}
			<script
				async
				src="https://www.googletagmanager.com/gtag/js?id=G-V0NSTJVY5J"
			/>
			<script async>
				{` window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());

				gtag('config', 'G-V0NSTJVY5J');`}
			</script>

			{/* <!-- Google Tag Manager --> */}
			<script async>
				{`(function (w, d, s, l, i) {
				w[l] = w[l] || [];
				w[l].push({
					"gtm.start": new Date().getTime(),
					event: "gtm.js"
				});
				var f = d.getElementsByTagName(s)[0],
					j = d.createElement(s),
					dl = l != "dataLayer" ? "&l=" + l : "";
					j.async = true;
					j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
					f.parentNode.insertBefore(j, f);
				})(window, document, "script", "dataLayer", "GTM-NKP2DBN")`}
			</script>
			{/* <!-- End Google Tag Manager --> */}
		</Helmet>
	);
};

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
				src={`https://d1cr9zxt7u0sgu.cloudfront.net/shdfp.js?SITE_ID=${SHIELD_SITE_ID}&TYPE=JS&DE=1&AUTO=0`}
				type="text/javascript"
				async
				charSet="UTF-8"
				onLoad={getShieldData}
			/>
			(
			<noscript>
				{`<iframe
					src="${endpoint}/shield-fp /v1/api/web/noscript?site_id=${SHIELD_SITE_ID}"
					width="0"
					height="0"
					style="display:none"
				/>`}
			</noscript>
			)
		</Helmet>
	);
};

// Facebook Pixel - 存／提款成功事件
const FbTrack = () =>
	process.env.NODE_ENV === "production" && (
		<Helmet>
			<script>
				{`!function(f,b,e,v,n,t,s)
						{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
						n.callMethod.apply(n,arguments):n.queue.push(arguments)};
						if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
						n.queue=[];t=b.createElement(e);t.async=!0;
						t.src=v;s=b.getElementsByTagName(e)[0];
						s.parentNode.insertBefore(t,s)}(window, document,'script',
						'https://connect.facebook.net/en_US/fbevents.js');
						fbq('init', '1037896624403579');
						fbq('track', 'PageView');
						`}
			</script>
			(
			<noscript>
				{`<img
						alt=""
						height="1"
						width="1"
						style={{ display: "none" }}
						src="https://www.facebook.com/tr?id=1037896624403579&ev=PageView&noscript=1"
					/>`}
			</noscript>
			)
		</Helmet>
	);

// 市場要埋的追蹤碼
const YuriTrack = () => (
	<Helmet>
		<script async>
			{`!function(y,u,r,i){y._yuri_track||((n=y._yuri_track=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)}).queue=n.queue||[],y._yuri_track._fp||(y._yuri_track._fp=1,t=u.createElement(r),s=u.getElementsByTagName(r)[0],t.async=1,t.src=i,s.parentNode.insertBefore(t,s)))}(window,document,"script","https://cdn.jsdelivr.net/gh/adzon/assets/pixel.js?_rid={click_id}");`}
		</script>
	</Helmet>
);

const Content = () => {
	return (
		<React.StrictMode>
			{/* <GTM /> */}
			<Shield />
			{/* Stage 手動註解 */}
			{/* <FbTrack /> */}
			<YuriTrack />
			<App />
		</React.StrictMode>
	);
};

render(<Content />, document.getElementById("root"));

// serviceWorker.register();
