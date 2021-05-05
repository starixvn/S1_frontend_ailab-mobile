import React from "react";
import { render } from "react-snapshot";
import { Helmet } from "react-helmet";
import App from "./app";
// import * as serviceWorker from "./serviceWorker";
import "./styles/css/style-dark.css";
import "./styles/css/style.css";
import "./styles/css/font.css";
import "./styles/css/swiper.css";

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
			<PlayTech />
			<App />
		</React.StrictMode>
	);
};

render(<Content />, document.getElementById("root"));

// serviceWorker.register();
