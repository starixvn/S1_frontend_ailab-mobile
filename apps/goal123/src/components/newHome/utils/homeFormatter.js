// 部分數字轉換會變 object Object 的問題, 沿用桌機使用的 number_format

export const number_format = ({
	number,
	formatRequired = false,
	isConvertRequired = true,
	digits = 2
}) => {
	let _number = number;
	if (!isNaN(number)) {
		if (isConvertRequired || formatRequired) {
			_number /= 1000;
		}

		if (digits > 0) {
			// 無條件捨去到第二位，避免四捨五入進位
			_number = (
				Math.floor(_number * Math.pow(10, digits)) /
				Math.pow(10, digits).toFixed(digits)
			).toFixed(digits);
		}
	}

	_number += "";
	const arr = _number.split(".");
	const re = /(\d{1,3})(?=(\d{3})+$)/g;

	return `${arr[0].replace(re, "$1,")}${
		digits > 0 && arr.length === 2 ? `.${arr[1]}` : ""
	}${formatRequired ? " ('000)" : ""}`;
};
