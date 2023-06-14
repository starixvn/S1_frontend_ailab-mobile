import React from "react";
import { createHistory, LocationProvider } from "@reach/router";
import { Provider } from "react-redux";
import { store } from "@ailab-mobile/store";
import { Wrapper } from "./components/common/wrapper";
import PopBox from "./components/common/popbox";
import RouteComponents from "./route/routeComp";
// import { defSpecialPath } from "./path";

const Index = () => {
	const history = createHistory(window);

	return (
		<Provider store={store}>
			<LocationProvider history={history}>
				<Wrapper>
					<RouteComponents />
					<PopBox />
				</Wrapper>
			</LocationProvider>
		</Provider>
	);
};

export default Index;
