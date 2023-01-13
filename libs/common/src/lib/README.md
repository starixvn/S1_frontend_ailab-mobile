要使用共用的 redux 及 api 需在各自專案的 layout 層加入配置

```tsx
// * app.js
import React, { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { store } from "@ailab-mobile/store";

const App = ({ children }) => {
	return (
		<Provider store={store}>
			// ...
			{children}
			// ...
		</Provider>
	);
};
```
