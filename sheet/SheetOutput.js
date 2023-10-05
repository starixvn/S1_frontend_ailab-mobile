const fs = require("fs");
const { outputData, sortData } = require("./sheet");

// * 輸出當前版本，平常不會使用
const outputSheet = async tab => {
	const path = `apps/${tab}/src/i18n`;
	const read = fs.readdirSync(path); // ex: ['en','cs']

	// * 去除 config.js 並將其他檔案的 .json 字串去除
	const fileList = read
		.filter(item => item !== "config.js" && item !== "i18n.js")
		.map(val => String(val).replace(".json", ""));

	const headerRow = ["key", ...fileList]; // ex: ['key','en','cs']

	const contents = {};

	fileList.forEach(lang => {
		// * 讀取目前所有檔案
		const jsonFile = fs.readFileSync(`${path}/${lang}.json`);
		const fileData = JSON.parse(jsonFile) || {};

		Object.keys(fileData).forEach(key => {
			const content = fileData[key] || "";

			contents[key] = { ...contents[key], ...{ key, [lang]: content } };
		});
	});

	outputData({
		tab: `${tab}-mobile`,
		headerRow,
		contents: sortData(contents)
	});
};

const args = process.argv.slice(2);
const tab = args[0];

// * 只支援單選
outputSheet(tab);
