import { useState } from "react";

export const useHandleSelect = defaultSelect => {
	const [selected, setSelected] = useState(defaultSelect ?? "");

	const handleSelect = value => {
		setSelected(value);
	};

	return { selectedOption: selected, handleSelect };
};
