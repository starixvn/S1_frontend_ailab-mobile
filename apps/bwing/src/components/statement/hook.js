import { useEffect, useState } from "react";

export const useHandlePage = ({ totalPages, func_getDatas }) => {
	const [pageOptions, setPageOptions] = useState([]);
	const [selectedPage, setSelectedPage] = useState(0);

	useEffect(() => {
		let result = [];
		for (let i = 1; i <= totalPages; i++) {
			result.push({ displayText: i, id: i });
		}
		setPageOptions(result);
	}, [totalPages]);

	const onSelectPage = idx => {
		if (idx !== selectedPage) {
			setSelectedPage(idx);
			let _selectedPage = idx + 1;
			func_getDatas({ pageNumber: _selectedPage });
		}
	};

	return { selectedPage, pageOptions, onSelectPage };
};
