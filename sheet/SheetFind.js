const fs = require("fs");
const path = require("path");

// todo: 還沒寫完

function readFileAndCheckForString(filePath) {
	try {
		// * 讀取文件內容
		const fileContent = fs.readFileSync(filePath, "utf8");

		return fileContent;
	} catch (err) {
		console.error(`读取文件 ${filePath} 时出错：`, err);
	}
}

// * 使用遞迴尋找文件
function findFiles(dir, filePattern, result = []) {
	const files = fs.readdirSync(dir);

	for (const file of files) {
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);

		if (stat.isDirectory()) {
			// * 如果是資料夾，遞迴尋找
			findFiles(filePath, filePattern, result);
		} else if (file.match(filePattern)) {
			// 如果是以 .js 或 .ts 结尾的文件，将其添加到结果中
			result.push(filePath);
		}
	}

	return result;
}

const foundFiles = [];
const filePattern = /\.(js|ts)$/i; // * 正規表達式  正则表达式，匹配以 .js 或 .ts 结尾的文件
findFiles("apps/nova88v2/src/components", filePattern, foundFiles);
findFiles("apps/nova88v2/src/pages", filePattern, foundFiles);

const files = [
	"apps/nova88v2/src/components/common/popBox.profileCompelete.js"
	// "apps/nova88v2/src/components/common/popBox.profileConfirmCheck.js",
	// "apps/nova88v2/src/components/common/popBox.promotionAmountConfirm.js"
];

const contents = files.map(item => readFileAndCheckForString(item));

const keys = [{ key: '"lbl_UpdateSuccess"' }];

keys.forEach(item => {
	// item.key
	contents.some(content => {
		console.log(String(content).match(item.key));
		return String(content).match(item.key);
	});
});

const findNotUsedKey = async tab => {
	const path = `apps/${tab}/src/i18n`;
	const read = fs.readdirSync(path); // ex: ['en','cs']
	const fileList = read
		.filter(item => item !== "config.js")
		.map(val => String(val).replace(".json", ""));

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

	console.log(contents);
};

const args = process.argv.slice(2);
const tab = args[0]; // nova88v2
// findNotUsedKey(tab);
