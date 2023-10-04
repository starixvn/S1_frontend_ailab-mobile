const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");
const auth = require("../ailab-resources-385807-220772b7ea81.json");

// * url：https://docs.google.com/spreadsheets/d/1yQNCCdV2UGOGE8-GhM0eOMEoTG23F0JpcR5pf5tTq5E

const serviceAccountAuth = new JWT({
	email: auth.client_email,
	key: auth.private_key,
	scopes: ["https://www.googleapis.com/auth/spreadsheets"]
});

const SHEET_URL_ID = "1yQNCCdV2UGOGE8-GhM0eOMEoTG23F0JpcR5pf5tTq5E";

// * 將專案版本的語系輸出至 google sheet
const outputData = async ({ tab, headerRow, contents }) => {
	const doc = new GoogleSpreadsheet(SHEET_URL_ID, serviceAccountAuth);
	await doc.loadInfo();
	const sheet = doc.sheetsByTitle[tab]
		? doc.sheetsByTitle[tab]
		: await doc.addSheet({ title: tab, headerValues: headerRow });
	await sheet.clear();
	await sheet.setHeaderRow(headerRow);
	await sheet.addRows(contents);
	await sheet.saveUpdatedCells();
};

const sortData = contents => {
	const sortedKeys = Object.keys(contents).sort();

	const sortedContents = [...sortedKeys.map(key => contents[key])];

	return sortedContents;
};

module.exports = { outputData, sortData, SHEET_URL_ID };
