const fs = require("fs");
const path = require("path");
const { uniq, compact, map } = require("lodash");
const { extractSheets } = require("spreadsheet-to-json");
const { SHEET_URL_ID } = require("./sheet");
const auth = require("../ailab-resources-385807-220772b7ea81.json");

// * 使用遞迴尋找文件
const findFiles = (dir, filePattern, result = []) => {
	const files = fs.readdirSync(dir);

	for (const file of files) {
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);

		if (stat.isDirectory()) {
			// * 如果是資料夾，遞迴尋找
			findFiles(filePath, filePattern, result);
		} else if (file.match(filePattern)) {
			// 如果是以 .js 或 .ts 结尾的文件添加到結果中
			result.push(filePath);
		}
	}

	return result;
};

// * 讀取文件內容
const readFileAndCheckForString = filePath => {
	try {
		const fileContent = fs.readFileSync(filePath, "utf8");

		return fileContent;
	} catch (err) {
		console.error(`${filePath}讀取錯誤：`, err);
		return "";
	}
};

// * 尋找本地端指定品牌所有 key
// const getLocalKeys = site => {
// 	const path = `apps/${site}/src/i18n`;
// 	const read = fs.readdirSync(path); // ex: ['en','cs']

// 	// * 留下 *.json 格式並將 ['en.json','cs.json'] 轉為 => ['en','cs']
// 	const fileList = read
// 		.filter(str => str.match(/\.json$/))
// 		.map(val => String(val).replace(".json", ""));

// 	let keys = [];
// 	fileList.forEach(lang => {
// 		// * 讀取目前所有檔案
// 		const jsonFile = fs.readFileSync(`${path}/${lang}.json`);
// 		const fileData = JSON.parse(jsonFile) || {};

// 		Object.keys(fileData).forEach(key => {
// 			keys.push(key);
// 		});
// 	});
// 	keys = uniq(keys);
// 	return keys;
// };

// * 只支援單選
const arg = process.argv.slice(2)[0];
const site = `${arg}-mobile`;
const sheetsToExtract = [site];
const filePattern = /\.(js|ts)$/i; // * 匹配以 .js 或 .ts 结尾的文件

const findUnusedKey = async keys => {
	// * 所有 *.js、*.ts 檔案
	const foundFiles = [];
	findFiles(`apps/${arg}/src/components`, filePattern, foundFiles);
	findFiles(`apps/${arg}/src/pages`, filePattern, foundFiles);

	// * 將所有內容接在一起
	const contents = foundFiles
		.map(item => readFileAndCheckForString(item))
		.join("");

	// * 找到未用過的翻譯

	// * 找出未符合 t("lbl_Date") 或 i18n.lbl_Date 的翻譯
	const unusedKey = keys.filter(
		key => !contents.match(`"${key}"`) && !contents.match(`.${key}`)
	);

	console.table(unusedKey);
};

extractSheets(
	{
		spreadsheetKey: SHEET_URL_ID,
		credentials: auth,
		sheetsToExtract
	},
	(err, data) => {
		if (err) throw err;

		const result = [...data[site]];
		const keys = compact(map(result, item => item.key));

		findUnusedKey(keys);
	}
);
