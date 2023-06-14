import { useState } from "react";

const useTip = () => {
	const [showTips, setTips] = useState([]);
	const showTipHandler = col => {
		setTips(prev =>
			prev.includes(col) ? prev.filter(el => el !== col) : [...prev, col]
		);
	};
	return { showTips, showTipHandler };
};

export default useTip;
