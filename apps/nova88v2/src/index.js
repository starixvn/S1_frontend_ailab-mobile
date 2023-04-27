import React from "react";
import { render } from "react-snapshot";
import { Helmet } from "react-helmet";
import "./i18n/i18n";
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
		</Helmet>
	);
};

const Content = () => {
	return (
		<React.StrictMode>
			<Iovation />
			<App />
		</React.StrictMode>
	);
};

render(<Content />, document.getElementById("root"));

// serviceWorker.register();
