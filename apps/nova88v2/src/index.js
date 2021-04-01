import React from "react";
import { render } from "react-snapshot";
import { Helmet } from "react-helmet";
import config from "./config";
import App from "./app";
import "./styles/css/style-dark.css";
import "./styles/css/style.css";
import "./styles/css/font.css";
import "./styles/css/swiper.css";
// import * as serviceWorker from "./serviceWorker";

const Iovation = () => {
	return (
		<Helmet>
			<script>
				{`
				window.IGLOO = window.IGLOO || {
					"enable_flash" : false,
					"loader" : {
					  "fp_dyn" : false,
					  "version" : "5.2.2"
					}
				  };
				`}
			</script>
			<script
				src={`${config.t_and_cURL}/common/js/loader_only.js?v=201027`}
				type="text/javascript"
			/>
		</Helmet>
	);
};

const PlayTech = () => {
	return (
		<Helmet>
			<script
				src="https://login-am.hotspin88.com/jswrapper/hotspin88am/integration.js"
				type="text/javascript"
			/>
		</Helmet>
	);
};

const Content = () => {
	return (
		<React.StrictMode>
			<Iovation />
			<PlayTech />
			<App />
		</React.StrictMode>
	);
};

render(<Content />, document.getElementById("root"));

// serviceWorker.register();
