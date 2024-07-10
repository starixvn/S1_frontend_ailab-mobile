import { useEffect, useState } from "react";

export const useCooldown = () => {
	const [cooldown, setCooldown] = useState(0);
	const isReady = cooldown === 0;

	useEffect(() => {
		if (isReady) return;

		const interval = setInterval(() => {
			setCooldown(prev => prev - 1);
		}, 1000);

		// eslint-disable-next-line consistent-return
		return () => clearInterval(interval);
	}, [isReady]);

	return { isReady, setCooldown, cooldown };
};
