import React from "react";
import { createHistory, LocationProvider } from "@reach/router";
import { Wrapper } from "./components/common/wrapper";
import PopBox from "./components/common/popbox";
import RouteComponents from "./route/routeComp";
// import { defSpecialPath } from "./path";

const Index = () => {
	const history = createHistory(window);

	return (
		<LocationProvider history={history}>
			<Wrapper>
				<RouteComponents />
				<PopBox />
			</Wrapper>
		</LocationProvider>
	);
};

export default Index;
