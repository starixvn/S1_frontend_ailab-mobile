const { extractSheets } = require("spreadsheet-to-json");
const { merge } = require("lodash");
const path = require("path");
const fs = require("fs-extra");
const auth = require("../ailab-resources-385807-220772b7ea81.json");
const { SHEET_URL_ID } = require("./sheet");

// * url：https://docs.google.com/spreadsheets/d/1yQNCCdV2UGOGE8-GhM0eOMEoTG23F0JpcR5pf5tTq5E

const getContents = data => {
	const contents = {};

	for (const tab in data) {
		const files = [...data[tab]];

		const fileName = String(tab).replace("-mobile", "");

		for (const file of files) {
			const content = { ...file };
			const { key: displayKey } = content;

			for (const lang in content) {
				if (lang !== "key") {
					merge(contents, {
						[lang]: {
							[fileName]: { [displayKey]: content[lang] || "" }
						}
					});
				}
			}
		}
	}

	return contents;
};

// * 複選 ex: node sheetSort.js nova88v2
const args = process.argv.slice(2);

const sheetsToExtract = args.map(site => `${site}-mobile`);

// * 同步 google sheet 版本，可選指定 tab

extractSheets(
	{
		spreadsheetKey: SHEET_URL_ID,
		credentials: auth,
		sheetsToExtract
	},
	(err, data) => {
		if (err) throw err;

		const contents = getContents(data);

		for (const lang in contents) {
			// * 建立目錄，確保目錄存在。如果目錄結構不存在，則建立該目錄
			for (const fileName in contents[lang]) {
				const location = `../apps/${fileName}/src/i18n`;

				fs.ensureDirSync(
					path.dirname(path.resolve(__dirname, location, "file"))
				);

				const content = contents[lang][fileName];

				// * 寫入檔案至 './public/locales/${lang}'
				fs.writeJSONSync(
					path.resolve(__dirname, location, `${lang}.json`),
					content,
					{ spaces: 2 }
				);
			}
		}
	}
);
