const { extractSheets } = require("spreadsheet-to-json");
const auth = require("../ailab-resources-385807-220772b7ea81.json");
const { outputData, sortData, SHEET_URL_ID } = require("./sheet");

// * url：https://docs.google.com/spreadsheets/d/1yQNCCdV2UGOGE8-GhM0eOMEoTG23F0JpcR5pf5tTq5E

// * 可吃參數 ex: node SheetSort.js nova88 common
const args = process.argv.slice(2);

const sheetsToExtract = args.map(site => `${site}-mobile`);

// * 單純整理當前 google sheet 排序，可選指定 tab
extractSheets(
	{
		spreadsheetKey: SHEET_URL_ID,
		credentials: auth,
		sheetsToExtract: sheetsToExtract
	},
	(err, data) => {
		if (err) throw err;

		Object.keys(data).forEach(tab => {
			const fileData = data[tab];

			if (!fileData || fileData.length === 0) return;

			const headerRow = Object.keys(fileData[0]);
			const contents = {};

			fileData.forEach(item => {
				contents[item.key] = item;
			});

			outputData({ tab, headerRow, contents: sortData(contents) });
		});
	}
);
