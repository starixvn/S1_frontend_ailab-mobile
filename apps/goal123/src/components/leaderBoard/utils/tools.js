import moment from "moment";

export const uniqueData = data =>
	data.reduce((acc, current) => {
		const hasItem = acc.find(item => item.label === current.label);
		if (!hasItem) {
			acc.push(current);
		}
		return acc;
	}, []);

export const formattedDate = dateObj =>
	moment({ year: dateObj.year, month: dateObj.month - 1 }).format(
		"YYYY-MM-DD"
	);

export const divideMillion = number => Math.floor(number / 1000000).toFixed(0);
